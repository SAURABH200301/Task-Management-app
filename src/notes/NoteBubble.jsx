import classes from "./NoteBubble.module.css";

import ViewNotes from "./ViewNotes";

function NoteBubble(prop) {
  const { dueDate, status, title, } = prop.task;
  const newDate = new Date(dueDate);
  const date = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const statusClass =
    status === "todo"
      ? classes.todo
      : status === "inProgress"
      ? classes.inProgress
      : classes.completed;
  return (
    <div className={classes.main}>
      <div className={`p-3 ${classes.date}`}>
        {date}:{month + 1}:{year}
      </div>
      <div className="d-flex justify-content-around w-100 ">
        <div className={`p-3 ${classes.title}`}>{title}</div>
      </div>
      <div className={`${statusClass} ${classes.status}`}>{status}</div>
      <div className={`p-3 mx-3 ${classes.arrowDiv}`}>
          <div className={classes.arrowDiv}>
            <ViewNotes note={prop.task} isArrow={true}/>
          </div>
      </div>
    </div>
  );
}

export default NoteBubble;
