export const convertDate = (date) => {
   return date.split(" ")[0].split(".").reverse().join("-");
};
