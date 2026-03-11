import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaShoppingCart, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';
// logo file should be placed in public/bajaj-logo.png


function Header({ isLoggedIn, currentUser, onLogout }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content container">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
          
          <img
            src={`${process.env.PUBLIC_URL}/logo2.png`}
            alt="Bajaj Insurance"
            className="logo-img"
          />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav id="primary-navigation" className={`navbar ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                <FaHome /> Home
              </Link>
            </li>
            
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    <FaUser /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                    <FaShoppingCart /> Cart
                  </Link>
                </li>
                <li>
                  <span className="user-info">
                    {(currentUser || '').length > 20 ? `${currentUser.substring(0, 20)}...` : currentUser}
                  </span>
                </li>
                <li>
                  <button className="btn btn-outline btn-logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <li>
                <Link to="/login" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Login / Sign Up
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
