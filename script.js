const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

let toDoArr = [];
let doneToDoArr = [];

// 할 일 목록 추가 함수
function submitToDo(event) {
  event.preventDefault(); // submit 새로고침 방지
  const newToDo = toDoInput.value.trim(); // input값 저장 및 앞뒤 공백 제거

  if (newToDo !== '') {
    // 입력된 값이 빈 문자열이 아닐 경우에만 할 일 목록에 추가
    toDoArr.push(newToDo);
    showToDo(newToDo);
    saveToDo();
    updateCount();
  }

  toDoInput.value = ''; // 입력필드 초기화
}

toDoForm.addEventListener('submit', submitToDo);

// 입력 받은 할 일 목록 출력 함수
function showToDo(newToDo, isChecked = false) {
  const listItem = document.createElement('li');
  const span = document.createElement('span');
  const buttonsContainer = document.createElement('div');
  const deleteButton = document.createElement('button');
  const checkButton = document.createElement('button');

  listItem.className = 'todo-item';
  span.className = 'todo-text';
  deleteButton.className = 'delete-btn';
  checkButton.className = 'check-btn';

  span.innerText = newToDo;

  if (isChecked) {
    span.classList.add('text-decoration-line-through'); // 체크 상태 반영
    checkButton.classList.add('checked');
  }

  deleteButton.addEventListener('click', () => {
    const itemIndex = toDoArr.indexOf(newToDo);
    deleteToDo(itemIndex, newToDo);
    listItem.remove(); // listItem을 DOM에서 직접 제거
  });

  // 체크 버튼 클릭 시 이벤트 리스너
  checkButton.addEventListener('click', () => {
    const isCompleted = span.classList.contains('text-decoration-line-through');
    span.classList.toggle('text-decoration-line-through', !isCompleted); // CSS 클래스를 통해 스타일 변경

    checkButton.classList.toggle('checked', !isCompleted);

    if (!isCompleted) {
      doneToDoArr.push(newToDo); // 체크되면 doneToDoArr에 추가
    } else {
      const doneIndex = doneToDoArr.indexOf(newToDo);
      if (doneIndex !== -1) {
        doneToDoArr.splice(doneIndex, 1); // 체크 해제되면 doneToDoArr에서 제거
      }
    }
    saveToDo(); // 변경된 doneToDoArr을 로컬 스토리지에 저장
    updateCount();
  });

  buttonsContainer.append(checkButton, deleteButton);
  listItem.append(span, buttonsContainer);
  toDoList.appendChild(listItem); // listItem을 toDoList에 추가
}

// 할 일 목록 삭제 함수
function deleteToDo(index, todoText) {
  toDoArr.splice(index, 1); // 특정 인덱스의 할 일을 배열에서 제거
  // doneToDoArr에서도 제거
  const doneIndex = doneToDoArr.indexOf(todoText);
  if (doneIndex !== -1) {
    doneToDoArr.splice(doneIndex, 1);
  }
  saveToDo(); // 로컬 스토리지 업데이트
  updateCount();
}

// 로컬스토리지 저장 함수
function saveToDo() {
  localStorage.setItem('toDoArr', JSON.stringify(toDoArr));
  localStorage.setItem('doneToDoArr', JSON.stringify(doneToDoArr));
}

// 로컬스토리지에서 목록 불러오는 함수
function loadFromLocalStorage() {
  const savedDoneToDo = localStorage.getItem('doneToDoArr');
  const savedToDo = localStorage.getItem('toDoArr');

  if (savedDoneToDo !== null) {
    const parsedDoneToDo = JSON.parse(savedDoneToDo);
    doneToDoArr = parsedDoneToDo;
  }

  if (savedToDo !== null) {
    const parsedToDo = JSON.parse(savedToDo);
    toDoArr = parsedToDo;
    parsedToDo.forEach((toDoItem) => {
      const isChecked = doneToDoArr.includes(toDoItem); // doneToDoArr에 포함되어 있으면 true
      showToDo(toDoItem, isChecked); // 체크 상태 정보를 showToDo 함수로 전달
    });
  }
}

// 할 일 목록 개수 카운트 함수
function updateCount() {
  const toDoCount = toDoArr.length;
  const doneToDoCount = doneToDoArr.length;
  document.getElementById('count').innerText = `${doneToDoCount}/${toDoCount}`;
}

// 오늘 날짜와 요일
function todayDate() {
  const today = new Date();
  const days = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  const date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  const day = days[today.getDay()];

  document.getElementById('date').innerText = `${date} ${day}`;
}

const init = () => {
  loadFromLocalStorage();
  todayDate();
  updateCount();
};

init();
