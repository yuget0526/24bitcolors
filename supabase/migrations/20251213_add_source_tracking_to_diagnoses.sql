-- Add source tracking columns to diagnoses table
-- To distinguish between colors found via diagnosis and colors imported from shared collections.

alter table diagnoses 
add column if not exists source_type text default 'diagnosis',
add column if not exists source_id uuid;

comment on column diagnoses.source_type is 'diagnosis: 診断, share_import: シェアからの保存';
comment on column diagnoses.source_id is '流入元のID（shared_collections.idなど）';

-- Create an index for analytics performance if needed later
create index if not exists idx_diagnoses_source_type on diagnoses(source_type);
