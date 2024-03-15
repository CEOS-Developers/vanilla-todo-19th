/*
  checkboxNumber: todoCard가 unique한 id를 갖기 위한 변수
*/
let checkboxNumber = 0;

//todoCard 만들기
const createTodoCard = (todo, isDone) => {
  const todoCard = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoContent = document.createElement('label');
  const todoDelete = document.createElement('div');

  todoCard.className = 'todoCard';
  checkbox.type = 'checkbox';
  checkbox.className = 'todoCheckbox';
  checkbox.id = `todoCheckbox${checkboxNumber}`;
  if (isDone) {
    checkbox.checked = true;
    todoCard.className = 'doneCard';
  } else {
    todoCard.className = 'todoCard';
  }
  todoContent.className = 'todoContent';
  todoContent.htmlFor = `todoCheckbox${checkboxNumber++}`;
  todoContent.textContent = todo;
  todoDelete.className = 'todoDelete';
  todoDelete.textContent = 'X';

  todoCard.append(checkbox, todoContent, todoDelete);
  if (isDone) {
    document.querySelector('.doneSection').append(todoCard);
  } else {
    document.querySelector('.todoSection').append(todoCard);
  }
};

//localstorage에 저장된 todo,done 불러오기
const todoList = JSON.parse(localStorage.getItem('todo'));
const donelist = JSON.parse(localStorage.getItem('done'));
if (todoList) {
  todoList.forEach((todo) => {
    createTodoCard(todo, false);
  });
}
if (donelist) {
  donelist.forEach((todo) => {
    createTodoCard(todo, true);
  });
}

//localstorage에 todo,done 추가하기
const addTodoToLocalStorage = (todo) => {
  const todoList = JSON.parse(localStorage.getItem('todo'));
  localStorage.removeItem('todo');
  if (todoList) {
    const newTodoList = [...todoList, todo];
    localStorage.setItem('todo', JSON.stringify(newTodoList));
  } else {
    localStorage.setItem('todo', JSON.stringify([todo]));
  }
};
const addDoneToLocalStorage = (todo) => {
  const doneList = JSON.parse(localStorage.getItem('done'));
  localStorage.removeItem('done');
  if (doneList) {
    const newDoneList = [...doneList, todo];
    localStorage.setItem('done', JSON.stringify(newDoneList));
  } else {
    localStorage.setItem('done', JSON.stringify([todo]));
  }
};

//localstorage에 todo,done 삭제하기
const deleteTodoFromLocalStorage = (todo) => {
  const todoList = JSON.parse(localStorage.getItem('todo'));
  const newTodoList = todoList.filter((item) => item !== todo);
  localStorage.setItem('todo', JSON.stringify(newTodoList));
};
const deleteDoneFromLocalStorage = (todo) => {
  const doneList = JSON.parse(localStorage.getItem('done'));
  const newDoneList = doneList.filter((item) => item !== todo);
  localStorage.setItem('done', JSON.stringify(newDoneList));
};

/* 
  doneCount: 완료 된 todo 개수
  todoCount: 등록 된 todo 개수
*/

let doneCount = document.querySelectorAll('.doneCard').length;
let todoCount = document.querySelectorAll('.todoCard').length + doneCount;

//등록 된 todo, 완료 된 todo 개수 표시
const noteTodoProgress = () => {
  document.querySelector(
    '.todoProgress'
  ).textContent = `${doneCount} 개 / ${todoCount} 개 `;
};
noteTodoProgress();

//오늘 날짜 표시
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const day = today.getDay();
const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
document.querySelector('.headerDate').append(`${date}`);
document.querySelector('.headerMonth').append(`${month}`);
document.querySelector('.headerYear').append(`${year}`);
document.querySelector('.headerDay').append(`${dayList[day]}`);

//개수 업데이트 함수
const updateTodoCount = () => {
  doneCount = document.querySelectorAll('.doneCard').length;
  todoCount = document.querySelectorAll('.todoCard').length + doneCount;
  noteTodoProgress();
};

//todo 추가하기
const todoInput = document.querySelector('.todoInput');

const pushNewTodo = () => {
  if (todoInput.value.trim()) {
    createTodoCard(todoInput.value, false);

    addTodoToLocalStorage(todoInput.value);
    todoInput.value = '';
    updateTodoCount();
  } else {
    todoInput.value = '';
    alert('할 일을 입력해주세요!');
  }
};

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    pushNewTodo();
  }
});

document.querySelector('.addTodo').addEventListener('click', pushNewTodo);

//todo 삭제하기
document.querySelector('.todoSection').addEventListener('click', (e) => {
  if (e.target.className === 'todoDelete') {
    e.target.parentElement.remove();
    updateTodoCount();
    deleteTodoFromLocalStorage(e.target.previousElementSibling.textContent);
  }
});

document.querySelector('.doneSection').addEventListener('click', (e) => {
  if (e.target.className === 'todoDelete') {
    e.target.parentElement.remove();
    updateTodoCount();
    deleteDoneFromLocalStorage(e.target.previousElementSibling.textContent);
  }
});

//완료 todo 옮기기
document.querySelector('.todoSection').addEventListener('click', (e) => {
  if (e.target.className === 'todoCheckbox') {
    const todoCard = e.target.parentElement;
    todoCard.className = 'doneCard';
    document.querySelector('.doneSection').append(todoCard);
    updateTodoCount();
    deleteTodoFromLocalStorage(e.target.nextElementSibling.textContent);
    addDoneToLocalStorage(e.target.nextElementSibling.textContent);
  }
});
document.querySelector('.doneSection').addEventListener('click', (e) => {
  if (e.target.className === 'todoCheckbox') {
    const doneCard = e.target.parentElement;
    doneCard.className = 'todoCard';
    document.querySelector('.todoSection').append(doneCard);
    updateTodoCount();
    deleteDoneFromLocalStorage(e.target.nextElementSibling.textContent);
    addTodoToLocalStorage(e.target.nextElementSibling.textContent);
  }
});
