import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./View.module.css";

function View(prop) {
  const { view } = prop;
  const notes = useSelector((state) => state.notes.notes);
  const [content, setContent] = useState();
  useEffect(() => {
    setContent(notes);
  }, [notes]);
  return (
    <div className={` m-3 p-4 ${classes.viewBox}`}>
      {notes === '' && view && (
        <div className="border p-5 d-flex justify-content-center fs-5">
          Write a note
        </div>
      )}
      {view && (
        <div
          className="preview border"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
    </div>
  );
}

export default View;
