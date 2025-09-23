import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);
  console.log("PrivateRoute mounted", user, role);
  console.log("Route path:", window.location.pathname);

  if (!user) return <Navigate to="/login" />;
  if (role && !role.includes(user.role)) return <h1>Not authorised</h1>;

  return children;
}
