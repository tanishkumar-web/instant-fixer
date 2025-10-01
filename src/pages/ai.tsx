import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

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

const DemoSection = styled.div`
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.medium};
  padding: ${designTokens.spacing.xl};
  margin: ${designTokens.spacing.xxl} 0;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const DemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const DemoTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0;
`;

const InputGroup = styled.div`
  margin-bottom: ${designTokens.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${designTokens.spacing.sm};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const ResultCard = styled(Card)`
  margin-top: ${designTokens.spacing.lg};
  background: ${designTokens.colors.background.light};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const ResultTitle = styled.h4`
  font-size: ${designTokens.typography.fontSize.body};
  margin: 0 0 ${designTokens.spacing.sm};
  color: ${designTokens.colors.primary.indigo};
`;

const ResultValue = styled.p`
  margin: 0;
  font-weight: ${designTokens.typography.fontWeight.medium};
`;

const AIFeaturesPage = () => {
  const [service, setService] = useState('plumbing');
  const [location, setLocation] = useState('New Delhi');
  const [date, setDate] = useState('2023-06-15');
  const [time, setTime] = useState('10:00');
  const [showResults, setShowResults] = useState(false);
  
  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  
  // Mock AI results
  const aiResults = {
    recommendedHelper: 'Rajesh Kumar',
    estimatedPrice: '₹599',
    arrivalTime: '25 minutes',
    confidence: '92%',
    alternatives: [
      { name: 'Priya Sharma', rating: 4.8, price: '₹649' },
      { name: 'Amit Patel', rating: 4.7, price: '₹549' }
    ]
  };
  
  return (
    <Layout>
      <Head>
        <title>AI Features - InstantFixer</title>
        <meta name="description" content="Experience the power of AI in InstantFixer" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>AI-Powered Features</PageTitle>
          <PageSubtitle>
            Our platform leverages cutting-edge artificial intelligence to provide 
            intelligent matching, dynamic pricing, and predictive analytics.
          </PageSubtitle>
        </PageHeader>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>Intelligent Matching</FeatureTitle>
            <FeatureDescription>
              Our AI algorithm matches you with the perfect helper based on skills, 
              location, availability, and user preferences.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Dynamic Pricing</FeatureTitle>
            <FeatureDescription>
              Real-time pricing based on demand, time, and helper expertise for 
              fair and competitive rates.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔮</FeatureIcon>
            <FeatureTitle>Predictive Analytics</FeatureTitle>
            <FeatureDescription>
              Anticipate your needs based on usage patterns and schedule services 
              proactively before issues arise.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🎤</FeatureIcon>
            <FeatureTitle>Voice Command Booking</FeatureTitle>
            <FeatureDescription>
              Book services using voice commands for hands-free convenience and 
              accessibility.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🛡️</FeatureIcon>
            <FeatureTitle>Fraud Detection</FeatureTitle>
            <FeatureDescription>
              Advanced AI systems detect and prevent fraudulent activities to 
              ensure platform security.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>AI Chatbot</FeatureTitle>
            <FeatureDescription>
              Intelligent virtual assistant to help with bookings, FAQs, and 
              customer support 24/7.
            </FeatureDescription>
            <FeatureTag>AI-Powered</FeatureTag>
          </FeatureCard>
        </FeaturesGrid>
        
        <SectionTitle>AI Demo: Intelligent Matching</SectionTitle>
        
        <DemoSection>
          <DemoHeader>
            <DemoTitle>Find the Perfect Helper</DemoTitle>
            <Button variant="primary" onClick={handleDemoSubmit}>Find Match</Button>
          </DemoHeader>
          
          <form onSubmit={handleDemoSubmit}>
            <InputGroup>
              <Label htmlFor="service">Service</Label>
              <Select 
                id="service" 
                value={service} 
                onChange={(e) => setService(e.target.value)}
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="tutoring">Tutoring</option>
              </Select>
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="location">Location</Label>
              <Input 
                type="text" 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Enter your location"
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="date">Date</Label>
              <Input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </InputGroup>
            
            <InputGroup>
              <Label htmlFor="time">Time</Label>
              <Input 
                type="time" 
                id="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
              />
            </InputGroup>
          </form>
          
          {showResults && (
            <ResultCard>
              <ResultTitle>AI Recommendation</ResultTitle>
              <ResultValue>Recommended Helper: {aiResults.recommendedHelper}</ResultValue>
              <ResultValue>Estimated Price: {aiResults.estimatedPrice}</ResultValue>
              <ResultValue>Arrival Time: {aiResults.arrivalTime}</ResultValue>
              <ResultValue>Confidence: {aiResults.confidence}</ResultValue>
              
              <ResultTitle style={{ marginTop: designTokens.spacing.lg }}>Alternatives</ResultTitle>
              {aiResults.alternatives.map((alt, index) => (
                <ResultValue key={index}>
                  {alt.name} - Rating: {alt.rating} - Price: {alt.price}
                </ResultValue>
              ))}
            </ResultCard>
          )}
        </DemoSection>
        
        <SectionTitle>How Our AI Works</SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>1️⃣</FeatureIcon>
            <FeatureTitle>Data Collection</FeatureTitle>
            <FeatureDescription>
              Gather data from user profiles, service history, location, and preferences.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>2️⃣</FeatureIcon>
            <FeatureTitle>Pattern Analysis</FeatureTitle>
            <FeatureDescription>
              Analyze patterns and trends to understand user needs and behaviors.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>3️⃣</FeatureIcon>
            <FeatureTitle>Intelligent Matching</FeatureTitle>
            <FeatureDescription>
              Use machine learning algorithms to match users with optimal helpers.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>4️⃣</FeatureIcon>
            <FeatureTitle>Continuous Learning</FeatureTitle>
            <FeatureDescription>
              Improve recommendations over time based on user feedback and outcomes.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </PageContainer>
    </Layout>
  );
};

export default AIFeaturesPage;