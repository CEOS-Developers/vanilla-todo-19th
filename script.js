// 오늘 날짜
const today = new Date();
const options = {
  month: "long",
  day: "numeric",
  weekday: "long",
};
const dateString = today.toLocaleDateString("ko-KR", options);

document.getElementById("todayDate").innerText = dateString;
