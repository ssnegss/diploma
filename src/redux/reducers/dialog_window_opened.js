import { DIALOG_WINDOW_IS_OPENED } from "../constants";

const initialState = {
   isOpened: false,
};

const dialog_window_is_opened_reducer = (state = initialState, action) => {
   switch (action.type) {
      case DIALOG_WINDOW_IS_OPENED:
         return { ...state, isOpened: action.payload };
      default:
         return state;
   }
};

export default dialog_window_is_opened_reducer;
