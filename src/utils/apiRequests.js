import axios from "axios";

export const adminLogin = async (data) => {
  const result = await axios.post(
    "http://localhost:2222/api/admin/login",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return result;
};

export const adminRegister = async (data) => {
  const result = await axios.post(
    "http://localhost:2222/api/admin/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return result;
};

export const getEmployee = async (token) => {
  const result = await axios.get("http://localhost:2222/api/employee/get", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return result;
};

export const createEmployee = async (data, token) => {
  const result = await axios.post(
    "http://localhost:2222/api/employee/add",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );
  return result;
};

export const editEmployee = async (data, id, token) => {
  const result = await axios.patch(
    `http://localhost:2222/api/employee/update/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }
  );
  return result;
};

export const deleteEmployee = async (id, token) => {
  const result = await axios.delete(
    `http://localhost:2222/api/employee/delete/${id}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return result;
};
