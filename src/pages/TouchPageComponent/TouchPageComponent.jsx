import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { TouchSelectivesContainerComponent } from "../../components/SelectivesComponent/TouchSelectivesContainerComponent";
import { FullDashboardComponent } from "../../components/FullDashboardComponent/FullDashboardComponent";

import { login } from "../../services/serverInteraction";
import {
   dataIsUploaded,
   getDataFromCsvDropdown,
} from "../../redux/actions/actionCreator";

import "./TouchPageComponent.css";

export const TouchPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(dataIsUploaded(0));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

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

   //    Компонент страницы обработки данных из TOUCH
   return (
      <div className="TouchPageComponent__header">
         <Link to="/" className="TouchPageComponent__header_toMainPageLink">
            <button className="TouchPageComponent__header_toMainPagButton">
               На главную страницу
            </button>
         </Link>
         <div className="TouchPageComponent__header_selectiveContainer">
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
         </div>
      </div>
   );
};
