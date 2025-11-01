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
  const [currentRoute, setCurrentRoute] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchemes();
    // eslint-disable-next-line
  }, [filters]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      let endpoint = '/schemes/get';
      let params = {};
      let routeLabel = '/api/schemes/get';

      // Determine which endpoint to use based on filters
      // Frontend "category" maps to backend "authority"
      // Frontend "occupation" maps to backend "category"
      
      const hasAuthority = filters.category && filters.category !== '';
      const hasState = filters.state && filters.state !== '';
      const hasOccupation = filters.occupation && filters.occupation !== '';

      if (hasAuthority && (hasOccupation || hasState)) {
        // Use authoritycategory endpoint when authority + category/state are selected
        endpoint = '/schemes/authoritycategory';
        params = {
          authority: filters.category,
        };
        if (hasState) params.state = filters.state;
        if (hasOccupation) params.category = filters.occupation;
        
        const queryString = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
        routeLabel = `/api/schemes/authoritycategory?${queryString}`;
      } else if (hasAuthority) {
        // Use authority endpoint when only authority is selected
        endpoint = '/schemes/authority';
        params = {
          authority: filters.category,
        };
        routeLabel = `/api/schemes/authority?authority=${filters.category}`;
      } else if (hasOccupation && !hasAuthority) {
        // If only occupation is selected, use category endpoint
        endpoint = `/schemes/category/${filters.occupation}`;
        routeLabel = `/api/schemes/category/${filters.occupation}`;
      } else {
        // Default: get all schemes
        endpoint = '/schemes/get';
        routeLabel = '/api/schemes/get';
        params = {};
      }

      setCurrentRoute(routeLabel);

      const res = await api.get(endpoint, { params });
      
      // Handle response - backend returns array directly
      let schemesData = res.data;
      if (!Array.isArray(schemesData)) {
        schemesData = [];
      }
      
      // Apply search filter on client side
      let filtered = schemesData;
      if (filters.search && filters.search.trim() !== '') {
        filtered = schemesData.filter(s => 
          s.name?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setSchemes(filtered);
      setError('');
    } catch (e) {
      console.error('Error fetching schemes:', e);
      setSchemes([]);
      setError(e.response?.data?.message || e.message || 'Failed to fetch schemes. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => {
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
        <div style={{marginBottom: '1rem'}}>
          <span style={{fontSize: '0.96rem', color: '#666'}}>Route Used: <span style={{fontFamily: 'monospace', color: '#06038D'}}>{currentRoute}</span></span>
        </div>
        <h2 className="results-title">Schemes</h2>
        {error && (
          <div style={{padding: '1rem', background: '#fff0f0', border: '1px solid #f5c2c2', borderRadius: '6px', color: '#a00', marginBottom: '1rem'}}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{padding: '2rem', textAlign: 'center'}}>Loading schemes...</div>
        ) : schemes.length === 0 ? (
          <div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>
            No schemes match your filters.
            {!loading && <div style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>Try adjusting your filters or check if the backend is running.</div>}
          </div>
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
