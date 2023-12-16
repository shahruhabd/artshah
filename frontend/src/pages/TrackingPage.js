import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "../css/track.css";

function UserListPage() {
  return (
    <div className="track_wrapper">
      <Header />
      <div className="track_content">
        <Nav />
        <div className="text-center w-100 m-5">
            <h1 className="">Трекинг</h1>
            <h2 className="">Страница в разработке</h2>
        </div>
      </div>
    </div>
  );
}

export default UserListPage;
