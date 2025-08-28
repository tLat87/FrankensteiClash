import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import BackgroundImage from '../components/BackgroundImage';

const RulesScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const rules = [
    {
      title: 'Game Setup',
      items: [
        'Choose number of players (3-6)',
        'Select difficulty level (Easy/Medium/Hard)',
        'Set timer (5/10/15 seconds)',
        'Each player gets a random Frankenstein avatar',
      ],
    },
    {
      title: 'How to Play',
      items: [
        'Players take turns naming words from the selected category',
        'You have limited time to answer',
        'Each player starts with 3 lives',
        'Fail to answer, repeat a word, or stay silent → lose a life',
      ],
    },
    {
      title: 'Losing Lives',
      items: [
        'When you lose a life, your Frankenstein loses a body part',
        'First life lost: lose an arm or leg',
        'Second life lost: lose another body part',
        'Third life lost: your Frankenstein collapses completely',
      ],
    },
    {
      title: 'Winning Conditions',
      items: [
        'Last Frankenstein standing wins the round',
        'Winner gets the highest score',
        'Other players score based on how long they survived',
        'Game continues until only one player remains',
      ],
    },
    {
      title: 'Scoring System',
      items: [
        'Surviving players: 100 points per life remaining',
        'Bonus points for quick answers',
        'Penalty for repeated words',
        'Leaderboard tracks all-time best scores',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Game Rules</Text>
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

          <View style={styles.introSection}>
            <Text style={styles.introTitle}>Frankenstein Brain Clash</Text>
            <Text style={styles.introText}>
              A fast-paced party game where knowledge and quick thinking determine which Frankenstein survives the ultimate brain clash!
            </Text>
          </View>

          {rules.map((rule, index) => (
            <View key={index} style={styles.ruleSection}>
              <Text style={styles.ruleTitle}>{rule.title}</Text>
              {rule.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.ruleItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.ruleText}>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          <View style={styles.tipSection}>
            <Text style={styles.tipTitle}>💡 Pro Tips</Text>
            <Text style={styles.tipText}>
              Think fast, but don't panic! Sometimes the simplest answers are the best. 
              Watch your opponents' Frankensteins fall apart while you stay strong!
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.startButton} onPress={handleBack}>
            <Text style={styles.startButtonText}>Got It!</Text>
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
  introSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.lightning,
  },
  introTitle: {
    ...fonts.subtitle,
    color: colors.lightning,
    marginBottom: 10,
    textAlign: 'center',
  },
  introText: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  ruleSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: colors.border,
  },
  ruleTitle: {
    ...fonts.subtitle,
    color: colors.highlight,
    marginBottom: 15,
    textAlign: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 18,
    color: colors.lightning,
    marginRight: 10,
    marginTop: 2,
  },
  ruleText: {
    ...fonts.body,
    flex: 1,
    textAlign: 'left',
    lineHeight: 22,
  },
  tipSection: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.gold,
  },
  tipTitle: {
    ...fonts.subtitle,
    color: colors.gold,
    marginBottom: 10,
    textAlign: 'center',
  },
  tipText: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
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
  startButtonText: {
    ...commonStyles.buttonText,
  },
});

export default RulesScreen;
