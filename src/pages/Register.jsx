import React, { useState } from "react";
import Button from "../components/Button";
import "./login.css";
import { adminRegister } from "../utils/apiRequests";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({ username: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adminRegister(admin)
      .then((res) => {
        if (res.data.status === 1) {
          alert("Registered Successfully");
          navigate("/");
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <div className="wrapper flex">
        <div className="login-form flex">
          <h1>Register</h1>
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

            <Button styles={{ float: "right" }} name={"Register"} />
          </form>
          <a href="/">Registered Already? Go to Login!!</a>
        </div>
      </div>
    </>
  );
};

export default Register;
