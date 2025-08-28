import { Category } from '../types';

export const gameCategories: Category[] = [
  {
    name: 'Capital Cities',
    difficulty: 'Easy',
    words: [
      'London', 'Paris', 'Berlin', 'Rome', 'Madrid', 'Amsterdam', 'Vienna', 'Prague',
      'Budapest', 'Warsaw', 'Stockholm', 'Oslo', 'Copenhagen', 'Helsinki', 'Reykjavik',
      'Dublin', 'Brussels', 'Luxembourg', 'Bern', 'Vaduz', 'Monaco', 'San Marino',
      'Vatican City', 'Andorra', 'Liechtenstein', 'Malta', 'Cyprus', 'Iceland'
    ]
  },
  {
    name: 'Animals',
    difficulty: 'Easy',
    words: [
      'Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Gorilla', 'Chimpanzee',
      'Panda', 'Koala', 'Kangaroo', 'Platypus', 'Echidna', 'Wombat', 'Tasmanian Devil',
      'Dingo', 'Emu', 'Cassowary', 'Kookaburra', 'Duck', 'Goose', 'Swan', 'Eagle',
      'Hawk', 'Falcon', 'Owl', 'Penguin', 'Seal', 'Dolphin', 'Whale', 'Shark'
    ]
  },
  {
    name: 'Food & Drinks',
    difficulty: 'Easy',
    words: [
      'Pizza', 'Burger', 'Pasta', 'Sushi', 'Taco', 'Burrito', 'Sandwich', 'Salad',
      'Soup', 'Steak', 'Chicken', 'Fish', 'Rice', 'Bread', 'Cake', 'Cookie',
      'Ice Cream', 'Chocolate', 'Coffee', 'Tea', 'Juice', 'Milk', 'Water', 'Soda',
      'Beer', 'Wine', 'Whiskey', 'Vodka', 'Gin', 'Rum', 'Tequila'
    ]
  },
  {
    name: 'Movies',
    difficulty: 'Medium',
    words: [
      'Titanic', 'Avatar', 'Star Wars', 'Lord of the Rings', 'Harry Potter', 'Marvel',
      'Batman', 'Superman', 'Spider-Man', 'Iron Man', 'Captain America', 'Thor',
      'Black Panther', 'Wonder Woman', 'Aquaman', 'Justice League', 'Avengers',
      'Jurassic Park', 'Jaws', 'E.T.', 'Back to the Future', 'Indiana Jones',
      'Mission Impossible', 'James Bond', 'Die Hard', 'Terminator', 'Matrix'
    ]
  },
  {
    name: 'Sports',
    difficulty: 'Easy',
    words: [
      'Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Golf', 'Hockey',
      'Volleyball', 'Rugby', 'Cricket', 'Boxing', 'Wrestling', 'Swimming', 'Running',
      'Cycling', 'Skiing', 'Snowboarding', 'Surfing', 'Skateboarding', 'Gymnastics',
      'Athletics', 'Olympics', 'World Cup', 'Champions League', 'NBA', 'NFL', 'MLB'
    ]
  },
  {
    name: 'Countries',
    difficulty: 'Medium',
    words: [
      'United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Peru',
      'Colombia', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana',
      'Suriname', 'France', 'Germany', 'Italy', 'Spain', 'Portugal', 'Netherlands',
      'Belgium', 'Switzerland', 'Austria', 'Poland', 'Czech Republic', 'Slovakia',
      'Hungary', 'Romania', 'Bulgaria', 'Greece', 'Turkey', 'Russia', 'China', 'Japan'
    ]
  },
  {
    name: 'Famous People',
    difficulty: 'Hard',
    words: [
      'Einstein', 'Newton', 'Galileo', 'Da Vinci', 'Shakespeare', 'Mozart', 'Beethoven',
      'Bach', 'Picasso', 'Van Gogh', 'Monet', 'Rembrandt', 'Michelangelo', 'Raphael',
      'Napoleon', 'Caesar', 'Alexander', 'Genghis Khan', 'Cleopatra', 'Joan of Arc',
      'Marilyn Monroe', 'Elvis Presley', 'Michael Jackson', 'Madonna', 'Beyonce',
      'Taylor Swift', 'Ed Sheeran', 'Adele', 'Drake', 'Kanye West', 'Jay-Z'
    ]
  },
  {
    name: 'Inventions',
    difficulty: 'Hard',
    words: [
      'Telephone', 'Light Bulb', 'Computer', 'Internet', 'Smartphone', 'Television',
      'Radio', 'Camera', 'Car', 'Airplane', 'Train', 'Bicycle', 'Motorcycle',
      'Submarine', 'Rocket', 'Satellite', 'GPS', 'WiFi', 'Bluetooth', 'USB',
      'Credit Card', 'ATM', 'Microwave', 'Refrigerator', 'Washing Machine', 'Dishwasher',
      'Vacuum Cleaner', 'Air Conditioner', 'Heater', 'Fan', 'Clock', 'Watch'
    ]
  },
  {
    name: 'Science',
    difficulty: 'Hard',
    words: [
      'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Astronomy', 'Geology',
      'Meteorology', 'Oceanography', 'Botany', 'Zoology', 'Anatomy', 'Physiology',
      'Genetics', 'Evolution', 'DNA', 'Atom', 'Molecule', 'Cell', 'Organism',
      'Ecosystem', 'Climate', 'Weather', 'Gravity', 'Electricity', 'Magnetism',
      'Energy', 'Force', 'Motion', 'Speed', 'Acceleration', 'Velocity'
    ]
  },
  {
    name: 'Literature',
    difficulty: 'Medium',
    words: [
      'Novel', 'Poetry', 'Drama', 'Comedy', 'Tragedy', 'Romance', 'Mystery',
      'Thriller', 'Horror', 'Fantasy', 'Science Fiction', 'Biography', 'Autobiography',
      'Memoir', 'Essay', 'Short Story', 'Play', 'Screenplay', 'Script', 'Manuscript',
      'Chapter', 'Verse', 'Stanza', 'Metaphor', 'Simile', 'Allegory', 'Symbolism',
      'Irony', 'Satire', 'Parody', 'Fable', 'Legend', 'Myth'
    ]
  }
];

export const getRandomCategory = (difficulty?: 'Easy' | 'Medium' | 'Hard'): Category => {
  const filteredCategories = difficulty 
    ? gameCategories.filter(cat => cat.difficulty === difficulty)
    : gameCategories;
  
  const randomIndex = Math.floor(Math.random() * filteredCategories.length);
  return filteredCategories[randomIndex];
};

export const getRandomWord = (category: Category): string => {
  const randomIndex = Math.floor(Math.random() * category.words.length);
  return category.words[randomIndex];
};

export const getWordsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): string[] => {
  const categories = gameCategories.filter(cat => cat.difficulty === difficulty);
  const allWords: string[] = [];
  
  categories.forEach(category => {
    allWords.push(...category.words);
  });
  
  return allWords;
};

export const getCategoryNames = (): string[] => {
  return gameCategories.map(cat => cat.name);
};

export const getCategoriesByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Category[] => {
  return gameCategories.filter(cat => cat.difficulty === difficulty);
};

