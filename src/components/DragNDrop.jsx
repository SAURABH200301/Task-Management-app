import { useDragAndDrop } from "../hooks/useDragAndDrop";
import ContainerCards from "./ContainerCards";
import classes from "./DragNDrop.module.css";

const typesHero = ["todo", "inProgress", "completed"];

export const DragNDrop = () => {
  const { isDragging, listItems, handleDragging, handleUpdateList } =
    useDragAndDrop();
  return (
    <div className="p-4">
      <div className="d-flex justify-content-center"><h2> All Notes</h2></div>
      <div className={classes.grid}>
        {typesHero.map((container) => (
          <ContainerCards
            items={listItems}
            status={container}
            key={container}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdateList={handleUpdateList}
          />
        ))}
      </div>
    </div>
  );
};
