import { convertDate } from "../../services/convertDate";

export const findEndDate = (csvData) => {
   let i = 0; // начинаем с первого элемента
   if (csvData[i]["Дата старта"] === undefined) {
      // если первый элемент равен undefined
      i++;
      while (i < csvData.length && csvData[i]["Дата старта"] === undefined) {
         // пока не достигли конца массива и текущий элемент равен undefined
         i++; // переходим к следующему элементу
      }
   }
   if (i < csvData.length) {
      // если нашли ненулевой элемент
      return convertDate(csvData[i]["Дата старта"]);
   } else {
      return null;
   }
};
