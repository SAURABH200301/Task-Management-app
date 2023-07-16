import { useParams } from "react-router-dom";
import { fetchNotes } from "../API/NotesAPI";
import { useEffect } from "react";
import classes from "./Update.module.css";
import Note from "./Note";
import { useDispatch } from "react-redux";
import { notesActions } from "../store/notes-slice";

function Update() {
  const { _id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchingData() {
      const data = await fetchNotes();
      const task = data.sortedTasks.filter((t) => t._id === _id);
      dispatch(
        notesActions.addNotes({
          notes: task[0].description,
        })
      );
      dispatch(
        notesActions.addTitle({
          title: task[0].title,
        })
      );
      dispatch(
        notesActions.updateStatus({
          status: task[0].status,
        })
      );
      dispatch(
        notesActions.addDueDate({
          dueDate: task[0].dueDate,
        })
      );
    }

    fetchingData();
  }, [_id, dispatch]);

  return (
    <div className="px-2 ">
      <Note />
    </div>
  );
}

export default Update;
