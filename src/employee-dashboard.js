import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  getDocs,
  getFirestore,
  limit,
  startAfter,
  orderBy,
  endBefore,
  limitToLast,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "./employee-dashboard.css";
const employeeDashboard = () => {
  const db = getFirestore();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const fetch = async () => {
    const q = query(
      collection(db, "employee-data"),
      orderBy("timestamp", "desc"),
      limit(5)
    );
    const res = await getDocs(q);
    const iteam = [];
    res.forEach((doc) => {
      iteam.push({ ...doc.data() });
    });
    setList(iteam);
  };
  useEffect(() => {
    fetch();
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const Nextpage = () => {
    const lastDoc = list[list.length - 1];
    console.log("last_doc " + JSON.stringify(lastDoc));
    const q = query(
      collection(db, "employee-data"),
      orderBy("timestamp", "desc"),
      limit(5),
      startAfter(lastDoc.timestamp)
    );
    const fetch = async () => {
      const res = await getDocs(q);
      const item = [];
      res.forEach((doc) => {
        console.log(
          "employee data after qurey creating" + JSON.stringify(doc.data())
        );
        item.push({ ...doc.data() });
      });
      setList(item);
      setPage(page + 1);
    };
    fetch();
  };
  const Perviouspage = () => {
    const firstDoc = list[0];
    const q = query(
      collection(db, "employee-data"),
      orderBy("timestamp", "desc"),
      endBefore(firstDoc.timestamp),
      limitToLast(5)
    );
    const fetch = async () => {
      const res = await getDocs(q);
      const iteam = [];
      res.forEach((doc) => {
        iteam.push({ ...doc.data() });
      });
      setList(iteam);
      setPage(page - 1);
    };
    fetch();
  };
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    !loading && (
      <div>
        <div className="row" style={{ marginTop: "5px" }}>
          <div className="col">UserName</div>
          <div className="col">FirstName</div>
          <div className="col">LastName</div>
          <div className="col">DOB</div>
          <div className="col">Gender</div>
          <div className="col">View</div>
        </div>
        {list.map((value) => (
          <div className="container" key={value.id}>
            <div className="row">
              <div className="col">{value.userName}</div>
              <div className="col">{value.first_name}</div>
              <div className="col">{value.last_name}</div>
              <div className="col">{value.dob}</div>
              <div className="col">{value.gender}</div>
              <div className="col">
                <Link to={`/employeedetails/${value.id}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="center">
          <span>
            <strong>
              <center>PageNo:{page}</center>
            </strong>
          </span>
        </div>
        <div className="d-flex justify-content-between">
          {page === 1 ? (
            ""
          ) : (
            <button className="btn btn-primary" onClick={() => Perviouspage()}>
              Previous
            </button>
          )}
          {list.length < 5 ? (
            ""
          ) : (
            <button className="btn btn-primary" onClick={() => Nextpage()}>
              Next
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default employeeDashboard;
