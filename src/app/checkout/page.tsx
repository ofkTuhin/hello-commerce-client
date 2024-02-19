"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { useCartContext } from "@/context/cartContext";
import useAuth from "@/hook/useAuth";
import { Axios } from "@/lib/axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
const Checkout = () => {
  const { user } = useAuth();
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
