import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const data = JSON.parse(sessionStorage.getItem("data"));
  return (
    <>
      <header>
        <nav>
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            {" "}
            ☰{" "}
          </label>
          <h4 className="welcome">
            {data?.username ? `Welcome: ${data.username}` : "Logo"}
          </h4>
          <ul>
            <li>
              <Link to="/dashboard" className="link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/employees-list" className="link">
                Employee List
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
