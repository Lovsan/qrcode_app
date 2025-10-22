import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com';
  const password = process.env.SEED_ADMIN_PASSWORD ?? 'qwerty123';

  const supabase = createClient(url, key);

  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing.users.find(u => u.email?.toLowerCase() === email.toLowerCase());

  let userId: string | undefined = found?.id;
  if (!userId) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user?.id;
  }

  if (!userId) throw new Error('Failed to ensure admin user');

  await supabase.from('profiles').upsert({ id: userId, role: 'admin' }, { onConflict: 'id' });

  console.log('Seeded admin:', email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
