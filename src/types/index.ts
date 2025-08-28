export interface Player {
  id: string;
  name: string;
  avatar: FrankensteinAvatar;
  lives: number;
  score: number;
  isEliminated: boolean;
  mistakes: number;
}

export interface FrankensteinAvatar {
  id: string;
  skinColor: string;
  shirtColor: string;
  isDamaged: boolean;
  missingParts: string[];
}

export interface GameSettings {
  numberOfPlayers: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timer: number;
  categories: string[];
}

export interface GameState {
  currentPlayer: number;
  currentCategory: string;
  currentWord: string;
  usedWords: string[];
  timeRemaining: number;
  isGameActive: boolean;
  gamePhase: 'setup' | 'playing' | 'finished';
}

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  date: string;
  gameId: string;
}

export interface AppSettings {
  music: boolean;
  vibration: boolean;
}

export interface Category {
  name: string;
  words: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

