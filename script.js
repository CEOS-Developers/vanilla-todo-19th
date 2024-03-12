function makeHistoryElement() {
  let countWorkInProgress = 0;
  let countDone = 0;

  const historyH2 = document.createElement("h2");
  historyH2.textContent = "Current";

  const historyDiv = document.createElement("div");
  historyDiv.className = "detail";

  const workInProgress = document.createElement("i");
  workInProgress.textContent = "WORK IN PROGRESS";
  const workInProgressSpan = document.createElement("span");
  workInProgressSpan.textContent = countWorkInProgress.toLocaleString();
  workInProgressSpan.className = "workInProgress";
  const done = document.createElement("i");
  done.textContent = "DONE";
  const doneSpan = document.createElement("span");
  doneSpan.textContent = countDone.toLocaleString();
  doneSpan.className = "countDone";

  historyDiv.append(workInProgress, workInProgressSpan, done, doneSpan);

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

function render() {
  makeHistoryElement();
  getTodayDate();
}

render();
