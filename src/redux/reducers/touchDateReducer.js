import { TOUCH_DATE_FROM } from "../constants";
import { TOUCH_DATE_TO } from "../constants";

const initialState = {
   touchDateFrom: undefined,
   touchDateTo: undefined,
};

const touchDateReducer = (state = initialState, action) => {
   switch (action.type) {
      case TOUCH_DATE_FROM:
         return { ...state, touchDateFrom: action.payload };
      case TOUCH_DATE_TO:
         return { ...state, touchDateTo: action.payload };
      default:
         return state;
   }
};

export default touchDateReducer;
