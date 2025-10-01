import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const ARContainer = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #3B0AFF, #0ACFFF);
  border-radius: ${designTokens.borders.radius.medium};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: ${designTokens.typography.fontFamily.heading};
`;

const ARPlaceholder = styled.div`
  text-align: center;
  padding: ${designTokens.spacing.xl};
  max-width: 80%;
`;

const ARTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const ARDescription = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  margin-bottom: ${designTokens.spacing.lg};
  opacity: 0.9;
`;

const ARButton = styled.button`
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
  border-radius: 50px;
  font-size: ${designTokens.typography.fontSize.button};
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
  }
`;

const ARNavigation = () => {
  return (
    <ARContainer>
      <ARPlaceholder>
        <ARTitle>AR Navigation</ARTitle>
        <ARDescription>
          Point your camera to see augmented reality directions to your helper's location.
          Available on mobile devices with AR support.
        </ARDescription>
        <ARButton>Start AR Navigation</ARButton>
      </ARPlaceholder>
    </ARContainer>
  );
};

export default ARNavigation;