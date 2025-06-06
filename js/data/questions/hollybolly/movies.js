



/**
 * File: js/data/questions/hollybolly/movies.js
 * LingoQuest - HollyBolly Movie Database with Clues and Rewards
 * Hollywood movies with Bollywood-style clues and reward data
 * Dependencies: None (pure data module)
 * Features: Movie clues, box office data, director/actor net worth, difficulty levels
 * Functions: getMoviesByDifficulty, getRandomMovies, validateMovieData
 * MIT License - https://github.com/AllieBaig/LingoQuest
 * Created: 2025-06-05 15:55:33 UTC
 */

// HollyBolly movie database with clues and reward data
const hollybollyMovies = {
  // Easy difficulty movies (well-known blockbusters)
  easy: [
    {
      id: 'titanic',
      movie: 'Titanic',
      year: 1997,
      clues: {
        place: 'Atlantic Ocean',
        animal: 'None (but mentions rats)',
        thing: 'Ship'
      },
      boxOffice: {
        hollywood: 2200000000, // $2.2 billion worldwide
        bollywood: 1500000000  // Comparison with similar epic
      },
      director: {
        name: 'James Cameron',
        netWorth: 700000000 // $700 million
      },
      actors: {
        lead: 'Leonardo DiCaprio',
        netWorth: 260000000 // $260 million
      },
      options: ['Titanic', 'Avatar', 'The Avengers', 'Frozen'],
      correctAnswer: 'Titanic'
    },
    
    {
      id: 'lion_king',
      movie: 'The Lion King',
      year: 1994,
      clues: {
        place: 'African Savanna',
        animal: 'Lion',
        thing: 'Crown'
      },
      boxOffice: {
        hollywood: 1656000000,
        bollywood: 800000000
      },
      director: {
        name: 'Roger Allers',
        netWorth: 50000000
      },
      actors: {
        lead: 'Matthew Broderick (voice)',
        netWorth: 45000000
      },
      options: ['The Lion King', 'Madagascar', 'Jungle Book', 'Tarzan'],
      correctAnswer: 'The Lion King'
    },
    
    {
      id: 'finding_nemo',
      movie: 'Finding Nemo',
      year: 2003,
      clues: {
        place: 'Great Barrier Reef',
        animal: 'Clownfish',
        thing: 'Submarine'
      },
      boxOffice: {
        hollywood: 940000000,
        bollywood: 600000000
      },
      director: {
        name: 'Andrew Stanton',
        netWorth: 40000000
      },
      actors: {
        lead: 'Albert Brooks (voice)',
        netWorth: 20000000
      },
      options: ['Finding Nemo', 'Shark Tale', 'The Little Mermaid', 'Moana'],
      correctAnswer: 'Finding Nemo'
    },
    
    {
      id: 'toy_story',
      movie: 'Toy Story',
      year: 1995,
      clues: {
        place: 'Child\'s Bedroom',
        animal: 'Rex (Dinosaur)',
        thing: 'Toys'
      },
      boxOffice: {
        hollywood: 373000000,
        bollywood: 200000000
      },
      director: {
        name: 'John Lasseter',
        netWorth: 100000000
      },
      actors: {
        lead: 'Tom Hanks (voice)',
        netWorth: 400000000
      },
      options: ['Toy Story', 'Cars', 'Monsters Inc', 'Up'],
      correctAnswer: 'Toy Story'
    }
  ],
  
  // Medium difficulty movies
  medium: [
    {
      id: 'inception',
      movie: 'Inception',
      year: 2010,
      clues: {
        place: 'Dreams within Dreams',
        animal: 'None',
        thing: 'Spinning Top'
      },
      boxOffice: {
        hollywood: 829000000,
        bollywood: 400000000
      },
      director: {
        name: 'Christopher Nolan',
        netWorth: 250000000
      },
      actors: {
        lead: 'Leonardo DiCaprio',
        netWorth: 260000000
      },
      options: ['Inception', 'Interstellar', 'The Matrix', 'Doctor Strange'],
      correctAnswer: 'Inception'
    },
    
    {
      id: 'jurassic_park',
      movie: 'Jurassic Park',
      year: 1993,
      clues: {
        place: 'Tropical Island',
        animal: 'Dinosaurs',
        thing: 'Amber'
      },
      boxOffice: {
        hollywood: 1029000000,
        bollywood: 500000000
      },
      director: {
        name: 'Steven Spielberg',
        netWorth: 3700000000
      },
      actors: {
        lead: 'Sam Neill',
        netWorth: 18000000
      },
      options: ['Jurassic Park', 'King Kong', 'Godzilla', 'The Lost World'],
      correctAnswer: 'Jurassic Park'
    }
  ],
  
  // Hard difficulty movies (cult classics, indie films)
  hard: [
    {
      id: 'pulp_fiction',
      movie: 'Pulp Fiction',
      year: 1994,
      clues: {
        place: 'Los Angeles Diner',
        animal: 'None',
        thing: 'Briefcase'
      },
      boxOffice: {
        hollywood: 214000000,
        bollywood: 100000000
      },
      director: {
        name: 'Quentin Tarantino',
        netWorth: 120000000
      },
      actors: {
        lead: 'John Travolta',
        netWorth: 250000000
      },
      options: ['Pulp Fiction', 'Kill Bill', 'Reservoir Dogs', 'Django Unchained'],
      correctAnswer: 'Pulp Fiction'
    }
  ]
};

