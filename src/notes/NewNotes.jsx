import { useState, useRef, useEffect } from "react";
import { Button, Modal, ButtonToolbar } from "rsuite";
import classes from "./NewNotes.module.css";

function NewNotes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    buttonRef.current.click();
  },[]);
  const text = "<h2>Hello</h2>";
  return (
    <div>
      <ButtonToolbar>
        <Button onClick={handleOpen} ref={buttonRef} className={classes.btn}>
          {" "}
          Help
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <h2>Hey There, Welcome to Tasky </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>Worried!!!</h4>
            <p>
              Tasky is simple notes and task application where you can store,
              delete and update task.
            </p>
            <h5>How to use </h5>
            <p>
              You can use HTML tags to modify your content.
              <br></br>
              For Example: {text} <h2>Hello</h2>
            </p>
            <p>
              There are other tags like h1,h2,h3,h4,h5 for heading<br></br>p tag
              for paragraph
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            className={classes.btn}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewNotes;
