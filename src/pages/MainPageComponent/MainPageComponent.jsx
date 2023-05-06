import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
   dataIsUploaded,
   getDataFromCsvDropdown,
} from "../../redux/actions/actionCreator";

export const MainPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(dataIsUploaded(0));
      dispatch(getDataFromCsvDropdown(null));
   }, [location, dispatch]);

   //    Компонент главной страницы
   return (
      <>
         <Link to="/getFromTouch">
            <button>Touch Page</button>
         </Link>
         <Link to="/getFromCsv">
            <button>CSV Page</button>
         </Link>
      </>
   );
};
