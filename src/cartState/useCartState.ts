/* eslint-disable react-hooks/rules-of-hooks */
import { axiosPrivate } from "@/lib/axios";
import { Product } from "@/types";
import { useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const initialState: Product[] = [];

const todoState = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const handleAddToCart = async () => {
      const res = await axiosPrivate.get("cart");
      const data: Product[] = res.data.result.map((data: any) => {
        return {
          ...data.product,
          quantity: data.quantity,
        };
      });

      dispatch({
        type: "FETCH_CART",
        payload: data,
      });
    };
    handleAddToCart();
  }, []);

  return {
    cart: state,
    dispatch,
  };
};

export default todoState;
