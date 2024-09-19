const useFormValidation = (values) => {
  const errors = {};
  const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const mobileValidation = /^[6-9]\d{9}$/;

  if (!values.name) {
    errors.name = "Name is required!";
  } else if (!(values.name.length >= 3)) {
    errors.name = "Name must be atleast 3 characters long";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailValidation.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!values.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!mobileValidation.test(values.mobile)) {
    errors.mobile = "Enter a valid mobile number";
  }

  if (!values.designation) {
    errors.designation = "Select a Designation";
  }

  if (!values.course) {
    errors.course = "Select a Course";
  }

  if (!values.gender) {
    errors.gender = "Select a Gender";
  }

  if (!values.image) {
    errors.image = "Upload an image";
  }

  return errors;
};

export default useFormValidation;
