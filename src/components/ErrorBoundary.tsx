import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';
import Button from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${designTokens.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: ${designTokens.typography.fontSize.h2};
  color: ${designTokens.colors.danger};
  margin-bottom: ${designTokens.spacing.md};
`;

const ErrorMessage = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  color: ${designTokens.colors.text.secondary.light};
  margin-bottom: ${designTokens.spacing.xl};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ErrorDetails = styled.pre`
  background-color: ${designTokens.colors.background.light};
  padding: ${designTokens.spacing.md};
  border-radius: ${designTokens.borders.radius.small};
  overflow-x: auto;
  margin-bottom: ${designTokens.spacing.xl};
  text-align: left;
  
  .dark-mode & {
    background-color: ${designTokens.colors.background.dark};
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but an unexpected error occurred. Please try again.
          </ErrorMessage>
          
          {this.state.error && (
            <ErrorDetails>
              <strong>Error:</strong> {this.state.error.toString()}
            </ErrorDetails>
          )}
          
          <Button variant="primary" onClick={this.handleRetry}>
            Try Again
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;