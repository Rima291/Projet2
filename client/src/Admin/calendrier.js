import React, { useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import Dashboard from '../Admin/dashboardAdmin';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendrier = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt('Enter a new event title');
    if (title) {
      const newEvent = {
        id: events.length,
        title,
        start,
        end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleSelectEvent = (event) => {
    const confirmDelete = window.confirm('Do you want to delete this event?');
    if (confirmDelete) {
      setEvents(events.filter((e) => e.id !== event.id));
    }
  };

  const handleEventResize = (resizeEvent) => {
    const { event, start, end } = resizeEvent;
    const updatedEvent = { ...event, start, end };
    const updatedEvents = events.map((e) => (e.id === event.id ? updatedEvent : e));
    setEvents(updatedEvents);
  };

  const handleEventDrop = (dropEvent) => {
    const { event, start, end } = dropEvent;
    const updatedEvent = { ...event, start, end };
    const updatedEvents = events.map((e) => (e.id === event.id ? updatedEvent : e));
    setEvents(updatedEvents);
  };

  return (
    <>
      <Dashboard />
      <div style={{ height: '500px', width: '1000px', marginLeft: '400px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.WEEK}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventResize={handleEventResize}
          onEventDrop={handleEventDrop}
          resizable
          selectable
        />
      </div>
    </>
  );
};

export default Calendrier;
