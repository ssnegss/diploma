import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { AuthenticationComponent } from "../../components/AuthenticationComponent/AuthenticationComponent";
import { TouchSelectivesContainerComponent } from "../../components/SelectivesComponent/TouchSelectivesContainerComponent";
import { FullDashboardComponent } from "../../components/FullDashboardComponent/FullDashboardComponent";

import {
   dataIsUploaded,
   getDataFromCsvDropdown,
} from "../../redux/actions/actionCreator";

import "./TouchPageComponent.css";

export const TouchPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   const authenticationCompleted = useSelector(
      (store) => store?.booleanReducer?.authIsCompleted
   );

   useEffect(() => {
      dispatch(dataIsUploaded(false));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

   //    Компонент страницы обработки данных из TOUCH
   return (
      <>
         <div className="TouchPageComponent__header">
            <Link to="/" className="TouchPageComponent__header_toMainPageLink">
               <button className="TouchPageComponent__header_toMainPagButton">
                  На главную страницу
               </button>
            </Link>
            
               <AuthenticationComponent />
               {authenticationCompleted ? (
                  <div className="TouchPageComponent__header_selectiveContainer">
                     <TouchSelectivesContainerComponent />
                  </div>
               ) : null}
            </div>

         {authenticationCompleted ? <FullDashboardComponent /> : null}
      </>
   );
};
