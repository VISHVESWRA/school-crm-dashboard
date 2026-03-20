import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { TextField, Button } from "@mui/material";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:9900/api/auth/forgot-password", data);
      toast.success("Reset link sent to email");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <TextField label="Email" {...register("email")} required />
      <Button type="submit" variant="contained">
        Send Reset Link
      </Button>
    </form>
  );
}
