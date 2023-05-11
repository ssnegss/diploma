import { combineReducers } from "redux";
import dropdownOptionReducer from "./dropdownOptionReducer";
import calendarDateReducer from "./calendarDateReducer";
import booleanReducer from "./booleanReducer";
import dataReducer from "./dataReducer";

const reducer = combineReducers({
   dataReducer,
   dropdownOptionReducer,
   calendarDateReducer,
   booleanReducer,
});

export default reducer;
