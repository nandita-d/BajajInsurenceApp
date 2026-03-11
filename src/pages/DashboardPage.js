import React, { useState } from 'react';
import { FaUser, FaCog, FaShieldAlt, FaHome, FaWallet, FaPhone, FaClipboardList, FaBell } from 'react-icons/fa';
import './DashboardPage.css';

function DashboardPage({ userProfile, currentUser }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPayEMI, setShowPayEMI] = useState(false);
  const displayName = (userProfile?.fullName || '').trim() || currentUser;

  let insurancePlans = [
    {
      id: 'plan-1',
      name: 'Health Insurance',
      provider: 'Bajaj Allianz',
      premium: '₹299/month',
      coverage: '₹5 Lakh',
      status: 'Active',
      renewalDate: '2025-03-15',
    },
    {
      id: 'plan-2',
      name: 'Gadget Insurance',
      provider: 'Bajaj Allianz',
      premium: '₹199/month',
      coverage: 'All Devices',
      status: 'Active',
      renewalDate: '2025-03-20',
    },
  ];

  const selectedPlanIds = Array.isArray(userProfile?.selectedInsurances)
    ? userProfile.selectedInsurances
    : [];

  // De-dupe in case the same plan id is saved twice.
  const uniquePlanIds = Array.from(new Set(selectedPlanIds));

  const planCatalog = {
    'health-basic': { category: 'Health Insurance', tier: 'Basic', price: 99, coverage: 'â‚¹1 Lakh' },
    'health-standard': { category: 'Health Insurance', tier: 'Standard', price: 199, coverage: 'â‚¹3 Lakh' },
    'health-premium': { category: 'Health Insurance', tier: 'Premium', price: 299, coverage: 'â‚¹5 Lakh' },

    'gadget-basic': { category: 'Gadget Insurance', tier: 'Basic', price: 49, coverage: 'Up to â‚¹30,000' },
    'gadget-standard': { category: 'Gadget Insurance', tier: 'Standard', price: 79, coverage: 'Up to â‚¹50,000' },
    'gadget-premium': { category: 'Gadget Insurance', tier: 'Premium', price: 129, coverage: 'Up to â‚¹100,000' },

    'motor-basic': { category: 'Motor Insurance', tier: 'Basic', price: 149, coverage: 'Liability only' },
    'motor-standard': { category: 'Motor Insurance', tier: 'Standard', price: 249, coverage: 'Own + Third Party' },
    'motor-premium': { category: 'Motor Insurance', tier: 'Premium', price: 399, coverage: 'Complete Coverage' },

    'personal-basic': { category: 'Personal Insurance', tier: 'Basic', price: 79, coverage: 'â‚¹10 Lakh' },
    'personal-standard': { category: 'Personal Insurance', tier: 'Standard', price: 149, coverage: 'â‚¹20 Lakh' },
    'personal-premium': { category: 'Personal Insurance', tier: 'Premium', price: 249, coverage: 'â‚¹50 Lakh' },
  };

  insurancePlans = uniquePlanIds.map((planId) => {
    const meta = planCatalog[planId];
    return {
      id: planId,
      name: meta ? `${meta.category} (${meta.tier})` : planId,
      provider: 'Bajaj Allianz',
      premium: meta ? `â‚¹${meta.price}/month` : '—',
      coverage: meta ? meta.coverage : '—',
      status: 'Active',
      renewalDate: '—',
    };
  });

  const totalMonthlyPremium = uniquePlanIds.reduce((sum, planId) => {
    const meta = planCatalog[planId];
    return sum + (meta?.price || 0);
  }, 0);

  const recentPolicies = [
    {
      id: 'policy-1',
      type: 'Health Claim',
      amount: '₹15,000',
      status: 'Approved',
      date: '2024-02-15',
    },
    {
      id: 'policy-2',
      type: 'Gadget Replacement',
      amount: '₹25,000',
      status: 'Processing',
      date: '2024-02-20',
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="user-greeting">
            <h1>Welcome back, {displayName}</h1>
            <p>Manage your insurance policies and account settings</p>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-secondary">
              <FaBell /> Notifications
            </button>
            <button className="btn btn-outline">
              <FaPhone /> Support
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaHome /> Overview
          </button>
          <button
            className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            <FaShieldAlt /> My Policies
          </button>
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content">
            {/* Quick Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon health">
                  <FaShieldAlt />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Active Plans</p>
                  <p className="stat-value">{insurancePlans.length}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon premium">
                  <FaWallet />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Monthly Premium</p>
                  <p className="stat-value">₹498</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon claim">
                  <FaClipboardList />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Coverage</p>
                  <p className="stat-value">₹5+ Lakh</p>
                </div>
              </div>
            </div>

            {/* Active Plans Section */}
            <div className="section">
              <h2>Your Active Plans</h2>
              <div className="plans-list">
                {insurancePlans.map((plan) => (
                  <div key={plan.id} className="plan-item">
                    <div className="plan-info">
                      <h3>{plan.name}</h3>
                      <p className="plan-provider">{plan.provider}</p>
                      <div className="plan-details">
                        <span className="detail">Premium: {plan.premium}</span>
                        <span className="detail">Coverage: {plan.coverage}</span>
                      </div>
                    </div>
                    <div className="plan-status-actions">
                      <span className={`status ${plan.status.toLowerCase()}`}>
                        {plan.status}
                      </span>
                      <button className="btn btn-outline btn-sm">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="section">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setShowPayEMI(true)}>
                  <FaWallet className="action-icon" />
                  <span>Pay EMI</span>
                </button>
                <button className="action-card">
                  <FaHome className="action-icon" />
                  <span>Home Service</span>
                </button>
                <button className="action-card">
                  <FaClipboardList className="action-icon" />
                  <span>File a Claim</span>
                </button>
                <button className="action-card">
                  <FaPhone className="action-icon" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="section">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {recentPolicies.map((policy) => (
                  <div key={policy.id} className="activity-item">
                    <div className="activity-info">
                      <p className="activity-type">{policy.type}</p>
                      <p className="activity-date">{policy.date}</p>
                    </div>
                    <div className="activity-right">
                      <span className="activity-amount">{policy.amount}</span>
                      <span className={`activity-status ${policy.status.toLowerCase()}`}>
                        {policy.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="tab-content">
            <div className="section">
              <h2>All Your Policies</h2>
              <div className="policies-grid">
                {insurancePlans.map((plan) => (
                  <div key={plan.id} className="policy-card">
                    <div className="card-header">
                      <h3>{plan.name}</h3>
                      <span className={`badge ${plan.status.toLowerCase()}`}>
                        {plan.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <div className="policy-detail">
                        <span className="label">Provider:</span>
                        <span className="value">{plan.provider}</span>
                      </div>
                      <div className="policy-detail">
                        <span className="label">Premium:</span>
                        <span className="value highlight">{plan.premium}</span>
                      </div>
                      <div className="policy-detail">
                        <span className="label">Coverage:</span>
                        <span className="value">{plan.coverage}</span>
                      </div>
                      <div className="policy-detail">
                        <span className="label">Renewal:</span>
                        <span className="value">{plan.renewalDate}</span>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary btn-sm">Download Policy</button>
                      <button className="btn btn-outline btn-sm">Manage</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="tab-content">
            <div className="section">
              <h2>Your Profile</h2>
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <FaUser />
                  </div>
                  <div className="profile-info">
                    <h3>{displayName}</h3>
                    <p>Member since March 2024</p>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="detail-row">
                    <span className="label">Name:</span>
                    <span className="value">{userProfile.fullName || 'Not specified'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Email:</span>
                    <span className="value">
                      {userProfile.email || (String(currentUser).includes('@') ? currentUser : 'Not specified')}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Phone:</span>
                    <span className="value">
                      {userProfile.phone || (!String(currentUser).includes('@') ? currentUser : 'Not specified')}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Age Group:</span>
                    <span className="value">{userProfile.age ? userProfile.age + ' years' : 'Not specified'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Occupation:</span>
                    <span className="value">{userProfile.occupation || 'Not specified'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">City:</span>
                    <span className="value">{userProfile.city || 'Not specified'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Kyc Status:</span>
                    <span className="value verified">✓ Verified</span>
                  </div>
                </div>

                <button className="btn btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="section">
              <h2>Account Settings</h2>

              <div className="settings-section">
                <h3>Privacy & Notifications</h3>
                <div className="setting-item">
                  <label className="setting-label">
                    <input type="checkbox" defaultChecked />
                    <span>Receive email notifications</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="setting-label">
                    <input type="checkbox" defaultChecked />
                    <span>Receive SMS updates</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="setting-label">
                    <input type="checkbox" />
                    <span>Marketing communications</span>
                  </label>
                </div>
              </div>

              <div className="settings-section">
                <h3>Security</h3>
                <button className="btn btn-outline">Change Password</button>
                <button className="btn btn-outline">Enable Two-Factor Authentication</button>
              </div>

              <div className="settings-section">
                <h3>Danger Zone</h3>
                <button className="btn btn-danger">Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pay EMI Modal */}
      {showPayEMI && (
        <div className="modal-overlay" onClick={() => setShowPayEMI(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Pay EMI</h2>
              <button className="close-btn" onClick={() => setShowPayEMI(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="emi-info">
                <div className="info-item">
                  <span className="label">Outstanding Amount:</span>
                  <span className="value">₹2,490</span>
                </div>
                <div className="info-item">
                  <span className="label">Next Due Date:</span>
                  <span className="value">March 15, 2025</span>
                </div>
              </div>

              <form className="payment-form">
                <div className="form-group">
                  <label>Select Payment Method</label>
                  <select>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Net Banking</option>
                    <option>UPI</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount to Pay</label>
                  <input type="number" placeholder="₹2,490" defaultValue="2490" />
                </div>

                <button type="button" className="btn btn-primary btn-full">
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
