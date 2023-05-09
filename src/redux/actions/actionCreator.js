import {
   SAVE_CSV_DATA,
   SAVE_CSV_DATA_FOR_FILTERING,
   CHOOSE_DATA_GET_OPTION_DROPDOWN,
   DATA_IS_UPLOADED,
   SHOW_GRAPHS_BUTTON_IS_PRESSED,
   CHOOSE_DATA_GET_CSV_OPTION_DROPDOWN,
   CHOOSE_GET_FROM_TOUCH_OPTION_DROPDOWN,
   AUTHENTICATION_COMPLETED,
   TOUCH_DATE_FROM,
   TOUCH_DATE_TO,
   DIALOG_WINDOW_IS_OPENED,
} from "../constants";

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
   type: SHOW_GRAPHS_BUTTON_IS_PRESSED,
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

export const authenticationCompleted = (boolean) => ({
   type: AUTHENTICATION_COMPLETED,
   payload: boolean,
});

export const touchDateFrom = (string) => ({
   type: TOUCH_DATE_FROM,
   payload: string,
});

export const touchDateTo = (string) => ({
   type: TOUCH_DATE_TO,
   payload: string,
});

export const dialogWindowOpened = (boolean) => ({
   type: DIALOG_WINDOW_IS_OPENED,
   payload: boolean,
});
