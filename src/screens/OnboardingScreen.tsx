import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, fonts, commonStyles } from '../utils/styles';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      id: 1,
      title: 'Welcome to Frankenstein Brain Clash!',
      description: 'Step into the electrified arena where only the smartest Frankensteins survive.',
      image: require('../assets/img/FrankensteinBrainClash/1.png'), // Loader посилання на графіку
      backgroundColor: colors.primary,
    },
    {
      id: 2,
      title: 'Choose Your Challenge',
      description: 'Select from various categories and difficulty levels. Test your knowledge with friends!',
      image: require('../assets/img/FrankensteinBrainClash/2.png'), // Loader посилання на графіку
      backgroundColor: colors.secondary,
    },
    {
      id: 3,
      title: 'Keep Your Frankenstein Alive',
      description: 'Answer correctly or watch your Frankenstein fall apart piece by piece. Every mistake costs a life!',
      image: require('../assets/img/FrankensteinBrainClash/3.png'), // Loader посилання на графіку
      backgroundColor: colors.accent,
    },
    {
      id: 4,
      title: 'Climb the Leaderboard',
      description: 'Compete with friends and family. Only the last Frankenstein standing claims the top score!',
      image: require('../assets/img/FrankensteinBrainClash/4.png'), // Loader посилання на графіку
      backgroundColor: colors.highlight,
    },
  ];

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate('MainMenu' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('MainMenu' as never);
  };

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.mainScrollView}
        >
          {slides.map((slide, index) => (
            <View key={slide.id} style={[styles.slide]}>
              <ScrollView 
                style={styles.slideScrollView} 
                contentContainerStyle={styles.slideContent}
                showsVerticalScrollIndicator={false}
              >
                        <View style={styles.imageContainer}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
        </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          

          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Image source={require('../assets/img/Group525.png')} resizeMode="contain" />
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
    // backgroundColor: colors.background,
  },
  mainScrollView: {
    flex: 1,
  },
  slide: {
    width,
    
    height,
  },
  slideScrollView: {
    flex: 1,
    marginBottom: 100,
  },
  slideContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: height * 0.4,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...fonts.title,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    ...fonts.body,
    textAlign: 'center',
    lineHeight: 28,
  },
  footer: {

    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  skipButtonText: {
    ...fonts.button,
    color: colors.textSecondary,
  },
  nextButton: {
    // ...commonStyles.button,
    // paddingHorizontal: 40,
  
  },
  nextButtonText: {
    ...commonStyles.buttonText,
  },
});

export default OnboardingScreen;
