import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedEmp } from "../actions/employee-actions";

const EmployeeDetails = () => {
  const selectedEmployeeData = [];
  const auth = getAuth();
  const usedispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  /**
   * below varibale employeeData is a redux store variable
   * @returns it gets updated data after reducer send's data to state variable
   */
  const employeeData = useSelector((state) => state.selectedEmp.employees);

  /**
   *this method will get the current logged-in employee data
   *And it will dispatch the redux reducer to update state
   @returns selected employee data
   */

  const SelectedEmployee = () => {
    const fetch = async (id) => {
      const selecteEmployeewithId = query(
        collection(db, "employee-data"),
        where("id", "==", id)
      );
      const result = await getDocs(selecteEmployeewithId);
      result.forEach((doc) => {
        const data = doc.data();
        const docRef = doc.id;
        const { address, dob, first_name, gender, last_name, userName, id } =
          data;
        selectedEmployeeData.push({
          address,
          dob,
          first_name,
          gender,
          last_name,
          userName,
          id,
          docRef,
        });
      });
      usedispatch(selectedEmp(selectedEmployeeData));
      setLoading(false);
    };

    /**
     * From useEffect will invoke fetch method with id from pathParams
     * this useEffect will execute only two times when component mounts and unmounts
     * because dependency will be only [] empyt array
     */

    const { Id } = useParams();
    useEffect(() => {
      fetch(Id);
    }, []);

    if (loading) {
      return <h1>Loading...</h1>;
    }

    /*
     This will return only when "loading" useState variable changes to false the !flase = true
     * then this will return will execute
     */

    return (
      !loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {employeeData.map((value) => (
            <div key={value.id}>
              <table style={{ borderCollapse: "collapse", margin: "20px" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "10px" }}>
                      First Name
                    </th>
                    <th style={{ border: "1px solid black", padding: "10px" }}>
                      Last Name
                    </th>
                    <th style={{ border: "1px solid black", padding: "10px" }}>
                      DOB
                    </th>
                    {value.id === auth.currentUser.uid && (
                      <th
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        Edit
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {value.first_name}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {value.last_name}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {value.dob}
                    </td>
                    {value.id === auth.currentUser.uid && (
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <button onClick={() => setEdit(true)}>Edit</button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )
    );
  };

  const [editEmp, setEditEmp] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    docRef: "",
  });

  const { first_name, last_name, dob, docRef } = editEmp;

  const handleModelChange = (e) => {
    setEditEmp({ ...editEmp, [e.target.name]: e.target.value });
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    const updateEmployeewithDocRef = doc(db, "employee-data", docRef);
    await updateDoc(updateEmployeewithDocRef, {
      first_name: first_name,
      last_name: last_name,
      dob: dob,
    });

    usedispatch(selectedEmp([editEmp]));
    alert("Data Updated");
    setEdit(false);
  };

  useEffect(() => {
    if (employeeData.length !== 0) {
      setEditEmp(employeeData[0]);
    }
  }, [edit]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Employee Details</h1>

      {/*
      here below we are rendering two compoents based on the condition
      *selectedEmployee() will execute first then after if and only 
      *if user clicked on edit button then edit useState variable will
      *chnage to true then all again render on the dom  now it will 
      *edit form because it is ture now edit = true 
       */}

      {SelectedEmployee()}
      {edit && (
        <form onSubmit={handleSubmitEvent}>
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
              onChange={handleModelChange}
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
              onChange={handleModelChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Date</label>
            <input
              type="date"
              className="form-control"
              id=""
              aria-describedby="emailHelp"
              placeholder={employeeData.first_name}
              name="dob"
              value={dob}
              onChange={handleModelChange}
            />
          </div>
          <button
            className="btn btn-primary"
            style={{
              margin: "5px",
              width: "74px",
              height: "38px",
            }}
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeDetails;
