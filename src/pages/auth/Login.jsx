import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../express/redux/LoginSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    dispatch(LoginUser(data));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10">
        <div className="flex w-full max-w-5xl bg-white rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl 
        shadow-xl overflow-hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] m-20">

          {/* Left Side */}
          <div className="w-1/2 bg-pink-200 flex flex-col gap-5 items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10 rounded-l-xl sm:rounded-l-2xl md:rounded-l-3xl lg:rounded-l-4xl">
            <div className="flex flex-col items-center mb-2 sm:mb-4 md:mb-6 lg:mb-8">

              <div className="text-center mb-2 sm:mb-3 md:mb-4 text-[#C72571]">
                <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold  mb-0 pb-1 sm:pb-2 border-b border-b-gray-400 sm:border-b-2 inline-block">
                  Nschool
                </h1>
              </div>
              <div className="flex justify-between w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs px-1 text-[#8B0F4B] text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2">
                {"Academy".split("").map((letter, i) => (
                  <span className="mb-0 transition-transform hover:scale-110 text-xs sm:text-sm md:text-base" key={i}>
                    {letter}
                  </span>
                ))}
              </div>
              <div className="text-[#8B0F4B] text-center">
                <span className="text-xs font-medium">Program Your Career</span>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 lg:w-60 lg:h-60 xl:w-80 xl:h-80 flex items-center justify-center">
              <div className="w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
                <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-[#C72571]/40">
                  <img
                    src="src/assets/image/loginIMG.png"
                    alt="Login img"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-pink-100 flex flex-col justify-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 rounded-r-xl sm:rounded-r-2xl md:rounded-r-3xl lg:rounded-r-4xl">
            <div className="w-full max-w-sm mx-auto p-5">

              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 md:mb-6 lg:mb-8 relative">
                <span className="absolute -top-1 sm:-top-2 md:-top-3 left-0 w-4 sm:w-6 md:w-8 h-0.5 sm:h-0.5 md:h-1 bg-[#8B0F4B] rounded-full"></span>
                Login
              </h2>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
                className="w-full"
              >
                <div className="w-auto space-y-4 sm:space-y-6">
                  <TextField
                    label="Name"
                    variant="outlined"
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name", { required: "Required" })}
                    className="w-full mb-4"
                  />

                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password", { required: "Required" })}
                    className="w-full mb-4"
                  />

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-black hover:bg-gray-800 rounded-3xl text-white px-6 py-2.5 sm:px-8 sm:py-3"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Box>

              {/* Additional Options - Hidden on very small screens */}
              {/* <div className="hidden sm:block mt-3 md:mt-4 lg:mt-6 pt-3 md:pt-4 lg:pt-6 border-t border-pink-200/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-3 h-3 sm:w-4 sm:h-4 text-[#C72571] bg-gray-100 border-gray-300 rounded focus:ring-[#C72571] focus:ring-1"
                    />
                    <span className="ml-1 sm:ml-2 text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-[#C72571] hover:text-[#8B0F4B] font-medium transition-colors duration-200 text-xs sm:text-sm">
                    Forgot password?
                  </a>
                </div>
              </div> */}

              {/* Mobile-only forgot password for very small screens */}
              {/* <div className="sm:hidden mt-2 text-center">
                <a href="#" className="text-[#C72571] hover:text-[#8B0F4B] font-medium text-xs transition-colors duration-200">
                  Forgot?
                </a>
              </div> */}


            </div>
          </div>

        </div>
      </div>


    </>
  );
}
