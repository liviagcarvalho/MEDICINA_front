export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      areas: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      documentos: {
        Row: {
          area_id: string
          autor_id: string
          created_at: string | null
          data_inicio: string
          data_vencimento: string
          id: string
          tipo_id: string
          titulo: string
          unidade_id: string
          updated_at: string | null
          versao_atual_id: string | null
        }
        Insert: {
          area_id: string
          autor_id: string
          created_at?: string | null
          data_inicio: string
          data_vencimento: string
          id?: string
          tipo_id: string
          titulo: string
          unidade_id: string
          updated_at?: string | null
          versao_atual_id?: string | null
        }
        Update: {
          area_id?: string
          autor_id?: string
          created_at?: string | null
          data_inicio?: string
          data_vencimento?: string
          id?: string
          tipo_id?: string
          titulo?: string
          unidade_id?: string
          updated_at?: string | null
          versao_atual_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_autor_id_fkey"
            columns: ["autor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_tipo_id_fkey"
            columns: ["tipo_id"]
            isOneToOne: false
            referencedRelation: "tipos_documento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_versao_atual"
            columns: ["versao_atual_id"]
            isOneToOne: false
            referencedRelation: "versoes_documento"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_palavras_chave: {
        Row: {
          documento_id: string
          palavra_chave_id: string
        }
        Insert: {
          documento_id: string
          palavra_chave_id: string
        }
        Update: {
          documento_id?: string
          palavra_chave_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_palavras_chave_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documentos_palavras_chave_palavra_chave_id_fkey"
            columns: ["palavra_chave_id"]
            isOneToOne: false
            referencedRelation: "palavras_chave"
            referencedColumns: ["id"]
          },
        ]
      }
      historico_ocorrencias: {
        Row: {
          acao: string
          created_at: string | null
          detalhes: string | null
          id: string
          ocorrencia_id: string
          user_id: string
        }
        Insert: {
          acao: string
          created_at?: string | null
          detalhes?: string | null
          id?: string
          ocorrencia_id: string
          user_id: string
        }
        Update: {
          acao?: string
          created_at?: string | null
          detalhes?: string | null
          id?: string
          ocorrencia_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "historico_ocorrencias_ocorrencia_id_fkey"
            columns: ["ocorrencia_id"]
            isOneToOne: false
            referencedRelation: "ocorrencias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "historico_ocorrencias_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias: {
        Row: {
          area_id: string | null
          automatica: boolean | null
          created_at: string | null
          criador_id: string
          descricao: string | null
          id: string
          prazo: string | null
          prioridade:
            | Database["public"]["Enums"]["prioridade_ocorrencia"]
            | null
          status: Database["public"]["Enums"]["status_ocorrencia"] | null
          tipo_alvo: Database["public"]["Enums"]["tipo_alvo_ocorrencia"]
          titulo: string
          unidade_id: string | null
          updated_at: string | null
        }
        Insert: {
          area_id?: string | null
          automatica?: boolean | null
          created_at?: string | null
          criador_id: string
          descricao?: string | null
          id?: string
          prazo?: string | null
          prioridade?:
            | Database["public"]["Enums"]["prioridade_ocorrencia"]
            | null
          status?: Database["public"]["Enums"]["status_ocorrencia"] | null
          tipo_alvo: Database["public"]["Enums"]["tipo_alvo_ocorrencia"]
          titulo: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Update: {
          area_id?: string | null
          automatica?: boolean | null
          created_at?: string | null
          criador_id?: string
          descricao?: string | null
          id?: string
          prazo?: string | null
          prioridade?:
            | Database["public"]["Enums"]["prioridade_ocorrencia"]
            | null
          status?: Database["public"]["Enums"]["status_ocorrencia"] | null
          tipo_alvo?: Database["public"]["Enums"]["tipo_alvo_ocorrencia"]
          titulo?: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_criador_id_fkey"
            columns: ["criador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_unidade_id_fkey"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias_documentos: {
        Row: {
          documento_id: string
          ocorrencia_id: string
        }
        Insert: {
          documento_id: string
          ocorrencia_id: string
        }
        Update: {
          documento_id?: string
          ocorrencia_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_documentos_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_documentos_ocorrencia_id_fkey"
            columns: ["ocorrencia_id"]
            isOneToOne: false
            referencedRelation: "ocorrencias"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias_usuarios: {
        Row: {
          ocorrencia_id: string
          user_id: string
        }
        Insert: {
          ocorrencia_id: string
          user_id: string
        }
        Update: {
          ocorrencia_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_usuarios_ocorrencia_id_fkey"
            columns: ["ocorrencia_id"]
            isOneToOne: false
            referencedRelation: "ocorrencias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_usuarios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      palavras_chave: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          id: string
          termo: string
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          id?: string
          termo: string
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          id?: string
          termo?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          area_id: string | null
          created_at: string | null
          email: string
          id: string
          nome_completo: string
          unidade_id: string | null
          updated_at: string | null
        }
        Insert: {
          area_id?: string | null
          created_at?: string | null
          email: string
          id: string
          nome_completo: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Update: {
          area_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          nome_completo?: string
          unidade_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_area"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_unidade"
            columns: ["unidade_id"]
            isOneToOne: false
            referencedRelation: "unidades"
            referencedColumns: ["id"]
          },
        ]
      }
      tipos_documento: {
        Row: {
          ativo: boolean | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativo?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      unidades: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          descricao: string | null
          id: string
          nome: string
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          staff_permission:
            | Database["public"]["Enums"]["staff_permission"]
            | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          staff_permission?:
            | Database["public"]["Enums"]["staff_permission"]
            | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          staff_permission?:
            | Database["public"]["Enums"]["staff_permission"]
            | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      versoes_documento: {
        Row: {
          aprovador_id: string | null
          created_at: string | null
          data_aprovacao: string | null
          data_elaboracao: string | null
          data_revisao: string | null
          documento_id: string
          elaborador_id: string
          id: string
          link_arquivo: string | null
          numero_versao: number
          observacoes: string | null
          revisor_id: string | null
          status: Database["public"]["Enums"]["status_versao"] | null
        }
        Insert: {
          aprovador_id?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_elaboracao?: string | null
          data_revisao?: string | null
          documento_id: string
          elaborador_id: string
          id?: string
          link_arquivo?: string | null
          numero_versao: number
          observacoes?: string | null
          revisor_id?: string | null
          status?: Database["public"]["Enums"]["status_versao"] | null
        }
        Update: {
          aprovador_id?: string | null
          created_at?: string | null
          data_aprovacao?: string | null
          data_elaboracao?: string | null
          data_revisao?: string | null
          documento_id?: string
          elaborador_id?: string
          id?: string
          link_arquivo?: string | null
          numero_versao?: number
          observacoes?: string | null
          revisor_id?: string | null
          status?: Database["public"]["Enums"]["status_versao"] | null
        }
        Relationships: [
          {
            foreignKeyName: "versoes_documento_aprovador_id_fkey"
            columns: ["aprovador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "versoes_documento_documento_id_fkey"
            columns: ["documento_id"]
            isOneToOne: false
            referencedRelation: "documentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "versoes_documento_elaborador_id_fkey"
            columns: ["elaborador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "versoes_documento_revisor_id_fkey"
            columns: ["revisor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_area_unidade: {
        Args: { user_id: string }
        Returns: {
          area_id: string
          unidade_id: string
        }[]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "ADMIN" | "STAFF"
      prioridade_ocorrencia: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE"
      staff_permission: "READ_ONLY" | "ADD_DELETE"
      status_ocorrencia: "ABERTA" | "EM_ANDAMENTO" | "CONCLUIDA"
      status_versao: "RASCUNHO" | "EM_REVISAO" | "APROVADA" | "ARQUIVADA"
      tipo_alvo_ocorrencia: "USUARIO" | "UNIDADE" | "AREA"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["ADMIN", "STAFF"],
      prioridade_ocorrencia: ["BAIXA", "MEDIA", "ALTA", "URGENTE"],
      staff_permission: ["READ_ONLY", "ADD_DELETE"],
      status_ocorrencia: ["ABERTA", "EM_ANDAMENTO", "CONCLUIDA"],
      status_versao: ["RASCUNHO", "EM_REVISAO", "APROVADA", "ARQUIVADA"],
      tipo_alvo_ocorrencia: ["USUARIO", "UNIDADE", "AREA"],
    },
  },
} as const
