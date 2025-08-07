import React, { useState } from 'react'
import { LogOut, Settings, BarChart3, Target, TrendingUp, Clock, Award, PlayCircle } from 'lucide-react'

export default function HolecardingDashboard() {
  const [user] = useState({ email: 'player@bet404.com' })
  const [showStats, setShowStats] = useState(false)
  
  // Mock user statistics - in real app this would come from your database
  const stats = {
    lifetime: {
      handsPlayed: 2847,
      accuracy: 87.3,
      correctMoves: 2485,
      totalErrors: 362
    },
    modes: {
      perfect: { hands: 1250, accuracy: 91.2 },
      bucket4to10: { hands: 986, accuracy: 85.7 },
      bucket2to3: { hands: 611, accuracy: 83.1 }
    },
    session: {
      handsPlayed: 0,
      accuracy: 0,
      streak: 0
    }
  }

  const handleSignOut = () => {
    // In real app: auth.signOut()
    console.log('Sign out')
  }

  const startTraining = (mode = 'perfect') => {
    // In real app: navigate to training view with selected mode
    console.log(`Starting training in ${mode} mode`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">H</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Holecarding Trainer</h1>
              <p className="text-xs text-gray-500">Blackjack Training v1.0</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings size={18} />
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Start Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => startTraining('perfect')}
                className="group bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <PlayCircle size={24} />
                  <div className="text-left">
                    <div className="font-medium">Perfect Mode</div>
                    <div className="text-sm text-gray-300">See exact hole cards</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => startTraining('bucket4to10')}
                className="group border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Target size={24} className="text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Bucket 4-10</div>
                    <div className="text-sm text-gray-500">Grouped hole cards</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => startTraining('bucket2to3')}
                className="group border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Award size={24} className="text-gray-400" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Bucket 2-3</div>
                    <div className="text-sm text-gray-500">Advanced training</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lifetime Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 size={20} className="text-gray-400" />
              <h3 className="font-medium text-gray-900">Lifetime Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Hands</span>
                <span className="font-semibold">{stats.lifetime.handsPlayed.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Accuracy</span>
                <span className="font-semibold text-green-600">{stats.lifetime.accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Correct Moves</span>
                <span className="font-semibold">{stats.lifetime.correctMoves.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Total Errors</span>
                <span className="font-semibold text-red-500">{stats.lifetime.totalErrors}</span>
              </div>
            </div>
          </div>

          {/* Session Stats */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Clock size={20} className="text-gray-400" />
              <h3 className="font-medium text-gray-900">Current Session</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Hands Played</span>
                <span className="font-semibold">{stats.session.handsPlayed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Accuracy</span>
                <span className="font-semibold">
                  {stats.session.accuracy > 0 ? `${stats.session.accuracy}%` : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Current Streak</span>
                <span className="font-semibold">{stats.session.streak}</span>
              </div>
            </div>
            <button
              onClick={() => startTraining()}
              className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              Start New Session
            </button>
          </div>

          {/* Mode Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} className="text-gray-400" />
                <h3 className="font-medium text-gray-900">Mode Performance</h3>
              </div>
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-black text-sm hover:underline"
              >
                {showStats ? 'Hide' : 'Details'}
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Perfect</span>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{stats.modes.perfect.accuracy}%</div>
                  <div className="text-xs text-gray-500">{stats.modes.perfect.hands} hands</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Bucket 4-10</span>
                <div className="text-right">
                  <div className="font-semibold text-yellow-600">{stats.modes.bucket4to10.accuracy}%</div>
                  <div className="text-xs text-gray-500">{stats.modes.bucket4to10.hands} hands</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Bucket 2-3</span>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">{stats.modes.bucket2to3.accuracy}%</div>
                  <div className="text-xs text-gray-500">{stats.modes.bucket2to3.hands} hands</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Modal/Section */}
        {showStats && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(stats.modes).map(([mode, data]) => (
                <div key={mode} className="border border-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 capitalize">
                    {mode.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Hands Played</span>
                      <span className="font-medium">{data.hands}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accuracy Rate</span>
                      <span className="font-medium">{data.accuracy}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Correct Moves</span>
                      <span className="font-medium">{Math.round(data.hands * data.accuracy / 100)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Errors</span>
                      <span className="font-medium text-red-500">{data.hands - Math.round(data.hands * data.accuracy / 100)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => startTraining(mode)}
                    className="w-full mt-3 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    Train This Mode
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Training Settings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Deck Count</span>
              <div className="font-medium">6+ Decks</div>
            </div>
            <div>
              <span className="text-gray-600">Surrender</span>
              <div className="font-medium">Enabled</div>
            </div>
            <div>
              <span className="text-gray-600">Soft 17 Rule</span>
              <div className="font-medium">Dealer Hits</div>
            </div>
            <div>
              <span className="text-gray-600">Mode</span>
              <div className="font-medium">Perfect</div>
            </div>
          </div>
          <button className="mt-4 text-black text-sm hover:underline">
            Modify Settings
          </button>
        </div>
      </main>
    </div>
  )
}