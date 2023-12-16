import React, { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import "../css/home.css";
import Nav from "../components/Nav";

const HomePage = () => {
  let { user, authTokens } = useContext(AuthContext);
  useEffect(() => {}, [authTokens]);

  useEffect(() => {
    console.log(user); // Проверка текущего состояния пользователя
  }, [user]);

  return (
    <div className="home_wrapper">
      <Header />
      <div className="home_content">
        <Nav />
        <div className="home_dashboard">
          <div className="home_dashboard_1">
            <div className="home_dashboard_1_track">Трекинг</div>
            <div className="home_dashboard_1_report">Отчеты</div>
          </div>
          <div className="home_dashboard_2">
            Календарь
          </div>
          <div className="home_dashboard_3">
            Уведомления
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
