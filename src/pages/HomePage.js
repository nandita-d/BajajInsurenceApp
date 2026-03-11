import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaPhone, FaCheckCircle, FaStar } from 'react-icons/fa';
import './HomePage.css';
// hero background image should be copied to public/hero.jpg and will be used by the hero section

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Best Prices',
      description: 'Health Insurance from ₹99, Gadget Insurance from ₹99',
    },
    {
      icon: <FaPhone />,
      title: '24/7 Support',
      description: 'Customer support available round the clock to help you',
    },
    {
      icon: <FaCheckCircle />,
      title: 'Quick Claims',
      description: 'Fast and hassle-free claims settlement process',
    },
    {
      icon: <FaStar />,
      title: 'Trusted by Millions',
      description: 'Serving India for over 100 years with excellence',
    },
  ];

  const insuranceTypes = [
    {
      id: 'health',
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Comprehensive health coverage starting from ₹99/month',
      plans: ['₹99 - Student Plan', '₹299 - Premium Plan', '₹999 - Elite Plan'],
      route: '/products',
    },
    {
      id: 'gadget',
      icon: '📱',
      title: 'Gadget Insurance',
      description: 'Protect your devices from damage and theft from ₹99/month',
      plans: ['₹299 - Basic', '₹599 - Premium', '₹999 - Best'],
      route: '/gadget-insurance',
    },
    {
      id: 'personal',
      icon: '👤',
      title: 'Personal Insurance',
      description: 'Personal accident and disability coverage for your family',
      plans: ['₹79 - Accident', '₹149 - Income Protection', '₹249 - Comprehensive'],
      route: '/login',
    },
    {
      id: 'motor',
      icon: '🚗',
      title: 'Motor Insurance',
      description: 'Comprehensive vehicle protection and legal liability coverage',
      plans: ['₹149 - Third Party', '₹249 - Standard', '₹399 - Comprehensive'],
      route: '/login',
    },
  ];

  const testimonials = [
    {
      name: 'Raj Kumar',
      city: 'Jorhat',
      feedback: 'Great service and easy claim process. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      city: 'Delhi',
      feedback: 'Affordable premiums with excellent coverage. Very satisfied.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      city: 'Bangalore',
      feedback: 'Best health insurance plan ever. Worth every penny!',
      rating: 5,
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(0,48,135,0.8) 0%, rgba(0,26,77,0.8) 100%), url('/hero.jpg')",
        }}
      >
        <div className="hero-content container">
          <div className="hero-text">
            <h1>Insurance Made Simple & Affordable</h1>
            <p>Get the best insurance plans at the best prices from Bajaj Insurance</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
                Get Started Today
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/login')}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            {/* optional illustration or leave empty when using background */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Bajaj Insurance?</h2>
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section className="insurance-types-section">
        <div className="container">
          <h2>Our Insurance Products</h2>
          <p className="section-subtitle">Choose the insurance plan that suits your needs</p>

          <div className="insurance-types-grid">
            {insuranceTypes.map((type, idx) => (
              <div key={idx} className="insurance-type-card">
                <div className="type-icon">{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>

                <div className="type-plans">
                  <p className="plans-title">Starting from:</p>
                  <ul>
                    {type.plans.map((plan, pidx) => (
                      <li key={pidx}>{plan}</li>
                    ))}
                  </ul>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(type.route)}
                >
                  Explore Plans
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2>What Our Customers Say</h2>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.feedback}"</p>
                <p className="testimonial-author">
                  {testimonial.name} <span className="testimonial-city">{testimonial.city}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get the Best Insurance?</h2>
            <p>Join millions of happy customers who trust Bajaj Insurance</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
              Start Your Journey Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
