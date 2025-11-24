import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiPlus, FiMinus, FiTrash } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Navigation from "../components/Navigation";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getItemTotal,
    setQuantity,
    clearCart,
  } = useCart();
  const location = useLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const navigate = useNavigate();

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((index) => index !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const selectedCount = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.quantity, 0);

  const selectedTotal = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + getItemTotal(item), 0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedId = params.get("selected");
    if (selectedId) {
      const NumberId = parseInt(selectedId, 10);
      if (cartItems.some((item) => item.id === NumberId)) {
        setSelectedItems([NumberId]);
      }
    }
  });

  return (
    <div className="w-full min-h-screen flex flex-col">
      <header className="w-full border-b border-b-[#e1e3e6]">
        <Navigation data={{}} />
      </header>
      <div className="w-full px-4 xl:px-0 max-w-[1320px] my-4 lg:my-6 mx-auto py-6 grid grid-cols-1 lg:grid-cols-10 gap-0 lg:gap-8 flex-grow">
        <div className="col-span-10 xl:col-span-7 bg-white    ">
          <div className="grid grid-cols-12 lg:!h-[55px] px-4 max-sm:px-0 lg:px-5 font-semibold text-[#272343]  py-2 lg:text-lg items-center">
            <div className="col-span-5 max-sm:col-span-12 flex items-center justify-between py-3 px-4 ">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-[#029FAE] cursor-pointer"
                  onChange={handleSelectAll}
                  checked={
                    selectedItems.length === cartItems.length &&
                    cartItems.length > 0
                  }
                />
                <span className="text-lg font-semibold text-gray-700">
                  Products
                </span>
              </div>

              <button
                onClick={clearCart}
                className="hidden max-sm:flex px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow transition"
              >
                Clear All
              </button>
            </div>

            <span className="col-span-2 text-center items-center justify-center hidden md:flex">
              Price
            </span>
            <span className="col-span-2 text-center items-center justify-center hidden md:flex">
              Quantity
            </span>
            <span className="col-span-2 text-center items-center justify-center hidden md:flex">
              Total
            </span>
            <span className="col-span-1 text-center items-center justify-center hidden md:flex">
              Action
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="px-3 sm:px-4 my-2 sm:my-3 md:my-6 lg:my-5"
              >
                <div className="grid grid-cols-12 items-center  py-3 sm:py-4 text-xs sm:text-sm md:text-base gap-2 sm:gap-4">
                  <div className="col-span-12  md:col-span-5 flex md:items-center gap-3 sm:gap-5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#029FAE] self-center"
                      onChange={() => toggleSelectItem(item.id)}
                      checked={selectedItems.includes(item.id)}
                    />

                    <img
                      src={item.image || "null"}
                      alt={item.name}
                      className="w-18 h-18 md:w-20 md:h-20 object-cover rounded-md self-center"
                    />

                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-[#272343] text-sm sm:text-base md:text-lg line-clamp-2 break-words flex-1">
                          {item.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-1 md:hidden gap-2">
                        <p className="text-[11px] sm:text-sm text-[#9A9CAA] whitespace-nowrap">
                          {item.category || "Uncategorized"}
                        </p>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                if (item.quantity === 1)
                                  setConfirmDeleteId(item.id);
                                else {
                                  decreaseQuantity(item.id);
                                  setInputValues((prev) => ({
                                    ...prev,
                                    [item.id]: Math.max(
                                      1,
                                      parseInt(
                                        inputValues[item.id] ?? item.quantity,
                                        10
                                      ) - 1
                                    ).toString(),
                                  }));
                                }
                              }}
                              className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-100 flex justify-center items-center"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>

                            <input
                              type="number"
                              min={1}
                              value={inputValues[item.id] ?? item.quantity}
                              onChange={(e) =>
                                setInputValues((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value.replace(/\D/, ""),
                                }))
                              }
                              onBlur={() => {
                                const qty = parseInt(inputValues[item.id], 10);
                                setQuantity(
                                  item.id,
                                  qty > 0 ? qty : item.quantity
                                );
                              }}
                              className="w-10 h-6 text-center border border-gray-200 rounded text-xs"
                            />

                            <button
                              onClick={() => {
                                increaseQuantity(item.id);
                                setInputValues((prev) => ({
                                  ...prev,
                                  [item.id]: (
                                    parseInt(
                                      inputValues[item.id] ?? item.quantity,
                                      10
                                    ) + 1
                                  ).toString(),
                                }));
                              }}
                              className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-100 flex justify-center items-center"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => setConfirmDeleteId(item.id)}
                            className="ml-3 flex items-center justify-center flex-shrink-0 w-7 h-7 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 lg:hidden"
                          >
                            <FiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <span className=" text-sm font-semibold text-[#272343] md:hidden">
                          ${parseFloat(item.price.replace("$", "")).toFixed(2)}
                        </span>
                        {item.oldPrice && (
                          <span className="text-[#9A9CAA] line-through text-xs md:hidden">
                            $
                            {parseFloat(item.oldPrice.replace("$", "")).toFixed(
                              2
                            )}
                          </span>
                        )}
                      </div>

                      <div className="hidden md:flex flex-col mt-1">
                        <p className="text-sm text-[#9A9CAA]">
                          {item.category || "Uncategorized"}
                        </p>
                        <div className="flex flex-col mt-1 md:hidden">
                          <span className="text-base font-semibold text-[#272343]">
                            $
                            {parseFloat(item.price.replace("$", "")).toFixed(2)}
                          </span>
                          {item.oldPrice && (
                            <span className="text-[#9A9CAA] line-through text-sm">
                              $
                              {parseFloat(
                                item.oldPrice.replace("$", "")
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 md:col-span-2 text-center flex flex-col justify-center mt-2 sm:mt-0">
                    <span className="text-sm sm:text-base hidden md:inline font-semibold text-[#272343] whitespace-nowrap">
                      ${parseFloat(item.price.replace("$", "")).toFixed(2)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-[#9A9CAA] hidden md:inline line-through text-xs sm:text-sm mt-1">
                        ${parseFloat(item.oldPrice.replace("$", "")).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-5 md:col-span-2 hidden md:flex items-center gap-2 mt-2 sm:mt-0 justify-self-end w-full max-w-fit ml-auto">
                    <button
                      onClick={() => {
                        if (item.quantity === 1) setConfirmDeleteId(item.id);
                        else {
                          decreaseQuantity(item.id);
                          setInputValues((prev) => ({
                            ...prev,
                            [item.id]: Math.max(
                              1,
                              parseInt(
                                inputValues[item.id] ?? item.quantity,
                                10
                              ) - 1
                            ).toString(),
                          }));
                        }
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-8 lg:h-8 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <FiMinus className="mx-auto" />
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={inputValues[item.id] ?? item.quantity}
                      onChange={(e) =>
                        setInputValues((prev) => ({
                          ...prev,
                          [item.id]: e.target.value.replace(/\D/, ""),
                        }))
                      }
                      onBlur={() => {
                        const qty = parseInt(inputValues[item.id], 10);
                        setQuantity(item.id, qty > 0 ? qty : item.quantity);
                      }}
                      className="w-12 sm:w-16 h-8 text-center border border-gray-200 rounded px-1 sm:px-2 py-1 text-sm sm:text-base md:text-lg"
                    />

                    <button
                      onClick={() => {
                        increaseQuantity(item.id);
                        setInputValues((prev) => ({
                          ...prev,
                          [item.id]: (
                            parseInt(
                              inputValues[item.id] ?? item.quantity,
                              10
                            ) + 1
                          ).toString(),
                        }));
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-7 md:h-7 lg:w-8 lg:h-8 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      <FiPlus className="mx-auto" />
                    </button>
                  </div>

                  <div className="col-span-6 sm:col-span-6 md:col-span-2 text-center mt-2 sm:mt-0">
                    <span className="font-semibold hidden md:inline text-[#272343] text-sm sm:text-base">
                      ${getItemTotal(item).toFixed(2)}
                    </span>
                  </div>

                  <div className="col-span-6 sm:col-span-6 md:col-span-1 justify-center mt-3 sm:mt-0 hidden md:flex">
                    <button
                      onClick={() => setConfirmDeleteId(item.id)}
                      className="flex items-center justify-center w-full sm:w-auto px-3 py-2 sm:py-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 text-sm sm:text-base md:text-lg"
                    >
                      <FiTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="flex justify-between my-5 lg:my-6 mx-5">
              <button
                onClick={() => navigate("/")}
                className="flex  items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[#272343] font-medium transition-shadow "
              >
                <FaArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="flex max-sm:hidden px-4 py-2  bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <div className="col-span-10 xl:col-span-3 bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-[#272343] mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-[#272343] mb-2">
            <span>Selected items:</span>
            <span>{selectedCount}</span>
          </div>
          <div className="flex justify-between text-[#272343] mb-2">
            <span>Subtotal:</span>
            <span>${selectedTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#272343] mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="border text-[#272343] borrder-t borber-gray-300 my-3"></div>
          <div className="flex justify-between text-[#272343] mb-2">
            <span>Total:</span>
            <span>${selectedTotal.toFixed(2)}</span>
          </div>
          <button
            disabled={selectedItems.length === 0}
            className={`mt-6 w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
              selectedItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#029FAE] hover:bg-[#028c99]"
            }`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <footer className="w-full border-t border-b border-[#e9eaec] bg-white">
        <div className="max-w-[1320px] w-full mx-auto px-4 xl:px-0">
          <Footer />
        </div>
        <section className="flex-1 border-t border-[#e9eaec] w-full mx-auto px-4 sm:px-0">
          <div className="max-w-[1320px] w-full mx-auto px-4 xl:px-0">
            <Copyright />
          </div>
        </section>
      </footer>

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-[90%] sm:w-[400px]">
            <h2>Are you sure you want to delete this product from the cart?</h2>
            <div className="flex justify-center gap-4 my-4">
              <button
                onClick={() => {
                  removeFromCart(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
