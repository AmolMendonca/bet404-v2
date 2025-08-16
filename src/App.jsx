import React, { useMemo, useState, useEffect, useRef } from 'react'
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
  const { user } = useAuth()
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
              try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }) } catch (e) { console.warn('logout endpoint failed', e) }
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
    if (isSignUp) await signUp(email, password)
    else await signIn(email, password)
  }

  const handleReset = async (e) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email first'); return }
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
  const [game, setGame] = React.useState('blackjack') // blackjack or spanish
  const [bucket, setBucket] = React.useState('4to10')  // active chart key within the chosen game
  const [editable, setEditable] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [showLegend, setShowLegend] = React.useState(false)

  const dealerCards = ['2','3','4','5','6','7','8','9','10','A']

  // blackjack charts
  const [bjCharts, setBjCharts] = React.useState({
    '4to10':  { hard: {} },
    '2to3':   { hard: {} },
    'a9das':  { hard: {} },
    'a9nodas':{ hard: {} }
  })
  const [bjPerfect, setBjPerfect] = React.useState({ rows: [] })

  // spanish charts
  const [spCharts, setSpCharts] = React.useState({
    's4to9':  { hard: {} },
    's2to3':  { hard: {} }
  })
  const [spPerfect, setSpPerfect] = React.useState({ rows: [] })

  // --- Perfect chart inline edit modal state ---
  const [editOpen, setEditOpen] = React.useState(false)
  const [editVal, setEditVal] = React.useState('')
  const editCtxRef = React.useRef(null) // { mode, dealer_val, col, labelKey }

  // auth fetch
  const authFetch = async (path, init = {}) => {
    const token = await getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    return fetch(path, { ...init, headers, credentials: 'include' })
  }

  // ui color helper
  const getActionColor = (raw) => {
    const a = String(raw || '').toUpperCase()
    const head = a[0] || ''
    if (head === 'S') return 'bg-red-100 text-red-800'
    if (head === 'H') return 'bg-yellow-100 text-yellow-800'
    if (head === 'D' && !a.startsWith('DS') && !a.startsWith('D/S')) return 'bg-green-100 text-green-800'
    if (a.startsWith('DS') || a.startsWith('D/S')) return 'bg-green-50 text-green-700'
    if (head === 'P') return 'bg-blue-100 text-blue-800'
    if (a.startsWith('RH') || a.includes('PRH')) return 'bg-blue-50 text-blue-700'
    return 'bg-gray-100 text-gray-800'
  }

  const getDealerIndex = (v) => {
    const m = { '2':0,'3':1,'4':2,'5':3,'6':4,'7':5,'8':6,'9':7,'10':8,'A':9 }
    return m[v] ?? -1
  }

  // map API pair encoding to row labels without math
  const mapPairKey = (raw) => {
    const s = String(raw || '').toUpperCase()
    if (s === '12') return 'AA'                  // ace pair
    if (s === '20' || s === '1010') return 'TT'  // tens pair
    if (/^(2|3|4|5|6|7|8|9)\1$/.test(s)) return s   // '22'..'99'
    return s
  }

  const transformRegularChart = (apiData) => {
    const chart = {}

    // pairs
    apiData?.pair_entries?.forEach(entry => {
      const { dealer_val, player_pair, recommended_move } = entry
      const rowKey = mapPairKey(player_pair)
      if (!chart[rowKey]) chart[rowKey] = new Array(10).fill('H')
      const idx = getDealerIndex(String(dealer_val))
      if (idx !== -1) chart[rowKey][idx] = String(recommended_move).toUpperCase()
    })

    // regular
    apiData?.regular_entries?.forEach(entry => {
      const { dealer_val, player_hand_type, player_val, recommended_move } = entry
      let rowKey
      if (String(player_hand_type).toLowerCase() === 'soft') {
        const aceValue = Number(player_val) - 11
        if (aceValue >= 2 && aceValue <= 9) rowKey = `A${aceValue}` // A2..A9
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

  // load data
  const fetchChartData = async () => {
    try {
      setLoading(true); setError(null)
      if (game === 'blackjack') {
        if (bucket === 'perfect') {
          const res = await authFetch(`/api/perfect_chart`)
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const rows = transformPerfectChart(data)
          setBjPerfect({ rows })
        } else if (bucket === '2to3') {
          const res = await authFetch('/api/2to3_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setBjCharts(prev => ({ ...prev, ['2to3']: { hard: transformed } }))
        } else if (bucket === 'a9das') {
          const res = await authFetch('/api/a9das_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setBjCharts(prev => ({ ...prev, ['a9das']: { hard: transformed } }))
        } else if (bucket === 'a9nodas') {
          const res = await authFetch('/api/a9nodas_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setBjCharts(prev => ({ ...prev, ['a9nodas']: { hard: transformed } }))
        } else {
          const res = await authFetch('/api/4to10_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setBjCharts(prev => ({ ...prev, ['4to10']: { hard: transformed } }))
        }
      } else {
        if (bucket === 'sp_perfect') {
          const res = await authFetch(`/api/spanish_perfect_chart`)
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const rows = transformPerfectChart(data)
          setSpPerfect({ rows })
        } else if (bucket === 's2to3') {
          const res = await authFetch('/api/spanish_2to3_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setSpCharts(prev => ({ ...prev, ['s2to3']: { hard: transformed } }))
        } else {
          const res = await authFetch('/api/spanish_4to9_chart')
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
          const data = await res.json()
          const transformed = transformRegularChart(data)
          setSpCharts(prev => ({ ...prev, ['s4to9']: { hard: transformed } }))
        }
      }
    } catch (err) {
      console.error('Error fetching chart data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // default bucket per game
  React.useEffect(() => {
    setBucket(game === 'blackjack' ? '4to10' : 's4to9')
  }, [game])

  React.useEffect(() => { fetchChartData() }, [game, bucket])

  // current table
  const table =
    game === 'blackjack'
      ? (bjCharts[bucket]?.hard || {})
      : (spCharts[bucket]?.hard || {})

  // map UI bucket to API mode, includes perfect modes
  const bucketToApiMode = React.useCallback(() => {
    if (game === 'blackjack') {
      if (bucket === '4to10')  return '4-10'
      if (bucket === '2to3')   return '2-3'
      if (bucket === 'a9das')  return 'A-9DAS'
      if (bucket === 'a9nodas')return 'A-9NoDAS'
      if (bucket === 'perfect')return 'perfect'
      return null
    }
    if (bucket === 's4to9') return 'Spanish_4to9'
    if (bucket === 's2to3') return 'Spanish_2to3'
    if (bucket === 'sp_perfect') return 'Spanish_perfect'
    return null
  }, [game, bucket])

  // whether this selection is the perfect chart
  const isPerfect = (game === 'blackjack' && bucket === 'perfect') || (game === 'spanish' && bucket === 'sp_perfect')
  const perfectRows = game === 'blackjack' ? bjPerfect.rows : spPerfect.rows

  // allow editing everywhere via the toggle
  const isEditableNow = true

  // map a row label and column to the API payload fields for regular (non-perfect) charts
  const buildUpdatePayload = (rowLabel, colIndex, newMoveUpper) => {
    const mode = bucketToApiMode()
    if (!mode) return null

    // dealer value
    const dealer_val = dealerCards[colIndex] === 'T' ? '10' : dealerCards[colIndex]

    // pairs
    const isAA = rowLabel === 'AA'
    const isTT = rowLabel === 'TT'
    const isDigitPair = /^(\d)\1$/.test(rowLabel) && rowLabel !== '11'

    if (isAA || isTT || isDigitPair) {
      let pv
      if (isAA) pv = 12
      else if (isTT) pv = 20
      else pv = parseInt(rowLabel, 10) // 22..99
      return {
        mode,
        dealer_val,
        player_val: pv,
        player_pair: true,
        player_hand_type: 'hard', // ignored by server for pairs
        new_move: newMoveUpper,
      }
    }

    // soft hands A2..A9
    if (/^A[2-9]$/.test(rowLabel)) {
      const n = parseInt(rowLabel.slice(1), 10) // 2..9
      const pv = 11 + n                          // 13..20
      return {
        mode,
        dealer_val,
        player_val: pv,
        player_pair: false,
        player_hand_type: 'soft',
        new_move: newMoveUpper,
      }
    }

    // hard totals like 8..20 and 11 is hard, not a pair
    if (/^\d+$/.test(rowLabel)) {
      const pv = parseInt(rowLabel, 10)
      return {
        mode,
        dealer_val,
        player_val: pv,
        player_pair: false,
        player_hand_type: 'hard',
        new_move: newMoveUpper,
      }
    }

    return null
  }

  // save to server for regular charts, then update local state on success
  const saveCell = async (rowLabel, colIndex, newVal) => {
    if (!editable) return
    if (isPerfect) return // perfect editing is handled by the modal below
    const newMoveUpper = String(newVal || '').toUpperCase()
    const payload = buildUpdatePayload(rowLabel, colIndex, newMoveUpper)
    if (!payload) {
      toast.error('Row cannot be edited')
      return
    }

    try {
      const res = await authFetch('/api/chart/update_cell', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        toast.error(`Save failed, HTTP ${res.status}`)
        return
      }
      const json = await res.json()
      if (!json?.ok) {
        toast.error('Server did not confirm change')
        return
      }

      // update local state only after success
      const applyLocal = (setFn, key) => {
        setFn(prev => {
          const next = JSON.parse(JSON.stringify(prev))
          if (!next[key]) next[key] = {}
          if (!next[key].hard) next[key].hard = {}
          if (!next[key].hard[rowLabel]) next[key].hard[rowLabel] = new Array(10).fill('H')
          next[key].hard[rowLabel][colIndex] = newMoveUpper
          return next
        })
      }

      if (game === 'blackjack') applyLocal(setBjCharts, bucket)
      else applyLocal(setSpCharts, bucket)

      toast.success('Saved')
    } catch (e) {
      console.error(e)
      toast.error('Network error')
    }
  }

  // refresh current table from server
  const resetCurrentTable = () => { fetchChartData() }

  // reset entries to defaults by calling backend endpoint, then refetch
  const resetFromDefaults = async () => {
    const mode = bucketToApiMode()
    if (!mode) return
    try {
      const res = await authFetch('/api/reset_entries_default', {
        method: 'POST',
        body: JSON.stringify({ mode }),
      })
      if (!res.ok) {
        toast.error(`Reset failed, HTTP ${res.status}`)
        return
      }
      const json = await res.json()
      if (!json?.ok) {
        toast.error(json?.error || 'Reset failed')
        return
      }
      toast.success('Reset to defaults')
      await fetchChartData()
    } catch (e) {
      console.error(e)
      toast.error('Network error')
    }
  }

  // ---------- Perfect chart editing helpers ----------
  const parseIntSafe = (s) => {
    const n = Number.parseInt(s, 10)
    return Number.isFinite(n) ? n : NaN
  }
  const in12120 = (n) => Number.isFinite(n) && n >= 12 && n <= 20

  // Accept "12".."20" or "N/M" (both 12..20). Trim and normalize to "N" or "N/M"
  function normalizeHitInput(str) {
    const cleaned = String(str || '').trim()
    if (!cleaned) return null

    if (cleaned.includes('/')) {
      const [lhsRaw, rhsRaw] = cleaned.split('/')
      const lhs = parseIntSafe(lhsRaw?.trim())
      const rhs = parseIntSafe(rhsRaw?.trim())
      if (in12120(lhs) && in12120(rhs)) return `${lhs}/${rhs}`
      return null
    }

    const n = parseIntSafe(cleaned)
    if (in12120(n)) return `${n}`
    return null
  }

  // Double Hards validator/normalizer:
  // - empty => '' (clears, shows ❌)
  // - side := 'None' | N | A-B   where N in [2..11], 2 ≤ A ≤ B ≤ 11
  // - overall := side | side '/' side
  function normalizeDoubleHardsInput(str) {
    const cleaned = String(str || '').trim()
    if (cleaned === '') return '' // allow clearing

    const normSide = (raw) => {
      const s = String(raw || '').trim()
      if (!s) return null
      if (/^none$/i.test(s)) return 'None'
      // single number
      if (/^\d{1,2}$/.test(s)) {
        const n = parseIntSafe(s)
        if (Number.isFinite(n) && n >= 2 && n <= 11) return String(n)
        return null
      }
      // range a-b
      const m = s.match(/^(\d{1,2})\s*-\s*(\d{1,2})$/)
      if (m) {
        const a = parseIntSafe(m[1])
        const b = parseIntSafe(m[2])
        if (
          Number.isFinite(a) && Number.isFinite(b) &&
          a >= 2 && a <= 11 && b >= 2 && b <= 11 && a <= b
        ) {
          return `${a}-${b}`
        }
      }
      return null
    }

    if (cleaned.includes('/')) {
      const [lhsRaw, rhsRaw] = cleaned.split('/')
      const L = normSide(lhsRaw)
      const R = normSide(rhsRaw)
      if (L && R) return `${L}/${R}`
      return null
    }

    const single = normSide(cleaned)
    return single
  }

  // Double Softs validator/normalizer:
  // - empty => '' (clears, shows ❌)
  // - side := 'None' | atom | atom,atom | atom atom   (max 2 atoms)
  //   where atom := A2..A10 | A2-Ak (k in 2..10, lower ≤ upper), AT == A10
  // - overall := side | side '/' side
  function normalizeDoubleSoftsInput(str) {
    const cleaned = String(str || '').trim()
    if (cleaned === '') return ''

    const normalizeCard = (x) => {
      const s = String(x || '').trim().toUpperCase()
      if (!s) return null
      if (/^A([2-9]|10|T)$/.test(s)) {
        // Normalize AT => A10
        return s === 'AT' ? 'A10' : (s === 'A10' ? 'A10' : `A${s.slice(1)}`)
      }
      return null
    }

    const atomSingle = (raw) => {
      const s = normalizeCard(raw)
      return s // 'A2'..'A10' or null
    }

    const atomRange = (raw) => {
      const m = /^A([2-9]|10|T)\s*-\s*A([2-9]|10|T)$/i.exec(String(raw || '').trim())
      if (!m) return null
      const lo = m[1].toUpperCase() === 'T' ? 10 : parseInt(m[1], 10)
      const hi = m[2].toUpperCase() === 'T' ? 10 : parseInt(m[2], 10)
      if (lo < 2 || hi > 10 || lo > hi) return null
      const lhs = lo === 10 ? 'A10' : `A${lo}`
      const rhs = hi === 10 ? 'A10' : `A${hi}`
      return `${lhs}-${rhs}`
    }

    const normAtom = (raw) => {
      return atomSingle(raw) || atomRange(raw)
    }

    const isNoneProgressive = (s) => /^n(?:o(?:n(?:e?)?)?)?$/i.test(s) // N, No, Non, None

    const normSide = (raw) => {
      const s = String(raw || '').trim()
      if (!s) return null
      // allow partial typing of None -> normalize to 'None'
      if (isNoneProgressive(s)) return 'None'
      const parts = s.split(/[,\s]+/).map(p => p.trim()).filter(Boolean)
      if (parts.length === 0 || parts.length > 2) return null
      const atoms = parts.map(normAtom)
      if (atoms.some(a => !a)) return null
      return atoms.join(',')
    }

    if (cleaned.includes('/')) {
      const [lhsRaw, rhsRaw] = cleaned.split('/')
      const L = normSide(lhsRaw)
      const R = normSide(rhsRaw)
      if (L && R) return `${L}/${R}`
      return null
    }

    const single = normSide(cleaned)
    return single
  }

  // Splits validator/normalizer:
  // - empty  => '' (clears)
  // - side   := 'None' | ascending list using A23456789T (10 accepted & normalized to T)
  //             e.g., A2346789T, A, A8, 234T (strictly ascending, no repeats)
  // - overall:= side | side '/' side
  function normalizeSplitsInput(str) {
    const cleaned = String(str || '').trim()
    if (cleaned === '') return '' // allow clearing
    if (/^none$/i.test(cleaned)) return 'None'

    const order = { A:1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, T:10 }

    const normSide = (raw) => {
      if (raw == null) return null
      let s = String(raw).toUpperCase().replace(/10/g, 'T').trim()
      if (/^none$/i.test(s)) return 'None'
      if (!/^[A23456789T]+$/.test(s)) return null
      let prev = 0
      for (const ch of s) {
        const v = order[ch]
        if (!v || v <= prev) return null
        prev = v
      }
      return s
    }

    if (cleaned.includes('/')) {
      const [lhsRaw, rhsRaw] = cleaned.split('/')
      const L = normSide(lhsRaw?.trim())
      const R = normSide(rhsRaw?.trim())
      if (L && R) return `${L}/${R}`
      return null
    }

    return normSide(cleaned)
  }

  // -------------------------------------------------------------------------

  const openPerfectEditor = ({ dealer_val, col, currentVal, labelKey }) => {
    const mode = bucketToApiMode() // "perfect" | "Spanish_perfect"
    if (!mode) return
    editCtxRef.current = { mode, dealer_val, col, labelKey }
    setEditVal(String(currentVal || '').trim())
    setEditOpen(true)
  }

  const applyLocalPerfect = ({ dealer_val, labelKey, new_val }) => {
    const patch = (rows) => {
      const next = rows.map(r => {
        if (String(r.rowLabel) !== String(dealer_val)) return r
        const cols = { ...(r.columns || {}) }
        cols[labelKey] = new_val
        return { ...r, columns: cols }
      })
      return next
    }
    if (game === 'blackjack') {
      setBjPerfect(prev => ({ rows: patch(prev.rows || []) }))
    } else {
      setSpPerfect(prev => ({ rows: patch(prev.rows || []) }))
    }
  }

  const confirmPerfectEdit = async () => {
    const ctx = editCtxRef.current
    if (!ctx) return setEditOpen(false)

    let normalized
    if (ctx.col === 'hit_until_hard' || ctx.col === 'hit_until_soft') {
      normalized = normalizeHitInput(editVal)
      if (!normalized) {
        toast.error('Enter 12–20 or N/M with each 12–20')
        return
      }
    } else if (ctx.col === 'double_hards') {
      normalized = normalizeDoubleHardsInput(editVal)
      if (normalized === null) {
        toast.error("Enter 2–11, a range like 9-11, or use '/' with sides of number/range/None. Leave empty to clear.")
        return
      }
    } else if (ctx.col === 'double_softs') {
      normalized = normalizeDoubleSoftsInput(editVal)
      if (normalized === null) {
        toast.error("Enter A2–AT (AT=A10). Each side can be None or up to two values/ranges; use '/' to separate sides. Leave empty to clear.")
        return
      }
    } else if (ctx.col === 'splits') {
      normalized = normalizeSplitsInput(editVal)
      if (normalized === null) {
        toast.error("Enter ascending ranks from A23456789T (10 allowed as T). Optional '/' to provide two sides or 'None'. Examples: A2346789T, A, None, A23789/A236789, A8, A78/A8.")
        return
      }
    } else {
      toast.error('Unsupported column')
      return
    }

    try {
      const res = await authFetch('/api/chart/update_perfect_cell', {
        method: 'POST',
        body: JSON.stringify({
          mode: ctx.mode,               // "perfect" | "Spanish_perfect"
          dealer_val: ctx.dealer_val,   // "20".."6" | "A6".."AA"
          col: ctx.col,                 // "hit_until_hard" | "hit_until_soft" | "double_hards" | "double_softs" | "splits"
          new_val: normalized,
        }),
      })
      if (!res.ok) { toast.error(`Save failed, HTTP ${res.status}`); return }
      const json = await res.json()
      if (!json?.ok) { toast.error('Server did not confirm change'); return }
      applyLocalPerfect({ dealer_val: ctx.dealer_val, labelKey: ctx.labelKey, new_val: normalized })
      toast.success('Saved')
      setEditOpen(false)
    } catch (e) {
      console.error(e)
      toast.error('Network error')
    }
  }

  const allActionOptions = [
    'H','S','D','P','R',
    'DS','D/S',
    'RH','R/H',
    'RS','R/S',
    'RP','R/P',
    'RP/H','RH/H','RH/P','RH/PRH'
  ]

  const dealerLabelMapBJ = {
    '4to10': '4 to 10',
    '2to3': '2 to 3',
    'a9das': 'A to 9 DAS',
    'a9nodas': 'A to 9 NoDAS'
  }
  const dealerLabelMapSP = {
    's4to9': '4 to 9',
    's2to3': '2 to 3'
  }

  // sort rows, hards then softs then pairs, TT near bottom, AA last
  const sortedEntries = React.useMemo(() => {
    const entries = Object.entries(table)

    const isDigits = (s) => /^\d+$/.test(s)
    const isSoft = (s) => /^A[2-9]$/.test(s)
    const isPair = (s) =>
      s === 'AA' ||
      s === 'TT' ||
      (/^(\d)\1$/.test(s) && s !== '11')

    const pairOrder = { '22':2,'33':3,'44':4,'55':5,'66':6,'77':7,'88':8,'99':9,'TT':10,'AA':11 }

    const groupOrder = (label) => {
      if (isDigits(label) && !isPair(label)) return 0
      if (isSoft(label)) return 1
      if (isPair(label)) return 2
      return 3
    }

    const numericKey = (label) => {
      if (isSoft(label)) return parseInt(label.slice(1), 10)
      if (isPair(label)) return 100 + (pairOrder[label] ?? 99)
      if (/^\d+$/.test(label)) return parseInt(label, 10)
      return Number.MAX_SAFE_INTEGER
    }

    return entries.sort(([a], [b]) => {
      const ga = groupOrder(a), gb = groupOrder(b)
      if (ga !== gb) return ga - gb
      const na = numericKey(a), nb = numericKey(b)
      if (na !== nb) return na - nb
      return a.localeCompare(b)
    })
  }, [table])

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
          <p className="text-red-600 mb-4">Error loading chart, {error}</p>
          <button onClick={fetchChartData} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const chartOptions = game === 'blackjack'
    ? [
        { value: '4to10', label: '4 to 10' },
        { value: '2to3', label: '2 to 3' },
        { value: 'a9das', label: 'A to 9 DAS' },
        { value: 'a9nodas', label: 'A to 9 NoDAS' },
        { value: 'perfect', label: 'Perfect' },
      ]
    : [
        { value: 's4to9', label: '4 to 9' },
        { value: 's2to3', label: '2 to 3' },
        { value: 'sp_perfect', label: 'Perfect' },
      ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Strategy chart" onGo={onBack} showBack />
      <main className="px-2 py-4">
        <div className="grid grid-cols-1 gap-2 mb-4">
          {/* game selector */}
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Game</span>
              <div className="relative">
                <div className="grid grid-cols-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setGame('blackjack')}
                    className={`px-3 py-1 text-sm rounded-md transition ${game === 'blackjack' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
                    aria-pressed={game === 'blackjack'}
                  >
                    Blackjack
                  </button>
                  <button
                    onClick={() => setGame('spanish')}
                    className={`px-3 py-1 text-sm rounded-md transition ${game === 'spanish' ? 'bg-white shadow text-gray-900' : 'text-gray-600'}`}
                    aria-pressed={game === 'spanish'}
                  >
                    Spanish 21
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* chart selector and controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center space-x-2">
            <label className="text-sm text-gray-700">Chart</label>
            <select
              value={bucket}
              onChange={(e)=>setBucket(e.target.value)}
              className="border border-gray-200 rounded px-2 py-1 text-sm"
            >
              {chartOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <button
              onClick={()=> setEditable(!editable)}
              className="ml-auto px-2 py-1 border border-gray-200 rounded text-sm flex items-center space-x-1"
              title="Toggle edit"
            >
              <Edit3 size={14} />
              <span>{editable ? 'Editing' : 'View only'}</span>
            </button>

            <button onClick={resetFromDefaults} className="px-2 py-1 border border-gray-200 rounded text-sm flex items-center space-x-1" title="Reset from defaults">
              <RefreshCw size={14} />
              <span>Defaults</span>
            </button>
          </div>

          {/* legend */}
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <button onClick={() => setShowLegend(!showLegend)} className="flex items-center space-x-2 text-sm text-gray-600">
              <Info size={16} />
              <span>Legend and syntax</span>
              {showLegend ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showLegend && (
              <div className="mt-2 text-xs text-gray-700 space-y-2">
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-red-100 text-red-800 font-medium">S</span>
                      <span>Stand</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium">H</span>
                      <span>Hit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-medium">D</span>
                      <span>Double</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-green-50 text-green-700 font-medium">DS</span>
                      <span>DS or D slash S</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">P</span>
                      <span>Split</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 font-medium">RH</span>
                      <span>RH or PRH</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="font-medium">Syntax</div>
                  <ul className="list-disc ml-5 space-y-1">
                    <li><span className="font-mono">XY</span>, X is best, if X is not allowed then Y is best</li>
                    <li className="text-gray-600">Examples</li>
                    <li><span className="font-mono">RP/H</span>, Surrender if possible, if not Split, otherwise Hit</li>
                    <li><span className="font-mono">D/S</span> is different from <span className="font-mono">DS</span>, <span className="font-mono">R/P</span> is different from <span className="font-mono">RP</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {!isPerfect ? (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">Strategy Chart</h2>
              <p className="text-xs text-gray-500 mt-1">
                Dealer {game === 'blackjack' ? (dealerLabelMapBJ[bucket] || '') : (dealerLabelMapSP[bucket] || '')}
              </p>
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
                  {sortedEntries.map(([playerHandLabel, actions]) => (
                    <div key={playerHandLabel} className="flex">
                      <div className="w-16 py-3 px-2 text-center text-xs font-medium text-gray-900 bg-gray-50 border-r border-gray-200">{playerHandLabel}</div>
                      {actions.map((action, index) => (
                        <div key={index} className="w-12 py-2 px-1 text-center border-r border-gray-200 last:border-r-0">
                          {editable ? (
                            <select
                              value={action}
                              onChange={(e) => saveCell(playerHandLabel, index, e.target.value)}
                              className={`w-full text-xs rounded px-1 py-1 ${getActionColor(action)}`}
                            >
                              {allActionOptions.map(opt => (
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
              <p className="text-xs text-gray-500 mt-1">Rows are dealer values twenty to six, then A6 to AA</p>
            </div>

            {perfectRows.length === 0 ? (
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
                    {perfectRows.map((row, i) => {
                      const c = row.columns || {}
                      const renderCell = (val) => val && val.trim() !== '' ? val : '❌'
                      return (
                        <tr key={i} className="odd:bg-white even:bg-gray-50">
                          <td className="px-2 py-2 border border-gray-100 font-medium text-gray-900">{row.rowLabel}</td>

                          {/* Hit Until Hard — editable */}
                          <td className="px-2 py-2 border border-gray-100">
                            {editable ? (
                              <button
                                onClick={() => openPerfectEditor({
                                  dealer_val: row.rowLabel,
                                  col: 'hit_until_hard',
                                  labelKey: 'Hit Until Hard',
                                  currentVal: c['Hit Until Hard'],
                                })}
                                className="w-full text-left hover:bg-gray-50 rounded px-1 py-0.5"
                                title="Edit"
                              >
                                {renderCell(c['Hit Until Hard'])}
                              </button>
                            ) : renderCell(c['Hit Until Hard'])}
                          </td>

                          {/* Hit Until Soft — editable */}
                          <td className="px-2 py-2 border border-gray-100">
                            {editable ? (
                              <button
                                onClick={() => openPerfectEditor({
                                  dealer_val: row.rowLabel,
                                  col: 'hit_until_soft',
                                  labelKey: 'Hit Until Soft',
                                  currentVal: c['Hit Until Soft'],
                                })}
                                className="w-full text-left hover:bg-gray-50 rounded px-1 py-0.5"
                                title="Edit"
                              >
                                {renderCell(c['Hit Until Soft'])}
                              </button>
                            ) : renderCell(c['Hit Until Soft'])}
                          </td>

                          {/* Double Hards — editable */}
                          <td className="px-2 py-2 border border-gray-100">
                            {editable ? (
                              <button
                                onClick={() => openPerfectEditor({
                                  dealer_val: row.rowLabel,
                                  col: 'double_hards',
                                  labelKey: 'Double Hards',
                                  currentVal: c['Double Hards'],
                                })}
                                className="w-full text-left hover:bg-gray-50 rounded px-1 py-0.5"
                                title="Edit Double Hards"
                              >
                                {renderCell(c['Double Hards'])}
                              </button>
                            ) : renderCell(c['Double Hards'])}
                          </td>

                          {/* Double Softs — editable */}
                          <td className="px-2 py-2 border border-gray-100">
                            {editable ? (
                              <button
                                onClick={() => openPerfectEditor({
                                  dealer_val: row.rowLabel,
                                  col: 'double_softs',
                                  labelKey: 'Double Softs',
                                  currentVal: c['Double Softs'],
                                })}
                                className="w-full text-left hover:bg-gray-50 rounded px-1 py-0.5"
                                title="Edit Double Softs"
                              >
                                {renderCell(c['Double Softs'])}
                              </button>
                            ) : renderCell(c['Double Softs'])}
                          </td>

                          {/* Splits — NOW editable */}
                          <td className="px-2 py-2 border border-gray-100">
                            {editable ? (
                              <button
                                onClick={() => openPerfectEditor({
                                  dealer_val: row.rowLabel,
                                  col: 'splits',
                                  labelKey: 'Splits',
                                  currentVal: c['Splits'],
                                })}
                                className="w-full text-left hover:bg-gray-50 rounded px-1 py-0.5"
                                title="Edit Splits"
                              >
                                {renderCell(c['Splits'])}
                              </button>
                            ) : renderCell(c['Splits'])}
                          </td>

                          {/* Surrender (view only) */}
                          <td className="px-2 py-2 border border-gray-100">{renderCell(c['Surrender'])}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Modal for editing perfect chart cells */}
        {editOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Edit value</h3>

              {/* helper text varies by column */}
              <p className="text-xs text-gray-600 mb-3">
                {editCtxRef.current?.col === 'double_hards' && "Enter 2–11, a range like 9-11, or combine with '/' where each side is a number, a range, or 'None'. Leave empty to clear."}
                {editCtxRef.current?.col === 'double_softs' && "Enter A2–AT (AT = A10). Each side of '/' can be 'None', a single value or range, or up to two values or ranges. Leave empty to clear."}
                {editCtxRef.current?.col === 'splits' && "Enter ascending ranks using A23456789T, ten can be written as T. Use '/' to provide two sides or 'None'."}
                {(editCtxRef.current?.col === 'hit_until_hard' || editCtxRef.current?.col === 'hit_until_soft') && "Enter 12–20 or N/M with each 12–20."}
              </p>

              <input
                autoFocus
                value={editVal}
                onChange={(e)=>{
                  const col = editCtxRef.current?.col
                  const raw = e.target.value
                  const sanitized =
                    col === 'double_hards'
                      ? raw.replace(/[^0-9A-Za-z/ \-]/g,'') // allow letters for 'None'
                      : col === 'double_softs'
                        ? raw.replace(/[^0-9A-Za-z/ ,\-]/g,'')
                        : col === 'splits'
                          ? raw.replace(/[^0-9A-Za-z/]/g,'')
                          : raw.replace(/[^0-9/ ]/g,'')
                  setEditVal(sanitized)
                }}
                onKeyDown={(e)=>{ if(e.key==='Enter') confirmPerfectEdit(); if(e.key==='Escape') setEditOpen(false) }}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder={
                  editCtxRef.current?.col === 'double_hards' ? 'e.g. 9-11/None or 11'
                  : editCtxRef.current?.col === 'double_softs' ? 'e.g. A3-A10/A4-A6 or A2-A10/A4'
                  : editCtxRef.current?.col === 'splits' ? 'e.g. A2346789T or A78/A8 or None'
                  : 'e.g. 16 or 12/18'
                }
              />
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={()=>setEditOpen(false)} className="px-3 py-1.5 text-sm rounded border border-gray-200">Cancel</button>
                <button onClick={confirmPerfectEdit} className="px-3 py-1.5 text-sm rounded bg-black text-white">Save</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


/* --------------------------- Unified Play settings -------------------------- */

function PlaySettings({ onStart, onBack }) {
  const [gameType, setGameType] = useState('blackjack')

  const [bjHoleCard, setBjHoleCard] = useState('perfect')
  const [bjSurrender, setBjSurrender] = useState('Yes')
  const [bjSoft17, setBjSoft17] = useState('Hit')
  const [bjDecks, setBjDecks] = useState('6')
  const [bjDouble, setBjDouble] = useState('any')

  const [spHoleCard, setSpHoleCard] = useState('Spanish_perfect') // Spanish_4to9, Spanish_2to3, Spanish_perfect
  const [spSurrender, setSpSurrender] = useState('Yes')
  const [spSoft17, setSpSoft17] = useState('Hit')
  const [spDouble, setSpDouble] = useState('any')

  const [submitting, setSubmitting] = useState(false)

  const authFetch = async (path, init = {}) => {
    const token = await getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    headers.set('Content-Type', 'application/json')
    return fetch(path, { ...init, headers, credentials: 'include' })
  }

  const clientSettings = useMemo(() => {
    if (gameType === 'blackjack') {
      return {
        game_type: 'blackjack',
        hole_mode:
          bjHoleCard === '4-10' ? '4to10'
          : bjHoleCard === '2-3' ? '2to3'
          : bjHoleCard === 'A-9DAS' ? 'Ato9DAS'
          : bjHoleCard === 'A-9NoDAS' ? 'Ato9NoDAS'
          : 'perfect',
        surrender_allowed: bjSurrender === 'Yes',
        soft17_hit: bjSoft17 === 'Hit',
        decks_count: Number(bjDecks),
        double_first_two: bjDouble,
      }
    }
    return {
      game_type: 'spanish21',
      hole_mode:
        spHoleCard === 'Spanish_4to9' ? '4to9'
        : spHoleCard === 'Spanish_2to3' ? '2to3'
        : 'perfect',
      surrender_allowed: spSurrender === 'Yes',
      soft17_hit: spSoft17 === 'Hit',
      decks_count: 1,
      double_first_two: spDouble,
    }
  }, [gameType, bjHoleCard, bjSurrender, bjSoft17, bjDecks, bjDouble, spHoleCard, spSurrender, spSoft17, spDouble])

  const backendPayload = useMemo(() => {
    if (gameType === 'blackjack') {
      return {
        'Hole Card': bjHoleCard,
        'Surrender': bjSurrender,
        'Dealer_soft_17': bjSoft17,
        'Decks': Number(bjDecks),
        'Double allowed': bjDouble,
      }
    }
    return {
      'Hole Card': spHoleCard,
      'Surrender': spSurrender,
      'Dealer_soft_17': spSoft17,
      'Decks': 6,
      'Double allowed': spDouble,
    }
  }, [gameType, bjHoleCard, bjSurrender, bjSoft17, bjDecks, bjDouble, spHoleCard, spSurrender, spSoft17, spDouble])

  const submitAndStart = async () => {
    setSubmitting(true)
    try {
      const res = await authFetch('/api/settings_update', {
        method: 'POST',
        body: JSON.stringify(backendPayload),
      })
      if (!res.ok) { toast.error(`Settings update failed, HTTP ${res.status}`); return }
      toast.success('Settings saved')
      onStart(clientSettings, gameType)
    } catch (e) {
      console.error(e)
      toast.error('Could not reach server')
    } finally {
      setSubmitting(false)
    }
  }

  const isBJ = gameType === 'blackjack'
  const isSP = gameType === 'spanish21'
  const bjDisableDecks = bjHoleCard === 'A-9DAS' || bjHoleCard === 'A-9NoDAS'

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Settings" onGo={onBack} showBack />
      <main className="px-4 py-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Game</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={gameType}
              onChange={(e)=>setGameType(e.target.value)}
            >
              <option value="blackjack">Blackjack</option>
              <option value="spanish21">Spanish 21</option>
            </select>
          </div>

          {isBJ && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hole card</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={bjHoleCard}
                onChange={(e)=>setBjHoleCard(e.target.value)}
              >
                <option value="perfect">Perfect</option>
                <option value="4-10">4-10</option>
                <option value="2-3">2-3</option>
                <option value="A-9DAS">A-9 DAS</option>
                <option value="A-9NoDAS">A-9 NoDAS</option>
              </select>
            </div>
          )}

          {isSP && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hole card</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={spHoleCard}
                onChange={(e)=>setSpHoleCard(e.target.value)}
              >
                <option value="Spanish_perfect">Spanish perfect</option>
                <option value="Spanish_4to9">Spanish 4 to 9</option>
                <option value="Spanish_2to3">Spanish 2 to 3</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Surrender</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={isBJ ? bjSurrender : spSurrender}
                onChange={(e)=> isBJ ? setBjSurrender(e.target.value) : setSpSurrender(e.target.value)}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Dealer soft 17</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={isBJ ? bjSoft17 : spSoft17}
                onChange={(e)=> isBJ ? setBjSoft17(e.target.value) : setSpSoft17(e.target.value)}
              >
                <option value="Hit">Hit</option>
                <option value="Stand">Stand</option>
              </select>
            </div>
          </div>

          {isBJ && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Decks</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-400"
                value={bjDecks}
                onChange={(e)=>setBjDecks(e.target.value)}
                disabled={bjDisableDecks}
              >
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {bjDisableDecks && <p className="mt-1 text-xs text-gray-500">Decks fixed to 1 for A 9 modes</p>}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Double allowed</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={isBJ ? bjDouble : spDouble}
              onChange={(e)=> isBJ ? setBjDouble(e.target.value) : setSpDouble(e.target.value)}
            >
              <option value="any">any</option>
              <option value="9-11">9-11</option>
              <option value="10-11">10-11</option>
            </select>
          </div>

          <button
            onClick={submitAndStart}
            disabled={submitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? 'Saving…' : 'Start'}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onBack('home')}
            className="w-full border border-gray-200 py-3 rounded-lg bg-white"
          >
            Home
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


/* ------------------------------- Stats page ------------------------------- */

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{label}</div>
        {Icon ? <Icon size={16} className="text-gray-400" /> : null}
      </div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
      {sub ? <div className="mt-1 text-xs text-gray-500">{sub}</div> : null}
    </div>
  )
}

function ProgressBar({ pct }) {
  const clamped = Math.max(0, Math.min(100, Number.isFinite(pct) ? pct : 0))
  return (
    <div className="h-2 w-full overflow-hidden rounded bg-gray-200">
      <div
        className="h-full rounded bg-green-600 transition-[width]"
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label="accuracy"
      />
    </div>
  )
}

function TinyBars({ correct = 0, errors = 0 }) {
  const total = Math.max(1, correct + errors)
  const cw = Math.round((correct / total) * 100)
  const ew = 100 - cw
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-gray-200">
      <div className="h-full bg-green-600" style={{ width: `${cw}%` }} />
      <div className="h-full bg-red-400" style={{ width: `${ew}%` }} />
    </div>
  )
}

function ModeCard({ name, data }) {
  const total = data?.total ?? 0
  const correct = data?.correct ?? 0
  const errors = data?.errors ?? 0
  const accuracy = data?.accuracy ?? (total ? Math.round((correct / total) * 1000) / 10 : 0)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-xs text-gray-500">{total} hands</div>
      </div>
      <div className="mt-2">
        <ProgressBar pct={accuracy} />
        <div className="mt-1 flex justify-between text-xs text-gray-600">
          <span>Accuracy {accuracy}%</span>
          <span>Correct {correct}, Errors {errors}</span>
        </div>
        <TinyBars correct={correct} errors={errors} />
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 animate-pulse">
      <div className="h-3 w-20 rounded bg-gray-200" />
      <div className="mt-2 h-7 w-24 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-32 rounded bg-gray-200" />
    </div>
  )
}

function useStats() {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const authFetch = async (path, init = {}) => {
    const token = await getAccessToken()
    const headers = new Headers(init.headers || {})
    if (token) headers.set('Authorization', `Bearer ${token}`)
    if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
    return fetch(path, { ...init, headers, credentials: 'include' })
  }

  const load = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await authFetch('/api/stats')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { load() }, [load])
  return { data, loading, error, reload: load }
}

function computeOverview(perMode) {
  const modes = perMode || {}
  let total = 0, correct = 0, errors = 0
  Object.values(modes).forEach(m => {
    total += m?.total ?? 0
    correct += m?.correct ?? 0
    errors += m?.errors ?? 0
  })
  const accuracy = total ? Math.round((correct / total) * 1000) / 10 : 0
  return { total, correct, errors, accuracy }
}

function Section({ title, right }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      {right || null}
    </div>
  )
}

function EmptyRecent() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-600">
      No recent mistakes to show.
    </div>
  )
}

function RecentList({ items }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="divide-y divide-gray-200">
        {items.slice(0, 10).map((r, i) => (
          <div key={i} className="px-4 py-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900">
                Hand {r?.player_hand ?? '?'} , Dealer {r?.dealer_card ?? '?'}
              </div>
              <div className="text-gray-500">{r?.ts ? new Date(r.ts).toLocaleString() : ''}</div>
            </div>
            <div className="mt-1 text-gray-700">
              You picked <span className="font-semibold">{r?.chosen ?? '?'}</span> , best was <span className="font-semibold">{r?.best ?? '?'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatsPage({ onBack }) {
  const { data, loading, error, reload } = useStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav title="Stats" onGo={onBack} showBack />
        <main className="mx-auto max-w-6xl px-4 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNav title="Stats" onGo={onBack} showBack />
        <main className="mx-auto max-w-md px-4 py-4">
          <div className="rounded-xl border border-red-200 bg-white p-4 text-center">
            <p className="text-sm text-red-600">Could not load stats, {error}</p>
            <button
              onClick={reload}
              className="mt-3 rounded bg-black px-4 py-2 text-sm text-white"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  const perMode = data?.per_mode || {}
  const overview = computeOverview(perMode)
  const streak = data?.current_streak ?? 0
  const recent = Array.isArray(data?.recent) ? data.recent : []

  const orderedModes = [
    ['perfect', perMode['perfect']],
    ['4-10', perMode['4-10']],
    ['2-3', perMode['2-3']],
    ['A-9DAS', perMode['A-9DAS']],
    ['A-9NoDAS', perMode['A-9NoDAS']],
  ].filter(([, d]) => d)

  const extraModes = Object.entries(perMode)
    .filter(([k]) => !orderedModes.map(([n]) => n).includes(k))

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Stats" onGo={onBack} showBack />
      <main className="mx-auto w-full max-w-6xl px-4 py-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Hands" value={overview.total} />
          <StatCard label="Accuracy" value={`${overview.accuracy}%`} sub={`${overview.correct} correct`} />
          <StatCard label="Errors" value={overview.errors} />
          <StatCard label="Streak" value={streak} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <Section
                title="Overall accuracy"
                right={<span className="text-xs text-gray-500">{overview.accuracy}%</span>}
              />
              <ProgressBar pct={overview.accuracy} />
            </div>

            <div>
              <Section title="By mode" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {orderedModes.map(([name, d]) => (
                  <ModeCard key={name} name={name} data={d} />
                ))}
                {extraModes.map(([k, d]) => (
                  <ModeCard key={k} name={k} data={d} />
                ))}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <Section
              title="Recent mistakes"
              right={
                <button
                  onClick={reload}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                >
                  Refresh
                </button>
              }
            />
            {recent.length > 0 ? <RecentList items={recent} /> : <EmptyRecent />}

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="text-sm font-medium text-gray-900">Tips</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-600">
                <li>Work through weaker modes first.</li>
                <li>Review doubles where errors appear most often.</li>
                <li>Keep short sessions, focus on accuracy, then speed.</li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={reload}
            className="flex-1 rounded-lg border border-gray-200 bg-white py-3 text-sm"
          >
            Refresh
          </button>
          <button
            onClick={() => onBack('home')}
            className="flex-1 rounded-lg bg-black py-3 text-sm text-white"
          >
            Home
          </button>
        </div>
      </main>
    </div>
  )
}


/* ---------------------------- Simple info pages ---------------------------- */

function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="About" onGo={onBack} showBack />
      <main className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Bet404 Games</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional advantage-play training platform for serious players
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Overview
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Bet404 Games is an advantage-play training platform focused on high-fidelity hole-carding practice. 
            The system reproduces decision points from live tables, grades against optimal references, and records 
            performance over time. Training data, charts, and statistics are user-specific and persist across sessions.
          </p>
        </div>

        {/* Training Modules */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-900 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Supported Training Modules
          </h2>
          
          {/* Blackjack Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">Blackjack</h3>
                <p className="text-xs text-gray-500">Hole-carding training</p>
              </div>
              <div className="bg-red-50 px-2 py-1 rounded-lg">
                <span className="text-xs font-medium text-red-700">♠</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-700 font-medium">Training Modes:</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-gray-900">2–3</div>
                  <div className="text-xs text-gray-600">Low cards</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-gray-900">4–10</div>
                  <div className="text-xs text-gray-600">Mid-high cards</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-gray-900">A–9 DAS</div>
                  <div className="text-xs text-gray-600">Double after split</div>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-gray-900">A–9 No DAS</div>
                  <div className="text-xs text-gray-600">No double split</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg px-3 py-2 border border-yellow-200">
                <div className="text-xs font-medium text-yellow-900">Perfect Mode</div>
                <div className="text-xs text-yellow-700">Exact down-card known</div>
              </div>
            </div>
          </div>

          {/* Spanish 21 Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">Spanish 21</h3>
                <p className="text-xs text-gray-500">48-card deck training</p>
              </div>
              <div className="bg-red-100 px-2 py-1 rounded-lg">
                <span className="text-xs font-medium text-red-800">♥</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-700 font-medium">Training Modes:</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-red-900">Spanish 2–3</div>
                  <div className="text-xs text-red-600">Low range</div>
                </div>
                <div className="bg-red-50 rounded-lg px-3 py-2">
                  <div className="text-xs font-medium text-red-900">Spanish 4–9</div>
                  <div className="text-xs text-red-600">Mid range</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg px-3 py-2 border border-red-200">
                <div className="text-xs font-medium text-red-900">Spanish Perfect</div>
                <div className="text-xs text-red-700">True Spanish shoe, Tens removed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Perfect Mode Details */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5">
          <h3 className="text-medium font-medium text-blue-900 mb-3 flex items-center">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
              <span className="text-xs">✓</span>
            </div>
            Perfect Mode Grading
          </h3>
          <p className="text-sm text-blue-800 leading-relaxed mb-3">
            In all perfect modes, dealer totals come from the actual up card and down card, 
            and grading follows this order
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">1. Split</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">2. Surrender</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">3. Double</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">4. Hit or Stand</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 text-sm">📊</span>
            </div>
            <div className="text-xs font-medium text-gray-900">Performance Tracking</div>
            <div className="text-xs text-gray-600 mt-1">Detailed statistics</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-600 text-sm">📱</span>
            </div>
            <div className="text-xs font-medium text-gray-900">Mobile First</div>
            <div className="text-xs text-gray-600 mt-1">Optimized for touch</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-orange-600 text-sm">🎯</span>
            </div>
            <div className="text-xs font-medium text-gray-900">Live Table Accuracy</div>
            <div className="text-xs text-gray-600 mt-1">Real scenarios</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-sm">💾</span>
            </div>
            <div className="text-xs font-medium text-gray-900">Persistent Data</div>
            <div className="text-xs text-gray-600 mt-1">Cross session saves</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-black text-white rounded-xl p-5 text-center">
          <h3 className="font-semibold mb-2">Ready to master advantage play?</h3>
          <p className="text-gray-300 text-sm mb-4">
            Train like a pro with high-fidelity hole card scenarios
          </p>
          <button 
            onClick={() => onBack('settings')}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Start Training
          </button>
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


/* --------------------------- Skeletal Instructions --------------------------- */

function InstructionsPage({ onBack }) {
  const [expandedSection, setExpandedSection] = React.useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Instructions" onGo={onBack} showBack />
      <main className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
              <span className="text-white font-bold text-lg">📚</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">How to Use Bet404</h1>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Master advantage play with professional hole-carding training
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-green-600 text-sm">🚀</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Quick Start</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Choose Game</h3>
              <p className="text-xs text-gray-600">Select Blackjack or Spanish 21 from Settings</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Configure Rules</h3>
              <p className="text-xs text-gray-600">Set hole card mode, surrender, soft 17, decks</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Start Training</h3>
              <p className="text-xs text-gray-600">Press Start to begin your session</p>
            </div>
          </div>
        </section>

        {/* Rules & Settings */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('rules')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 text-sm">⚙️</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Rules & Settings</h2>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'rules' ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSection === 'rules' && (
            <div className="px-6 pb-6 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                Per-hand and per-user options allow training against specific table conditions:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Dealer Soft 17</h3>
                  <p className="text-sm text-blue-800">Toggle H17 / S17 at the hand level</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="font-medium text-red-900 mb-2">Surrender</h3>
                  <p className="text-sm text-red-800">Enable/disable late surrender</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-2">Double Availability</h3>
                  <p className="text-sm text-green-800">Any, 9-10, 10-11, or 9-11 on first two cards</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-900 mb-2">Deck Count</h3>
                  <p className="text-sm text-purple-800">Selectable for Blackjack (Spanish 21 uses fixed 6-deck)</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Chart Editing */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('charts')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-sm">📊</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Chart Editing</h2>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'charts' ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSection === 'charts' && (
            <div className="px-6 pb-6 space-y-6">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                <h3 className="font-medium text-yellow-900 mb-2">⚠️ Important</h3>
                <p className="text-sm text-yellow-800">
                  All charts are user-specific. Defaults are initialized to game-theory-optimal (GTO) for each module; 
                  your edits override those defaults immediately and grading will use your chart.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Non-Perfect Modes (Cell-by-Cell)</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Covered Modes:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Blackjack:</span> 4-10, 2-3, A-9 (DAS), A-9 (NoDAS)
                    </div>
                    <div>
                      <span className="font-medium">Spanish 21:</span> Spanish_4to9, Spanish_2to3
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Atomic Actions</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <div><span className="font-mono bg-blue-200 px-1 rounded">H</span> Hit</div>
                      <div><span className="font-mono bg-blue-200 px-1 rounded">S</span> Stand</div>
                      <div><span className="font-mono bg-blue-200 px-1 rounded">D</span> Double</div>
                      <div><span className="font-mono bg-blue-200 px-1 rounded">P</span> Split</div>
                      <div><span className="font-mono bg-blue-200 px-1 rounded">R</span> Surrender</div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Smart Macros</h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <div><span className="font-mono bg-green-200 px-1 rounded">DS</span> Double, else Stand</div>
                      <div><span className="font-mono bg-green-200 px-1 rounded">DH</span> Double, else Hit</div>
                      <div><span className="font-mono bg-green-200 px-1 rounded">RH</span> Surrender, else Hit</div>
                      <div><span className="font-mono bg-green-200 px-1 rounded">RS</span> Surrender, else Stand</div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-900 mb-2">H17/S17 Split Tokens</h4>
                  <p className="text-sm text-indigo-800 mb-2">Use slash notation for rule-dependent actions:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-indigo-700">
                    <div><span className="font-mono bg-indigo-200 px-1 rounded">RH/H</span> H17: Surrender, S17: Hit</div>
                    <div><span className="font-mono bg-indigo-200 px-1 rounded">S/H</span> H17: Stand, S17: Hit</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Perfect Modes (Row-by-Row)</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    In Perfect modes, you edit one row per dealer total with five columns:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-800 text-sm">hit_until_hard</h4>
                      <p className="text-xs text-gray-600">Format: 12-20 or N/M split. Hit while total &lt; N; Stand at ≥ N</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-800 text-sm">hit_until_soft</h4>
                      <p className="text-xs text-gray-600">Same as above, but for soft totals (A + non-Ace)</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-800 text-sm">double_hards</h4>
                      <p className="text-xs text-gray-600">Single integer (11), range (9-11), or H17/S17 split (10-11/11)</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-800 text-sm">double_softs</h4>
                      <p className="text-xs text-gray-600">AX format (A7, AT), ranges (A3-A8), or NONE. Supports H17/S17 splits</p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                      <h4 className="font-medium text-gray-800 text-sm">splits</h4>
                      <p className="text-xs text-gray-600">Ascending token (A23456789T). Example: A89 splits A-A, 8-8, 9-9</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Statistics & Feedback */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection('stats')}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 text-sm">📈</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Statistics & Feedback</h2>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedSection === 'stats' ? 'rotate-180' : ''}`} />
          </button>
          
          {expandedSection === 'stats' && (
            <div className="px-6 pb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Session Statistics</h3>
                  <p className="text-sm text-blue-800">Live accuracy and error tracking while training</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-900 mb-2">Lifetime Statistics</h3>
                  <p className="text-sm text-purple-800">Cumulative volume and accuracy by mode</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Compact Stats Bar</h3>
                <p className="text-sm text-gray-700">Progress is visible at a glance during training sessions</p>
              </div>
            </div>
          )}
        </section>

        {/* Grading Priority */}
        <section className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-red-600 text-sm">🎯</span>
            </div>
            <h2 className="text-lg font-semibold text-red-900">Grading Priority</h2>
          </div>
          <p className="text-sm text-red-800 mb-4">
            Perfect modes use the actual down-card. All modes follow this priority order:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">1. Split</span>
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">2. Surrender</span>
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">3. Double</span>
            <span className="bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm font-medium">4. Hit/Stand</span>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-gradient-to-br from-gray-800 to-black text-white rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">🚀</span>
            </div>
            <h2 className="text-lg font-semibold">What's Coming Next</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            Additional advantage-play modules—beginning with Ultimate Texas Hold 'Em and Criss Cross—are in active development.
          </p>
        </section>

        {/* Quick Tips */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-yellow-600 text-sm">💡</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Pro Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Use slash forms only when strategy truly differs between H17 and S17</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Keep splits tokens ascending and unique (A6789T, not A9876T)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Set fields to "None" to disable doubles or splits on a dealer row</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">Think in soft-other-card terms for Perfect double_softs (A7 = soft-18)</p>
              </div>
            </div>
          </div>
        </section>
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
            onClick={() => onGo('settings')}
            className="group bg-black text-white p-4 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <Gamepad2 size={24} />
              <div className="text-left">
                <div className="font-medium">Play</div>
                <div className="text-xs text-gray-300">Choose Blackjack or Spanish 21</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => onGo('strategy')}
            className="group border border-gray-200 p-4 rounded-xl bg-white"
          >
            <div className="flex items-center space-x-3">
              <BookOpen size={24} className="text-gray-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Strategy chart</div>
                <div className="text-xs text-gray-500">Browse charts</div>
              </div>
            </div>
          </button>

          {/* New Instructions button, placed between Strategy and More */}
          <button
            onClick={() => onGo('instructions')}
            className="group border border-gray-200 p-4 rounded-xl bg-white"
          >
            <div className="flex items-center space-x-3">
              <Info size={24} className="text-gray-500" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Instructions</div>
                <div className="text-xs text-gray-500">How to use the trainer</div>
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

  const startGame = (settings, gameType) => {
    setPendingSettings(settings)
    setActiveGame({ mode: 'custom', settings, game: gameType })
    setRoute('play')
  }

  if (route === 'strategy') return <StrategyChartPage onBack={go} />
  if (route === 'instructions') return <InstructionsPage onBack={go} />
  if (route === 'settings') return <PlaySettings onStart={startGame} onBack={go} />
  if (route === 'stats') return <StatsPage onBack={go} />
  if (route === 'about') return <AboutPage onBack={go} />
  if (route === 'settings-app') return <SettingsPage onBack={go} />
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
          `}</style>
        )}

        <div className={isSpanish21 ? 's21-scope' : 'bg-green-700'}>
          <GameTable
            mode={activeGame.mode}
            settings={pendingSettings}
            onSettingsChange={(next) => setPendingSettings(next)}
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
