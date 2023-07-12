import { useState } from "react";
import DueDate from "./DueDate";
import NoteNavbar from "./NoteNavbar";
import classes from "./home.module.css";
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
function Home() {
  const [heading, setHeading] = useState("");
  const day = new Date();
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();
  
  const handleHeadingChange = (event) => {
    setHeading(event.target.value);
  };
  return (
    <div>
      <NoteNavbar />
      <div className="border m-5">
        <div className="border m-5 p-3 d-flex justify-content-around">
          <div className={` ${classes.date}`}>
            {date}-{months[month + 1]}-{year}
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
        <div>body</div>
      </div>
    </div>
  );
}

export default Home;
