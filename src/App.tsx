import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Write from "./components/pages/Write";
import Home from "./components/pages/Home";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </Router>
    </div>
  );
}
