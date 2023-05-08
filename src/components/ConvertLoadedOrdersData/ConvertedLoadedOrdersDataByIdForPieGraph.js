export const ConvertedLoadedOrdersDataForPieGraph = (csvData, id, column) => {
   //    Проверка, что данные существуют

   if (csvData.length > 0) {
      //   Получаем массив объектов с полями id, name

      const objectData = csvData.map((item) => ({
         id: item[id] ? item[id] : undefined,
         name: item[column] ? item[column] : undefined,
      }));

      //    Удаляем объекты с полями undefined и ''

      const removedUndefinedData = objectData.filter((obj) => {
         return (
            Object.keys(obj).some((key) => {
               return obj[key] === undefined || obj[key] === "";
            }) === false
         );
      });

      //    Удаляем дубликаты объектов с одинаковым id
      //    Для корректного дальнейшего подсчета сессионного количества

      const uniqueObjects = new Map();

      const removedDuplicateIdData = removedUndefinedData.filter((obj) => {
         if (uniqueObjects.has(obj.id)) {
            return false;
         } else {
            uniqueObjects.set(obj.id, obj);
            return true;
         }
      });

      //    Для формирования графика вохвращаем name

      const resultData = removedDuplicateIdData.map((item) => item.name);

      //    Проверка, что данные для отображения существуют

      if (resultData.length > 0) {
         return resultData;
      } else return 0;
   } else return 0;
};
