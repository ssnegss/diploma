import { TouchSelectivesContainerComponent } from "../../components/UploadDataComponents/TouchSelectivesContainerComponent";
import { FullDashboardComponent } from "../../components/FullDashboardComponent/FullDashboardComponent";
import axios from "axios";
import React, { useState } from "react";
import { login } from "../../services/serverInteraction";

import { useDispatch } from "react-redux";

export const TouchPageComponent = () => {
   const dispatch = useDispatch();

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const [dropdownVisible, setdropdownVisible] = useState(1);

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const data = await login(username, password);
         // console.log("JWT:", data.accessToken);
         if (data.accessToken) {
            setdropdownVisible(1);
         }
         // Сохраните JWT в localStorage или используйте его напрямую
      } catch (err) {
         setError(err.error);
      }
   };

   //    Компонент главной страницы
   return (
      <>
         <form onSubmit={handleSubmit}>
            <h2>Вход в систему</h2>
            <input
               type="text"
               placeholder="Логин"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="password"
               placeholder="Пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p>{error}</p>}
            <button type="submit">Войти</button>
         </form>
         {dropdownVisible ? (
            <>
               <TouchSelectivesContainerComponent />
               <FullDashboardComponent />
            </>
         ) : null}
      </>
   );
};
