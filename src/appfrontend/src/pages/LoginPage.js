import { useState } from "react";

import "./loginpage.css";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import { userLogin } from "../api/ApiService";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    userLogin(values)
      .then((response) => {
        if (response.status === 200) {
          setValues({
            userName: "",
            password: "",
          });
          alert("Login Success");
          localStorage.setItem("USER_KEY", response.data.token);
          localStorage.setItem("USER_ID", response.data.id);
          navigate("/dashBoard");
        } else {
          alert("Bad Credentials");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 403:
              console.log("403 status");
              alert("Authentication Failed Bad Credentials");

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
                  <h4 className="card-title">Sign In</h4>

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
                      <label>
                        Password
                        <Link
                          onClick={() => props.setClick("Forgot")}
                          to="/"
                          className="float-right"
                        >
                          Forgot Password?
                        </Link>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        minLength={8}
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        required
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                      <div style={{ "padding-top": "20px" }}>
                        <Link to="/">
                          <button
                            onClick={() => props.setClick("Register")}
                            type="submit"
                            className="btn btn-primary"
                          >
                            SignUp
                          </button>
                        </Link>
                      </div>
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
};

export default LoginPage;
