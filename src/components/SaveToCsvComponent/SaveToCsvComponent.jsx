import moment from 'moment';
import { useSelector } from "react-redux";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

export const SaveToCsvComponent = ({reportType}) => {
   // Получение данных из таблицы
   const csvDataFiltered = useSelector(
      (store) => store?.dataReducer?.filteredCsvData
   );

   // Скачивание CSV файла

   const downloadCSV = (csv, filename) => {
      const csvData = new Blob([csv], {
         type: "text/csv;charset=windows-1251;",
      });
      const csvURL = URL.createObjectURL(csvData);
      const tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", filename);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
   };

   // Конвертация массива объектов

   const convertArrayOfObjectsToCSV = (array) => {
      const header = Object.keys(array[0]).join(";");
      const rows = array.map((obj) => Object.values(obj).join(";"));
      const csvContent = `${String.fromCharCode(0xfeff)}${header}\n${rows.join(
         "\n"
      )}`;

      const encoder = new TextEncoder("windows-1251");
      return encoder.encode(csvContent);
   };

   //    Главная функция, задающая название файла и скачивающая его

   const handleDownload = () => {
      const csv = convertArrayOfObjectsToCSV(csvDataFiltered);
      const currentDate = moment();
      const formattedDate = currentDate.format('DD-MM-YYYY');
      downloadCSV(csv, `${formattedDate}_${reportType}_Report`);
   };

   return <ButtonComponent name={"Скачать CSV"} onClick={handleDownload} />;
};
