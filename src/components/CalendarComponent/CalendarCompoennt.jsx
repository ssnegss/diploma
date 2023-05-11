import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { touchDateFrom, touchDateTo } from "../../redux/actions/actionCreator";

import "./CalendarComponent.css";

export const CalendarComponent = ({ dateFrom, dateTo }) => {
   const dispatch = useDispatch();

   //    Форматирование даты в стандартный вид (тип - строка)

   const formatDateToStr = (date) => {
      const finalDate =
         dayjs(date).get("year").toString() +
         "-" +
         (dayjs(date).get("month") + 1).toString() +
         "-" +
         dayjs(date).get("date").toString();
      return finalDate;
   };

   const [valueFrom, setValueFrom] = useState(dayjs());
   const [valueTo, setValueTo] = useState(dayjs());

   //    Сохранение начальной даты

   useEffect(() => {
      dateFrom(formatDateToStr(valueFrom));
      dateTo(formatDateToStr(valueTo));
   }, []);

   //    При изменении даты "С"

   const onDateFromChange = (newValueFrom) => {
      const getDateFrom = formatDateToStr(newValueFrom);

      setValueFrom(newValueFrom);
      dateFrom(getDateFrom);
   };

   //    При изменении даты "По"

   const onDateToChange = (newValueTo) => {
      const getDateTo = formatDateToStr(newValueTo);

      setValueTo(newValueTo);
      dateTo(getDateTo);
   };

   //    Компонент для выбора промежутка дат
   //    и дальнейшего отображения данных из TOUCH

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <div className="CalendarComponent__container">
            <div className="CalendarComponent__container_dateField">
               <DatePicker
                  value={valueFrom}
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => onDateFromChange(newValue)}
               />
            </div>
            <div className="CalendarComponent__container_dateField">
               <DatePicker
                  value={valueTo}
                  format={"DD/MM/YYYY"}
                  onChange={(newValue) => onDateToChange(newValue)}
               />
            </div>
         </div>
      </LocalizationProvider>
   );
};
