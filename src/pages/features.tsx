import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Gamification from '../components/Gamification';

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
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${designTokens.spacing.lg};
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
  margin-bottom: ${designTokens.spacing.lg};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const FeatureTag = styled.span`
  align-self: flex-start;
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  background-color: ${designTokens.colors.secondary.gradient};
  color: white;
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
  text-align: center;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${designTokens.spacing.md};
  margin: ${designTokens.spacing.xl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${props => props.active ? designTokens.colors.primary.indigo : designTokens.colors.background.light};
  color: ${props => props.active ? 'white' : designTokens.colors.text.primary.light};
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: ${props => props.active ? designTokens.colors.primary.indigo : designTokens.colors.background.dark};
    color: ${props => props.active ? 'white' : designTokens.colors.text.primary.dark};
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const VisionaryFeaturesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'ai', name: 'AI Features' },
    { id: 'arvr', name: 'AR/VR' },
    { id: 'iot', name: 'IoT' }
  ];
  
  const features = [
    {
      id: 1,
      title: 'AI Matching Algorithm',
      description: 'Our intelligent system matches you with the perfect helper based on skills, location, and availability.',
      icon: '🤖',
      category: 'ai',
      tag: 'AI-Powered'
    },
    {
      id: 2,
      title: 'Dynamic Pricing',
      description: 'Real-time pricing based on demand, time, and helper expertise for fair and competitive rates.',
      icon: '💰',
      category: 'ai',
      tag: 'AI-Powered'
    },
    {
      id: 3,
      title: 'AR Navigation',
      description: 'Augmented reality directions to your helper\'s location for seamless meeting.',
      icon: '📍',
      category: 'arvr',
      tag: 'AR/VR'
    },
    {
      id: 4,
      title: 'VR Service Preview',
      description: 'Experience services in virtual reality before booking for complete confidence.',
      icon: '🕶️',
      category: 'arvr',
      tag: 'AR/VR'
    },
    {
      id: 5,
      title: 'IoT Integration',
      description: 'Connect smart home devices for automated service requests and preventive maintenance.',
      icon: '🏠',
      category: 'iot',
      tag: 'IoT'
    },
    {
      id: 6,
      title: 'Voice Booking',
      description: 'Book services using voice commands for hands-free convenience.',
      icon: '🎤',
      category: 'ai',
      tag: 'AI-Powered'
    },
    {
      id: 7,
      title: 'Gamification',
      description: 'Earn points, badges, and rewards for using our platform and completing milestones.',
      icon: '🏆',
      category: 'all',
      tag: 'Engagement'
    },
    {
      id: 8,
      title: 'Emergency Button',
      description: 'One-tap emergency service requests for urgent situations.',
      icon: '🆘',
      category: 'all',
      tag: 'Safety'
    },
    {
      id: 9,
      title: 'Predictive Analytics',
      description: 'Anticipate your needs based on usage patterns and schedule services proactively.',
      icon: '🔮',
      category: 'ai',
      tag: 'AI-Powered'
    }
  ];
  
  const filteredFeatures = activeCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category === activeCategory);
  
  return (
    <Layout>
      <Head>
        <title>Visionary Features - InstantFixer</title>
        <meta name="description" content="Explore the 50+ visionary features of InstantFixer" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>50+ Visionary Features</PageTitle>
          <PageSubtitle>
            Experience the future of service booking with our innovative features powered by 
            AI, AR/VR, IoT, and gamification.
          </PageSubtitle>
        </PageHeader>
        
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategoriesGrid>
        
        <FeaturesGrid>
          {filteredFeatures.map((feature) => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <FeatureTag>{feature.tag}</FeatureTag>
            </FeatureCard>
          ))}
        </FeaturesGrid>
        
        <SectionTitle>🏆 Gamification System</SectionTitle>
        <Gamification />
        
        <SectionTitle>More Visionary Features</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Mobile Wallet</FeatureTitle>
            <FeatureDescription>
              Secure in-app payments with multiple wallet options and instant transfers.
            </FeatureDescription>
            <FeatureTag>Payment</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>Social Verification</FeatureTitle>
            <FeatureDescription>
              Community-based verification system for helpers and users.
            </FeatureDescription>
            <FeatureTag>Trust</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Analytics Dashboard</FeatureTitle>
            <FeatureDescription>
              Detailed analytics for helpers to track performance and earnings.
            </FeatureDescription>
            <FeatureTag>Analytics</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📹</FeatureIcon>
            <FeatureTitle>Video Consultation</FeatureTitle>
            <FeatureDescription>
              Pre-service video calls with helpers to discuss requirements.
            </FeatureDescription>
            <FeatureTag>Communication</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🗺️</FeatureIcon>
            <FeatureTitle>Heatmaps</FeatureTitle>
            <FeatureDescription>
              Real-time demand heatmaps for helpers to optimize their schedules.
            </FeatureDescription>
            <FeatureTag>Analytics</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureTitle>Cross-Platform Sync</FeatureTitle>
            <FeatureDescription>
              Seamless experience across web, iOS, and Android platforms.
            </FeatureDescription>
            <FeatureTag>Convenience</FeatureTag>
          </FeatureCard>
        </FeaturesGrid>
      </PageContainer>
    </Layout>
  );
};

export default VisionaryFeaturesPage;