import Register from "@/partials/RegistationForm";

const Signup = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row justify-center">
          <div className="col-12 md:col-5">
            <div className="px-6 py-4 shadow-md border-sm">
              <h2 className="text-2xl font-semibold mb-4">Register</h2>
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
