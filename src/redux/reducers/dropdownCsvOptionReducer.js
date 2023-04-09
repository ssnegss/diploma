import { CHOOSE_DATA_GET_CSV_OPTION_DROPDOWN } from "../constants";

const initialState = {
   dropdownOption: undefined,
};

const dropdownCsvOptionReducer = (state = initialState, action) => {
   switch (action.type) {
      case CHOOSE_DATA_GET_CSV_OPTION_DROPDOWN:
         return { ...state, dropdownOption: action.payload };
      default:
         return state;
   }
};

export default dropdownCsvOptionReducer;
