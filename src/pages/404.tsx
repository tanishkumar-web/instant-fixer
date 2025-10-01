import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Link from 'next/link';

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
  color: ${designTokens.colors.primary.indigo};
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

const NotFoundPage = () => {
  return (
    <Layout>
      <Head>
        <title>Page Not Found - InstantFixer</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      
      <PageContainer>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or didn't exist in the first place.
        </Description>
        <Link href="/" passHref>
          <Button variant="primary">Go Home</Button>
        </Link>
      </PageContainer>
    </Layout>
  );
};

export default NotFoundPage;