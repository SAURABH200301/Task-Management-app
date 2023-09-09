import PropTypes from "prop-types";
import CardItem from "./CardItem";
import classes from "./ContainerCards.module.css";
const ContainerCards = (props) => {
  const {
    items = [],
    status,
    isDragging,
    handleDragging,
    handleUpdateList,
  } = props;
  const handleDrop = (e) => {
    e.preventDefault();
    handleUpdateList(e.dataTransfer.getData("text"), status);
    handleDragging(false);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className={`${classes.layoutCards} ${
        isDragging ? classes.layoutDragging : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <p>{status} </p>
      {items.map(
        (item) =>
          status === item.status && (
            <CardItem
              data={item}
              key={item._id}
              handleDragging={handleDragging}
            />
          )
      )}
    </div>
  );
};

ContainerCards.propTypes = {
  items: PropTypes.array,
  status: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  handleDragging: PropTypes.func.isRequired,
  handleUpdateList: PropTypes.func.isRequired,
};

export default ContainerCards;
