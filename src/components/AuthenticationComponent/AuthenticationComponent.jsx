import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../services/serverInteraction";
import { authenticationCompleted } from "../../redux/actions/actionCreator";

import "./AuthenticationComponent.css";

export const AuthenticationComponent = () => {
   const dispatch = useDispatch();

   //    Получение флага, отображающего, прошла ли аутентификация

   const authenticationIsCompleted = useSelector(
      (store) => store?.booleanReducer?.authIsCompleted
   );

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   //    Аутентификация

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const data = await login(username, password);
         if (data.accessToken) {
         }
         dispatch(authenticationCompleted(true));
      } catch (err) {
         dispatch(authenticationCompleted(false));
         setError(err.error);
      }
   };

   //    Компонент аутентификации
   //    Если аутентификация успешно пройдена - окно аутентификации закрывается

   return (
      <>
         {authenticationIsCompleted === false ? (
            <div className="AuthenticationComponent">
               <div className="AuthenticationComponent__container">
                  <form
                     className="AuthenticationComponent__container_inner"
                     onSubmit={handleSubmit}
                  >
                     <h2 className="AuthenticationComponent__container_header">
                        Вход в систему
                     </h2>
                     <input
                        className="AuthenticationComponent__container_inputField"
                        type="text"
                        placeholder="Login"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                     <input
                        className="AuthenticationComponent__container_inputField"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                     {error && <p>{error}</p>}
                     <button
                        className="AuthenticationComponent__container__button"
                        type="submit"
                     >
                        Войти
                     </button>
                  </form>
               </div>
            </div>
         ) : null}
      </>
   );
};
