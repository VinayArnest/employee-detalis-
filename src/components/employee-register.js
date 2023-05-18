import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const EmployeeRegister = () => {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const [employeeDetalis, setEmployeeDetalis] = useState({
    email: "",
    password: "",
    userName: "",
    dob: "",
    first_name: "",
    last_name: "",
    gender: "",
    address: "",
  });
  /**
   * destructering the employeeDetalis
   */
  const {
    email,
    password,
    userName,
    dob,
    first_name,
    last_name,
    gender,
    address,
  } = employeeDetalis;

  /**
   * this method will execute when user modify input field
   * @param {*} e -> event
   */

  const handleModelEmployeeRegisterdetalis = (e) => {
    setEmployeeDetalis({ ...employeeDetalis, [e.target.name]: e.target.value });
  };

  /**
   * this method will store employee detalis with help of firebase function addDoc
   * @param {*} e
   */
  const handleSubmitEmployeeDetalis = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          await addDoc(collection(db, "employee-data"), {
            id: user.uid,
            email: email,
            password: password,
            userName: userName,
            first_name: first_name,
            last_name: last_name,
            dob: dob,
            gender: gender,
            address: address,
            timestamp: serverTimestamp(),
          });
          navigate("/empdashboard");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error.message);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitEmployeeDetalis}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleModelEmployeeRegisterdetalis}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">password</label>
          <input
            type="password"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">userName</label>
          <input
            type="text"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter username"
            name="userName"
            value={userName}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">first_name</label>
          <input
            type="text"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter first_name"
            name="first_name"
            value={first_name}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">last_name</label>
          <input
            type="text"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter last_name"
            name="last_name"
            value={last_name}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">dob</label>
          <input
            type="date"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder=""
            name="dob"
            value={dob}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">address</label>
          <input
            type="text"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder=""
            name="address"
            value={address}
            onChange={handleModelEmployeeRegisterdetalis}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault1"
            value="Male"
            onChange={handleModelEmployeeRegisterdetalis}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Male
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            value="Female"
            onChange={handleModelEmployeeRegisterdetalis}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Female
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="flexRadioDefault2"
            value="others"
            onChange={handleModelEmployeeRegisterdetalis}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            others
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegister;
