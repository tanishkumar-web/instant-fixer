import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { handleApiError } from '../utils/errorHandler';

const PageContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${designTokens.spacing.xl} 0;
`;

const AuthCard = styled.div`
  max-width: 450px;
  width: 100%;
  padding: ${designTokens.spacing.xxl};
  border-radius: ${designTokens.borders.radius.medium};
  box-shadow: ${designTokens.shadows.large};
  background: ${designTokens.colors.cardBgLight};
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
  
  @media (max-width: 480px) {
    padding: ${designTokens.spacing.xl};
    margin: 0 ${designTokens.spacing.md};
  }
`;

const CardTitle = styled.h1`
  text-align: center;
  margin-bottom: ${designTokens.spacing.xl};
  font-size: ${designTokens.typography.fontSize.h2};
`;

const FormGroup = styled.div`
  margin-bottom: ${designTokens.spacing.lg};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${designTokens.spacing.sm};
  font-weight: ${designTokens.typography.fontWeight.medium};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: ${designTokens.colors.primary.indigo};
    box-shadow: 0 0 0 3px rgba(59, 10, 255, 0.2);
  }
`;

const AuthOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
  margin: ${designTokens.spacing.xl} 0;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${designTokens.colors.background.light};
  color: ${designTokens.colors.text.primary.light};
  font-size: ${designTokens.typography.fontSize.body};
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
    color: ${designTokens.colors.text.primary.dark};
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:hover {
    background-color: ${designTokens.colors.background.light}dd;
    
    .dark-mode & {
      background-color: ${designTokens.colors.background.dark}dd;
    }
  }
  
  span {
    margin-left: ${designTokens.spacing.md};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${designTokens.spacing.xl} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .dark-mode & {
    &::before,
    &::after {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  
  span {
    padding: 0 ${designTokens.spacing.md};
    color: ${designTokens.colors.text.secondary.light};
    
    .dark-mode & {
      color: ${designTokens.colors.text.secondary.dark};
    }
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
  
  a {
    color: ${designTokens.colors.primary.indigo};
    text-decoration: none;
    font-weight: ${designTokens.typography.fontWeight.medium};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${designTokens.colors.status.error};
  background-color: ${designTokens.colors.status.error}33;
  padding: ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  margin-bottom: ${designTokens.spacing.md};
  text-align: center;
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${designTokens.colors.text.secondary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
  
  input {
    margin-right: ${designTokens.spacing.sm};
  }
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(email, password, rememberMe);
      
      if (result.success) {
        // Redirect to intended route or dashboard
        const intendedRoute = localStorage.getItem('intendedRoute') || '/dashboard';
        localStorage.removeItem('intendedRoute');
        router.push(intendedRoute);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Login - InstantFixer</title>
        <meta name="description" content="Login to your InstantFixer account" />
      </Head>
      
      <PageContainer>
        <AuthCard>
          <CardTitle>Login to Your Account</CardTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <FormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </FormGroup>
            
            <RememberMeContainer>
              <RememberMeLabel>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </RememberMeLabel>
            </RememberMeContainer>
            
            <FullWidthButton 
              variant="primary" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </FullWidthButton>
          </form>
          
          <Divider>
            <span>or continue with</span>
          </Divider>
          
          <AuthOptions>
            <SocialButton>
              <span>Google</span>
            </SocialButton>
            <SocialButton>
              <span>Facebook</span>
            </SocialButton>
            <SocialButton>
              <span>Apple</span>
            </SocialButton>
          </AuthOptions>
          
          <FooterText>
            Don't have an account? <a href="/signup">Sign up</a>
          </FooterText>
        </AuthCard>
      </PageContainer>
    </Layout>
  );
};

export default LoginPage;