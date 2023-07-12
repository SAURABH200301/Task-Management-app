import { useState } from "react";
import { Button, Modal, ButtonToolbar, Form } from "rsuite";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignupModal = (prop) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (name, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log("signed up", json.authToken);
    if (json.success) {
      // props.showAlert("Account created", "success")
      console.log("account created");
      localStorage.setItem("token", json.authToken);
      navigate("/home");
    } else {
      console.log("already exists");
      // props.showAlert("User With this Credientials already exists", "danger")
    }
    setUserData({
      name: "",
      email: "",
      password: "",
    });
    handleClose();
  };

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} className={`${classes.login}`}>
          {prop.title}
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <Modal.Header>
          <Modal.Title className="d-flex justify-content-center fw-bolder">
            Get started with Tasky
          </Modal.Title>
          <div className={classes.divider}></div>
        </Modal.Header>
        <Modal.Body>
          <Form layout="horizontal">
            <Form.Group controlId="name-6">
              <Form.ControlLabel className="fw-bold">
                Username
              </Form.ControlLabel>
              <Form.Control
                name="name"
                value={userData.name}
                onChange={(value) => handleInputChange("name", value)}
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="email-6">
              <Form.ControlLabel className="fw-bold">Email</Form.ControlLabel>
              <Form.Control
                name="email"
                type="email"
                value={userData.email}
                onChange={(value) => handleInputChange("email", value)}
              />
              <Form.HelpText tooltip>Required</Form.HelpText>
            </Form.Group>
            <Form.Group controlId="password-6">
              <Form.ControlLabel className="fw-bold">
                Password
              </Form.ControlLabel>
              <Form.Control
                name="password"
                type="password"
                autoComplete="off"
                value={userData.password}
                onChange={(value) => handleInputChange("password", value)}
              />
            </Form.Group>
            <Form.Group>
              <Modal.Footer>
                <Button onClick={handleSignUp} className={classes.btn}>
                  SignUp
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                  Cancel
                </Button>
              </Modal.Footer>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupModal;
