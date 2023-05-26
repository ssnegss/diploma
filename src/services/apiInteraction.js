import axios from "axios";

export const fetchTouchData = async (path) => {
   try {
      const response = await axios.get(`http://localhost:5000${path}`);
      return response;
   } catch (error) {
      console.error("Failed to fetch orders", error);
   }
};
