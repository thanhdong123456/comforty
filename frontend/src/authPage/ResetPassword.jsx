import React, { useState } from "react";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Navigation from "../components/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronRight, FiEye, FiEyeOff } from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: password }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setSuccess("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
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
            <span>Reset Password</span>
          </div>
          <div className="px-4 mt-[12px]">
            <h3 className="text-[24px] max-lg:text-[22px] max-md:text-[18px] font-semibold leading-[110%] ">
              Reset Password
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
            Reset Password
          </h3>
          <div className="flex flex-col justify-between space-y-[16px] mt-[24px]">
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
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full h-[50px] bg-[#f5f6f7] px-[20px] rounded-[8px]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 mr-[20px] cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#029FAE] hover:bg-[#027c82] text-white p-3 rounded-md font-semibold flex justify-center"
            >
              {loading ? (
                <TailSpin
                  height={24}
                  width={24}
                  color="#fff"
                  strokeWidth={3}
                  ariaLabel="loading"
                />
              ) : (
                <>Reset Password</>
              )}
            </button>
          </div>
          <div className="w-full mt-[24px]">
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

export default ResetPassword;
