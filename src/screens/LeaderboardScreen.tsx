import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import { Player, GameSettings } from '../types';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

const LeaderboardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, winner, settings } = route.params as { 
    players: Player[]; 
    winner: Player; 
    settings: GameSettings;
  };

  const handlePlayAgain = () => {
    navigation.navigate('GameSetup' as never);
  };

  const handleMainMenu = () => {
    navigation.navigate('MainMenu' as never);
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${position + 1}.`;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 0: return colors.gold;
      case 1: return colors.silver;
      case 2: return colors.bronze;
      default: return colors.textSecondary;
    }
  };

  const renderFrankenstein = (player: Player, isWinner: boolean = false) => {
    const size = isWinner ? 120 : 80;
    
    // Determine which image to show based on player's state
    let imageSource;
    if (player.isEliminated) {
      imageSource = require('../assets/img/fr/Group533.png');
    } else if (player.avatar.missingParts.includes('head')) {
      imageSource = require('../assets/img/fr/Group534.png');
    } else if (player.avatar.missingParts.includes('arm')) {
      imageSource = require('../assets/img/fr/Group535.png');
    } else if (player.avatar.missingParts.includes('leg')) {
      imageSource = require('../assets/img/fr/Group536.png');
    } else {
      imageSource = require('../assets/img/fr/Group533.png');
    }
    
    return (
      <View style={[styles.characterContainer, isWinner && styles.winnerCharacter]}>
        <Image
          source={imageSource}
          style={[styles.avatarImage, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Game Over!</Text>
          <Text style={styles.headerSubtitle}>Final Results</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.winnerSection}>
            <Text style={styles.winnerTitle}>🏆 Winner! 🏆</Text>
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Text style={styles.winnerMessage}>
              {winner.name}, Your Frankenstein survives the clash! You outsmarted the others and rose to the top of the leaderboard.
            </Text>
            {renderFrankenstein(winner, true)}
          </View>

          <View style={styles.leaderboardSection}>
            <Text style={styles.leaderboardTitle}>Final Leaderboard</Text>
            <View style={styles.leaderboardContainer}>
              {players.map((player, index) => (
                <View key={player.id} style={styles.leaderboardRow}>
                  <View style={styles.positionContainer}>
                    <Text style={[styles.positionIcon, { color: getPositionColor(index) }]}>
                      {getPositionIcon(index)}
                    </Text>
                  </View>
                  
                  <View style={styles.playerInfo}>
                    {renderFrankenstein(player)}
                    <View style={styles.playerDetails}>
                      <Text style={styles.playerName}>{player.name}</Text>
                      <Text style={styles.playerScore}>Score: {player.score}</Text>
                      <Text style={styles.playerLives}>Lives: {player.lives}</Text>
                    </View>
                  </View>

                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{player.score}</Text>
                    <Text style={styles.scoreLabel}>points</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.gameStatsSection}>
            <Text style={styles.statsTitle}>Game Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{players.length}</Text>
                <Text style={styles.statLabel}>Players</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{settings.difficulty}</Text>
                <Text style={styles.statLabel}>Difficulty</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{settings.timer}s</Text>
                <Text style={styles.statLabel}>Timer</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{Math.max(...players.map(p => p.score))}</Text>
                <Text style={styles.statLabel}>High Score</Text>
              </View>
            </View>
          </View>

          <View style={styles.achievementSection}>
            <Text style={styles.achievementTitle}>🏅 Achievements</Text>
            <View style={styles.achievementList}>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>👑</Text>
                <Text style={styles.achievementText}>Last Frankenstein Standing</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>⚡</Text>
                <Text style={styles.achievementText}>Brain Clash Champion</Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementIcon}>🧠</Text>
                <Text style={styles.achievementText}>Knowledge Master</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainButtonText}>Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuButton} onPress={handleMainMenu}>
              <Text style={styles.menuButtonText}>Main Menu</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: colors.card,
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.lightning,
    alignItems: 'center',
  },
  headerTitle: {
    ...fonts.title,
    color: colors.lightning,
    marginBottom: 5,
  },
  headerSubtitle: {
    ...fonts.subtitle,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  winnerSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.gold,
    alignItems: 'center',
  },
  winnerTitle: {
    ...fonts.title,
    color: colors.gold,
    marginBottom: 10,
  },
  winnerName: {
    ...fonts.subtitle,
    color: colors.lightning,
    marginBottom: 15,
  },
  winnerMessage: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  winnerCharacter: {
    borderWidth: 3,
    borderColor: colors.gold,
    borderRadius: 30,
    padding: 15,
  },
  leaderboardSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  leaderboardTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 20,
    textAlign: 'center',
  },
  leaderboardContainer: {
    gap: 15,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  positionContainer: {
    width: 50,
    alignItems: 'center',
  },
  positionIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  playerDetails: {
    marginLeft: 15,
  },
  playerName: {
    ...fonts.body,
    fontWeight: '600',
    marginBottom: 5,
  },
  playerScore: {
    ...fonts.caption,
    color: colors.highlight,
    marginBottom: 2,
  },
  playerLives: {
    ...fonts.caption,
    color: colors.textSecondary,
  },
  scoreContainer: {
    alignItems: 'center',
    marginLeft: 15,
  },
  scoreText: {
    ...fonts.subtitle,
    color: colors.lightning,
    fontWeight: 'bold',
  },
  scoreLabel: {
    ...fonts.caption,
    color: colors.textSecondary,
  },
  gameStatsSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  statsTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    ...fonts.subtitle,
    color: colors.lightning,
    marginBottom: 5,
  },
  statLabel: {
    ...fonts.caption,
    color: colors.textSecondary,
  },
  achievementSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  achievementTitle: {
    ...fonts.subtitle,
    color: colors.gold,
    marginBottom: 15,
    textAlign: 'center',
  },
  achievementList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementText: {
    ...fonts.body,
    color: colors.text,
  },
  characterContainer: {
    alignItems: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shirt: {
    position: 'absolute',
    bottom: 5,
  },
  head: {
    backgroundColor: colors.background,
    position: 'absolute',
    top: 5,
  },
  eye: {
    backgroundColor: colors.background,
    position: 'absolute',
    top: 20,
  },
  mouth: {
    backgroundColor: colors.background,
    position: 'absolute',
    top: 35,
  },
  arm: {
    backgroundColor: colors.background,
    position: 'absolute',
    right: 10,
    top: 20,
  },
  leg: {
    backgroundColor: colors.background,
    position: 'absolute',
    bottom: 5,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  playAgainButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
    flex: 1,
  },
  playAgainButtonText: {
    ...commonStyles.buttonText,
  },
  menuButton: {
    ...commonStyles.buttonSecondary,
    flex: 1,
  },
  menuButtonText: {
    ...commonStyles.buttonSecondaryText,
  },
});

export default LeaderboardScreen;
