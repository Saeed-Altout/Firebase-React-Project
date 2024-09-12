import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Write from "./components/pages/Write";
import Read from "./components/pages/Read";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/read" element={<Read />} />
        </Routes>
      </Router>
    </div>
  );
}
