import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate('/dashboard')}><span className = "logoname">S</span>WIFT</h2>
      <div className="profile" onClick={() => navigate('/profile')}>
        <span className="initials">EH</span>
        <span className="name">Ervin Howell</span>
      </div>
    </nav>
  );
};

export default Navbar;
