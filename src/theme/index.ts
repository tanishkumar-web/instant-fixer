// Theme configuration for InstantFixer
export const theme = {
  // Color Palette
  colors: {
    // Primary Gradient: Deep Indigo → Electric Blue
    primaryGradientStart: '#3B0AFF',
    primaryGradientEnd: '#0ACFFF',
    
    // Secondary Accent: Coral → Hot Pink
    secondaryGradientStart: '#FF5F6D',
    secondaryGradientEnd: '#FFC371',
    
    // Background Colors
    backgroundLight: '#F8F9FA',
    backgroundDark: '#0E0E0E',
    
    // Text Colors
    textPrimaryLight: '#1A1A1A',
    textSecondaryLight: '#666666',
    textPrimaryDark: '#F0F0F0',
    textSecondaryDark: '#AAAAAA',
    
    // UI Elements
    cardBgLight: 'rgba(255, 255, 255, 0.8)',
    cardBgDark: 'rgba(30, 30, 30, 0.8)',
  },
  
  // Typography
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  
  // Font Sizes
  fontSizes: {
    h1: '56px',
    h2: '40px',
    h3: '28px',
    body: '16px',
    button: '16px',
  },
  
  // Font Weights
  fontWeights: {
    h1: 700,
    h2: 600,
    h3: 500,
    body: 400,
    button: 500,
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Border Radius
  borderRadius: '16px',
  
  // Shadows
  shadows: {
    card: '0 8px 30px rgba(0, 0, 0, 0.12)',
    hover: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  
  // Transitions
  transitions: {
    speed: '0.3s',
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  }
};