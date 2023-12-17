import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/calendars.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CalendarsPage = () => {
  const [calendars, setCalendars] = useState([]);
  const [newCalendarName, setNewCalendarName] = useState(""); // Состояние для хранения названия нового календаря
  const [showForm, setShowForm] = useState(false); // Состояние для управления отображением формы

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await fetch("http://0.0.0.0:8000/api/calendars/");
      const data = await response.json();
      setCalendars(data);
    } catch (error) {
      console.error("Ошибка при получении календарей:", error);
    }
  };

  const handleCreateCalendar = () => {
    setShowForm(true); // Отображаем форму
  };

  const handleClose = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://0.0.0.0:8000/api/calendars/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCalendarName }),
      });

      if (response.ok) {
        fetchCalendars();
        setNewCalendarName(""); 
        setShowForm(false); 
      } else {
        // Обработка ошибок от сервера
        console.error("Ошибка при создании календаря");
      }
    } catch (error) {
      console.error("Ошибка при создании календаря:", error);
    }
  };

  return (
    <div className="calendar_wrapper">
      <Header />
      <div className="calendar_content">
        <Nav />
        <div className="w-100 calendar_block">
          <div className="calendars">
            {calendars.map((calendar) => (
              <Link to={`/calendars/${calendar.id}`} key={calendar.id} className="calendar_item">{calendar.name}</Link>
            ))}
            <div className="calendar_item_add">
              <Button onClick={handleCreateCalendar} className="add_calend_btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  className="bi bi-plus-circle-fill plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
              </Button>

              <Modal show={showForm} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Создание календаря</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleSubmit} className="p-3 row gap-3">
                    <input
                      type="text"
                      value={newCalendarName}
                      onChange={(e) => setNewCalendarName(e.target.value)}
                      placeholder="Название календаря"
                      required
                      className="form-control"
                    />
                    <Button type="submit">Создать</Button>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarsPage;
