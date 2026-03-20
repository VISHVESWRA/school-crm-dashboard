import axios from "axios";

const URL = "http://localhost:9900/api/courses";

export const createCourseApi = (data) => axios.post(URL, data);
export const getCoursesApi = () => axios.get(URL);
export const getCourseByIdApi = (id) => axios.get(`${URL}/${id}`);
export const updateCourseApi = (id, data) => axios.put(`${URL}/${id}`, data);
export const deleteCourseApi = (id) => axios.delete(`${URL}/${id}`);
