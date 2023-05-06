import { useRef } from "react";
import { useDispatch } from "react-redux";

import Button from "@mui/material/Button";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";

import {
   saveCsvDataForFiltering,
   showButtonIsPressed,
} from "../../redux/actions/actionCreator";

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
               <Button
                  variant="contained"
                  onClick={() => addFiltrationHandler()}
                  sx={{ margin: "10px", fontSize: "0.75rem" }}
               >
                  Отобразить графики
               </Button>
            )}
            tableInstanceRef={tableInstanceRef}
         />
      </>
   );
};
