import { Navbar, Nav } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import classes from "./Navbar.module.css";
import SignUpModal from "./SignUpModal";
// import { Link } from "react-router-dom";
import Login from "./Login";

const MainNavbar = () => {
  return (
    <Navbar className={classes.navbar}>
      <Navbar.Brand className={classes.brand}>Tasky</Navbar.Brand>
      <Nav>
        <Nav.Item className={classes.item} href="/" eventKey="home">
          Home
        </Nav.Item>
        <Nav.Item className={classes.item} href="/about" eventKey="about">
          About
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <div className={classes.signupDiv}>
          <Login />
          <SignUpModal title='SignUp'/>
        </div>
      </Nav>
    </Navbar>
  );
};

export default MainNavbar;
