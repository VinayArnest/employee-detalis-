import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./layouts/navbar";
import EmployeeLogin from "./components/employee-login";
import Contact from "./components/contact";
import EmployeeRegister from "./components/employee-register";
import EmployeeDetails from "./components/employee-details";
import Home from "./components/home";
import EmployeeDashboard from "./components/employee-dashboard";

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
