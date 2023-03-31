import { combineReducers } from "redux";
import csv_data_reducer from "./csv_data";
import dropdownOptionReducer from "./dropdownOptionReducer";
import dropdownTouchOptionReducer from "./dropdownTouchOptionReducer";

const reducer = combineReducers({
   csv_data_reducer,
   dropdownOptionReducer,
   // dropdownTouchOptionReducer,
});

export default reducer;
