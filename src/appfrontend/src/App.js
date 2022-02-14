import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Page from "./pages/Page";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Page />} />
          <Route exact path="/dashBoard" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
