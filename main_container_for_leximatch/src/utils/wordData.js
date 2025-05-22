/**
 * Sample word data for the LexiMatch game
 */

// Words with their synonyms, antonyms, and definitions
const wordDatabase = [
  {
    word: "happy",
    synonyms: ["joyful", "elated", "content"],
    antonyms: ["sad", "unhappy", "miserable"],
    definition: "feeling or showing pleasure or contentment"
  },
  {
    word: "brave",
    synonyms: ["courageous", "fearless", "bold"],
    antonyms: ["cowardly", "fearful", "timid"],
    definition: "ready to face and endure danger or pain; showing courage"
  },
  {
    word: "beautiful",
    synonyms: ["gorgeous", "stunning", "attractive"],
    antonyms: ["ugly", "unattractive", "plain"],
    definition: "pleasing the senses or mind aesthetically"
  },
  {
    word: "smart",
    synonyms: ["intelligent", "clever", "bright"],
    antonyms: ["stupid", "dull", "foolish"],
    definition: "having or showing a quick-witted intelligence"
  },
  {
    word: "fast",
    synonyms: ["quick", "rapid", "swift"],
    antonyms: ["slow", "sluggish", "unhurried"],
    definition: "moving or capable of moving at high speed"
  },
  {
    word: "big",
    synonyms: ["large", "huge", "enormous"],
    antonyms: ["small", "tiny", "little"],
    definition: "of considerable size, extent, or intensity"
  },
  {
    word: "easy",
    synonyms: ["simple", "effortless", "straightforward"],
    antonyms: ["difficult", "hard", "complicated"],
    definition: "achieved without great effort; presenting few difficulties"
  },
  {
    word: "strong",
    synonyms: ["powerful", "mighty", "robust"],
    antonyms: ["weak", "feeble", "frail"],
    definition: "having the power to move heavy weights or perform physically demanding tasks"
  },
  {
    word: "cold",
    synonyms: ["chilly", "frigid", "icy"],
    antonyms: ["hot", "warm", "heated"],
    definition: "of or at a low temperature"
  },
  {
    word: "loud",
    synonyms: ["noisy", "thunderous", "deafening"],
    antonyms: ["quiet", "soft", "silent"],
    definition: "producing or capable of producing much noise"
  }
];

// PUBLIC_INTERFACE
/**
 * Generates pairs of words based on specified relationship type
 * @param {number} count - Number of pairs to generate
 * @param {string} matchType - Type of word relationship ('synonyms', 'antonyms', 'definitions', 'mixed', 'all')
 * @returns {Array} Array of word pairs
 */
export const generateWordPairs = (count = 5, matchType = 'mixed') => {
  // Shuffle and take the requested number of word entries
  const shuffledWords = [...wordDatabase].sort(() => Math.random() - 0.5).slice(0, count);
  const pairs = [];
  
  shuffledWords.forEach((wordData, index) => {
    // Create the base card
    const baseCard = {
      id: `word-${index}`,
      pairId: `pair-${index}`,
      text: wordData.word,
      type: 'word',
      matched: false
    };
    
    // Create the matching card based on match type
    let matchCard;
    
    if (matchType === 'synonyms' || (matchType === 'mixed' && index % 3 === 0) || matchType === 'all') {
      // Get a random synonym
      const synonym = wordData.synonyms[Math.floor(Math.random() * wordData.synonyms.length)];
      matchCard = {
        id: `synonym-${index}`,
        pairId: `pair-${index}`,
        text: synonym,
        type: 'synonym',
        matched: false
      };
    } 
    else if (matchType === 'antonyms' || (matchType === 'mixed' && index % 3 === 1) || matchType === 'all') {
      // Get a random antonym
      const antonym = wordData.antonyms[Math.floor(Math.random() * wordData.antonyms.length)];
      matchCard = {
        id: `antonym-${index}`,
        pairId: `pair-${index}`,
        text: antonym,
        type: 'antonym',
        matched: false
      };
    }
    else {
      // Use the definition
      matchCard = {
        id: `definition-${index}`,
        pairId: `pair-${index}`,
        text: wordData.definition,
        type: 'definition',
        matched: false
      };
    }
    
    pairs.push(baseCard, matchCard);
  });
  
  return pairs;
};
