// 오늘 날짜 반환 함수
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2); //❗고민
  const day = ("0" + today.getDate()).slice(-2); //❗고민

  return `${year}.${month}.${day}`;
};

// Todo <-> Done 이동 함수
const moveItem = (todoListNode) => {
  const isDone = todoListNode.classList.contains("done");
  const todoUl = document.querySelector(".todo-box__todo ul");
  const doneUl = document.querySelector(".todo-box__done ul");

  // ❗ ????아니 걍 appendChild하면 복사될줄 알았는데 자동으로 삭제도 되네???이게 뭔일임 질문하자
  if (isDone) {
    doneUl.appendChild(todoListNode);
  } else {
    todoUl.appendChild(todoListNode);
  }
};

// Todo Progress Bar 업데이트
const updateItemCount = () => {
  console.log("update");
  const todoUl = document.querySelector(".todo-box__todo ul");
  const doneUl = document.querySelector(".todo-box__done ul");

  const todoCount = todoUl.childElementCount;
  const doneCount = doneUl.childElementCount;
  console.log(`${doneCount} / ${doneCount + todoCount}`);
};

// Todo 또는 Done class 토글 함수
const toggleTodo = (e) => {
  const todoListNode = e.target.parentElement;
  todoListNode.classList.toggle("done");
  // 이동
  moveItem(todoListNode);
  // Progess bar 업데이트
  updateItemCount();
};

const deleteItem = (e) => {
  const todoListNode = e.target.parentElement.parentElement;
  // 삭제
  todoListNode.remove();
  // Progess bar 업데이트
  updateItemCount();
};

// 할일 추가 함수 ❗내부 분리할 필요 있을까?
const addTodo = () => {
  // input에 입력한 값 가져오기
  const todoInput = document.querySelector(".input-box input");
  const todoInputText = todoInput.value;

  // 노드 생성 & 계층 세팅
  const todoListNode = document.createElement("li");
  const todoTextNode = document.createElement("span");
  const todoDeleteBtnNode = document.createElement("button");
  todoDeleteBtnNode.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
  todoListNode.append(todoTextNode, todoDeleteBtnNode);

  // Todo 텍스트 설정
  todoTextNode.textContent = todoInputText;
  todoTextNode.addEventListener("click", toggleTodo);

  // Delete 버튼 설정
  todoDeleteBtnNode.addEventListener("click", deleteItem);

  // 추가
  const todoUl = document.querySelector(".todo-box__todo ul");
  todoUl.appendChild(todoListNode);

  // Progess bar 업데이트
  updateItemCount();

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
