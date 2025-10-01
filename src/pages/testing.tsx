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

const TestingGrid = styled.div`
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

const TestingCard = styled(Card)`
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

const TestingIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${designTokens.colors.primary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${designTokens.spacing.lg};
  font-size: 32px;
  color: white;
`;

const TestingTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin-bottom: ${designTokens.spacing.md};
`;

const TestingDescription = styled.p`
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

const OptimizationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xxl} 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptimizationCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: ${designTokens.spacing.md};
  padding: ${designTokens.spacing.lg};
`;

const OptimizationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${designTokens.colors.secondary.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  color: white;
`;

const OptimizationContent = styled.div``;

const OptimizationTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.xs};
`;

const OptimizationDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const StatusSection = styled.div`
  background: ${designTokens.colors.cardBgLight};
  border-radius: ${designTokens.borders.radius.medium};
  padding: ${designTokens.spacing.xl};
  margin: ${designTokens.spacing.xxl} 0;
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const StatusTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.md};
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatusItem = styled.div`
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.background.light};
  text-align: center;
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const StatusLabel = styled.div`
  font-weight: ${designTokens.typography.fontWeight.medium};
  margin-bottom: ${designTokens.spacing.xs};
`;

const StatusValue = styled.div`
  font-size: ${designTokens.typography.fontSize.h3};
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.primary.indigo};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: ${designTokens.colors.background.light};
  border-radius: 5px;
  overflow: hidden;
  margin: ${designTokens.spacing.md} 0;
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background: ${designTokens.colors.primary.gradient};
  width: ${props => props.width}%;
  border-radius: 5px;
  transition: width ${designTokens.transitions.duration.normal};
`;

const TestingOptimizationPage = () => {
  const [testStatus, setTestStatus] = useState({
    unitTests: 85,
    integrationTests: 72,
    e2eTests: 68,
    performance: 91
  });
  
  const handleRunTests = () => {
    // Simulate running tests
    console.log('Running all tests...');
    
    // Update status after "running"
    setTimeout(() => {
      setTestStatus({
        unitTests: 95,
        integrationTests: 88,
        e2eTests: 82,
        performance: 96
      });
    }, 2000);
  };
  
  const testingMethods = [
    {
      id: 1,
      title: 'Unit Testing',
      description: 'Test individual components and functions for correctness.',
      icon: '🔬'
    },
    {
      id: 2,
      title: 'Integration Testing',
      description: 'Test interactions between different modules and services.',
      icon: '🔗'
    },
    {
      id: 3,
      title: 'End-to-End Testing',
      description: 'Test complete user workflows from start to finish.',
      icon: '🏁'
    },
    {
      id: 4,
      title: 'Performance Testing',
      description: 'Ensure fast loading times and smooth user experience.',
      icon: '⚡'
    },
    {
      id: 5,
      title: 'Security Testing',
      description: 'Identify vulnerabilities and ensure data protection.',
      icon: '🔒'
    },
    {
      id: 6,
      title: 'Accessibility Testing',
      description: 'Ensure platform is usable by people with disabilities.',
      icon: '♿'
    }
  ];
  
  const optimizations = [
    {
      id: 1,
      title: 'Code Splitting',
      description: 'Split code into smaller bundles for faster loading.',
      icon: '✂️'
    },
    {
      id: 2,
      title: 'Image Optimization',
      description: 'Compress and lazy-load images for better performance.',
      icon: '🖼️'
    },
    {
      id: 3,
      title: 'Caching Strategy',
      description: 'Implement efficient caching for static and dynamic content.',
      icon: 'キャッシング'
    },
    {
      id: 4,
      title: 'Database Optimization',
      description: 'Optimize queries and indexing for faster data access.',
      icon: '🗄️'
    }
  ];
  
  return (
    <Layout>
      <Head>
        <title>Testing & Optimization - InstantFixer</title>
        <meta name="description" content="Testing and optimization strategies for InstantFixer" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>Testing & Optimization</PageTitle>
          <PageSubtitle>
            Comprehensive testing and optimization strategies to ensure a 
            bug-free, high-performance platform.
          </PageSubtitle>
        </PageHeader>
        
        <SectionTitle>Testing Methods</SectionTitle>
        
        <TestingGrid>
          {testingMethods.map((method) => (
            <TestingCard key={method.id}>
              <TestingIcon>{method.icon}</TestingIcon>
              <TestingTitle>{method.title}</TestingTitle>
              <TestingDescription>{method.description}</TestingDescription>
              <Button variant="secondary" size="small">Learn More</Button>
            </TestingCard>
          ))}
        </TestingGrid>
        
        <SectionTitle>Optimization Strategies</SectionTitle>
        
        <OptimizationGrid>
          {optimizations.map((optimization) => (
            <OptimizationCard key={optimization.id}>
              <OptimizationIcon>{optimization.icon}</OptimizationIcon>
              <OptimizationContent>
                <OptimizationTitle>{optimization.title}</OptimizationTitle>
                <OptimizationDescription>{optimization.description}</OptimizationDescription>
              </OptimizationContent>
            </OptimizationCard>
          ))}
        </OptimizationGrid>
        
        <SectionTitle>Testing Status</SectionTitle>
        
        <StatusSection>
          <StatusHeader>
            <StatusTitle>Current Test Coverage</StatusTitle>
            <Button variant="primary" onClick={handleRunTests}>Run All Tests</Button>
          </StatusHeader>
          
          <StatusGrid>
            <StatusItem>
              <StatusLabel>Unit Tests</StatusLabel>
              <StatusValue>{testStatus.unitTests}%</StatusValue>
              <ProgressBar>
                <ProgressFill width={testStatus.unitTests} />
              </ProgressBar>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>Integration Tests</StatusLabel>
              <StatusValue>{testStatus.integrationTests}%</StatusValue>
              <ProgressBar>
                <ProgressFill width={testStatus.integrationTests} />
              </ProgressBar>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>End-to-End Tests</StatusLabel>
              <StatusValue>{testStatus.e2eTests}%</StatusValue>
              <ProgressBar>
                <ProgressFill width={testStatus.e2eTests} />
              </ProgressBar>
            </StatusItem>
            
            <StatusItem>
              <StatusLabel>Performance</StatusLabel>
              <StatusValue>{testStatus.performance}%</StatusValue>
              <ProgressBar>
                <ProgressFill width={testStatus.performance} />
              </ProgressBar>
            </StatusItem>
          </StatusGrid>
        </StatusSection>
        
        <SectionTitle>Deployment Checklist</SectionTitle>
        
        <Card>
          <ul style={{ 
            paddingLeft: designTokens.spacing.xl,
            color: designTokens.colors.text.secondary.light
          }}>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ All unit tests passing (95% coverage)
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Integration tests completed
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ End-to-end testing for critical user flows
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Security audit completed
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Performance benchmarks met
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Accessibility standards compliance
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Mobile responsiveness verified
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Cross-browser compatibility testing
            </li>
            <li style={{ marginBottom: designTokens.spacing.sm }}>
              ✅ Production environment setup
            </li>
            <li>
              ✅ Deployment pipeline configured
            </li>
          </ul>
        </Card>
      </PageContainer>
    </Layout>
  );
};

export default TestingOptimizationPage;