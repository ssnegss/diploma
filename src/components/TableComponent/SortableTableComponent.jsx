import { useRef } from "react";
import { useDispatch } from "react-redux";

import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";
import { saveCsvDataForFiltering } from "../../redux/actions/actionCreator";
import { showButtonIsPressed } from "../../redux/actions/actionCreator";

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
               <button onClick={() => addFiltrationHandler()}>
                  Отобразить графики
               </button>
            )}
            tableInstanceRef={tableInstanceRef}
         />
      </>
   );
};
