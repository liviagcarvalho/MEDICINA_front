-- Criar tipos enumerados
CREATE TYPE public.app_role AS ENUM ('ADMIN', 'STAFF');
CREATE TYPE public.staff_permission AS ENUM ('READ_ONLY', 'ADD_DELETE');
CREATE TYPE public.status_versao AS ENUM ('RASCUNHO', 'EM_REVISAO', 'APROVADA', 'ARQUIVADA');
CREATE TYPE public.status_ocorrencia AS ENUM ('ABERTA', 'EM_ANDAMENTO', 'CONCLUIDA');
CREATE TYPE public.prioridade_ocorrencia AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');
CREATE TYPE public.tipo_alvo_ocorrencia AS ENUM ('USUARIO', 'UNIDADE', 'AREA');

-- Tabela de perfis dos usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  area_id UUID,
  unidade_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de papéis/permissões
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  staff_permission public.staff_permission,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Tabela de áreas
CREATE TABLE public.areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de unidades
CREATE TABLE public.unidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de tipos de documento
CREATE TABLE public.tipos_documento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de palavras-chave
CREATE TABLE public.palavras_chave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  termo TEXT NOT NULL UNIQUE,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de documentos
CREATE TABLE public.documentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  area_id UUID REFERENCES public.areas(id) NOT NULL,
  unidade_id UUID REFERENCES public.unidades(id) NOT NULL,
  tipo_id UUID REFERENCES public.tipos_documento(id) NOT NULL,
  data_inicio DATE NOT NULL,
  data_vencimento DATE NOT NULL,
  autor_id UUID REFERENCES public.profiles(id) NOT NULL,
  versao_atual_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de palavras-chave dos documentos (N:N)
CREATE TABLE public.documentos_palavras_chave (
  documento_id UUID REFERENCES public.documentos(id) ON DELETE CASCADE,
  palavra_chave_id UUID REFERENCES public.palavras_chave(id) ON DELETE CASCADE,
  PRIMARY KEY (documento_id, palavra_chave_id)
);

-- Tabela de versões de documentos
CREATE TABLE public.versoes_documento (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  documento_id UUID REFERENCES public.documentos(id) ON DELETE CASCADE NOT NULL,
  numero_versao INTEGER NOT NULL,
  status public.status_versao DEFAULT 'RASCUNHO',
  link_arquivo TEXT,
  elaborador_id UUID REFERENCES public.profiles(id) NOT NULL,
  revisor_id UUID REFERENCES public.profiles(id),
  aprovador_id UUID REFERENCES public.profiles(id),
  observacoes TEXT,
  data_elaboracao TIMESTAMPTZ DEFAULT NOW(),
  data_revisao TIMESTAMPTZ,
  data_aprovacao TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(documento_id, numero_versao)
);

-- Tabela de ocorrências
CREATE TABLE public.ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  status public.status_ocorrencia DEFAULT 'ABERTA',
  prioridade public.prioridade_ocorrencia DEFAULT 'MEDIA',
  tipo_alvo public.tipo_alvo_ocorrencia NOT NULL,
  area_id UUID REFERENCES public.areas(id),
  unidade_id UUID REFERENCES public.unidades(id),
  prazo DATE,
  criador_id UUID REFERENCES public.profiles(id) NOT NULL,
  automatica BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de usuários alvos de ocorrências
CREATE TABLE public.ocorrencias_usuarios (
  ocorrencia_id UUID REFERENCES public.ocorrencias(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (ocorrencia_id, user_id)
);

-- Tabela de documentos vinculados a ocorrências (N:N)
CREATE TABLE public.ocorrencias_documentos (
  ocorrencia_id UUID REFERENCES public.ocorrencias(id) ON DELETE CASCADE,
  documento_id UUID REFERENCES public.documentos(id) ON DELETE CASCADE,
  PRIMARY KEY (ocorrencia_id, documento_id)
);

-- Tabela de histórico de ocorrências
CREATE TABLE public.historico_ocorrencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ocorrencia_id UUID REFERENCES public.ocorrencias(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  acao TEXT NOT NULL,
  detalhes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Adicionar constraint de foreign key para versão atual
ALTER TABLE public.documentos 
ADD CONSTRAINT fk_versao_atual 
FOREIGN KEY (versao_atual_id) 
REFERENCES public.versoes_documento(id);

-- Adicionar constraint de foreign key para área e unidade no profiles
ALTER TABLE public.profiles 
ADD CONSTRAINT fk_area 
FOREIGN KEY (area_id) 
REFERENCES public.areas(id);

ALTER TABLE public.profiles 
ADD CONSTRAINT fk_unidade 
FOREIGN KEY (unidade_id) 
REFERENCES public.unidades(id);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.unidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tipos_documento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.palavras_chave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos_palavras_chave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.versoes_documento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencias_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocorrencias_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_ocorrencias ENABLE ROW LEVEL SECURITY;

-- Função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = is_admin.user_id AND role = 'ADMIN'
  );
$$;

-- Função para obter área e unidade do usuário
CREATE OR REPLACE FUNCTION public.get_user_area_unidade(user_id UUID)
RETURNS TABLE(area_id UUID, unidade_id UUID)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT area_id, unidade_id FROM public.profiles
  WHERE id = user_id;
$$;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver seu próprio perfil"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis"
ON public.profiles FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins podem atualizar perfis"
ON public.profiles FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins podem inserir perfis"
ON public.profiles FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

-- Políticas RLS para user_roles
CREATE POLICY "Admins podem gerenciar roles"
ON public.user_roles FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Usuários podem ver seus próprios roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Políticas RLS para áreas
CREATE POLICY "Todos podem visualizar áreas ativas"
ON public.areas FOR SELECT
USING (ativa = true);

CREATE POLICY "Admins podem gerenciar áreas"
ON public.areas FOR ALL
USING (public.is_admin(auth.uid()));

-- Políticas RLS para unidades
CREATE POLICY "Todos podem visualizar unidades ativas"
ON public.unidades FOR SELECT
USING (ativa = true);

CREATE POLICY "Admins podem gerenciar unidades"
ON public.unidades FOR ALL
USING (public.is_admin(auth.uid()));

-- Políticas RLS para tipos_documento
CREATE POLICY "Todos podem visualizar tipos ativos"
ON public.tipos_documento FOR SELECT
USING (ativo = true);

CREATE POLICY "Admins podem gerenciar tipos"
ON public.tipos_documento FOR ALL
USING (public.is_admin(auth.uid()));

-- Políticas RLS para palavras_chave
CREATE POLICY "Todos podem visualizar palavras-chave ativas"
ON public.palavras_chave FOR SELECT
USING (ativa = true);

CREATE POLICY "Admins podem gerenciar palavras-chave"
ON public.palavras_chave FOR ALL
USING (public.is_admin(auth.uid()));

-- Políticas RLS para documentos
CREATE POLICY "Admins podem ver todos os documentos"
ON public.documentos FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff vê documentos da sua área e unidade"
ON public.documentos FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.get_user_area_unidade(auth.uid()) u
    WHERE u.area_id = documentos.area_id 
    AND u.unidade_id = documentos.unidade_id
  )
);

