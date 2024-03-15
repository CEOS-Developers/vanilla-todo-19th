const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

let toDoArr = [];
let doneToDoArr = [];

// 로컬스토리지 저장 함수
function saveToDo() {
  localStorage.setItem('toDoArr', JSON.stringify(toDoArr));
  localStorage.setItem('doneToDoArr', JSON.stringify(doneToDoArr));
}

// 총 할 일 개수와 완료한 일 개수 출력 함수
function updateCount() {
  const toDoCount = toDoArr.length;
  const doneToDoCount = doneToDoArr.length;
  console.log(`총 할 일 개수: ${toDoCount}, 완료한 일 개수: ${doneToDoCount}`);
}

const savedToDo = localStorage.getItem('toDoArr');
const savedDoneToDo = localStorage.getItem('doneToDoArr');
if (savedToDo !== null) {
  const parsedToDo = JSON.parse(savedToDo);
  toDo = parsedToDo;
  parsedToDo.forEach(showToDo);
}
if (savedDoneToDo !== null) {
  const parsedDoneToDo = JSON.parse(savedDoneToDo);
  doneToDo = parsedDoneToDo;
}

// 할 일 목록 추가 함수
function SubmitToDo(event) {
  event.preventDefault(); // submit 새로고침 방지
  const newToDo = toDoInput.value.trim(); // input값 저장 및 앞뒤 공백 제거

  // 입력된 값이 빈 문자열이 아닐 경우에만 할 일 목록에 추가
  if (newToDo !== '') {
    toDoArr.push(newToDo);
    showToDo(newToDo);
    saveToDo();
    updateCount();
  }

  toDoInput.value = ''; // 입력필드 초기화
}

toDoForm.addEventListener('submit', SubmitToDo);

// 입력 받은 할 일 목록 출력 함수
function showToDo(newToDo) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input'); // 체크박스 생성
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');

  listItem.className = 'todo-item';
  checkbox.className = 'todo-checkbox';
  span.className = 'todo-text';
  deleteButton.className = 'delete-btn';

  checkbox.type = 'checkbox';
  span.innerText = newToDo;
  deleteButton.addEventListener('click', () => {
    const itemIndex = toDoArr.indexOf(newToDo);
    deleteToDo(itemIndex);
    listItem.remove(); // listItem을 DOM에서 직접 제거
  });

  // span(텍스트) 클릭 시 체크박스 체크 상태 변경
  span.addEventListener('click', () => {
    checkbox.checked = !checkbox.checked;
    span.classList.toggle('text-decoration-line-through', checkbox.checked); // CSS 클래스를 통해 스타일 변경
  });

  // 체크박스 상태 변경 시 이벤트 리스너
  checkbox.addEventListener('change', () => {
    span.classList.toggle('text-decoration-line-through', checkbox.checked); // CSS 클래스를 통해 스타일 변경
  });

  listItem.append(checkbox, span, deleteButton);
  toDoList.appendChild(listItem); // listItem을 toDoList에 추가
}

// 할 일 목록 삭제 함수
function deleteToDo(index) {
  toDoArr.splice(index, 1); // 특정 인덱스의 할 일을 배열에서 제거
  saveToDo(); // 로컬 스토리지 업데이트
  updateCount();
}

// 오늘의 날짜
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date();
  const date =
    today.getFullYear() +
    '-' +
    (today.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    today.getDate().toString().padStart(2, '0');

  document.getElementById('date').innerText = date;
});
