import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const StyledCard = styled.div`
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 24px;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  .dark-mode & {
    background: rgba(30, 30, 30, 0.8);
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <StyledCard className={className} {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;