// Global styles for InstantFixer
import { createGlobalStyle } from 'styled-components';
import { designTokens } from './tokens';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
  
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${designTokens.typography.fontFamily.body};
    background-color: ${designTokens.colors.background.light};
    color: ${designTokens.colors.text.primary.light};
    transition: background-color ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.default},
                color ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.default};
    line-height: ${designTokens.typography.lineHeight.body};
  }
  
  body.dark-mode {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${designTokens.typography.fontFamily.heading};
    font-weight: ${designTokens.typography.fontWeight.bold};
    line-height: ${designTokens.typography.lineHeight.heading};
  }
  
  h1 {
    font-size: ${designTokens.typography.fontSize.h1};
  }
  
  h2 {
    font-size: ${designTokens.typography.fontSize.h2};
  }
  
  h3 {
    font-size: ${designTokens.typography.fontSize.h3};
  }
  
  .container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .gradient-text {
    background: ${designTokens.colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.default};
    border: none;
    outline: none;
  }
  
  .btn-primary {
    background: ${designTokens.colors.primary.gradient};
    color: white;
    box-shadow: 0 4px 20px rgba(59, 10, 255, 0.3);
  }
  
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(59, 10, 255, 0.4);
  }
  
  .btn-secondary {
    background: ${designTokens.colors.secondary.gradient};
    color: white;
    box-shadow: 0 4px 20px rgba(255, 95, 109, 0.3);
  }
  
  .btn-secondary:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(255, 95, 109, 0.4);
  }
  
  .card {
    border-radius: ${designTokens.borders.radius.medium};
    box-shadow: ${designTokens.shadows.medium};
    padding: 24px;
    transition: transform ${designTokens.transitions.duration.normal}, 
                box-shadow ${designTokens.transitions.duration.normal};
    backdrop-filter: blur(10px);
    background: ${designTokens.colors.cardBgLight};
  }
  
  .dark-mode .card {
    background: ${designTokens.colors.cardBgDark};
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: ${designTokens.shadows.large};
  }
  
  /* Animation Utilities */
  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .slide-in-left {
    animation: slideInLeft 0.5s ease-out;
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  .slide-in-right {
    animation: slideInRight 0.5s ease-out;
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
    
    .card {
      padding: 16px;
    }
    
    h1 {
      font-size: 40px;
    }
    
    h2 {
      font-size: 32px;
    }
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 0 10px;
    }
    
    h1 {
      font-size: 32px;
    }
    
    h2 {
      font-size: 28px;
    }
  }
`;

export default GlobalStyles;