const Employee = require("../models/employee");

// controller to create an employee
exports.create = async (req, res) => {
  try {
    const newEmployee = new Employee({
      name: req.body.name,
      image: req.file.path,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
    });
    await newEmployee.save();
    res.json({
      status: 1,
      message: "Successfully saved employee",
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to save employee",
      data: null,
      error: err.message,
    });
  }
};

// controller to get all employees
exports.getEmployees = async (req, res) => {
  const { page, limit, sortField, sortOrder, name } = req.query;
  const skip = (page - 1) * limit;
  let sort = {};
  sort[sortField] = sortOrder === "asc" ? 1 : -1;

  const query = {};

  //search by name
  if (name) {
    query.name = { $regex: new RegExp(name, "i") };
  }

  try {
    const employees = await Employee.find(query)
      .sort(sort)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const totalEmployees = await Employee.countDocuments(query);

    res.json({
      status: 1,
      message: "Fetched data Successfully!!",
      data: {
        totalPages: Math.ceil(totalEmployees / limit),
        currentPage: parseInt(page),
        totalEmployees,
        employees,
      },
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to get Employees",
      data: null,
      error: err.message,
    });
  }
};

// controller to get employee
exports.getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne(id);
    if (!employee) {
      return res.json({ status: 0, message: "Employee not found!" });
    }
    res.json({
      status: 1,
      message: "Fetched employee successfully",
      data: employee,
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to Fetch Employee",
      data: null,
      error: err.message,
    });
  }
};

// controller to update employee
exports.update = async (req, res) => {
  const { id } = req.params;
  const updates = {
    name: req.body.name,
    image: req.file.path,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course,
  };
  try {
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!employee) {
      return res.json({ status: 0, message: "Employee not found!" });
    }
    res.json({
      status: 1,
      message: "Updated employee successfully",
      data: employee,
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to Update Employee",
      data: null,
      error: err.message,
    });
  }
};

// controller to delete the employee
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.json({ status: 0, message: "Employee not found!" });
    }
    res.json({
      status: 1,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    res.json({
      status: 0,
      message: "Failed to delete Employee",
      data: null,
      error: err.message,
    });
  }
};
