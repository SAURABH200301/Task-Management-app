import classes from './NoteBubble.module.css'

function NoteBubble(prop) { 
    const {createdAt,createdBy,description,dueDate,status,title}=prop.task;
    console.log(createdAt,createdBy,description,dueDate,status,title);
  return (
    <div className={classes.main}>hey</div>
  )
}

export default NoteBubble