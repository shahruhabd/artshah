import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function ProfilePage() {
  const { authTokens } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    phone_number: "",
    photo: null, // для файлов используем null в качестве начального значения
    position: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error(
            "Ошибка при загрузке данных профиля:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    if (authTokens) {
      fetchProfileData();
    }
  }, [authTokens]);

  const handleInputChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("http://localhost:8000/api/profile/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData({ ...profileData, photoUrl: data.photoUrl });
      } else {
        console.error("Ошибка при загрузке фотографии");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("phone_number", profileData.phone_number);
    formData.append("photo", profileData.photo);
    formData.append("position", profileData.position);

    try {
      const response = await fetch("/api/profile/", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Профиль обновлен");
      } else {
        console.error("Ошибка при сохранении профиля");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div>
      <h1>Профиль</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={handleInputChange}
          placeholder="Имя"
        />
        <input
          type="text"
          name="lastName"
          value={profileData.lastName}
          onChange={handleInputChange}
          placeholder="Фамилия"
        />
        <input
          type="email"
          name="email"
          value={profileData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Номер телефона"
        />
        <input type="file" onChange={handlePhotoChange} />
        {profileData.photoUrl && (
          <img src={profileData.photoUrl} alt="Фото профиля" />
        )}
        <button type="submit">Сохранить изменения</button>
      </form>

      <p>Имя: {profileData.firstName}</p>
      <p>Фамилия: {profileData.lastName}</p>
      <p>Email: {profileData.email}</p>
      <p>Телефон: {profileData.phone_number}</p>
      {/* Используйте URL фотографии для отображения изображения */}
      {profileData.photo && <img src={profileData.photo} alt="Фото профиля" />}
    </div>
  );
}

export default ProfilePage;
