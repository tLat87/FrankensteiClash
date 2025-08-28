# Frankenstein Brain Clash

A fast-paced party game where knowledge and quick thinking determine which Frankenstein survives the ultimate brain clash!

## 🎮 Game Description

**Frankenstein Brain Clash** - Step into the electrified arena where only the smartest Frankensteins survive. A fast-paced party game for 3–6 players, perfect for friends, family, and late-night challenges.

### How it Works
- Choose your category and difficulty
- Each player has seconds to give the right answer
- Fail, repeat, or stay silent – and your Frankenstein falls apart piece by piece
- The last Frankenstein standing claims the top score

### Features
- 4 onboarding screens to guide new players
- Unique randomized Frankenstein avatars for each player
- Flexible settings: 3–6 players, Easy / Medium / Hard categories, timer 5–15 sec
- Scoring system and persistent leaderboard
- Simple, fun rules – but only one true winner

**Can you keep your Frankenstein alive and climb to the top? Download now and join the Brain Clash!**

## 🖼️ Background Image Setup

**IMPORTANT**: You need to add your own background image to make the app work properly.

### Quick Setup
1. **Add your image**: Place your background image in `src/assets/img/` directory
2. **Update the path**: In `src/components/BackgroundImage.tsx`, change the filename in the require statement
3. **Recommended format**: PNG or JPG, 1080x1920 or similar mobile aspect ratio

### Example
```typescript
// In src/components/BackgroundImage.tsx
source={require('../assets/img/yourImage.png')} // Replace 'yourImage.png' with your filename
```

### Current Status
- ✅ All screens created and functional
- ✅ BackgroundImage component integrated in all screens
- ⚠️ **Background image placeholder needs to be replaced with your actual image**

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. **Add your background image** (see instructions above)
4. Run the app:
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 📱 Screens

### 1. Onboarding (4 screens)
- Welcome introduction
- Game mechanics explanation
- Player setup guidance
- Ready to play

### 2. Main Menu
- Game start button
- Rules access
- Settings access
- Game information

### 3. Rules
- Comprehensive game rules
- How to play instructions
- Scoring system explanation

### 4. Game Setup
- Player count selection (3-6)
- Difficulty level (Easy/Medium/Hard)
- Timer settings (5/10/15 seconds)

### 5. Player Setup
- Individual player name input
- Random Frankenstein avatar assignment
- Progress tracking

### 6. Gameplay
- Active game screen
- Timer countdown
- Word input and validation
- Player turn management
- Frankenstein avatar damage visualization

### 7. Leaderboard
- Final game results
- Player rankings
- Game statistics
- Achievement display

### 8. Settings
- Game preferences (music, vibration)
- Data management
- Game information
- Statistics display

## 🎨 Design System

### Colors
- **Primary**: Dark blue theme
- **Secondary**: Complementary colors
- **Accent**: Highlight elements
- **Lightning**: Special effects
- **Gold/Silver/Bronze**: Achievement colors

### Typography
- **Title**: Large, bold headers
- **Subtitle**: Medium, semi-bold
- **Body**: Regular text
- **Button**: Action text
- **Caption**: Small, secondary text

## 🎯 Game Categories

### Easy
- Animals
- Colors
- Food & Drinks
- Basic Objects

### Medium
- Capital Cities
- Movies
- Sports
- Famous People

### Hard
- Science
- Literature
- Inventions
- Historical Events

## 🔧 Technical Features

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Screen navigation management
- **Redux Toolkit**: State management
- **Redux Persist**: Data persistence
- **Animated API**: Smooth animations
- **Responsive Design**: Adapts to different screen sizes

## 🎮 Game Mechanics

### Core Loop
1. Player selects category and difficulty
2. Timer starts for current player
3. Player must name a word from the category
4. Success: +100 points, next player
5. Failure: -1 life, Frankenstein loses body part
6. Game continues until one player remains

### Scoring System
- **Correct answer**: +100 points
- **Bonus points**: Quick responses
- **Penalty**: Repeated words
- **Life bonus**: Points for remaining lives

### Avatar Damage System
- **3 lives**: Full Frankenstein
- **2 lives**: Missing arm/leg
- **1 life**: Multiple missing parts
- **0 lives**: Eliminated

## 📱 Screen Flow

```
Onboarding → Main Menu → Game Setup → Player Setup → Gameplay → Leaderboard
     ↓              ↓           ↓           ↓           ↓           ↓
   Skip/Next    Start Game   Configure   Enter Names  Play Game  Play Again
                                                      ↓
                                                 Main Menu
```

## 🚧 Future Enhancements

- [ ] Sound effects and background music
- [ ] More game categories
- [ ] Multiplayer online support
- [ ] Achievement system
- [ ] Custom avatar creation
- [ ] Tournament mode
- [ ] Social sharing
- [ ] Analytics and statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Native community
- Game design inspiration from classic party games
- Frankenstein theme and concept

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the code comments
3. Open an issue on GitHub
4. Contact the development team

---

**Remember**: Add your background image to make the app fully functional! 🖼️✨
