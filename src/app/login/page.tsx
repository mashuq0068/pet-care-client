/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-lg flex w-full max-w-4xl">
        {/* Left Side Image */}
        <div className="hidden md:flex md:w-1/2 relative">
          <Image
            src="https://i.postimg.cc/449RPWKC/3293465.jpg" // Update with your image path
            alt="Login Image"
            layout="fill"
            objectFit="contain"
            className="rounded-l-lg"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Log in to your account to continue
          </p>

          <form className="space-y-4">
            {/* Email Address */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Log In
            </button>
          </form>

          <div className="text-center text-gray-500">
            <p>
              Don't have an account?{" "}
              <a href="/registration" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
