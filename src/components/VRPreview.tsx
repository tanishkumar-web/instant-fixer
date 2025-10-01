import React from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const VRContainer = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #FF5F6D, #FFC371);
  border-radius: ${designTokens.borders.radius.medium};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: ${designTokens.typography.fontFamily.heading};
`;

const VRPlaceholder = styled.div`
  text-align: center;
  padding: ${designTokens.spacing.xl};
  max-width: 80%;
`;

const VRTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h2};
  margin-bottom: ${designTokens.spacing.md};
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const VRDescription = styled.p`
  font-size: ${designTokens.typography.fontSize.body};
  margin-bottom: ${designTokens.spacing.lg};
  opacity: 0.9;
`;

const VRButton = styled.button`
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

const VRPreview = () => {
  return (
    <VRContainer>
      <VRPlaceholder>
        <VRTitle>VR Service Preview</VRTitle>
        <VRDescription>
          Experience our services in virtual reality before booking.
          See exactly what you'll get with our immersive 360° previews.
        </VRDescription>
        <VRButton>Enter VR Preview</VRButton>
      </VRPlaceholder>
    </VRContainer>
  );
};

export default VRPreview;