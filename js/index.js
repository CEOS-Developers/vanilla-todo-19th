import { $ } from './util.js';

// 오늘 날짜 문자열 반환
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const date = today.getDate().toString().padStart(2, '0');

  const dayToString = ['일', '월', '화', '수', '목', '금', '토'];
  const day = dayToString[today.getDay()];

  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

// 할 일 아이템 생성
const createItem = (text, isDone = false) => {
  const newTodoItem = document.createElement('li');

  const circleIcon = document.createElement('i');
  circleIcon.classList.add('fa-regular', 'fa-circle', 'cursor-pointer');

  if (isDone) {
    circleIcon.classList.add('fa-check-circle');
  }
  circleIcon.addEventListener('click', moveItem);
  newTodoItem.append(circleIcon);

  const todoText = document.createTextNode(text);
  newTodoItem.append(todoText);

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash-can', 'cursor-pointer');
  trashIcon.addEventListener('click', deleteItem);
  newTodoItem.append(trashIcon);

  return newTodoItem;
};

// 할 일 추가 이벤트 핸들러
const addItem = (e) => {
  e.preventDefault();

  const inputValue = $('.input').value.trim();
  if (!inputValue) {
    $('.error').textContent = '내용을 입력해주세요';
    return;
  }
  $('.error').textContent = '';

  const newTodoItem = createItem(inputValue);
  $('.todo-list').append(newTodoItem);
  $('.input').value = '';

  newTodoItem.querySelector('.fa-circle').addEventListener('click', moveItem);
  newTodoItem.querySelector('.fa-trash-can').addEventListener('click', deleteItem);

  updateListCount();
  saveToLocalStorage();
};

// 할 일 이동 이벤트 핸들러
const moveItem = (e) => {
  const circleIcon = e.target;
  const clickedTodo = circleIcon.parentNode;
  const targetList = clickedTodo.closest('.todo-list') ? '.done-list' : '.todo-list';

  circleIcon.classList.toggle('fa-circle');
  circleIcon.classList.toggle('fa-check-circle');
  $(targetList).append(clickedTodo);

  updateListCount();
  saveToLocalStorage();
};

// 할 일 삭제 이벤트 핸들러
const deleteItem = (e) => {
  const clickedTodo = e.target.closest('li');
  clickedTodo.remove();

  updateListCount();
  saveToLocalStorage();
};

// 할 일 리스트 개수 업데이트
const updateListCount = () => {
  $('.todo-count').textContent = `/ ${$('.todo-list').childElementCount}개`;
  $('.done-count').textContent = `/ ${$('.done-list').childElementCount}개`;
};

// Local Storage에 저장
const saveToLocalStorage = () => {
  const todoListItems = Array.from($('.todo-list').children).map((item) => item.textContent);
  const doneListItems = Array.from($('.done-list').children).map((item) => item.textContent);

  localStorage.setItem('todoList', JSON.stringify(todoListItems));
  localStorage.setItem('doneList', JSON.stringify(doneListItems));
};

// Local Storage에서 할 일 목록 불러오기
const loadFromLocalStorage = () => {
  const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  todoList.forEach((item) => $('.todo-list').append(createItem(item)));

  const doneList = JSON.parse(localStorage.getItem('doneList')) || [];
  doneList.forEach((item) => $('.done-list').append(createItem(item, true)));

  updateListCount();
};

// 사용자 이름 설정
const showUserName = () => {
  const savedUserName = localStorage.getItem('userName');
  if (savedUserName) {
    $('.userName').textContent = `${savedUserName}의 `;
  } else {
    const userName = prompt('이름을 알려주세요!');
    if (userName) {
      $('.userName').textContent = `${userName}의 `;
      localStorage.setItem('userName', userName);
    }
  }
};

// 초기 실행 함수
const init = () => {
  showUserName();
  $('.date').textContent = getTodayDate();
  $('.input-form').addEventListener('submit', addItem);

  loadFromLocalStorage();
};

// 초기 실행
init();
