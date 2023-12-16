import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/calendars.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import EventCreateModal from "../components/EventCreateModal";
import { Button } from "react-bootstrap";

function CalendarDetailPage() {
  const { calendarId } = useParams();
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editableEventId, setEditableEventId] = useState(null);
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [calendarId]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/events/");
      const data = await response.json();
      const filteredEvents = data.filter(
        (event) => event.calendar == calendarId
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Ошибка при получении событий календаря:", error);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        calendar: calendarId,
        name: eventName,
        start_date: startDate,
        end_date: endDate,
      };
      const response = await fetch("http://localhost:8000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Добавьте заголовок авторизации, если это необходимо
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]); // Добавляем событие в список без повторной загрузки
        setEventName(""); // Сброс формы
        setStartDate("");
        setEndDate("");
      } else {
        // Обработка ошибок от сервера
        console.error("Ошибка при создании события");
      }
    } catch (error) {
      console.error("Ошибка при создании события:", error);
    }
  };

  const getDaysLeft = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatus = (endDate) => {
    const diffDays = getDaysLeft(endDate);

    if (diffDays > 30) {
      return <span style={{ color: "green" }}>Статус: Зеленый</span>;
    } else if (diffDays > 4) {
      return <span style={{ color: "yellow" }}>Статус: Желтый</span>;
    } else {
      return <span style={{ color: "red" }}>Статус: Красный</span>;
    }
  };

  const handleEdit = (event) => {
    setEditableEventId(event.id);
    setEditedStartDate(event.start_date);
    setEditedEndDate(event.end_date);
  };

  const handleSave = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/events/${eventId}/`,
        {
          method: "PATCH", // Или 'PUT', в зависимости от вашего API
          headers: {
            "Content-Type": "application/json",
            // Добавьте заголовок авторизации, если это необходимо
          },
          body: JSON.stringify({
            start_date: editedStartDate,
            end_date: editedEndDate,
          }),
        }
      );

      if (response.ok) {
        // Обработка успешного ответа
        const updatedEvent = await response.json();
        // Обновите список событий с новыми данными
        setEvents(
          events.map((event) =>
            event.id === eventId ? { ...event, ...updatedEvent } : event
          )
        );
        setEditableEventId(null); // Сброс редактируемого события
      } else {
        // Обработка ошибок от сервера
        console.error("Ошибка при сохранении изменений события");
      }
    } catch (error) {
      console.error("Ошибка при сохранении изменений события:", error);
    }
  };

  return (
    <div className="calendar_wrapper">
      <Header />
      <div className="calendar_content">
        <Nav />
        <div className="w-100 calendar_block">
          <Button onClick={() => setShowEventModal(true)}>
            Добавить событие
          </Button>
          <table className="table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Дней осталось</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const daysLeft = getDaysLeft(event.end_date) - 1;
                return (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    {editableEventId === event.id ? (
                      <>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={editedStartDate}
                            onChange={(e) => setEditedStartDate(e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="form-control"
                            value={editedEndDate}
                            onChange={(e) => setEditedEndDate(e.target.value)}
                          />
                        </td>
                        <td colSpan="2">
                          <button
                            className="btn btn-success"
                            onClick={() => handleSave(event.id)}
                          >
                            Сохранить
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{event.start_date}</td>
                        <td>{event.end_date}</td>
                        <td>{daysLeft > 0 ? `${daysLeft} д.` : "Истекло"}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(event)}
                          >
                            Изменить
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <EventCreateModal
            calendarId={calendarId}
            show={showEventModal}
            handleClose={() => setShowEventModal(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarDetailPage;
