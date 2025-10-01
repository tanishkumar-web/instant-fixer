// Design tokens for InstantFixer
export const designTokens = {
  // Colors
  colors: {
    // Primary Gradient: Deep Indigo → Electric Blue
    primary: {
      indigo: '#3B0AFF',
      blue: '#0ACFFF',
      gradient: 'linear-gradient(90deg, #3B0AFF, #0ACFFF)'
    },
    
    // Secondary Accent: Coral → Hot Pink
    secondary: {
      coral: '#FF5F6D',
      pink: '#FFC371',
      gradient: 'linear-gradient(90deg, #FF5F6D, #FFC371)'
    },
    
    // Background Colors
    background: {
      light: '#F8F9FA',
      dark: '#0E0E0E'
    },
    
    // Card Backgrounds
    cardBgLight: 'rgba(255, 255, 255, 0.8)',
    cardBgDark: 'rgba(30, 30, 30, 0.8)',
    
    // Text Colors
    text: {
      primary: {
        light: '#1A1A1A',
        dark: '#F0F0F0'
      },
      secondary: {
        light: '#666666',
        dark: '#AAAAAA'
      }
    },
    
    // Status Colors
    status: {
      success: '#4CAF50',
      warning: '#FFC107',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      body: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    },
    
    fontSize: {
      h1: '56px',
      h2: '40px',
      h3: '28px',
      body: '16px',
      caption: '14px',
      button: '16px'
    },
    
    fontWeight: {
      bold: 700,
      semiBold: 600,
      medium: 500,
      regular: 400
    },
    
    lineHeight: {
      heading: 1.2,
      body: 1.5
    }
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  },
  
  // Borders
  borders: {
    radius: {
      small: '8px',
      medium: '16px',
      large: '24px',
      circle: '50%'
    },
    width: {
      thin: '1px',
      thick: '2px'
    }
  },
  
  // Shadows
  shadows: {
    small: '0 4px 12px rgba(0, 0, 0, 0.08)',
    medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
    large: '0 12px 40px rgba(0, 0, 0, 0.15)'
  },
  
  // Transitions
  transitions: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s'
    },
    easing: {
      default: 'ease-in-out',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px'
  },
  
  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};