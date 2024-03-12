const toDoForm = document.getElementById('todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.getElementById('todo-list');

// 할 일 목록 추가 함수
function handleSubmit(event) {
  event.preventDefault(); // submit 새로고침 방지
  const newToDo = toDoInput.value; // input값 저장
  toDoInput.value = ''; // 입력필드 초기화
  showToDo(newToDo);
}

toDoForm.addEventListener('submit', handleSubmit);

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
  deleteButton.innerText = '삭제하기';
  deleteButton.addEventListener('click', deleteToDo);

  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(deleteButton);
  toDoList.appendChild(listItem); // listItem을 toDoList에 추가
}

// 할 일 삭제 함수
function deleteToDo(event) {
  const selectedItem = event.target.parentElement; // 삭제 버튼의 부모 항목을 li에 저장
  selectedItem.remove();
}
