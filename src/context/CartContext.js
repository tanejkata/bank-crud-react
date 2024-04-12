import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useApp } from "./AppContext";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { showNotification } = useApp();

  const addItemToCart = (newitem) => {
    const index = cartItems.findIndex((item) => item.item._id === newitem._id);
    if (index === -1) {
      setCartItems([...cartItems, { item: newitem, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.item._id !== itemId);
    setCartItems(updatedCart);
  };

  const updateItemFromCart = (itemId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.item._id === itemId ? { item: item.item, quantity: quantity } : item
    );
    const index = cartItems.findIndex((item) => item.item._id === itemId);
    cartItems[index].quantity = quantity;
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.item.price * item.quantity, 0)
      .toFixed(2);
  };

  const checkout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/order/create",
        cartItems,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 900);
        showNotification("Order created successfully", "success");
      }
    } catch (err) {
      showNotification(err?.response?.data, "warning", 1500);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        getCartTotal,
        updateItemFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
