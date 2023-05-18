import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebaseConfiguration from "../firebase";
export const Navbar = () => {
  const auth = getAuth(firebaseConfiguration);

  /**
   * below loggedCheck will be evently change
   * based user auth state
   */

  const [loggedCheck, setLoggedCheck] = useState(false);
  const navigate = useNavigate();

  /**
   * this event will fire when user clicks on signout event
   * @return if user successfull logout it will navigate
   * to home page
   */

  const handleSignoutEvent = () => {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        navigate("/");
      })
      .catch((error) => {
        console.log("Sign-out error:", error);
      });
  };

  /**This will execute when user auth changed
   * example when userLogged in setLoggedCheck
   * to true else flase
   */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        setLoggedCheck(true);
      } else {
        setLoggedCheck(false);
      }
    });
  }, [auth]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              {!loggedCheck && (
                <Link className="nav-link" to="/employeelogin">
                  Login
                </Link>
              )}
            </li>

            <li className="nav-item active">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <strong
          style={{
            marginRight: "20px",
          }}
        >
          {auth.currentUser && auth.currentUser.email}
        </strong>
        {loggedCheck && (
          <button
            type="submit"
            className="btn btn-primary "
            style={{
              margin: "5px",
              width: "74px",
              height: "38px",
            }}
            onClick={handleSignoutEvent}
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
