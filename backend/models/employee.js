const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
  image: {
    type: String,
    default: "https://www.w3schools.com/howto/img_avatar.png",
  },
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: (props) =>
        `${props.value} is not a valid mobile number. It should contain only 10 digits.`,
    },
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("employee", employeeSchema);
