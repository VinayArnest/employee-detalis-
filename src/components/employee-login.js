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
  /**
   * this method will execute when user modify input field
   * @param {*} e -> event
   */
  const handleModelEmployeeLogindetalis = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  /**
   * after user submitted the detalis the below method will execute
   * and it will athucenticate the user with firebase signInWithEmailAndPassword
   * method
   */

  const firebaseAuthhandler = async () => {
    try {
      const userCredential = signInWithEmailAndPassword(
        auth,
        userName,
        password
      );
      if (userCredential) {
        navigate("/empdashboard");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("USER NAME OR PASSWORS MIGHT BE WRONG");
      console.log(errorCode, errorMessage);
    }
  };

  const handleSubmitEmployeeLoginDetalis = (e) => {
    e.preventDefault();
    firebaseAuthhandler();
  };

  /**
   * whenever user clicks on register button this funcation will execute
   * @returns to employee register page
   */

  const handleRegisterEvent = () => {
    return navigate("/employeeregister");
  };

  return (
    <>
      <form onSubmit={handleSubmitEmployeeLoginDetalis}>
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
            onChange={handleModelEmployeeLogindetalis}
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
            onChange={handleModelEmployeeLogindetalis}
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