CREATE POLICY "Admins podem gerenciar documentos"
ON public.documentos FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff com permissão pode criar documentos na sua área/unidade"
ON public.documentos FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    INNER JOIN public.profiles p ON p.id = ur.user_id
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'STAFF'
    AND ur.staff_permission = 'ADD_DELETE'
    AND p.area_id = area_id
    AND p.unidade_id = unidade_id
  )
);

-- Políticas RLS para versoes_documento
CREATE POLICY "Admins podem ver todas as versões"
ON public.versoes_documento FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff vê versões de documentos da sua área/unidade"
ON public.versoes_documento FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.documentos d
    INNER JOIN public.get_user_area_unidade(auth.uid()) u
    ON u.area_id = d.area_id AND u.unidade_id = d.unidade_id
    WHERE d.id = versoes_documento.documento_id
  )
);

CREATE POLICY "Admins podem gerenciar versões"
ON public.versoes_documento FOR ALL
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff com permissão pode criar versões"
ON public.versoes_documento FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    INNER JOIN public.profiles p ON p.id = ur.user_id
    INNER JOIN public.documentos d ON d.area_id = p.area_id AND d.unidade_id = p.unidade_id
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'STAFF'
    AND ur.staff_permission = 'ADD_DELETE'
    AND d.id = versoes_documento.documento_id
  )
);

-- Políticas RLS para ocorrências
CREATE POLICY "Admins podem ver todas as ocorrências"
ON public.ocorrencias FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff vê ocorrências da sua área/unidade ou direcionadas a ele"
ON public.ocorrencias FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.get_user_area_unidade(auth.uid()) u
    WHERE (
      (tipo_alvo = 'AREA' AND u.area_id = ocorrencias.area_id)
      OR (tipo_alvo = 'UNIDADE' AND u.unidade_id = ocorrencias.unidade_id)
      OR (tipo_alvo = 'USUARIO' AND EXISTS (
        SELECT 1 FROM public.ocorrencias_usuarios ou
        WHERE ou.ocorrencia_id = ocorrencias.id AND ou.user_id = auth.uid()
      ))
    )
  )
);

CREATE POLICY "Admins podem gerenciar ocorrências"
ON public.ocorrencias FOR ALL
USING (public.is_admin(auth.uid()));

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documentos_updated_at
BEFORE UPDATE ON public.documentos
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ocorrencias_updated_at
BEFORE UPDATE ON public.ocorrencias
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome_completo, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome_completo', 'Usuário'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir dados iniciais
INSERT INTO public.areas (nome, descricao) VALUES
('Enfermagem', 'Área de Enfermagem'),
('Medicina', 'Área Médica'),
('Administração', 'Área Administrativa'),
('TI', 'Tecnologia da Informação');

INSERT INTO public.unidades (nome, descricao) VALUES
('Sorocaba', 'Unidade de Sorocaba'),
('São Paulo', 'Unidade de São Paulo'),
('Campinas', 'Unidade de Campinas'),
('Santos', 'Unidade de Santos');

INSERT INTO public.tipos_documento (nome, descricao) VALUES
('POP', 'Procedimento Operacional Padrão'),
('Norma', 'Norma Institucional'),
('Manual', 'Manual de Procedimentos'),
('Protocolo', 'Protocolo Clínico');

INSERT INTO public.palavras_chave (termo) VALUES
('Urgente'),
('Segurança'),
('Qualidade'),
('Treinamento'),
('Auditoria');