import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Button from './Button';
import Card from './Card';

const HeroSectionWrapper = styled.section`
  padding: ${designTokens.spacing.xxl} 0;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: ${designTokens.spacing.xxxl} 0;
  }
`;

const HeroTitle = styled.h1`
  font-size: 40px;
  margin-bottom: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    font-size: ${designTokens.typography.fontSize.h1};
    margin-bottom: ${designTokens.spacing.lg};
  }
  
  @media (min-width: 1024px) {
    font-size: 72px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.h3};
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.xxl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
  
  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const SearchContainer = styled.div`
  max-width: 800px;
  margin: 0 auto ${designTokens.spacing.xxl};
  
  @media (min-width: 768px) {
    display: flex;
    gap: ${designTokens.spacing.md};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: ${designTokens.spacing.md};
  font-size: ${designTokens.typography.fontSize.body};
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${designTokens.colors.primary.indigo};
    box-shadow: 0 0 0 3px rgba(59, 10, 255, 0.2);
  }
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  max-width: 800px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled(Card)`
  text-align: center;
  padding: ${designTokens.spacing.lg};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.md};
  font-size: 24px;
`;

const ServiceTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.body};
  margin: 0;
`;

interface Service {
  id: number;
  name: string;
  icon: string;
}

const services: Service[] = [
  { id: 1, name: 'Plumbing', icon: '🔧' },
  { id: 2, name: 'Electrical', icon: '💡' },
  { id: 3, name: 'Cleaning', icon: '🧹' },
  { id: 4, name: 'Tutoring', icon: '📚' },
];

const HeroSection: React.FC = () => {
  return (
    <HeroSectionWrapper>
      <HeroTitle className="gradient-text">Your Ultimate Local Helper Platform</HeroTitle>
      <HeroSubtitle>
        Connect with trusted professionals for all your home, tech, and personal needs. 
        Fast, reliable, and hassle-free service at your fingertips.
      </HeroSubtitle>
      
      <SearchContainer>
        <SearchInput type="text" placeholder="What service do you need?" />
        <SearchInput type="text" placeholder="Your location" />
        <Button variant="primary">Find Helpers</Button>
      </SearchContainer>
      
      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service.id}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.name}</ServiceTitle>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </HeroSectionWrapper>
  );
};

export default HeroSection;