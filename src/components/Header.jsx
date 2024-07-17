import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/headerstyle.css';

const Header = () => {
  const [isDashboardPage, setIsDashboardPage] = useState(false);
  const [isDashboardDropdownOpen, setIsDashboardDropdownOpen] = useState(false);
  const [isSurveyDropdownOpen, setIsSurveyDropdownOpen] = useState(false);
  const [isSurveyPage, setIsSurveyPage] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDashboardPage(location.pathname === '/dashboard');
    setIsSurveyPage(location.pathname.includes('/survey'));
  }, [location]);

  const toggleDashboardDropdown = () => {
    setIsDashboardDropdownOpen((prev) => !prev);
    setIsSurveyDropdownOpen(false);
  };

  const toggleSurveyDropdown = () => {
    setIsSurveyDropdownOpen((prev) => !prev);
    setIsDashboardDropdownOpen(false);
  };

  const closeDropdowns = () => {
    setIsDashboardDropdownOpen(false);
    setIsSurveyDropdownOpen(false);
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        <div>
          <img src="/ncfLogo1.png" className="header-logo" alt="NCF Logo" />
          <p className="header-title">COLLEGE OF COMPUTER STUDIES</p>
        </div>
        <div className="header-actions">
          <div className="relative">
            {isDashboardPage ? (
              <Link to="/" className="header-button">Back</Link>
            ) : (
              <button onClick={toggleDashboardDropdown} className={`header-button ${isDashboardDropdownOpen ? 'active' : ''}`} type="button">
                Dashboard
                <svg className="header-button-icon" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            )}
            {isDashboardDropdownOpen && (
              <div className="header-dropdown">
                <Link to="/dashboard" onClick={closeDropdowns} className="header-dropdown-item">Dashboard</Link>
              </div>
            )}
          </div>
          <div className="relative">
            {isSurveyPage ? (
              <Link to="/" className="header-button">Back</Link>
            ) : (
              <button onClick={toggleSurveyDropdown} className={`header-button ${isSurveyDropdownOpen ? 'active' : ''}`} type="button">
                Survey
                <svg className="header-button-icon" aria-hidden="true" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            )}
            {isSurveyDropdownOpen && (
              <div className="header-dropdown">
                <Link to="/login" onClick={closeDropdowns} className="header-dropdown-item">Survey</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;