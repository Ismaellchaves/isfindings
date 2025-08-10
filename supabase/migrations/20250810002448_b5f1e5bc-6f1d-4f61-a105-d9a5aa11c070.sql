-- Create products table with RLS and indexes
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  old_price numeric(10,2),
  image_url text,
  category text not null,
  description text,
  colors text[],
  sizes text[],
  link text,
  published_at timestamptz not null default now(),
  status text not null default 'ativo' check (status in ('ativo','inativo')),
  gender text not null default 'unissex' check (gender in ('masculino','feminino','unissex')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Policies: public read; authenticated can write
-- Note: policies don't support IF NOT EXISTS, so we create them plainly
create policy "Public can view products"
  on public.products for select
  using (true);

create policy "Authenticated can insert products"
  on public.products for insert to authenticated
  with check (true);

create policy "Authenticated can update products"
  on public.products for update to authenticated
  using (true) with check (true);

create policy "Authenticated can delete products"
  on public.products for delete to authenticated
  using (true);

-- Trigger to keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger if not exists set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- Basic indexes for filtering
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_gender on public.products (gender);
create index if not exists idx_products_published_at on public.products (published_at desc);

-- Realtime support
alter table public.products replica identity full;
-- Add to supabase_realtime publication
alter publication supabase_realtime add table public.products;
