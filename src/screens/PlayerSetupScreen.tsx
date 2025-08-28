import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import { GameSettings, Player, FrankensteinAvatar } from '../types';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

const PlayerSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { settings } = route.params as { settings: GameSettings };
  
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const availableAvatars: FrankensteinAvatar[] = [
    { id: '1', skinColor: '#4CAF50', shirtColor: '#FFFFFF', isDamaged: false, missingParts: [] },
    { id: '2', skinColor: '#2196F3', shirtColor: '#E3F2FD', isDamaged: false, missingParts: [] },
    { id: '3', skinColor: '#9C27B0', shirtColor: '#F3E5F5', isDamaged: false, missingParts: [] },
    { id: '4', skinColor: '#FF9800', shirtColor: '#FFF3E0', isDamaged: false, missingParts: [] },
    { id: '5', skinColor: '#795548', shirtColor: '#EFEBE9', isDamaged: false, missingParts: [] },
    { id: '6', skinColor: '#607D8B', shirtColor: '#ECEFF1', isDamaged: false, missingParts: [] },
  ];

  useEffect(() => {
    initializePlayers();
  }, []);

  const initializePlayers = () => {
    const newPlayers: Player[] = [];
    for (let i = 0; i < settings.numberOfPlayers; i++) {
      const randomAvatar = availableAvatars[Math.floor(Math.random() * availableAvatars.length)];
      newPlayers.push({
        id: `player_${i + 1}`,
        name: '',
        avatar: { ...randomAvatar },
        lives: 3,
        score: 0,
        isEliminated: false,
        mistakes: 0,
      });
    }
    setPlayers(newPlayers);
  };

  const handleNameChange = (name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex].name = name;
    setPlayers(updatedPlayers);
  };

  const handleNext = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // All players have names, start the game
      navigation.navigate('Gameplay' as never, { players, settings } as never);
    }
  };

  const handleBack = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const isCurrentPlayerValid = () => {
    return players[currentPlayerIndex]?.name.trim().length > 0;
  };

  const getCurrentPlayer = () => players[currentPlayerIndex];

  const renderAvatar = (avatar: FrankensteinAvatar) => (
    <Image
      source={require('../assets/img/fr/Group533.png')}
      style={styles.avatarImage}
      resizeMode="contain"
    />
  );

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Player {currentPlayerIndex + 1}</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.characterContainer}>
            {getCurrentPlayer() && renderAvatar(getCurrentPlayer().avatar)}
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Player Name</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Type your name here"
              placeholderTextColor={colors.textSecondary}
              value={getCurrentPlayer()?.name || ''}
              onChangeText={handleNameChange}
              autoFocus
              maxLength={20}
            />
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Tap START to awaken the randomizer</Text>
            <Text style={styles.infoText}>
              Each player will receive a random Frankenstein skin. 
              Your character is ready to join the brain clash!
            </Text>
          </View>

          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Player Setup Progress</Text>
            <View style={styles.progressBar}>
              {players.map((player, index) => (
                <View
                  key={player.id}
                  style={[
                    styles.progressDot,
                    {
                      backgroundColor: index <= currentPlayerIndex ? colors.lightning : colors.border,
                      borderColor: index === currentPlayerIndex ? colors.highlight : colors.border,
                    },
                  ]}
                />
              ))}
            </View>
            <Text style={styles.progressText}>
              {currentPlayerIndex + 1} of {players.length} players
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.startButton, !isCurrentPlayerValid() && styles.startButtonDisabled]}
            onPress={handleNext}
            disabled={!isCurrentPlayerValid()}
          >
            <Text style={styles.startButtonText}>
              {currentPlayerIndex === players.length - 1 ? 'Start Game' : 'Next'}
            </Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.card,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: colors.text,
    fontWeight: 'bold',
  },
  headerTitle: {
    ...fonts.subtitle,
    color: colors.lightning,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shirt: {
    width: 80,
    height: 60,
    borderRadius: 40,
    position: 'absolute',
    bottom: 10,
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 10,
  },
  eye: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 25,
  },
  mouth: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.background,
    position: 'absolute',
    top: 45,
  },
  inputSection: {
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
  nameInput: {
    ...commonStyles.input,
    fontSize: 18,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.lightning,
  },
  infoTitle: {
    ...fonts.subtitle,
    color: colors.lightning,
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  progressTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  progressDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    borderWidth: 2,
  },
  progressText: {
    ...fonts.body,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  startButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
  },
  startButtonDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
  },
  startButtonText: {
    ...commonStyles.buttonText,
  },
  navigation: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  navIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  navText: {
    fontSize: 24,
  },
});

export default PlayerSetupScreen;
