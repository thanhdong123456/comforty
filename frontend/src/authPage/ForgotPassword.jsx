import React, { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import {
  FiChevronRight,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setSuccess(
          "Đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra email của bạn."
        );
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
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
            <span
              className="cursor-pointer hover:text-[#007580] transition "
              onClick={() => navigate("/login")}
            >
              Sign In
            </span>
            <FiChevronRight />
            <span>Forgot Password</span>
          </div>
          <div className="px-4 mt-[12px]">
            <h3 className="text-[24px] max-lg:text-[22px] max-md:text-[18px] font-semibold leading-[110%] ">
              Forgot Password
            </h3>
          </div>
        </div>
      </div>
      <div className="flex mx-auto w-full my-[80px] max-md:my-[40px]  justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col my-[80px] max-md:my-[40px] p-[32px] max-md:p-[20px]  w-[648px] max-md:w-full  h-auto bg-white shadow"
        >
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-start py-3 cursor-pointer w-6 h-6"
          >
            <FiArrowLeft size={24} />
          </button>

          <h3 className="text-[32px] flex max-lg:text-[22px] max-md:text-[18px] items-center justify-center font-semibold leading-[110%]">
            Forgot Password
          </h3>
          <div className="flex flex-col justify-between space-y-[16px] mt-[24px]">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px] text-[9A9CAA]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full mt-[24px]">
            <button className="w-full bg-[#029FAE] py-[17px] max-md:py-[15px] text-white rounded-[8px] font-semibold flex items-center justify-center gap-[12px] hover:bg-[#027c82]">
              {loading ? (
                <TailSpin
                  height={24}
                  width={24}
                  color="#fff"
                  strokeWidth={3}
                  ariaLabel="loading"
                />
              ) : (
                <>
                  Send <FiArrowRight />
                </>
              )}
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

export default ForgotPassword;
