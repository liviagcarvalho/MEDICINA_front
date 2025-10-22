import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${props => props.theme.colors.card.DEFAULT};
  color: ${props => props.theme.colors.card.foreground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const CardHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const CardTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.semibold};
  line-height: 1;
  letter-spacing: -0.025em;
`;

export const CardDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.muted.foreground};
`;

export const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

export const CardFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  align-items: center;
`;
