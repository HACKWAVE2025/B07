import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, FormControl } from 'react-bootstrap';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn, scrolled }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logout logic can be added here
  };

  return (
    <Navbar expand="lg" className={scrolled ? 'scrolled' : ''} fixed="top">
      <Container>
        <Link to="/" className="navbar-brand logo">
          <span style={{ color: '#FF671F' }}>Scheme</span>Connect
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" onSubmit={handleSearch}>
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search schemes..."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-primary" type="submit">
                <FaSearch />
              </Button>
            </div>
          </Form>
          
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
            
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUser className="me-1" /> Profile
                </Nav.Link>
                <Button 
                  variant="outline-primary" 
                  className="ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="primary" 
                className="ms-2"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
