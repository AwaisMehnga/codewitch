import Navbar from "./pages/components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AI from "./pages/AI";
import Developer from "./pages/Developer";

function App() {
  return (
    <Router>
      <main className="main-content">
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/developer" element={<Developer />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
