import  { useState } from "react";
import { DatePicker } from 'rsuite';

import "react-datepicker/dist/react-datepicker.css";


const DueDate = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const styles = { width: 200, display: 'block', marginBottom: 10 };
  const DateHandler=(date)=>{
    setDueDate(date);
  }
  console.log(dueDate)
  return (
    <DatePicker onChange={DateHandler} size="xs" placeholder="select end date" style={styles} />
  );
};

export default DueDate;