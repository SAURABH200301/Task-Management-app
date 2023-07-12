import classes from "./Hero.module.css";
import heroPic from "../assets/pic.jpg";
import Contact from "./Contact";
import SignupModal from "./SignUpModal";
import MainNavbar from "./Navbar";

function Hero() {
  return (
    <div>
      <MainNavbar/>
      <div className={classes.header}>
        <div className={classes.innerDiv}>
          <h1>Your docs & to-do together.</h1>
          <div className={classes.h2}>Tasky is the connected workspace</div>
          <div className={classes.h2}> where better, faster work happens.</div>
          <div className={classes.buttonDiv}>
            <SignupModal title="Try for free"/>
          </div>
        </div>
      </div>

      <div className={classes.heroDiv}>
        <img
          className={classes.heroPix}
          src={heroPic}
          alt="person writing something"
        />
      </div>
      <div className={classes.contact}>
        <Contact/>
      </div>
    </div>
  );
}

export default Hero;
