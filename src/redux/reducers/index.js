import { combineReducers } from "redux";
import csv_data_reducer from "./csv_data";
import csv_data_for_filtering_reducer from "./csv_data_for_filtering";
import dropdownOptionReducer from "./dropdownOptionReducer";
import data_is_uploaded_reducer from "./dataIsUploaded";
import show_graphs_button_is_pressed_reducer from "./show_graphs_button_is_pressed";
import dropdownCsvOptionReducer from "./dropdownCsvOptionReducer";
import dropdownTouchOptionReducer from "./dropdownTouchOptionReducer";
import authentication_completed_reducer from "./authentication_completed";
import touch_date_from_reducer from "./touch_date_from";
import touch_date_to_reducer from "./touch_date_to";
import dialog_window_is_opened_reducer from "./dialog_window_opened";

const reducer = combineReducers({
   csv_data_reducer,
   dropdownOptionReducer,
   data_is_uploaded_reducer,
   csv_data_for_filtering_reducer,
   show_graphs_button_is_pressed_reducer,
   dropdownCsvOptionReducer,
   dropdownTouchOptionReducer,
   authentication_completed_reducer,
   touch_date_from_reducer,
   touch_date_to_reducer,
   dialog_window_is_opened_reducer,
});

export default reducer;
