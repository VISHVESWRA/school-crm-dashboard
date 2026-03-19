// import { jwtDecode } from "jwt-decode";
// import { Logout } from "../express/redux/LoginSlice";

// export const checkTokenExpiration = (dispatch) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       if (decoded.exp < currentTime) {
//         // token expired
//         dispatch(Logout());
//         alert("Session expired. Please log in again.");
//       }
//     } catch (e) {
//       console.error("Invalid token:", e);
//       dispatch(Logout());
//     }
//   }
// };

import { jwtDecode } from "jwt-decode";
import { Logout } from "../express/redux/LoginSlice";
import toasts from "react-hot-toast";

export const checkTokenExpiration = (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) return;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      dispatch(Logout());
      return;
    }

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      dispatch(Logout());
      toasts.error("Session expired. Please log in again.");
    }
  } catch (e) {
    console.error("Invalid token:", e);
    dispatch(Logout());
  }
};
