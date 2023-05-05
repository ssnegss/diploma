import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { dataIsUploaded } from "../../redux/actions/actionCreator";
import { getDataFromCsvDropdown } from "../../redux/actions/actionCreator";

export const MainPageComponent = () => {
   const location = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(dataIsUploaded(0));
      dispatch(getDataFromCsvDropdown(null));
   }, [location]);

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
