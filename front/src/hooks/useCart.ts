
import React from "react";
import AppContext from "../context";

export const useCart = () => {
  const { cartItems, setCartItem } = React.useContext(AppContext);

  const totalPrice = React.useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const totalQuantity = React.useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

 const getQuantityBySneakerId = React.useCallback(
    (id: string): number => {
      const item = cartItems.find((item) => item.sneaker.id === id);
      return item?.quantity ?? 0;
    },
    [cartItems]
  );

  const getTotalPriceBySneakerId = React.useCallback(
    (id: string): number => {
      const item = cartItems.find((item) => item.sneaker.id === id);
      return item ? item.price * item.quantity : 0;
    },
    [cartItems]
  );

  return {
    totalPrice,
    totalQuantity,
    cartItems,
    setCartItem,
    getQuantityBySneakerId,
    getTotalPriceBySneakerId,
  };
};

