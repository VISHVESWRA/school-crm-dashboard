import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "./LoginSlice.js";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toasts from "react-hot-toast";
import {
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Spinner } from "react-bootstrap";

// Separate component for the branding section
const BrandingSection = () => {
  return (
    <div className="hidden sm:flex sm:w-1/2 bg-pink-200 flex-col items-center justify-center p-8 rounded-l-3xl">
      <div className="flex flex-col items-center mb-8 text-center">
        {/* Logo and Title */}
        <div className="text-center mb-2 sm:mb-3 md:mb-4 text-[#C72571]">
          <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-0 pb-1 sm:pb-2 border-b border-b-gray-400 sm:border-b-2 inline-block">
            Nschool
          </h1>
        </div>

        {/* Animated Academy Text */}
        <div className="flex justify-between w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs px-1 text-[#8B0F4B] text-xs sm:text-sm md:text-base font-bold">
          {"Academy".split("").map((letter, index) => (
            <span
              className="mb-0 transition-transform hover:scale-110 text-xs sm:text-sm md:text-base"
              key={index}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-[#8B0F4B] text-center">
          <span className="text-xs font-medium">Program Your Career</span>
        </div>
      </div>

      {/* Illustration */}
      <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-80 xl:h-80 flex items-center justify-center">
        <img
          src="src/assets/image/loginIMG.png"
          alt="Login illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

// Separate component for the login form
const LoginForm = ({
  onSubmit,
  errors,
  register,
  showPassword,
  handleClickShowPassword,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
      className="grid gap-4"
    >
      <div className="grid gap-4 w-full space-y-3">
        {/* Email Field */}
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />

        {/* Password Field */}
        <FormControl
          variant="outlined"
          size="small"
          fullWidth
          required
          error={!!errors.password}
        >
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            id="password-input"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...register("password", { required: "Password is required" })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3">
          <Link
            to="/forgot-password"
            className="text-sm text-[#C72571] hover:text-[#8B0F4B] transition-colors"
          >
            Forgot Password
          </Link>
          <Button
            size="medium"
            type="submit"
            className="text-white px-6 py-2 rounded-3xl"
            sx={{
              backgroundColor: "#8B0F4B",
              "&:hover": {
                backgroundColor: "#6a0c39",
              },
            }}
          >
            Log in
          </Button>
        </div>
      </div>
    </form>
  );
};

// Loading component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-64 text-gray-600">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

// Main LoginPage component
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // Handle error notifications
  useEffect(() => {
    if (error) {
      toasts.error(error);
    }
  }, [error]);

  // Redirect if user is logged in
  useEffect(() => {
    if (user) {
      toasts.success("Login successful");
      navigate("/", { replace: true }); // ✅ fix back issue
    }
  }, [user, navigate]);

  // Show loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Handle form submission
  const onSubmit = (data) => {
    dispatch(LoginUser(data));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-purple-700 flex items-center justify-center p-4">
      <div className="flex w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-[480px]">
        {/* Left Side - Branding */}
        <BrandingSection />

        {/* Right Side - Login Form */}
        <div className="w-full sm:w-1/2 bg-gray-50 flex flex-col justify-center p-8 rounded-r-3xl">
          <div className="w-full max-w-sm sm:max-w-xs mx-auto">
            {/* Sign In Header */}
            <h2 className="text-xl font-semibold text-gray-800 relative mb-4">
              <span className="absolute -top-3 left-0 w-8 h-1 bg-[#8B0F4B] rounded-full"></span>
              Sign In
            </h2>

            {/* Login Form */}
            <LoginForm
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
