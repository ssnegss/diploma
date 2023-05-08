import React, { useEffect, useState } from "react";
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
      (store) => store?.authentication_completed_reducer?.isCompleted
   );

   useEffect(() => {
      dispatch(dataIsUploaded(0));
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
            <div className="TouchPageComponent__header_selectiveContainer">
               <AuthenticationComponent />
               {authenticationCompleted ? (
                  <TouchSelectivesContainerComponent />
               ) : null}
            </div>
         </div>
         {authenticationCompleted ? <FullDashboardComponent /> : null}
      </>
   );
};
