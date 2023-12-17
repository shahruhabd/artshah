import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "../css/userlist.css";

function UserListPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://0.0.0.0:8000/api/users/");
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  if (!Array.isArray(users)) {
    return <div>Loading...</div>;
  }

  const displayValueOrPlaceholder = (value) => {
    return value && value.trim() !== "" ? value : "Не указано";
  };

  return (
    <div className="userlist_wrapper">
      <Header />
      <div className="userlist_content">
        <Nav />
        <div className="table-responsive">
          <Table bordered hover>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Должность</th>
                <th>Email</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="userlist_table_tr">
                  <td>{displayValueOrPlaceholder(user.first_name)}</td>
                  <td>{displayValueOrPlaceholder(user.last_name)}</td>
                  <td>
                    {user.profile
                      ? displayValueOrPlaceholder(user.profile.position)
                      : "Не указано"}
                  </td>
                  <td>{displayValueOrPlaceholder(user.email)}</td>
                  <td>
                    <Link to={`/profiles/${user.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserListPage;
