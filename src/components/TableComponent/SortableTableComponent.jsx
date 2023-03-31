import MaterialReactTable from "material-react-table";
import { MRT_Localization_RU } from "./_locales/ru.ts";

export const TableComponent = ({ columns, rows }) => {
   return (
      <>
         <MaterialReactTable
            columns={columns}
            data={rows}
            localization={MRT_Localization_RU}
         />
      </>
   );
};
