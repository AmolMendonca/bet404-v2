import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const NEW_USER_FLAG_PREFIX = 'new_user_pinged:'

async function pingNewUserOnce(session) {
  try {
    if (!session?.user) return
    const user = session.user
    const flagKey = `${NEW_USER_FLAG_PREFIX}${user.id}`

    if (localStorage.getItem(flagKey)) {
      console.log(`[new_user] Skipping, already pinged for user ${user.id}`)
      return
    }

    console.log(`[new_user] Pinging /new_user for user: ${user.id}, email: ${user.email}`)

    const accessToken =
      session.access_token ||
      (await supabase.auth.getSession()).data.session?.access_token

    const response = await fetch('/new_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({
        user_id: user.id,
        email: user.email ?? null,
      }),
      credentials: 'include',
    })

    console.log(`[new_user] Response status: ${response.status}`)

    if (!response.ok) {
      console.warn('[new_user] Failed to ping /new_user', await response.text())
    } else {
      console.log('[new_user] Successfully pinged /new_user')
      localStorage.setItem(flagKey, '1')
    }
  } catch (err) {
    console.error('[new_user] Error pinging /new_user:', err)
  }
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('[Auth] Initializing...')
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      console.log('[Auth] Initial session:', session?.user || 'None')
      if (session?.user) {
        await pingNewUserOnce(session)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[Auth] onAuthStateChange event: ${event}`, session?.user || 'None')
      setUser(session?.user ?? null)
      setLoading(false)
      if (session?.user) {
        await pingNewUserOnce(session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    try {
      console.log('[Auth] Signing up:', email)
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      if (data.user && !data.session) {
        toast.success('Account created! Check email to verify.')
      } else if (data.session) {
        toast.success('Account created successfully!')
        await pingNewUserOnce(data.session)
      }

      return { data, error: null }
    } catch (error) {
      console.error('[Auth] Sign up error:', error)
      if (error.message?.includes('already registered')) {
        toast.error('Account exists. Try signing in.')
      } else {
        toast.error(error.message || 'Sign up failed')
      }
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      console.log('[Auth] Signing in:', email)
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      toast.success('Welcome back!')
      if (data.session?.user) {
        await pingNewUserOnce(data.session)
      }

      return { data, error: null }
    } catch (error) {
      console.error('[Auth] Sign in error:', error)
      toast.error('Invalid email or password')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      console.log('[Auth] Signing out...')
      setLoading(true)
      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error
      toast.success('Signed out')
    } catch (error) {
      console.error('[Auth] Sign out error:', error)
      toast.error('Error signing out')
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      console.log('[Auth] Resetting password for:', email)
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      toast.success('Reset email sent!')
      return { error: null }
    } catch (error) {
      console.error('[Auth] Reset password error:', error)
      toast.error('Error sending reset email')
      return { error }
    }
  }

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
