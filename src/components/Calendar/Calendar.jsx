import React from 'react';

export default function Сalendar({ date }) {
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
  const year = date.getFullYear();
  const month = date.toLocaleDateString('ru-RU', { month: 'long' });
  const day = date.getDate();
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const daysOfWeekFull = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

  function capitalizeFirstLetter(str) {
    if (!str) {
      return str;
    }
    
    return str[0].toUpperCase() + str.slice(1);
  }

  const getMonthNameInGenitiveCase = () => {
    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    return month[date.getMonth()];
  }

  // Кол-во дней в текущем месяце
  function getDaysInCurrentMonth() {
    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
  }

  // Кол-во дней в пред месяце
  function getDaysInPrevMonth() {
    if (date.getMonth() === 0) {
      return new Date(
        date.getFullYear() - 1,
        12,
        0,
      ).getDate();
    }
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
    ).getDate();
  }

  // Номер первого дня недели в текущем месяце
  function getFirstWeekDayNumber() {
    const day = new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    ).getDay()

    if (day === 0) {
      return 7;
    }

    return day;
  }

  // Номер последнего дня недели в текущем месяце
  function getLastWeekDayNumber() {
    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDay();
  }
  const LastWeekDayNumber = getLastWeekDayNumber() ? getLastWeekDayNumber() : 7;

  // Остатки дней в пред месяце
  const daysPrevMonth = [];
  let j = (getDaysInPrevMonth() - getFirstWeekDayNumber() + 2);
  for (let i = j; i <= getDaysInPrevMonth(); i++) {
    daysPrevMonth.push(i);
  }

  console.log(j)
  
  // Массив дней в текущем месяце
  const daysCurrentMonth = [];
  for (let i = 1; i <= getDaysInCurrentMonth(); i++) {
    daysCurrentMonth[i - 1] = i;
  }

  // Остатки дней в след месяце
  const daysNextMonth = [];
  for (let i = 1; i <= 7 - LastWeekDayNumber; i++) {
    daysNextMonth.push(i);
  }

  // Все дни в календаре
  const allDays = [...daysPrevMonth, ...daysCurrentMonth, ...daysNextMonth];

  const perChunk = 7;  
  const allDaysResult = allDays.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk);
  
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
  
    resultArray[chunkIndex].push(item);
  
    return resultArray;
  }, []);

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{capitalizeFirstLetter(weekday)}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">{getMonthNameInGenitiveCase()}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>

      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{capitalizeFirstLetter(month)}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>

      <table className="ui-datepicker-calendar">
        <colgroup>
          <col/>
          <col/>
          <col/>
          <col/>
          <col/>
          <col className="ui-datepicker-week-end"/>
          <col className="ui-datepicker-week-end"/>
        </colgroup>

        <thead>
          <tr>
            {
              daysOfWeek.map((item , index) => {
                return (
                  <th key={index} scope="col" title={daysOfWeekFull[index]}>{item}</th>
                );
              })
            }
          </tr>
        </thead>

        {
          <tbody>
            <tr>
              {
                allDaysResult[0].map((item , index) => {
                  return (
                    <td key={index} className={item > 7 ? 'ui-datepicker-other-month' : day === item ? 'ui-datepicker-today': ''}>{item}</td>
                  );
                })  
              }                                                     
            </tr>
            
            {
              allDaysResult.slice(1, -1).map((item , index, arr) => {
                return (
                  <tr key={index}>
                    <td className={day === arr[index][0] ? 'ui-datepicker-today' : ''}>{arr[index][0]}</td>
                    <td className={day === arr[index][1] ? 'ui-datepicker-today' : ''}>{arr[index][1]}</td>
                    <td className={day === arr[index][2] ? 'ui-datepicker-today' : ''}>{arr[index][2]}</td>
                    <td className={day === arr[index][3] ? 'ui-datepicker-today' : ''}>{arr[index][3]}</td>
                    <td className={day === arr[index][4] ? 'ui-datepicker-today' : ''}>{arr[index][4]}</td>
                    <td className={day === arr[index][5] ? 'ui-datepicker-today' : ''}>{arr[index][5]}</td>
                    <td className={day === arr[index][6] ? 'ui-datepicker-today' : ''}>{arr[index][6]}</td>
                  </tr>  
                );
              })
            }

            <tr>
              {
                allDaysResult.at(-1).map((item , index) => {
                  return (
                    <td key={index} className={item < 7 ? 'ui-datepicker-other-month' : day === item ? 'ui-datepicker-today': ''}>{item}</td>
                  );
                })                                                                   
              }
            </tr>
          </tbody>
        }

      </table>
    </div>
  );
}
