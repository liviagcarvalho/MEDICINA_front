import { ReactNode } from "react";
import styled from "styled-components";
import { Menu } from "lucide-react";
import { AppSidebarStyled } from "./AppSidebarStyled";
import { useState } from "react";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
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

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: transparent;
  transition: background-color ${props => props.theme.transitions.base};
  
  &:hover {
    background-color: ${props => props.theme.colors.muted.DEFAULT};
  }
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const HeaderTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary.dark};
  flex: 1;
`;

const Body = styled.div`
  padding: 1.5rem;
`;

interface SidebarWrapperProps {
  $collapsed: boolean;
}

const SidebarWrapper = styled.div<SidebarWrapperProps>`
  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.$collapsed ? '-15rem' : '0'};
    top: 0;
    bottom: 0;
    z-index: 50;
    transition: left ${props => props.theme.transitions.base};
  }
`;

const Overlay = styled.div<{ $visible: boolean }>`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

interface MainLayoutStyledProps {
  children: ReactNode;
}

export function MainLayoutStyled({ children }: MainLayoutStyledProps) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <LayoutContainer>
      <Overlay $visible={!collapsed} onClick={() => setCollapsed(true)} />
      <SidebarWrapper $collapsed={collapsed}>
        <AppSidebarStyled />
      </SidebarWrapper>
      <MainContent>
        <Header>
          <MenuButton onClick={() => setCollapsed(!collapsed)}>
            <Menu />
          </MenuButton>
          <HeaderTitle>Sistema de Gestão Documental</HeaderTitle>
        </Header>
        <Body>{children}</Body>
      </MainContent>
    </LayoutContainer>
  );
}
