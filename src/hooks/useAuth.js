import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes - NO TOASTS HERE
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({ email, password })
      
      if (error) throw error
      
      if (data.user && !data.session) {
        toast.success('Account created! Check email to verify.')
      } else if (data.session) {
        toast.success('Account created successfully!')
      }
      
      return { data, error: null }
    } catch (error) {
      if (error.message.includes('already registered')) {
        toast.error('Account exists. Try signing in.')
      } else {
        toast.error(error.message)
      }
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      
      if (error) throw error
      
      // Only show success for manual sign-ins
      toast.success('Welcome back!')
      
      return { data, error: null }
    } catch (error) {
      toast.error('Invalid email or password')
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

const signOut = async () => {
  try {
    setLoading(true)
    // Explicitly use local scope to override the global default
    const { error } = await supabase.auth.signOut({ scope: 'local' })
    if (error) throw error
    toast.success('Signed out')
  } catch (error) {
    console.error('SignOut error:', error)
    toast.error('Error signing out')
  } finally {
    setLoading(false)
  }
}
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      toast.success('Reset email sent!')
      return { error: null }
    } catch (error) {
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
    resetPassword
  }
}