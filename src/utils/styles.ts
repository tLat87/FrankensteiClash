import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#0f3460',
  highlight: '#e94560',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#f44336',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  background: '#0f0f23',
  card: '#1e1e3f',
  border: '#2d2d5f',
  lightning: '#00d4ff',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32'
};

export const fonts = {
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.text,
    textAlign: 'center' as const,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
    textAlign: 'center' as const,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center' as const,
    lineHeight: 24,
  },
  button: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    textAlign: 'center' as const,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center' as const,
  }
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.lightning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: colors.lightning,
    shadowColor: colors.lightning,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    ...fonts.button,
    color: colors.text,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  buttonSecondaryText: {
    ...fonts.button,
    color: colors.textSecondary,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  center: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  lightningBorder: {
    borderColor: colors.lightning,
    borderWidth: 2,
    shadowColor: colors.lightning,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  }
});

