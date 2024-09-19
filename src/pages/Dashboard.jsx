import React from "react";
import NavBar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Breadcrumbs />
      <div style={{ textAlign: "center", marginBlock: "2rem" }}>Welcome to Admin Panel</div>
    </>
  );
};

export default Dashboard;
