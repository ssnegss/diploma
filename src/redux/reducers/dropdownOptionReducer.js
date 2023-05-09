import { CSV_OPTION_DROPDOWN } from "../constants";
import { TOUCH_OPTION_DROPDOWN } from "../constants";

const initialState = {
   csvOption: undefined,
   touchOption: undefined,
};

const dropdownOptionReducer = (state = initialState, action) => {
   switch (action.type) {
      case CSV_OPTION_DROPDOWN:
         return { ...state, csvOption: action.payload };
      case TOUCH_OPTION_DROPDOWN:
         return { ...state, touchOption: action.payload };
      default:
         return state;
   }
};

export default dropdownOptionReducer;
