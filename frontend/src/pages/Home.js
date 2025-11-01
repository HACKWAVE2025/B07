import React, { useState } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      image: 'http://abhayapuricollege.in/wp-content/uploads/2024/09/Rythu-Bandhu-Scheme.webp',
      title: 'Discover Government Schemes',
      description: 'Find the perfect scheme that matches your needs and eligibility.'
    },
    {
      id: 2,
      image: 'https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/pmkvy-scheme.jpg',
      title: 'Skill Development Programs',
      description: 'Enhance your skills with various government and private schemes.'
    },
    {
      id: 3,
      image: 'https://www.iasgyan.in/ig-uploads/images/PM_Surya_Ghar_Muft_Bijli_Yojana.jpg',
      title: 'Sustainable Energy Solutions',
      description: 'Explore schemes for sustainable living and energy efficiency.'
    },
    {
      id: 4,
      image: 'https://tfipost.com/wp-content/uploads/2022/12/Ayushman-Bharat-1.jpg',
      title: 'Healthcare for All',
      description: 'Access healthcare schemes for you and your family.'
    }
  ];

  const categories = [
    {
      id: 1,
      title: 'Central Government Schemes',
      description: 'Explore various schemes launched by the central government for different sectors.',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      link: '/central-schemes'
    },
    {
      id: 2,
      title: 'State Government Schemes',
      description: 'Find state-specific schemes and programs available in your region.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
      link: '/state-schemes'
    },
    {
      id: 3,
      title: 'Private Sector Schemes',
      description: 'Discover schemes and offers from private organizations and institutions.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3b57d1d2d49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      link: '/private-schemes'
    }
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero">
        <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false}>
          {carouselItems.map((item) => (
            <Carousel.Item key={item.id}>
              <div 
                className="d-block w-100" 
                style={{
                  height: '80vh',
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  padding: '0 15%'
                }}
              >
                <div>
                  <h1>{item.title}</h1>
                  <p className="lead">{item.description}</p>
                  <Button variant="primary" size="lg" className="mt-3">
                    Explore Now
                  </Button>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        
        {/* Custom Carousel Indicators */}
        <div className="carousel-indicators-container">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <Container>
          <div className="section-title">
            <h2>Explore Schemes by Category</h2>
            <p>Find the perfect scheme that matches your needs and eligibility</p>
          </div>
          
          <Row className="g-4">
            {categories.map((category) => (
              <Col key={category.id} md={4}>
                <Card className="h-100 category-card">
                  <Card.Img 
                    variant="top" 
                    src={category.image} 
                    alt={category.title}
                    className="category-img"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="category-title">{category.title}</Card.Title>
                    <Card.Text className="category-text">
                      {category.description}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={category.link} 
                      variant="primary" 
                      className="mt-auto align-self-start"
                    >
                      View Schemes
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
