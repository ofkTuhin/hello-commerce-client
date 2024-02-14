import { useCartContext } from "@/context/TodoContext";
import { Product } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useMemo } from "react";

const Cart = () => {
  const { cart, dispatch } = useCartContext() || {};
  const totalPay = useMemo(() => {
    return cart?.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  }, [cart]);

  const updateCart = async (id: string, quantity: number) => {
    try {
      const update = await axios.patch(
        `https://hello-commerce-server.vercel.app/api/v1/cart/${id}`,
        {
          quantity,
        },
      );
      console.log(update);
      if (update.status === 200) {
        dispatch!({
          type: "UPDATE_QUANTITY",
          payload: {
            id: id,
            quantity: quantity,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-4 relative">
      <div className="  px-4 ">
        <h4 className="text-xl text-center">Cart</h4>
        {cart?.length ? (
          <div>
            {cart.map((item: Product) => (
              <div key={item.title} className="mb-3">
                <div className="flex items-center">
                  <Image
                    width={100}
                    height={80}
                    src={item.image}
                    loading="lazy"
                    alt={item.title}
                    className="rounded-md h-20 w-24"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="mr-3">{item.title}</p>
                      <span>${item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <button className="px-2 py-1 rounded-sm mr-1 border border-border">
                          M
                        </button>
                        <button className="px-2 py-1 mr-2 ml-1 rounded-sm border border-border">
                          XL
                        </button>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateCart(item._id, item.quantity + 1)
                          }
                          className="w-5 flex items-center justify-center h-5 rounded-full  border border-primary"
                        >
                          +
                        </button>
                        <span className="mx-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateCart(item._id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                          className="w-5 h-5 flex items-center justify-center rounded-full  border border-primary"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-primary w-full mt-4">
              Checkout ${totalPay?.toFixed()}
            </button>
          </div>
        ) : (
          <p>There is now product Available on cart</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
