import axios from "axios";
import { SERVER_URL } from "../constants/index";

export const fetchTouchData = async (path, startDate, endDate) => {
   try {
      const params = {
         startDate: startDate,
         endDate: endDate,
      };
      console.log(`${SERVER_URL}${path}`);
      const response = await axios.get(`${SERVER_URL}${path}`, {
         params: params,
      });
      return response;
   } catch (error) {
      console.error("Failed to fetch orders", error);
   }
};
