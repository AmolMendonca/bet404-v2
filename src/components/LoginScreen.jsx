import React, { useState } from 'react'
import { Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { signIn, signUp, resetPassword, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) throw error
        setSuccess('Check your email for verification link!')
      } else {
        const { error } = await signIn(email, password)
        if (error) throw error
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError('Please enter your email address')
      return
    }

    try {
      const { error } = await resetPassword(email)
      if (error) throw error
      setSuccess('Password reset email sent! Check your inbox.')
    } catch (error) {
      setError(error.message)
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setError('')
    setSuccess('')
    setShowForgotPassword(false)
    setIsSignUp(false)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            {showForgotPassword 
              ? 'Reset your password' 
              : isSignUp 
              ? 'Create your account' 
              : 'Welcome to bet404 Games'
            }
          </h1>
          <p className="text-gray-500 text-sm">
            {showForgotPassword 
              ? 'Enter your email to receive a reset link'
              : isSignUp 
              ? 'Sign up to get started' 
              : 'Sign in to your account'
            }
          </p>
        </div>

        {/* Back Button for Forgot Password */}
        {showForgotPassword && (
          <button
            onClick={() => setShowForgotPassword(false)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to sign in
          </button>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : (
                'Send Reset Email'
              )}
            </button>
          </form>
        ) : (
          /* Regular Login/Signup Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-3 pr-10 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between py-2">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign in'
              )}
            </button>
          </form>
        )}

        {/* Toggle Sign Up/Sign In */}
        {!showForgotPassword && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button 
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                  setSuccess('')
                }}
                className="text-black font-medium hover:underline"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}