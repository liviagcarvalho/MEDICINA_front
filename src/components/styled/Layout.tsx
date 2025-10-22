import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const PageHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const PageHeaderTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary.dark};
  flex: 1;
`;

export const PageBody = styled.div`
  padding: 1.5rem;
`;

export const Sidebar = styled.aside`
  width: 15rem;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.sidebar.background};
  color: ${props => props.theme.colors.sidebar.foreground};
  border-right: 1px solid ${props => props.theme.colors.sidebar.border};
  display: flex;
  flex-direction: column;
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SidebarLogoContainer = styled.div`
  img {
    height: 2.5rem;
    width: auto;
  }
`;

export const SidebarTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SidebarTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.2;
`;

export const SidebarSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  opacity: 0.7;
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 0 0.75rem;
`;

export const SidebarNavGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const SidebarNavGroupLabel = styled.h3`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.5rem;
  opacity: 0.7;
`;

export const SidebarNavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

interface SidebarNavItemProps {
  $active?: boolean;
}

export const SidebarNavItem = styled.li<SidebarNavItemProps>`
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: ${props => props.theme.fontWeights.medium};
    transition: all ${props => props.theme.transitions.base};
    background-color: ${props => props.$active ? props.theme.colors.sidebar.accent : 'transparent'};
    color: ${props => props.theme.colors.sidebar.foreground};
    
    &:hover {
      background-color: ${props => props.$active ? props.theme.colors.sidebar.accent : `${props.theme.colors.sidebar.accent}80`};
    }
    
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 1rem 0.75rem;
  border-top: 1px solid ${props => props.theme.colors.sidebar.border};
`;
