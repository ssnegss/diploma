import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CalendarComponent } from "../CalendarComponent/CalendarCompoennt";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvData,
   dataIsUploaded,
   showButtonIsPressed,
   touchDateFrom,
   touchDateTo,
   tableDateTo,
   tableDateFrom,
} from "../../redux/actions/actionCreator";
import { fetchTouchData } from "../../services/apiInteraction";

export const TouchUploadContainer = () => {
   const dispatch = useDispatch();
   const [error, setError] = useState("");

   //    Функции для установки начальной и конечной дат загрузки отчетов

   const handleTouchDateFrom = (setTouchDateFrom) => {
      dispatch(touchDateFrom(setTouchDateFrom));
   };

   const handleTouchDateTo = (setTouchDateTo) => {
      dispatch(touchDateTo(setTouchDateTo));
   };

   //    Выбор типа получаемых данных

   const dropdownTouchOption = useSelector(
      (store) => store?.dropdownOptionReducer?.touchOption
   );

   //    Даты "С" и "По", которые передаются на серевер для получения данных по корректному диапазону

   const getTouchDatefrom = useSelector(
      (store) => store?.calendarDateReducer?.touchDateFrom
   );

   const getTouchDateTo = useSelector(
      (store) => store?.calendarDateReducer?.touchDateTo
   );

   const dateFrom = new Date(getTouchDatefrom).getTime();
   const dateTo = new Date(getTouchDateTo).getTime();

   const removeUndefined = (data) => {
      const result = data.map((item) => {
         if (Object.values(item).every((value) => value === undefined)) {
            return null;
         } else {
            return item; // Проверка, чтобы убрать пустые объекты
         }
      });
      return result;
   };

   //    Обработчик нажатия на кнопку "Загрузить данные"

   async function handleClick() {
      try {
         //    Получение данных по сессиям
         if (dropdownTouchOption === 0) {
            const data = await fetchTouchData(
               "/get_sessions_reports",
               dateFrom,
               dateTo
            );
            if (data.error) setError(data.error);
            else setError("");
            const reports_data = data.data;
            const resultData = removeUndefined(reports_data);
            dispatch(saveCsvData(resultData));
         }
         //    Получение данных по заказам
         if (dropdownTouchOption === 1) {
            const data = await fetchTouchData(
               "/get_orders_reports",
               dateFrom,
               dateTo
            );
            if (data.error) setError(data.error);
            else setError("");
            const reports_data = data.data;
            const resultData = removeUndefined(reports_data);
            dispatch(saveCsvData(resultData));
         }
         dispatch(showButtonIsPressed(false));
         dispatch(dataIsUploaded(true));
         dispatch(tableDateFrom(getTouchDatefrom));
         dispatch(tableDateTo(getTouchDateTo));
      } catch {
         if (error.length < 0) setError("Error");
         dispatch(showButtonIsPressed(false));
         dispatch(dataIsUploaded(false));
         dispatch(tableDateFrom(undefined));
         dispatch(tableDateTo(undefined));
      }
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
            {error && <p>{error}</p>}
            <div className="TouchUploadContainer__button">
               <ButtonComponent name="Загрузить данные" onClick={handleClick} />
            </div>
         </div>
      </>
   );
};
