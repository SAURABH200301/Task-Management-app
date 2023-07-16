import { useState } from "react";
import { Button, Modal, ButtonToolbar, Form } from "rsuite";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showAlert } from "../store/alert-slice";

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (name, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/home");
      dispatch(showAlert("This is an alert message."));
      console.log("success login");
    } else {
      console.log("invalid ");
    }
    setUserData({
      email: "",
      password: "",
    });
    handleClose();
  };

  return (
    <>
      <ButtonToolbar>
        <Button onClick={handleOpen} className={classes.login}>
          {" "}
          Login
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className={classes.title}>
            <h2>Login</h2>
          </Modal.Title>
          <div className={classes.divider}></div>
        </Modal.Header>
        <Modal.Body>
          <Form layout="horizontal" className="pt-3">
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
                <Button onClick={handleLogin} className={classes.btn}>
                  Login
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

export default LoginModal;
