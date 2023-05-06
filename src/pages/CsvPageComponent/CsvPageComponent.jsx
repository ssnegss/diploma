import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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
      dispatch(dataIsUploaded(0));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

   //    Компонент страницы обработки .csv отчетов
   return (
      <>
         <div className="CsvPageComponent__selective_container">
            <CsvSelectivesContainerComponent />
         </div>
            <FullDashboardComponent />
      </>
   );
};
