const inputField = document.querySelector('.todo-input'); //todo 입력창
const TodoButton = document.querySelector('.todo-input-button'); //+추가 버튼
const todoLists = document.querySelector('.todo-lists'); //todo list목록
const doneLists = document.querySelector('.done-lists'); //done list목록
const date = document.querySelector('h1#date'); //날짜 표기
const week = document.querySelector('h3#week'); //요일 표기
const showTodoNumber = document.querySelector('.show-todo-number'); //todo list div 개수
const showDoneNumber = document.querySelector('.show-done-number'); //done list div 개수


//lists 개수 세기
function todoListsNumber(){
    const todoNumber = todoLists.getElementsByTagName("div");
    const doneNumber = doneLists.getElementsByTagName("div");
    
    showTodoNumber.innerText = `${todoNumber.length} lists to do`;
    showDoneNumber.innerText = `${doneNumber.length} lists are done! Way to go : )`
}
todoListsNumber();


//+ 버튼 클릭시 todo에 list를 추가
TodoButton.addEventListener('click', addTodo); 
function addTodo(event){
    event.preventDefault(); //event에 대한 기본 동작 실행 방지
    
    //todo list div 생성
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    //todo list li 생성
    const todoLi = document.createElement("li");
    todoLi.classList.add("todo-li");
   
   
    //todo list 삭제 button 생성
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-circle-minus" style="color: #ff5f58;"></i>'
    deleteButton.classList.add('delete-button');
   
     //todo list done button 생성
     const doneButton = document.createElement('button');
     doneButton.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #28c840;"></i>';
     doneButton.classList.add("done-button");


    //공백 여부에 따른 처리
    if(!inputField.value.trim())
            alert("할일을 추가해 보세요!");
    else{
        todoLi.innerText = inputField.value;
        todoDiv.appendChild(todoLi);
        todoDiv.appendChild(deleteButton);
        todoDiv.appendChild(doneButton);
        todoLists.appendChild(todoDiv);
        todoListsNumber();
    }

    //input field 초기화
    inputField.value = '';
}  

//enter키 입력시 + 버튼 누른 효과
inputField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        TodoButton.click();
    }
});


//todoLists의 버튼 클릭 함수
todoLists.addEventListener('click', deleteDoneTodo);
function deleteDoneTodo(e){
    const item = e.target;

    //delete 버튼 클릭시 삭제
    if(item.classList[0] === "delete-button"){
        const todoItem = item.parentElement;
        todoItem.remove();
        todoListsNumber();
    }

    //done 버튼 클릭시 donelists로 이동
    if(item.classList[0] === "done-button"){
        const doneItem = item.parentElement;
        doneLists.appendChild(doneItem);
        doneItem.classList.add('done-div'); //done lists는 따로 css 부여
        todoListsNumber();
    }
}

//doneLists의 삭제 버튼 클릭 함수
doneLists.addEventListener('click', deleteDone);
function deleteDone(e){
    const item = e.target;

    if(item.classList[0] === 'delete-button'){
        const doneItem = item.parentElement;
        doneItem.remove();
        todoListsNumber();
    }
}



//날짜 표기 함수
const getDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1; //js 자체 오류 보정
    const day = newDate.getDate();

    date.innerText = `${year}년 ${month}월 ${day}일`;
};
//요일 표기 함수
const getWeek = () => {
    const daysOfWeek = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    const newDate = new Date();
    const newWeek = daysOfWeek[newDate.getDay()];

    week.innerText = `${newWeek}`;
};
getDate();
getWeek();