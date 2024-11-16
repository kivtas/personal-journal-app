import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Homepage.css';

function Homepage() {
  const navigate = useNavigate();
  // Function to handle the button click and navigate to the create_entry page
  const handleStartButtonClick = () => {
    navigate('/create_entry');
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">Welcome to MoodDiary!</h1>
        <p className="homepage-subtitle">Track your thoughts, emotions, and mood with the power of AI!</p>
        <button className="start-button" onClick={handleStartButtonClick}>
          Start Your Diary
        </button>
      </header>
    </div>
  );
}

export default Homepage;
