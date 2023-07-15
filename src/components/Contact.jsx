import classes from "./Contact.module.css";
import contactMe from "../assets/contact.jpg";

function Contact() {
  return (
    <div className={`row border ${classes.main}`}>
      <div className={` col-md-6 ${classes.header}`}>
        <h2>Contact me</h2>
        <div>
          <img className={classes.img} src={contactMe} alt="contact" />
        </div>
      </div>
      <div className={`col-md-6 ${classes.contacts}`}>
        <div className={classes.context}>
          <span className={classes.contextHead}>Email: </span>
          <span className={classes.content}>saurabhsha2003@gmail.com</span>
        </div>
        <div className={classes.context}>
          <span className={classes.contextHead}>Phone: </span>
          <span className={classes.content}>9455158814</span>
        </div>
        <div className={classes.context}>
          <span className={classes.contextHead}>Location: </span>
          <span className={classes.content}>Noida, Uttar Pradesh</span>
        </div>
        <div className={classes.icons}>
          <a href="#" className={`fa fa-twitter ${classes.icon}`}></a>
          <a href="#" className={`${classes.icon} fa fa-linkedin`}></a>
          <a href="#" className={`fa fa-instagram ${classes.icon}`}></a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
