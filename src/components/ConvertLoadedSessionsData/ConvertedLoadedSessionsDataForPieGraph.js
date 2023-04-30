export const ConvertedLoadedSessionsDataForPieGraph = (
   csvData,
   locationColumn
) => {
   const resultData = csvData.map((item) => item[locationColumn]);

   return resultData;
};
