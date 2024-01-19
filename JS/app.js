const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentWeekDay = currentDate.getDay();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

let month = document.querySelector(".month");
let year = document.querySelector(".year");
let day = document.querySelector(".day");
let date = document.querySelector(".date");
let today = document.querySelector(".today1");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weeks_day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let userYear = currentYear;
let userMonth = months[currentMonth];
let userDayOfWeek = weeks_day[currentWeekDay];

function isLeapYear(userYear1) {
  return (
    (userYear1 % 4 === 0 && userYear1 % 100 !== 0) || userYear1 % 400 === 0
  );
}

const numOfDays = (mon) => {
  let t = mon;
  t++;
  if (t == 8 || (t < 8 && t % 2 != 0) || (t > 8 && t % 2 == 0)) return 31;
  else if (t == 2) return isLeapYear(userYear) == true ? 29 : 28;
  else return 30;
};

const updateCalender = (mo1) => {
  let D = document.querySelector(".days ul");
  let Str = "";
  const firstDay = new Date(userYear, months.indexOf(mo1), 1);
  let r = firstDay.getDay();
  for (let i = r; i > 0; i--) Str += `<li class="diff">${31 - i}</li>`;
  for (let index = 1; index <= numOfDays(months.indexOf(mo1)); index++) {
    if (index == currentDay) Str += `<li class="today">${index}</li>`;
    else Str += `<li>${index}</li>`;
  }
  const lastDay = new Date(userYear, months.indexOf(mo1) + 1, 0);
  let k = lastDay.getDay();
  if (k != 6) {
    for (let i = k, j = 1; i < 6; i++, j++) Str += `<li class="diff">${j}</li>`;

    D.innerHTML = Str;
  }
};

const main = () => {
  year.innerText = currentYear;
  month.innerText = months[currentMonth];
  day.innerText = weeks_day[currentWeekDay];
  date.innerText = currentDay;
  today.innerText = currentDate.toDateString();
  updateCalender(userMonth);
};
main();

let monthDownBtn = document.querySelector(".month-down");
let yearDownBtn = document.querySelector(".year-down");
let monthList = document.querySelector(".month-list");
let yearList = document.querySelector(".year-list");
let monthListOpen = false;
let yearListOpen = false;

let leftBtn = document.querySelector(".left-ico");
let rightBtn = document.querySelector(".right-ico");
let currMonth = document.querySelector(".month");
let currMonthName = currMonth.innerText;
let idx = months.indexOf(currMonthName);

const remove_month_year_curr = (id = idx ,yr = userYear) => {
  document.querySelector(`.M${id}`).classList.remove("curr");
  console.log(yr+" " +id)
  document.querySelector(`.Y${yr}`).classList.remove("curr");
};

const add_month_year_curr = (id = idx ,yr= userYear) => {
  document.querySelector(`.M${id}`).classList.add("curr");
  document.querySelector(`.Y${yr}`).classList.add("curr");
};

const setYear = () => {
  year.innerText = userYear;
};

const setMonth = (ee) => {
  month.innerText = ee;
};

yearList.addEventListener("click", (e1) => {
  remove_month_year_curr();
  userYear = e1.target.innerText;
  setYear();
  add_month_year_curr(idx,userYear);
  updateCalender(userMonth);
});

monthList.addEventListener("click", (e1) => {
  remove_month_year_curr(months.indexOf(userMonth));
   userMonth = e1.target.innerText;
   setMonth(userMonth);
  add_month_year_curr(months.indexOf(e1.target.innerText));
  updateCalender(userMonth);
});



(() => {
  monthList.innerHTML = `<ul>
    <li class="M0">January</li>
    <li class="M1">February</li>
    <li class="M2">March</li>
    <li class="M3">April</li>
    <li class="M4">May</li>
    <li class="M5">June</li>
    <li class="M6">July</li>
    <li class="M7">August</li>
    <li class="M8">September</li>
    <li class="M9">October</li>
    <li class="M10">November</li>
    <li class="M11">December</li>
</ul>`;
  yearList.innerHTML = `  <ul>
<li class="Y2020">2020</li>
<li class="Y2021">2021</li>
<li class="Y2022">2022</li>
<li class="Y2023">2023</li>
<li class="Y2024">2024</li>
<li class="Y2025">2025</li>
<li class="Y2026">2026</li>
<li class="Y2027">2027</li>
<li class="Y2028">2028</li>
<li class="Y2029">2029</li>
<li class="Y2030">2030</li>
</ul>`;
  add_month_year_curr();
})();

const setVisible = (e) => {
  e.classList.add("visible");
};

const removeVisible = (e) => {
  e.classList.remove("visible");
};

leftBtn.addEventListener("click", () => {
  remove_month_year_curr(idx);
  idx--;
  if (idx == -1) {
    idx = 11;
    userYear-=1;
  }
  currMonthName = months[idx];
  currMonth.innerText = currMonthName;
  add_month_year_curr();
  setYear();
  updateCalender(currMonthName);
});

rightBtn.addEventListener("click", () => {
  remove_month_year_curr(idx)
  idx++;
  if (idx == 12) {
    idx = 0;
    userYear+=1;
  }
  currMonthName = months[idx];
  currMonth.innerText = currMonthName;
  add_month_year_curr();
  setYear();
  updateCalender(currMonthName);
});

monthDownBtn.addEventListener("click", () => {
  if (monthListOpen == true) {
    monthListOpen = false;
    removeVisible(monthList);
  } else {
    monthListOpen = true;
    setVisible(monthList);
  }
});

yearDownBtn.addEventListener("click", () => {
  if (yearListOpen == true) {
    yearListOpen = false;

    removeVisible(yearList);
  } else {
    yearListOpen = true;
    setVisible(yearList);
  }
});
