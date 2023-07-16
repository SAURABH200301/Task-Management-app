import "./App.css";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./notes/home";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path="/" Component={Hero} />
        <Route exact path="/home/*" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
