import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import EmployeeLogin from "./employee-login";
import Navbar from "./layouts/Navbar";
import Contact from "./Contact";
import EmployeeRegister from "./employee-register";
import EmployeeDetails from "./employee-details";
import Home from "./Home";
import EmployeeDashboard from "./employee-dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/employeeregister" element={<EmployeeRegister />} />
        <Route path="/employeedetails/:Id" element={<EmployeeDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/empdashboard" element={<EmployeeDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
