import { SAVE_CSV_DATA } from "../constants";
import { SAVE_CSV_DATA_FOR_FILTERING } from "../constants";
import { CHOOSE_DATA_GET_OPTION_DROPDOWN } from "../constants";
import { DATA_IS_UPLOADED } from "../constants";
import { SHOW_RAPHS_BUTTON_IS_PRESSED } from "../constants";
import { CHOOSE_DATA_GET_CSV_OPTION_DROPDOWN } from "../constants";
import { CHOOSE_GET_FROM_TOUCH_OPTION_DROPDOWN } from "../constants";

export const saveCsvData = (array) => ({
   type: SAVE_CSV_DATA,
   payload: array,
});

export const saveCsvDataForFiltering = (array) => ({
   type: SAVE_CSV_DATA_FOR_FILTERING,
   payload: array,
});

export const getDataFromDropdown = (number) => ({
   type: CHOOSE_DATA_GET_OPTION_DROPDOWN,
   payload: number,
});

export const dataIsUploaded = (boolean) => ({
   type: DATA_IS_UPLOADED,
   payload: boolean,
});

export const showButtonIsPressed = (boolean) => ({
   type: SHOW_RAPHS_BUTTON_IS_PRESSED,
   payload: boolean,
});

export const getDataFromCsvDropdown = (number) => ({
   type: CHOOSE_DATA_GET_CSV_OPTION_DROPDOWN,
   payload: number,
});
export const getDataFromTouchDropdown = (number) => ({
   type: CHOOSE_GET_FROM_TOUCH_OPTION_DROPDOWN,
   payload: number,
});
