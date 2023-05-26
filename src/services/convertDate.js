export const convertDate = (date) => {
   return date ? date.split(" ")[0].split(".").reverse().join("-") : undefined;
};
