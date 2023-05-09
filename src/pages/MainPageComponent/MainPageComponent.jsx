import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
   dataIsUploaded,
   getDataFromCsvDropdown,
} from "../../redux/actions/actionCreator";

import "./MainPageComponent.css";

export const MainPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(dataIsUploaded(false));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

   //    Компонент главной страницы
   return (
      <>
         <div className="MainPageComponent">
            <div className="MainPageComponent__container">
               <div className="MainPageComponent__container_logoImg"></div>
               <div className="MainPageComponent__container_inner">
                  <Link
                     to="/getFromTouch"
                     className="MainPageComponent__container__link"
                  >
                     <button className="MainPageComponent__container__button">
                        Загрузить данные из TOUCH
                     </button>
                  </Link>

                  <Link
                     to="/getFromCsv"
                     className="MainPageComponent__container__link"
                  >
                     <button className="MainPageComponent__container__button">
                        Загрузить файл .csv
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </>
   );
};
