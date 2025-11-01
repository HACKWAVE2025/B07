import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'http://abhayapuricollege.in/wp-content/uploads/2024/09/Rythu-Bandhu-Scheme.webp',
      alt: 'Rythu Bandhu Scheme'
    },
    {
      image: 'https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/pmkvy-scheme.jpg',
      alt: 'PMKVY Scheme'
    },
    {
      image: 'https://tfipost.com/wp-content/uploads/2022/12/Ayushman-Bharat-1.jpg',
      alt: 'Ayushman Bharat'
    },
    {
      image: 'https://www.iasgyan.in/ig-uploads/images/PM_Surya_Ghar_Muft_Bijli_Yojana.jpg',
      alt: 'PM Surya Ghar Muft Bijli Yojana'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="carousel">
      <div 
        className="slides" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img 
              src={slide.image} 
              alt={slide.alt} 
              className="slide-image"
            />
          </div>
        ))}
      </div>
      <div className="indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
