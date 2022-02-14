import React from "react";
import { useState } from "react";
import { forgotPassword } from "../api/ApiService";

function ForgotPassword(props) {
  const [values, setValues] = useState({
    userName: "",
    secretCode: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    forgotPassword(values)
      .then((response) => {
        if (response.status === 200) {
          setValues({
            userName: "",
            secretCode: "",
          });
          alert(response.data);
          props.setClick("Login");
        } else {
          alert("Bad Credentials");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              alert("Bad Credentials");

              break;
            default:
              alert("Something Wrong!Please Try Again1");
          }
        } else {
          alert("Something Wrong!Please Try Again2");
        }
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
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Forgot Password</h4>

                  <form
                    className="my-login-validation"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <div className="form-group">
                      <label htmlFor="email">User Name</label>
                      <input
                        id="username"
                        type="email"
                        className="form-control"
                        value={values.userName}
                        onChange={handleChange}
                        name="userName"
                        required
                      />
                      <div className="invalid-feedback">UserId is invalid</div>
                    </div>
                    <div className="form-group">
                      <label>Secret</label>
                      <input
                        id="secretCode"
                        type="text"
                        className="form-control"
                        minLength={4}
                        value={values.secretCode}
                        onChange={handleChange}
                        name="secretCode"
                        required
                      />
                    </div>

                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    </div>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;
