import useAuth from "@/hook/useAuth";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import FormInput from "./FormInput";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://hello-commerce-client.vercel.app/thanks",
      },
    });
    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
    }
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <FormInput label="Name" type="text" id="name" value={user?.name!} />
      <FormInput label="Email" type="text" id="email" value={user?.email!} />
      <PaymentElement />
      <button disabled={!stripe} className="btn btn-primary w-full mt-4">
        Checkout
      </button>
    </form>
  );
};

export default CheckoutForm;
