import { AUTHENTICATION_COMPLETED } from "../constants";

const initialState = {
   isCompleted: 1,
};

const authentication_completed_reducer = (state = initialState, action) => {
   switch (action.type) {
      case AUTHENTICATION_COMPLETED:
         return { ...state, isCompleted: action.payload };
      default:
         return state;
   }
};

export default authentication_completed_reducer;
