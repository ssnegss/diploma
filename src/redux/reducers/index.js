import { combineReducers } from "redux";
import dropdownOptionReducer from "./dropdownOptionReducer";
import touchDateReducer from "./calendarDateReducer";
import booleanReducer from "./booleanReducer";
import dataReducer from "./dataReducer";

const reducer = combineReducers({
   dataReducer,
   dropdownOptionReducer,
   touchDateReducer,
   booleanReducer,
});

export default reducer;
