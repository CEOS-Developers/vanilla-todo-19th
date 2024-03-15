import { $ } from './util.js';

const getTodayDate = () => {
  // 오늘 날짜
  const today = new Date();

  // 년, 월, 일
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString();
  const date = today.getDate().toString();

  //요일 배열
  const dayToString = ['일', '월', '화', '수', '목', '금', '토'];

  const day = dayToString[today.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

const createTodo = (text) => {
  const newTodoItem = document.createElement('li');

  const circleIcon = document.createElement('i');
  circleIcon.classList.add('fa-regular', 'fa-circle', 'cursor-pointer');

  newTodoItem.appendChild(circleIcon);

  const todoText = document.createTextNode(text);
  newTodoItem.appendChild(todoText);

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash-can', 'cursor-pointer');
  newTodoItem.appendChild(trashIcon);

  return newTodoItem;
};

const addTodo = (e) => {
  e.preventDefault();

  const inputValue = $('.input').value.trim();
  if (!inputValue) {
    $('.error').textContent = '내용을 입력해주세요';
    return;
  }
  $('.error').textContent = '';

  const newTodoItem = createTodo(inputValue);
  $('.todo-list').append(newTodoItem);
  $('.input').value = '';

  newTodoItem.querySelector('.fa-circle').addEventListener('click', moveTodo);
  newTodoItem.querySelector('.fa-trash-can').addEventListener('click', deleteTodo);

  updateListCount();
};

const moveTodo = (e) => {
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

  updateListCount();
};

const deleteTodo = (e) => {
  const clickedTodo = e.target.parentNode;
  clickedTodo.remove();

  updateListCount();
};

const updateListCount = () => {
  $('.todo-count').textContent = '/ ' + $('.todo-list').childElementCount + '개';
  $('.done-count').textContent = '/' + $('.done-list').childElementCount + '개';
};

const showUserName = () => {
  const userName = prompt('이름을 알려주세요!');
  if (userName) {
    $('.userName').textContent = userName + '의 ';
  }
};

showUserName();
$('.date').textContent = getTodayDate();
$('.input-form').addEventListener('submit', addTodo);
