import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/styled/Button";
import { Input, Label, FormGroup } from "@/components/styled/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/styled/Card";
import logoFull from "@/assets/logo-full.png";

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary.DEFAULT}10 0%,
    ${props => props.theme.colors.background} 50%,
    ${props => props.theme.colors.accent.DEFAULT}10 100%
  );
  padding: 1rem;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 28rem;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  
  img {
    height: 5rem;
    width: auto;
  }
`;

const AuthHeader = styled(CardHeader)`
  text-align: center;
  gap: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HelpText = styled.p`
  margin-top: 1rem;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.muted.foreground};
  text-align: center;
`;

export default function Auth() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      await signIn(
        formData.get("email") as string,
        formData.get("password") as string
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <AuthHeader>
          <LogoContainer>
            <img src={logoFull} alt="Centro Médico São José" />
          </LogoContainer>
          <div>
            <CardDescription>Sistema de Gestão Documental</CardDescription>
          </div>
        </AuthHeader>
        <CardContent>
          <Form onSubmit={handleSignIn}>
            <FormGroup>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="login-password">Senha</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </FormGroup>
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
          <HelpText>
            Caso não possua acesso, entre em contato com o administrador do sistema.
          </HelpText>
        </CardContent>
      </AuthCard>
    </AuthContainer>
  );
}
