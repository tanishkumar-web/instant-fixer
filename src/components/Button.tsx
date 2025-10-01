import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<{ variant: string; size: string; disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  outline: none;
  
  // Disabled state
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  // Size variants
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: 16px 32px;
          font-size: 18px;
        `;
      case 'medium':
      default:
        return `
          padding: 12px 24px;
          font-size: 16px;
        `;
    }
  }}
  
  // Color variants
  ${({ variant, disabled }) => {
    if (disabled) {
      return `
        background: #cccccc;
        color: #666666;
        box-shadow: none;
      `;
    }
    
    switch (variant) {
      case 'secondary':
        return `
          background: linear-gradient(90deg, #FF5F6D, #FFC371);
          color: white;
          box-shadow: 0 4px 20px rgba(255, 95, 109, 0.3);
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(255, 95, 109, 0.4);
          }
        `;
      case 'primary':
      default:
        return `
          background: linear-gradient(90deg, #3B0AFF, #0ACFFF);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 10, 255, 0.3);
          
          &:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(59, 10, 255, 0.4);
          }
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  className,
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      onClick={onClick} 
      className={className}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;