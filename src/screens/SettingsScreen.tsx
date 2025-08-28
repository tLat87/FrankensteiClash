import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import { AppSettings } from '../types';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState<AppSettings>({
    music: true,
    vibration: true,
    notifications: true,
    language: 'English',
    theme: 'Dark',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const toggleSetting = (key: keyof AppSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all game progress? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => console.log('Progress reset') }
      ]
    );
  };

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data? This will free up storage space.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => console.log('Cache cleared') }
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Frankenstein Brain Clash',
      'Version 1.0.0\n\nA fast-paced party game where knowledge and quick thinking determine which Frankenstein survives the ultimate brain clash!'
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your privacy is important to us. This app does not collect personal information and all game data is stored locally on your device.'
    );
  };

  const handleTermsOfService = () => {
    Alert.alert(
      'Terms of Service',
      'By using this app, you agree to play fairly and respect other players. Cheating or exploiting bugs is not allowed.'
    );
  };

  const renderSettingItem = (
    title: string,
    description: string,
    value: boolean,
    onToggle: () => void,
    icon: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.lightning }}
        thumbColor={value ? colors.text : colors.textSecondary}
        ios_backgroundColor={colors.border}
      />
    </View>
  );

  const renderActionItem = (
    title: string,
    description: string,
    onPress: () => void,
    icon: string,
    isDestructive: boolean = false
  ) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingIcon}>{icon}</Text>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>
            {title}
          </Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Text style={styles.arrowIcon}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                      <View style={styles.characterContainer}>
              <Image
                source={require('../assets/img/FrankensteinBrainClash/4.png')}
                style={styles.character}
                resizeMode="contain"
              />
            </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Preferences</Text>
            {/* {renderSettingItem(
              'Background Music',
              'Enable or disable background music during gameplay',
              settings.music,
              () => toggleSetting('music'),
              '🎵'
            )} */}
            {renderSettingItem(
              'Vibration',
              'Enable haptic feedback for better game experience',
              settings.vibration,
              () => toggleSetting('vibration'),
              '📳'
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Data</Text>
            {renderActionItem(
              'Reset Progress',
              'Clear all game progress and start fresh',
              handleResetProgress,
              '🔄',
              true
            )}
            {renderActionItem(
              'Clear Cache',
              'Free up storage space by clearing cached data',
              handleClearCache,
              '🗑️'
            )}
          </View>

          {/* <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information</Text>
            {renderActionItem(
              'About Game',
              'Learn more about Frankenstein Brain Clash',
              handleAbout,
              'ℹ️'
            )}
            {renderActionItem(
              'Privacy Policy',
              'Read our privacy policy and data handling',
              handlePrivacyPolicy,
              '🔒'
            )}
            {renderActionItem(
              'Terms of Service',
              'Read our terms and conditions',
              handleTermsOfService,
              '📋'
            )}
          </View> */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Statistics</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Games Played</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Total Score</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Best Score</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>Wins</Text>
              </View>
            </View>
          </View>

          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
            <Text style={styles.copyrightText}>© 2024 Frankenstein Brain Clash</Text>
          </View>
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
    width: 200,
    height: 200,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
    textAlign: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...fonts.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    ...fonts.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  destructiveText: {
    color: colors.danger,
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.textSecondary,
    marginLeft: 10,
  },
  statsContainer: {
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
    textAlign: 'center',
  },
  versionSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  versionText: {
    ...fonts.caption,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  copyrightText: {
    ...fonts.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SettingsScreen;
