import React, { useState, useEffect, useContext } from 'react';
import '../styles/CategorySection.css';
import api from '../utils/api';
import { LanguageContext } from '../context/LanguageContext';
import ReminderModal from './ReminderModal';

const categories = [
  { id: 'central', authority: 'central' },
  { id: 'state', authority: 'state' },
  { id: 'private', authority: 'private' },
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
  const [currentRoute, setCurrentRoute] = useState('');
  const [error, setError] = useState('');
  const { t, language } = useContext(LanguageContext);

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
          <label>{t('category.schemeCategory')}</label>
          <div className="filter-btns-vertical">
            {categories.map(c => (
              <button
                key={c.id}
                className={`side-category-btn${filters.category === c.id ? ' active' : ''}`}
                onClick={() => handleFilterChange('category', c.id)}
              >
                {t(`category.${c.id}`)}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <label>{t('category.occupation')}</label>
          <select
            value={filters.occupation}
            onChange={e => handleFilterChange('occupation', e.target.value)}
            disabled={!filters.category}
          >
            <option value="">{t('category.all')}</option>
            {(occupations[filters.category] || []).map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('category.stateLabel')}</label>
          <select value={filters.state} onChange={e => handleFilterChange('state', e.target.value)}>
            <option value="">{t('category.allStates')}</option>
            {states.map(state => (
              state && <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('category.searchByName')}</label>
          <input
            type="text"
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
            placeholder={t('category.searchPlaceholderExample')}
          />
        </div>
      </aside>
      <main className="scheme-results-area">
        <div style={{marginBottom: '1rem'}}>
          <span style={{fontSize: '0.96rem', color: '#666'}}>{t('category.routeUsed')}: <span style={{fontFamily: 'monospace', color: '#06038D'}}>{currentRoute}</span></span>
        </div>
        <h2 className="results-title">{t('category.schemes')}</h2>
        {error && (
          <div style={{padding: '1rem', background: '#fff0f0', border: '1px solid #f5c2c2', borderRadius: '6px', color: '#a00', marginBottom: '1rem'}}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{padding: '2rem', textAlign: 'center'}}>{t('category.loading')}</div>
        ) : schemes.length === 0 ? (
          <div style={{padding: '2rem', textAlign: 'center', color: '#666'}}>
            {t('category.noMatchingSchemes')}
            {!loading && <div style={{marginTop: '0.5rem', fontSize: '0.9rem'}}>{t('category.adjustFilters')}</div>}
          </div>
        ) : (
          <div className="schemes-list">
            {schemes.map(scheme => {
              const schemeName = (language === 'hi' && (scheme.name_hi || scheme.name_hindi)) 
                ? (scheme.name_hi || scheme.name_hindi) 
                : (language === 'te' && scheme.name_te) 
                  ? scheme.name_te 
                  : (scheme.name || scheme.title);

              const schemeDescription = (language === 'hi' && (scheme.description_hi || scheme.description_hindi))
                ? (scheme.description_hi || scheme.description_hindi)
                : (language === 'te' && scheme.description_te)
                  ? scheme.description_te
                  : (scheme.description || t('category.noDescription'));

              return (
                <div className="scheme-card" key={scheme._id || scheme.id}>
                  <h3 
                    onClick={() => handleSchemeNameClick(scheme)}
                    className={scheme.applyLink ? 'scheme-name-link' : ''}
                    title={scheme.applyLink ? t('category.clickToApply') : ''}
                  >
                    {schemeName}
                  </h3>
                  <p><b>{t('category.categoryLabel')}:</b> {scheme.category || scheme.occupation || t('category.notAvailable')}</p>
                  <p><b>{t('category.stateLabel')}:</b> {scheme.state || t('category.all')}</p>
                  <p><b>{t('category.authority')}:</b> {scheme.authority || filters.category || t('category.notAvailable')}</p>
                  <p className="scheme-description">{schemeDescription}</p>
                  <button 
                    className="scheme-bell-icon" 
                    onClick={(e) => handleBellClick(e, scheme)}
                    title={t('category.setReminder')}
                  >
                    🔔
                  </button>
                </div>
              );
            })}
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
