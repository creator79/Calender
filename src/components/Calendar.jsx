import React, { useState, useEffect } from 'react';
import CalendarDays from './CalendarDays';
import './calendar.css';
import {useLocalStorage} from '../utils/useLocalStorage';


const Calendar = () => {

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentDay, setCurrentDay] = useState(new Date());
  const [events, setEvents] = useLocalStorage('events',[]);
  const [selectedDate, setSelectedDate] = useState(null);
  useEffect(() => {
    // Load events from local storage on mount
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    // Save events to local storage whenever events change
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
    setSelectedDate(new Date(day.year, day.month, day.number));
  };

  const nextDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 1)));
  };

  const previousDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 1)));
  };
  

  const addEvent = () => {
    const eventTitle = prompt('Enter event title:');
    if (eventTitle) {
      const newEvent = {
        title: eventTitle,
        date: new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()),
      };
      setEvents([...events, newEvent]);
    }
  };
  const editEvent = (index) => {
  const updatedTitle = prompt('Edit event title:', events[index].title);
  if (updatedTitle !== null) {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], title: updatedTitle };
    setEvents(updatedEvents);
  }
};


  const deleteEvent = (index) => {
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents);
  };

  const isDateWithEvents = (date) => {
    return events.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
        </div>
        <button onClick={addEvent}>Add Event</button>
        <div className="tools">
          <button onClick={previousDay}>&#x2190;</button>
          <p>{`${months[currentDay.getMonth()].substring(0, 3)} ${currentDay.getDate()}`}</p>
          <button onClick={nextDay}>&#x2192;</button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {weekdays.map((weekday) => (
            <div key={weekday} className="weekday">
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} events={events}   isDateWithEvents={isDateWithEvents} />
      </div>
      <div className="event-list">
        <h3>Events on {`${months[currentDay.getMonth()]} ${currentDay.getDate()}, ${currentDay.getFullYear()}`}</h3>
        <ul>
          {events
            .filter((event) => {
              const eventDate = new Date(event.date);
            
              return (
                eventDate.getDate() === currentDay.getDate() &&
                eventDate.getMonth() === currentDay.getMonth() &&
                eventDate.getFullYear() === currentDay.getFullYear()
              );
            })
            .map((event, index) => (
              <li key={index}>
                <p>{event.title}</p>
                
                <div className="event-buttons">
                  <button onClick={() => editEvent(index)}>Edit</button>
                  <button onClick={() => deleteEvent(index)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
