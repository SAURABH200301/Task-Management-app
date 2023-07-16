import { useState } from "react";
import { Button, Modal, ButtonToolbar } from "rsuite";
import classes from "./ViewNotes.module.css";
import arrow from "../assets/arrow2.png";
import { Link, useNavigate  } from "react-router-dom";

function ViewNotes(prop) {
  const { dueDate, status, title, description, _id } = prop.note;
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    const location= `/home/${_id}`;
    history(location);
  };

  const URl = `http://localhost:5000/api/task/tasks/${_id}`;
  const handleDelete = async () => {
    try {
      const res = await fetch(URl, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token").toString(),
        },
      });
      const data = await res.json();
      if (data.success) {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.log(e);
    }
    handleClose();
    location.reload(true);
  };

  const newDate = new Date(dueDate);
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return (
    <div>
      <ButtonToolbar>
        <Button onClick={handleOpen} className={classes.arrowBtn}>
          {prop.isArrow && (
            <img className={classes.arrow} src={arrow} alt="go" />
          )}
          {!prop.isArrow && <Link className={classes.notArrow}>{title}</Link>}
        </Button>
      </ButtonToolbar>

      <Modal open={open} onClose={handleClose} className={classes.modal}>
        <Modal.Header>
          <Modal.Title>
            <div className="d-flex justify-content-center">
              <h1>{title}</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-3">
            <div className="d-flex justify-content-between">
              <div>
                <i>
                  Due Date: {date}:{month + 1}:{year}
                </i>
              </div>
              <div>
                Status :<i> {status}</i>
              </div>
            </div>
            <div className="border p-3">
              <div
                className="preview "
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleDelete}
            className={classes.btn}
            appearance="default"
          >
            Delete
          </Button>
          <Button
            onClick={handleClick}
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
