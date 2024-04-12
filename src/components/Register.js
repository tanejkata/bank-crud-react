import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/register",
        formData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Redirect to dashboard or home page after successful login
        window.location.href = "/dashboard";
      }
    } catch (err) {}
  };
  return (
    <div className="row d-flex justify-content-center align-items-center mt-4">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white">
          <div className="card-body p-5 text-center">
            <div className="mb-md-5 mt-md-4 pb-5">
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">
                Please fill in the following information to create an account.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    id="fullName"
                    className="form-control form-control-lg"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="email"
                    id="signupEmail"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-outline-light btn-lg px-5 mt-3"
                  type="submit"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div>
              <p className="mb-0">
                ALready have an account?{" "}
                <Link className="text-white-50 fw-bold" to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
