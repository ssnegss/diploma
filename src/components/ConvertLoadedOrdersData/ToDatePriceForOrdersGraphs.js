export const ConvertedLoadedOrdersDataToDatePriceForGraphs = (
   csvData,
   id,
   dateColumn,
   valueColumn
) => {
   //   Получаем массив объектов с полями date value, name

   const objectData = csvData.map((item) => ({
      id: item[id] ? item[id] : undefined,
      date: item[dateColumn]
         ? item[dateColumn].split(" ")[0].split(".").reverse().join("-")
         : undefined,
      value: item[valueColumn]
         ? Number(item[valueColumn].replace(",", "."))
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

   //    Удаляем дубликаты объектов с одинаковым id
   //    Для корректного дальнейшего подсчета суммы за определенное число

   const uniqueObjects = new Map();

   const removedDuplicateIdData = removedUndefinedData.filter((obj) => {
      if (uniqueObjects.has(obj.id)) {
         return false;
      } else {
         uniqueObjects.set(obj.id, obj);
         return true;
      }
   });

   //    Суммируем прибыль за каждый день

   const resultData = removedDuplicateIdData.reduce((accumulator, current) => {
      const existingObjectByDate = accumulator.find(
         (item) => item.date === current.date
      );
      const existingObjectById = accumulator.find(
         (item) => item.id === current.id
      );
      if (!existingObjectByDate && !existingObjectById) {
         accumulator.push(current);
      } else {
         existingObjectByDate.value += current.value;
      }
      return accumulator;
   }, []);

   return resultData;
};
