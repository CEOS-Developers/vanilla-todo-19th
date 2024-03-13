document.addEventListener('DOMContentLoaded', function () {
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
      if (countSchedule > 0) {
        countSchedule -= 1;
        countDone += 1;
      }
    } else if (id == 'todaySchedule') {
      countSchedule += 1;
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
  const editModalBackground = document.querySelector('.editModalBackground');
  const editBtn = document.querySelector('footer button');

  editBtn.addEventListener('click', function () {
    editModalBackground.style.display = 'flex';
  });

  function closeEditSchedule() {
    document.getElementById('addDescription').value = '';
    editModalBackground.style.display = 'none';
  }

  // 모달 저장, 닫기 버튼 이벤트함수
  const saveBtn = document.querySelector('.saveBtn');
  const closeBtn = document.querySelector('.closeBtn');

  saveBtn.addEventListener('click', function () {
    const inputDescription = document.getElementById('addDescription').value;
    if (inputDescription.trim() !== '') {
      addTodoItem('todaySchedule', inputDescription);
      closeEditSchedule();
    } else {
      alert('Please enter a description.');
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

    const ul = document.querySelector('.list ul');
    const li = document.createElement('li');
    li.append(description, currentText);

    ul.appendChild(li);
    makeHistoryElement(id);
  }

  // schedule, done 필터링 함수
  let scheduleChecked = true;
  let doneChecked = true;

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

  // 렌더링
  makeHistoryElement();
  getTodayDate();
});
