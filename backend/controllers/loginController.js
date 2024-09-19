const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login");
const JWT_SECRET = process.env.JWT_SECRET;

// Admin registration Controller
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //Encrypting password

    const newAdmin = new Login({
      username: req.body.username,
      password: hashedPassword,
    });
    await newAdmin.save(); // saving user details to db
    res.json({
      status: 1,
      message: "Successfully Created and saved Admin",
      data: null,
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to create admin",
      data: null,
    });
  }
};

//Admin login Controller
exports.login = async (req, res) => {
  try {
    const args = {
      username: req.body.username,
    };
    const user = await Login.findOne(args);

    if (!user) {
      throw new Error("Incorrect Username or Password");
    } else {
      //comparing the password entered
      const inputPassword = req.body.password;

      const isPasswordTrue = await bcrypt.compare(inputPassword, user.password);

      if (!isPasswordTrue) {
        throw new Error("Incorrect Username or Password");
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      const { password, ...others } = user._doc;
      res.json({
        status: 1,
        message: "Successfully Logged in",
        data: { ...others },
        token,
      });
    }
  } catch (err) {
    res.json({
      status: 0,
      message: err.message,
      data: null,
    });
  }
};
