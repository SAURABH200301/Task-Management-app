import { useEffect, useState } from "react";
import { fetchNotes } from "../API/NotesAPI";

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    async function fetching() {
      const data = await fetchNotes();
      setListItems(data.sortedTasks);
    }
    fetching();
  }, []);

  const UpdateNotes = async (card, stats, id) => {
    try {
      const response = await fetch("http://localhost:5000/api/task/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          taskId: id,
          authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: card.title,
          description: card.description,
          status: stats,
          dueDate: card.dueDate,
          createdBy: card.createdBy,
        }),
      });
      response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateList = async (id, status) => {
    let card = listItems.find((item) => item._id === id);
    if (card && card.status !== status) {
      card.status = status;
      if (Array.isArray(listItems)) {
        setListItems((prev) => [...prev.filter((item) => item.id !== id)]);
      }
    }
    await UpdateNotes(card, status, id);
  };

  const handleDragging = (dragging) => setIsDragging(dragging);

  return {
    isDragging,
    listItems,
    handleUpdateList,
    handleDragging,
  };
};
