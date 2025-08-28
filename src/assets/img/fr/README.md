# Frankenstein Images

This directory contains images for the Frankenstein characters in the game.

## Required Images

Place the following PNG images in this directory:

### 1. `Group533.png`
- **Full Frankenstein** - Complete character with all body parts
- **Size**: 100x100px recommended
- **Used when**: Player has 3 lives (full health) or is eliminated

### 2. `Group536.png`
- **Frankenstein missing leg** - Character without one leg
- **Size**: 100x100px recommended
- **Used when**: Player has 1 life remaining

### 3. `Group535.png`
- **Frankenstein missing arm** - Character without one arm
- **Size**: 100x100px recommended
- **Used when**: Player has 2 lives remaining

### 4. `Group534.png`
- **Frankenstein missing head** - Character without head
- **Size**: 100x100px recommended
- **Used when**: Player has 0 lives (about to be eliminated)

## Image Requirements

- **Format**: PNG (transparent background recommended)
- **Dimensions**: 100x100px or larger (will be scaled down)
- **Style**: Consistent with the game's Frankenstein theme
- **Quality**: High resolution for crisp display

## How It Works

The game automatically selects the appropriate image based on:
1. **Player's current lives** (3, 2, 1, 0)
2. **Missing body parts** (leg, arm, head)
3. **Elimination status**

The images will be displayed in a circular frame with the player's name and life count below.
