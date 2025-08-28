import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Player, GameSettings, GameState, LeaderboardEntry, AppSettings } from '../types';
import { getRandomAvatar } from '../utils/gameData';

interface GameSliceState {
  players: Player[];
  settings: GameSettings;
  gameState: GameState;
  leaderboard: LeaderboardEntry[];
  appSettings: AppSettings;
  currentScreen: string;
}

const initialState: GameSliceState = {
  players: [],
  settings: {
    numberOfPlayers: 3,
    difficulty: 'Easy',
    timer: 5,
    categories: []
  },
  gameState: {
    currentPlayer: 0,
    currentCategory: '',
    currentWord: '',
    usedWords: [],
    timeRemaining: 5,
    isGameActive: false,
    gamePhase: 'setup'
  },
  leaderboard: [],
  appSettings: {
    music: true,
    vibration: true
  },
  currentScreen: 'onboarding'
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
    setGameSettings: (state, action: PayloadAction<Partial<GameSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    addPlayer: (state, action: PayloadAction<Omit<Player, 'id' | 'avatar' | 'lives' | 'score' | 'isEliminated' | 'mistakes'>>) => {
      const newPlayer: Player = {
        ...action.payload,
        id: Date.now().toString(),
        avatar: getRandomAvatar(),
        lives: 3,
        score: 0,
        isEliminated: false,
        mistakes: 0
      };
      state.players.push(newPlayer);
    },
    updatePlayer: (state, action: PayloadAction<{ id: string; updates: Partial<Player> }>) => {
      const playerIndex = state.players.findIndex(p => p.id === action.payload.id);
      if (playerIndex !== -1) {
        state.players[playerIndex] = { ...state.players[playerIndex], ...action.payload.updates };
      }
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(p => p.id !== action.payload);
    },
    clearPlayers: (state) => {
      state.players = [];
    },
    startGame: (state) => {
      state.gameState.isGameActive = true;
      state.gameState.gamePhase = 'playing';
      state.gameState.currentPlayer = 0;
      state.gameState.usedWords = [];
      state.gameState.timeRemaining = state.settings.timer;
      
      // Reset all players
      state.players.forEach(player => {
        player.lives = 3;
        player.isEliminated = false;
        player.mistakes = 0;
        player.avatar.isDamaged = false;
        player.avatar.missingParts = [];
      });
    },
    endGame: (state) => {
      state.gameState.isGameActive = false;
      state.gameState.gamePhase = 'finished';
      
      // Calculate scores based on elimination order
      const eliminatedPlayers = state.players.filter(p => p.isEliminated);
      const survivingPlayers = state.players.filter(p => !p.isEliminated);
      
      // Assign scores (first eliminated gets lowest score)
      eliminatedPlayers.forEach((player, index) => {
        player.score = index + 1;
      });
      
      // Surviving players get higher scores
      survivingPlayers.forEach((player, index) => {
        player.score = eliminatedPlayers.length + index + 1;
      });
      
      // Add to leaderboard
      state.players.forEach(player => {
        state.leaderboard.push({
          playerName: player.name,
          score: player.score,
          date: new Date().toISOString(),
          gameId: Date.now().toString()
        });
      });
    },
    nextPlayer: (state) => {
      let nextPlayerIndex = state.gameState.currentPlayer + 1;
      while (nextPlayerIndex < state.players.length && state.players[nextPlayerIndex].isEliminated) {
        nextPlayerIndex++;
      }
      
      if (nextPlayerIndex >= state.players.length) {
        // Check if only one player remains
        const activePlayers = state.players.filter(p => !p.isEliminated);
        if (activePlayers.length <= 1) {
          state.gameState.gamePhase = 'finished';
        } else {
          state.gameState.currentPlayer = 0;
          while (state.players[state.gameState.currentPlayer].isEliminated) {
            state.gameState.currentPlayer++;
          }
        }
      } else {
        state.gameState.currentPlayer = nextPlayerIndex;
      }
    },
    playerMistake: (state, action: PayloadAction<string>) => {
      const player = state.players.find(p => p.id === action.payload);
      if (player) {
        player.mistakes++;
        player.lives--;
        
        if (player.mistakes === 1) {
          player.avatar.missingParts.push('rightArm');
        } else if (player.mistakes === 2) {
          player.avatar.missingParts.push('leftArm');
        } else if (player.mistakes === 3) {
          player.avatar.missingParts.push('head');
          player.isEliminated = true;
        }
        
        player.avatar.isDamaged = true;
      }
    },
    setCurrentCategory: (state, action: PayloadAction<string>) => {
      state.gameState.currentCategory = action.payload;
    },
    addUsedWord: (state, action: PayloadAction<string>) => {
      state.gameState.usedWords.push(action.payload);
    },
    setTimeRemaining: (state, action: PayloadAction<number>) => {
      state.gameState.timeRemaining = action.payload;
    },
    addLeaderboardEntry: (state, action: PayloadAction<LeaderboardEntry>) => {
      state.leaderboard.push(action.payload);
    },
    clearLeaderboard: (state) => {
      state.leaderboard = [];
    },
    updateAppSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      state.appSettings = { ...state.appSettings, ...action.payload };
    }
  }
});

export const {
  setCurrentScreen,
  setGameSettings,
  addPlayer,
  updatePlayer,
  removePlayer,
  clearPlayers,
  startGame,
  endGame,
  nextPlayer,
  playerMistake,
  setCurrentCategory,
  addUsedWord,
  setTimeRemaining,
  addLeaderboardEntry,
  clearLeaderboard,
  updateAppSettings
} = gameSlice.actions;

export default gameSlice.reducer;

