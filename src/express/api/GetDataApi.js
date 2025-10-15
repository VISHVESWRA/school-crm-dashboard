import axios from "axios";

export const getTotalLength = () =>
  axios.get("http://localhost:9900/api/dashboard");

// export const getTotalCourses = () =>
//   axios.get("http://localhost:9900/api/courses");

// export const getTotalTeachers = () =>
//   axios.get("http://localhost:9900/api/teachers");
