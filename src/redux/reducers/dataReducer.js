import { SAVE_CSV_DATA } from "../constants";
import { SAVE_CSV_DATA_FOR_FILTERING } from "../constants";
import { TABLE_DATA_FOR_DIALOG } from "../constants";

const initialState = {
   csvData: [],
   filteredCsvData: [],
   dialogData: [],
};

const dataReducer = (state = initialState, action) => {
   switch (action.type) {
      case SAVE_CSV_DATA:
         return { ...state, csvData: action.payload };
      case SAVE_CSV_DATA_FOR_FILTERING:
         return { ...state, filteredCsvData: action.payload };
      case TABLE_DATA_FOR_DIALOG:
         return { ...state, dialogData: action.payload };
      default:
         return state;
   }
};

export default dataReducer;
