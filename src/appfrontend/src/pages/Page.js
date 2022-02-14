import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import LoginPage from "./LoginPage";
import Register from "./Register";

function Page() {
  const [click, setClick] = useState("Login");
  return (
    <div>
      {click === "Login" && <LoginPage setClick={setClick} />}
      {click === "Register" && <Register setClick={setClick} />}
      {click === "Forgot" && <ForgotPassword setClick={setClick} />}
    </div>
  );
}

export default Page;
