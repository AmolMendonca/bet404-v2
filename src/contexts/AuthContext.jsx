// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase' // Fixed import

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  const signUp = async (email, password) => {
    setLoading(true)
    const result = await supabase.auth.signUp({ email, password })
    setLoading(false)
    return result
  }

  const signIn = async (email, password) => {
    setLoading(true)
    const result = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    return result
  }

const signOut = async () => {
  try {
    // Remove scope parameter or use 'local' instead of 'global'
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error('Error signing out:', error)
      toast.error('Error signing out')
    } else {
      // Force clear any cached data
      localStorage.removeItem('supabase.auth.token')
      sessionStorage.clear()
    }
  } catch (error) {
    console.error('Error signing out:', error)
    toast.error('Error signing out')
  }
}

  const resetPassword = async (email) => {
    setLoading(true)
    const result = await supabase.auth.resetPasswordForEmail(email)
    setLoading(false)
    return result
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}