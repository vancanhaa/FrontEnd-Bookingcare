import axios from "../axios";

export const handleLoginApi = (email, password) => {
  const data = { email, password };
  return axios.post("/api/login", data);
};

export const getAllUsers = () => {
  return axios.get("/api/users");
};

export const getUserById = (idUser) => {
  return axios.get(`/api/users/${idUser}`);
};

export const addNewUser = (data) => {
  return axios.post(`api/users`, data);
};

export const updateUser = (id, data) => {
  return axios.put(`api/users/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`api/users/${id}`);
};
