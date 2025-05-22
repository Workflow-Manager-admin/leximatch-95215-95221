import React from 'react';
import './styles/ScorePanel.css';

// PUBLIC_INTERFACE
/**
 * ScorePanel component for displaying game statistics
 * @param {Object} props - Component props
 * @param {number} props.score - Current game score
 * @param {number} props.matches - Number of matches made
 * @param {number} props.attempts - Number of attempts made
 * @param {number} props.timeRemaining - Time remaining in seconds
 * @returns {JSX.Element} - Rendered component
 */
const ScorePanel = ({ score, matches, attempts, timeRemaining }) => {
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate accuracy percentage
  const accuracy = attempts > 0 
    ? Math.round((matches / (attempts / 2)) * 100) 
    : 0;
  
  return (
    <div className="score-panel">
      <div className="score-item">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Matches</span>
        <span className="score-value">{matches}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Accuracy</span>
        <span className="score-value">{accuracy}%</span>
      </div>
      <div className="score-item">
        <span className="score-label">Time</span>
        <span className="score-value time">{formatTime(timeRemaining)}</span>
      </div>
    </div>
  );
};

export default ScorePanel;
