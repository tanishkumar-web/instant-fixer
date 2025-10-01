import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { designTokens } from '../theme/tokens';

const GamificationContainer = styled.div`
  padding: ${designTokens.spacing.xl};
  border-radius: ${designTokens.borders.radius.medium};
  background: linear-gradient(135deg, ${designTokens.colors.background.light}, #f0f4ff);
  margin: ${designTokens.spacing.xxl} 0;
  
  .dark-mode & {
    background: linear-gradient(135deg, ${designTokens.colors.background.dark}, #1a1a2e);
  }
`;

const GamificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.lg};
`;

const GamificationTitle = styled.h2`
  font-size: ${designTokens.typography.fontSize.h3};
  margin: 0;
  background: ${designTokens.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PointsDisplay = styled.div`
  background: ${designTokens.colors.primary.indigo};
  color: white;
  padding: ${designTokens.spacing.sm} ${designTokens.spacing.md};
  border-radius: 50px;
  font-weight: ${designTokens.typography.fontWeight.bold};
`;

const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${designTokens.spacing.md};
`;

const ChallengeCard = styled.div<{ completed?: boolean }>`
  padding: ${designTokens.spacing.lg};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.cardBgLight};
  border: 1px solid rgba(0,0,0,0.1);
  transition: all ${designTokens.transitions.duration.normal};
  
  .dark-mode & {
    background: ${designTokens.colors.cardBgDark};
    border: 1px solid rgba(255,255,255,0.1);
  }
  
  ${props => props.completed && `
    border-color: ${designTokens.colors.status.success};
    opacity: 0.7;
  `}
  
  &:hover:not(${props => props.completed && 'completed'}) {
    transform: translateY(-5px);
    box-shadow: ${designTokens.shadows.large};
  }
`;

const ChallengeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${designTokens.spacing.sm};
`;

const ChallengeTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.body};
  margin: 0;
`;

const ChallengePoints = styled.span`
  background: ${designTokens.colors.secondary.gradient};
  color: white;
  padding: ${designTokens.spacing.xs} ${designTokens.spacing.sm};
  border-radius: 50px;
  font-size: ${designTokens.typography.fontSize.caption};
  font-weight: ${designTokens.typography.fontWeight.bold};
`;

const ChallengeDescription = styled.p`
  color: ${designTokens.colors.text.secondary.light};
  margin: 0 0 ${designTokens.spacing.md};
  font-size: ${designTokens.typography.fontSize.caption};
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${designTokens.colors.background.light};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${designTokens.spacing.sm};
  
  .dark-mode & {
    background: ${designTokens.colors.background.dark};
  }
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background: ${designTokens.colors.primary.gradient};
  width: ${props => props.width}%;
  border-radius: 4px;
  transition: width ${designTokens.transitions.duration.normal};
`;

const ProgressText = styled.div`
  font-size: ${designTokens.typography.fontSize.caption};
  color: ${designTokens.colors.text.secondary.light};
  display: flex;
  justify-content: space-between;
  
  .dark-mode & {
    color: ${designTokens.colors.text.secondary.dark};
  }
`;

const ClaimButton = styled.button`
  width: 100%;
  padding: ${designTokens.spacing.sm};
  border-radius: ${designTokens.borders.radius.small};
  background: ${designTokens.colors.primary.gradient};
  color: white;
  border: none;
  font-weight: ${designTokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${designTokens.transitions.duration.normal};
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(59, 10, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface Challenge {
  id: number;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
}

const Gamification = () => {
  const [totalPoints, setTotalPoints] = useState(1250);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: 'First Booking',
      description: 'Complete your first service booking',
      points: 100,
      progress: 1,
      target: 1,
      completed: true
    },
    {
      id: 2,
      title: '5 Bookings',
      description: 'Complete 5 service bookings',
      points: 250,
      progress: 3,
      target: 5,
      completed: false
    },
    {
      id: 3,
      title: 'Refer a Friend',
      description: 'Refer a friend who books a service',
      points: 200,
      progress: 0,
      target: 1,
      completed: false
    },
    {
      id: 4,
      title: 'Leave a Review',
      description: 'Leave a review for a completed service',
      points: 50,
      progress: 0,
      target: 1,
      completed: false
    }
  ]);

  const handleClaimPoints = (challengeId: number) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === challengeId && challenge.progress >= challenge.target && !challenge.completed) {
        setTotalPoints(totalPoints + challenge.points);
        return { ...challenge, completed: true };
      }
      return challenge;
    }));
  };

  return (
    <GamificationContainer>
      <GamificationHeader>
        <GamificationTitle>🏆 Gamification</GamificationTitle>
        <PointsDisplay>{totalPoints} Points</PointsDisplay>
      </GamificationHeader>
      
      <ChallengesGrid>
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} completed={challenge.completed}>
            <ChallengeHeader>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengePoints>+{challenge.points}</ChallengePoints>
            </ChallengeHeader>
            
            <ChallengeDescription>{challenge.description}</ChallengeDescription>
            
            <ProgressBar>
              <ProgressFill width={(challenge.progress / challenge.target) * 100} />
            </ProgressBar>
            
            <ProgressText>
              <span>{challenge.progress}/{challenge.target} completed</span>
              <span>{Math.round((challenge.progress / challenge.target) * 100)}%</span>
            </ProgressText>
            
            <ClaimButton 
              onClick={() => handleClaimPoints(challenge.id)}
              disabled={challenge.progress < challenge.target || challenge.completed}
            >
              {challenge.completed ? 'Claimed' : 
               challenge.progress >= challenge.target ? 'Claim Points' : 
               'In Progress'}
            </ClaimButton>
          </ChallengeCard>
        ))}
      </ChallengesGrid>
    </GamificationContainer>
  );
};

export default Gamification;