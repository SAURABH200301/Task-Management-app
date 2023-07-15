import { useState, useEffect } from "react";
import classes from "./AllNotes.module.css";
import { Dropdown } from "rsuite";
import NoteBubble from "./NoteBubble";
import nothing from "../assets/nothing.jpg";

function AllNotes() {
  const [task, setTask] = useState([]);
  const [todoTask, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [taskDisplay, setTaskDisplay] = useState([]);
  const [selectedItem, setSelectedItem] = useState("Select the status");
  const [dataPresent, setDataPresent] = useState(true);

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
  }, []);

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
      if (resp.tasks.length === 0) {
        setDataPresent(false);
      }
      const sortedTasks = resp.tasks.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );

      setTaskDisplay(sortedTasks);
      fillTodoTask();
      fillInProgressTask();
      fillCompletedTask();
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
    <div className={` ${classes.main} pt-3`}>
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
      <div className="d-flex flex-column mt-5">
        {!dataPresent && (
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-center ">
              <h3>Try a Note</h3>
            </div>
            <div>
              <img
                className={classes.nothing}
                src={nothing}
                alt="not file found"
              />
            </div>
          </div>
        )}
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
