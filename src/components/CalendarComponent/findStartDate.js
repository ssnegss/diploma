import { convertDate } from "../../services/convertDate";

export const findStartDate = (csvData) => {
   if (csvData.length > 0) {
      let i = csvData.length - 1; // начинаем с последнего элемента
      if (csvData[i]["Дата старта"] === undefined) {
         // если последний элемент равен undefined
         i--;
         while (i >= 0 && csvData[i]["Дата старта"] === undefined) {
            // пока не достигли начала массива и текущий элемент равен undefined
            i--; // переходим к предыдущему элементу
         }
      }
      if (i >= 0) {
         // если нашли ненулевой элемент
         return convertDate(csvData[i]["Дата старта"]);
      } else {
         return null;
      }
   }
};
