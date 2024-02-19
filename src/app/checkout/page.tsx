"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { useCartContext } from "@/context/cartContext";
import useAuth from "@/hook/useAuth";
import { Axios } from "@/lib/axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51MbbiGK3RZZOQUDyUZ1d2gykge07mITkbVF0iRh562tKlCjuQqeUmkNtWtmVgLfAsU0jKWQzIZhJ5EbGbvwUNEkT009qHJz7lC",
);
const Checkout = () => {
  const { user } = useAuth();
  console.log(user);
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useCartContext() || {};
  const totalPay = useMemo(() => {
    return cart?.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  }, [cart]);

  useEffect(() => {
    const fetchSecret = async () => {
      const res = await Axios.post("stripe/payment-intent", {
        total: totalPay,
      });
      setClientSecret(res.data.clientSecret);
    };
    if (cart?.length) {
      fetchSecret();
    }
  }, [totalPay, cart?.length]);
  return (
    <section className="pt-4">
      <div className="container">
        <div className="row justify-center">
          <div className="col-6">
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
