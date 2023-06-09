import {
   SAVE_CSV_DATA,
   SAVE_CSV_DATA_FOR_FILTERING,
   DATA_IS_UPLOADED,
   SHOW_GRAPHS_BUTTON_IS_PRESSED,
   CSV_OPTION_DROPDOWN,
   TOUCH_OPTION_DROPDOWN,
   AUTHENTICATION_COMPLETED,
   TOUCH_DATE_FROM,
   TOUCH_DATE_TO,
   DIALOG_WINDOW_IS_OPENED,
   TABLE_DATA_FOR_DIALOG,
   TABLE_DATE_FROM,
   TABLE_DATE_TO
} from "../constants";

export const saveCsvData = (array) => ({
   type: SAVE_CSV_DATA,
   payload: array,
});

export const saveCsvDataForFiltering = (array) => ({
   type: SAVE_CSV_DATA_FOR_FILTERING,
   payload: array,
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
   type: CSV_OPTION_DROPDOWN,
   payload: number,
});
export const getDataFromTouchDropdown = (number) => ({
   type: TOUCH_OPTION_DROPDOWN,
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

export const tableDateFrom = (string) => ({
   type: TABLE_DATE_FROM,
   payload: string,
});

export const tableDateTo = (string) => ({
   type: TABLE_DATE_TO,
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

export const tableDataForDialog = (array) => ({
   type: TABLE_DATA_FOR_DIALOG,
   payload: array,
});