import { jwtDecode } from "jwt-decode";
import Logout from "../express/redux/LoginSlice.js";

export const checkTokenExpiration = (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // token expired
        dispatch(Logout());
        alert("Session expired. Please log in again.");
      }
    } catch (e) {
      console.error("Invalid token:", e);
      dispatch(Logout());
    }
  }
};
