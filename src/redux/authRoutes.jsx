// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// export default function PrivateRoute() {
//   const { user } = useSelector((state) => state.auth);

//   console.log("PRIVATE ROUTE USER:", user);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />; // ✅ MUST
// }

import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Logout } from "../express/redux/LoginSlice";

export default function PrivateRoute({ role }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // role check (optional)
  if (role && !role.includes(user.role)) {
    return (
      <div>
        <button onClick={() => dispatch(Logout())}>Logout</button>
        <h1>Not authorised</h1>
      </div>
    );
  }

  return <Outlet />; // ✅ THIS FIXES EVERYTHING
}
