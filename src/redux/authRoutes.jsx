import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" />;

  return children;
}

/////////////////////////////////////

// import PrivateRoute from "./components/PrivateRoute";

{
  /* <Route
  path="/admin-dashboard"
  element={
    <PrivateRoute role="admin">
      <AdminDashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/teacher-dashboard"
  element={
    <PrivateRoute role="teacher">
      <TeacherDashboard />
    </PrivateRoute>
  }
/> */
}

//////////////////////////////////////////

// import { useSelector } from "react-redux";

// export default function Dashboard() {
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <div>
//       <h2>Welcome {user.name}</h2>

//       {/* Admin Only Section */}
//       {user.role === "admin" && (
//         <section>
//           <h3>Admin Panel</h3>
//           <p>Manage teachers, students, fees, reports...</p>
//         </section>
//       )}

//       {/* Teacher Section */}
//       {user.role === "teacher" && (
//         <section>
//           <h3>Teacher Tools</h3>
//           <p>Take attendance, update grades...</p>
//         </section>
//       )}

//       {/* Student Section */}
//       {user.role === "student" && (
//         <section>
//           <h3>Student Info</h3>
//           <p>View timetable, marks, assignments...</p>
//         </section>
//       )}

//       {/* Parent Section */}
//       {user.role === "parent" && (
//         <section>
//           <h3>Parent Zone</h3>
//           <p>Check child’s attendance, fees, progress...</p>
//         </section>
//       )}
//     </div>
//   );
// }

///////////////////////////////

// {user.role === "admin" && <AdminStats />}
// {["admin", "teacher"].includes(user.role) && <AttendanceWidget />}
// {["admin", "student"].includes(user.role) && <GradesWidget />}
// {["admin", "parent"].includes(user.role) && <FeeStatus />}
