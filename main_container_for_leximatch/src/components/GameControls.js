import React from 'react';
import './styles/GameControls.css';

// PUBLIC_INTERFACE
/**
 * GameControls component for game settings and control buttons
 * @param {Object} props - Component props
 * @param {boolean} props.gameStarted - Whether the game has started
 * @param {boolean} props.gameOver - Whether the game is over
 * @param {string} props.difficulty - Current difficulty level
 * @param {Function} props.onStartGame - Function to call when starting a game
 * @param {Function} props.onChangeDifficulty - Function to call when changing difficulty
 * @param {Function} props.onRestartGame - Function to call when restarting the game
 * @returns {JSX.Element} - Rendered component
 */
const GameControls = ({ 
  gameStarted,
  gameOver,
  difficulty,
  onStartGame,
  onChangeDifficulty,
  onRestartGame
}) => {
  return (
    <div className="game-controls">
      {!gameStarted && !gameOver && (
        <>
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select">Difficulty:</label>
            <select 
              id="difficulty-select" 
              value={difficulty} 
              onChange={(e) => onChangeDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className="btn start-button" onClick={onStartGame}>
            Start Game
          </button>
        </>
      )}
      
      {gameOver && (
        <button className="btn restart-button" onClick={onRestartGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default GameControls;
