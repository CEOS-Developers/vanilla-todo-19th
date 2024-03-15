//CEOS 19기 프론트엔드 파이팅🔥 ദ്ദി˶ˊᵕˋ˵)

document.addEventListener('DOMContentLoaded', function () {
	/* 조작할 DOM 요소 아이디로 참조 ->
     달력 / 섹션 추가 버튼 / 섹션명 입력 인풋 필드 / 섹션 컨테이너 */
	const datePicker = document.getElementById('datePicker');
	const addSectionBtn = document.getElementById('addSectionBtn');
	const sectionInput = document.getElementById('sectionInput');
	const todoSectionsDiv = document.getElementById('todoSections');

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
