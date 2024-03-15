import { $ } from './util.js';

const dayToString = ['월', '화', '수', '목', '금', '토', '일'];
const getTodayDate = () => {
  // 오늘 날짜
  const today = new Date();
  // 년도
  const year = today.getFullYear();
  // 월
  const month = (today.getMonth() + 1).toString();
  // 일
  const date = today.getDate().toString();

  const day = dayToString[today.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

$('.date').innerText = getTodayDate();
