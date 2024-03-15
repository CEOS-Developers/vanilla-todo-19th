import { $ } from './util.js';

// 오늘 날짜 문자열 반환
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString();
  const date = today.getDate().toString();

  const dayToString = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayToString[today.getDay()];

  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

// 할 일 아이템 생성
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

// 할 일 추가 이벤트 핸들러
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

// 할 일 이동 이벤트 핸들러
const moveTodo = (e) => {
  const circleIcon = e.target;
  const clickedTodo = circleIcon.parentNode;
  const targetList = clickedTodo.closest('.todo-list') ? '.done-list' : '.todo-list';

  circleIcon.classList.toggle('fa-circle');
  circleIcon.classList.toggle('fa-check-circle');
  $(targetList).append(clickedTodo);

  updateListCount();
};

const deleteTodo = (e) => {
  const clickedTodo = e.target.closest('li');
  clickedTodo.remove();

  updateListCount();
};

// 할 일 리스트 개수 업데이트
const updateListCount = () => {
  $('.todo-count').textContent = `/ ${$('.todo-list').childElementCount}개`;
  $('.done-count').textContent = `/ ${$('.done-list').childElementCount} 개`;
};

const showUserName = () => {
  const userName = prompt('이름을 알려주세요!');
  if (userName) {
    $('.userName').textContent = `${userName}의 `;
  }
};

// 초기 실행 함수
const init = () => {
  showUserName();
  $('.date').textContent = getTodayDate();
  $('.input-form').addEventListener('submit', addTodo);
};

// 초기 실행
init();
