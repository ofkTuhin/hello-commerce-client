import Link from "next/link";

const Thanks = () => {
  return (
    <section className="pt-4">
      <div className="container">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center max-w-md w-full bg-white p-8 rounded shadow-md">
            <h1 className="text-3xl mb-4 text-center">
              Thank you for your payment!
            </h1>
            <p className="text-lg mb-4 text-center">
              Your payment was successful.
            </p>
            <Link href="/" className="btn btn-primary">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Thanks;
