import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
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

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: ${designTokens.spacing.xxl} 0 ${designTokens.spacing.lg};
`;

const EndpointsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${designTokens.spacing.lg};
  margin: ${designTokens.spacing.xl} 0;
`;

const EndpointCard = styled(Card)`
  padding: ${designTokens.spacing.lg};
`;

const EndpointHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.md};
`;

const Method = styled.span<{ method: string }>`
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  font-weight: ${designTokens.typography.fontWeight.bold};
  font-size: ${designTokens.typography.fontSize.caption};
  
  ${props => {
    switch (props.method) {
      case 'GET':
        return `
          background-color: #E3F2FD;
          color: #1976D2;
        `;
      case 'POST':
        return `
          background-color: #E8F5E9;
          color: #388E3C;
        `;
      case 'PUT':
        return `
          background-color: #FFF3E0;
          color: #F57C00;
        `;
      case 'DELETE':
        return `
          background-color: #FFEBEE;
          color: #D32F2F;
        `;
      default:
        return `
          background-color: #F5F5F5;
          color: #666;
        `;
    }
  }}
`;

const EndpointPath = styled.code`
  font-family: 'Roboto Mono', monospace;
  font-size: ${designTokens.typography.fontSize.body};
  background: ${designTokens.colors.background.light};
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const EndpointDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.md};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const RequestBody = styled.div`
  background: ${designTokens.colors.background.light};
  border-radius: ${designTokens.borders.radius.small};
  padding: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.md};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const ResponseBody = styled.div`
  background: ${designTokens.colors.background.light};
  border-radius: ${designTokens.borders.radius.small};
  padding: ${designTokens.spacing.md};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const CodeBlock = styled.pre`
  margin: 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
`;

