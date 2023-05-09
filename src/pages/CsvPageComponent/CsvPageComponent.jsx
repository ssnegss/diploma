import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";

import { CsvSelectivesContainerComponent } from "../../components/SelectivesComponent/CsvSelectivesContainerComponent";
import { FullDashboardComponent } from "../../components/FullDashboardComponent/FullDashboardComponent";

import {
   dataIsUploaded,
   getDataFromCsvDropdown,
} from "../../redux/actions/actionCreator";

import "./CsvPageComponent.css";

export const CsvPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(dataIsUploaded(false));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

   //    Компонент страницы обработки .csv отчетов
   return (
      <>
         <div className="CsvPageComponent__header">
            <Link to="/" className="CsvPageComponent__header_toMainPageLink">
               <button className="CsvPageComponent__header_toMainPagButton">
                  На главную страницу
               </button>
            </Link>
            <div className="CsvPageComponent__header_selectiveContainer">
               <CsvSelectivesContainerComponent />
            </div>
         </div>
         <FullDashboardComponent />
      </>
   );
};
