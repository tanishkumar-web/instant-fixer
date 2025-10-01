import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const Section = styled.section`
  padding: ${designTokens.spacing.xxl} 0;
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

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.xxl};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const StepCard = styled.div`
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.lg};
  font-size: 24px;
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: white;
`;

const StepTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.md};
`;

const StepDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 1,
    number: '01',
    title: 'Describe Your Need',
    description: 'Tell us what service you need and your location'
  },
  {
    id: 2,
    number: '02',
    title: 'Get Matched',
    description: 'Our AI matches you with the best local helpers'
  },
  {
    id: 3,
    number: '03',
    title: 'Get Service Done',
    description: 'Professional arrives and completes your task'
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <Section>
      <div className="container">
        <SectionHeader>
          <SectionTitle>How InstantFixer Works</SectionTitle>
          <SectionSubtitle>
            Getting help has never been easier. Just follow these simple steps.
          </SectionSubtitle>
        </SectionHeader>
        
        <StepsGrid>
          {steps.map((step) => (
            <StepCard key={step.id}>
              <StepNumber>{step.number}</StepNumber>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </StepCard>
          ))}
        </StepsGrid>
      </div>
    </Section>
  );
};

export default HowItWorksSection;