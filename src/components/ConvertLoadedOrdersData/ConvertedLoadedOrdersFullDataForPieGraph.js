export const ConvertedLoadedOrdersFullDataForPieGraph = (csvData, column) => {
   //    Проверка, что данные существуют

   if (csvData.length > 0) {
      const resultData = csvData.map((item) => item[column]);

      //    Фильтрация данных

      const filteredResultData = resultData.filter(
         (item) => item !== "" && item !== undefined
      );

      //    Проверка, что отфильтрованные данные существуют

      if (filteredResultData.length > 0) {
         return filteredResultData;
      } else return 0;
   } else return 0;
};
