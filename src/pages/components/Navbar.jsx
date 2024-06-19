import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

export default function Navbar() {
  const [isNavOpen, setisNavOpen] = useState(false);
  return (
    <div className="navbar">
      <div className="logo">CodeWitch</div>
      <div className="Menu">
        <NavLink className="link" to="/" href="">
          Home
        </NavLink>
        <NavLink className="link" to="/ai" href="">
          AI
        </NavLink>
        <NavLink className="link" to="/developer" href="">
          Developer
        </NavLink>
      </div>
      <div onClick={() => setisNavOpen(!isNavOpen)} className="navbar-burger">
        {isNavOpen ? <span>X</span> : <span>&#9776;</span>}
      </div>
      {isNavOpen && (
        <div className="navbar-responsive">
          <div className="Menu">
            <NavLink className="link" to="/" href="">
              Home
            </NavLink>
            <NavLink className="link" to="/ai" href="">
              AI
            </NavLink>
            <NavLink className="link" to="/developer" href="">
              Developer
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
