import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

const Navigation = ({ data, isFallback }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();
  const cartRef = useRef(null);
  if (!data) return null;

  const isCartDisabled = isFallback;
  const displayCartItems = isCartDisabled ? [] : cartItems;
  const displayCartCount = isCartDisabled ? 0 : cartCount;

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="text-white w-full bg-[#272343]">
      <div className="w-full border-b border-gray-700">
        <div className="max-w-[1320px] mx-auto flex flex-wrap items-center justify-center md:justify-between py-2 px-4 text-xs md:text-sm text-gray-400">
          <p className="flex items-center gap-1">
            <img
              src="/icons/Check.png"
              alt="Check"
              className="w-4 h-4 object-contain"
            />
            Free Shipping on All Orders Over $50
          </p>

          <div className="hidden md:flex items-center gap-4 text-sm">
            <select className="bg-transparent text-gray-400 rounded px-2 py-1 hover:text-white transition">
              {data?.languages?.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <a
              href="#"
              className="hover:text-white transition flex items-center gap-1"
            >
              Faqs
            </a>
            <a
              href="/help"
              className="hover:text-white transition flex items-center gap-1"
            >
              <img
                src="/icons/Alert_circle.png"
                alt="Alert"
                className="w-4 h-4 object-contain"
              />
              Need Help?
            </a>
          </div>
        </div>
      </div>

      <div className="bg-[#f0f2f3] text-gray-800 w-full">
        <div className="max-w-[1320px] mx-auto flex flex-nowrap items-center justify-between gap-3 p-4 ">
          <img
            src="/icons/Logo.png"
            alt="Comforty Logo"
            className="w-[120px] sm:w-[166px] h-[40px] object-contain cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <div className="flex-1 hidden md:flex justify-center">
            <div className="relative w-full md:w-[300px] xl:w-[413px]">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full h-[44px] pl-4 pr-11 rounded-md border border-gray-300 bg-white text-[16px] text-[#9a9caa] placeholder:text-[#9a9caa] outline-none focus:border-[#029FAE] focus:ring-1 focus:ring-[#029FAE] transition-all"
              />
              <img
                src="/icons/Search.png"
                alt="Search"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px] object-contain opacity-70 cursor-pointer hover:opacity-100 transition"
              />
            </div>
          </div>

          <div className="relative flex gap-3" ref={cartRef}>
            <button
              onClick={() => {
                setShowCart(false);
                setTimeout(() => navigate("/cart"), 100);
              }}
              onMouseEnter={() => setShowCart(true)}
              onMouseLeave={() => setShowCart(false)}
              className="relative gap-2 flex items-center justify-center w-[110px] sm:w-[120px] h-[40px] bg-white border border-gray-300 rounded-md hover:text-[#007580] hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-2 text-black">
                <img
                  src="/icons/Cart.png"
                  className="w-[17px] h-[17px] object-cover"
                  alt="Cart"
                />
                <span className="text-[13px] font-medium text-[#272343] leading-[110%]">
                  Cart
                </span>
              </div>

              {displayCartCount > 0 && (
                <div className="bg-[#007580] text-white text-[11px] font-semibold w-5 h-5 flex items-center justify-center rounded-full leading-none">
                  {displayCartCount}
                </div>
              )}
            </button>
            <button className="w-[40px] flex items-center justify-center h-[40px] bg-white border border-gray-300 rounded-md hover:text-[#007580] transition">
              <img
                src="/icons/Heart.png"
                className="w-[22px] h-[22px] object-cover"
                alt="Heart"
              />
            </button>
            <button
              onClick={handleLogin}
              className="w-[40px] flex items-center justify-center h-[40px] bg-white border border-gray-300 rounded-md hover:text-[#007580] transition"
            >
              <img
                src="/icons/User.png"
                className="w-[22px] h-[22px] object-cover"
                alt="Login"
              />
            </button>
            <AnimatePresence>
              {showCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setShowCart(true)}
                  onMouseLeave={() => setShowCart(false)}
                  className="absolute right-0 top-full mt-3 w-[280px] sm:w-[320px] md:w-[360px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                >
                  <h4 className="text-lg font-semibold mb-3 text-[#272343]">
                    New products added
                  </h4>

                  {displayCartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-8">
                      <FiShoppingCart className="text-4xl mb-2 text-gray-400" />
                      <p className="text-sm font-medium">
                        {isFallback
                          ? "Your cart is empty."
                          : "Your cart is empty."}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="relative flex items-center justify-between border-b border-gray-100 pb-2 pr-7 group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-md object-cover flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-[#272343] truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-[#9a9caa]">
                                  x {item.quantity}
                                </p>
                              </div>
                            </div>
                            <span className="text-sm font-semibold text-[#272343] whitespace-nowrap">
                              $
                              {parseFloat(item.price.replace("$", "")).toFixed(
                                2
                              )}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end items-center mt-4">
                        <button
                          onClick={() => {
                            setShowCart(false);
                            navigate("/cart");
                          }}
                          className="bg-[#007580] text-white px-4 py-2 rounded-md text-sm hover:bg-[#029FAE] transition"
                        >
                          Checkout
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="bg-white text-gray-800 border-t border-gray-200 w-full">
        <div className="max-w-[1320px] mx-auto flex items-center justify-center max-lg:justify-between max-sm:justify-center relative px-6 py-6">
          <div className="flex flex-wrap justify-center gap-10 max-md:gap-6">
            {["Home", "Shop", "Products", "Pages", "About"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[16px] max-sm:text-[14px] text-[#636270] hover:text-[#007580] font-medium transition-colors duration-200"
                >
                  {item}
                </Link>
              )
            )}
          </div>

          <div className="absolute right-4 flex items-center gap-2 text-[13px]  text-[#555] max-sm:hidden ">
            <span className="font-normal text-[#636270]">Contact:</span>
            <span className="font-semibold text-[#272343]">
              {data?.contactNumber || "(000) 000-0000"}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
