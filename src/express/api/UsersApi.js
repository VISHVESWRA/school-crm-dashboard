import axios from "axios";

const URL = "http://localhost:9900/api/users";

export const createUserApi = (data) => axios.post(URL, data);

export const getUsersApi = () => axios.get(URL);
export const getUserByIdApi = (id) => axios.get(`${URL}/${id}`);

export const updateUserApi = (id, data) => axios.put(`${URL}/${id}`, data);

export const deleteUserApi = (id) => axios.delete(`${URL}/${id}`);

