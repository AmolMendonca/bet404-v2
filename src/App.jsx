import React, { useMemo, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import GameTable from './components/GameTable'
import {
  Eye, EyeOff, LogOut, Settings as SettingsIcon, BarChart3, Gamepad2, Info,
  BookOpen, ChevronDown, ChevronUp, ArrowLeft, Edit3, RefreshCw
} from 'lucide-react'
import { getAccessToken } from './lib/supabase.js'

import { supabase } from './lib/supabase.js'


/* ----------------------------- Shared UI bits ----------------------------- */

function TopNav({ title = 'Bet404', onGo, showBack = false }) {
  const { user, signOut } = useAuth()
  return (
    <header className="bg-white border border-gray-200 border-t-0 border-l-0 border-r-0 sticky top-0 z-20">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button onClick={() => onGo('home')} className="p-1 text-gray-600">
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">B</span>
          </div>
          <div>
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            <p className="text-[11px] text-gray-500">Trainer Settings</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => onGo('stats')} className="p-2 text-gray-500" title="Stats">
            <BarChart3 size={18} />
          </button>
          <button onClick={() => onGo('about')} className="p-2 text-gray-500" title="About">
            <Info size={18} />
          </button>
          <button onClick={() => onGo('settings')} className="p-2 text-gray-500" title="Settings">
            <SettingsIcon size={18} />
          </button>
          <div className="hidden sm:block text-xs text-gray-600">{user?.email}</div>
<button
  onClick={async () => {
    // clear server cookie
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch (e) {
      console.warn('logout endpoint failed', e)
    }
    // clear Supabase session in the browser
    await supabase.auth.signOut()
  }}
  className="flex items-center space-x-1 text-gray-600"
  title="Sign out"
>
  <LogOut size={16} />
  <span className="text-sm">Sign out</span>
</button>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------ Login screen ------------------------------ */

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const { signIn, signUp, resetPassword, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSignUp) {
      await signUp(email, password)
    } else {
      await signIn(email, password)
    }
  }

  const handleReset = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email first')
      return
    }
    await resetPassword(email)
    setShowReset(false)
  }

  if (showReset) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-semibold text-lg">B</span>
            </div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Reset password</h1>
            <p className="text-gray-500 text-sm">Enter your email to reset password</p>
          </div>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset email'}
            </button>
            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="w-full text-gray-600 py-2"
            >
              Back to sign in
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
            {isSignUp ? 'Create account' : 'Bet404'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isSignUp ? 'Sign up to get started' : 'Professional blackjack training'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 translate-y-[-50%] text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

        {!isSignUp && (
          <div className="flex justify-between text-sm">
            <span></span>
            <button
              type="button"
              onClick={() => setShowReset(true)}
              className="text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            ) : (
              isSignUp ? 'Create account' : 'Sign in'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-gray-600"
          >
            {isSignUp ? 'Already have an account? ' : "Do not have an account? "}
            <span className="text-black font-medium hover:underline">
              {isSignUp ? 'Sign in' : 'Sign up'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------- Strategy chart page (lite) ------------------------- */
function StrategyChartPage({ onBack }) {
  const [rule, setRule] = React.useState('H17')
  const [bucket, setBucket] = React.useState('4to10')
  const [editable, setEditable] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [showLegend, setShowLegend] = React.useState(false)

  const dealerCards = ['2','3','4','5','6','7','8','9','10','A']

  const [charts, setCharts] = React.useState({
    H17: { '4to10': { hard: {} }, '2to3': { hard: {} } },
    S17: { '4to10': { hard: {} }, '2to3': { hard: {} } }
  })

  const [perfectChart, setPerfectChart] = React.useState({ rule: 'H17', rows: [] })

  // authenticated fetch helper, attaches Supabase token and sends cookies
  const authFetch = async (path, init = {}) => {
    const token = await getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    return fetch(path, { ...init, headers, credentials: 'include' })
  }

  const getActionColor = (raw) => {
    const a = String(raw || '').toUpperCase()
    const head = a[0] || ''
    if (head === 'H') return 'bg-red-100 text-red-800'
    if (head === 'S') return 'bg-green-100 text-green-800'
    if (head === 'D') return 'bg-blue-100 text-blue-800'
    if (head === 'P') return 'bg-purple-100 text-purple-800'
    if (head === 'R') return 'bg-orange-100 text-orange-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getDealerIndex = (v) => {
    const m = { '2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'10':8,'A':9 }
    return m[v] ?? -1
  }

  const transformRegularChart = (apiData) => {
    const chart = {}

    apiData?.pair_entries?.forEach(entry => {
      const { dealer_val, player_pair, recommended_move } = entry
      const rowKey = String(player_pair)
      if (!chart[rowKey]) chart[rowKey] = new Array(10).fill('H')
      const idx = getDealerIndex(String(dealer_val))
      if (idx !== -1) chart[rowKey][idx] = String(recommended_move).toUpperCase()
    })

    apiData?.regular_entries?.forEach(entry => {
      const { dealer_val, player_hand_type, player_val, recommended_move } = entry
      let rowKey
      if (String(player_hand_type).toLowerCase() === 'soft') {
        const aceValue = Number(player_val) - 11
        if (aceValue >= 2 && aceValue <= 9) rowKey = `A${aceValue}`
      } else {
        rowKey = String(player_val)
      }
      if (!rowKey) return
      if (!chart[rowKey]) chart[rowKey] = new Array(10).fill('H')
      const idx = getDealerIndex(String(dealer_val))
      if (idx !== -1) chart[rowKey][idx] = String(recommended_move).toUpperCase()
    })

    return chart
  }

  const transformPerfectChart = (apiData) => {
    const entries = Array.isArray(apiData?.perfect_entries) ? apiData.perfect_entries : []

    const rows = entries.map(e => ({
      rowLabel: String(e.dealer_val),
      columns: {
        'Hit Until Hard': e.harduntil ?? '',
        'Hit Until Soft': e.softstanduntil ?? '',
        'Double Hards':   e.doublehards ?? '',
        'Double Softs':   e.doublesofts ?? '',
        'Splits':         e.splits ?? '',
        'Surrender': [e.lshards, e.lssofts].filter(Boolean).join(' / ')
      }
    }))

    const byLabel = Object.fromEntries(rows.map(r => [r.rowLabel.toUpperCase(), r]))

    const hardOrdered = []
    for (let n = 20; n >= 6; n--) {
      const r = byLabel[String(n)]
      if (r) hardOrdered.push(r)
    }

    const softPreferred = ['A6','A7','A8','A9','AA']
    const softOrdered = softPreferred.map(l => byLabel[l]).filter(Boolean)

    const picked = new Set([...hardOrdered, ...softOrdered].map(r => r.rowLabel.toUpperCase()))
    const others = rows.filter(r => !picked.has(r.rowLabel.toUpperCase()))

    return [...hardOrdered, ...softOrdered, ...others]
  }

  const fetchChartData = async () => {
    try {
      setLoading(true); setError(null)

      if (bucket === 'perfect') {
        const res = await authFetch(`/api/perfect_chart?rule=${encodeURIComponent(rule)}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        const data = await res.json()
        console.log('[perfect_chart] raw', data)
        const rows = transformPerfectChart(data)
        console.log('[perfect_chart] rows', rows)
        setPerfectChart({ rule, rows })
      } else if (bucket === '2to3') {
        const res = await authFetch('/api/2to3_chart')
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        const data = await res.json()
        console.log('[2to3_chart] raw', data)
        const transformed = transformRegularChart(data)
        setCharts(prev => ({ ...prev, [rule]: { ...(prev[rule] || {}), ['2to3']: { hard: transformed } } }))
      } else {
        const res = await authFetch('/api/4to10_chart')
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        const data = await res.json()
        console.log('[4to10_chart] raw', data)
        const transformed = transformRegularChart(data)
        setCharts(prev => ({ ...prev, [rule]: { ...(prev[rule] || {}), ['4to10']: { hard: transformed } } }))
      }
    } catch (err) {
      console.error('Error fetching chart data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => { fetchChartData() }, [bucket, rule])

  const table = charts[rule]?.[bucket]?.hard || {}

  const setCell = (rowLabel, colIndex, value) => {
    if (bucket !== '2to3') return
    setCharts(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      if (!next[rule]) next[rule] = {}
      if (!next[rule][bucket]) next[rule][bucket] = {}
      if (!next[rule][bucket].hard) next[rule][bucket].hard = {}
      if (!next[rule][bucket].hard[rowLabel]) next[rule][bucket].hard[rowLabel] = new Array(10).fill('H')
      next[rule][bucket].hard[rowLabel][colIndex] = String(value).toUpperCase()
      return next
    })
  }

  const resetCurrentTable = () => { fetchChartData() }

  const isEditableNow = bucket === '2to3'
  const allActionOptions = [
    'H','S','D','P','R',
    'DS','D/S',
    'RH','R/H',
    'RS','R/S',
    'RP','R/P',
    'RP/H','RH/H','RH/P','RH/PRH'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading strategy chart...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg border border-red-200">
          <p className="text-red-600 mb-4">Error loading chart: {error}</p>
          <button onClick={fetchChartData} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Strategy chart" onGo={onBack} showBack />
      <main className="px-2 py-4">
        <div className="grid grid-cols-1 gap-2 mb-4">
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center space-x-2">
            <label className="text-sm text-gray-700">Rule</label>
            <select value={rule} onChange={(e)=>setRule(e.target.value)} className="border border-gray-200 rounded px-2 py-1 text-sm">
              <option value="H17">H17</option>
              <option value="S17">S17</option>
            </select>

            <label className="text-sm text-gray-700 ml-2">Chart</label>
            <select value={bucket} onChange={(e)=>setBucket(e.target.value)} className="border border-gray-200 rounded px-2 py-1 text-sm">
              <option value="4to10">4 to 10</option>
              <option value="2to3">2 to 3</option>
              <option value="perfect">Perfect</option>
            </select>

            <button
              onClick={()=> isEditableNow ? setEditable(!editable) : null}
              disabled={!isEditableNow}
              className={`ml-auto px-2 py-1 border rounded text-sm flex items-center space-x-1 ${isEditableNow ? 'border-gray-200' : 'border-gray-100 text-gray-400 cursor-not-allowed'}`}
              title={isEditableNow ? 'Toggle edit' : 'Editing available only for 2 to 3'}
            >
              <Edit3 size={14} />
              <span>{isEditableNow && editable ? 'Editing' : 'View only'}</span>
            </button>

            <button onClick={resetCurrentTable} className="px-2 py-1 border border-gray-200 rounded text-sm flex items-center space-x-1" title="Reset">
              <RefreshCw size={14} />
              <span>Reset</span>
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <button onClick={() => setShowLegend(!showLegend)} className="flex items-center space-x-2 text-sm text-gray-600">
              <Info size={16} />
              <span>Legend and syntax</span>
              {showLegend ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showLegend && (
              <div className="mt-2 text-xs text-gray-700 space-y-2">
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex items-center space-x-2"><span className="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">H</span><span>Hit</span></div>
                  <div className="flex items-center space-x-2"><span className="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">S</span><span>Stand</span></div>
                  <div className="flex items-center space-x-2"><span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">D</span><span>Double</span></div>
                  <div className="flex items-center space-x-2"><span className="px-2 py-1 rounded bg-purple-100 text-purple-800 font-medium">P</span><span>Split</span></div>
                  <div className="flex items-center space-x-2"><span className="px-2 py-1 rounded bg-orange-100 text-orange-800 font-medium">R</span><span>Surrender</span></div>
                </div>
                <div className="mt-2">
                  <div className="font-medium">Syntax</div>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><span className="font-mono">X/Y</span>, X is best at H17 tables, Y is best at S17 tables</li>
                    <li><span className="font-mono">XY</span>, X is best, if X is not allowed then Y is best</li>
                    <li className="text-gray-600">Examples</li>
                    <li><span className="font-mono">RP/H</span>, at H17 tables Surrender if possible, if not Split, at S17 tables Hit</li>
                    <li><span className="font-mono">D/S</span> is different from <span className="font-mono">DS</span>, <span className="font-mono">R/P</span> is different from <span className="font-mono">RP</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {bucket !== 'perfect' ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">Strategy Chart</h2>
              <p className="text-xs text-gray-500 mt-1">{rule}, dealer {bucket === '4to10' ? '4 to 10' : '2 to 3'}</p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-max">
                <div className="flex bg-gray-100 border-b border-gray-200">
                  <div className="w-16 py-3 px-2 text-center text-xs font-medium text-gray-600 border-r border-gray-200">Hand</div>
                  {dealerCards.map((card) => (
                    <div key={card} className="w-12 py-3 text-center text-xs font-medium text-gray-600 border-r border-gray-200 last:border-r-0">{card}</div>
                  ))}
                </div>

                <div className="divide-y divide-gray-200">
                  {Object.entries(table).map(([playerHandLabel, actions]) => (
                    <div key={playerHandLabel} className="flex">
                      <div className="w-16 py-3 px-2 text-center text-xs font-medium text-gray-900 bg-gray-50 border-r border-gray-200">{playerHandLabel}</div>
                      {actions.map((action, index) => (
                        <div key={index} className="w-12 py-2 px-1 text-center border-r border-gray-200 last:border-r-0">
                          {bucket === '2to3' && editable ? (
                            <select
                              value={action}
                              onChange={(e) => setCell(playerHandLabel, index, e.target.value)}
                              className={`w-full text-xs rounded px-1 py-1 ${getActionColor(action)}`}
                            >
                              {['H','S','D','P','R','DS','D/S','RH','R/H','RS','R/S','RP','R/P','RP/H','RH/H','RH/P','RH/PRH'].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <span className={`px-1.5 py-1 rounded text-xs font-medium ${getActionColor(action)}`}>{String(action)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">Perfect Chart</h2>
              <p className="text-xs text-gray-500 mt-1">{rule}, rows are dealer values twenty to six, then A6 to AA</p>
            </div>

            {perfectChart.rows.length === 0 ? (
              <div className="p-6 text-sm text-gray-600">No rows received from server, check console for the raw response</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-2 py-2 border border-gray-200 text-left">Dealer</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Hit Until Hard</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Hit Until Soft</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Double Hards</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Double Softs</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Splits</th>
                      <th className="px-2 py-2 border border-gray-200 text-left">Surrender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfectChart.rows.map((row, i) => {
                      const c = row.columns || {}
                      return (
                        <tr key={i} className="odd:bg-white even:bg-gray-50">
                          <td className="px-2 py-2 border border-gray-100 font-medium text-gray-900">{row.rowLabel}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Hit Until Hard'] ?? ''}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Hit Until Soft'] ?? ''}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Double Hards'] ?? ''}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Double Softs'] ?? ''}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Splits'] ?? ''}</td>
                          <td className="px-2 py-2 border border-gray-100">{c['Surrender'] ?? ''}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

/* --------------------------- Blackjack settings UI -------------------------- */

/* --------------------------- Blackjack settings UI -------------------------- */

function BlackjackSettings({ onStart, onBack }) {
  const [holeCard, setHoleCard] = useState('perfect')                // "perfect" | "4-10" | "2-3" | "A-9DAS" | "A-9NoDAS"
  const [surrenderAllowed, setSurrenderAllowed] = useState('Yes')    // "Yes" | "No"
  const [soft17Setting, setSoft17Setting] = useState('Hit')          // "Hit" | "Stand"
  const [decksCount, setDecksCount] = useState('6')                  // "1" | "4" | "5" | "6"
  const [doubleAllowed, setDoubleAllowed] = useState('any')          // "any" | "9-11" | "10-11"
  const [submitting, setSubmitting] = useState(false)

  const disableDecks = holeCard === 'A-9DAS' || holeCard === 'A-9NoDAS'

  // client settings for GameTable, unchanged shape
  const clientSettings = useMemo(() => ({
    hole_mode:
      holeCard === '4-10' ? '4to10'
      : holeCard === '2-3' ? '2to3'
      : (holeCard === 'A-9DAS' || holeCard === 'A-9NoDAS') ? 'Ato9'
      : 'perfect',
    surrender_allowed: surrenderAllowed === 'Yes',
    soft17_hit: soft17Setting === 'Hit',
    decks_count: Number(decksCount),
    double_first_two: doubleAllowed, // already "any" | "9-11" | "10-11"
  }), [holeCard, surrenderAllowed, soft17Setting, decksCount, doubleAllowed])

  // backend payload with exact keys and values
  const backendPayload = useMemo(() => ({
    'Hole Card': holeCard,                         // "perfect" | "4-10" | "2-3" | "A-9DAS" | "A-9NoDAS"
    'Surrender': surrenderAllowed,                 // "Yes" | "No"
    'Dealer_soft_17': soft17Setting,               // "Hit" | "Stand"
    'Decks': disableDecks ? 1 : Number(decksCount),// integer 1|4|5|6, force 1 when A-9 selected
    'Double allowed': doubleAllowed,               // "any" | "9-11" | "10-11"
  }), [holeCard, surrenderAllowed, soft17Setting, decksCount, doubleAllowed, disableDecks])

  const authFetch = async (path, init = {}) => {
    const token = await getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', 'application/json')
    return fetch(path, { ...init, headers, credentials: 'include' })
  }

  const submitAndStart = async () => {
    setSubmitting(true)
    try {
      const res = await authFetch('/api/settings_update', {
        method: 'POST',
        body: JSON.stringify(backendPayload),
      })
      if (!res.ok) {
        const msg = `Settings update failed, HTTP ${res.status}`
        console.error(msg)
        toast.error(msg)
        return
      }
      toast.success('Settings saved')
      onStart(clientSettings)
    } catch (e) {
      console.error(e)
      toast.error('Could not reach server')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Settings" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">

          <div>
            <label className="block text-sm text-gray-700 mb-1">Hole card</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={holeCard}
              onChange={(e)=>setHoleCard(e.target.value)}
            >
              <option value="perfect">Perfect</option>
              <option value="4-10">4-10</option>
              <option value="2-3">2-3</option>
              <option value="A-9DAS">A-9 DAS</option>
              <option value="A-9NoDAS">A-9 NoDAS</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Surrender</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={surrenderAllowed}
                onChange={(e)=>setSurrenderAllowed(e.target.value)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Dealer soft 17</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={soft17Setting}
                onChange={(e)=>setSoft17Setting(e.target.value)}
              >
                <option value="Hit">Hit</option>
                <option value="Stand">Stand</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Decks</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
                value={decksCount}
                onChange={(e)=>setDecksCount(e.target.value)}
                disabled={disableDecks}
              >
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {disableDecks && <p className="mt-1 text-xs text-gray-500">Decks fixed to 1 for A 9 modes</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Double allowed</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={doubleAllowed}
                onChange={(e)=>setDoubleAllowed(e.target.value)}
              >
                <option value="any">any</option>
                <option value="9-11">9-11</option>
                <option value="10-11">10-11</option>
              </select>
            </div>
          </div>

          <button
            onClick={submitAndStart}
            disabled={submitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Start Blackjack'}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onBack('home')}
            className="w-full border border-gray-200 py-3 rounded-lg bg-white"
          >
            More games
          </button>
          <button
            onClick={() => onBack('strategy')}
            className="w-full border border-gray-200 py-3 rounded-lg bg-white flex items-center justify-center space-x-2"
          >
            <BookOpen size={18} className="text-gray-600" />
            <span>Strategy chart</span>
          </button>
        </div>
      </main>
    </div>
  )
}

/* --------------------------- Spanish 21 settings UI -------------------------- */

function Spanish21Settings({ onStart, onBack }) {
  const [holeCard, setHoleCard] = useState('perfect') // perfect, 4-9, 2-3
  const [surrenderAllowed, setSurrenderAllowed] = useState('yes') // yes or no
  const [soft17Hit, setSoft17Hit] = useState('true') // true or false
  const [doubleAllowed, setDoubleAllowed] = useState('any') // any, 9-11, 10-11

  const settings = useMemo(() => ({
    game_type: 'spanish21',
    hole_mode: holeCard === '4-9' ? '4to9' : holeCard === '2-3' ? '2to3' : 'perfect',
    surrender_allowed: surrenderAllowed === 'yes',
    soft17_hit: soft17Hit === 'true',
    double_first_two: doubleAllowed === 'any' ? 'any' : doubleAllowed
  }), [holeCard, surrenderAllowed, soft17Hit, doubleAllowed])

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Spanish 21" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Hole card</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={holeCard}
              onChange={(e)=>setHoleCard(e.target.value)}
            >
              <option>Perfect</option>
              <option>4-9</option>
              <option>2-3</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Surrender</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={surrenderAllowed}
                onChange={(e)=>setSurrenderAllowed(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Dealer soft 17</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={soft17Hit}
                onChange={(e)=>setSoft17Hit(e.target.value)}
              >
                <option value="true">Hit</option>
                <option value="false">Stand</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Double allowed</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={doubleAllowed}
              onChange={(e)=>setDoubleAllowed(e.target.value)}
            >
              <option value="any">Any</option>
              <option value="9-11">9-11</option>
              <option value="10-11">10-11</option>
            </select>
          </div>

          <button
            onClick={() => onStart(settings)}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
          >
            Start Spanish 21
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onBack('home')}
            className="w-full border border-gray-200 py-3 rounded-lg bg-white"
          >
            More games
          </button>
        </div>
      </main>
    </div>
  )
}

/* ---------------------------- Simple info pages ---------------------------- */

function StatsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Stats" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Overview</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Hands</span><span className="font-medium">0</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Accuracy</span><span className="font-medium">0%</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Streak</span><span className="font-medium">0</span></div>
          </div>
        </div>
      </main>
    </div>
  )
}

function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="About" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2 text-sm text-gray-700">
          <p>Bet404 is a mobile first trainer for Blackjack and Spanish 21.</p>
          <p>Use the Blackjack settings screen to set your table rules, then start training.</p>
        </div>
      </main>
    </div>
  )
}

function SettingsPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="App settings" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Haptics</span>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Sound</span>
            <input type="checkbox" className="toggle toggle-sm" />
          </div>
        </div>
      </main>
    </div>
  )
}

/* --------------------------------- Home UI -------------------------------- */

function Home({ onGo }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Bet404" onGo={onGo} />
      <main className="px-4 py-6 max-w-md mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onGo('blackjack')}
            className="group bg-black text-white p-4 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <Gamepad2 size={24} />
              <div className="text-left">
                <div className="font-medium">Blackjack</div>
                <div className="text-xs text-gray-300">Set rules and start</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onGo('spanish21')}
            className="group border border-gray-200 p-4 rounded-xl bg-white"
          >
            <div className="flex items-center space-x-3">
              <Gamepad2 size={24} className="text-gray-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Spanish 21</div>
                <div className="text-xs text-gray-500">Set rules and start</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onGo('more')}
            className="group border border-gray-200 p-4 rounded-xl bg-white"
          >
            <div className="flex items-center space-x-3">
              <Gamepad2 size={24} className="text-gray-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">More games</div>
                <div className="text-xs text-gray-500">Browse extras</div>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}

/* ------------------------------ Dashboard shell ----------------------------- */

function Dashboard() {
  const [route, setRoute] = useState('home')
  const [pendingSettings, setPendingSettings] = useState(null)
  const [activeGame, setActiveGame] = useState(null)

React.useEffect(() => {
  const isSpanish21 = route === 'play' && activeGame?.game === 'spanish21';

  if (isSpanish21) {
    document.body.style.backgroundColor = '#8B0000';
    document.documentElement.style.backgroundColor = '#8B0000';
  } else {
    document.body.style.backgroundColor = '#006400';
    document.documentElement.style.backgroundColor = '#006400';
  }
  return () => {
    document.body.style.backgroundColor = '';
    document.documentElement.style.backgroundColor = '';
  };
}, [route, activeGame?.game]);

  const go = (next) => setRoute(next)

  const startBlackjack = (settings) => {
    setPendingSettings(settings)
    setActiveGame({ mode: 'custom', settings, game: 'blackjack' })
    setRoute('play')
  }

  const startSpanish21 = (settings) => {
    setPendingSettings(settings)
    setActiveGame({ mode: 'custom', settings, game: 'spanish21' })
    setRoute('play')
  }

  if (route === 'strategy') return <StrategyChartPage onBack={go} />
  if (route === 'blackjack') return <BlackjackSettings onStart={startBlackjack} onBack={go} />
  if (route === 'spanish21') return <Spanish21Settings onStart={startSpanish21} onBack={go} />
  if (route === 'stats') return <StatsPage onBack={go} />
  if (route === 'about') return <AboutPage onBack={go} />
  if (route === 'settings') return <SettingsPage onBack={go} />
  if (route === 'more') {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav title="More games" onGo={go} showBack />
        <main className="px-4 py-6 max-w-md mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm text-gray-700">
            More games will appear here.
          </div>
        </main>
      </div>
    )
  }
  if (route === 'play' && activeGame) {
    const isSpanish21 = activeGame.game === 'spanish21';

    return (
      <div className="min-h-screen relative">
        {isSpanish21 && (
          <style>{`
            .s21-scope { background-color: #8B0000; min-height: 100vh; width: 100vw; }
            .s21-scope .bg-gray-50 { background-color: #8B0000 !important; }
            .s21-scope .bg-white { background-color: rgba(255,255,255,0.06) !important; }
            .s21-scope .text-gray-900 { color: #fff !important; }
            .s21-scope .text-gray-700 { color: #f5f5f5 !important; }
            .s21-scope .border-gray-200 { border-color: rgba(255,255,255,0.15) !important; }
          `}</style>
        )}

        <div className={isSpanish21 ? 's21-scope' : 'bg-green-700'}>
          <GameTable
            mode={activeGame.mode}
            settings={pendingSettings}
            onBack={() => { setActiveGame(null); setRoute('home'); }}
            uiTheme={isSpanish21 ? 'casino-red' : 'default'}
          />
        </div>
      </div>
    );
  }

  return <Home onGo={go} />
}

/* ---------------------------------- App ---------------------------------- */

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      {user ? <Dashboard /> : <LoginScreen />}
      <Toaster
        position="top-center"
        gutter={8}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '400',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            maxWidth: '320px',
          },
          success: { style: { background: '#111827' }, icon: '✓' },
          error: { style: { background: '#111827' }, icon: '✕' },
        }}
      />
    </>
  )
}
