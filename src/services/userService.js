import axios from "../axios";

export const handleLoginApi = (email, password) => {
  const data = { email, password };
  return axios.post("/api/login", data);
};
