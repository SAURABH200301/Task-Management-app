import { useEffect, useState } from "react";
import DueDate from "./DueDate";
import classes from "./Note.module.css";
import WriteNote from "./WriteNote";
import View from "./View";
import { useDispatch } from "react-redux";
import { notesActions } from "../store/notes-slice";
import { Dropdown } from "rsuite";
import hand from "../assets/wave.png";
import NewNotes from "./NewNotes";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function Note() {
    const [heading, setHeading] = useState("");
    const [WriteVisible, setWriteVisible] = useState(true);
    const [ViewVisible, setViewVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select the status");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
  
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
  
    const handleSelect = (eventKey) => {
      setSelectedItem(eventKey);
    };
    const viewHandler = () => {
      setWriteVisible(!WriteVisible);
      setViewVisible(!ViewVisible);
    };
  
    const handleHeadingChange = (event) => {
      setHeading(event.target.value);
    };
    useEffect(() => {
      dispatch(
        notesActions.addTitle({
          title: heading,
        }),
      );
      dispatch(
        notesActions.updateStatus({
          status: selectedItem,
        })
      )
    }, [dispatch, heading, selectedItem]);
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
      const Name = data.name;
      setName(Name);
    }
  return (
    <div>
         <div className="">
        <div className="px-5 mt-3  d-flex justify-content-end ">
          <div>
            <NewNotes />
          </div>
        </div>
        <div className="d-flex justify-content-center text-capitalize">
          <h1>
            Hey, {name}
            <span>
              <img className={classes.wave} src={hand} alt="waving" />
            </span>
          </h1>
        </div>
        <div className=" m-5 px-4 d-flex justify-content-around">
          <div className={` ${classes.date}`}>
            {date}-{months[month ]}-{year}
          </div>
          <div className={classes.Head}>
            <input
              className={classes.input}
              value={heading}
              placeholder="Enter The Main Header"
              onChange={handleHeadingChange}
            />
          </div>
          <div className={`d-flex flex-row ${classes.dueDate}`}>
            <DueDate />
          </div>
        </div>
        <div className=" px-5 m-5">
          <div className="d-flex flex-row">
            <div className={classes.btnDiv}>
              <button
                className={WriteVisible ? classes.active : classes.notActive}
                onClick={viewHandler}
              >
                Write
              </button>
              <button
                className={ViewVisible ? classes.active : classes.notActive}
                onClick={viewHandler}
              >
                View
              </button>
            </div>
            <div className={classes.dropdown}>
              <Dropdown
                className={classes.items}
                title={selectedItem}
                trigger="hover"
                onSelect={handleSelect}
              >
                <Dropdown.Item className={classes.items} eventKey="todo">to-do</Dropdown.Item>
                <Dropdown.Item eventKey="inProgress">In Progress</Dropdown.Item>
                <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
                <div className={classes.default}>
                  <p>Default: to-do</p>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="">
            <WriteNote view={WriteVisible} />
            <View view={ViewVisible} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note