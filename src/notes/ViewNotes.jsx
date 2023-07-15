import { useState } from "react";
import { Button, Modal, ButtonToolbar } from "rsuite";
import classes from "./ViewNotes.module.css";
import arrow from "../assets/arrow2.png";
import { Link } from "react-router-dom";

function ViewNotes(prop) {
  const { dueDate, status, title, description } = prop.note;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const newDate = new Date(dueDate);
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return (
    <div>
      <ButtonToolbar>
        <Button onClick={handleOpen} className={classes.arrowBtn}>
          {prop.isArrow && <img className={classes.arrow} src={arrow} alt="go" />}
          {!prop.isArrow && <Link className={classes.notArrow} >{title}</Link>}
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div className="d-flex justify-content-center">
              <h1>{title}</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-flex justify-content-between">
                <div>
                    <i>Due Date: {date}:{month+1}:{year}</i>
                </div>
              <div>
                Status :<i> {status}</i>
              </div>
            </div>
            <div>
              <div
                className="preview "
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            className={classes.btn}
            appearance="default"
          >
            Update
          </Button>
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

export default ViewNotes;
