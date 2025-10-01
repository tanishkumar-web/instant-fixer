import React from 'react';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import MicroInteractions from '../components/MicroInteractions';

const PageContainer = styled.div`
  padding: ${designTokens.spacing.xl} 0;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xxl};
`;

const PageTitle = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
`;

const PageSubtitle = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  color: ${designTokens.colors.text.secondary.light};
  max-width: 700px;
  margin: 0 auto;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
  text-align: center;
`;

// Animation examples
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const BounceExample = styled.div`
  width: 80px;
  height: 80px;
  background: ${designTokens.colors.primary.gradient};
  border-radius: ${designTokens.borders.radius.small};
  margin: 0 auto;
  animation: ${bounce} 2s infinite;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 10, 255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(59, 10, 255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 10, 255, 0);
  }
`;

const PulseExample = styled.div`
  width: 80px;
  height: 80px;
  background: ${designTokens.colors.secondary.gradient};
  border-radius: 50%;
  margin: 0 auto;
  animation: ${pulse} 2s infinite;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FadeInExample = styled.div`
  padding: ${designTokens.spacing.lg};
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.small};
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  max-width: 300px;
  margin: 0 auto;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SlideInLeftExample = styled.div`
  padding: ${designTokens.spacing.lg};
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.small};
  text-align: center;
  animation: ${slideInLeft} 0.5s ease-out;
  max-width: 300px;
  margin: 0 auto;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SlideInRightExample = styled.div`
  padding: ${designTokens.spacing.lg};
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.small};
  text-align: center;
  animation: ${slideInRight} 0.5s ease-out;
  max-width: 300px;
  margin: 0 auto;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const AnimationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.xxl};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AnimationCard = styled.div`
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.borders.radius.medium};
  background: ${designTokens.colors.cardBgLight};
  text-align: center;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const AnimationTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: ${designTokens.spacing.lg} 0;
`;

const AnimationDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const TransitionsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TransitionCard = styled.div`
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.background.light};
  text-align: center;
  transition: all ${designTokens.transitions.duration.normal} ${designTokens.transitions.easing.smooth};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${designTokens.shadows.large};
    background: ${designTokens.colors.primary.gradient};
    color: white;
  }
`;

const AnimationsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Animations & Micro-interactions - InstantFixer</title>
        <meta name="description" content="Explore the premium animations and micro-interactions in InstantFixer" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Premium Animations & Micro-interactions</PageTitle>
          <PageSubtitle>
            Experience our cutting-edge UI animations and micro-interactions that make 
            every interaction feel smooth and delightful.
          </PageSubtitle>
        </PageHeader>
        
        <SectionTitle>Key Animations</SectionTitle>
        
        <AnimationsGrid>
          <AnimationCard>
            <BounceExample />
            <AnimationTitle>Bounce Animation</AnimationTitle>
            <AnimationDescription>
              Adds playful energy to elements with a bouncing effect.
            </AnimationDescription>
          </AnimationCard>
          
          <AnimationCard>
            <PulseExample />
            <AnimationTitle>Pulse Animation</AnimationTitle>
            <AnimationDescription>
              Draws attention with a subtle pulsing glow effect.
            </AnimationDescription>
          </AnimationCard>
          
          <AnimationCard>
            <FadeInExample>
              <p>Fade In Effect</p>
            </FadeInExample>
            <AnimationTitle>Fade In Animation</AnimationTitle>
            <AnimationDescription>
              Smoothly introduces elements with opacity and position transitions.
            </AnimationDescription>
          </AnimationCard>
          
          <AnimationCard>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <SlideInLeftExample>
                <p>Slide Left</p>
              </SlideInLeftExample>
              <SlideInRightExample>
                <p>Slide Right</p>
              </SlideInRightExample>
            </div>
            <AnimationTitle>Slide Animations</AnimationTitle>
            <AnimationDescription>
              Elegant entry animations from different directions.
            </AnimationDescription>
          </AnimationCard>
        </AnimationsGrid>
        
        <SectionTitle>Hover Transitions</SectionTitle>
        
        <TransitionsSection>
          <TransitionCard>
            <h3>Smooth Hover Effect</h3>
            <p>Hover over this card to see the transition</p>
          </TransitionCard>
          
          <TransitionCard>
            <h3>Elevated Experience</h3>
            <p>Notice the smooth elevation on hover</p>
          </TransitionCard>
        </TransitionsSection>
        
        <SectionTitle>Micro-interactions</SectionTitle>
        <MicroInteractions />
      </PageContainer>
    </Layout>
  );
};

export default AnimationsPage;