import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Клиент Supabase для личного кабинета партнёра.
 *
 * Переменные окружения (Vercel → Settings → Environment Variables и .env.local):
 *   VITE_SUPABASE_URL      — https://<project>.supabase.co
 *   VITE_SUPABASE_ANON_KEY — публичный anon-ключ (Settings → API)
 *
 * Ленивая инициализация: лендинг не трогает Supabase, пока пользователь
 * не открыл кабинет, — и сборка не падает без переменных окружения.
 */
let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
    if (!url || !key) {
      throw new Error(
        'Supabase не настроен: добавьте VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в переменные окружения.',
      )
    }
    client = createClient(url, key)
  }
  return client
}

/** Настроен ли Supabase (чтобы показывать понятную заглушку вместо падения). */
export function supabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}
