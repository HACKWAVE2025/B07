import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Test component to check if routing works
const TestComponent = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1>SchemeConnect</h1>
    <p>If you can see this, React is working!</p>
    <p>Now checking if components load properly...</p>
  </div>
);

// Components
const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="/">
        <span style={{ color: '#FF671F' }}>Scheme</span>Connect
      </a>
    </div>
  </nav>
);

function App() {
  // State for handling scroll behavior
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log('Current path:', location.pathname);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, location]);

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/test" element={<TestComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
