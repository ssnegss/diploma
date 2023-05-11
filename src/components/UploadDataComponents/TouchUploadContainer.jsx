import { useSelector, useDispatch } from "react-redux";

import { CalendarComponent } from "../CalendarComponent/CalendarCompoennt";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
   touchDateFrom,
   touchDateTo,
} from "../../redux/actions/actionCreator";
import { fetchTouchData } from "../../services/apiInteraction";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();

   const handleTouchDateFrom = (setTouchDateFrom) => {
      dispatch(touchDateFrom(setTouchDateFrom));
   };

   const handleTouchDateTo = (setTouchDateTo) => {
      dispatch(touchDateTo(setTouchDateTo));
   };

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownOptionReducer?.touchOption
   );

   //    Даты "С" и "По" для формирования данных

   const getTouchDatefrom = useSelector(
      (store) => store?.touchDateReducer?.touchDateFrom
   );

   const getTouchDateTo = useSelector(
      (store) => store?.touchDateReducer?.touchDateTo
   );

   //    Функция фильтрации получаемых данных по промежутку дат

   const filterDataByDate = (data) => {
      const dateFrom = new Date(getTouchDatefrom).getTime();
      const dateTo = new Date(getTouchDateTo).getTime();

      const filteredItems = data.filter((item) => {
         const itemDate = new Date(
            item["Дата старта"].split(" ")[0].split(".").reverse().join("-")
         ).getTime();

         return itemDate >= dateFrom && itemDate <= dateTo;
      });

      return filteredItems;
   };

   //    Функция получения данных

   async function fetchData(filename) {
      const response = await fetchTouchData(
         `http://localhost:5000/${filename}`
      );
      const data = await response;
      return data;
   }

   //    Обработчик нажатия на кнопку "Загрузить данные"

   async function handleClick() {
      if (dropdownTouchOption === 0) {
         const data = await fetchData("sessions.json");
         dispatch(saveCsvData(filterDataByDate(data)));
      }
      if (dropdownTouchOption === 1) {
         const data = await fetchData("orders.json");
         dispatch(saveCsvData(filterDataByDate(data)));
      }
      dispatch(showButtonIsPressed(false));
      dispatch(dataIsUploaded(true));
   }

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <p className="TouchUploadContainer__header">
               Выберите промежуток времени
            </p>
            <CalendarComponent
               dateFrom={handleTouchDateFrom}
               dateTo={handleTouchDateTo}
            />
            <div>
               <ButtonComponent name="Загрузить данные" onClick={handleClick} />
            </div>
         </div>
      </>
   );
};
