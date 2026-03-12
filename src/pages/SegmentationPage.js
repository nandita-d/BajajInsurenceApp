import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaBirthdayCake, FaCheck, FaInfoCircle, FaTrophy, FaUser } from 'react-icons/fa';
import './SegmentationPage.css';
// segmentation background image should be copied to public/segmentation-bg.jpg and will show behind the header

function SegmentationPage({ onNext, userProfile }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: userProfile.age || '',
    category: userProfile.category || '',
    occupation: userProfile.occupation || '',
    // pricePreference values: 'budget' | 'mid-range' | 'premium'
    pricePreference: userProfile.priceRange || '',
  });

  const [gigCoverage, setGigCoverage] = useState(() => {
    const existing = Array.isArray(userProfile?.gigCoverage) ? userProfile.gigCoverage : [];
    return existing.filter(Boolean);
  });

  const [employeeSlides, setEmployeeSlides] = useState({
    health: 0,
    gadget: 0,
    accident: 0,
  });

  const [errors, setErrors] = useState({});
  const [sliderValue, setSliderValue] = useState(() => {
    switch (formData.pricePreference) {
      case 'budget':
        return 0;
      case 'mid-range':
        return 50;
      case 'premium':
        return 100;
      default:
        return 50;
    }
  });

  const occupationOptions = [
    { value: 'student', label: 'Student' },
    { value: 'gig-worker', label: 'Gig Worker' },
    { value: 'employee', label: 'Employee' },
  ];

  const gigCoverageOptions = [
    {
      id: 'health',
      label: 'Health Insurance',
      startingPriceYearly: 1999,
      description: 'Hospitalization + cashless network support',
    },
    {
      id: 'motor',
      label: 'Motor Insurance',
      startingPriceYearly: 1499,
      description: 'Vehicle protection + legal liability cover',
    },
    {
      id: 'personal-accident',
      label: 'Personal Accident Insurance',
      startingPriceYearly: 999,
      description: 'Accident + disability protection',
    },
  ];

  const employeePackages = {
    health: [
      {
        title: 'Basic Health Cover',
        coverage: '₹2,00,000',
        benefits: ['Cashless hospitalization', 'Doctor consultation support'],
        premium: '₹2,999/year',
      },
      {
        title: 'Standard Health Cover',
        coverage: '₹5,00,000',
        benefits: ['Cashless hospital network', 'Free annual health checkup', 'Medicine reimbursement'],
        premium: '₹4,999/year',
      },
      {
        title: 'Premium Health Cover',
        coverage: '₹10,00,000',
        benefits: ['Cashless treatment nationwide', 'Free health checkups', 'Critical illness coverage'],
        premium: '₹7,999/year',
      },
    ],
    gadget: [
      {
        title: 'Mobile Protection Plan',
        coverage: 'Smartphone',
        benefits: ['Covers smartphone damage', 'Screen damage protection', 'Water damage coverage'],
        premium: '₹999/year',
      },
      {
        title: 'Laptop & Device Protection',
        coverage: 'Laptop + Device',
        benefits: ['Covers laptop damage', 'Power surge protection', 'Theft protection'],
        premium: '₹1,499/year',
      },
      {
        title: 'Multi Gadget Protection',
        coverage: 'Mobile + Laptop + Tablet',
        benefits: ['Accidental damage coverage', 'Theft protection'],
        premium: '₹1,999/year',
      },
    ],
    accident: [
      {
        title: 'Basic Accident Cover',
        coverage: '₹2,00,000',
        benefits: ['Accidental death benefit', 'Permanent disability coverage'],
        premium: '₹799/year',
      },
      {
        title: 'Standard Accident Cover',
        coverage: '₹5,00,000',
        benefits: ['Accidental hospitalization cover', 'Disability protection'],
        premium: '₹1,299/year',
      },
      {
        title: 'Premium Accident Cover',
        coverage: '₹10,00,000',
        benefits: ['Accidental death coverage', 'Disability + hospitalization benefits', 'Family financial support'],
        premium: '₹1,999/year',
      },
    ],
  };

  const gigTotalYearly = gigCoverage.reduce((sum, id) => {
    const found = gigCoverageOptions.find((o) => o.id === id);
    return sum + (found ? found.startingPriceYearly : 0);
  }, 0);


  const validateForm = () => {
    const newErrors = {};

    if (!formData.age || formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Please enter a valid age (18-100)';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Please select an occupation';
    }

    if (!formData.pricePreference) {
      newErrors.pricePreference = 'Please select your price preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updated = {
      ...formData,
      [name]: value,
    };

    // if age changes and is below 30, default occupation to student
    if (name === 'age' && value !== '') {
      const ageNum = parseInt(value, 10);
      if (ageNum < 30) {
        updated.occupation = 'student';
      }
    }

    setFormData(updated);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const toggleGigCoverage = (coverageId) => {
    setGigCoverage((prev) => {
      if (prev.includes(coverageId)) {
        return prev.filter((id) => id !== coverageId);
      }
      return [...prev, coverageId];
    });
  };

  const moveSlide = (group, dir) => {
    const maxByGroup = {
      health: employeePackages.health.length,
      gadget: employeePackages.gadget.length,
      accident: employeePackages.accident.length,
    };
    const max = maxByGroup[group] || 0;
    if (max === 0) return;

    setEmployeeSlides((prev) => {
      const current = prev[group] ?? 0;
      const next = (current + dir + max) % max;
      return { ...prev, [group]: next };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext({
        ...formData,
        priceRange: formData.pricePreference,
        gigCoverage,
      });
      // navigate according to selected category
      switch (formData.category) {
        case 'gadget':
          navigate('/gadget-insurance');
          break;
        case 'personal':
          navigate('/personal-insurance');
          break;
        case 'health':
        default:
          navigate('/products');
      }
    } else {
      alert('Please fill all of the above questions to continue to recommendations!');
    }
  };

  const categories = [
    {
      id: 'health',
      title: 'Health Insurance',
      icon: '🏥',
      description: 'Protect your health',
    },
    {
      id: 'gadget',
      title: 'Gadget Insurance',
      icon: '📱',
      description: 'Protect your devices',
    },
    {
      id: 'personal',
      title: 'Personal Insurance',
      icon: '👤',
      description: 'Personal protection',
    },
    {
      id: 'motor',
      title: 'Motor Insurance',
      icon: '🚗',
      description: 'Vehicle protection',
    },
  ];

  return (
    <div className="segmentation-page">
      <div className="container">
        <div
          className="segmentation-header"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(0, 48, 135, 0.82) 0%, rgba(0, 26, 77, 0.88) 100%), url('${process.env.PUBLIC_URL}/segmentation-bg.jpg')`,
          }}
        >
          <h1>Let's Get to Know You Better</h1>
          <p>Answer a few questions to find the perfect insurance plan for you</p>
        </div>

        <form onSubmit={handleNext} className="segmentation-form">
          {/* Age Section */}
          <div className="form-section">
            <div className="section-header">
              <FaBirthdayCake className="section-icon" />
              <h2>What's Your Age?</h2>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="age"
                min="18"
                max="100"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleInputChange}
                className={errors.age ? 'error' : ''}
              />
              {errors.age && <span className="error-text">{errors.age}</span>}
            </div>
          </div>

          {/* Category Selection */}
          <div className="form-section">
            <div className="section-header">
              <FaTrophy className="section-icon" />
              <h2>Which Insurance Interests You?</h2>
            </div>
            <div className="categories-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-card ${formData.category === category.id ? 'selected' : ''}`}
                  onClick={() => handleInputChange({
                    target: { name: 'category', value: category.id },
                  })}
                >
                  <div className="category-icon">{category.icon}</div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={formData.category === category.id}
                    onChange={handleInputChange}
                    className="hidden-radio"
                  />
                </div>
              ))}
            </div>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          {/* Occupation Selection */}
          <div className="form-section">
            <div className="section-header">
              <FaBriefcase className="section-icon" />
              <h2>What's Your Occupation?</h2>
            </div>
            <div className="occupation-grid">
              {occupationOptions.map((option) => (
                <label key={option.value} className="occupation-option">
                  <input
                    type="radio"
                    name="occupation"
                    value={option.value}
                    checked={formData.occupation === option.value}
                    onChange={handleInputChange}
                  />
                  <span className="option-label">{option.label}</span>
                </label>
              ))}
            </div>
            {errors.occupation && <span className="error-text">{errors.occupation}</span>}

            {/* Occupation Packages */}
            {formData.occupation && (
              <div className="occupation-packages" aria-live="polite">
                {formData.occupation === 'student' && (
                  <div className="package-card package-student">
                    <div className="package-top">
                      <div>
                        <h3 className="package-title">Student Insurance Package</h3>
                        <p className="package-subtitle">Keep it simple and protected — best for students</p>
                      </div>
                      <div className="package-price">
                        <span className="price-amount">₹99</span>
                        <span className="price-period">/month</span>
                      </div>
                    </div>

                    <div className="package-meta">
                      <div className="meta-pill">Coverage: ₹1 Lakh</div>
                      <div className="meta-pill">Category: Health</div>
                    </div>

                    <ul className="package-list">
                      <li><FaCheck /> Hospitalization coverage</li>
                      <li><FaCheck /> Cashless treatment network</li>
                      <li><FaCheck /> Ambulance services</li>
                      <li><FaCheck /> Standard ward room</li>
                    </ul>

                    <div className="package-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/products?category=health')}
                      >
                        View Student Plan
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate('/cart')}
                      >
                        Go to Cart
                      </button>
                    </div>
                  </div>
                )}

                {formData.occupation === 'gig-worker' && (
                  <div className="package-card package-gig">
                    <div className="package-top">
                      <div>
                        <h3 className="package-title">Gig Worker Package (Flexible)</h3>
                        <p className="package-subtitle">
                          Choose one or more coverages — your package updates instantly.
                        </p>
                      </div>
                      <div className="package-price">
                        <span className="price-prefix">From</span>
                        <span className="price-amount">₹{gigTotalYearly || 999}</span>
                        <span className="price-period">/year</span>
                      </div>
                    </div>

                    <div className="gig-grid" role="group" aria-label="Select coverages">
                      {gigCoverageOptions.map((opt) => {
                        const checked = gigCoverage.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`gig-option ${checked ? 'active' : ''}`}
                            onClick={() => toggleGigCoverage(opt.id)}
                            aria-pressed={checked}
                          >
                            <div className="gig-option-top">
                              <span className="gig-option-title">{opt.label}</span>
                              <span className="gig-option-price">₹{opt.startingPriceYearly}/year</span>
                            </div>
                            <div className="gig-option-desc">{opt.description}</div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="gig-summary">
                      <div className="gig-summary-row">
                        <span className="gig-k">Selected:</span>
                        <span className="gig-v">
                          {gigCoverage.length > 0
                            ? gigCoverageOptions
                                .filter((o) => gigCoverage.includes(o.id))
                                .map((o) => o.label)
                                .join(', ')
                            : 'None yet'}
                        </span>
                      </div>
                      <div className="gig-summary-row">
                        <span className="gig-k">Estimated total:</span>
                        <span className="gig-v strong">₹{gigTotalYearly || 0}/year</span>
                      </div>
                      <p className="gig-note">
                        <FaInfoCircle /> You can pick multiple coverages. Pricing updates automatically.
                      </p>
                    </div>

                    <div className="package-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/products?category=health')}
                      >
                        Explore Plans
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => navigate('/cart')}
                        disabled={gigCoverage.length === 0}
                      >
                        Go to Cart
                      </button>
                    </div>
                  </div>
                )}

                {formData.occupation === 'employee' && (
                  <div className="package-card package-employee">
                    <div className="package-top">
                      <div>
                        <h3 className="package-title">Employee Package (Traditional)</h3>
                        <p className="package-subtitle">
                          General insurance bundles for employees — starting from ₹2,999/year.
                        </p>
                      </div>
                      <div className="package-price">
                        <span className="price-prefix">From</span>
                        <span className="price-amount">₹2,999</span>
                        <span className="price-period">/year</span>
                      </div>
                    </div>

                    <div className="employee-slides">
                      <div className="slide-group">
                        <div className="slide-group-header">
                          <h4>Health Insurance</h4>
                          <div className="slide-controls">
                            <button type="button" className="slide-btn" onClick={() => moveSlide('health', -1)} aria-label="Previous health offer">‹</button>
                            <button type="button" className="slide-btn" onClick={() => moveSlide('health', 1)} aria-label="Next health offer">›</button>
                          </div>
                        </div>
                        <div className="slide-card" role="group" aria-label="Health insurance offers">
                          <div className="slide-title">{employeePackages.health[employeeSlides.health].title}</div>
                          <div className="slide-coverage">Coverage: {employeePackages.health[employeeSlides.health].coverage}</div>
                          <ul className="slide-list">
                            {employeePackages.health[employeeSlides.health].benefits.map((b) => (
                              <li key={b}><FaCheck /> {b}</li>
                            ))}
                          </ul>
                          <div className="slide-premium">{employeePackages.health[employeeSlides.health].premium}</div>
                        </div>
                      </div>

                      <div className="slide-group">
                        <div className="slide-group-header">
                          <h4>Gadget Insurance</h4>
                          <div className="slide-controls">
                            <button type="button" className="slide-btn" onClick={() => moveSlide('gadget', -1)} aria-label="Previous gadget offer">‹</button>
                            <button type="button" className="slide-btn" onClick={() => moveSlide('gadget', 1)} aria-label="Next gadget offer">›</button>
                          </div>
                        </div>
                        <div className="slide-card" role="group" aria-label="Gadget insurance offers">
                          <div className="slide-title">{employeePackages.gadget[employeeSlides.gadget].title}</div>
                          <div className="slide-coverage">Covers: {employeePackages.gadget[employeeSlides.gadget].coverage}</div>
                          <ul className="slide-list">
                            {employeePackages.gadget[employeeSlides.gadget].benefits.map((b) => (
                              <li key={b}><FaCheck /> {b}</li>
                            ))}
                          </ul>
                          <div className="slide-premium">{employeePackages.gadget[employeeSlides.gadget].premium}</div>
                        </div>
                      </div>

                      <div className="slide-group">
                        <div className="slide-group-header">
                          <h4>Personal Accident Insurance</h4>
                          <div className="slide-controls">
                            <button type="button" className="slide-btn" onClick={() => moveSlide('accident', -1)} aria-label="Previous accident offer">‹</button>
                            <button type="button" className="slide-btn" onClick={() => moveSlide('accident', 1)} aria-label="Next accident offer">›</button>
                          </div>
                        </div>
                        <div className="slide-card" role="group" aria-label="Personal accident insurance offers">
                          <div className="slide-title">{employeePackages.accident[employeeSlides.accident].title}</div>
                          <div className="slide-coverage">Coverage: {employeePackages.accident[employeeSlides.accident].coverage}</div>
                          <ul className="slide-list">
                            {employeePackages.accident[employeeSlides.accident].benefits.map((b) => (
                              <li key={b}><FaCheck /> {b}</li>
                            ))}
                          </ul>
                          <div className="slide-premium">{employeePackages.accident[employeeSlides.accident].premium}</div>
                        </div>
                      </div>
                    </div>

                    <div className="package-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/products?category=health')}
                      >
                        Explore Packages
                      </button>
                      <button type="button" className="btn btn-outline" onClick={() => navigate('/cart')}>
                        Go to Cart
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price Sensitivity Slider */}
          <div className="form-section">
            <div className="section-header">
              <FaUser className="section-icon" />
              <h2>How budget-conscious are you when choosing a plan?</h2>
            </div>
            <div className="slider-container">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSliderValue(val);
                  let pref = 'mid-range';
                  if (val < 33) pref = 'budget';
                  else if (val > 66) pref = 'premium';
                  setFormData({
                    ...formData,
                    pricePreference: pref,
                  });
                  if (errors.pricePreference) {
                    setErrors({
                      ...errors,
                      pricePreference: '',
                    });
                  }
                }}
                className="price-slider"
              />
              <div className="slider-labels">
                <span className={sliderValue < 33 ? 'active' : ''}>Value First</span>
                <span className={sliderValue >= 33 && sliderValue <= 66 ? 'active' : ''}>Balanced</span>
                <span className={sliderValue > 66 ? 'active' : ''}>Premium Coverage</span>
              </div>
            </div>
            {errors.pricePreference && <span className="error-text">{errors.pricePreference}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Continue to Recommendations
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SegmentationPage;
