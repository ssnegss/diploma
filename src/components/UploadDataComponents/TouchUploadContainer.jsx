import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { saveCsvData, dataIsUploaded } from "../../redux/actions/actionCreator";

import { fetchTouchData } from "../../services/apiInteraction";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();

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
         setData(data);
         dispatch(saveCsvData(data));
      }
      if (dropdownTouchOption === 1) {
         const data = await fetchData("orders.json");
         setData(data);
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
               {data ? <p></p> : <p>Данные еще не загружены</p>}
            </div>
         </div>
      </>
   );
};
