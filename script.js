// 오늘 날짜 반환 함수
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2); //❗고민
  const day = ("0" + today.getDate()).slice(-2); //❗고민

  return `${year}.${month}.${day}`;
};

// 첫 화면 렌더링용 함수
const init = () => {
  // 오늘 날짜 세팅
  const date = document.querySelector(".date");
  date.textContent = getTodayDate();
};

init();