const APIDocsPage = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/users/register',
      description: 'Register a new user',
      requestBody: `{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "user"
}`,
      responseBody: `{
  "success": true,
  "token": "jwt-token-here",
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}`
    },
    {
      method: 'POST',
      path: '/api/users/login',
      description: 'Login user',
      requestBody: `{
  "email": "john@example.com",
  "password": "securepassword"
}`,
      responseBody: `{
  "success": true,
  "token": "jwt-token-here",
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}`
    },
    {
      method: 'GET',
      path: '/api/users/me',
      description: 'Get current user profile',
      requiresAuth: true,
      responseBody: `{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}`
    },
    {
      method: 'GET',
      path: '/api/helpers',
      description: 'Get all helpers',
      responseBody: `{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "helper-id-1",
      "user": {
        "name": "Rajesh Kumar",
        "email": "rajesh@example.com"
      },
      "services": ["Plumbing", "Installation"],
      "rating": 4.9,
      "reviews": 128
    }
  ]
}`
    },
    {
      method: 'POST',
      path: '/api/bookings',
      description: 'Create a new booking',
      requiresAuth: true,
      requestBody: `{
  "helper": "helper-id",
  "service": "service-id",
  "date": "2023-06-15",
  "time": "10:00",
  "location": {
    "address": "123 Main St, New Delhi",
    "lat": 28.6139,
    "lng": 77.2090
  },
  "notes": "Please bring tools"
}`,
      responseBody: `{
  "success": true,
  "data": {
    "id": "booking-id",
    "user": "user-id",
    "helper": "helper-id",
    "service": "service-id",
    "date": "2023-06-15",
    "time": "10:00",
    "status": "pending",
    "totalPrice": 599
  }
}`
    }
  ];
  
  return (
    <Layout>
      <Head>
        <title>API Documentation - InstantFixer</title>
        <meta name="description" content="API documentation for InstantFixer platform" />
      </Head>
      
      <PageContainer className="container">
        <PageHeader>
          <PageTitle>API Documentation</PageTitle>
          <PageSubtitle>
            Comprehensive guide to integrating with the InstantFixer platform through our RESTful API.
          </PageSubtitle>
        </PageHeader>
        
        <Card>
          <h3>Base URL</h3>
          <code>https://api.instantfixer.com/v1</code>
          
          <h3 style={{ marginTop: designTokens.spacing.lg }}>Authentication</h3>
          <p>
            Most API endpoints require authentication using JWT tokens. Include the token in the 
            Authorization header:
          </p>
          <code>Authorization: Bearer &lt;your-jwt-token&gt;</code>
        </Card>
        
        <SectionTitle>Endpoints</SectionTitle>
        
        <EndpointsGrid>
          {endpoints.map((endpoint, index) => (
            <EndpointCard key={index}>
              <EndpointHeader>
                <Method method={endpoint.method}>{endpoint.method}</Method>
                <EndpointPath>{endpoint.path}</EndpointPath>
              </EndpointHeader>
              
              <EndpointDescription>
                {endpoint.description}
                {endpoint.requiresAuth && (
                  <span style={{ 
                    background: '#FFF3E0', 
                    color: '#F57C00', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    marginLeft: '10px',
                    fontSize: '12px'
                  }}>
                    Requires Auth
                  </span>
                )}
              </EndpointDescription>
              
              {endpoint.requestBody && (
                <>
                  <h4>Request Body</h4>
                  <RequestBody>
                    <CodeBlock>{endpoint.requestBody}</CodeBlock>
                  </RequestBody>
                </>
              )}
              
              <h4>Response</h4>
              <ResponseBody>
                <CodeBlock>{endpoint.responseBody}</CodeBlock>
              </ResponseBody>
            </EndpointCard>
          ))}
        </EndpointsGrid>
        
        <SectionTitle>Database Schema</SectionTitle>
        
        <EndpointsGrid>
          <EndpointCard>
            <h3>Users</h3>
            <ul>
              <li><strong>id</strong> - Unique identifier</li>
              <li><strong>name</strong> - User's full name</li>
              <li><strong>email</strong> - Email address (unique)</li>
              <li><strong>password</strong> - Hashed password</li>
              <li><strong>role</strong> - user, helper, or admin</li>
              <li><strong>createdAt</strong> - Timestamp</li>
            </ul>
          </EndpointCard>
          
          <EndpointCard>
            <h3>Helpers</h3>
            <ul>
              <li><strong>id</strong> - Unique identifier</li>
              <li><strong>user</strong> - Reference to User</li>
              <li><strong>services</strong> - Array of service names</li>
              <li><strong>rating</strong> - Average rating (0-5)</li>
              <li><strong>reviews</strong> - Number of reviews</li>
              <li><strong>bio</strong> - Helper description</li>
              <li><strong>verified</strong> - Verification status</li>
            </ul>
          </EndpointCard>
          
          <EndpointCard>
            <h3>Services</h3>
            <ul>
              <li><strong>id</strong> - Unique identifier</li>
              <li><strong>name</strong> - Service name</li>
              <li><strong>description</strong> - Service description</li>
              <li><strong>category</strong> - Service category</li>
              <li><strong>basePrice</strong> - Base service price</li>
              <li><strong>duration</strong> - Estimated duration (minutes)</li>
            </ul>
          </EndpointCard>
          
          <EndpointCard>
            <h3>Bookings</h3>
            <ul>
              <li><strong>id</strong> - Unique identifier</li>
              <li><strong>user</strong> - Reference to User</li>
              <li><strong>helper</strong> - Reference to Helper</li>
              <li><strong>service</strong> - Reference to Service</li>
              <li><strong>date</strong> - Booking date</li>
              <li><strong>time</strong> - Booking time</li>
              <li><strong>location</strong> - Service location</li>
              <li><strong>status</strong> - pending, confirmed, completed, cancelled</li>
              <li><strong>totalPrice</strong> - Final price</li>
            </ul>
          </EndpointCard>
        </EndpointsGrid>
      </PageContainer>
    </Layout>
  );
};

export default APIDocsPage;