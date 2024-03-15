//CEOS 19기 프론트엔드 파이팅🔥 ദ്ദി˶ˊᵕˋ˵)

document.addEventListener('DOMContentLoaded', function () {
	/* 조작할 DOM 요소 아이디로 참조 ->
     달력 / 섹션 추가 버튼 / 섹션명 입력 인풋 필드 / 섹션 컨테이너 */
	const datePicker = document.getElementById('datePicker');
	const addSectionBtn = document.getElementById('addSectionBtn');
	const sectionInput = document.getElementById('sectionInput');
	const todoSectionsDiv = document.getElementById('todoSections');

	// dom 로딩 완료 후, -> 날짜 선택-> 해당 날짜의 투두리스트 화면에 로드
	datePicker.addEventListener('change', loadSectionsForDate);
	// dom 로딩 완료 후, -> 섹션 추가되면, -> 섹션 추가
	addSectionBtn.addEventListener('click', addTodoSection);

	// ** 함수 기능 : 로컬 스토리지에서 선택된 날의 전체 투두리스트 불러오기 -> html로 띄우기
	function loadSectionsForDate() {
		const selectedDate = datePicker.value;
		todoSectionsDiv.innerHTML = ''; // 특정 날 투두리스트 불러올 준비

		// 로컬 스토리지에서 존재하는 섹션들 파악
		const sections = getSectionsForDate(selectedDate);

		sections.forEach((section, index) => {
			// 모든 섹션을 화면에 보여주기위해 모든 존재하는 섹션에 대해 각각 createSectionDiv 호출
			const sectionDiv = createSectionDiv(section, index);
			// 호출 결과(섹션별 준비된 구조) -> html에 추가
			todoSectionsDiv.appendChild(sectionDiv);
		});
	}

	// 투두 리스트 섹션 기능 1. 섹션 추가 / 2. 섹션 삭제
	// 투두 리스트 섹션 추가
	function addTodoSection() {
		const selectedDate = datePicker.value;
		const sectionName = sectionInput.value.trim();
		if (!selectedDate || !sectionName) {
			alert('날짜를 선택하고 섹션 이름을 입력해주세요.');
			return;
		}

		const sections = getSectionsForDate(selectedDate);
		sections.push({ name: sectionName, items: [] });
		saveSectionsForDate(selectedDate, sections);
		// 로컬 스토리지에 추가한 섹션 -> loadSectionsForDate()로 html에 반영하기
		loadSectionsForDate();
		sectionInput.value = '';
	}

	// 투두 리스트 섹션 삭제
	function deleteSection(sectionIndex) {
		const selectedDate = datePicker.value;
		let sections = getSectionsForDate(selectedDate);
		sections.splice(sectionIndex, 1);
		// 로컬 스토리지에서 삭제한 섹션 -> loadSectionsForDate()로 html에 반영하기
		saveSectionsForDate(selectedDate, sections);
		loadSectionsForDate();
	}

	// 투두 리스트 아이템 기능 1. 아이템 추가 / 2. 아이템 삭제
	function addTodoItem(sectionIndex, itemText) {
		if (!itemText.trim()) return;
		const selectedDate = datePicker.value;
		const sections = getSectionsForDate(selectedDate);
		sections[sectionIndex].items.push(itemText);
		saveSectionsForDate(selectedDate, sections);
		loadSectionsForDate();
	}

	function deleteTodoItem(sectionIndex, itemIndex) {
		const selectedDate = datePicker.value;
		let sections = getSectionsForDate(selectedDate);
		sections[sectionIndex].items.splice(itemIndex, 1);
		saveSectionsForDate(selectedDate, sections);
		loadSectionsForDate();
	}

	// createSectionDiv : html에 특정 섹션 표시하기 위해, 필요한 모든 요소 구조 준비

	function createSectionDiv(section, index) {
		const sectionDiv = document.createElement('div');
		sectionDiv.className = 'todo-section';

		const sectionTitle = document.createElement('h3');

		const deleteSectionBtn = document.createElement('button');
		deleteSectionBtn.textContent = '섹션 삭제';
		deleteSectionBtn.onclick = () => deleteSection(index);
		sectionTitle.appendChild(deleteSectionBtn);

		sectionDiv.appendChild(sectionTitle);

		// 선택된 섹션에 할 일 아이템들을 먼저 추가
		section.items.forEach((item, itemIndex) => {
			const itemDiv = document.createElement('div');
			itemDiv.className = 'todo-item';
			itemDiv.textContent = item;

			const deleteItemBtn = document.createElement('button');
			deleteItemBtn.textContent = '완료';
			deleteItemBtn.onclick = () => deleteTodoItem(index, itemIndex);
			itemDiv.appendChild(deleteItemBtn);

			sectionDiv.appendChild(itemDiv);

			return sectionDiv;
		});

		// 현재 할 일 아이템들 아래에 할 일 추가를 위한 입력 필드와 버튼 추가
		const itemInput = document.createElement('input');
		itemInput.type = 'text';
		itemInput.placeholder = '할 일 추가';
		sectionDiv.appendChild(itemInput);

		const addItemBtn = document.createElement('button');
		addItemBtn.textContent = '+';
		addItemBtn.onclick = () => addTodoItem(index, itemInput.value);
		sectionDiv.appendChild(addItemBtn);

		/* 할일 아이템 요소들 다 추가된 만들어진 섹션 요소 반환해서 
        섹션을 loadSectionsForDate()에서 forEach()로 화면에 표시할 수 있도록 함
        */
		return sectionDiv;
	}

	// 로컬 스토리지에서 특정 날짜 투두 리스트 가져오기
	function getSectionsForDate(date) {
		const sectionsJSON = localStorage.getItem(date);
		return sectionsJSON ? JSON.parse(sectionsJSON) : [];
	}

	// 로컬 스토리지에 특정 날짜 투두 리스트 업데이트하기
	function saveSectionsForDate(date, sections) {
		localStorage.setItem(date, JSON.stringify(sections));
	}
});
