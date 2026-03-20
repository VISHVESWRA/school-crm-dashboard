import axios from "axios";

const URL = "http://localhost:9900/api/students";

export const createStudentsApi = (data) => axios.post(URL, data);

export const getStudentsApi = () => axios.get(URL);
export const getStudentsByIdApi = (id) => axios.get(`${URL}/${id}`);

export const updateStudentsApi = (id, data) => axios.put(`${URL}/${id}`, data);

export const deleteStudentsApi = (id) => axios.delete(`${URL}/${id}`);
