import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { handleApiError } from '../utils/errorHandler';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'helper' | 'admin';
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  background-color: #f4433620;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  
  useEffect(() => {
    // If user is not logged in and not loading, redirect to login page
    if (!user && !loading) {
      // Save the intended route to redirect back after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedRoute', router.asPath);
      }
      router.push('/login');
    }
    
    // If a specific role is required and user doesn't have it, redirect to unauthorized page
    if (user && requiredRole && user.role !== requiredRole) {
      router.push('/unauthorized');
    }
  }, [user, loading, requiredRole, router]);
  
  // Show loading state while checking auth status
  if (loading) {
    return (
      <LoadingContainer>
        <div>Authenticating...</div>
      </LoadingContainer>
    );
  }
  
  // Show error if there is one
  if (error) {
    return (
      <ErrorContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <RetryButton onClick={() => window.location.reload()}>
          Try Again
        </RetryButton>
      </ErrorContainer>
    );
  }
  
  // If user is not logged in, don't render children (will redirect)
  if (!user) {
    return null;
  }
  
  // If a specific role is required and user doesn't have it, don't render children (will redirect)
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }
  
  // If user is authenticated and has the required role, render children
  return <>{children}</>;
};

export default ProtectedRoute;