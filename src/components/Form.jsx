// using this same form component for updation and creation

import React, { useState, useEffect } from "react";
import Button from "./Button";
import useFormValidation from "../hooks/useFormValidation";
import "./form.css";
import { fields } from "../constants";

const Form = ({ name, initialFormState, sendDataToParent }) => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormValues({ ...formValues, [name]: file });
    }
  };

  const errors = useFormValidation(formValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      let formData = new FormData();
      for (const key in formValues) {
        formData.append(key, formValues[key]);
      }

      sendDataToParent(formData);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors, isSubmit]);

  return (
    <>
      <div className="employee-form">
        <form onSubmit={handleSubmit}>
          {fields.map((data, index) => {
            if (data.tag === "select") {
              return (
                <div key={index} className="fields">
                  <label htmlFor={data.label}> {data.label} </label>
                  <select
                    id={data.label}
                    name={data.name}
                    value={formValues[data.name]}
                    onChange={handleChange}
                  >
                    <option value="">Select..</option>
                    {data.options.map((option, i) => {
                      return (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                  {formErrors[data.name] && (
                    <span className="error">{formErrors[data.name]}</span>
                  )}
                </div>
              );
            } else if (data.tag === "radio") {
              return (
                <div key={index} onChange={handleChange} className="fields">
                  <label htmlFor={data.label}>{data.label}</label>
                  {data.options.map((option, i) => {
                    return (
                      <div key={i} className="radio-group">
                        <input
                          type={option.type}
                          id={option.label}
                          value={option.label}
                          name={data.name}
                          checked={formValues[data.name] === option.label}
                        />
                        <label htmlFor={option.label}>{option.label}</label>
                      </div>
                    );
                  })}
                  {formErrors[data.name] && (
                    <span className="error">{formErrors[data.name]}</span>
                  )}
                </div>
              );
            } else if (data.type === "file") {
              return (
                <div key={index}>
                  <div className="fields">
                    <label htmlFor={data.label}>{data.label}</label>
                    <input
                      type={data.type}
                      accept="image/x-png,image/jpg,image/jpeg"
                      id={data.label}
                      name={data.name}
                      onChange={imageHandler}
                    />
                  </div>
                  {formErrors[data.name] && (
                    <span className="error">{formErrors[data.name]}</span>
                  )}
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <div className="fields">
                    <label htmlFor={data.label}>{data.label}</label>
                    <input
                      type={data.type}
                      value={formValues[data.name]}
                      id={data.label}
                      name={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  {formErrors[data.name] && (
                    <span className="error">{formErrors[data.name]}</span>
                  )}
                </div>
              );
            }
          })}
          <Button name={name} />
        </form>
      </div>
    </>
  );
};

export default Form;
