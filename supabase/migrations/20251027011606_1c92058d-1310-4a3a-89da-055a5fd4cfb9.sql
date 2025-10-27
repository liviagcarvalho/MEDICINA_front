-- Criar bucket para documentos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documentos',
  'documentos',
  false,
  52428800, -- 50MB
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
);

-- Políticas de storage para documentos
CREATE POLICY "Usuários autenticados podem fazer upload de documentos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documentos');

CREATE POLICY "Usuários autenticados podem ver documentos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documentos');

CREATE POLICY "Usuários podem atualizar seus próprios uploads"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documentos');

CREATE POLICY "Usuários podem deletar seus próprios uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documentos');