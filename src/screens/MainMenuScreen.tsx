import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

const MainMenuScreen = () => {
  const navigation = useNavigation();

  const handleStartGame = () => {
    navigation.navigate('GameSetup' as never);
  };

  const handleRules = () => {
    navigation.navigate('Rules' as never);
  };

  const handleSettings = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={require('../assets/img/FrankensteinBrainClash/1.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Frankenstein Brain Clash</Text>
            <Text style={styles.subtitle}>Step into the electrified arena where only the smartest Frankensteins survive</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={styles.infoText}>• Each player has 3 lives</Text>
            <Text style={styles.infoText}>• Choose a category and name a word in time</Text>
            <Text style={styles.infoText}>• Fail or repeat → lose a life</Text>
            <Text style={styles.infoText}>• Last Frankenstein standing wins the round and scores the most points</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rulesButton} onPress={handleRules}>
              <Text style={styles.rulesButtonText}>Rules</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
              <Text style={styles.settingsButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>

            <View  style={{marginBottom: 100}}/>
              
          
        </ScrollView>

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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    ...fonts.title,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...fonts.body,
    textAlign: 'center',
    color: colors.textSecondary,
    paddingHorizontal: 20,
  },
  gameInfo: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  infoText: {
    ...fonts.body,
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  startButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
    width: width * 0.7,
    marginBottom: 20,
  },
  startButtonText: {
    ...commonStyles.buttonText,
    fontSize: 20,
  },
  rulesButton: {
    ...commonStyles.buttonSecondary,
    width: width * 0.7,
    marginBottom: 15,
  },
  rulesButtonText: {
    ...commonStyles.buttonSecondaryText,
  },
  settingsButton: {
    ...commonStyles.buttonSecondary,
    width: width * 0.7,
  },
  settingsButtonText: {
    ...commonStyles.buttonSecondaryText,
  },
  characterContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  character: {
    width: 150,
    height: 150,
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

export default MainMenuScreen;
