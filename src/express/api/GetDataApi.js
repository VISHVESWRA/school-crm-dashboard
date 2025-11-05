import axios from "axios";

export const getTotalLength = () => {
  const token = localStorage.getItem("token");
  axios.get("http://localhost:9900/api/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const getTotalCourses = () =>
//   axios.get("http://localhost:9900/api/courses");

// export const getTotalTeachers = () =>
//   axios.get("http://localhost:9900/api/teachers");
