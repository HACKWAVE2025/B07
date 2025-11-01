import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  // Check for user on mount and when route changes (e.g., after login)
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      const currentUser = localStorage.getItem('currentUser');
      if (token && currentUser) {
        try {
          setUser(JSON.parse(currentUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Check immediately and on route changes (catches login redirects)
    checkUser();
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setUser(null);
    setDropdownOpen(false);
    navigate('/');
    window.location.reload(); // Ensures state resets for full logout
  };

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
        {user ? (
          <div className="profile-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="profile-trigger"
              onClick={() => setDropdownOpen((open) => !open)}
            >
              {user.name ? user.name.split(' ')[0] : user.email}
              <span className="dropdown-arrow">▼</span>
            </button>
            {dropdownOpen && (
              <div className="profile-dropdown">
                <Link
                  to="#"
                  className="profile-dropdown-item"
                  onClick={() => { setDropdownOpen(false); alert('Profile Settings coming soon.'); }}
                >
                  Profile Settings
                </Link>
                <button
                  className="profile-dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="auth-button">Sign In</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
