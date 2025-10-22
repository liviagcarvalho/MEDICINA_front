import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: ${props => props.theme.fontSizes.base};
  line-height: 1.5;
  color: ${props => props.theme.colors.foreground};
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.input};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.base};
  outline: none;
  
  &::placeholder {
    color: ${props => props.theme.colors.muted.foreground};
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.ring};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.foreground};
  margin-bottom: 0.5rem;
  line-height: 1;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
