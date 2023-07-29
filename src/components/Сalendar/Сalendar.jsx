import React from 'react';

export default function Сalendar({ date }) {
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
  const year = date.getFullYear();
  const month = date.toLocaleDateString('ru-RU', { month: 'long' });
  const day = date.toLocaleDateString('ru-RU', { day: 'numeric' });

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
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
    ).getDay();
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
  }, [])

  const TableRow = ({data}) => {
    return data.map((item , index, arr) =>                                                                   
      <tr key={index}>
        <td className={(arr[index][0] > 7 && index === 0) || (arr[index][0] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][0]}</td>
        <td className={(arr[index][1] > 7 && index === 0) || (arr[index][1] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][1]}</td>
        <td className={(arr[index][2] > 7 && index === 0) || (arr[index][2] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][2]}</td>
        <td className={(arr[index][3] > 7 && index === 0) || (arr[index][3] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][3]}</td>
        <td className={(arr[index][4] > 7 && index === 0) || (arr[index][4] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][4]}</td>
        <td className={(arr[index][5] > 7 && index === 0) || (arr[index][5] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][5]}</td>
        <td className={(arr[index][6] > 7 && index === 0) || (arr[index][6] < 7 && index === arr.length - 1) ? 'ui-datepicker-other-month' : ''}>{arr[index][6]}</td>
      </tr>
    );
  }

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
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>

        {
          <tbody>
            <TableRow data={allDaysResult}/>
          </tbody>
        }

      </table>
    </div>
  );
}
