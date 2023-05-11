import { TOUCH_DATE_FROM } from "../constants";
import { TOUCH_DATE_TO } from "../constants";
import { TABLE_DATE_FROM } from "../constants";
import { TABLE_DATE_TO } from "../constants";

const initialState = {
   touchDateFrom: undefined,
   touchDateTo: undefined,
   tableDateFrom: undefined,
   tableDateTo: undefined,
};

const calendarDateReducer = (state = initialState, action) => {
   switch (action.type) {
      case TOUCH_DATE_FROM:
         return { ...state, touchDateFrom: action.payload };
      case TOUCH_DATE_TO:
         return { ...state, touchDateTo: action.payload };
      case TABLE_DATE_FROM:
         return { ...state, tableDateFrom: action.payload };
      case TABLE_DATE_TO:
         return { ...state, tableDateTo: action.payload };
      default:
         return state;
   }
};

export default calendarDateReducer;
