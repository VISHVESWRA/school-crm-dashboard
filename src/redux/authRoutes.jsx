import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Logout } from "../express/redux/LoginSlice";

export default function PrivateRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("PrivateRoute mounted", user, role);
  console.log("Route path:", window.location.pathname);


  if (!user) return <Navigate to="/login" />;
  if (role && !role.includes(user.role)) return (
    <>
      <button onClick={() => dispatch(Logout())}>Logout</button>
      <h1>Not authorised</h1>
    </>
  );

  return children;
}
