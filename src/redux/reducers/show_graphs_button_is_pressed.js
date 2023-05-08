import { SHOW_GRAPHS_BUTTON_IS_PRESSED } from "../constants";

const initialState = {
   isPushed: 0,
};

const show_graphs_button_is_pressed_reducer = (
   state = initialState,
   action
) => {
   switch (action.type) {
      case SHOW_GRAPHS_BUTTON_IS_PRESSED:
         return { ...state, isPushed: action.payload };
      default:
         return state;
   }
};

export default show_graphs_button_is_pressed_reducer;
