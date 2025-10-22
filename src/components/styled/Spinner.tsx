import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 2px solid transparent;
  border-top-color: ${props => props.theme.colors.primary.DEFAULT};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;
