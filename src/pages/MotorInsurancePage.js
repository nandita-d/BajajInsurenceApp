import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import './MotorInsurancePage.css';

function MotorInsurancePage({ onComplete, userProfile }) {
  const navigate = useNavigate();
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [expandedTerms, setExpandedTerms] = useState(null);

  const motorPlans = [
    {
      id: 'motor-basic',
      name: 'Basic Motor Protection',
      price: 149,
      features: [
        'Third-party liability coverage',
        'Basic vehicle damage protection',
        'Limited roadside assistance',
        'Standard claim processing',
        'Authorized service garage network'
      ],
      terms: 'Mandatory third-party cover with optional own damage. Roadside assistance limited to 50 km. Claims processed within 15 days. Vehicle age limit 0-10 years.',
      badge: null,
      buttonText: 'Select Basic'
    },
    {
      id: 'motor-premium',
      name: 'Premium Motor Protection',
      price: 249,
      features: [
        'Third-party liability coverage',
        'Own damage protection',
        '24/7 roadside assistance',
        'Cashless garage network',
        'Towing service support',
        'Faster claim settlement'
      ],
      terms: 'Includes own damage coverage. 24/7 assistance up to 100 km. Cashless network across 500+ garages. Towing service available. Claims settled within 7 days. Vehicle age limit 0-15 years.',
      badge: 'Most Popular',
      buttonText: 'Select Premium',
      featured: true
    },
    {
      id: 'motor-ultimate',
      name: 'Ultimate Motor Protection',
      price: 399,
      features: [
        'Comprehensive vehicle coverage',
        'Zero depreciation cover',
        'Engine protection',
        '24/7 roadside assistance',
        'Cashless repairs nationwide',
        'Personal accident cover',
        'Emergency towing service'
      ],
      terms: 'Premium coverage with zero depreciation for 5 years. Engine protection includes water/dust ingress. Emergency towing unlimited. Personal accident cover ₹5 Lakh. Nationwide cashless repairs. Claims within 3 days.',
      badge: 'Best Value',
      buttonText: 'Select Ultimate'
    }
  ];

  const togglePlan = (id) => {
    setSelectedPlans(prev => prev.includes(id) ? prev.filter(p=>p!==id) : [...prev,id]);
  };

  const handleTerms = (id) => {
    setExpandedTerms(expandedTerms === id ? null : id);
  };

  const total = motorPlans
    .filter(p => selectedPlans.includes(p.id))
    .reduce((sum,p)=>sum+p.price,0);

  const checkout = () => {
    onComplete({ selectedInsurances: selectedPlans });
    navigate('/dashboard');
  };

  return (
    <div className="motor-page">
      <div className="motor-container">
        <div className="motor-header">
          <h1>Motor Insurance Plans</h1>
          <p>Secure your vehicle with our tailored motor policies</p>
        </div>
        <div className="motor-grid">
          {motorPlans.map(plan => (
            <div key={plan.id} className={`motor-card ${plan.featured?'featured':''} ${selectedPlans.includes(plan.id)?'selected':''}`}>
              {plan.badge && <div className="motor-badge">{plan.badge}</div>}
              <h3 className="motor-name">{plan.name}</h3>
              <div className="motor-price">₹{plan.price}/mo</div>
              <div className="motor-features">
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
              <button className={`plan-button ${selectedPlans.includes(plan.id)?'selected':''}`} onClick={()=>togglePlan(plan.id)}>
                {selectedPlans.includes(plan.id)?'✓ Selected':plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        {selectedPlans.length>0 && (
          <div className="checkout-section">
            <h3>Selected Plans</h3>
            {motorPlans.filter(p=>selectedPlans.includes(p.id)).map(p=>(
              <div key={p.id} className="selected-item"><span>{p.name}</span><span>₹{p.price}</span></div>
            ))}
            <div className="total">Total: ₹{total}</div>
            <div className="actions">
              <button className="btn-proceed" onClick={checkout}><FaShoppingCart/> Proceed</button>
              <button className="btn-back" onClick={()=>navigate(-1)}>Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MotorInsurancePage;
