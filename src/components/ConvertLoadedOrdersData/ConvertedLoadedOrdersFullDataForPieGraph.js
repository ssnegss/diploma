export const ConvertedLoadedOrdersFullDataForPieGraph = (csvData, column) => {
   //    Проверка, что данные существуют

   if (csvData.length > 0) {
      const resultData = csvData.map((item) => item[column]);

      const filteredResultData = resultData.filter(
         (item) => item !== "" && item !== undefined
      );

      if (filteredResultData.length > 0) {
         return filteredResultData;
      } else return 0;
   } else return 0;
};
