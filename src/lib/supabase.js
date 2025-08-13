import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase key present:', !!supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// get current access token
export async function getAccessToken() {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.access_token
}

// optional cookie exchange, call once at app start
export function wireAuthExchange() {
  supabase.auth.onAuthStateChange(async (_event, session) => {
    const token = session?.access_token
    if (!token) return
    try {
      await fetch('/api/auth/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ access_token: token })
      })
    } catch (e) {
      console.warn('auth exchange failed', e)
    }
  })
}

window.getAccessToken = getAccessToken
window.wireAuthExchange = wireAuthExchange

export const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE || ''
  : ''
