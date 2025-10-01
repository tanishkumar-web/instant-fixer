import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import ARNavigation from '../components/ARNavigation';
import VRPreview from '../components/VRPreview';

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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.lg};
  font-size: 32px;
`;

const FeatureTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
  text-align: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${designTokens.spacing.md};
  margin: ${designTokens.spacing.lg} 0 ${designTokens.spacing.xxl};
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
  border-radius: 50px;
  border: none;
  background: ${props => props.active ? designTokens.colors.primary.gradient : designTokens.colors.background.light};
  color: ${props => props.active ? 'white' : designTokens.colors.text.primary.light};
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background: ${props => props.active ? designTokens.colors.primary.gradient : designTokens.colors.background.dark};
    color: ${props => props.active ? 'white' : designTokens.colors.text.primary.dark};
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${designTokens.shadows.medium};
  }
`;

const ARVRPage = () => {
  const [activeView, setActiveView] = useState<'ar' | 'vr'>('ar');
  
  return (
    <Layout>
      <Head>
        <title>AR/VR Experience - InstantFixer</title>
        <meta name="description" content="Experience our services in augmented and virtual reality" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Immersive AR/VR Experience</PageTitle>
          <PageSubtitle>
            Explore our services through cutting-edge augmented and virtual reality technology. 
            See exactly what you'll get before you book.
          </PageSubtitle>
        </PageHeader>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📍</FeatureIcon>
            <FeatureTitle>AR Navigation</FeatureTitle>
            <FeatureDescription>
              Get turn-by-turn directions to your helper's location with augmented reality overlays.
              Simply point your camera and follow the path.
            </FeatureDescription>
            <Button variant="primary">Try AR Navigation</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🕶️</FeatureIcon>
            <FeatureTitle>VR Service Preview</FeatureTitle>
            <FeatureDescription>
              Experience our services in virtual reality before booking. 
              See exactly what you'll get with our immersive 360° previews.
            </FeatureDescription>
            <Button variant="primary">Enter VR Preview</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📏</FeatureIcon>
            <FeatureTitle>AR Measuring Tools</FeatureTitle>
            <FeatureDescription>
              Measure spaces and objects accurately with our AR measuring tools. 
              Perfect for furniture placement and renovation planning.
            </FeatureDescription>
            <Button variant="primary">Try AR Measuring</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📷</FeatureIcon>
            <FeatureTitle>AR Portfolio Viewer</FeatureTitle>
            <FeatureDescription>
              View helper portfolios and previous work in augmented reality. 
              See exactly how services will look in your space.
            </FeatureDescription>
            <Button variant="primary">View Portfolio in AR</Button>
          </FeatureCard>
        </FeaturesGrid>
        
        <SectionTitle>Experience It Yourself</SectionTitle>
        
        <ToggleContainer>
          <ToggleButton 
            active={activeView === 'ar'} 
            onClick={() => setActiveView('ar')}
          >
            AR Navigation
          </ToggleButton>
          <ToggleButton 
            active={activeView === 'vr'} 
            onClick={() => setActiveView('vr')}
          >
            VR Preview
          </ToggleButton>
        </ToggleContainer>
        
        {activeView === 'ar' ? <ARNavigation /> : <VRPreview />}
        
        <SectionTitle>How It Works</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>1️⃣</FeatureIcon>
            <FeatureTitle>Step 1: Select Service</FeatureTitle>
            <FeatureDescription>
              Choose any service from our marketplace and select the AR/VR option.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>2️⃣</FeatureIcon>
            <FeatureTitle>Step 2: Launch Experience</FeatureTitle>
            <FeatureDescription>
              Use your mobile device or VR headset to launch the immersive experience.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>3️⃣</FeatureIcon>
            <FeatureTitle>Step 3: Explore</FeatureTitle>
            <FeatureDescription>
              Navigate through the AR environment or explore the VR preview of your service.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>4️⃣</FeatureIcon>
            <FeatureTitle>Step 4: Book with Confidence</FeatureTitle>
            <FeatureDescription>
              Book your service with complete confidence after experiencing it in AR/VR.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </PageContainer>
    </Layout>
  );
};

export default ARVRPage;