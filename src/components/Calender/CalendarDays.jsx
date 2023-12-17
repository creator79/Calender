/* eslint-disable no-unused-vars */
import React from 'react';
import './calendar.css';

const storedValue = JSON.parse(localStorage.getItem("events")) ;
function CalendarDays(props) {
  const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      events: props.events.filter((event) => event.date === firstDayOfMonth.toDateString()),
    };

    currentDays.push(calendarDay);
  }
// console.log(storedValue);

const eventsMapping = {};
storedValue.forEach((event) => {
  const eventDate = new Date(event.date);
  const key = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
  eventsMapping[key] = true;
})



  return (



  //   <div className="table-content">
  //   {currentDays.map((day) => (
  //     <div
  //       key={`${day.year}-${day.month}-${day.number}`}
  //       className={`calendar-day${day.currentMonth ? ' current' : ''}${day.selected ? ' selected' : ''}${day.events.length > 0 ? ' with-events' : ''}${eventsMapping[`${day.year}-${day.month}-${day.number}`] ? ' has-events' : ''}`}
  //     >
  //       <p>{day.number}</p>
  //       {/* Add more logic or styles for days with events if needed */}
  //     </div>
  //   ))}
  // </div>

  <div className="table-content">
    {currentDays.map((day) => (
      <div
        key={`${day.year}-${day.month}-${day.number}`}
        className={`calendar-day${day.currentMonth ? ' current' : ''}${day.selected ? ' selected' : ''}${day.events.length > 0 ? ' with-events' : ''}${eventsMapping[`${day.year}-${day.month}-${day.number}`] ? ' has-events' : ''}`}
            onClick={() => props.changeCurrentDay(day)}
      >
        
            {/* date printed */}
            {/* those days number has same  as  eventsMapping marked as yellow   */}

            <p>{day.number}</p>


            


          </div>
        ))}
      </div>
    );
  }
export default CalendarDays;
