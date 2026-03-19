import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button } from "@mui/material";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        data,
      );
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TextField label="New Password" {...register("password")} required />
      <Button type="submit" variant="contained">
        Reset Password
      </Button>
    </form>
  );
}
