// document.addEventListener('DOMContentLoaded', function () {
let countSchedule = 0;
let countDone = 0;

// current schedule&done
function makeHistoryElement(id) {
  if (id == 'schedule') {
    countSchedule += 1;
    if (countDone > 0) {
      countDone -= 1;
    }
  } else if (id == 'done') {
    countDone += 1;
    if (countSchedule > 0) {
      countSchedule -= 1;
    }
  } else if (id == 'newSchedule') {
    countSchedule += 1;
  } else if (id == 'trashSchedule') {
    countSchedule -= 1;
  } else if (id == 'trashDone') {
    countDone -= 1;
  }

  const historyH2 = document.createElement('h2');
  historyH2.textContent = 'Current';

  const historyDiv = document.createElement('div');
  historyDiv.className = 'detail';

  const schedule = document.createElement('i');
  schedule.textContent = 'SCHEDULE';
  const scheduleSpan = document.createElement('span');
  scheduleSpan.textContent = countSchedule.toLocaleString();
  scheduleSpan.className = 'countSchedule';
  const done = document.createElement('i');
  done.textContent = 'DONE';
  const doneSpan = document.createElement('span');
  doneSpan.textContent = countDone.toLocaleString();
  doneSpan.className = 'countDone';

  historyDiv.append(schedule, scheduleSpan, done, doneSpan);

  const historyElement = document.querySelectorAll('.history')[0];
  historyElement.innerHTML = '';
  historyElement.append(historyH2, historyDiv);
}

// 오늘 날짜
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateElement = document.querySelector('.date');
  dateElement.textContent = `${year}.${month}.${day}`;
}

// 모달 띄우기, 닫기
const editModalBackground = document.querySelector('.edit-modal-bg');
const editBtn = document.querySelector('footer button');

editBtn.addEventListener('click', function () {
  editModalBackground.style.display = 'flex';
});

function closeEditSchedule() {
  document.getElementById('addDescription').value = '';
  editModalBackground.style.display = 'none';
}

// 모달 저장, 닫기 버튼 이벤트함수
const saveBtn = document.querySelector('.save-btn');
const closeBtn = document.querySelector('.close-btn');

saveBtn.addEventListener('click', function () {
  const inputDescription = document.getElementById('addDescription').value;
  if (inputDescription.trim() !== '') {
    addTodoItem('newSchedule', inputDescription);
    closeEditSchedule();
  } else {
    alert('Please enter your TODO');
  }
});

closeBtn.addEventListener('click', function () {
  closeEditSchedule();
});

// 스케줄 리스트 추가하기
function addTodoItem(id, description) {
  const currentText = document.createElement('i');
  currentText.textContent = 'SCHEDULE';

  currentText.addEventListener('click', function () {
    if (currentText.textContent === 'SCHEDULE') {
      currentText.textContent = 'DONE';
      makeHistoryElement('done');
      li.classList.add('done');
    } else {
      currentText.textContent = 'SCHEDULE';
      makeHistoryElement('schedule');
      li.classList.remove('done');
      li.classList.add('schedule');
    }
  });

  // 리스트 삭제하기
  const trash = document.createElement('button');
  trash.textContent = 'DELETE';
  trash.className = 'trash';

  trash.addEventListener('click', function () {
    li.remove();

    if (currentText.textContent === 'DONE') {
      makeHistoryElement('trashDone');
    } else {
      makeHistoryElement('trashSchedule');
    }
  });

  const ul = document.querySelector('.list ul');
  const li = document.createElement('li');

  const detailDiv = document.createElement('div');
  detailDiv.append(description, trash);
  detailDiv.className = "detail-box";

  li.append(currentText, detailDiv);
  li.classList.add('schedule');
  ul.appendChild(li);
  makeHistoryElement(id);
}

// schedule, done 필터링 함수
let scheduleChecked = true;
let doneChecked = true;

const scheduleFilter = document.querySelector('label[for="schedule"]');
scheduleFilter.addEventListener('click', function () {
  scheduleChecked = !scheduleChecked;
  handleFilter();
});

const doneFilter = document.querySelector('label[for="done"]');
doneFilter.addEventListener('click', function () {
  doneChecked = !doneChecked;
  handleFilter();
});

function handleFilter() {
  const scheduleItems = document.querySelectorAll('.schedule');
  const doneItems = document.querySelectorAll('.done');

  scheduleItems.forEach((item) => {
    item.style.display = scheduleChecked ? 'flex' : 'none';
  });

  doneItems.forEach((item) => {
    item.style.display = doneChecked ? 'flex' : 'none';
  });
}

// 렌더링
makeHistoryElement();
getTodayDate();
// });
