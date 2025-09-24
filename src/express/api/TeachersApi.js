import axios from "axios";

const URL = "http://localhost:9900/api/teachers";

export const createTeacherApi = (data) => axios.post(URL, data);

export const getTeachersApi = () => axios.get(URL);
export const getTeacherByIdApi = (id) => axios.get(`${URL}/${id}`);

export const updateTeacherApi = (id, data) => axios.put(`${URL}/${id}`, data);

export const deleteTeacherApi = (id) => axios.delete(`${URL}/${id}`);

