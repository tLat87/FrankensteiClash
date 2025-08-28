import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import { GameSettings, Player, GameState } from '../types';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

const GameplayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, settings } = route.params as { players: Player[]; settings: GameSettings };
  
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    currentCategory: 'Capital Cities',
    currentWord: '',
    usedWords: [],
    timeRemaining: settings.timer,
    isGameActive: false,
    gamePhase: 'setup',
  });

  const [currentWord, setCurrentWord] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([...players]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const categories = [
    'Capital Cities',
    'Animals',
    'Food & Drinks',
    'Movies',
    'Sports',
    'Countries',
    'Famous People',
    'Inventions',
  ];

  useEffect(() => {
    if (gameStarted) {
      startTimer();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStarted, gameState.currentPlayer]);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining <= 1) {
          handleTimeUp();
          return prev;
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  };

  const handleTimeUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const currentPlayer = gamePlayers[gameState.currentPlayer];
    if (currentPlayer) {
      loseLife(currentPlayer.id);
    }
  };

  const loseLife = (playerId: string) => {
    const updatedPlayers = gamePlayers.map(player => {
      if (player.id === playerId) {
        const newLives = player.lives - 1;
        const isEliminated = newLives <= 0;
        
        // Add missing parts based on lives lost
        const missingParts = [];
        if (newLives <= 2) missingParts.push('arm');
        if (newLives <= 1) missingParts.push('leg');
        if (newLives <= 0) missingParts.push('head');
        
        return {
          ...player,
          lives: newLives,
          isEliminated,
          avatar: {
            ...player.avatar,
            missingParts,
            isDamaged: newLives < 3,
          },
        };
      }
      return player;
    });

    setGamePlayers(updatedPlayers);

    // Check if game should end
    const activePlayers = updatedPlayers.filter(p => !p.isEliminated);
    if (activePlayers.length <= 1) {
      endGame(updatedPlayers);
    } else {
      nextPlayer(updatedPlayers);
    }
  };

  const nextPlayer = (updatedPlayers: Player[]) => {
    let nextPlayerIndex = gameState.currentPlayer + 1;
    
    // Find next active player
    while (nextPlayerIndex < updatedPlayers.length && updatedPlayers[nextPlayerIndex].isEliminated) {
      nextPlayerIndex++;
    }
    
    // If we reached the end, start from beginning
    if (nextPlayerIndex >= updatedPlayers.length) {
      nextPlayerIndex = 0;
      while (nextPlayerIndex < updatedPlayers.length && updatedPlayers[nextPlayerIndex].isEliminated) {
        nextPlayerIndex++;
      }
    }

    // If we can't find any active player, end game
    if (updatedPlayers[nextPlayerIndex].isEliminated) {
      endGame(updatedPlayers);
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentPlayer: nextPlayerIndex,
      timeRemaining: settings.timer,
      currentWord: '',
    }));
    setCurrentWord('');
  };

  const endGame = (finalPlayers: Player[]) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    const winner = finalPlayers.find(p => !p.isEliminated) || finalPlayers[0];
    const sortedPlayers = [...finalPlayers].sort((a, b) => b.score - a.score);
    
    (navigation as any).navigate('Leaderboard', { 
      players: sortedPlayers, 
      winner: winner,
      settings 
    });
  };

  const handleSubmitWord = () => {
    const word = currentWord.trim().toLowerCase();
    if (!word) return;

    const currentPlayer = gamePlayers[gameState.currentPlayer];
    if (gameState.usedWords.includes(word)) {
      Alert.alert('Word Already Used!', 'This word has already been used. You lose a life!');
      loseLife(currentPlayer.id);
      return;
    }

    // Word is valid
    const updatedPlayers = [...gamePlayers];
    updatedPlayers[gameState.currentPlayer].score += 100;
    
    setGameState(prev => ({
      ...prev,
      usedWords: [...prev.usedWords, word],
      currentWord: '',
    }));
    setCurrentWord('');

    // Show success message briefly
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true, delay: 1000 }),
    ]).start();

    setTimeout(() => {
      nextPlayer(updatedPlayers);
    }, 1500);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameState(prev => ({ ...prev, isGameActive: true, gamePhase: 'playing' }));
  };

  const getCurrentPlayer = () => gamePlayers[gameState.currentPlayer];

  const renderFrankenstein = (player: Player) => {
    const { avatar } = player;
    const isCurrentPlayer = player.id === getCurrentPlayer()?.id;
    
    // Determine which image to show based on player's lives and missing parts
    let imageSource;
    if (player.isEliminated) {
      imageSource = require('../assets/img/fr/Group533.png');
    } else if (avatar.missingParts.includes('head')) {
      imageSource = require('../assets/img/fr/Group534.png');
    } else if (avatar.missingParts.includes('arm')) {
      imageSource = require('../assets/img/fr/Group535.png');
    } else if (avatar.missingParts.includes('leg')) {
      imageSource = require('../assets/img/fr/Group536.png');
    } else {
      imageSource = require('../assets/img/fr/Group533.png');
    }
    
    return (
      <View style={[styles.characterContainer, isCurrentPlayer && styles.currentPlayer]}>
        <Image 
          source={imageSource}
          style={styles.avatarImage}
          resizeMode="contain"
        />
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.livesText}>Lives: {player.lives}</Text>
        {player.isEliminated && (
          <Text style={styles.eliminatedText}>ELIMINATED</Text>
        )}
      </View>
    );
  };

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <BackgroundImage>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>Category: {gameState.currentCategory}</Text>
            </View>
            
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Name the words to keep your Frankenstein alive. Fail to answer, and he falls apart piece by piece.
              </Text>
            </View>

            <View style={styles.playersGrid}>
              {gamePlayers.map((player, index) => (
                <View key={player.id} style={styles.playerSlot}>
                  {renderFrankenstein(player)}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </ScrollView>
        </BackgroundImage>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <Text style={styles.playerTurn}>{getCurrentPlayer()?.name}'s Turn</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏰</Text>
            <Text style={styles.timerText}>
              {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.gameArea} showsVerticalScrollIndicator={false}>
          <View style={styles.categoryDisplay}>
            <Text style={styles.categoryText}>{gameState.currentCategory}</Text>
          </View>

          <View style={styles.characterArea}>
            {getCurrentPlayer() && renderFrankenstein(getCurrentPlayer())}
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.inputLabel}>Name a word from the category:</Text>
            <TextInput
              style={styles.wordInput}
              placeholder="Type your word here..."
              placeholderTextColor={colors.textSecondary}
              value={currentWord}
              onChangeText={setCurrentWord}
              autoFocus
              maxLength={30}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitWord}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <Animated.View style={[styles.successMessage, { opacity: fadeAnim }]}>
            <Text style={styles.successText}>Well Done! Your Frankenstein stands strong.</Text>
          </Animated.View>
        </ScrollView>

        <View style={styles.playersStatus}>
          {gamePlayers.map((player, index) => (
            <View key={player.id} style={styles.playerStatus}>
              {renderFrankenstein(player)}
            </View>
          ))}
        </View>
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  categoryContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    borderWidth: 2,
    borderColor: colors.lightning,
    alignItems: 'center',
  },
  categoryTitle: {
    ...fonts.title,
    color: colors.lightning,
  },
  instructionContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  instructionText: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  playerSlot: {
    width: width * 0.4,
    alignItems: 'center',
    margin: 10,
  },
  startButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  startButtonText: {
    ...commonStyles.buttonText,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  playerTurn: {
    ...fonts.subtitle,
    color: colors.lightning,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  timerText: {
    ...fonts.subtitle,
    color: colors.text,
  },
  gameArea: {
    flex: 1,
    padding: 20,
  },
  categoryDisplay: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.lightning,
    alignItems: 'center',
  },
  categoryText: {
    ...fonts.subtitle,
    color: colors.lightning,
  },
  characterArea: {
    alignItems: 'center',
    marginVertical: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPlayer: {
    borderWidth: 3,
    borderColor: colors.lightning,
    borderRadius: 20,
    padding: 10,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  playerName: {
    ...fonts.body,
    marginTop: 8,
    textAlign: 'center',
  },
  livesText: {
    ...fonts.caption,
    color: colors.highlight,
  },
  eliminatedText: {
    ...fonts.caption,
    color: colors.danger,
    fontWeight: 'bold',
    marginTop: 5,
  },
  inputArea: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  inputLabel: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 15,
    textAlign: 'center',
  },
  wordInput: {
    ...commonStyles.input,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },
  submitButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
  },
  submitButtonText: {
    ...commonStyles.buttonText,
  },
  successMessage: {
    backgroundColor: colors.success,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  successText: {
    ...fonts.subtitle,
    color: colors.text,
  },
  playersStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  playerStatus: {
    alignItems: 'center',
  },
});

export default GameplayScreen;
