// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, MenuItem } from "@mui/material";
// import toast from "react-hot-toast";

// export default function Register() {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       await axios.post("http://localhost:5000/api/register", data);
//       toast.success("Registered successfully");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
//       <TextField label="Name" {...register("name")} required />
//       <TextField label="Email" {...register("email")} required />
//       <TextField label="Password" {...register("password")} required />

//       {/* Role */}
//       <TextField
//         select
//         label="Role"
//         defaultValue="student"
//         {...register("role")}
//       >
//         <MenuItem value="student">Student</MenuItem>
//         <MenuItem value="staff">Staff</MenuItem>
//         <MenuItem value="admin">Admin</MenuItem>
//       </TextField>

//       <Button type="submit" variant="contained">
//         Register
//       </Button>
//     </form>
//   );
// }
