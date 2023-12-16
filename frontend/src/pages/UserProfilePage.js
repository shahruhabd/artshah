import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "../css/user-profile.css";

function UserProfilePage() {
  const { authTokens, logoutUser, user: currentUser } = useContext(AuthContext);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});
  const isOwnProfile =
    currentUser && parseInt(currentUser.user_id, 10) === parseInt(userId, 10);

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(
        `http://127.0.0.1:8000/api/profiles/${userId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        if (!userData.initialized) {
          // Проверяем, было ли уже инициализировано состояние
          setUserData({
            initialized: true, // Устанавливаем флаг инициализации
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.profile ? data.profile.phone_number : "",
          });
        }
      }
    }

    fetchUserData();
  }, [userId, authTokens, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setUserData({ ...userData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const [key, value] of Object.entries(userData)) {
      console.log(`FormData: ${key}: ${value}`);
      formData.append(key, value);
    }

    if (userData.photo) {
      formData.append("profile.photo", userData.photo);
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/profiles/${userId}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          body: formData,
        }
      );

      console.log("Ответ сервера:", response);

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Обновляем состояние пользователя
        alert("Профиль успешно обновлен");
      } else {
        alert("Ошибка при обновлении профиля");
      }
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/profiles/${userId}/delete_photo/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.ok) {
        alert("Фото профиля удалено");
        // Обновите состояние, чтобы удалить фото из интерфейса
        setUser({ ...user, profile: { ...user.profile, photo: null } });
      } else {
        alert("Ошибка при удалении фото профиля");
      }
    } catch (error) {
      console.error("Ошибка при удалении фото:", error);
    }
  };

  if (!user) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className="user-profile_wrapper">
      <Header />
      <div className="user-profile_content">
        <Nav />
        <div className="user_profile_block">
          <h1>Профиль пользователя {user.username}</h1>
          {isOwnProfile ? (
            <>
              {user && user.profile && user.profile.photo && (
                <>
                  <img src={user.profile.photo} alt="Фото профиля" width={50} />
                  <button
                    onClick={handleDeletePhoto}
                    className="btn btn-danger"
                  >
                    Удалить фото
                  </button>
                </>
              )}
              {user && (
                <form onSubmit={handleSubmit} className="user_profile_form">
                  <input
                    type="text"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleInputChange}
                    placeholder="Имя"
                    className="form-control"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleInputChange}
                    placeholder="Фамилия"
                    className="form-control"
                  />
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="form-control"
                  />
                  <input
                    type="tel"
                    name="phone_number"
                    value={
                      userData.phone_number ||
                      (user.profile && user.profile.phone_number)
                    }
                    onChange={handleInputChange}
                    placeholder="Телефон"
                    className="form-control"
                  />
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-primary">
                    Сохранить изменения
                  </button>
                </form>
              )}
              {user ? (
                <button
                  onClick={logoutUser}
                  className="btn btn-sm btn-secondary"
                >
                  Выйти
                </button>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div className="user_profile_info">
              <div>
                <p>
                  {" "}
                  <strong>Имя:</strong> {user.first_name}
                </p>
                <p>
                  <strong>Фамилия:</strong> {user.last_name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              </div>
              {user.profile && (
                <>
                  <p>
                    <strong>Телефон:</strong>{" "}
                    {user.profile.phone_number
                      ? user.profile.phone_number
                      : "Не указано"}
                  </p>
                  {user.profile.photo && (
                    <div>
                      <img
                        src={user.profile.photo}
                        alt="Фото профиля"
                        width={100}
                        className="rounded"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default UserProfilePage;
