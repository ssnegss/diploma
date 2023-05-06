import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveCsvData } from "../../redux/actions/actionCreator";
import { dataIsUploaded } from "../../redux/actions/actionCreator";
import { showButtonIsPressed } from "../../redux/actions/actionCreator";
import Button from "@mui/material/Button";

import { fetchTouchData } from "../../services/apiInteraction";
// import fg from "./orders.json";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();
   // dispatch(dataIsUploaded(0));
   // dispatch(saveCsvData(array));

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownTouchOptionReducer?.dropdownOption
   );

   const [data, setData] = useState(null);

   async function fetchData(filename) {
      const response = await fetchTouchData(
         `http://localhost:5000/${filename}`
      );
      const data = await response;
      return data;
   }

   async function handleClick() {
      if (dropdownTouchOption === 0) {
         const data = await fetchData("sessions.json");
         console.log(data);
         dispatch(saveCsvData(data));
      }
      if (dropdownTouchOption === 1) {
         const data = await fetchData("orders.json");
         dispatch(saveCsvData(data));
      }
      dispatch(dataIsUploaded(1));
   }

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <h5>Выберите промежуток времени</h5>
            <div>
               <button onClick={handleClick}>Загрузить данные</button>
               {data ? <h1>ура</h1> : <p>Данные еще не загружены</p>}
            </div>
         </div>
      </>
   );
};
