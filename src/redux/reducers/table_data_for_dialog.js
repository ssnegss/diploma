import { TABLE_DATA_FOR_DIALOG } from "../constants";

const initialState = {
   dialogData: [],
};

const table_data_for_dialog_reducer = (state = initialState, action) => {
   switch (action.type) {
      case TABLE_DATA_FOR_DIALOG:
         return { ...state, dialogData: action.payload };
      default:
         return state;
   }
};

export default table_data_for_dialog_reducer;
