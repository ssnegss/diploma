import { SAVE_CSV_DATA } from "../constants";
import { CHOOSE_DATA_GET_OPTION_DROPDOWN } from "../constants";
// import { CHOOSE_GET_FROM_TOUCH_OPTION_DROPDOWN } from "../constants";

export const saveCsvData = (array) => ({
   type: SAVE_CSV_DATA,
   payload: array,
});

export const getDataFromDropdown = (number) => ({
   type: CHOOSE_DATA_GET_OPTION_DROPDOWN,
   payload: number,
});

// export const getDataFromTouchDropdown = (number) => ({
//    type: CHOOSE_GET_FROM_TOUCH_OPTION_DROPDOWN,
//    payload: number,
// });
