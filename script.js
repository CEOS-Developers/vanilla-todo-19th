function makeListElement(id, description) {
  const descriptionSpan = document.createElement("span");
  descriptionSpan.textContent = description;
  descriptionSpan.className = "description";

  const doneIcon = document.createElement("i");
  doneIcon.textContent = "DONE";
  doneIcon.className = `doneButton ${id}`;
  // 삭제하기 기능 추가
  doneIcon.addEventListener("click", function () {
    handleDone(id);
  });
  const li = document.createElement("li");
  li.append(descriptionSpan, doneIcon);
  const ul = document.querySelector("ul");
  ul.appendChild(li);
}

function makeHistoryElement() {
  let countSchedule = 0;
  let countDone = 0;

  const historyH2 = document.createElement("h2");
  historyH2.textContent = "Current";

  const historyDiv = document.createElement("div");
  historyDiv.className = "detail";

  const schedule = document.createElement("i");
  schedule.textContent = "SCHEDULE";
  const scheduleSpan = document.createElement("span");
  scheduleSpan.textContent = countSchedule.toLocaleString();
  scheduleSpan.className = "countSchedule";
  const done = document.createElement("i");
  done.textContent = "DONE";
  const doneSpan = document.createElement("span");
  doneSpan.textContent = countDone.toLocaleString();
  doneSpan.className = "countDone";

  historyDiv.append(schedule, scheduleSpan, done, doneSpan);

  const historyElement = document.querySelectorAll(".history")[0];
  historyElement.append(historyH2, historyDiv);
}

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const dateElement = document.querySelector(".date");
  dateElement.append(`${year}.${month}.${day}`);
}

function handleModal(){
  
}
function render() {
  makeHistoryElement();
  getTodayDate();
}

render();
