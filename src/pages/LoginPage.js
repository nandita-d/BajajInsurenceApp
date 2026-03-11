import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaLock } from 'react-icons/fa';
import './LoginPage.css';

function LoginPage({ onLogin, onProfileUpdate, registeredUsers = [], registerUser }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false); // toggle between login/signup
  const [loginMethod, setLoginMethod] = useState('email');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (p) => /^[0-9]{10}$/.test(p);
  const validatePassword = (pwd) => {
    // at least one lowercase, one uppercase, one number, one special, min 8 chars
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(pwd);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (loginMethod === 'email') {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      if (!validateEmail(email)) {
        setError('Invalid email format');
        return;
      }
    } else {
      if (!phone || !password) {
        setError('Please fill in all fields');
        return;
      }
      if (!validatePhone(phone)) {
        setError('Invalid phone number (10 digits required)');
        return;
      }
    }

    // verify existing account
    const identifier = loginMethod === 'email' ? email : phone;
    const found = registeredUsers.find((u) => u.identifier === identifier && u.password === password);
    if (!found) {
      // if no user with matching credentials
      alert("You don't have an account or credentials are incorrect. Please create an account.");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const userIdentifier = loginMethod === 'email' ? email : phone;
      if (typeof onProfileUpdate === 'function') {
        onProfileUpdate({
          email: loginMethod === 'email' ? email : '',
          phone: loginMethod === 'phone' ? phone : '',
        });
      }
      onLogin(userIdentifier);
      navigate('/segmentation');
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    // Signup requires name + email + password
    if (!fullName.trim() || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number and special character');
      return;
    }

    setIsLoading(true);
    // Simulate API call for account creation
    setTimeout(() => {
      const userIdentifier = email;
      // register user in parent state
      if (registerUser) {
        registerUser(userIdentifier, password);
      }
      if (typeof onProfileUpdate === 'function') {
        onProfileUpdate({
          fullName: fullName.trim(),
          email: userIdentifier,
          phone: '',
        });
      }
      // mark user as logged in and take them to segmentation
      onLogin(userIdentifier);
      navigate('/segmentation');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>{isSignup ? 'Create an Account' : 'Welcome to Bajaj Insurance'}</h1>
            <p>{isSignup ? 'Sign up with your name, email, and password' : 'Get the best insurance plans at the best prices'}</p>
          </div>

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="login-form">
            {!isSignup && (
              <div className="login-method-toggle">
              <button
                type="button"
                className={`toggle-btn ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMethod('email');
                  setPhone('');
                  setError('');
                }}
              >
                <FaEnvelope /> Email
              </button>
              <button
                type="button"
                className={`toggle-btn ${loginMethod === 'phone' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMethod('phone');
                  setEmail('');
                  setError('');
                }}
              >
                <FaPhone /> Phone
              </button>
              </div>
            )}

            {isSignup && (
              <div className="form-group">
                <label htmlFor="fullName">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            {isSignup || loginMethod === 'email' ? (
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="phone">
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="10"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> {isSignup ? 'Create Password' : 'Password'}
              </label>
              <input
                type="password"
                id="password"
                placeholder={isSignup ? 'Create a password' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  <FaLock /> Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {error && <div className="error-message">{error}</div>}
            {successMsg && <div className="success-message">{successMsg}</div>}

            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
              {isLoading ? (isSignup ? 'Creating...' : 'Logging in...') : isSignup ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
              {isSignup ? (
                <p>
                  Already have an account?{' '}
                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(false);
                      setFullName('');
                      setError('');
                      setSuccessMsg('');
                    }}
                  >
                    Login
                  </a>
                </p>
              ) : (
                <p>
                  New to Bajaj Insurance?{' '}
                  <a
                    href="#signup"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignup(true);
                      setLoginMethod('email');
                      setPhone('');
                      setError('');
                      setSuccessMsg('');
                    }}
                  >
                    Create Account
                  </a>
                </p>
              )}
              {!isSignup && <p><a href="#forgot">Forgot Password?</a></p>}
            </div>
          <div className="login-features">
            <div className="feature">
              <span>✓</span>
              <p>100% Secure</p>
            </div>
            <div className="feature">
              <span>✓</span>
              <p>Quick Process</p>
            </div>
            <div className="feature">
              <span>✓</span>
              <p>Best Prices</p>
            </div>
          </div>
        </div>

        <div className="login-side-panel">
          <div className="side-content">
            <h2>Why Choose Bajaj Insurance?</h2>
            <ul>
              <li>Trusted by millions of customers</li>
              <li>Health Insurance from ₹99</li>
              <li>Gadget Insurance from ₹99</li>
              <li>24/7 Customer Support</li>
              <li>Quick Claims Settlement</li>
              <li>Zero Waiting Period Plans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
