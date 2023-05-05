import axios from "axios";

export const login = async (username, password) => {
   try {
      const response = await axios.post("http://localhost:5000/login", {
         username: username,
         password: password,
      });
      return response.data;
   } catch (error) {
      throw error.response.data;
   }
};
