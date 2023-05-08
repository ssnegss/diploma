import { TOUCH_DATE_FROM } from "../constants";

const initialState = {
   touchDateFrom: undefined,
};

const touch_date_from_reducer = (state = initialState, action) => {
   switch (action.type) {
      case TOUCH_DATE_FROM:
         return { ...state, touchDateFrom: action.payload };
      default:
         return state;
   }
};

export default touch_date_from_reducer;
