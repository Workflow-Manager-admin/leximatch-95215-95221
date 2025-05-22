/**
 * Game logic utilities for the LexiMatch word-matching game
 */

// PUBLIC_INTERFACE
/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// PUBLIC_INTERFACE
/**
 * Checks if two cards match based on their pairing ID
 * @param {Object} card1 - First selected card
 * @param {Object} card2 - Second selected card
 * @returns {boolean} - True if cards match
 */
export const checkForMatch = (card1, card2) => {
  return card1 && card2 && card1.pairId === card2.pairId && card1.id !== card2.id;
};

// PUBLIC_INTERFACE
/**
 * Calculate score based on matches, attempts and time
 * @param {number} matches - Number of successful matches
 * @param {number} attempts - Number of attempts made
 * @param {number} timeElapsed - Time elapsed in seconds
 * @returns {number} - Calculated score
 */
export const calculateScore = (matches, attempts, timeElapsed) => {
  const baseScore = matches * 100;
  const accuracyFactor = attempts > 0 ? matches / attempts : 0;
  const timePenalty = Math.max(0, 1 - (timeElapsed / 300)); // Less penalty for faster times, capped at 5 minutes
  
  return Math.round(baseScore * accuracyFactor * (1 + timePenalty));
};

// PUBLIC_INTERFACE
/**
 * Generate game level configuration based on difficulty
 * @param {string} difficulty - Game difficulty (easy, medium, hard)
 * @returns {Object} - Game configuration
 */
export const generateGameConfig = (difficulty) => {
  const configs = {
    easy: {
      pairCount: 6,
      timeLimit: 120,
      matchType: 'synonyms'
    },
    medium: {
      pairCount: 8,
      timeLimit: 150,
      matchType: 'mixed'
    },
    hard: {
      pairCount: 10, 
      timeLimit: 180,
      matchType: 'all'
    }
  };
  
  return configs[difficulty] || configs.medium;
};
