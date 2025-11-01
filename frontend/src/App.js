import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import CategorySection from './components/CategorySection';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <section className="carousel-section">
          <Carousel />
        </section>
        <CategorySection />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
