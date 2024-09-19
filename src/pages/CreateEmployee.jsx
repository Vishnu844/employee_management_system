import React from "react";
import Form from "../components/Form";
import { createEmployee } from "../utils/apiRequests";
import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/Navbar";
import "./employeePages.css";

const CreateEmployee = () => {
  const token = JSON.parse(sessionStorage.getItem("data")).token;
  const initialFormState = {
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: "",
  };

  const handleDataFromChild = (data) => {
    createEmployee(data, token)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="employee-wrapper">
        <Form
          name={"create"}
          initialFormState={initialFormState}
          sendDataToParent={handleDataFromChild}
        />
      </div>
    </>
  );
};

export default CreateEmployee;
