import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCreditCard, FaIdCard, FaRegCreditCard, FaTrash } from 'react-icons/fa';
import './CartPage.css';

function CartPage({ userProfile, onComplete }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    bankName: '',
    bankUserId: '',
    paymentId: '',
  });
  const [error, setError] = useState('');

  const deriveGigCoverageLakhs = (price) => {
    const value = Number(price);
    const effective = Number.isFinite(value) ? Math.max(199, Math.round(value)) : 199;

    if (effective >= 599) return 5;
    if (effective >= 499) return 4;
    if (effective >= 399) return 3;
    if (effective >= 299) return 2;
    return 1;
  };

  const items = useMemo(() => {
    const base = Array.isArray(userProfile?.selectedPlanDetails) ? userProfile.selectedPlanDetails : [];

    const isGigWorker = userProfile?.occupation === 'gig-worker';
    const selectedGigCoverages = Array.isArray(userProfile?.gigCoverage) ? userProfile.gigCoverage.filter(Boolean) : [];
    const gigPrice = Number(userProfile?.gigPrice);

    if (!isGigWorker || selectedGigCoverages.length === 0) return base;

    const effectivePrice = Number.isFinite(gigPrice) ? Math.max(199, Math.round(gigPrice)) : 199;
    const coverageLakhs = Number(userProfile?.gigCoverageLakhs) || deriveGigCoverageLakhs(effectivePrice);
    const coverageLabel = `₹${coverageLakhs} Lakh`;

    const coverageNames = {
      health: 'Health Insurance',
      motor: 'Motor Insurance',
      'personal-accident': 'Personal Accident Insurance',
    };

    const selectedText = selectedGigCoverages
      .map((id) => coverageNames[id] || id)
      .join(', ');

    const gigItem = {
      id: 'gig-flex',
      name: selectedText ? `Gig Worker Flexible Package (${selectedText})` : 'Gig Worker Flexible Package',
      price: effectivePrice,
      coverage: coverageLabel,
      category: 'Gig Worker',
    };

    return [gigItem, ...base];
  }, [userProfile]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  }, [items]);

  const removeItem = (id) => {
    if (id === 'gig-flex') {
      onComplete({ gigCoverage: [], gigPrice: 199, gigCoverageLakhs: 1 });
      return;
    }
    const nextDetails = items.filter((item) => item.id !== id);
    const nextIds = nextDetails.map((item) => item.id);
    onComplete({ selectedInsurances: nextIds, selectedPlanDetails: nextDetails });
  };

  const updateField = (field, value) => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }));
  };

  const validatePayment = () => {
    if (items.length === 0) return 'Your cart is empty.';

    if (paymentMethod === 'card') {
      const cardNumber = paymentForm.cardNumber.replace(/\s+/g, '');
      if (!paymentForm.cardName.trim()) return 'Enter the name on card.';
      if (!/^[0-9]{13,19}$/.test(cardNumber)) return 'Enter a valid card number.';
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(paymentForm.cardExpiry.trim())) return 'Enter expiry as MM/YY.';
      if (!/^[0-9]{3,4}$/.test(paymentForm.cardCvv)) return 'Enter a valid CVV.';
    }

    if (paymentMethod === 'upi') {
      if (!/^[^@\\s]+@[^@\\s]+$/.test(paymentForm.upiId.trim())) return 'Enter a valid UPI ID (example@bank).';
    }

    if (paymentMethod === 'netbanking') {
      if (!paymentForm.bankName.trim()) return 'Enter your bank name.';
      if (!paymentForm.bankUserId.trim()) return 'Enter your NetBanking user ID.';
    }

    if (paymentMethod === 'id') {
      if (!paymentForm.paymentId.trim()) return 'Enter your Payment ID.';
    }

    return '';
  };

  const payNow = () => {
    setError('');
    const validationError = validatePayment();
    if (validationError) {
      setError(validationError);
      return;
    }

    onComplete({
      lastPaymentMethod: paymentMethod,
      cartPaidAt: new Date().toISOString(),
    });

    alert('Payment successful!');
    navigate('/dashboard');
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <button type="button" className="cart-back" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <div>
            <h1>Your Cart</h1>
            <p>Review your selected insurance plans and choose a payment method.</p>
          </div>
        </div>

        <div className="cart-grid">
          <section className="cart-items">
            <h2>Selected Plans</h2>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>No plans selected yet.</p>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/products')}>
                  Browse Plans
                </button>
              </div>
            ) : (
              <div className="cart-list">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-main">
                      <div className="cart-item-title">
                        <span className="cart-item-name">{item.name}</span>
                        {item.category && <span className="cart-item-category">{item.category}</span>}
                      </div>
                      {item.coverage && item.coverage !== 'â€”' && (
                        <div className="cart-item-meta">Coverage: {item.coverage}</div>
                      )}
                    </div>
                    <div className="cart-item-right">
                      <div className="cart-item-price">â‚¹{item.price}/mo</div>
                      <button type="button" className="cart-remove" onClick={() => removeItem(item.id)}>
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="cart-payment">
            <div className="payment-card">
              <h2>Payment</h2>

              <div className="payment-total">
                <span>Total Monthly Premium</span>
                <span className="payment-amount">â‚¹{total}</span>
              </div>

              <div className="payment-methods" role="radiogroup" aria-label="Payment method">
                <button
                  type="button"
                  className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <FaCreditCard /> Credit/Debit Card
                </button>
                <button
                  type="button"
                  className={`payment-method ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <FaRegCreditCard /> UPI
                </button>
                <button
                  type="button"
                  className={`payment-method ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <FaRegCreditCard /> NetBanking
                </button>
                <button
                  type="button"
                  className={`payment-method ${paymentMethod === 'id' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('id')}
                >
                  <FaIdCard /> ID / Payment ID
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-form">
                  <label>
                    <span>Name on Card</span>
                    <input value={paymentForm.cardName} onChange={(e) => updateField('cardName', e.target.value)} />
                  </label>
                  <label>
                    <span>Card Number</span>
                    <input
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => updateField('cardNumber', e.target.value)}
                    />
                  </label>
                  <div className="payment-row">
                    <label>
                      <span>Expiry (MM/YY)</span>
                      <input
                        placeholder="MM/YY"
                        value={paymentForm.cardExpiry}
                        onChange={(e) => updateField('cardExpiry', e.target.value)}
                      />
                    </label>
                    <label>
                      <span>CVV</span>
                      <input
                        inputMode="numeric"
                        placeholder="123"
                        value={paymentForm.cardCvv}
                        onChange={(e) => updateField('cardCvv', e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="payment-form">
                  <label>
                    <span>UPI ID</span>
                    <input
                      placeholder="name@bank"
                      value={paymentForm.upiId}
                      onChange={(e) => updateField('upiId', e.target.value)}
                    />
                  </label>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="payment-form">
                  <label>
                    <span>Bank Name</span>
                    <input value={paymentForm.bankName} onChange={(e) => updateField('bankName', e.target.value)} />
                  </label>
                  <label>
                    <span>User ID</span>
                    <input value={paymentForm.bankUserId} onChange={(e) => updateField('bankUserId', e.target.value)} />
                  </label>
                </div>
              )}

              {paymentMethod === 'id' && (
                <div className="payment-form">
                  <label>
                    <span>Payment ID</span>
                    <input
                      placeholder="Enter payment reference ID"
                      value={paymentForm.paymentId}
                      onChange={(e) => updateField('paymentId', e.target.value)}
                    />
                  </label>
                </div>
              )}

              {error && <div className="payment-error">{error}</div>}

              <button type="button" className="btn btn-primary btn-pay" onClick={payNow}>
                Pay Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
