import { Product } from "@/types";

import { Action } from "./actions";

export const cartReducer = (state: Product[], action: Action): Product[] => {
  switch (action.type) {
    case "FETCH_CART":
      return action.payload;
    case "ADD_CART":
      return [...state, action.payload];
    case "UPDATE_QUANTITY":
      return state.map((item: Product) => {
        return {
          ...item,
          quantity:
            action.payload.id === item._id
              ? action.payload.quantity!
              : item.quantity,
        };
      });

    case "DELETE_CART":
      return state.filter((cart) => cart._id !== action.payload);

    default:
      return state;
  }
};
