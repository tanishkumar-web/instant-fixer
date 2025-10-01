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

const RoleSelection = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  margin-bottom: ${designTokens.spacing.lg};
`;

const RoleButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  border: 1px solid ${props => props.selected ? designTokens.colors.primary.indigo : 'rgba(0, 0, 0, 0.1)'};
  background-color: ${props => props.selected ? designTokens.colors.primary.indigo + '20' : designTokens.colors.background.light};
  color: ${props => props.selected ? designTokens.colors.primary.indigo : designTokens.colors.text.primary.light};
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    border: 1px solid ${props => props.selected ? designTokens.colors.primary.indigo : 'rgba(255, 255, 255, 0.1)'};
    background-color: ${props => props.selected ? designTokens.colors.primary.indigo + '20' : designTokens.colors.background.dark};
    color: ${props => props.selected ? designTokens.colors.primary.indigo : designTokens.colors.text.primary.dark};
  }
  
  &:hover {
    background-color: ${props => props.selected ? designTokens.colors.primary.indigo + '30' : designTokens.colors.background.light + 'dd'};
    
    .dark-mode & {
      background-color: ${props => props.selected ? designTokens.colors.primary.indigo + '30' : designTokens.colors.background.dark + 'dd'};
    }
  }
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'user' | 'helper'>('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const result = await register(name, email, password, role);
      
      if (result.success) {
        // Redirect to dashboard after successful registration
        router.push('/dashboard');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Sign Up - InstantFixer</title>
        <meta name="description" content="Create a new InstantFixer account" />
      </Head>
      
      <PageContainer>
        <AuthCard>
          <CardTitle>Create Account</CardTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>
            
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
                placeholder="Create a password"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormInput
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Account Type</FormLabel>
              <RoleSelection>
                <RoleButton 
                  selected={role === 'user'}
                  onClick={() => setRole('user')}
                >
                  User
                </RoleButton>
                <RoleButton 
                  selected={role === 'helper'}
                  onClick={() => setRole('helper')}
                >
                  Helper
                </RoleButton>
              </RoleSelection>
            </FormGroup>
            
            <FullWidthButton 
              variant="primary" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
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
            Already have an account? <a href="/login">Login</a>
          </FooterText>
        </AuthCard>
      </PageContainer>
    </Layout>
  );
};

export default SignupPage;