import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTrophy, FaBirthdayCake, FaBriefcase } from 'react-icons/fa';
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
    { value: 'employee', label: 'Employee' },
    { value: 'self-employed', label: 'Self-Employed' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'retired', label: 'Retired' },
    { value: 'homemaker', label: 'Homemaker' },
  ];


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

  const handleNext = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onNext({
        ...formData,
        priceRange: formData.pricePreference,
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
            backgroundImage: "url('/segmentation-bg.jpg')",
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
