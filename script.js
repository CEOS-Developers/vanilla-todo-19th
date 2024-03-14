  const dateElement = document.getElementById('date');
  const todoInput = document.getElementById('todoInput');
  const addButton = document.getElementById('addButton');
  const todoList = document.getElementById('todoList');
  const completedList = document.getElementById('completedList');
  const trashButton = document.getElementById('trashButton');
  const completeButton = document.getElementById('completeButton');
  const resetButton = document.getElementById('resetButton');
  let selectedTodos = [];


  initializeEventListeners();

function getCurrentDateFormatted() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return today.toLocaleDateString('ko-KR', options);
  }
  
  function toggleSelection(item) {
    item.classList.toggle('selected');
    const isSelected = selectedTodos.includes(item);
  
    if (isSelected) {
      selectedTodos = selectedTodos.filter(todoItem => todoItem !== item);
    } else {
      selectedTodos.push(item);
    }
  }
  
  function addTodoItem(text) {
    const todoItem = document.createElement('li');
    todoItem.innerText = text;
    todoList.appendChild(todoItem);
    updateLocalStorage();
    updateTodoStatus();
  }
  
  function updateLocalStorage() {
    localStorage.setItem('todoList', todoList.innerHTML);
    localStorage.setItem('completedList', completedList.innerHTML);
  }
  
  function loadListFromLocalStorage() {
    const todoListData = localStorage.getItem('todoList');
    const completedListData = localStorage.getItem('completedList');
  
    if (todoListData) todoList.innerHTML = todoListData;
    if (completedListData) completedList.innerHTML = completedListData;
  
    completedList.querySelectorAll('li').forEach(item => item.classList.remove('selected'));
    selectedTodos = [];
  }
  
  function setupInputField() {
    todoInput.addEventListener('input', () => {
      const trimmedValue = todoInput.value.trim();
      todoInput.classList.toggle('inputFilled', trimmedValue !== '');
      if (trimmedValue.length > 20) {
        todoInput.value = trimmedValue.slice(0, 20);
      }
    });
  }
  
  function initializeEventListeners() {
  
    todoList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        event.target.classList.toggle('clicked');
        toggleSelection(event.target);
      }
    });
  
    completedList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
        toggleSelection(event.target);
      }
    });

    addButton.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
          addTodoItem(text);
          todoInput.value = '';
          todoInput.classList.remove('inputFilled');
          todoInput.focus();
        }
      });
  
    trashButton.addEventListener('click', () => {
      selectedTodos.forEach(todoItem => todoItem.remove());
      updateLocalStorage();
      updateTodoStatus();
      selectedTodos = [];
      todoInput.value = '';
      todoInput.classList.remove('inputFilled');
      todoInput.focus();
    });
  
    completeButton.addEventListener('click', () => {
      selectedTodos.forEach(todoItem => {
        todoItem.classList.add('completed');
        todoItem.classList.remove('selected');
        completedList.appendChild(todoItem);
      });
      updateLocalStorage();
      loadListFromLocalStorage();
      updateTodoStatus();
      selectedTodos = [];
      todoInput.value = '';
      todoInput.classList.remove('inputFilled');
      todoInput.focus();
    });
    
    resetButton.addEventListener('click', function() {
        selectedTodos.forEach(todoItem => {
          todoItem.classList.remove('completed', 'selected', 'clicked');
          todoItem.style.backgroundColor = ''; //배경색 초기화 
         
          if (todoItem.parentElement === completedList) {  // 완료된 목록-> 할 일 목록
            todoList.appendChild(todoItem);
          }
        });
        localStorage.setItem('todoList', todoList.innerHTML);
        localStorage.setItem('completedList', completedList.innerHTML);
        selectedTodos = []; 
        updateTodoStatus();
        todoInput.value = '';
        todoInput.classList.remove('inputFilled');
        todoInput.focus();
      });
      
      
 
    todoInput.addEventListener('keypress', event => {
      if (event.key === 'Enter' && todoInput.value.trim()) {
        addButton.click();
        todoInput.value = ''; 
      todoInput.classList.remove('inputFilled'); 
      todoInput.focus(); 
        event.preventDefault();
        updateTodoStatus();
      }
      
    });
  
    document.addEventListener('DOMContentLoaded', function() {
        dateElement.innerText = getCurrentDateFormatted();
        loadListFromLocalStorage();
        setupInputField();
        updateTodoStatus(); 
    });
  }
  

  function updateTodoStatus() {
    const todoListItems = document.querySelectorAll('#todoList li');
    const completedListItems = document.querySelectorAll('#completedList li');
    const totalItems = todoListItems.length + completedListItems.length;
    const completedItems = completedListItems.length;
    const progressBarContainer = document.getElementById('progressBarContainer');
    const taskInfo = document.getElementById('taskInfo');

    progressBarContainer.innerHTML = '';

    const isAllCompleted = totalItems === completedItems;

    //100% 완료 -> 할일 색상 변경
    if (isAllCompleted) {
        taskInfo.style.color = '#fff'; 
        taskInfo.style.backgroundColor = '#FB84DA';
        taskInfo.style.borderRadius = '15%';
        taskInfo.style.padding = '0.1rem 0.3rem 0.1rem 0.3rem ';
    } else {
        taskInfo.style.color = 'gray'; 
        taskInfo.style.backgroundColor = '#ECECD8';

    }

    for (let i = 0; i < totalItems; i++) {
        const box = document.createElement('div');
        box.classList.add('progressBox');
        //100% 완료 -> 상태바 색상 변경
        if (i < completedItems) {
            box.style.backgroundColor = isAllCompleted ? '#63E095' : '#ECFF76';
        } 
        
        progressBarContainer.appendChild(box);
    }

    taskInfo.textContent = `${completedItems}/${totalItems}`;
}


updateTodoStatus();



  
  
  
  
