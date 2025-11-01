import React, { useState, useEffect } from 'react';
import '../styles/CategorySection.css';
import api from '../utils/api';

const categories = [
  { id: 'central', name: 'Central Schemes', authority: 'central' },
  { id: 'state', name: 'State Schemes', authority: 'state' },
  { id: 'private', name: 'Private Schemes', authority: 'private' },
];

const occupations = {
  central: ['Student', 'Farmer', 'Business', 'Senior Citizen', 'Women'],
  state: ['Student', 'Farmer', 'Unemployed', 'Women', 'Senior Citizen'],
  private: ['Student', 'Startup', 'Small Business', 'Women Entrepreneur', 'Professional']
};

const states = [
  '', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Maharashtra', 'Delhi'
];

const CategorySection = () => {
  const [filters, setFilters] = useState({
    category: 'central',
    occupation: '',
    state: '',
    search: ''
  });
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSchemes();
    // eslint-disable-next-line
  }, [filters]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      let endpoint = '/schemes/get';
      let params = {};
      // Build hierarchy of endpoints for precision/responsiveness
      if (filters.category && !filters.occupation && !filters.state) {
        // Only category filter
        endpoint = `/schemes/category/${filters.category}`;
      }
      if (filters.category && (filters.occupation || filters.state)) {
        endpoint = '/schemes/authoritycategory';
        params = {
          authority: filters.category,
          state: filters.state || undefined,
          category: filters.occupation || undefined,
        };
      }
      if (filters.category === 'central' && !filters.occupation && !filters.state) {
        endpoint = '/schemes/get';
        params = {};
      }
      // Make request and set data
      const res = await api.get(endpoint, { params });
      let filtered = res.data || [];
      if (filters.search) {
        filtered = filtered.filter(s => s.name?.toLowerCase().includes(filters.search.toLowerCase()));
      }
      setSchemes(filtered);
    } catch (e) {
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => {
      // Reset dependent filters as appropriate
      if (field === 'category') {
        return { ...prev, category: value, occupation: '', state: '', search: '' };
      }
      if (field === 'occupation') {
        return { ...prev, occupation: value };
      }
      if (field === 'state') {
        return { ...prev, state: value };
      }
      if (field === 'search') {
        return { ...prev, search: value };
      }
      return prev;
    });
  };

  return (
    <section className="category-explorer-main">
      <aside className="category-sidebar">
        <h2>Filters</h2>
        <div className="filter-group">
          <label>Scheme Category</label>
          <div className="filter-btns-vertical">
            {categories.map(c => (
              <button
                key={c.id}
                className={`side-category-btn${filters.category === c.id ? ' active' : ''}`}
                onClick={() => handleFilterChange('category', c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>Occupation</label>
          <select
            value={filters.occupation}
            onChange={e => handleFilterChange('occupation', e.target.value)}
            disabled={!filters.category}
          >
            <option value="">All</option>
            {(occupations[filters.category] || []).map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>State</label>
          <select value={filters.state} onChange={e => handleFilterChange('state', e.target.value)}>
            <option value="">All States</option>
            {states.map(state => (
              state && <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Search by name</label>
          <input
            type="text"
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            placeholder="Ex: Kisan..."
          />
        </div>
      </aside>
      <main className="scheme-results-area">
        <h2 className="results-title">Schemes</h2>
        {loading ? (
          <div>Loading schemes...</div>
        ) : schemes.length === 0 ? (
          <div>No schemes match your filters.</div>
        ) : (
          <div className="schemes-list">
            {schemes.map(scheme => (
              <div className="scheme-card" key={scheme._id || scheme.id}>
                <h3>{scheme.name}</h3>
                <p><b>Category:</b> {scheme.category || scheme.occupation}</p>
                <p><b>State:</b> {scheme.state || 'All'}</p>
                <p><b>Authority:</b> {scheme.authority || filters.category}</p>
                <p className="scheme-description">{scheme.description || 'No description.'}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </section>
  );
};
export default CategorySection;
