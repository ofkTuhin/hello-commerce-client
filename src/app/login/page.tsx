/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import LoginForm from "@/partials/LoginForm";
import Link from "next/link";

const Login = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 md:col-5">
            <div className="px-6 py-4 shadow-md border-sm">
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <LoginForm />
              <p className="mt-2">
                Don't have an account?{" "}
                <Link href="/signup" className="font-bold">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
