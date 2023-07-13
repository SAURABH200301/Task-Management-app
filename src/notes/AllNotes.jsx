import { useState, useEffect } from "react";
import classes from "./AllNotes.module.css";
import { Dropdown } from "rsuite";
import NoteBubble from "./NoteBubble";

function AllNotes() {
  const [task, setTask] = useState();
  const [todoTask, setTodo] = useState();
  const [inProgress, setInProgress] = useState();
  const [completed, setCompleted] = useState();
  const [taskDisplay, setTaskDisplay] = useState(task);
  const [selectedItem, setSelectedItem] = useState("Select the status");

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey);
    if (eventKey === "todo") {
      fillTodoTask();
      setTaskDisplay(todoTask);
    } else if (eventKey === "inProgress") {
      fillInProgressTask();
      setTaskDisplay(inProgress);
    } else if (eventKey === "completed") {
      fillCompletedTask();
      setTaskDisplay(completed);
    } else {
      setTaskDisplay(task);
    }
  };
  useEffect(() => {
    fetchNotes();
  },[]);
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/api/task/fetchtasks",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        }
      );
      const resp = await response.json();
      setTask(resp.tasks);
      setTaskDisplay(resp.tasks);
    } catch (e) {
      console.log(e);
    }
  };
  
  const fillTodoTask = () => {
    const todoTasks = task.filter((t) => t.status === "todo");
    setTodo(todoTasks);
  };
  const fillInProgressTask = () => {
    const inTasks = task.filter((t) => t.status === "inProgress");
    setInProgress(inTasks);
  };
  const fillCompletedTask = () => {
    const completedTask = task.filter((t) => t.status === "completed");
    setCompleted(completedTask);
  };
  return (
    <div className={` ${classes.main}`}>
      <div>
        <h2>Your All Notes at one place</h2>
      </div>
      <div className={classes.dropdown}>
        <Dropdown
          className={classes.items}
          title={selectedItem}
          trigger="hover"
          onSelect={handleSelect}
        >
          <Dropdown.Item className={classes.items} eventKey="allnotes">
            All Notes
          </Dropdown.Item>
          <Dropdown.Item className={classes.items} eventKey="todo">
            to-do
          </Dropdown.Item>
          <Dropdown.Item eventKey="inProgress">In Progress</Dropdown.Item>
          <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="d-flex flex-column">
        {taskDisplay &&
          taskDisplay.map((t) => {
            return (
              <div key={t._id} className="m-2">
                <NoteBubble task={t} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AllNotes;
