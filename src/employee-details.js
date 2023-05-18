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
import { selectEmp } from "./actions/Updateemployee";
const EmployeeDetails = () => {
  const employee = [];
  const auth = getAuth();
  const usedispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const employeeData = useSelector((state) => state.selectedEmp.employees);
  const SelectedEmployee = () => {
    const { Id } = useParams();
    const fetch = async (id) => {
      const q = query(collection(db, "employee-data"), where("id", "==", id));
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        const docRef = doc.id;
        const { address, dob, first_name, gender, last_name, userName, id } =
          data;
        employee.push({
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
      usedispatch(selectEmp(employee));
    };
    useEffect(() => {
      setLoading(true);
      fetch(Id);
      setTimeout(() => setLoading(false), 2000);
    }, []);
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
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
                    <th style={{ border: "1px solid black", padding: "10px" }}>
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
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      <button onClick={() => setEdit(true)}>Edit</button>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };
  const [editEmp, setEditEmp] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    docRef: "",
  });
  const { first_name, last_name, dob, docRef } = editEmp;
  const handleChange = (e) => {
    setEditEmp({ ...editEmp, [e.target.name]: e.target.value });
  };
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    const updateEmployee = doc(db, "employee-data", docRef);
    await updateDoc(updateEmployee, {
      first_name: first_name,
      last_name: last_name,
      dob: dob,
    });
    usedispatch(selectEmp([editEmp]));
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
