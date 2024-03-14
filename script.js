// 오늘 날짜 반환 함수
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2); //❗고민
  const day = ("0" + today.getDate()).slice(-2); //❗고민

  return `${year}.${month}.${day}`;
};

// 할일 추가 함수
const addTodo = () => {
  // input에 입력한 값 가져오기
  const todoInput = document.querySelector(".input-box input");
  const todoInputText = todoInput.value;

  // li element 생성 후 input 값 세팅
  const todoListNode = document.createElement("li");
  todoListNode.textContent = todoInputText;

  // 추가
  const todoUl = document.querySelector(".todo-box__todo ul");
  todoUl.appendChild(todoListNode);

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
};

init();
