import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CalendarComponent } from "../CalendarComponent/CalendarCompoennt";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";
import { fetchTouchData } from "../../services/apiInteraction";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownTouchOptionReducer?.dropdownOption
   );

   const touchDatefrom = useSelector(
      (store) => store?.touch_date_from_reducer?.touchDateFrom
   );

   const touchDateTo = useSelector(
      (store) => store?.touch_date_to_reducer?.touchDateTo
   );

   const [data, setData] = useState(null);

   const filterdataByDate = (data) => {
      const dateFrom = new Date(touchDatefrom).getTime();
      const dateTo = new Date(touchDateTo).getTime();

      const filteredItems = data.filter((item) => {
         const itemDate = new Date(
            item["Дата старта"].split(" ")[0].split(".").reverse().join("-")
         ).getTime();

         return itemDate >= dateFrom && itemDate <= dateTo;
      });

      return filteredItems;
   };

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
         dispatch(saveCsvData(filterdataByDate(data)));
      }
      if (dropdownTouchOption === 1) {
         const data = await fetchData("orders.json");
         setData(data);
         dispatch(saveCsvData(filterdataByDate(data)));
      }
      dispatch(showButtonIsPressed(0));
      dispatch(dataIsUploaded(1));
   }

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <p className="TouchUploadContainer__header">
               Выберите промежуток времени
            </p>
            <CalendarComponent />
            <div>
               <ButtonComponent name="Загрузить данные" onClick={handleClick} />
            </div>
         </div>
      </>
   );
};
