import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SegmentationPage from './pages/SegmentationPage';
import InsuranceProductsPage from './pages/InsuranceProductsPage';
import GadgetInsurancePage from './pages/GadgetInsurancePage';
import PersonalInsurancePage from './pages/PersonalInsurancePage';
import DashboardPage from './pages/DashboardPage';
import Chatbot from './components/Chatbot';
import './styles/global.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState({
    category: null,
    occupation: null,
    priceRange: null,
    selectedInsurances: [],
    fullName: '',
    email: '',
    phone: '',
  });
  // simple in-memory registry; would normally be backend
  const [registeredUsers, setRegisteredUsers] = useState([]); // { identifier, password }

  const handleLogin = (userEmail) => {
    setIsLoggedIn(true);
    setCurrentUser(userEmail);
  };

  const registerUser = (identifier, password) => {
    setRegisteredUsers([...registeredUsers, { identifier, password }]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const updateUserProfile = (data) => {
    setUserProfile((prev) => {
      const next = { ...prev, ...data };
      if (Array.isArray(next.selectedInsurances)) {
        next.selectedInsurances = Array.from(new Set(next.selectedInsurances));
      }
      return next;
    });
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app-wrapper">
        <Header isLoggedIn={isLoggedIn} currentUser={currentUser} onLogout={handleLogout} />
        
        <main className="page-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/login" 
              element={<LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />} 
            />
            <Route 
              path="/segmentation" 
              element={
                isLoggedIn ? (
                  <SegmentationPage onNext={updateUserProfile} userProfile={userProfile} />
                ) : (
                  <LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />
                )
              } 
            />
            <Route 
              path="/products" 
              element={
                isLoggedIn ? (
                  <InsuranceProductsPage 
                    onComplete={updateUserProfile} 
                    userProfile={userProfile} 
                    onLogin={handleLogin}
                    registerUser={registerUser}
                  />
                ) : (
                  <LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />
                )
              } 
            />
            <Route 
              path="/gadget-insurance" 
              element={
                isLoggedIn ? (
                  <GadgetInsurancePage 
                    onComplete={updateUserProfile} 
                    userProfile={userProfile} 
                  />
                ) : (
                  <LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />
                )
              } 
            />
            <Route
              path="/personal-insurance"
              element={
                isLoggedIn ? (
                  <PersonalInsurancePage
                    onComplete={updateUserProfile}
                    userProfile={userProfile}
                  />
                ) : (
                  <LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />
                )
              }
            />
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? (
                  <DashboardPage userProfile={userProfile} currentUser={currentUser} />
                ) : (
                  <LoginPage onLogin={handleLogin} onProfileUpdate={updateUserProfile} registeredUsers={registeredUsers} registerUser={registerUser} />
                )
              } 
            />
          </Routes>
        </main>

        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
