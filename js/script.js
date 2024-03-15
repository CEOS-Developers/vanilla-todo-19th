import { $ } from './util.js';

const getTodayDate = () => {
  // 오늘 날짜
  const today = new Date();
  // 년도
  const year = today.getFullYear();
  // 월
  const month = (today.getMonth() + 1).toString();
  // 일
  const date = today.getDate().toString();

  const dayToString = ['월', '화', '수', '목', '금', '토', '일'];

  const day = dayToString[today.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

const addTodoList = (e) => {
  e.preventDefault();

  const inputValue = $('.input').value.trim();
  if (!inputValue) return;

  const newTodoItem = document.createElement('li');

  // 동그라미 아이콘
  const circleIcon = document.createElement('i');
  circleIcon.classList.add('fa-regular', 'fa-circle', 'cursor-pointer');
  newTodoItem.appendChild(circleIcon);

  // 할 일 텍스트
  const todoText = document.createTextNode(inputValue);
  newTodoItem.appendChild(todoText);

  // 쓰레기통 아이콘
  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash-can', 'cursor-pointer');
  newTodoItem.appendChild(trashIcon);

  // 투두에 추가
  const todoList = $('.todo-list');
  todoList.append(newTodoItem);

  circleIcon.addEventListener('click', moveToDoneList);
  trashIcon.addEventListener('click', deleteItem);
  $('.input').value = '';
};

const moveToDoneList = (e) => {
  const circleIcon = e.target;
  const clickedTodo = circleIcon.parentNode;

  // 만약 .todo 안에 있는 항목이라면
  if (clickedTodo.closest('.todo-list')) {
    circleIcon.classList.remove('fa-circle');
    circleIcon.classList.add('fa-check-circle');
    $('.done-list').append(clickedTodo);
  }
  // 만약 .done-list 안에 있는 항목이라면
  else if (clickedTodo.closest('.done-list')) {
    circleIcon.classList.remove('fa-check-circle');
    circleIcon.classList.add('fa-circle');
    $('.todo-list').append(clickedTodo);
  }
};

const deleteItem = (e) => {
  const clickedTodo = e.target.parentNode;
  clickedTodo.remove();
};

$('.date').textContent = getTodayDate();
$('.input-form').addEventListener('submit', addTodoList);
