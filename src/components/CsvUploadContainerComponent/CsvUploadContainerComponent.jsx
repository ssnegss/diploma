import { useState } from "react";
import { TableComponent } from "../TableComponent/SortableTableComponent";

export const CsvUploadContainerComponent = () => {
   const [file, setFile] = useState();
   const [array, setArray] = useState([]);
   const [tableVisible, setTableVisible] = useState(0);

   const fileReader = new FileReader();

   const handleOnChange = (e) => {
      setFile(e.target.files[0]);
   };

   const csvFileToArray = (string) => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(";");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

      const array = csvRows.map((i) => {
         const values = i.split(";");
         const obj = csvHeader.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
         }, {});
         return obj;
      });

      setArray(array);
   };

   const handleOnSubmit = (e) => {
      e.preventDefault();

      if (file) {
         fileReader.onload = function (event) {
            const text = event.target.result;
            csvFileToArray(text)
            setTableVisible(1);
         };

         fileReader.readAsText(file);
      }
   };

   const tableHeadArray = Object.keys(array[0] || {}).map((item) => {
      return item;
   });

   const tableHead = tableHeadArray.map((name) => {
      return {
         label: name,
         accessor: name,
         // accessor: name.replace(/\s+/g, "_").replace(",", "").toLowerCase(),
      };
   });

   const tableRows = array;

   return (
      <>
         <div style={{ textAlign: "center" }}>
            <form>
               <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
               />

               <button
                  className="defaultButton"
                  onClick={(e) => {
                     handleOnSubmit(e);
                  }}
               >
                  Отобразить в таблице
               </button>
            </form>

            {tableVisible ? (
               <TableComponent rows={tableRows} columns={tableHead} />
            ) : null}

            <br />
         </div>
      </>
   );
};
