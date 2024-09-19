import React from "react";
import Form from "../components/Form";
import { editEmployee } from "../utils/apiRequests";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/Navbar";
import "./employeePages.css";

const EditEmployee = () => {
  const token = JSON.parse(sessionStorage.getItem("data")).token;
  let { state } = useLocation();
  let { _id, __v, ...employee } = state.employee;
  const handleDataFromChild = (data) => {
    for (const value of data.values()) {
      console.log(value);
    }
    editEmployee(data, _id, token)
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="employee-wrapper">
        <Form
          name={"Edit"}
          initialFormState={employee}
          sendDataToParent={handleDataFromChild}
        />
      </div>
    </>
  );
};

export default EditEmployee;
