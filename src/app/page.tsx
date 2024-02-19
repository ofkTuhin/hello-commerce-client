"use client";
import { useCartContext } from "@/context/cartContext";
import useBackendApi from "@/hook/useFetcheData";
import Cart from "@/layouts/ui/Cart";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";

const Home = () => {
  const { dispatch } = useCartContext() || {};
  const { data: products, loading, error } = useBackendApi();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleAddToCart = async (product: Product) => {
    const res = await axios.post(
      "https://hello-commerce-server.vercel.app/api/v1/cart",
      {
        user_id: "user",
        product: product._id,
        quantity: 1,
      },
    );
    if (res.status === 200) {
      dispatch!({
        type: "ADD_CART",
        payload: { ...product, quantity: 1 },
      });
    }
  };
  return (
    <>
      <section className="section pt-14">
        <div className="container mx-auto p-4">
          <div className="row">
            <div className="col-8">
              <div className="row">
                {products?.map((product: Product) => (
                  <div
                    key={product.id}
                    className="lg:col-4 md:col-2  col-12 p-4 "
                  >
                    <div className="shadow-lg rounded-md p-4">
                      <Image
                        src={product.image}
                        alt={product.title}
                        height={200}
                        width={100}
                        objectFit="cover"
                        className="w-full mb-2 h-60 rounded-md"
                        blurDataURL={product.image}
                        loading="lazy"
                      />
                      <h2 className="text-lg font-semibold">{product.title}</h2>
                      <p className="text-gray-600">Price: ${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary block rounded mt-2"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Cart />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

{
  /* <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-600">Brand: {product.brand}</p>
          <p className="text-gray-600">Color: {product.color}</p>
          <p className="text-gray-600">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p> */
}
