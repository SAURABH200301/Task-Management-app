import PropTypes from "prop-types";
import classes from "./CardItem.module.css";
import { useNavigate } from "react-router-dom";
import remove from "../assets/remove.png";
import update from "../assets/update.png";


const CardItem = (props) => {
  const { data, handleDragging } = props;
  // console.log(data)
  const history = useNavigate();

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text", `${data._id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  const handleClick = () => {
    const location = `/home/${data._id}`;
    history(location);
  };

  const URl = `http://localhost:5000/api/task/tasks/${data._id}`;
  const handleDelete = async () => {
    try {
      const res = await fetch(URl, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("token").toString(),
        },
      });
      const datas = await res.json();
      if (datas.success) {
        console.log(datas.message);
      } else {
        console.log(datas.message);
      }
    } catch (e) {
      console.log(e);
    }
    location.reload(true);
  };

  return (
    <div
      className={`${classes.cardContainer}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <h4 className="text-center">{data.title}</h4>
      <div className="w-100 border"></div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
      <div className={classes.footer}>
        <button onClick={handleDelete} className={classes.btn}>
          <img className={classes.icon} src={remove} alt="delete icon" />
        </button>

        <button onClick={handleClick} className={classes.btn}>
          <img className={classes.icon} src={update} alt="update icon" />
        </button>
      </div>
    </div>
  );
};

CardItem.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  handleDragging: PropTypes.func.isRequired,
};

export default CardItem;
