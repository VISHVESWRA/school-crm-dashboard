import axios from "axios";

export const getTotalLength = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:9900/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    throw error;
  }
};

// export const getTotalCourses = () =>
//   axios.get("http://localhost:9900/api/courses");

// export const getTotalTeachers = () =>
//   axios.get("http://localhost:9900/api/teachers");
