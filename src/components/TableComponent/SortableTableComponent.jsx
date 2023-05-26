import { useRef } from "react";
import { useDispatch } from "react-redux";

import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";

import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

import {
   saveCsvDataForFiltering,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

import "./SortableTableComponent.css";

//    Компонент таблицы

export const TableComponent = ({ columns, rows }) => {
   const dispatch = useDispatch();

   const tableInstanceRef = useRef(null);

   //    Отображение графиков по нажатии на кнопку

   const showGraphs = () => {
      dispatch(showButtonIsPressed(true));
      dispatch(
         saveCsvDataForFiltering(
            tableInstanceRef.current
               .getFilteredRowModel()
               .rows.map((row) => row.original)
         )
      );
   };

   //    Компонент таблицы

   return (
      <>
         <MaterialReactTable
            columns={columns}
            data={rows}
            initialState={{ density: 'compact' }}
            localization={MRT_Localization_RU}
            renderTopToolbarCustomActions={() => (
               <ButtonComponent
                  name="Отобразить графики"
                  onClick={() => showGraphs()}
               />
            )}
            tableInstanceRef={tableInstanceRef}
         />
      </>
   );
};
