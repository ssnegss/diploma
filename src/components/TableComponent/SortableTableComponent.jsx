import { useRef } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";

import {
   saveCsvDataForFiltering,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

import './SortableTableComponent.css'

//    Компонент таблицы

export const TableComponent = ({ columns, rows }) => {
   const dispatch = useDispatch();

   const tableInstanceRef = useRef(null);

   const addFiltrationHandler = () => {
      dispatch(showButtonIsPressed(1));
      dispatch(
         saveCsvDataForFiltering(
            tableInstanceRef.current
               .getFilteredRowModel()
               .rows.map((row) => row.original)
         )
      );
   };

   return (
      <>
         <MaterialReactTable
            columns={columns}
            data={rows}
            localization={MRT_Localization_RU}
            renderTopToolbarCustomActions={() => (
               <button
                  className="TableComponent__button"
                  onClick={() => addFiltrationHandler()}
               >
                  Отобразить графики
               </button>
            )}
            tableInstanceRef={tableInstanceRef}
         />
      </>
   );
};
