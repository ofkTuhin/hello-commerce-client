"use client";
import useBackendApi from "@/hook/useFetcheData";
import Image from "next/image";
import React, { useState } from "react";

// Define type for size options
type SizeOption = "S" | "M" | "L" | "XL";

const sizes = ["S", "M", "L", "XL"];

// Define interface for product
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  sizes: SizeOption[];
}

function CheckoutLayout() {
  const [selectedSize, setSelectedSize] = useState<SizeOption | "">("");
  // const [products, setProducts] = useState<Product[]>([]);

  // Fetch product data on component mount

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value as SizeOption);
  };

  const handleCheckout = () => {
    // Logic for finalizing the purchase
    console.log(`Size selected: ${selectedSize}`);
  };
  const {
    data: products,
    loading,
    error,
  } = useBackendApi("https://hello-commerce-server.vercel.app/v1/product");
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <Image
              src={product.image}
              alt={product.title}
              className="w-full mb-2"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <div>
              <label className="block text-sm font-bold mb-2" htmlFor="size">
                Select Size:
              </label>
              <select
                id="size"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                value={selectedSize}
                onChange={handleSizeChange}
              >
                <option value="">Select Size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleCheckout}
        disabled={!selectedSize}
      >
        Checkout
      </button>
    </div>
  );
}

export default CheckoutLayout;
