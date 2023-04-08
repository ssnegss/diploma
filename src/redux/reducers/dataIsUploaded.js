import { DATA_IS_UPLOADED } from "../constants";

const initialState = {
   isUploaded: 0,
};

const data_is_uploaded_reducer = (state = initialState, action) => {
   switch (action.type) {
      case DATA_IS_UPLOADED:
         return { ...state, isUploaded: action.payload };
      default:
         return state;
   }
};

export default data_is_uploaded_reducer;
