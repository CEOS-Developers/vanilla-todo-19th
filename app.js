const todoListAreaDiv = document
  .querySelector('.todo-area')
  .querySelector('.showing-list-area');

const doneListAreaDiv = document
  .querySelector('.done-area')
  .querySelector('.showing-list-area');

const inputBox = document.querySelector('.todo-input');

const todayDateInput = document.querySelector('.date-input');
const currentDate = new Date();
const formattedDate = currentDate.toISOString().slice(0, 10);
todayDateInput.value = formattedDate;

// 현재 선택된 날짜의 YYYY-MM-DD 문자열을 반환하는 함수
function getNowDateFormatString() {
  return todayDateInput.value;
}

// 웹 페이지가 처음 렌더링 되는 시점에 로컬 스토리지로 부터 불러옴. 아직 존재하지 않는다면 빈 배열을 할당(삼항 연산자 이용)
const firstDomMountedDateFormatString = getNowDateFormatString();

let todoList =
  localStorage.getItem('todoList')[firstDomMountedDateFormatString] === null
    ? []
    : localStorage.getItem('todoList')[firstDomMountedDateFormatString];
let doneList =
  localStorage.getItem('doneList')[firstDomMountedDateFormatString] === null
    ? []
    : localStorage.getItem('doneList')[firstDomMountedDateFormatString];

// 새로운 요소를 할일 UI 쪽에 추가하는 함수. 새로운 dom 요소를 생성하여 UI에 반영함
function addNewTodoListToShowingUI(newTodo) {
  const showingTodoDiv = document.createElement('div');
  showingTodoDiv.classList.add('showingTodo');
  showingTodoDiv.innerText = newTodo;
  todoListAreaDiv.appendChild(showingTodoDiv);
}

todoList.forEach((todo) => {
  addNewTodoListToShowingUI(todo);
});

doneList.forEach((done) => {
  const showingDoneDiv = document.createElement('div');
  showingDoneDiv.classList.add('showingDone');
  showingDoneDiv.innerText = done;
  todoListAreaDiv.appendChild(showingDoneDiv);
});

// 사용자가 input box에 내용을 입력하고 엔터 키를 눌러 제출할 때 트리거 되는 함수. 내부에서 유효성 검사를 수행한다.
function handleSubmitInputBoxByEnterKeyOrSubmitButton() {
  const inputBoxValue = inputBox.value.trim();
  if (inputBoxValue === '') {
    alert('내용을 입력한 뒤에 todo 리스트에 등록하세요');
    return;
  }

  todoList.push(inputBoxValue);
  addNewTodoListToShowingUI(inputBoxValue); // UI에 반영해 주었음
  inputBox.value = '';
}

// input box에 포커싱이 되어 있고 엔터키가 눌리면 UI 추가가 되어야 함
inputBox.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    addTodoItemToLocalStrage(inputBox.value.trim());
    handleSubmitInputBoxByEnterKeyOrSubmitButton();
  }
});

function addTodoItemToLocalStrage(todoItem) {
  const nowDateFormatString = getNowDateFormatString();
  if (localStorage.getItem('todoList') === null) {
    const newTodoListObject = {};
    newTodoListObject[nowDateFormatString] = [todoItem];
    localStorage.setItem('todoList', JSON.stringify(newTodoListObject));
  }
}
