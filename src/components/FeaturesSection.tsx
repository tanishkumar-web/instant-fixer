import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Card from './Card';

const Section = styled.section`
  padding: ${designTokens.spacing.xxl} 0;
  
  &.alt-bg {
    background-color: ${designTokens.colors.background.light};
    
    .dark-mode & {
      background-color: ${designTokens.colors.background.dark};
    }
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
`;

const SectionSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  color: ${designTokens.colors.text.secondary.light};
  max-width: 600px;
  margin: 0 auto;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${designTokens.spacing.md};
  font-size: 24px;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  flex-grow: 1;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Professional Service 1',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  },
  {
    id: 2,
    title: 'Professional Service 2',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  },
  {
    id: 3,
    title: 'Professional Service 3',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  },
  {
    id: 4,
    title: 'Professional Service 4',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  },
  {
    id: 5,
    title: 'Professional Service 5',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  },
  {
    id: 6,
    title: 'Professional Service 6',
    description: 'Expert professionals ready to help with all your needs. Fast, reliable, and affordable service.',
    icon: '⭐'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <Section className="alt-bg">
      <div className="container">
        <SectionHeader>
          <SectionTitle>Popular Services</SectionTitle>
          <SectionSubtitle>
            Discover our most requested services from trusted professionals in your area.
          </SectionSubtitle>
        </SectionHeader>
        
        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div style={{ marginTop: designTokens.spacing.md }}>
                <span style={{ fontWeight: designTokens.typography.fontWeight.bold, fontSize: designTokens.typography.fontSize.h3 }}>
                  From ₹499
                </span>
              </div>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </Section>
  );
};

export default FeaturesSection;