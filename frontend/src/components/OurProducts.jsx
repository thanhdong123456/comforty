import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const OurProducts = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [liked, setLiked] = useState({});
  const [activePath, setActivePath] = useState(location.pathname);
  const { addToCart } = useCart();

  const products = data?.productsList || data?.items || data?.products || [];
  const hasData = products.length > 0;

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const toggleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (item) => {
    const res = addToCart(item);
    if (res) {
      toast.success(`${item.name} đã được thêm vào giỏ hàng!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const tabs = [
    { text: "All", path: "/" },
    { text: "Newest", path: "/newest" },
    { text: "Trending", path: "/trending" },
    { text: "Best Sellers", path: "/best-sellers" },
    { text: "Featured", path: "/featured" },
  ];

  return (
    <section className="relative lg:max-h-[919px] lg:mt-20 lg:mb-20">
      <div className="flex items-center justify-center lg:mb-4 mb-0 mt-20 lg:mt-0">
        <h3 className="text-[20px] xs:text-[24px] sm:text-[24px] lg:text-[32px] font-semibold text-[#272343] leading-[110%]">
          Our Products
        </h3>
      </div>

      <div className="h-[34px] flex items-center justify-center mx-auto my-[40px] xs:mt-0">
        <div className="font-medium flex flex-wrap justify-center text-[14px] lg:text-[16px] gap-3 sm:gap-5 tracking-[0.05em] text-[#9A9CAA] text-center">
          {tabs.map(({ text, path }) => (
            <button
              key={path}
              onClick={() => {
                navigate(path);
                setActivePath(path);
              }}
              className={`relative pb-1 uppercase transition-all duration-300 hover:text-[#272343] ${
                activePath === path
                  ? "text-[#272343] after:content-[''] after:absolute after:left-0 after:-bottom-[3px] after:w-full after:h-[2px] after:bg-teal-600"
                  : ""
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {hasData ? (
        <div className="max-h-[800px] overflow-y-auto hide-scrollbar px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-8">
            {products.map((item) => (
              <div
                onClick={() => {
                  navigate(`/products/${item.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                key={item.id}
                className="group overflow-hidden transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[312px] rounded-[6px] overflow-hidden">
                  <img
                    src={item.image || "/fallback-product.jpg"}
                    alt={item.name || "Product"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {item.status && (
                    <span
                      className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-white text-[11px] sm:text-[13px] font-semibold px-2 sm:px-3 py-[2px] sm:py-1 rounded-sm shadow-md ${
                        item.status === "Sale"
                          ? "bg-[#F5813F]"
                          : item.status === "New"
                          ? "bg-[#01ad5a]"
                          : "bg-[#029FAE]"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-3 right-3 sm:top-4 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-sm bg-white/90 hover:bg-red-50 shadow-md transition-all duration-300"
                  >
                    {liked[item.id] ? (
                      <AiFillHeart className="text-red-500 text-[16px] sm:text-[18px]" />
                    ) : (
                      <AiOutlineHeart className="text-gray-600 hover:text-red-500 text-[16px] sm:text-[18px]" />
                    )}
                  </button>
                </div>

                <div className="sm:py-4 lg:py-0 lg:mt-[14px] mt-4 xs:mt-10 md:mt-0">
                  <span className="font-normal text-[14px] sm:text-[16px] leading-[130%] text-[#272343] block truncate group-hover:text-[#029FAE] transition-colors duration-300">
                    {item.name || "Sản phẩm chưa có tên"}
                  </span>

                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-[16px] sm:text-[18px] text-[#272343]">
                        {item.price || "Liên hệ"}
                      </span>
                      {item.oldPrice && (
                        <span className="text-xs sm:text-sm text-[#9A9CAA] line-through">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                      className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-md bg-gray-100 text-[#272343] transition-all duration-300 group-hover:bg-[#029FAE] group-hover:text-white -translate-y-[20%] sm:-translate-y-[30%]"
                    >
                      <FiShoppingCart className="text-[16px] sm:text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full text-center text-gray-500 text-sm sm:text-base md:text-lg font-medium py-10 sm:py-16 md:py-20 px-4">
          No product data to display.
        </div>
      )}
    </section>
  );
};

export default OurProducts;
