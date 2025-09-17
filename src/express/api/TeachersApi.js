import axios from "axios";

const BASE_URL = "http://localhost:5000/api/teachers";

export const createTeacherApi = (data) => axios.post(BASE_URL, data);
export const getTeachersApi = () => axios.get(BASE_URL);
export const updateTeacherApi = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);
export const deleteTeacherApi = (id) => axios.delete(`${BASE_URL}/${id}`);
