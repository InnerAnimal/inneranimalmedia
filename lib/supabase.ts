import { createClient } from '@supabase/supabase-js';

// Create Supabase client (browser-safe - uses anon key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// Server-side Supabase client (uses service role key)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * Get a value from the Supabase vault (site_settings table)
 */
export async function getVaultKey(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('setting_value')
      .eq('setting_key', `vault:${key}`)
      .is('brand_id', null)
      .single();

    if (error) {
      console.error(`Vault key error for ${key}:`, error);
      return null;
    }

    return data?.setting_value || null;
  } catch (error) {
    console.error(`Failed to fetch vault key ${key}:`, error);
    return null;
  }
}
