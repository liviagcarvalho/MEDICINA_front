import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const variantStyles = {
  default: css`
    background-color: ${props => props.theme.colors.primary.DEFAULT};
    color: ${props => props.theme.colors.primary.foreground};
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary.DEFAULT};
    border: 1px solid ${props => props.theme.colors.border};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.muted.DEFAULT};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${props => props.theme.colors.foreground};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.muted.DEFAULT};
    }
  `,
  destructive: css`
    background-color: ${props => props.theme.colors.destructive.DEFAULT};
    color: ${props => props.theme.colors.destructive.foreground};
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary.DEFAULT};
    color: ${props => props.theme.colors.secondary.foreground};
    
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
};

const sizeStyles = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: ${props => props.theme.fontSizes.sm};
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: ${props => props.theme.fontSizes.base};
  `,
  lg: css`
    padding: 0.625rem 1.5rem;
    font-size: ${props => props.theme.fontSizes.lg};
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.base};
  cursor: pointer;
  border: none;
  outline: none;
  
  ${props => variantStyles[props.variant || 'default']}
  ${props => sizeStyles[props.size || 'md']}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.ring};
    outline-offset: 2px;
  }
`;
