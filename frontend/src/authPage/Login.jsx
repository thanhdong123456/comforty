import React from "react";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { FiChevronRight, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
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
      <div className="flex mx-auto w-full my-[80px]  justify-center">
        <form className="flex flex-col my-[80px] p-[32px]  max-w-[648px] h-auto bg-white shadow">
          <h3 className="text-[32px] flex max-lg:text-[22px] max-md:text-[18px] items-center justify-center font-semibold leading-[110%]">
            Sign In
          </h3>
          <div className="flex flex-col justify-between space-y-[16px] mt-[24px]">
            <input
              type="text"
              placeholder="Email"
              className="w-full h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px] text-[9A9CAA]"
            />
            <div className="relative">
              <input
                type="text"
                placeholder="Password"
                className="w-[584px] h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px] text-[9A9CAA]"
              />
              <FiEye className="absolute right-0 top-1/2 -translate-y-1/2 mr-[20px] text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mt-[16px] text-[16px]">
            <div className="flex items-center gap-[8px]">
              <input type="checkbox" id="remember" />
              <label>Remember Me</label>
            </div>
            <div>
              <a
                href="#"
                className="text-[14px] text-[#007580] font-medium leading-[110%] hover:underline "
              >
                Forget Password
              </a>
            </div>
          </div>
          <div className="w-full flex justify-center items-center bg-[#029FAE] rounded-[8px] mt-[24px]">
            <button className="py-[17px] text-white flex  items-center  gap-[12px] font-semibold">
              Sign In <FiArrowRight />{" "}
            </button>
          </div>
          <div className="w-full flex justify-center items-center my-[24px] gap-1 leading-[110%]">
            <span>Don’t have account?</span>
            <a className="text-[#007580] font-medium  hover:underline ">
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
