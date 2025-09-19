export default function Login() {
    return (
        <>
            {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto dark:hidden"
                    />
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                        className="mx-auto h-10 w-auto not-dark:hidden"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-poppins tracking-tight text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-black dark:text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-black dark:text-gray-100">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
                        Not a member?{' '}
                        <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                            Start a 14 day free trial
                        </a>
                    </p>
                </div>
            </div> */}


            <div className="flex bg-[#FCDDEC] rounded-2xl m-10 h-full">
                {/* <div className="w-1/2 h-full rounded-2xl bg-gray-500">
                    <div className="flex flex-col items-center justify-center my-5 mx-20">
                        <span className="font-poppins text-3xl underline">Nschool</span>
                        <span className="font-poppins text-xl">Academy</span>
                        <span className="font-poppins text-sm">Program Your Caree</span>
                    </div>
                </div>
                <div className="w-1/2 h-full rounded-2xl bg-red-300">                </div> */}
                <div className="w-1/2 bg-pink-200 flex flex-col items-center justify-center p-10">
                    {/* Title */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-3xl font-poppins text-[#C72571]">Nschool</h1>

                        {/* Academy spaced under Nschool */}
                        <div className="flex justify-between w-full max-w-[110px] text-pink-800 text-sm font-medium">
                            {"Academy".split("").map((letter, i) => (
                                <span key={i}>{letter}</span>
                            ))}
                        </div>

                        <p className="text-xs text-pink-600 mt-1">Program Your Career</p>
                    </div>

                    {/* Illustration */}
                    <div className="w-48 h-48">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                            alt="Login Illustration"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="w-1/2 bg-pink-300 flex flex-col justify-center px-12">
                    <h2 className="text-xl font-semibold text-gray-800 mb-8 relative">
                        <span className="absolute -top-3 left-0 w-8 h-1 bg-pink-700 rounded-full"></span>
                        Log in as a admin user
                    </h2>

                    <form className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="User Name"
                                className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <p className="text-red-500 text-xs mt-1">Invalid user name</p>
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                            <p className="text-red-500 text-xs mt-1">Invalid password</p>
                        </div>

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
    )
}
