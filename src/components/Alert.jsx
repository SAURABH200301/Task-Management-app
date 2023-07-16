import { useEffect, useState } from "react";
import { Modal, ButtonToolbar, Button } from "rsuite";
import RemindIcon from "@rsuite/icons/legacy/Remind";
import { useSelector } from "react-redux";

const Alert = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const showAlert = useSelector((state) => state.notes.showAlert);
  const alertMessage= useSelector((state)=>state.notes.alertMessage);

  useEffect(()=>{
    if(showAlert){
       ()=> handleOpen();
    }else{
        handleClose();
    }
  },[showAlert])
  return (
    <>
      {alert && (
        <>
          <ButtonToolbar>
            <Button onClick={handleOpen}></Button>
          </ButtonToolbar>

          <Modal
            backdrop="static"
            role="alertdialog"
            open={open}
            onClose={handleClose}
            size="xs"
            className="p-0 m-0"
          >
            <Modal.Body>
              <RemindIcon style={{ color: "#ffb300", fontSize: 24 }} />
              {alertMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} appearance="primary">
                Ok
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default Alert;
