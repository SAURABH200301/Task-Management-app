import { useEffect, useState } from "react";
import { DatePicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { notesActions } from "../store/notes-slice";
import "react-datepicker/dist/react-datepicker.css";

const DueDate = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const [placeHolder, setPlaceHolder] = useState("Select Date");
  const prevDate=useSelector((state)=>state.notes.dueDate);
  const styles = { width: 200, display: "block", marginBottom: 10 };
  const dispatch = useDispatch();

  useEffect(() => {
    if(prevDate!==undefined){
      const date=new Date(prevDate)
      const year = date.getFullYear(); // Extract the year (e.g., 2023)
      const month = date.getMonth() + 1; // Extract the month (returns 0-11, so adding 1 to get 1-12)
      const day = date.getDate();
      setPlaceHolder((year+'-'+month+'-'+day).toString())
    }
    
  }, [prevDate]);

  const DateHandler = (date) => {
    setDueDate(date);
  };

  const dueDateTimestamp = dueDate.getTime();

  useEffect(() => {
    dispatch(notesActions.addDueDate({ dueDate: dueDateTimestamp }));
  }, [dispatch, dueDateTimestamp]);

  return (
    <DatePicker
      onChange={DateHandler}
      size="xs"
      placeholder={placeHolder}
      style={styles}
    />
  );
};

export default DueDate;
