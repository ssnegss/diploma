export const filterRows = (rows, filters) => {
   if (isEmpty(filters)) return rows;

   return rows.filter((row) => {
      return Object.keys(filters).every((accessor) => {
         const value = row[accessor];
         const searchValue = filters[accessor];

         if (isString(value)) {
            return toLower(value).includes(toLower(searchValue));
         }

         if (isBoolean(value)) {
            return (
               (searchValue === "true" && value) ||
               (searchValue === "false" && !value)
            );
         }

         if (isNumber(value)) {
            return value == searchValue;
         }

         return false;
      });
   });
};
