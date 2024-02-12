import { Product } from "@/types";

export type Action =
  | { type: "FETCH_CART"; payload: Product[] }
  | { type: "ADD_CART"; payload: Product }
  | { type: "DELETE_CART"; payload: string }
  | { type: "EDIT_CART"; payload: Product }
  | { type: "UPDATE_QUANTITY"; payload: Partial<Product> }
  | { type: "FILTER_CART_PROGRESS"; payload: string };
