export interface Documento {
  id: string;
  titulo: string;
  area_id: string;
  unidade_id: string;
  tipo_id: string;
  data_inicio: string;
  data_vencimento: string;
  autor_id: string;
  versao_atual_id?: string;
  created_at: string;
  updated_at: string;
  areas?: { nome: string };
  unidades?: { nome: string };
  tipos_documento?: { nome: string };
  versoes_documento?: Partial<VersaoDocumento>[];
  documentos_palavras_chave?: { palavras_chave: { termo: string; id?: string } }[];
}

export interface VersaoDocumento {
  id: string;
  documento_id: string;
  numero_versao: number;
  link_arquivo?: string;
  elaborador_id: string;
  revisor_id?: string;
  aprovador_id?: string;
  status: "RASCUNHO" | "EM_REVISAO" | "APROVADA" | "ARQUIVADA";
  observacoes?: string;
  created_at: string;
  data_elaboracao?: string;
  data_revisao?: string;
  data_aprovacao?: string;
  profiles_elaborador?: { nome_completo: string };
  profiles_revisor?: { nome_completo: string };
  profiles_aprovador?: { nome_completo: string };
}

export interface Area {
  id: string;
  nome: string;
  descricao?: string;
  ativa: boolean;
}

export interface Unidade {
  id: string;
  nome: string;
  descricao?: string;
  ativa: boolean;
}

export interface TipoDocumento {
  id: string;
  nome: string;
  descricao?: string;
  ativo: boolean;
}

export interface PalavraChave {
  id: string;
  termo: string;
  ativa: boolean;
}

export interface DocumentoFiltros {
  busca?: string;
  area_id?: string;
  unidade_id?: string;
  palavras_chave?: string[];
}

export interface NovoDocumentoData {
  titulo: string;
  area_id: string;
  unidade_id: string;
  tipo_id: string;
  data_inicio: string;
  data_vencimento: string;
  palavras_chave: string[];
  file?: File;
  observacoes?: string;
}
