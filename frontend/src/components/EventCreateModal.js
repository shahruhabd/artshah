import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EventCreateModal = ({ calendarId, show, handleClose }) => {
  const [eventData, setEventData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    details: '',
    calendar: calendarId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${authTokens}`, // Если требуется авторизация
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        // Обработка созданного события, например, закрытие модального окна и обновление списка событий
        handleClose();
      } else {
        throw new Error('Ошибка при создании события');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Новое событие</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Название события</Form.Label>
            <Form.Control
              type="text"
              required
              value={eventData.name}
              onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата начала</Form.Label>
            <Form.Control
              type="date"
              required
              value={eventData.start_date}
              onChange={(e) => setEventData({ ...eventData, start_date: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата окончания</Form.Label>
            <Form.Control
              type="date"
              required
              value={eventData.end_date}
              onChange={(e) => setEventData({ ...eventData, end_date: e.target.value })}
            />
          </Form.Group>
          {/* Другие поля формы */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
          <Button variant="primary" type="submit">Создать событие</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EventCreateModal;
