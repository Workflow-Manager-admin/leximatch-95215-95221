import React from 'react';
import './styles/WordCard.css';

// PUBLIC_INTERFACE
/**
 * WordCard component for displaying individual words or definitions in the game
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the card
 * @param {string} props.text - Text to display on the card
 * @param {boolean} props.isFlipped - Whether the card is currently flipped
 * @param {boolean} props.isMatched - Whether the card has been matched
 * @param {Function} props.onCardClick - Function to call when card is clicked
 * @returns {JSX.Element} - Rendered component
 */
const WordCard = ({ id, text, isFlipped, isMatched, onCardClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onCardClick(id);
    }
  };

  const cardClasses = `word-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="word-card-inner">
        <div className="word-card-front">
          <span className="card-logo">LM</span>
        </div>
        <div className="word-card-back">
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
