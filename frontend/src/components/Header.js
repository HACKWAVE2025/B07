import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="scheme">Scheme</span>
          <span className="connect">Connect</span>
        </Link>
      </div>
      <div className="header-right">
        <div className="search-container">
          <input type="text" placeholder={('search_placeholder')} className="search-input" />
          <button className="search-button">{('search_button')}</button>
        </div>
        {isLoggedIn ? (
          <button className="auth-button" onClick={() => setIsLoggedIn(false)}>Logout</button>
        ) : (
          <Link to="/login" className="auth-button">Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
