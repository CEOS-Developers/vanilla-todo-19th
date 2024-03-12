// 웹 페이지가 처음 렌더링 되는 시점에 로컬 스토리지로 부터 불러옴. 아직 존재하지 않는다면 빈 배열을 할당(삼항 연산자 이용)
let todoList =
  localStorage.getItem('todoList') === null
    ? []
    : localStorage.getItem('todoList');
let doneList =
  localStorage.getItem('doneList') === null
    ? []
    : localStorage.getItem('doneList');

// dom 엘리먼트들을 픽해서 배열에 있던 것들을 추가해줌
const todoListAreaDiv = document
  .querySelector('.todo-area')
  .querySelector('.div');

todoList.forEach((todo) => {
  const showingTodoDiv = document.createElement('div');
  showingTodoDiv.classList.add('showingTodo');
  showingTodoDiv.innerText = todo;
  todoListAreaDiv.appendChild(showingTodoDiv);
});

const doneListAreaDiv = document
  .querySelector('.done-area')
  .querySelector('.div');

doneList.forEach((done) => {
  const showingDoneDiv = document.createElement('div');
  showingDoneDiv.classList.add('showingDone');
  showingDoneDiv.innerText = done;
  todoListAreaDiv.appendChild(showingDoneDiv);
});
