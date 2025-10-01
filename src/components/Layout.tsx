import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Button from '../components/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: ${designTokens.zIndex.sticky};
  background-color: ${designTokens.colors.background.light};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${designTokens.spacing.md} 0;
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${designTokens.spacing.md};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.sm};
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${designTokens.typography.fontSize.h3};
  color: white;
`;

const LogoText = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  background: ${designTokens.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
`;

const Nav = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: ${designTokens.spacing.xl};
  }
`;

const NavLink = styled.a`
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary.light};
  text-decoration: none;
  transition: color ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
  
  &:hover {
    color: ${designTokens.colors.primary.indigo};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing.md};
`;

const DarkModeToggle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${designTokens.colors.background.light};
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    background-color: ${designTokens.colors.background.light};
    transform: scale(1.1);
    
    .dark-mode & {
      background-color: ${designTokens.colors.background.dark};
    }
  }
`;

const Footer = styled.footer`
  background-color: ${designTokens.colors.background.dark};
  color: ${designTokens.colors.text.primary.dark};
  padding: ${designTokens.spacing.xxl} 0;
  margin-top: ${designTokens.spacing.xxl};
`;

const FooterContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 ${designTokens.spacing.md};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.xl};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterColumn = styled.div`
  h3 {
    font-size: ${designTokens.typography.fontSize.h3};
    margin-bottom: ${designTokens.spacing.md};
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: ${designTokens.spacing.sm};
  }
  
  a {
    color: ${designTokens.colors.text.secondary.dark};
    text-decoration: none;
    transition: color ${designTokens.transitions.duration.normal};
    
    &:hover {
      color: white;
    }
  }
`;

const Copyright = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${designTokens.spacing.xl};
  padding-top: ${designTokens.spacing.md};
  text-align: center;
  color: ${designTokens.colors.text.secondary.dark};
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Apply dark mode class to body
    if (prefersDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };
  
  return (
    <>
      <StyledHeader>
        <HeaderContainer>
          <LogoContainer>
            <LogoIcon>IF</LogoIcon>
            <LogoText>InstantFixer</LogoText>
          </LogoContainer>
          
          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/helpers">Helpers</NavLink>
            <NavLink href="/how-it-works">How It Works</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
          </Nav>
          
          <HeaderActions>
            <DarkModeToggle onClick={toggleDarkMode} aria-label="Toggle dark mode">
              {isDarkMode ? '☀️' : '🌙'}
            </DarkModeToggle>
            <Button variant="secondary" size="small">Login</Button>
            <Button variant="primary" size="small">Sign Up</Button>
          </HeaderActions>
        </HeaderContainer>
      </StyledHeader>
      
      <main>
        {children}
      </main>
      
      <Footer>
        <FooterContainer>
          <FooterGrid>
            <FooterColumn>
              <LogoContainer>
                <LogoIcon>IF</LogoIcon>
                <LogoText>InstantFixer</LogoText>
              </LogoContainer>
              <p style={{ color: designTokens.colors.text.secondary.dark, marginTop: designTokens.spacing.md }}>
                Your ultimate platform for finding trusted local helpers for all your needs.
              </p>
            </FooterColumn>
            
            <FooterColumn>
              <h3>Services</h3>
              <ul>
                <li><a href="#">Home Services</a></li>
                <li><a href="#">Tech Support</a></li>
                <li><a href="#">Personal Care</a></li>
                <li><a href="#">Business Services</a></li>
              </ul>
            </FooterColumn>
            
            <FooterColumn>
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
              </ul>
            </FooterColumn>
            
            <FooterColumn>
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </FooterColumn>
          </FooterGrid>
          
          <Copyright>
            <p>© {new Date().getFullYear()} InstantFixer. All rights reserved.</p>
          </Copyright>
        </FooterContainer>
      </Footer>
    </>
  );
};

export default Layout;