import { Home, FileText, AlertCircle, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/styled/Button";
import logoIcon from "@/assets/logo-icon.png";

const SidebarContainer = styled.aside`
  width: 15rem;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.sidebar.background};
  color: ${props => props.theme.colors.sidebar.foreground};
  border-right: 1px solid ${props => props.theme.colors.sidebar.border};
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoContainer = styled.div`
  img {
    height: 2.5rem;
    width: auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xs};
  opacity: 0.7;
`;

const Nav = styled.nav`
  flex: 1;
  padding: 0 0.75rem;
`;

const NavGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const NavGroupLabel = styled.h3`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 0.75rem 0.5rem;
  opacity: 0.7;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.sm};
    font-weight: ${props => props.theme.fontWeights.medium};
    transition: all ${props => props.theme.transitions.base};
    color: ${props => props.theme.colors.sidebar.foreground};
    
    &.active {
      background-color: ${props => props.theme.colors.sidebar.accent};
    }
    
    &:hover {
      background-color: ${props => props.theme.colors.sidebar.accent};
      opacity: 0.8;
    }
    
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

const Footer = styled.div`
  padding: 1rem 0.75rem;
  border-top: 1px solid ${props => props.theme.colors.sidebar.border};
`;

const LogoutButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 0.5rem;
  color: ${props => props.theme.colors.sidebar.foreground};
  
  &:hover {
    background-color: ${props => props.theme.colors.sidebar.accent};
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Documentos", url: "/documentos", icon: FileText },
  { title: "Ocorrências", url: "/ocorrencias", icon: AlertCircle },
  { title: "Administração", url: "/admin", icon: Settings },
];

export function AppSidebarStyled() {
  const { signOut } = useAuth();

  return (
    <SidebarContainer>
      <SidebarHeader>
        <LogoContainer>
          <img src={logoIcon} alt="Logo" />
        </LogoContainer>
        <TitleContainer>
          <Title>Centro Médico São José</Title>
          <Subtitle>Gestão Documental</Subtitle>
        </TitleContainer>
      </SidebarHeader>

      <Nav>
        <NavGroup>
          <NavGroupLabel>Menu Principal</NavGroupLabel>
          <NavList>
            {menuItems.map((item) => (
              <NavItem key={item.title}>
                <NavLink to={item.url} end>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </NavGroup>
      </Nav>

      <Footer>
        <LogoutButton variant="ghost" onClick={signOut}>
          <LogOut />
          Sair
        </LogoutButton>
      </Footer>
    </SidebarContainer>
  );
}
