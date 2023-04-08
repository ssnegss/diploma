import { combineReducers } from "redux";
import csv_data_reducer from "./csv_data";
import csv_data_for_filtering_reducer from "./csv_data_for_filtering";
import dropdownOptionReducer from "./dropdownOptionReducer";
import data_is_uploaded_reducer from "./dataIsUploaded";
import show_graphs_button_is_pressed_reducer from "./show_graphs_button_is_pressed";

const reducer = combineReducers({
   csv_data_reducer,
   dropdownOptionReducer,
   data_is_uploaded_reducer,
   csv_data_for_filtering_reducer,
   show_graphs_button_is_pressed_reducer,
});

export default reducer;
