import React, { useState, useEffect } from 'react';
import '../styles/CategorySection.css';
import api from '../utils/api';
import ReminderModal from './ReminderModal';

const categories = [
  { id: 'central', name: 'Central Schemes', authority: 'central' },
  { id: 'state', name: 'State Schemes', authority: 'state' },
  { id: 'private', name: 'Private Schemes', authority: 'private' },
];

// Map frontend occupation display names to backend category enum values
const occupationToCategoryMap = {
  'Student': 'student',
  'Farmer': 'farmer',
  'Business': 'business',
  'Senior Citizen': 'welfare',
  'Women': 'women',
  'Startup': 'startup',
  'Small Business': 'business',
  'Women Entrepreneur': 'women',
  'Professional': 'other',
  'Unemployed': 'welfare'
};

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
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  useEffect(() => {
    fetchSchemes();
    // eslint-disable-next-line
  }, [filters]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      let endpoint = '/schemes/authoritycategory';
      let params = {};
      
      // Determine which endpoint to use based on filters
      if (filters.occupation && filters.occupation !== '') {
        // Use authoritycategory endpoint when category filter is applied
        params.authority = filters.category;
        // Map occupation to backend category enum value
        params.category = occupationToCategoryMap[filters.occupation] || filters.occupation.toLowerCase();
      } else {
        // Use authority endpoint when only authority (and optionally state) is filtered
        endpoint = '/schemes/authority';
        params.authority = filters.category;
      }
      
      // Add state filter if provided
      if (filters.state && filters.state !== '') {
        params.state = filters.state;
      }
      
      // Make request and set data
      const res = await api.get(endpoint, { params });
      let filtered = res.data || [];
      
      // Apply search filter on client side
      if (filters.search) {
        filtered = filtered.filter(s => s.name?.toLowerCase().includes(filters.search.toLowerCase()));
      }
      
      setSchemes(filtered);
    } catch (e) {
      console.error('Error fetching schemes:', e);
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

  const handleBellClick = (e, scheme) => {
    e.stopPropagation();
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please login to set reminders.');
      return;
    }
    setSelectedScheme(scheme);
    setReminderModalOpen(true);
  };

  const handleCreateReminder = async (reminderDate) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.id) {
      throw new Error('User not found. Please login again.');
    }

    try {
      const reminderData = {
        userId: currentUser.id,
        schemeId: selectedScheme._id || selectedScheme.id,
        type: 'email',
        reminderDate: reminderDate
      };

      const response = await api.post('/reminders/create', reminderData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create reminder';
      throw new Error(errorMessage);
    }
  };

  const handleSchemeNameClick = (scheme) => {
    if (scheme.applyLink) {
      window.open(scheme.applyLink, '_blank', 'noopener,noreferrer');
    }
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
                <button 
                  className="scheme-bell-icon" 
                  onClick={(e) => handleBellClick(e, scheme)}
                  title="Set Reminder"
                >
                  🔔
                </button>
                <h3 
                  onClick={() => handleSchemeNameClick(scheme)}
                  className={scheme.applyLink ? 'scheme-name-link' : ''}
                  title={scheme.applyLink ? 'Click to open application link' : ''}
                >
                  {scheme.name}
                </h3>
                <p><b>Category:</b> {scheme.category || 'N/A'}</p>
                <p><b>State:</b> {scheme.state || 'All'}</p>
                <p><b>Authority:</b> {scheme.authority || 'N/A'}</p>
                <p className="scheme-description">{scheme.description || 'No description.'}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <ReminderModal
        isOpen={reminderModalOpen}
        onClose={() => {
          setReminderModalOpen(false);
          setSelectedScheme(null);
        }}
        scheme={selectedScheme}
        onCreateReminder={handleCreateReminder}
      />
    </section>
  );
};
export default CategorySection;
