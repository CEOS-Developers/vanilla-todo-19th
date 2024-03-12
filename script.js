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

  historyDiv.appendChild(workInProgress);
  historyDiv.appendChild(workInProgressSpan);
  historyDiv.appendChild(done);
  historyDiv.appendChild(doneSpan);

  const historyElement = document.querySelectorAll(".history")[0];
  historyElement.appendChild(historyH2);
  historyElement.appendChild(historyDiv);
}

function render() {
  makeHistoryElement();
}

render();
