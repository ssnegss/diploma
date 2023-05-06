export const ConvertedLoadedDataToDatePriceForSessionsGraphs = (
   csvData,
   dateColumn,
   valueColumn
) => {
   //    Проверка, что данные существуют

   if (csvData.length > 0) {
      //   Получаем массив объектов с полями date value, name

      const objectData = csvData.map((item) => ({
         date: item[dateColumn]
            ? item[dateColumn].split(" ")[0].split(".").reverse().join("-")
            : undefined,
         value: item[valueColumn]
            ? Number(item[valueColumn].toString().replace(",", "."))
            : undefined,
         name: item[valueColumn] ? valueColumn : undefined,
      }));

      //   Сортируем массив по возрастанию дат месяца

      const correctlySortedData = objectData.reverse();

      //    Удаляем объекты с полями undefined

      const removedUndefinedData = correctlySortedData.filter((obj) => {
         return (
            Object.keys(obj).some((key) => {
               return obj[key] === undefined;
            }) === false
         );
      });

      //    Проверка, что данные существуют

      if (removedUndefinedData.length > 0) {
         //    Суммируем прибыль за каждый день

         const resultData = removedUndefinedData.reduce(
            (accumulator, current) => {
               const existingObject = accumulator.find(
                  (item) => item.date === current.date
               );
               if (!existingObject) {
                  accumulator.push(current);
               } else {
                  existingObject.value += current.value;
               }
               return accumulator;
            },
            []
         );

         return resultData;
      } else return 0;
   } else return 0;
};
