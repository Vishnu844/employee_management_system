const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

module.exports = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    return res.status(200).json({ errors });
  }
  next(err);
};
