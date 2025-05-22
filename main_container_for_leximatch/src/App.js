import React, { useState, useEffect } from 'react';
import './App.css';

// Import game components
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import GameControls from './components/GameControls';

// Import game utilities
import { shuffleArray, checkForMatch, calculateScore, generateGameConfig } from './utils/gameLogic';
import { generateWordPairs } from './utils/wordData';

// PUBLIC_INTERFACE
/**
 * Main App component for the LexiMatch word-matching game
 * @returns {JSX.Element} - The rendered LexiMatch application
 */
function App() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameConfig, setGameConfig] = useState(generateGameConfig('medium'));
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [gameResult, setGameResult] = useState(null);

  // Initialize the game with configured word pairs
  const initializeGame = () => {
    const config = generateGameConfig(difficulty);
    setGameConfig(config);
    
    // Generate and shuffle word pairs
    const pairs = generateWordPairs(config.pairCount, config.matchType);
    const shuffledCards = shuffleArray(pairs);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setAttempts(0);
    setScore(0);
    setTimeRemaining(config.timeLimit);
    setGameResult(null);
    setGameStarted(true);
    setGameOver(false);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id)) return;
    
    // Flip the card
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Check for a match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setAttempts(prevAttempts => prevAttempts + 1);
      
      const firstCard = cards.find(card => card.id === newFlippedCards[0]);
      const secondCard = cards.find(card => card.id === newFlippedCards[1]);
      
      if (checkForMatch(firstCard, secondCard)) {
        // Found a match
        const pairId = firstCard.pairId;
        setMatchedPairs(prevPairs => [...prevPairs, pairId]);
        
        // Update score
        const newScore = calculateScore(
          matchedPairs.length + 1,
          attempts + 1,
          gameConfig.timeLimit - timeRemaining
        );
        setScore(newScore);
        
        // Clear flipped cards after a brief delay to show the match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match, flip cards back after a delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  // Handle game over conditions
  useEffect(() => {
    const checkGameOver = () => {
      if (!gameStarted || gameOver) return;

      // All pairs matched - win condition
      if (matchedPairs.length === gameConfig.pairCount) {
        const finalScore = calculateScore(
          matchedPairs.length,
          attempts,
          gameConfig.timeLimit - timeRemaining
        );
        setScore(finalScore);
        setGameResult({ 
          won: true, 
          score: finalScore,
          matches: matchedPairs.length,
          attempts: attempts
        });
        setGameOver(true);
        setGameStarted(false);
      }
      
      // Time ran out - lose condition
      if (timeRemaining <= 0) {
        const finalScore = calculateScore(
          matchedPairs.length,
          attempts,
          gameConfig.timeLimit
        );
        setScore(finalScore);
        setGameResult({ 
          won: false, 
          score: finalScore,
          matches: matchedPairs.length,
          attempts: attempts
        });
        setGameOver(true);
        setGameStarted(false);
      }
    };
    
    checkGameOver();
  }, [matchedPairs, timeRemaining, gameConfig, attempts, gameOver, gameStarted]);

  // Timer logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Handle change in difficulty
  const handleChangeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  // Handle game restart
  const handleRestartGame = () => {
    setGameOver(false);
    setGameStarted(false);
    setGameResult(null);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">L</span> LexiMatch
            </div>
            {gameStarted && !gameOver && (
              <div className="score-display">Score: {score}</div>
            )}
          </div>
        </div>
      </nav>

      <main>
        <div className="container game-container">
          {!gameStarted && !gameOver && (
            <div className="game-header">
              <h1 className="game-title">LexiMatch</h1>
              <p className="game-instructions">
                Match words with their synonyms, antonyms, or definitions. Flip cards to find matches before time runs out!
              </p>
            </div>
          )}
          
          {/* Game Controls */}
          <GameControls 
            gameStarted={gameStarted}
            gameOver={gameOver}
            difficulty={difficulty}
            onStartGame={initializeGame}
            onChangeDifficulty={handleChangeDifficulty}
            onRestartGame={handleRestartGame}
          />
          
          {/* Game Area */}
          {gameStarted && !gameOver && (
            <div className="game-area">
              <ScorePanel 
                score={score}
                matches={matchedPairs.length}
                attempts={attempts}
                timeRemaining={timeRemaining}
              />
              
              <GameBoard 
                cards={cards}
                flippedCards={flippedCards}
                matchedPairs={matchedPairs}
                onCardClick={handleCardClick}
              />
            </div>
          )}
          
          {/* Game Over Screen */}
          {gameOver && gameResult && (
            <div className="game-area game-over">
              <h2 className="game-over-title">
                {gameResult.won ? 'Congratulations!' : 'Game Over'}
              </h2>
              
              <div className="final-score">
                {gameResult.score} points
              </div>
              
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-label">Matches</div>
                  <div className="stat-value">{gameResult.matches}</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Attempts</div>
                  <div className="stat-value">{gameResult.attempts}</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Accuracy</div>
                  <div className="stat-value">
                    {gameResult.attempts > 0 
                      ? Math.round((gameResult.matches / (gameResult.attempts / 2)) * 100) 
                      : 0}%
                  </div>
                </div>
              </div>
              
              <p className="game-message">
                {gameResult.won 
                  ? 'You found all the matches! Well done!' 
                  : 'Time\'s up! Try again to improve your score.'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;