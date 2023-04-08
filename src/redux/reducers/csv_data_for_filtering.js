import { SAVE_CSV_DATA_FOR_FILTERING } from "../constants";
import { useSelector } from "react-redux";

const initialState = {
   csvData: [],
};

const csv_data_for_filtering_reducer = (state = initialState, action) => {
   switch (action.type) {
      case SAVE_CSV_DATA_FOR_FILTERING:
         return { ...state, csvData: action.payload };
      default:
         return state;
   }
};

export default csv_data_for_filtering_reducer;
