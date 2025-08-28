import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundImageProps {
  children: React.ReactNode;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <>
      {/* 
        TODO: Replace this with your actual background image
        Place your image file in src/assets/img/ directory
        Update the path below to match your image filename
      */}
      <Image
        source={require('../assets/img/c7919610d554b71abaf818a46f792714c9418c89.png')} // Replace 'background.png' with your image filename
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    // zIndex: 0,
  },
});

export default BackgroundImage;

