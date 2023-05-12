import { AUTHENTICATION_COMPLETED } from "../constants";
import { DATA_IS_UPLOADED } from "../constants";
import { DIALOG_WINDOW_IS_OPENED } from "../constants";
import { SHOW_GRAPHS_BUTTON_IS_PRESSED } from "../constants";

const initialState = {
   authIsCompleted: false,
   dataIsUploaded: false,
   dialogIsOpened: false,
   showGraphs: false,
};

const booleanReducer = (state = initialState, action) => {
   switch (action.type) {
      case AUTHENTICATION_COMPLETED:
         return { ...state, authIsCompleted: action.payload };
      case DATA_IS_UPLOADED:
         return { ...state, dataIsUploaded: action.payload };
      case DIALOG_WINDOW_IS_OPENED:
         return { ...state, dialogIsOpened: action.payload };
      case SHOW_GRAPHS_BUTTON_IS_PRESSED:
         return { ...state, showGraphs: action.payload };
      default:
         return state;
   }
};

export default booleanReducer;
