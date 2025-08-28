# Background Images

## Instructions

1. **Add your background image**: Place your background image file in this directory
2. **Update the path**: In `src/components/BackgroundImage.tsx`, update the `require` path to match your image filename
3. **Recommended format**: PNG or JPG format
4. **Recommended size**: 1080x1920 or similar aspect ratio for mobile devices

## Current Setup

The `BackgroundImage` component is currently configured to use:
```typescript
source={require('../assets/img/background.png')}
```

## How to Change

1. Replace `background.png` with your image filename
2. Make sure the image is in this directory (`src/assets/img/`)
3. The image will automatically scale to cover the entire screen

## Example

If you have an image called `myBackground.jpg`, update the BackgroundImage component to:
```typescript
source={require('../assets/img/myBackground.jpg')}
```

## Notes

- The background image is positioned absolutely and covers the entire screen
- It has `zIndex: -1` so it appears behind all other content
- The image uses `resizeMode="cover"` to maintain aspect ratio while filling the screen
