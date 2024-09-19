import React, { useState } from "react";
import Button from "../components/Button";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../utils/apiRequests";

const Login = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminLogin(admin)
      .then((res) => {
        if (res.data.status === 1) {
          sessionStorage.setItem(
            "data",
            JSON.stringify({
              token: res.data.token,
              username: res.data.data.username,
            })
          );
          navigate("/dashboard");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="wrapper flex">
        <div className="login-form flex">
          <h1>Login</h1>
          <form style={{ padding: "0.8rem" }} onSubmit={handleSubmit}>
            <div className="input-field flex">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                required
                value={admin.username}
                onChange={changeHandler}
              />
            </div>
            <div className="input-field flex">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                required
                value={admin.password}
                onChange={changeHandler}
              />
            </div>

            <Button styles={{ float: "right" }} name={"Login"} />
          </form>
          <a href="/register">Not an admin? Register!!</a>
        </div>
      </div>
    </>
  );
};

export default Login;
