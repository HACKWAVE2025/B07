import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import { LanguageContext } from '../context/LanguageContext';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();
  const { t, setLanguage, language } = useContext(LanguageContext);

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
          <input type="text" placeholder={t('header.searchPlaceholder')} className="search-input" />
          <button className="search-button">{t('header.searchButton')}</button>
        </div>
        {user ? (
          <div className="user-section">
            <select
              aria-label="Select language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ marginRight: 12, padding: '0.35rem 0.5rem', borderRadius: 6 }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
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
                    style={{ padding: '0.75rem 1.5rem', display: 'block', color: '#06038D', borderBottom: '1px solid #eee', textDecoration: 'none', fontWeight: 500 }}
                    onClick={() => { setDropdownOpen(false); alert(t('header.profileSettings') + ' coming soon.'); }}
                  >
                    {t('header.profileSettings')}
                  </Link>
                  <button
                    className="profile-dropdown-item"
                    onClick={handleLogout}
                  >
                    {t('header.logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="auth-section">
            <Link to="/login" className="auth-button">{t('header.signIn')}</Link>
            <select
              aria-label="Select language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ marginLeft: 12, padding: '0.35rem 0.5rem', borderRadius: 6 }}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
