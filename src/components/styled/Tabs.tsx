import styled from 'styled-components';

export const TabsContainer = styled.div`
  width: 100%;
`;

export const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.muted.DEFAULT};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 100%;
`;

interface TabTriggerProps {
  $active?: boolean;
}

export const TabTrigger = styled.button<TabTriggerProps>`
  padding: 0.5rem 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  background-color: ${props => props.$active ? props.theme.colors.background : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.foreground : props.theme.colors.muted.foreground};
  box-shadow: ${props => props.$active ? props.theme.shadows.sm : 'none'};
  
  &:hover {
    background-color: ${props => props.$active ? props.theme.colors.background : props.theme.colors.muted.DEFAULT};
  }
`;

interface TabContentProps {
  $active?: boolean;
}

export const TabContent = styled.div<TabContentProps>`
  display: ${props => props.$active ? 'block' : 'none'};
  padding-top: 1rem;
`;
