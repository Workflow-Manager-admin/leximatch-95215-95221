import React from 'react';
import WordCard from './WordCard';
import './styles/GameBoard.css';

// PUBLIC_INTERFACE
/**
 * GameBoard component that displays a grid of word cards
 * @param {Object} props - Component props
 * @param {Array} props.cards - Array of card objects to display
 * @param {Array} props.flippedCards - Array of currently flipped card IDs
 * @param {Array} props.matchedPairs - Array of matched pair IDs
 * @param {Function} props.onCardClick - Function to call when a card is clicked
 * @returns {JSX.Element} - Rendered component
 */
const GameBoard = ({ cards, flippedCards, matchedPairs, onCardClick }) => {
  return (
    <div className="game-board">
      {cards.map(card => (
        <WordCard
          key={card.id}
          id={card.id}
          text={card.text}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedPairs.includes(card.pairId)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
