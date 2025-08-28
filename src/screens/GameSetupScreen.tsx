import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import { GameSettings } from '../types';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

const GameSetupScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState<GameSettings>({
    numberOfPlayers: 3,
    difficulty: 'Easy',
    timer: 5,
    categories: [],
  });

  const handleNext = () => {
    navigation.navigate('PlayerSetup' as never, { settings } as never);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const updateSetting = (key: keyof GameSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderRadioButton = (
    label: string,
    value: any,
    currentValue: any,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={styles.radioButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.radioCircle}>
        {currentValue === value && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Let's setup the game</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                      <View style={styles.characterContainer}>
              <Image
                source={require('../assets/img/FrankensteinBrainClash/3.png')}
                style={styles.character}
                resizeMode="contain"
              />
            </View>

          <View style={styles.settingsContainer}>
            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Number of Players</Text>
              <View style={styles.radioGroup}>
                {renderRadioButton(
                  '3',
                  3,
                  settings.numberOfPlayers,
                  () => updateSetting('numberOfPlayers', 3)
                )}
                {renderRadioButton(
                  '4',
                  4,
                  settings.numberOfPlayers,
                  () => updateSetting('numberOfPlayers', 4)
                )}
                {renderRadioButton(
                  '5',
                  5,
                  settings.numberOfPlayers,
                  () => updateSetting('numberOfPlayers', 5)
                )}
                {renderRadioButton(
                  '6',
                  6,
                  settings.numberOfPlayers,
                  () => updateSetting('numberOfPlayers', 6)
                )}
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Difficulty</Text>
              <View style={styles.radioGroup}>
                {renderRadioButton(
                  'Easy',
                  'Easy',
                  settings.difficulty,
                  () => updateSetting('difficulty', 'Easy')
                )}
                {renderRadioButton(
                  'Medium',
                  'Medium',
                  settings.difficulty,
                  () => updateSetting('difficulty', 'Medium')
                )}
                {renderRadioButton(
                  'Hard',
                  'Hard',
                  settings.difficulty,
                  () => updateSetting('difficulty', 'Hard')
                )}
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.settingTitle}>Timer</Text>
              <View style={styles.radioGroup}>
                {renderRadioButton(
                  '5 sec',
                  5,
                  settings.timer,
                  () => updateSetting('timer', 5)
                )}
                {renderRadioButton(
                  '10 sec',
                  10,
                  settings.timer,
                  () => updateSetting('timer', 10)
                )}
                {renderRadioButton(
                  '15 sec',
                  15,
                  settings.timer,
                  () => updateSetting('timer', 15)
                )}
              </View>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Game Preview</Text>
            <Text style={styles.infoText}>
              {settings.numberOfPlayers} players • {settings.difficulty} difficulty • {settings.timer} second timer
            </Text>
            <Text style={styles.infoSubtext}>
              Each player will get a random Frankenstein avatar and start with 3 lives.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
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
    marginVertical: 20,
  },
  character: {
    width: 220,
    height: 220,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  settingSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.border,
  },
  settingTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 15,
    textAlign: 'center',
  },
  radioGroup: {
    gap: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightning,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.lightning,
  },
  radioLabel: {
    ...fonts.body,
    fontSize: 18,
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
    marginBottom: 8,
    color: colors.highlight,
  },
  infoSubtext: {
    ...fonts.body,
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
  },
  footer: {
    padding: 20,
    backgroundColor: colors.card,
    borderTopWidth: 2,
    borderTopColor: colors.border,
  },
  nextButton: {
    ...commonStyles.button,
    ...commonStyles.lightningBorder,
  },
  nextButtonText: {
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

export default GameSetupScreen;
