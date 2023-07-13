import classes from "./NoteNavbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import menu from '../assets/burger.png'

const NoteNavbar = () => {
  const Navigate= useNavigate();
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };
  return (
    <div>
      <div id="mySidenav" className={classes.sidenav}>
        <div className={classes.closebtn} onClick={closeNav}>
          &times;
        </div>
        <Link to="/">Home</Link>
        <Link to="/">Grades</Link>
        <Link to="/" onClick={logoutHandler}>Logout</Link>
      </div>

      <span onClick={openNav}>
        <img src={menu} className={classes.icons} alt="menu icon" />
      </span>
    </div>
  );
};

export default NoteNavbar;

