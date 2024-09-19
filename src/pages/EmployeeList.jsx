import React from "react";
import NavBar from "../components/Navbar";
import Table from "../components/Table";
import Breadcrumbs from "../components/Breadcrumbs";

const EmployeeList = () => {
  return (
    <>
      <NavBar />
      <Breadcrumbs />
      <Table />
    </>
  );
};

export default EmployeeList;
