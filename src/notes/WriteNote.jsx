import { useEffect, useState } from "react";
import classes from "./WriteNote.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../store/notes-slice";

function WriteNote(prop) {
  const { view } = prop;
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const dueDate = useSelector((state) => state.notes.dueDate);
  const title = useSelector((state) => state.notes.title);
  const status = useSelector((state) => state.notes.status);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        notesActions.addNotes({
          notes: inputValue ,
        })
      );
    },5000);
  }, [dispatch, inputValue]);

  useEffect(() => {
    fetchUsername();
  });

  async function fetchUsername() {
    const res = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token").toString(),
      },
    });
    const data = await res.json();
    const Id = data._id;
    setId(Id);
  }
  const saveNotes = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/task/createtask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            description: inputValue,
            status: status,
            dueDate: dueDate,
            createdBy: id,
          }),
        }
      );
      const resp = await response.json();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };
  const saveHandler = () => {
    if (inputValue === "") {
      alert("Please Write the note here");
      return;
    }
    saveNotes();
  };
  const Placeholder =
    "You can use HTML tags to modifiy the notes like <h1>hello</h1> For heading";
  return (
    <div>
      {view && (
        <div className="m-3">
          <div className="m-3">
            <textarea
              className={`border ${classes.textarea}`}
              value={inputValue}
              onChange={handleInputChange}
              placeholder={Placeholder}
            />
          </div>
          <div className={classes.saveDiv}>
            <button className={classes.btn} onClick={saveHandler}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteNote;
