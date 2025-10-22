-- Users are managed by Supabase Auth

create table if not exists public.qr_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('generated','scanned','offer')),
  title text,
  content text not null,
  style jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists qr_items_user_id_idx on public.qr_items(user_id);

create table if not exists public.shares (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.qr_items(id) on delete cascade,
  share_code text unique not null,
  is_public boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.qr_items enable row level security;
create policy "Users can manage their QR items" on public.qr_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.shares enable row level security;
create policy "Public can read public shares" on public.shares
  for select using (is_public = true);
create policy "Owners manage shares via items" on public.shares
  for all using (exists (select 1 from public.qr_items q where q.id = item_id and q.user_id = auth.uid()));

-- Profiles for roles & 2FA metadata
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user','admin')),
  totp_enabled boolean not null default false,
  totp_secret text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "User can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "User can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- App config singleton
create table if not exists public.app_config (
  id int primary key default 1,
  site_url text not null default 'https://prismqr.app',
  social_title text not null default 'PrismQR',
  social_subtitle text not null default 'The ultimate QR experience',
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

insert into public.app_config (id)
  values (1)
  on conflict (id) do nothing;

alter table public.app_config enable row level security;
create policy "Everyone can read config" on public.app_config for select using (true);
create policy "Only admins can update config" on public.app_config for update using (
  exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'
  )
);
