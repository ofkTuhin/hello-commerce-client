import React, { createContext, useContext } from "react";
import cartState from "../cartState/useCartState";

type CartContextType = ReturnType<typeof cartState>;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { cart, dispatch } = cartState();
  const state = {
    cart,
    dispatch,
  };

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const cart = useContext(CartContext);

  return cart;
};
