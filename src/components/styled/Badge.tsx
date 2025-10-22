import styled, { css } from 'styled-components';

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  default: css`
    background-color: ${props => props.theme.colors.primary.DEFAULT};
    color: ${props => props.theme.colors.primary.foreground};
  `,
  secondary: css`
    background-color: ${props => props.theme.colors.secondary.DEFAULT};
    color: ${props => props.theme.colors.secondary.foreground};
  `,
  destructive: css`
    background-color: ${props => props.theme.colors.destructive.DEFAULT};
    color: ${props => props.theme.colors.destructive.foreground};
  `,
  success: css`
    background-color: ${props => props.theme.colors.success.DEFAULT};
    color: ${props => props.theme.colors.success.foreground};
  `,
  warning: css`
    background-color: ${props => props.theme.colors.warning.DEFAULT};
    color: ${props => props.theme.colors.warning.foreground};
  `,
  info: css`
    background-color: ${props => props.theme.colors.info.DEFAULT};
    color: ${props => props.theme.colors.info.foreground};
  `,
  outline: css`
    background-color: transparent;
    color: ${props => props.theme.colors.foreground};
    border: 1px solid ${props => props.theme.colors.border};
  `,
};

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all ${props => props.theme.transitions.base};
  
  ${props => variantStyles[props.variant || 'default']}
`;
