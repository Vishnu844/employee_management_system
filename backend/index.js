const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const employee = require("./routes/employee");
const auth = require("./routes/auth");
const PORT = process.env.PORT || 2222;

app.use(cors());
app.use(express.json());

//Routes
app.use("/api/employee", employee);
app.use("/api/admin", auth);

app.listen(PORT, () => {
  console.log("Listening to port 2222");
});

const connectToDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log("Database Connected");
  } catch (err) {
    console.log("Could not connect to MongoDB");
    console.log(err);
    process.exit(1);
  }
};

connectToDB();
