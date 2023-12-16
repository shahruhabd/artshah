import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import car from "../img/login/cars.png";
import '../css/login.css'

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="login-wrapper">
      
      <div className="w-50">
        <img src={car} alt="" className="w-100"/>
      </div>

      <form onSubmit={loginUser} className="w-50 login_form">
        <h1 className="mb-5">Вход</h1>
        <div className="inputs">
          <input type="text" name="username" placeholder="Введите логин" className="login_input"/>
          <input type="password" name="password" placeholder="Введите пароль" className="login_input"/>
          <div className="text-start">
            <input type="checkbox" name="" id="" /> 
            <span className="mx-3">Запомнить меня</span>
          </div>
          <input type="submit" value="Войти" className="input_btn"/>
        </div>
        <div className="mt-3">
          <a href="#">Забыли пароль?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
