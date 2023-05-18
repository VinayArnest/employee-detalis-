import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const EmployeeLogin = () => {
  const auth = getAuth();
  const [login, setLogin] = useState([
    {
      userName: "",
      password: "",
    },
  ]);
  const navigate = useNavigate();
  const { userName, password } = login;
  const handleEmployeeLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmitEmployeeDetalis = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userName, password)
      .then(async (userCredential) => {
        // Signed in
        //const user = userCredential.user;
        navigate("/empdashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("USER NAME OR PASSWORS MIGHT BE WRONG");
        console.log(errorCode, errorMessage);
      });
  };

  const handleRegisterEvent = () => {
    return navigate("/employeeregister");
  };

  return (
    <>
      <form onSubmit={handleSubmitEmployeeDetalis}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input
            type="email"
            className="form-control"
            id=""
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={userName || ""}
            name="userName"
            onChange={handleEmployeeLogin}
            required
          />
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
            value={password || ""}
            onChange={handleEmployeeLogin}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary ">
          Login
        </button>
        <button
          className="btn btn-primary"
          style={{
            margin: "5px",
            width: "74px",
            height: "38px",
          }}
          onClick={handleRegisterEvent}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default EmployeeLogin;
