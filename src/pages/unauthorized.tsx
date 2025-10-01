import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: ${designTokens.spacing.xl};
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 4rem;
  font-weight: ${designTokens.typography.fontWeight.bold};
  color: ${designTokens.colors.danger};
  margin: 0 0 ${designTokens.spacing.md};
`;

const Title = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin: 0 0 ${designTokens.spacing.md};
`;

const Description = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  color: ${designTokens.colors.text.secondary.light};
  margin: 0 0 ${designTokens.spacing.xxl};
  max-width: 500px;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const UnauthorizedPage = () => {
  const { user, logout } = useAuth();
  
  return (
    <Layout>
      <Head>
        <title>Access Denied - InstantFixer</title>
        <meta name="description" content="You don't have permission to access this page" />
      </Head>
      
      <PageContainer>
        <ErrorCode>403</ErrorCode>
        <Title>Access Denied</Title>
        <Description>
          Sorry, you don't have permission to access this page. 
          {user ? 'Please contact an administrator if you believe this is an error.' : 'Please log in to continue.'}
        </Description>
        {user ? (
          <Button variant="secondary" onClick={logout}>Logout</Button>
        ) : (
          <Link href="/login" passHref>
            <Button variant="primary">Login</Button>
          </Link>
        )}
      </PageContainer>
    </Layout>
  );
};

export default UnauthorizedPage;