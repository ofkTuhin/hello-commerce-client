export interface Product {
  _id: string;
  id: string;
  image: string;
  title: string;
  price: number;
  size: "XL" | "L" | "M";
  quantity: number;
}
