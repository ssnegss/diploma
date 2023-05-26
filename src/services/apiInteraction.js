import axios from "axios";

export const fetchTouchData = async (path, startDate, endDate) => {
   try {
      const params = {
         startDate: startDate,
         endDate: endDate,
      };
      const response = await axios.get(`http://localhost:5000${path}`, { params: params });
      return response;
   } catch (error) {
      console.error("Failed to fetch orders", error);
   }
};
