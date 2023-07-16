import NoteNavbar from "./NoteNavbar";
import Note from "./Note";
import { Route, Routes } from "react-router-dom";
import AllNotes from "./AllNotes";
import Update from "./Update";

function Home() {
  return (
    <div>
      <div>
        <NoteNavbar />
      </div>
      <Routes>
        <Route exact path="/" Component={Note} />
        <Route exact path="/notes" Component={AllNotes} />
        <Route exact path="/:_id" Component={Update}/>
      </Routes>
    </div>
  );
}

export default Home;
