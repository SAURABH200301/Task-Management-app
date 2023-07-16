

export const fetchNotes = async () => {
  let DataPresent = true;
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:5000/api/task/fetchtasks", {
      method: "GET",
      headers: {
        authorization: token,
      },
    });
    const resp = await response.json();
    if (resp.tasks.length === 0) {
      DataPresent = false;
    }
    const sortedTasks = resp.tasks.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
    return { sortedTasks, DataPresent };
  } catch (e) {
    console.log(e);
  }
};


export async function fetchUsername() {
  const res = await fetch("http://localhost:5000/api/auth/getuser", {
    method: "POST",
    headers: {
      "auth-token": localStorage.getItem("token").toString(),
    },
  });
  const data = await res.json();
  const Id = data._id;
  return Id;
}
