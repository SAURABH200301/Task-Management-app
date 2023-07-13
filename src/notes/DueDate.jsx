import { useEffect, useState } from 'react';
import { DatePicker } from 'rsuite';
import { useDispatch } from 'react-redux';
import { notesActions } from '../store/notes-slice';
import 'react-datepicker/dist/react-datepicker.css';

const DueDate = () => {
  const [dueDate, setDueDate] = useState(new Date());
  const styles = { width: 200, display: 'block', marginBottom: 10 };
  const dispatch = useDispatch();
  
  const DateHandler = (date) => {
    setDueDate(date);
  };
  const dueDateTimestamp = dueDate.getTime();
  useEffect(() => {
    dispatch(
      notesActions.addDueDate({
        dueDate: dueDateTimestamp,
      }),
    );
  }, [dispatch, dueDateTimestamp]);


  return (
    <DatePicker onChange={DateHandler} size="xs" placeholder="select end date" style={styles} />
  );
};

export default DueDate;
