// 전역
const todoUl = document.querySelector(".todo-box__todo ul");
const doneUl = document.querySelector(".todo-box__done ul");
// Todo, Done 리스트를 저장하는 전역 변수
let todoArr = [];
let doneArr = [];

// 오늘 날짜 반환 함수
const getTodayDate = () => {
  const today = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dayOfWeek = week[today.getDay()];

  https: return `${year}.${month}.${day} ${dayOfWeek}요일`;
};

// Local Storage에 저장
const setLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(todoArr));
  localStorage.setItem("done", JSON.stringify(doneArr));
};

// Local Storage 불러오기
const loadLocalStorage = () => {
  const todo = JSON.parse(localStorage.getItem("todo")) || [];
  const done = JSON.parse(localStorage.getItem("done")) || [];

  // todo 불러오기
  todo.forEach((element) => {
    todoUl.appendChild(createListElement(element));
    todoArr.push(element);
  });

  // done 불러오기
  done.forEach((element) => {
    doneUl.appendChild(createListElement(element));
    doneArr.push(element);
  });
  // 불러온 done에 class 세팅
  const doneli = document.querySelectorAll(".todo-box__done li");
  doneli.forEach((element) => {
    element.classList.add("done");
  });
};

// Todo <-> Done 이동 함수
const moveItem = (todoListNode) => {
  const isDone = todoListNode.classList.contains("done");
  if (isDone) {
    doneUl.appendChild(todoListNode);
    doneArr.push(todoListNode.textContent);
    todoArr = todoArr.filter((element) => element !== todoListNode.textContent);
  } else {
    todoUl.appendChild(todoListNode);
    todoArr.push(todoListNode.textContent);
    doneArr = doneArr.filter((element) => element !== todoListNode.textContent);
  }
};

// Todo Progress Bar 업데이트 함수
const updateItemCount = () => {
  const todoCount = todoUl.childElementCount;
  const doneCount = doneUl.childElementCount;
  const totalCount = todoCount + doneCount;

  const progressBarCount = document.querySelector(".progress-box__count");
  progressBarCount.textContent = `${doneCount} / ${totalCount}`;

  const progressBarDone = document.querySelector(".progress-box__bar-done");
  let doneRatio = 0;
  if (totalCount !== 0) doneRatio = (doneCount / totalCount) * 100;
  progressBarDone.style.width = `${doneRatio}%`;

  // 텍스트 세팅
  const progressText = document.querySelector(".progress-box__text");
  if (totalCount !== 0 && doneCount === totalCount) {
    progressText.textContent = "대단해요 !";
  } else {
    progressText.textContent = "달려봐요 !";
  }
};

// Todo 또는 Done class 토글 함수
const toggleTodo = (e) => {
  const todoListNode = e.target.parentElement;
  todoListNode.classList.toggle("done");
  // 이동
  moveItem(todoListNode);
  // Progess bar 업데이트
  updateItemCount();
  // Local Storage 업데이트
  setLocalStorage();
};

// 아이템 삭제 함수
const deleteItem = (e) => {
  const todoListNode = e.target.parentElement.parentElement;
  // 삭제
  todoListNode.remove();

  const isDone = todoListNode.classList.contains("done");
  if (isDone) {
    doneArr = doneArr.filter((element) => element !== todoListNode.textContent);
  } else {
    todoArr = todoArr.filter((element) => element !== todoListNode.textContent);
  }

  // Progess bar 업데이트
  updateItemCount();
  // Local Storage 업데이트
  setLocalStorage();
};

// Todo/Done 노드 생성 & 계층 세팅 함수
const createListElement = (txt) => {
  const todoListNode = document.createElement("li");
  const todoTextNode = document.createElement("span");
  const todoDeleteBtnNode = document.createElement("button");
  todoDeleteBtnNode.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  todoListNode.append(todoTextNode, todoDeleteBtnNode);

  // Todo 텍스트 설정
  todoTextNode.textContent = txt;
  todoTextNode.addEventListener("click", toggleTodo);
  // Delete 버튼 설정
  todoDeleteBtnNode.addEventListener("click", deleteItem);

  return todoListNode;
};

// 할일 추가 함수
const addTodo = () => {
  // input에 입력한 값 가져오기
  const todoInput = document.querySelector(".input-box input");
  const todoInputText = todoInput.value.trim();

  // 예외처리: 할일 중복 X
  if ([...todoArr, ...doneArr].includes(todoInputText)) {
    // 중복 할일 X
    alert("이미 존재하는 할 일 입니다!");
    todoInput.value = "";
    return;
  }

  // 예외처리: 할일 공백 X
  if (!todoInputText) return;

  // 추가
  todoUl.appendChild(createListElement(todoInputText));
  todoArr.push(todoInputText);

  // Progess bar 업데이트
  updateItemCount();
  // Local Storage 업데이트
  setLocalStorage();

  // input value 초기화
  todoInput.value = "";
};

// 첫 화면 렌더링용 함수
const init = () => {
  // 오늘 날짜 세팅
  const date = document.querySelector(".date");
  date.textContent = getTodayDate();

  // 엔터키 or 플러스 버튼을 누르면 할일 추가
  const todoInput = document.querySelector(".input-box input");
  const plusBtn = document.querySelector(".input-box button");
  todoInput.addEventListener("keyup", function handleEnter(e) {
    if (e.keyCode === 13) addTodo();
  });
  plusBtn.addEventListener("click", addTodo);

  // Local Storage 불러오기
  loadLocalStorage();

  // Progress Bar 세팅
  updateItemCount();
};

init();
