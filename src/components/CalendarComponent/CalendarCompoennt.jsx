import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { touchDateFrom, touchDateTo } from "../../redux/actions/actionCreator";

import "./CalendarComponent.css";

export const CalendarComponent = () => {
   const dispatch = useDispatch();

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

   useEffect(() => {
      dispatch(touchDateFrom(formatDateToStr(valueFrom)));
      dispatch(touchDateTo(formatDateToStr(valueTo)));
   }, []);

   const onDateFromChange = (newValueFrom) => {
      const dateFrom = formatDateToStr(newValueFrom);

      setValueFrom(newValueFrom);
      dispatch(touchDateFrom(dateFrom));
   };

   const onDateToChange = (newValueTo) => {
      const dateTo = formatDateToStr(newValueTo);

      setValueTo(newValueTo);
      dispatch(touchDateTo(dateTo));
   };

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
