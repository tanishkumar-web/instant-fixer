import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import IoTIntegration from '../components/IoTIntegration';

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
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BenefitCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.lg};
`;

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${designTokens.colors.secondary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const BenefitContent = styled.div``;

const BenefitTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const BenefitDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const HowItWorks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.background.light};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.md};
  color: white;
  font-weight: bold;
  font-size: 20px;
`;

const StepTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.sm};
`;

const StepDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const IoTPage = () => {
  return (
    <Layout>
      <Head>
        <title>IoT Integration - InstantFixer</title>
        <meta name="description" content="Connect your smart devices with InstantFixer for automated service requests" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Smart Home Integration</PageTitle>
          <PageSubtitle>
            Connect your IoT devices with InstantFixer to automatically detect issues and 
            request services before problems escalate.
          </PageSubtitle>
        </PageHeader>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>💧</FeatureIcon>
            <FeatureTitle>Water Leak Detection</FeatureTitle>
            <FeatureDescription>
              Automatically detect water leaks and schedule plumbing services immediately.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔥</FeatureIcon>
            <FeatureTitle>Smoke & Fire Detection</FeatureTitle>
            <FeatureDescription>
              Get emergency services automatically when smoke or fire is detected.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Security Monitoring</FeatureTitle>
            <FeatureDescription>
              Request security services when unusual activity is detected by your smart cameras.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🌡️</FeatureIcon>
            <FeatureTitle>Climate Control</FeatureTitle>
            <FeatureDescription>
              Schedule HVAC services when your system is not performing optimally.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔌</FeatureIcon>
            <FeatureTitle>Electrical Monitoring</FeatureTitle>
            <FeatureDescription>
              Detect electrical issues and automatically schedule electrician services.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🧹</FeatureIcon>
            <FeatureTitle>Smart Cleaning</FeatureTitle>
            <FeatureDescription>
              Schedule cleaning services based on usage patterns from your smart sensors.
            </FeatureDescription>
            <Button variant="primary">Connect Device</Button>
          </FeatureCard>
        </FeaturesGrid>
        
        <SectionTitle>IoT Device Integration</SectionTitle>
        <IoTIntegration />
        
        <SectionTitle>Key Benefits</SectionTitle>
        
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>⏱️</BenefitIcon>
            <BenefitContent>
              <BenefitTitle>Proactive Maintenance</BenefitTitle>
              <BenefitDescription>
                Prevent issues before they become major problems with automated service requests.
              </BenefitDescription>
            </BenefitContent>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>🚨</BenefitIcon>
            <BenefitContent>
              <BenefitTitle>Emergency Response</BenefitTitle>
              <BenefitDescription>
                Get immediate help during emergencies with automatic service dispatch.
              </BenefitDescription>
            </BenefitContent>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>💰</BenefitIcon>
            <BenefitContent>
              <BenefitTitle>Cost Savings</BenefitTitle>
              <BenefitDescription>
                Save money with preventive maintenance and early issue detection.
              </BenefitDescription>
            </BenefitContent>
          </BenefitCard>
          
          <BenefitCard>
            <BenefitIcon>🧠</BenefitIcon>
            <BenefitContent>
              <BenefitTitle>Smart Automation</BenefitTitle>
              <BenefitDescription>
                Let your home manage itself with intelligent service scheduling.
              </BenefitDescription>
            </BenefitContent>
          </BenefitCard>
        </BenefitsGrid>
        
        <SectionTitle>How It Works</SectionTitle>
        
        <HowItWorks>
          <Step>
            <StepNumber>1</StepNumber>
            <StepTitle>Connect Devices</StepTitle>
            <StepDescription>
              Link your compatible IoT devices to your InstantFixer account through our app.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepTitle>Set Preferences</StepTitle>
            <StepDescription>
              Configure which services to automatically request and under what conditions.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepTitle>Automatic Monitoring</StepTitle>
            <StepDescription>
              Your devices continuously monitor for issues and send data to our platform.
            </StepDescription>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepTitle>Service Dispatch</StepTitle>
            <StepDescription>
              When an issue is detected, we automatically schedule the appropriate service.
            </StepDescription>
          </Step>
        </HowItWorks>
      </PageContainer>
    </Layout>
  );
};

export default IoTPage;