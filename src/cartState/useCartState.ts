/* eslint-disable react-hooks/rules-of-hooks */
import { Product } from "@/types";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const initialState: Product[] = [];

const todoState = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const handleAddToCart = async () => {
      const res = await axios.get(
        "https://hello-commerce-server.vercel.app/api/v1/cart",
      );
      console.log(res);
      const data: Product[] = res.data.result.map((data: any) => {
        return {
          ...data.product,
          quantity: data.quantity,
        };
      });

      console.log({ data, res });
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
