import "./NoteNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewNotes from "./ViewNotes";

const NoteNavbar = () => {
  const Navigate = useNavigate();
  const [task, setTask] = useState();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/api/task/fetchtasks",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        }
      );
      const resp = await response.json();
      setTask(resp.tasks);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="sidebar close">
        <div className="logo-details">
          <i className="bx bxs-note"></i>
          <span className="logo_name">Tasky</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/home">
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Home</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <Link className="link_name" to="/home">
                  Home
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/home">
                <i className="bx bx-collection"></i>
                <span className="link_name">Home</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name d-flex justify-content-center" to="/home/notes">
                  Notes
                </Link>
              </li>
              {task &&
                task.map((t) => {
                  return (
                    <li key={t._id} className="d-flex justify-content-center">
                      <ViewNotes note={t} isArrow={false}></ViewNotes>
                      
                    </li>
                  );
                })}
              <li className="d-flex justify-content-center">
                <Link to="/home">+</Link>
              </li>
            </ul>
          </li>

          <li>
            <div className="iocn-link">
              <Link to="/" onClick={logoutHandler}>
                <i className="bx bx-plug"></i>
                <span className="link_name">Logout</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/" onClick={logoutHandler}>
                  logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NoteNavbar;
