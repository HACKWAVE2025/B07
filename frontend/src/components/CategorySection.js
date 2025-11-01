import React, { useState } from 'react';
import '../styles/CategorySection.css';

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = [
    { id: 'central', name: 'Central Schemes' },
    { id: 'state', name: 'State Schemes' },
    { id: 'private', name: 'Private Schemes' }
  ];

  const occupations = {
    central: ['Student', 'Farmer', 'Business', 'Senior Citizen', 'Women'],
    state: ['Student', 'Farmer', 'Unemployed', 'Women', 'Senior Citizen'],
    private: ['Student', 'Startup', 'Small Business', 'Women Entrepreneur', 'Professional']
  };

  return (
    <section className="category-section">
      <h2>Explore Schemes by Category</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="occupation-section">
          <h3>Select Your Occupation</h3>
          <div className="occupation-buttons">
            {occupations[selectedCategory].map((occupation, index) => (
              <button key={index} className="occupation-btn">
                {occupation}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
