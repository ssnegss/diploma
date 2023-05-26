import axios from "axios";
import { SERVER_URL } from "../constants/index";

export const login = async (username, password) => {
   try {
      const response = await axios.post(`${SERVER_URL}/login`, {
         username: username,
         password: password,
      });
      return response.data;
   } catch (error) {
      throw error.response.data;
   }
};
