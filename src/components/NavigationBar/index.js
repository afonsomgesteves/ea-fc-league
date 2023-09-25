import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faHome, faHistory, faAdd } from '@fortawesome/free-solid-svg-icons';

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
      <Link to="/leaderboard"><FontAwesomeIcon icon={faTrophy} /></Link>
      <Link to="/history"><FontAwesomeIcon icon={faHistory} /></Link>
      <Link to="/newgame"><FontAwesomeIcon icon={faAdd} /></Link>
    </nav>
  );
};

export default NavigationBar;
