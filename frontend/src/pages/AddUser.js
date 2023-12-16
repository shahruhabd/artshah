import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "../css/adduser.css";

function UserListPage() {
  return (
    <div className="adduser_wrapper">
      <Header />
      <div className="adduser_content">
        <Nav />
        <div className="text-center w-100 m-5">
            <h1 className="">Добавить пользователя</h1>
            <h2 className="">Страница в разработке</h2>
        </div>
      </div>
    </div>
  );
}

export default UserListPage;
