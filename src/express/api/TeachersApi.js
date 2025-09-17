import axios from "axios";

const URL = "http://localhost:9900/api/teachers";

export const createTeacherApi = (data) => {
  return axios.post(URL, data);
};

export const getTeachersApi = () => {
  return axios.get(URL);
};

// export const updateTeacherApi = (id, data) => {
//   axios.put(`${URL}/${id}`, data);
// }
export const deleteTeacherApi = (id) => {
  return axios.delete(`${URL}/${id}`);
};
