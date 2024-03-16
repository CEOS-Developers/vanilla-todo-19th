import { $, $all } from './util.js';

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
  const newItem = document.createElement('li');

  // draggable 속성 추가
  newItem.setAttribute('draggable', true);
  newItem.classList.add('draggable');

  // 동그라미 아이콘
  const circleIcon = document.createElement('i');
  circleIcon.classList.add('fa-regular', 'fa-circle', 'cursor-pointer');

  if (isDone) {
    circleIcon.classList.add('fa-check-circle');
  }
  // 누르면 done으로 이동하는 이벤트 리스너 등록
  circleIcon.addEventListener('click', moveItem);
  newItem.append(circleIcon);

  // 입력받은 Text
  const todoText = document.createTextNode(text);
  newItem.append(todoText);

  // 쓰레기통 아이콘
  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fa-solid', 'fa-trash-can', 'cursor-pointer');

  // 누르면 삭제
  trashIcon.addEventListener('click', deleteItem);
  newItem.append(trashIcon);

  return newItem;
};

// 할 일 추가 이벤트 핸들러
const addItem = (e) => {
  e.preventDefault();

  // 빈 값 입력시 에러 처리
  const inputValue = $('.input').value.trim();
  if (!inputValue) {
    $('.error').textContent = '내용을 입력해주세요';
    return;
  }
  $('.error').textContent = '';

  // 새로운 list 아이템  만들기
  const newItem = createItem(inputValue);

  // list에 추가
  $('.todo-list').append(newItem);

  // 인풋 비워주기
  $('.input').value = '';

  updateListCount();
  saveToLocalStorage();
};

// 할 일 이동 이벤트 핸들러
const moveItem = (e) => {
  const circleIcon = e.target;

  // 부모 요소 찾기 (아이콘의 부모 요소가 li)
  const clickedItem = circleIcon.parentNode;

  // 이동할 리스트 정하기
  const targetList = clickedItem.closest('.todo-list') ? '.done-list' : '.todo-list';

  // 동그라미 <-> 체크 동그라미
  circleIcon.classList.toggle('fa-circle');
  circleIcon.classList.toggle('fa-check-circle');
  $(targetList).append(clickedItem);

  updateListCount();
  saveToLocalStorage();
};

// 할 일 삭제 이벤트 핸들러
const deleteItem = (e) => {
  // 쓰레기통 아이콘의 부모 요소 찾기
  const clickedItem = e.target.closest('li');
  clickedItem.remove();

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
    return;
  }
  const userName = prompt('이름을 알려주세요!');
  if (userName) {
    $('.userName').textContent = `${userName}의 `;
    localStorage.setItem('userName', userName);
  }
};

const addDragDropEvents = () => {
  const draggableItems = $all('.draggable');
  const containers = $all('.list');

  draggableItems.forEach((el) => {
    el.addEventListener('dragstart', () => {
      el.classList.add('dragging');
    });

    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
    });
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }

  containers.forEach((container) => {
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      container.insertBefore(draggable, afterElement);
    });
  });
};

// 초기 실행 함수
const init = () => {
  showUserName();
  $('.date').textContent = getTodayDate();
  $('.input-form').addEventListener('submit', addItem);

  loadFromLocalStorage();
  addDragDropEvents();
};

// 초기 실행
init();
