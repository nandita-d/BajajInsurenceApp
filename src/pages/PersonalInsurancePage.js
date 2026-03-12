import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import GigFlexBar from '../components/GigFlexBar';
import './PersonalInsurancePage.css';

function PersonalInsurancePage({ onComplete, userProfile }) {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState(() =>
    Array.isArray(userProfile?.selectedInsurances) ? userProfile.selectedInsurances : []
  );
  const [expandedTerms, setExpandedTerms] = useState(null);

  const personalPlans = [
    {
      id: 'personal-basic',
      name: 'Basic Personal Protection',
      price: 199,
      features: [
        'Accidental death benefit',
        'Disability protection',
        'Emergency medical support',
        'Basic financial assistance'
      ],
      terms: 'Covers accidental death and disability only. Emergency support available 24/7. No income replacement or family coverage. Age 18-65.',
      badge: null,
      buttonText: 'Select Basic'
    },
    {
      id: 'personal-premium',
      name: 'Premium Personal Protection',
      price: 399,
      features: [
        'Accidental death benefit',
        'Permanent disability coverage',
        'Income protection',
        'Family financial support',
        'Emergency hospitalization'
      ],
      terms: 'Most popular plan. Includes income protection up to 80% salary. Family support payout on death. Emergency hospitalization covered up to ₹2 lakh. Age 18-65.',
      badge: 'Most Popular',
      buttonText: 'Select Premium',
      featured: true
    },
    {
      id: 'personal-ultimate',
      name: 'Ultimate Personal Protection',
      price: 699,
      features: [
        'Accidental death coverage',
        'Disability & injury protection',
        'Income replacement benefit',
        'Critical illness protection',
        'Family security coverage',
        'Emergency assistance services'
      ],
      terms: 'Best value tier with critical illness and income replacement up to 100% salary. Family security includes spouse & children. Emergency assistance includes evacuation and rehab. Age 18-75.',
      badge: 'Best Value',
      buttonText: 'Select Ultimate'
    }
  ];

  const togglePlan = (id) => {
    if (selectedPlans.includes(id)) {
      setSelectedPlans(selectedPlans.filter(p => p !== id));
    } else {
      setSelectedPlans([...selectedPlans, id]);
    }
  };

  const handleTerms = (id) => {
    setExpandedTerms(expandedTerms === id ? null : id);
  };

  const total = personalPlans
    .filter(p => selectedPlans.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const checkout = () => {
    const selectedPlanDetails = personalPlans
      .filter((p) => selectedPlans.includes(p.id))
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        coverage: 'â€”',
        category: 'Personal Insurance',
      }));

    onComplete({ selectedInsurances: selectedPlans, selectedPlanDetails });
    navigate('/cart');
  };

  return (
    <div className="personal-page">
      <div className="personal-container">
        <GigFlexBar userProfile={userProfile} onUpdate={onComplete} />
        <div className="personal-header">
          <h1>Personal Insurance Plans</h1>
          <p>Choose the plan that secures you and your family</p>
        </div>
        <div className="personal-grid">
          {personalPlans.map(plan => (
            <div
              key={plan.id}
              className={`personal-card ${plan.featured ? 'featured' : ''} ${selectedPlans.includes(plan.id) ? 'selected' : ''}`}
            >
              {plan.badge && <div className="personal-badge">{plan.badge}</div>}
              <h3 className="personal-name">{plan.name}</h3>
              <div className="personal-price">₹{plan.price}/mo</div>
              <div className="personal-features">
                {plan.features.map((f,i)=>(
                  <div key={i} className="feature-row">
                    <FaCheck className="feature-icon" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className="terms-toggle" onClick={()=>handleTerms(plan.id)}>
                {expandedTerms===plan.id?'▼ Hide Terms':'▶ Terms & Conditions'}
              </button>
              {expandedTerms===plan.id && <div className="terms-content">{plan.terms}</div>}
              <button
                className={`plan-button ${selectedPlans.includes(plan.id)?'selected':''}`}
                onClick={()=>togglePlan(plan.id)}
              >
                {selectedPlans.includes(plan.id)?'✓ Selected':plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        {selectedPlans.length>0 && (
          <div className="checkout-section">
            <h3>Selected Plans</h3>
            {personalPlans.filter(p=>selectedPlans.includes(p.id)).map(p=>(
              <div key={p.id} className="selected-item">
                <span>{p.name}</span><span>₹{p.price}</span>
              </div>
            ))}
            <div className="total">Total: ₹{total}</div>
            <div className="actions">
              <button className="btn-proceed" onClick={checkout}><FaShoppingCart/> Go to Cart</button>
              <button className="btn-back" onClick={()=>navigate(-1)}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInsurancePage;
