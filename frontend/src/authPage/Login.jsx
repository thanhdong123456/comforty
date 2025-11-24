import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUserProfile, login } = useAuth();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loggedInUser = await login(email, password);
      if (remember) localStorage.setItem("rememberEmail", email);
      else localStorage.removeItem("rememberEmail");
      setUserProfile(loggedInUser);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  min-h-screen flex flex-col">
      <header className="w-full border-b border-b-[#e1e3e6]">
        <Navigation data={{}} />
      </header>
      <div className="w-full max-w-[1740px] h-[156px] bg-[#F2F3F0] mx-auto flex justify-center">
        <div className="w-full max-w-[1320px] h-full flex flex-col justify-center">
          <div className="flex items-center justify-start px-4 text-[18px] max-lg:text-[16px] max-md:tetx-[14px] text-[#636270] gap-[12px] ">
            <span
              className="cursor-pointer hover:text-[#007580] transition "
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <FiChevronRight />
            <span className="cursor-pointer">Account</span>
            <FiChevronRight />
            <span>Sign In</span>
          </div>
          <div className="px-4 mt-[12px]">
            <h3 className="text-[24px] max-lg:text-[22px] max-md:text-[18px] font-semibold leading-[110%] ">
              Sign In
            </h3>
          </div>
        </div>
      </div>
      <div className="flex mx-auto w-full my-[80px] max-md:my-[40px]  justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col my-[80px] max-md:my-[40px] p-[32px] max-md:p-[20px]  w-[648px] max-md:w-full  h-auto bg-white shadow"
        >
          <h3 className="text-[32px] flex max-lg:text-[22px] max-md:text-[18px] items-center justify-center font-semibold leading-[110%]">
            Sign In
          </h3>
          <div className="flex flex-col justify-between space-y-[16px] mt-[24px]">
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px] text-[#9A9CAA]"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess("");
              }}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-[20px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-[20px] text-[16px] max-md:text-[14px]">
            <div className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label>Remember Me</label>
            </div>
            <div>
              <button
                onClick={() => navigate("/login/forgot-password")}
                className="text-[14px] text-[#007580] font-medium leading-[110%] hover:underline"
              >
                Forget Password
              </button>
            </div>
          </div>
          <div className="w-full mt-[24px]">
            <button className="w-full bg-[#029FAE] py-[17px] max-md:py-[15px] text-white rounded-[8px] font-semibold flex items-center justify-center gap-[12px] hover:bg-[#027c82] ">
              Sign In <FiArrowRight />
            </button>
            {error && (
              <div className="text-[#f10d20] text-[16px] mt-[20px] text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="text-[#2AA198] text-[16px] mt-[20px]  text-center">
                {success}
              </div>
            )}
          </div>

          <div className="w-full flex justify-center items-center my-[24px] text-[16px] md:text-[14px] gap-1 leading-[110%]">
            <span>Don’t have account?</span>
            <a
              className="text-[#007580] font-medium hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
      <footer className="w-full border-t border-b border-[#e9eaec] bg-white">
        <div className="max-w-[1320px] w-full mx-auto px-0 max-xl:px-4 ">
          <Footer />
        </div>
        <section className="flex-1 border-t border-[#e9eaec] w-full mx-auto px-0 max-sm:px-4 ">
          <div className="max-w-[1320px] w-full mx-auto px-0 max-xl:px-4 ">
            <Copyright />
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Login;
