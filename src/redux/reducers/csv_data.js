import { SAVE_CSV_DATA } from "../constants";

const initialState = {
   csvData: [],
};

const csv_data_reducer = (state = initialState, action) => {
   switch (action.type) {
      case SAVE_CSV_DATA:
         return { ...state, csvData: action.payload };
      default:
         return state;
   }
};

export default csv_data_reducer;
