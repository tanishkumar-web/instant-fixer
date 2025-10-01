import React, { useState } from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const MicroInteractionsContainer = styled.div`
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.borders.radius.medium};
  background: ${designTokens.colors.cardBgLight};
  margin: ${designTokens.spacing.xxl} 0;
  border: 1px solid rgba(0,0,0,0.1);
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
    border: 1px solid rgba(255,255,255,0.1);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0 0 ${designTokens.spacing.lg};
  color: ${designTokens.colors.text.primary.light};
  
  .dark-mode & {
    color: ${designTokens.colors.text.primary.dark};
  }
`;

const InteractionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${designTokens.spacing.lg};
`;

const InteractionDemo = styled.div`
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.background.light};
  text-align: center;
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const HoverCard = styled.div`
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.cardBgLight};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${designTokens.shadows.large};
    background: ${designTokens.colors.primary.gradient};
    color: white;
  }
`;

const ClickButton = styled.button`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.xl};
  border-radius: 50px;
  background: ${designTokens.colors.primary.gradient};
  color: white;
  border: none;
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  &:active {
    transform: scale(0.95);
  }
  
  &:hover {
    box-shadow: 0 6px 20px rgba(59, 10, 255, 0.4);
  }
`;

const LikeButton = styled.button<{ liked: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${designTokens.colors.primary.indigo};
  background: ${designTokens.colors.background.light};
  font-size: 24px;
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
  
  ${props => props.liked ? `
    background: ${designTokens.colors.status.error};
    color: white;
    transform: scale(1.1);
  ` : `
    &:hover {
      background: ${designTokens.colors.status.error}20;
      color: ${designTokens.colors.status.error};
    }
  `}
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background: ${designTokens.colors.background.light};
  border-radius: 5px;
  overflow: hidden;
  margin: ${designTokens.spacing.lg} 0;
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background: ${designTokens.colors.primary.gradient};
  width: ${props => props.width}%;
  border-radius: 5px;
  transition: width 0.5s ease;
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  margin: ${designTokens.spacing.sm} 0;
  
  .dark-mode & {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const MicroInteractions = () => {
  const [likeCount, setLikeCount] = useState(24);
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };
  
  const startProgress = () => {
    let width = 0;
    const interval = setInterval(() => {
      width += 5;
      setProgress(width);
      if (width >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };
  
  return (
    <MicroInteractionsContainer>
      <SectionTitle>✨ Micro-interactions</SectionTitle>
      
      <InteractionsGrid>
        <InteractionDemo>
          <h3>Hover Effect</h3>
          <HoverCard>
            <p>Hover over me!</p>
          </HoverCard>
        </InteractionDemo>
        
        <InteractionDemo>
          <h3>Click Animation</h3>
          <ClickButton>Click Me</ClickButton>
        </InteractionDemo>
        
        <InteractionDemo>
          <h3>Like Button</h3>
          <LikeButton liked={isLiked} onClick={handleLike}>
            {isLiked ? '❤️' : '🤍'}
          </LikeButton>
          <p>{likeCount} likes</p>
        </InteractionDemo>
        
        <InteractionDemo>
          <h3>Progress Bar</h3>
          <ProgressContainer>
            <ProgressBar width={progress} />
          </ProgressContainer>
          <ClickButton onClick={startProgress}>Start Progress</ClickButton>
        </InteractionDemo>
        
        <InteractionDemo>
          <h3>Skeleton Loader</h3>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </InteractionDemo>
      </InteractionsGrid>
    </MicroInteractionsContainer>
  );
};

export default MicroInteractions;