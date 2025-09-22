import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <div className="flex bg-[#301120] rounded-4xl m-10 h-full">
        <div className="w-1/2 bg-pink-200 flex flex-col items-center justify-center p-10 rounded-l-4xl">
          {/* Title */}
          <div className="flex flex-col items-center mb-8">
            <span className="text-3xl font-poppins text-[#C72571]">
              <h1 className="mb-0 border-b-2 border-b-gray-400">Nschool</h1>
            </span>

            {/* Academy spaced under Nschool */}
            <div className="flex justify-between w-full px-1 text-[#8B0F4B] text-sm font-bold">
              {"Academy".split("").map((letter, i) => (
                <h5 className="mb-0" key={i}>
                  {letter}
                </h5>
              ))}
            </div>
            <span className=" text-[#8B0F4B]">
              <h6 className="mt-1">Program Your Career</h6>
            </span>
          </div>

          {/* Illustration */}
          <div className="w-80 h-80">
            <img
              src="src\assets\image\loginIMG.png"
              alt="Login img"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-1/2 bg-pink-300 flex flex-col justify-center px-12 rounded-r-4xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-8 relative">
            <span className="absolute -top-3 left-0 w-8 h-1 bg-[#8B0F4B] rounded-4xl"></span>
            Log in as a admin user
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="User Name"
                className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("username", { required: "Invalid user name" })}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("password", { required: "Invalid password" })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-pink-700 text-white px-6 py-2 rounded-full hover:bg-pink-800 transition"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// const handleSubmit = (e) => {
//   e.preventDefault();
//   dispatch(loginUser({ email, password }));
// };

// return (
//   <div>
//     <h2>Login</h2>
//     <form onSubmit={handleSubmit}>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   </div>
// );
