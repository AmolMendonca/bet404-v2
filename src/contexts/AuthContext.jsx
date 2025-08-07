// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/supabase'

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
    auth.getCurrentUser().then(({ data }) => {
      setUser(data.user)
      setSession(data.session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(
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
    const result = await auth.signUp(email, password)
    setLoading(false)
    return result
  }

  const signIn = async (email, password) => {
    setLoading(true)
    const result = await auth.signIn(email, password)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await auth.signOut()
    setUser(null)
    setSession(null)
    setLoading(false)
    return result
  }

  const resetPassword = async (email) => {
    setLoading(true)
    const result = await auth.resetPassword(email)
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