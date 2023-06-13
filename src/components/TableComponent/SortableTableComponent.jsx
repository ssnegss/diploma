// MIT License
// Copyright (c) 2022 Kevin Vandy
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";

import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvDataForFiltering,
   showButtonIsPressed,
   tableDateFrom,
   tableDateTo,
} from "../../redux/actions/actionCreator";

import "./SortableTableComponent.css";

//    Компонент таблицы

export const TableComponent = ({ columns, rows }) => {
   const dispatch = useDispatch();

   const getTableDatefrom = useSelector(
      (store) => store?.calendarDateReducer?.tableDateFrom
   );
   const getTableDateTo = useSelector(
      (store) => store?.calendarDateReducer?.tableDateTo
   );

   const tableInstanceRef = useRef(null);

   //    Перезагрузка графиков при изменении даты фильтрации

   useEffect(() => {
      dispatch(showButtonIsPressed(true));
      dispatch(
         saveCsvDataForFiltering(
            tableInstanceRef.current
               .getFilteredRowModel()
               .rows.map((row) => row.original)
         )
      );
   }, [getTableDatefrom, getTableDateTo]);

   //    Компонент таблицы

   return (
      <>
         <MaterialReactTable
            columns={columns}
            data={rows}
            initialState={{ density: "compact" }}
            localization={MRT_Localization_RU}
            tableInstanceRef={tableInstanceRef}
         />
      </>
   );
};
