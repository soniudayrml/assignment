import React, { useState } from "react";
import "./loginpage.css";

import { userRegisteration } from "../api/ApiService";

const Register = (props) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
    secretCode: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    userRegisteration(values)
      .then((response) => {
        if (response.status === 200) {
          alert("Registered Successfully");
          setValues({ userName: "", password: "", secretCode: "" });
          props.setClick("Login");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) alert(err.response.data);
        else alert("Something went wrong");
      });
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login-page">
      <div className="card fat">
        <div className="card-body">
          <h4 className="card-title">Sign Up</h4>
          <form
            className="my-login-validation"
            onSubmit={handleSubmit}
            noValidate={false}
          >
            <div className="form-group">
              <label htmlFor="email">Email : </label>
              <input
                id="username"
                type="email"
                value={values.userName}
                onChange={handleChange}
                name="userName"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password : </label>
              <input
                id="password"
                type="password"
                minLength={5}
                value={values.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Secret : </label>
              <input
                id="secret"
                type="text"
                minLength={4}
                value={values.secretCode}
                onChange={handleChange}
                name="secretCode"
                required
              />
            </div>
            <div className="form-group m-0">
              <button                
                type="submit"
                className="btn btn-primary"
              >
                Sign Up
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Register;