// Reward tier configurations
const rewardTiers = {
  oneCorrect: {
    type: 'boxOffice',
    title: 'Box Office Showdown',
    description: 'Hollywood vs Bollywood Earnings'
  },
  twoCorrect: {
    type: 'director',
    title: 'Director Duel',
    description: 'Net Worth Comparison'
  },
  threeCorrect: {
    type: 'actor',
    title: 'Star Power',
    description: 'Lead Actor Net Worth Battle'
  }
};

/**
 * Get movies by difficulty level
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @param {number} count - Number of movies to return
 * @returns {Array} Array of movie objects
 */
export function getMoviesByDifficulty(difficulty = 'easy', count = 5) {
  const movies = hollybollyMovies[difficulty];
  if (!movies || movies.length === 0) return [];
  
  const shuffled = [...movies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get random movies from all difficulties
 * @param {number} count - Number of movies to return
 * @returns {Array} Array of mixed difficulty movies
 */
export function getRandomMovies(count = 10) {
  const allMovies = [
    ...hollybollyMovies.easy,
    ...hollybollyMovies.medium,
    ...hollybollyMovies.hard
  ];
  
  const shuffled = allMovies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get movie by ID
 * @param {string} movieId - Movie identifier
 * @returns {Object|null} Movie object or null if not found
 */
export function getMovieById(movieId) {
  const allMovies = [
    ...hollybollyMovies.easy,
    ...hollybollyMovies.medium,
    ...hollybollyMovies.hard
  ];
  
  return allMovies.find(movie => movie.id === movieId) || null;
}

/**
 * Generate reward data based on streak count
 * @param {number} streakCount - Number of consecutive correct answers
 * @param {Object} currentMovie - Current movie object
 * @returns {Object} Reward data object
 */
export function generateReward(streakCount, currentMovie) {
  if (streakCount === 1) {
    return {
      type: 'boxOffice',
      title: 'Box Office Battle',
      hollywood: currentMovie.boxOffice.hollywood,
      bollywood: currentMovie.boxOffice.bollywood,
      winner: currentMovie.boxOffice.hollywood > currentMovie.boxOffice.bollywood ? 'Hollywood' : 'Bollywood',
      movie: currentMovie.movie
    };
  } else if (streakCount === 2) {
    return {
      type: 'director',
      title: 'Director Showdown',
      director: currentMovie.director.name,
      netWorth: currentMovie.director.netWorth,
      movie: currentMovie.movie
    };
  } else if (streakCount >= 3) {
    return {
      type: 'actor',
      title: 'Star Power',
      actor: currentMovie.actors.lead,
      netWorth: currentMovie.actors.netWorth,
      movie: currentMovie.movie
    };
  }
  
  return null;
}

/**
 * Format currency for display
 * @param {number} amount - Amount in dollars
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  } else if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  } else {
    return `$${amount.toLocaleString()}`;
  }
}

/**
 * Validate movie data structure
 * @param {Object} movie - Movie object to validate
 * @returns {boolean} True if valid structure
 */
export function validateMovieData(movie) {
  const requiredFields = ['id', 'movie', 'year', 'clues', 'boxOffice', 'director', 'actors', 'options', 'correctAnswer'];
  return requiredFields.every(field => movie.hasOwnProperty(field));
}

// Export main data structures
export { hollybollyMovies, rewardTiers };

// Export default configuration
export default {
  movies: hollybollyMovies,
  rewards: rewardTiers,
  getByDifficulty: getMoviesByDifficulty,
  getRandom: getRandomMovies,
  getById: getMovieById,
  generateReward: generateReward,
  formatCurrency: formatCurrency,
  validate: validateMovieData
};

