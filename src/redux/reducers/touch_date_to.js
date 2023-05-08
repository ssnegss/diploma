import { TOUCH_DATE_TO } from "../constants";

const initialState = {
   touchDateTo: undefined,
};

const touch_date_to_reducer = (state = initialState, action) => {
   switch (action.type) {
      case TOUCH_DATE_TO:
         return { ...state, touchDateTo: action.payload };
      default:
         return state;
   }
};

export default touch_date_to_reducer;
