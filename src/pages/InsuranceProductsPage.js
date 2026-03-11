import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaCheck, FaHeartbeat, FaMobileAlt, FaShoppingCart, FaUserShield } from 'react-icons/fa';
import './InsuranceProductsPage.css';

function InsuranceProductsPage({ onComplete, userProfile, onLogin, registerUser }) {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Health Insurance');
  const [expandedTerms, setExpandedTerms] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [accountForm, setAccountForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // ===================== HEALTH INSURANCE =====================
  const healthPlans = [
    {
      id: 'health-basic',
      label: 'Basic',
      name: 'Health Basic',
      price: 99,
      coverage: '₹1 Lakh',
      features: [
        'Hospitalization coverage',
        'Cashless treatment network',
        'Ambulance services',
        'Standard ward room'
      ],
      termsAndConditions: 'Waiting period: 30 days. Pre-existing diseases covered after 2 years. Annual health checkup included.',
      badge: null,
      buttonText: 'Get Started',
    },
    {
      id: 'health-standard',
      label: 'Standard',
      name: 'Health Standard',
      price: 199,
      coverage: '₹3 Lakh',
      features: [
        'Hospitalization + ICU coverage',
        'OPD consultation services',
        'Preventive health checkups',
        'Cashless network across 1000+ hospitals',
        'Maternity benefits (post-waiting period)'
      ],
      termsAndConditions: 'Waiting period: 30 days (7 days for accidents). Pre-existing diseases covered after 2 years. Maternity benefits after 12 months of continuous coverage.',
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      featured: true,
    },
    {
      id: 'health-premium',
      label: 'Premium',
      name: 'Health Premium',
      price: 299,
      coverage: '₹5 Lakh',
      features: [
        'Global cashless network access',
        'Priority OPD services',
        'Comprehensive ICU coverage',
        'Preventive care + annual wellness programs',
        'Maternity & newborn benefits',
        'Organ transplant coverage'
      ],
      termsAndConditions: 'No waiting period for accidents. Pre-existing diseases covered after 1 year. Unlimited OPD benefits. Maternity benefits inclusive. No sub-limits on major treatments.',
      badge: 'Best Value',
      buttonText: 'Go Premium',
    },
  ];

  // ===================== GADGET INSURANCE =====================
  const gadgetPlans = [
    {
      id: 'gadget-basic',
      label: 'Basic',
      name: 'Gadget Basic',
      price: 49,
      coverage: 'Up to ₹30,000',
      features: [
        'Screen damage protection',
        'Accidental damage coverage',
        'Single claim per year',
        'Device age eligibility: 0-5 years'
      ],
      termsAndConditions: 'Claim limit: ₹2,500 per claim. Device must be less than 5 years old. Ineligible: water damage, wear & tear. Claim process: 10-14 days.',
      badge: null,
      buttonText: 'Get Started',
    },
    {
      id: 'gadget-standard',
      label: 'Standard',
      name: 'Gadget Standard',
      price: 79,
      coverage: 'Up to ₹50,000',
      features: [
        'Screen & accidental damage protection',
        'Liquid damage protection',
        'Theft protection',
        'Up to 2 claims per year',
        'Worldwide coverage'
      ],
      termsAndConditions: 'Claim limit: ₹5,000 per claim. Device eligibility: 0-6 years old. Liquid damage covered after 30-day waiting period. Replacement of unfixable devices available.',
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      featured: true,
    },
    {
      id: 'gadget-premium',
      label: 'Premium',
      name: 'Gadget Premium',
      price: 129,
      coverage: 'Up to ₹100,000',
      features: [
        'Comprehensive accidental damage',
        'Screen, liquid & theft protection',
        'Device replacement guarantee',
        'Unlimited claims (max 2 per incident)',
        'Extended warranty included',
        'Worldwide coverage + emergency support'
      ],
      termsAndConditions: 'Claim limit: ₹15,000 per claim. Device eligibility: 0-7 years old. No waiting period for accidental damage. Express replacement within 48 hours. Annual deductible: ₹500.',
      badge: 'Best Value',
      buttonText: 'Go Premium',
    },
  ];

  // ===================== MOTOR INSURANCE =====================
  const motorPlans = [
    {
      id: 'motor-basic',
      label: 'Basic',
      name: 'Motor Basic',
      price: 149,
      coverage: 'Liability only',
      features: [
        'Third-party liability coverage',
        'Legal liability protection',
        'Passenger liability',
        'Basic accident support'
      ],
      termsAndConditions: 'Mandatory legal requirement. Covers third-party claims only. No own-damage coverage. Vehicle inspection required. Valid for 1 year.',
      badge: null,
      buttonText: 'Get Started',
    },
    {
      id: 'motor-standard',
      label: 'Standard',
      name: 'Motor Standard',
      price: 249,
      coverage: 'Own + Third Party',
      features: [
        'Own damage & third-party coverage',
        'Roadside assistance 24/7',
        'Cashless garage network',
        'Personal accident cover',
        'Zero depreciation cover (Year 1-2)'
      ],
      termsAndConditions: 'Vehicles 0-15 years eligible. No depreciation deduction for first 2 years. Roadside assistance available across 500+ locations. Personal accident cover: ₹2 Lakh.',
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      featured: true,
    },
    {
      id: 'motor-premium',
      label: 'Premium',
      name: 'Motor Premium',
      price: 399,
      coverage: 'Complete Coverage',
      features: [
        'Own damage + third-party coverage',
        'Engine protection',
        'Zero depreciation (up to 5 years)',
        'Cashless garage network (1000+ outlets)',
        'Roadside assistance with emergency support',
        'Personal accident cover ₹5 Lakh',
        'OEM spare parts guarantee'
      ],
      termsAndConditions: 'Vehicles 0-20 years eligible. Engine protection covers engine damage from water/dust ingress. Zero depreciation up to 5 years. Accident forgiveness: 1 free claim. Vehicle inspection required.',
      badge: 'Best Value',
      buttonText: 'Go Premium',
    },
  ];

  // ===================== PERSONAL INSURANCE =====================
  const personalPlans = [
    {
      id: 'personal-basic',
      label: 'Basic',
      name: 'Personal Basic',
      price: 79,
      coverage: '₹10 Lakh',
      features: [
        'Accidental death benefit',
        'Permanent disability cover',
        'Temporary disability allowance',
        'Emergency assistance'
      ],
      termsAndConditions: 'Coverage age: 18-65 years. Benefit payable within 30 days of claim. Accidents only (excludes illnesses). Death benefit: ₹10 Lakh.',
      badge: null,
      buttonText: 'Get Started',
    },
    {
      id: 'personal-standard',
      label: 'Standard',
      name: 'Personal Standard',
      price: 149,
      coverage: '₹20 Lakh',
      features: [
        'Accidental death benefit',
        'Disability protection',
        'Income replacement (80% salary)',
        'Critical illness cover',
        'Family protection'
      ],
      termsAndConditions: 'Coverage age: 20-60 years. Waiting period for critical illness: 30 days. Income replacement for 24 months maximum. Policy review annually. Exclusions: pre-existing conditions.',
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      featured: true,
    },
    {
      id: 'personal-premium',
      label: 'Premium',
      name: 'Personal Premium',
      price: 249,
      coverage: '₹50 Lakh',
      features: [
        'Accidental death ₹50 Lakh',
        'Comprehensive disability protection',
        'Income replacement (100%)',
        'Critical illness + advanced illness cover',
        'Family protection & dependent benefits',
        'Emergency medical evacuation',
        'Rehabilitation assistance'
      ],
      termsAndConditions: 'Coverage age: 18-75 years. No waiting period for accident-related claims. Critical illness: 35+ conditions covered. Family benefit: 50% to spouse/children. Lifetime income protection option available.',
      badge: 'Best Value',
      buttonText: 'Go Premium',
    },
  ];

  // Combine all plans with their categories
  const allInsuranceCategories = [
    { name: 'Health Insurance', plans: healthPlans, icon: '🏥' },
    { name: 'Gadget Insurance', plans: gadgetPlans, icon: '📱' },
    { name: 'Motor Insurance', plans: motorPlans, icon: '🚗' },
    { name: 'Personal Insurance', plans: personalPlans, icon: '👤' },
  ];

  const activeCategoryData =
    allInsuranceCategories.find((c) => c.name === activeCategory) || allInsuranceCategories[0];

  const categoryIcons = {
    'Health Insurance': <FaHeartbeat />,
    'Gadget Insurance': <FaMobileAlt />,
    'Motor Insurance': <FaCar />,
    'Personal Insurance': <FaUserShield />,
  };

  // Flatten all plans for selection tracking
  const allPlans = [...healthPlans, ...gadgetPlans, ...motorPlans, ...personalPlans];

  const togglePlan = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId));
    } else {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  const toggleTerms = (planId) => {
    setExpandedTerms(expandedTerms === planId ? null : planId);
  };

  const handleCreateAccount = () => {
    setAccountError('');
    setShowAccountModal(true);
  };

  const updateAccountField = (field, value) => {
    setAccountForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitAccount = (e) => {
    e.preventDefault();
    setAccountError('');

    const fullName = accountForm.fullName.trim();
    const email = accountForm.email.trim();
    const password = accountForm.password;

    if (!fullName || !email || !password) {
      setAccountError('Please enter your name, email, and password.');
      return;
    }

    // Lightweight email sanity check.
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setAccountError('Please enter a valid email address.');
      return;
    }

    if (typeof registerUser === 'function') {
      registerUser(email, password);
    }

    if (typeof onLogin === 'function') {
      onLogin(email);
    }

    onComplete({
      selectedInsurances: selectedPlans,
      fullName,
      email,
    });

    setShowAccountModal(false);
    setAccountForm({ fullName: '', email: '', password: '' });
    navigate('/dashboard');
  };

  // Calculate total price from all selected plans
  const totalPrice = allPlans
    .filter((p) => selectedPlans.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const toSlug = (value) => value.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="insurance-products-page">
      <div className="pricing-container">
        <div className="pricing-header">
          <h1>Comprehensive Insurance Solutions</h1>
          <p>Explore tailored coverage options across all insurance categories</p>
        </div>

        <div className="category-tabs" role="tablist" aria-label="Insurance categories">
          {allInsuranceCategories.map((category) => {
            const isActive = category.name === activeCategory;
            const slug = toSlug(category.name);

            return (
              <button
                key={category.name}
                id={`tab-${slug}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${slug}`}
                tabIndex={isActive ? 0 : -1}
                className={`category-tab ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setExpandedTerms(null);
                }}
              >
                <span className="category-tab-icon" aria-hidden="true">
                  {categoryIcons[category.name]}
                </span>
                <span className="category-tab-label">{category.name}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${toSlug(activeCategory)}`}
          role="tabpanel"
          aria-labelledby={`tab-${toSlug(activeCategory)}`}
          className="category-panel"
          key={activeCategory}
        >
        {/* Render each insurance category as a separate section */}
        {allInsuranceCategories
          .filter((c) => c.name === activeCategory)
          .map((category, categoryIdx) => (
          <div key={categoryIdx} className="insurance-category-section">
            <div className="category-title">
              <span className="category-icon" aria-hidden="true">{categoryIcons[category.name]}</span>
              <h2>{category.name}</h2>
            </div>

            <div className="pricing-cards-wrapper">
              <div className="pricing-grid">
                {category.plans.map((product) => (
                  <div
                    key={product.id}
                    className={`pricing-card ${product.featured ? 'featured' : ''} ${selectedPlans.includes(product.id) ? 'selected' : ''}`}
                  >
                    {product.badge && (
                      <div className="pricing-badge">{product.badge}</div>
                    )}

                    <div className="plan-label">{product.label}</div>

                    <h3 className="plan-title">{product.name}</h3>

                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">{product.price}</span>
                      <span className="period">/month</span>
                    </div>

                    <div className="plan-coverage">
                      <p>Coverage <strong>{product.coverage}</strong></p>
                    </div>

                    <div className="features-list">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="feature-row">
                          <FaCheck className="feature-icon" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Terms and Conditions Expandable */}
                    <div className="terms-section">
                      <button
                        className="terms-toggle"
                        onClick={() => toggleTerms(product.id)}
                      >
                        {expandedTerms === product.id ? '▼ Hide Details' : '▶ Terms & Conditions'}
                      </button>
                      {expandedTerms === product.id && (
                        <div className="terms-content">
                          {product.termsAndConditions}
                        </div>
                      )}
                    </div>

                    <button
                      className={`plan-button ${selectedPlans.includes(product.id) ? 'selected' : ''}`}
                      onClick={() => togglePlan(product.id)}
                    >
                      {selectedPlans.includes(product.id) ? '✓ Selected' : product.buttonText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        </div>

        {/* Checkout Section - appears when any plan is selected */}
        {selectedPlans.length > 0 && (
          <div className="checkout-section">
            <div className="checkout-summary">
              <h3>Your Selection Summary</h3>
              <div className="selected-items">
                {allPlans
                  .filter((p) => selectedPlans.includes(p.id))
                  .map((plan) => (
                    <div key={plan.id} className="selected-item">
                      <div className="item-details">
                        <span className="item-name">{plan.name}</span>
                        <span className="item-coverage">{plan.coverage}</span>
                      </div>
                      <span className="item-price">₹{plan.price}/mo</span>
                    </div>
                  ))}
              </div>
              <div className="checkout-total">
                <span>Total Monthly Premium</span>
                <span className="total-amount">₹{totalPrice}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button
                className="btn-proceed"
                onClick={handleCreateAccount}
              >
                <FaShoppingCart /> Create Account
              </button>
              <button
                className="btn-back"
                onClick={() => navigate('/segmentation')}
              >
                Back to Preferences
              </button>
            </div>
          </div>
        )}

        {showAccountModal && (
          <div
            className="account-modal-overlay"
            onClick={() => setShowAccountModal(false)}
          >
            <div
              className="account-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="account-modal-header">
                <h2>Create Account</h2>
                <button
                  type="button"
                  className="account-close"
                  onClick={() => setShowAccountModal(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="account-modal-body">
                <p className="account-modal-subtitle">
                  Enter your name, email, and password to continue.
                </p>

                {accountError && (
                  <div className="account-error" role="alert">
                    {accountError}
                  </div>
                )}

                <form className="account-form" onSubmit={submitAccount}>
                  <label className="account-field">
                    <span>Name</span>
                    <input
                      type="text"
                      value={accountForm.fullName}
                      onChange={(e) => updateAccountField('fullName', e.target.value)}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="account-field">
                    <span>Email</span>
                    <input
                      type="email"
                      value={accountForm.email}
                      onChange={(e) => updateAccountField('email', e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </label>

                  <label className="account-field">
                    <span>Password</span>
                    <input
                      type="password"
                      value={accountForm.password}
                      onChange={(e) => updateAccountField('password', e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                    />
                  </label>

                  <div className="account-modal-actions">
                    <button
                      type="button"
                      className="btn-back"
                      onClick={() => setShowAccountModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-proceed">
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsuranceProductsPage;
