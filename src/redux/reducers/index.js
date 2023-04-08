import { combineReducers } from "redux";
import csv_data_reducer from "./csv_data";
import dropdownOptionReducer from "./dropdownOptionReducer";
import data_is_uploaded_reducer from "./dataIsUploaded" 
import dropdownTouchOptionReducer from "./dropdownTouchOptionReducer";

const reducer = combineReducers({
   csv_data_reducer,
   dropdownOptionReducer,
   data_is_uploaded_reducer
   // dropdownTouchOptionReducer,
});

export default reducer;
