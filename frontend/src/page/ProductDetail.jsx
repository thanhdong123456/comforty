import React, { useEffect, useState, useRef } from "react";
import Navigation from "../components/Navigation";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import ProductsSlider from "../common/ProductsSlider";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import {
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiShoppingCart,
} from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { categories, featuredProducts } from "../../../database/data/siteData";
import ReactStars from "react-rating-stars-component";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = featuredProducts.items.find((item) => item.id === Number(id));
  const { addToCart, setQuantity } = useCart();
  const [inputValues, setInputValues] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const location = useLocation();

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please log in to continue shopping!");
      return;
    }
    addToCart(product);
    navigate(`/cart?selected=${product.id}`);
  };

  useEffect(() => {
    if (product) {
      setInputValues((prev) => ({
        ...prev,
        [product.id]: prev[product.id] ?? 1,
      }));
    }
  }, [product]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromQuery = params.get("category");

    if (categoryFromQuery) {
      const key = categoryFromQuery.toLowerCase();
      if (categories[key]) {
        setSelectedCategoryId(categories[key].id);
      }
    }
  }, [location.search]);

  const category = Object.values(categories).find(
    (cate) => cate.id === product?.categoryId
  );
  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please log in to continue shopping!");
      return;
    }
    const quantityToAdd =
      parseInt(inputValues[product.id] ?? product.quantity, 10) || 1;
    addToCart(product, quantityToAdd);
    toast.success("Thêm vào giỏ hàng thành công");
  };

  const relatedProducts = featuredProducts.items.filter(
    (item) => item.categoryId === product?.categoryId && item.id !== product.id
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const hasData =
    relatedProducts &&
    (relatedProducts.items?.length > 0 || relatedProducts.length > 0);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full border-b border-b-[#e1e3e6]">
        <Navigation data={{}} />
      </header>

      <div className="w-full py-[40px] max-lg:py-4 ">
        <div className="max-w-[1320px] mx-auto flex flex-col items-start gap-[60px] max-sm:gap-[20px] px-4">
          <div className=" bg-[#e1e3e6] text-[#636270] px-[16px] py-[12px] w-full rounded-[6px] flex items-center justify-start gap-[12px] text-[18px] max-lg:text-[16px] ">
            <span
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            >
              Comforty
            </span>
            <FiChevronRight />
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/products?category=${category.name}`)}
            >
              {category.name}
            </span>
            <FiChevronRight />
            <span>{product.name}</span>
          </div>
          <div className="flex max-sm:flex-col gap-[50px] max-md:gap-[40px] ">
            <div className="w-[50%] max-sm:w-full flex justify-start">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-md"
              />
            </div>
            <div className="w-[50%] max-sm:w-full flex flex-col">
              <div className="pb-[20px] ">
                <h2 className="text-[40px] max-lg:text-[30px] max-md:text-[28px] font-semibold">
                  {product.name}
                </h2>
                <div className="flex items-center  gap-[10px]">
                  <div className="-translate-y-[1px] max-sm:-translate-y-[2px]">
                    <ReactStars
                      count={5}
                      value={product.rating}
                      size={22}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                      char="★"
                    />
                  </div>
                  <span className="text-md max-lg:text-sm text-[#636270]">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex gap-[18px] items-center my-[22px] max-xl:mt-[8px]">
                  <div className="flex gap-[4px]">
                    <span className="font-semibold text-[40px] max-xl:text-[36px] max-lg:text-[30px] text-[#272343]">
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-[24px] translate-y-[6px] max-md:translate-y-[4px]  max-md:text-[20px]  font-normal text-[#9A9CAA] line-through">
                        {product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="border py-[4px] px-[12px] rounded-md bg-[#029FAE] text-white">
                    <span className="text-[26px] max-md:text-[22px] font-normal">
                      -{product.discount}%
                    </span>
                  </div>
                </div>
                <div className="my-[30px] max-md:my-[26px] max-sm:my-[22px] flex flex-col text-[#272343]  ">
                  <p className="text-[18px] max-md:text-[16px] leading-[150%]">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-1  items-center gap-[12px] my-[30px]">
                  <span className="text-[#272343] text-[18px] max-md:text-[16px]  ">
                    Quantity:{" "}
                  </span>
                  <div className="flex items-center gap-[6px]">
                    <button
                      onClick={() => {
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: Math.max(
                            1,
                            parseInt(
                              inputValues[product.id] ?? product.quantity,
                              10
                            ) - 1
                          ).toString(),
                        }));
                      }}
                      className="w-8 h-8  border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <FiMinus className="mx-auto" />
                    </button>

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={inputValues[product.id] ?? product.quantity}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: value,
                        }));
                      }}
                      onBlur={() => {
                        const qty = parseInt(inputValues[product.id], 10);
                        setQuantity(
                          product.id,
                          qty > 0 ? qty : product.quantity
                        );
                      }}
                      className="h-8 w-16 text-center border border-gray-200 rounded  px-2 max-sm:px-1 py-1 text-[18px] max-lg:text-[16px] max-md:text-[14px]"
                    />

                    <button
                      onClick={() => {
                        setInputValues((prev) => ({
                          ...prev,
                          [product.id]: (
                            parseInt(
                              inputValues[product.id] ?? product.quantity,
                              10
                            ) + 1
                          ).toString(),
                        }));
                      }}
                      className="w-8 h-8  border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <FiPlus className="mx-auto" />
                    </button>
                  </div>
                </div>
                <div className="flex max-sm:flex-1 items-center gap-[16px]  ">
                  <button
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                    className="text-white max-sm:w-full bg-[#029FAE] border-none  py-[10px] px-[12px] rounded-md"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="text-[#029FAE] max-sm:w-full border py-[10px] px-[12px] rounded-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="max-w-[1320px] mx-auto py-6 max-md:py-4">
              <div className="flex items-center justify-between mb-[40px] max-md:mb-[30px] max-sm:mb-[20px]">
                <h3 className="text-[28px] max-lg:text-[22px] max-sm:text-[18px]  font-semibold text-[#272343]">
                  Products related to {category.name}
                </h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    ref={prevRef}
                    className="w-11 h-11 max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition-all duration-300"
                  >
                    <FaArrowLeftLong className="text-[14px] sm:text-[16px]" />
                  </button>
                  <button
                    ref={nextRef}
                    className="w-8 h-8 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-teal-500 hover:text-white transition-all duration-300"
                  >
                    <FaArrowRightLong className="text-[14px] sm:text-[16px]" />
                  </button>
                </div>
              </div>
              <div>
                {hasData ? (
                  <ProductsSlider
                    products={relatedProducts.items || relatedProducts}
                    prevRef={prevRef}
                    nextRef={nextRef}
                    extraMt={48}
                    disableTitleMt={true}
                  />
                ) : (
                  <div className="w-full text-center text-gray-500 text-sm sm:text-base md:text-lg font-medium py-10 sm:py-16 md:py-20 px-4">
                    No featured product data available to display.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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

export default ProductDetail;
