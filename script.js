// 오늘 날짜
const today = new Date();
const options = {
  month: "long",
  day: "numeric",
  weekday: "long",
};
const dateString = today.toLocaleDateString("ko-KR", options);

document.getElementById("todayDate").innerText = dateString;

document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todoForm");
  const inputField = document.querySelector(".TodoInput");
  const todoList = document.querySelector(".todoList");

  // 할 일 목록 불러오기 및 표시
  function loadToDos() {
    // 목록을 비우기
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }

    // 로컬 스토리지에서 할 일 목록을 불러와서 페이지에 추가
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    toDos.forEach((todo) => {
      addTodoItem(todo, false); // 이미 저장된 항목을 불러오므로, 여기서는 save 파라미터를 false로 설정
    });
  }

  // 할 일 추가
  function addTodoItem(todoText, save = true) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("animate-slide-down");

    const todoTextContent = document.createElement("span");
    todoTextContent.textContent = todoText;

    // 삭제 버튼
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.onclick = function () {
      // 애니메이션 클래스 추가
      todoItem.classList.add("animate-fade-out");

      todoItem.addEventListener("animationend", () => {
        todoList.removeChild(todoItem);
        removeTodoFromStorage(todoText);
      });
    };

    // 완료 체크 이미지 생성
    const completeCheck = document.createElement("img");
    completeCheck.src = "./icon/NotCheck.svg";
    completeCheck.style.cursor = "pointer";
    completeCheck.setAttribute("data-checked", "false");

    completeCheck.onclick = function () {
      const isChecked = this.getAttribute("data-checked") === "true";
      if (isChecked) {
        this.src = "./icon/NotCheck.svg";
        this.setAttribute("data-checked", "false");
        todoTextContent.style.textDecoration = "none";
        todoItem.style.color = "white";
      } else {
        this.src = "./icon/checkComplete.svg";
        this.setAttribute("data-checked", "true");
        todoTextContent.style.textDecoration = "line-through";
        todoItem.style.color = "#808080";
      }
    };

    todoList.insertBefore(todoItem, todoList.firstChild);
    todoItem.appendChild(completeCheck);
    todoItem.appendChild(todoTextContent);
    todoItem.appendChild(deleteButton);

    if (save) {
      saveTodoToStorage(todoText);
    }
  }

  // 로컬 스토리지에 할 일 저장
  function saveTodoToStorage(todoText) {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    toDos.push(todoText);
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }

  // 로컬 스토리지에서 할 일 삭제
  function removeTodoFromStorage(todoText) {
    const toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    const updatedToDos = toDos.filter((todo) => todo !== todoText);
    localStorage.setItem("toDos", JSON.stringify(updatedToDos));
  }

  // 폼 제출 이벤트 처리
  todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const todoText = inputField.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      inputField.value = "";
    }
  });

  // 페이지 로드 시 할 일 목록 불러오기
  loadToDos();
});
