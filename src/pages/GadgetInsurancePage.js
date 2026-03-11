import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import './GadgetInsurancePage.css';

function GadgetInsurancePage({ onComplete, userProfile }) {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState([]);

  // ===================== GADGET INSURANCE PLANS =====================
  const gadgetPlans = [
    {
      id: 'gadget-basic',
      label: 'Start Your Protection',
      name: 'Basic Gadget Protection',
      price: 299,
      coverage: 'Up to ₹30,000',
      features: [
        'Accidental damage protection',
        'Screen damage repair',
        'Basic hardware repair',
        'Standard claim processing',
        'Coverage for Android & Apple devices'
      ],
      benefits: [
        'Covers all smartphone brands',
        'Simple claim process',
        'Quick turnaround time',
        'Affordable coverage for basic needs'
      ],
      termsAndConditions: 'Coverage includes accidental physical damage. Excludes intentional damage, wear & tear, and unauthorized repairs. Device age limit: 0-7 years. Deductible: ₹500 per claim. Up to 1 claim per year.',
      badge: null,
      buttonText: 'Get Started',
      compatibility: 'Android & Apple'
    },
    {
      id: 'gadget-premium',
      label: 'Essential Coverage',
      name: 'Premium Gadget Protection',
      price: 599,
      coverage: 'Up to ₹50,000',
      features: [
        'Accidental damage coverage',
        'Screen replacement (1 time per year)',
        'Liquid damage protection',
        'Theft protection',
        'Pickup & drop repair service',
        'Fast claim approval'
      ],
      benefits: [
        'Free screen replacement once yearly',
        'Priority claim processing',
        'Doorstep pickup & delivery',
        'Coverage for theft incidents',
        '48-hour claim approval'
      ],
      termsAndConditions: 'Comprehensive coverage for all damage types including liquid damage. Screen replacement: 1 per policy year. Theft claim requires FIR. Device age limit: 0-8 years. Deductible: ₹250 per claim. Up to 2 claims per year.',
      badge: 'Most Popular',
      buttonText: 'Choose Plan',
      featured: true,
      compatibility: 'Android & Apple'
    },
    {
      id: 'gadget-best',
      label: 'Maximum Peace of Mind',
      name: 'Best Gadget Protection',
      price: 999,
      coverage: 'Up to ₹100,000',
      features: [
        'Unlimited accidental damage coverage',
        'Free screen replacement',
        'Liquid damage protection',
        'Theft and loss protection',
        'Device replacement guarantee',
        'Worldwide coverage',
        'Priority customer support'
      ],
      benefits: [
        'Unlimited screen replacements',
        'Device replacement if unrepairable',
        'Global coverage for international travel',
        ' 24/7 priority support line',
        'Zero deductible on major damage',
        'Extended coverage up to 10 years old',
        'Annual replacement guarantee'
      ],
      termsAndConditions: 'Premium tier with maximum coverage. Unlimited screen replacements at no cost. Device replacement if repair cost exceeds 75% of device value. Worldwide coverage valid in 150+ countries. No deductible for major damages (>₹10,000). Zero waiting period for accidental damage. Device age limit: 0-10 years.',
      badge: 'Best Value',
      buttonText: 'Go Premium',
      featured: false,
      compatibility: 'Android & Apple'
    }
  ];

  const togglePlan = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId));
    } else {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  const [expandedTerms, setExpandedTerms] = useState(null);

  const toggleTerms = (planId) => {
    setExpandedTerms(expandedTerms === planId ? null : planId);
  };

  const handleProceedCheckout = () => {
    onComplete({ selectedInsurances: selectedPlans });
    navigate('/dashboard');
  };

  const totalPrice = gadgetPlans
    .filter((p) => selectedPlans.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="gadget-insurance-page">
      <div className="gadget-container">
        <div className="gadget-header">
          <h1>📱 Gadget Insurance Plans</h1>
          <p>Protect your Android & Apple devices with comprehensive coverage</p>
        </div>

        <div className="device-compatibility-banner">
          <span className="device-icon">🤖 Android</span>
          <span className="separator">+</span>
          <span className="device-icon">🍎 Apple</span>
          <p>All plans cover both Android and Apple devices</p>
        </div>

        <div className="gadget-cards-wrapper">
          <div className="gadget-grid">
            {gadgetPlans.map((plan) => (
              <div
                key={plan.id}
                className={`gadget-card ${plan.featured ? 'featured' : ''} ${selectedPlans.includes(plan.id) ? 'selected' : ''}`}
              >
                {plan.badge && (
                  <div className="gadget-badge">{plan.badge}</div>
                )}

                <div className="plan-label">{plan.label}</div>

                <h3 className="plan-title">{plan.name}</h3>

                <div className="plan-price">
                  <span className="currency">₹</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/month</span>
                </div>

                <div className="plan-coverage">
                  <p>Coverage <strong>{plan.coverage}</strong></p>
                </div>

                <div className="compatibility-tag">
                  <span>{plan.compatibility}</span>
                </div>

                <div className="features-section">
                  <h4 className="features-title">Key Features:</h4>
                  <div className="features-list">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="feature-row">
                        <FaCheck className="feature-icon" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="benefits-section">
                  <h4 className="benefits-title">Benefits:</h4>
                  <ul className="benefits-list">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Terms & Conditions */}
                <div className="terms-section">
                  <button
                    className="terms-toggle"
                    onClick={() => toggleTerms(plan.id)}
                  >
                    {expandedTerms === plan.id ? '▼ Hide Terms' : '▶ Terms & Conditions'}
                  </button>
                  {expandedTerms === plan.id && (
                    <div className="terms-content">
                      {plan.termsAndConditions}
                    </div>
                  )}
                </div>

                <button
                  className={`plan-button ${selectedPlans.includes(plan.id) ? 'selected' : ''}`}
                  onClick={() => togglePlan(plan.id)}
                >
                  {selectedPlans.includes(plan.id) ? '✓ Selected' : plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gadget Comparison Table */}
        <div className="comparison-section">
          <h2>Quick Comparison</h2>
          <div className="comparison-table">
            <div className="comparison-row header-row">
              <div className="comparison-col feature-col">Features</div>
              <div className="comparison-col">Basic</div>
              <div className="comparison-col">Premium</div>
              <div className="comparison-col">Best</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Monthly Price</div>
              <div className="comparison-col">₹299</div>
              <div className="comparison-col">₹599</div>
              <div className="comparison-col">₹999</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Coverage Limit</div>
              <div className="comparison-col">₹30K</div>
              <div className="comparison-col">₹50K</div>
              <div className="comparison-col">₹100K</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Screen Replacement</div>
              <div className="comparison-col">Repair</div>
              <div className="comparison-col">1x Yearly</div>
              <div className="comparison-col">Unlimited</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Liquid Damage</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
              <div className="comparison-col">✓</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Theft Protection</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
              <div className="comparison-col">✓</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Pickup & Drop</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
              <div className="comparison-col">✓</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Worldwide Coverage</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Device Replacement</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
            </div>

            <div className="comparison-row">
              <div className="comparison-col feature-col">Priority Support</div>
              <div className="comparison-col">❌</div>
              <div className="comparison-col">✓</div>
              <div className="comparison-col">✓</div>
            </div>
          </div>
        </div>

        {/* Checkout Section */}
        {selectedPlans.length > 0 && (
          <div className="checkout-section">
            <div className="checkout-summary">
              <h3>Your Selection</h3>
              <div className="selected-items">
                {gadgetPlans
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
                onClick={handleProceedCheckout}
              >
                <FaShoppingCart /> Proceed to Checkout
              </button>
              <button
                className="btn-back"
                onClick={() => navigate(-1)}
              >
                Back to Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GadgetInsurancePage;
