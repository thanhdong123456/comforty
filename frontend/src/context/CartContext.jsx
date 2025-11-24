import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children, isFallback }) => {
  const { user } = useAuth();
  const getCartKey = () => {
    return user ? `cartItems_${user.id}` : "cartItems_guest";
  };

  const [cartItems, setCartItems] = useState(() => {
    try {
      if (!user) return [];
      const stored = localStorage.getItem(`cartItems_${user.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (user && !isFallback) {
      const stored = localStorage.getItem(`cartItems_${user.id}`);
      setCartItems(stored ? JSON.parse(stored) : []);
    } else {
      setCartItems([]);
    }
  }, [user, isFallback]);

  useEffect(() => {
    if (user && !isFallback) {
      try {
        localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(cartItems));
      } catch {}
    }
  }, [cartItems, user, isFallback]);

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      toast.error("Please login to purchase");

      return false;
    }
    if (!product || !product.id) return false;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });

    return true;
  };

  const removeFromCart = (id) => {
    if (!user) {
      toast.error("Please login to purchase");
      return;
    }
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (!user) return;
    setCartItems([]);
    toast.success("All items removed from your cart!");
  };

  const increaseQuantity = (id) => {
    if (!user) {
      toast.error("Please login to purchase");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    if (!user) {
      toast.error("Please login to purchase");
      return;
    }
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const setQuantity = (id, quantity) => {
    if (!user) {
      toast.error("Please login to purchase");
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  const getItemTotal = (item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("$", "")) || 0
        : item.price || 0;
    return price * item.quantity;
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + getItemTotal(item),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        getItemTotal,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
