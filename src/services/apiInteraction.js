import axios from "axios";
import { SERVER_URL } from "../constants/index";

export const fetchTouchData = async (path, startDate, endDate) => {
   try {
      const params = {
         startDate: startDate,
         endDate: endDate,
      };
      const response = await axios.get(`${SERVER_URL}${path}`, {
         params: params,
      });
      if (response.data.length > 0) {
         return response;
      }
      console.log(response.data)
      return { error: "Данные не найдены" };
   } catch (error) {
      console.error("Failed to fetch orders", error);
      return { error: "Ошибка получения данных" };
   }
};
