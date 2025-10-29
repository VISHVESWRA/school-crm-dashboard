import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";
import {ResetApi} from "../../express/api/LoginApi";
import {verifyEmail} from "../../express/redux/VerifyEmail";

export default function ResetPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  // const {user, loading, error} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {getUser, loading, error} = useSelector((state) => state.verifyEmail);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 1000,
      });
    }
  }, [error]);

  const onSubmit = async (data) => {
    if (error) {
      await toast.error(error, {
        duration: 1000,
      });
    }
    if (!getUser && watch("email")) {
      console.log("getUser");
      dispatch(verifyEmail(data));
    } else {
      console.log("reset");
      dispatch(ResetApi(data));
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-purple-700 flex items-center justify-center p-4">
        <div className="flex w-full max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-[480px]">
          {/* Left Side */}
          <div className="hidden sm:w-1/2 bg-pink-200 sm:flex flex-col items-center justify-center p-8 rounded-l-3xl">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="text-center mb-2 sm:mb-3 md:mb-4 text-[#C72571]">
                <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold  mb-0 pb-1 sm:pb-2 border-b border-b-gray-400 sm:border-b-2 inline-block">
                  Nschool
                </h1>
              </div>
              <div className="flex justify-between w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-xs px-1 text-[#8B0F4B] text-xs sm:text-sm md:text-base font-bold">
                {"Academy".split("").map((letter, i) => (
                  <span
                    className="mb-0 transition-transform hover:scale-110 text-xs sm:text-sm md:text-base"
                    key={i}
                  >
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

          {/* Right Side */}
          <div className="w-full sm:w-1/2 bg-gray-50 flex flex-col justify-center p-8 rounded-r-3xl">
            <div className="w-full max-w-sm sm:max-w-xs mx-auto">
              {/* <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 md:mb-6 lg:mb-10 relative">
                <span className="absolute -top-1 sm:-top-2 md:-top-3 left-0 w-4 sm:w-6 md:w-8 h-0.5 sm:h-0.5 md:h-1 bg-[#8B0F4B] rounded-full"></span>
                Login
              </h2> */}
              <h2 className="text-xl font-semibold text-gray-800 relative mb-4">
                <span className="absolute -top-3 left-0 w-8 h-1 bg-[#8B0F4B] rounded-4xl"></span>
                Sign Up
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
                className="grid gap-4"
              >
                <div className="grid gap-4 w-full space-y-3">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    required
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {/* <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    required
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    {...register("password", {required: "Required"})}
                  /> */}

                  <div className="flex items-center justify-between pt-3">
                    <Link
                      href="#"
                      to="/login"
                      underline="hover"
                      className="text-sm"
                    >
                      Sigin
                    </Link>
                    <Button
                      size="md"
                      type="submit"
                      className="text-white px-6 py-2 rounded-3xl border"
                      style={{backgroundColor: "#8B0F4B"}}
                    >
                      Send reset email
                    </Button>
                  </div>
                </div>
              </form>

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
