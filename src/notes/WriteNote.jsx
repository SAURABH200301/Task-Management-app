import { useEffect, useState } from "react";
import classes from "./WriteNote.module.css";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../store/notes-slice";
import { fetchUsername } from "../API/NotesAPI";

function WriteNote(prop) {
  const { view, taskId } = prop;
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState("");
  const [currentContentPresent, setCurrentContentPresent] = useState(true);
  const dispatch = useDispatch();
  const dueDate = useSelector((state) => state.notes.dueDate);
  const title = useSelector((state) => state.notes.title);
  const status = useSelector((state) => state.notes.status);
  const currentContent = useSelector((state) => state.notes.notes);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        notesActions.addNotes({
          notes: inputValue,
        })
      );
    }, 5000);
  }, [dispatch, inputValue]);

  useEffect(() => {
    async function fetchUser() {
      const userId = await fetchUsername();
      setId(userId);
    }
    if (currentContent && currentContentPresent && taskId!==undefined) {
      setInputValue(currentContent);
      setCurrentContentPresent(false);
    }
    fetchUser();
  }, [currentContent, currentContentPresent,taskId]);

  const saveNotes = async () => {
    try {
        const response = await fetch(
          "http://localhost:5000/api/task/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "taskId": taskId,
              "authorization" : localStorage.getItem("token"), 
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
        response.json();
        alert("Note Created");
    } catch (error) {
      console.log(error);
    }
  };

  const saveHandler = () => {
    if (inputValue === "") {
      alert("Please Enter notes >5 letters");
      
      return;
    }
    saveNotes();
    setInputValue("");
  };

  const Placeholder =
    "You can use HTML tags to modify the notes like <h1>hello</h1> for a heading";

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
