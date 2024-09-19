import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";
import CreateEmployee from "./pages/CreateEmployee";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees-list" element={<EmployeeList />} />
            <Route path="/edit-employee" element={<EditEmployee />} />
            <Route path="/create-employee" element={<CreateEmployee />} />
          </Route>
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
