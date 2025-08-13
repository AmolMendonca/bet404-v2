import React, { useState, useEffect, useRef } from 'react'
import { 
  Heart, Diamond, Club, Spade, 
  Eye, TrendingUp, AlertCircle, 
  RotateCcw, PlayCircle, XCircle, CheckCircle,
  Zap, Split, DollarSign, Settings, SkipForward
} from 'lucide-react'

console.log('GameTable loaded');

if (!window.__fetchLoggerInstalled) {
  const origFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      console.log('[fetch] request', args[0]);
      const res = await origFetch(...args);
      const clone = res.clone();
      let text = '';
      try { text = await clone.text(); } catch {}
      console.log('[fetch] response', res.status, text.slice(0, 300));
      return res;
    } catch (err) {
      console.log('[fetch] network error', err);
      throw err;
    }
  };
  window.__fetchLoggerInstalled = true;
}

const gradeEndpoint = '/api/grade';

const Card = ({ value, suit, hidden = false, highlight = false, mini = false }) => {
  const getSuitIcon = () => {
    switch(suit) {
      case 'hearts': return <Heart className={`${mini ? 'w-3 h-3' : 'w-5 h-5'} fill-red-500 text-red-500`} />
      case 'diamonds': return <Diamond className={`${mini ? 'w-3 h-3' : 'w-5 h-5'} fill-red-500 text-red-500`} />
      case 'clubs': return <Club className={`${mini ? 'w-3 h-3' : 'w-5 h-5'} fill-gray-900 text-gray-900`} />
      case 'spades': return <Spade className={`${mini ? 'w-3 h-3' : 'w-5 h-5'} fill-gray-900 text-gray-900`} />
      default: return null
    }
  }
  const getColor = () => ['hearts', 'diamonds'].includes(suit) ? 'text-red-500' : 'text-gray-900'

  if (hidden) {
    return (
      <div className={`
        ${mini ? 'w-12 h-16' : 'w-20 h-28'} 
        bg-white rounded-lg shadow-xl 
        border-2 border-purple-400
        flex flex-col items-center justify-between 
        p-2 transform transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-1
        relative overflow-hidden
        ring-4 ring-purple-200
      `}>
        <div className={`${getColor()} font-bold ${mini ? 'text-xs' : 'text-lg'}`}>{value}</div>
        {getSuitIcon()}
        <div className={`${getColor()} font-bold ${mini ? 'text-xs' : 'text-lg'}`}>{value}</div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-lg"></div>
        <div className="absolute top-1 right-1 bg-purple-500 rounded-full p-1">
          <Eye className="w-3 h-3 text-white" />
        </div>
        <div className="absolute bottom-1 left-1 bg-purple-500 text-white text-[7px] font-bold px-1 rounded">
          HOLE
        </div>
      </div>
    )
  }

  return (
    <div className={`
      ${mini ? 'w-12 h-16' : 'w-20 h-28'} 
      bg-white rounded-lg shadow-xl 
      border-2 ${highlight ? 'border-yellow-400 ring-4 ring-yellow-200' : 'border-gray-200'}
      flex flex-col items-center justify-between 
      p-2 transform transition-all duration-300 
      hover:shadow-2xl hover:-translate-y-1
      ${highlight ? 'animate-pulse' : ''}
    `}>
      <div className={`${getColor()} font-bold ${mini ? 'text-xs' : 'text-lg'}`}>{value}</div>
      {getSuitIcon()}
      <div className={`${getColor()} font-bold ${mini ? 'text-xs' : 'text-lg'}`}>{value}</div>
    </div>
  )
}

const HandValue = ({ value, isBust, isBlackjack }) => {
  return (
    <div className={`
      inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
      transition-all duration-300 transform
      ${isBlackjack ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white scale-110' : 
        isBust ? 'bg-red-500 text-white animate-shake' : 
        'bg-gray-900 text-white'}
    `}>
      {isBlackjack && <Zap className="w-4 h-4 mr-1" />}
      {isBust ? 'BUST' : value}
      {isBlackjack && ' BLACKJACK!'}
    </div>
  )
}

const ActionButton = ({ onClick, disabled, variant, children, icon: Icon }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        px-6 py-3 rounded-lg font-semibold 
        transform transition-all duration-200 
        hover:scale-105 active:scale-95 
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        flex items-center space-x-2
      `}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  )
}

const StatsPanel = ({ stats, mode }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <h3 className="text-white font-semibold mb-3 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        Session Stats
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-white/60">Hands</div>
          <div className="text-white font-bold text-lg">{stats.handsPlayed}</div>
        </div>
        <div>
          <div className="text-white/60">Accuracy</div>
          <div className="text-green-400 font-bold text-lg">{stats.accuracy}%</div>
        </div>
        <div>
          <div className="text-white/60">Streak</div>
          <div className="text-yellow-400 font-bold text-lg">{stats.streak}</div>
        </div>
        <div>
          <div className="text-white/60">Mode</div>
          <div className="text-white font-bold text-lg capitalize">{mode.replace(/([A-Z])/g, ' $1')}</div>
        </div>
      </div>
    </div>
  )
}

const HoleCardDisplay = ({ card, mode, revealed }) => null

const labelForLetter = (l) => {
  switch (l) {
    case 'H': return 'Hit'
    case 'S': return 'Stand'
    case 'D': return 'Double'
    case 'P': return 'Split'
    case 'R': return 'Surrender'
    default: return l || ''
  }
}

export default function GameTable({ mode = 'perfect', onBack, userId = 'test_user1'}) {
  const [gameState, setGameState] = useState('betting')
  const [deck, setDeck] = useState([])
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [dealerHoleCard, setDealerHoleCard] = useState(null)
  const [showHoleCard, setShowHoleCard] = useState(false)
  const [playerValue, setPlayerValue] = useState(0)
  const [dealerValue, setDealerValue] = useState(0)
  const [message, setMessage] = useState('Place your bet to start')
  const [stats, setStats] = useState({ handsPlayed: 0, correctMoves: 0, accuracy: 0, streak: 0 })
  const [isCorrect, setIsCorrect] = useState(null)
  const [lastGrade, setLastGrade] = useState(null)

  const [countdown, setCountdown] = useState(0)
  const [countdownActive, setCountdownActive] = useState(false)
  const [progressPct, setProgressPct] = useState(0)
  const timerRef = useRef(null)

  const [initialDeal, setInitialDeal] = useState(null)
  const [handId, setHandId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const normalizeRank = (v) => {
    if (!v) return v
    const s = String(v).toUpperCase()
    return s === '10' ? 'T' : s
  }

  const rankForBackend = (v) => {
    if (v === '10') return 'T'
    return v
  }

  const canonicalHoleMode = (m) => {
    const s = String(m || '').trim()
    if (/4\s*[-_ ]?\s*10/i.test(s)) return '4-10'
    if (/2\s*[-_ ]?\s*3/i.test(s)) return '2-3'
    return s
  }

  const supportedHoleModes = ['4-10', '2-3']
  const resolveHoleMode = (m) => {
    const s = canonicalHoleMode(m)
    return supportedHoleModes.includes(s) ? s : '4-10'
  }

  const isTenValue = (v) => ['T','J','Q','K'].includes(v)

  const mapCard = (c) => ({ value: normalizeRank(c.value || c.rank), suit: c.suit })

  const calculateHandValue = (hand) => {
    let value = 0
    let aces = 0
    for (const card of hand) {
      if (card.value === 'A') { aces++; value += 11 }
      else if (['T','K','Q','J'].includes(card.value)) value += 10
      else value += parseInt(card.value, 10)
    }
    while (value > 21 && aces > 0) { value -= 10; aces-- }
    return value
  }

  // helper for soft or hard total
  const getHandInfo = (hand) => {
    let total = 0
    let aces = 0
    for (const c of hand) {
      if (c.value === 'A') { aces++; total += 11 }
      else if (['T','J','Q','K'].includes(c.value)) total += 10
      else total += parseInt(c.value, 10)
    }
    let softAces = aces
    while (total > 21 && softAces > 0) { total -= 10; softAces-- }
    const soft = softAces > 0
    return { total, soft }
  }

  const toBackendLetter = (a) => (
    a === 'double' ? 'D' :
    a === 'split'  ? 'P' :
    a === 'hit'    ? 'H' :
    a === 'stand'  ? 'S' :
    a === 'surrender' ? 'R' :
    a
  )

  const startNextHandCountdown = (secs = 5) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setCountdown(secs)
    setProgressPct(0)
    setCountdownActive(true)
    const start = Date.now()
    const total = secs * 1000

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const remainingMs = Math.max(0, total - elapsed)
      const remaining = Math.ceil(remainingMs / 1000)
      setCountdown(remaining)
      setProgressPct(Math.min(100, Math.round((elapsed / total) * 100)))
      if (remainingMs <= 0) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setCountdownActive(false)
        fetchNewHand()
      }
    }, 100)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const fetchNewHand = async () => {
    console.log('fetchNewHand start');
    try {
      const res = await fetch('/api/deal_newhand', { method: 'GET' });
      console.log('deal_newhand status:', res.status);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}. ${errText}`);
      }

      const data = await res.json();
      console.log('deal_newhand data:', data);

      const pHand = (data.player_cards || []).map(mapCard);
      const dCards = (data.dealer_cards || []).map(mapCard);
      const remainingShoe = (data.shoe || []).map(mapCard);

      const snapshot = {
        player_cards: pHand,
        dealer_upcard: dCards?.[0] || null,
        dealer_hole_card: dCards?.[1] || null,
        settings: data.settings || null
      };
      setInitialDeal(snapshot);
      setHandId(data.hand_id || null);

      setPlayerHand(pHand);
      setDealerHand([dCards[0]].filter(Boolean));
      setDealerHoleCard(dCards[1] || null);
      setDeck(remainingShoe);
      setShowHoleCard(false);
      setGameState('playing');
      setMessage('Make your move');
      setLastGrade(null)
      setIsCorrect(null)
      setCountdown(0)
      setCountdownActive(false)
      setProgressPct(0)
    } catch (e) {
      console.log('fetchNewHand error:', e);
      setMessage(`Dealing service error, using local shoe. ${e.message || e}`);
    }
  };

  const dealCards = () => { 
    console.log('Deal button clicked'); 
    fetchNewHand();
  }

  const sendDecisionForGrading = async (action) => {
    if (!initialDeal) return;
    if (submitting || countdownActive) return;
    setSubmitting(true);
    try {
      const resolvedMode = resolveHoleMode(mode)
      const payload = {
        user_id: userId,
        hole_mode: resolvedMode,
        player_cards: (initialDeal.player_cards || []).map(c => ({
          rank: rankForBackend(c.value),
          suit: c.suit
        })),
        dealer_up: initialDeal.dealer_upcard ? {
          rank: rankForBackend(initialDeal.dealer_upcard.value),
          suit: initialDeal.dealer_upcard.suit
        } : null,
        action: toBackendLetter(action)
      };

      console.log('[grade] using hole_mode', { incomingMode: mode, resolvedMode });
      console.log('[grade] player ranks', (initialDeal.player_cards || []).map(c => c.value))
      console.log('[grade] dealer up rank', initialDeal.dealer_upcard?.value)
      console.log('[grade] payload', payload);

      const res = await fetch(gradeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.error('[grade] HTTP error', res.status, errText);
        throw new Error(`HTTP ${res.status} ${errText || ''}`.trim());
      }

      const result = await res.json();
      console.log('[grade] result', result);

      const correct = Boolean(result.is_correct);
      setIsCorrect(correct);
      setLastGrade({
        attempted: result.attempted,
        correct_move: result.correct_move,
        mode: result.mode
      });

      setStats(prev => {
        const hands = prev.handsPlayed + 1;
        const correctMoves = prev.correctMoves + (correct ? 1 : 0);
        return {
          handsPlayed: hands,
          correctMoves,
          accuracy: Math.round((correctMoves / hands) * 100),
          streak: correct ? prev.streak + 1 : 0
        };
      });

      startNextHandCountdown(5)

    } catch (e) {
      console.error('grading error', e);
      setMessage('Could not grade that action. Check console for details');
    } finally {
      setSubmitting(false);
    }
  };

  const onHit = () => sendDecisionForGrading('hit');
  const onStand = () => sendDecisionForGrading('stand');
  const onDouble = () => sendDecisionForGrading('double');
  const onSplit = () => sendDecisionForGrading('split');
  const onSurrender = () => sendDecisionForGrading('surrender');

  useEffect(() => {
    setPlayerValue(calculateHandValue(playerHand))
    setDealerValue(calculateHandValue(showHoleCard ? [...dealerHand, dealerHoleCard].filter(Boolean) : dealerHand))
  }, [playerHand, dealerHand, dealerHoleCard, showHoleCard])

  const canShowSplitTip = playerHand[0] && playerHand[1] && (
    playerHand[0].value === playerHand[1].value ||
    (isTenValue(playerHand[0].value) && isTenValue(playerHand[1].value))
  );

  const resolved = resolveHoleMode(mode)
  const unsupportedMode = !supportedHoleModes.includes(String(canonicalHoleMode(mode)));

  const decisionColor = isCorrect === null ? 'border-white/20' : isCorrect ? 'border-green-500' : 'border-red-500'
  const decisionBg = isCorrect === null ? 'bg-white/5' : isCorrect ? 'bg-green-500/15' : 'bg-red-500/15'
  const decisionText = isCorrect === null ? 'text-white' : isCorrect ? 'text-green-300' : 'text-red-300'

  // derive if double is allowed
  const { total: pTotal, soft: pSoft } = getHandInfo(playerHand)
  const canDoubleHard1011 = playerHand.length === 2 && !pSoft && (pTotal === 10 || pTotal === 11)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[repeating-conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.1)_20deg,transparent_40deg)]"></div>
      </div>

      <header className="relative z-10 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="text-white hover:text-gray-300 transition-colors flex items-center space-x-2">
            <RotateCcw className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center space-x-6">
            <div className="text-white">
              <span className="text-sm text-white/60">Mode: </span>
              <span className="font-semibold capitalize">{String(mode).replace(/([A-Z])/g, ' $1')}</span>
            </div>
            <button className="text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {unsupportedMode && (
          <div className="mb-4 rounded-lg border border-yellow-400/40 bg-yellow-500/10 text-yellow-300 px-4 py-3">
            Mode not supported, grading will use {resolved}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="text-center mb-4">
                <h2 className="text-white/60 text-sm font-semibold mb-2">DEALER</h2>
                {dealerHand.length > 0 && (
                  <HandValue value={dealerValue} isBust={dealerValue > 21} isBlackjack={dealerValue === 21 && dealerHand.length === 2} />
                )}
              </div>
              <div className="flex justify-center space-x-3">
                {dealerHand.map((card, idx) => (<Card key={idx} {...card} />))}
                {dealerHoleCard && !showHoleCard && (<Card {...dealerHoleCard} hidden />)}
                {dealerHoleCard && showHoleCard && (<Card {...dealerHoleCard} highlight />)}
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center px-6 py-3 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white font-semibold text-lg">{message}</span>
              </div>
            </div>

            {lastGrade && (
              <div className={`mb-8 mx-auto max-w-xl rounded-xl border ${decisionColor} ${decisionBg} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400 mr-2" />
                    )}
                    <div className={`font-semibold ${decisionText}`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </div>
                  </div>
                  <div className="text-xs text-white/60">
                    Mode {lastGrade.mode}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-white/60 text-xs">Your move</div>
                    <div className="text-white font-semibold">{labelForLetter(lastGrade.attempted)} ({lastGrade.attempted})</div>
                  </div>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3">
                    <div className="text-white/60 text-xs">Correct move</div>
                    <div className="text-white font-semibold">{labelForLetter(lastGrade.correct_move)} ({lastGrade.correct_move})</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-white/80">
                    {countdownActive ? `Next hand in ${countdown}s` : 'Ready'}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
                        setCountdownActive(false)
                        fetchNewHand()
                      }}
                      className="px-3 py-1 rounded-md text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center"
                    >
                      <SkipForward className="w-4 h-4 mr-1" />
                      Skip
                    </button>
                  </div>
                </div>

                <div className="mt-2 h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100"
                    style={{ width: `${countdownActive ? progressPct : 0}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex justify-center space-x-3 mb-4">
                {playerHand.map((card, idx) => (<Card key={idx} {...card} />))}
              </div>
              <div className="text-center">
                <h2 className="text-white/60 text-sm font-semibold mb-2">PLAYER</h2>
                {playerHand.length > 0 && (
                  <HandValue value={playerValue} isBust={playerValue > 21} isBlackjack={playerValue === 21 && playerHand.length === 2} />
                )}
                {canShowSplitTip && (
                  <div className="mt-2 text-xs text-white/70">
                    Split candidate
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              {gameState === 'betting' && (
                <ActionButton onClick={dealCards} variant="primary" icon={PlayCircle}>
                  Deal Cards
                </ActionButton>
              )}
              {gameState === 'playing' && (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <ActionButton onClick={onHit} disabled={submitting || countdownActive} variant="primary">Hit</ActionButton>
                  <ActionButton onClick={onStand} disabled={submitting || countdownActive} variant="secondary">Stand</ActionButton>
                  <ActionButton
                    onClick={onDouble}
                    disabled={submitting || countdownActive || !canDoubleHard1011}
                    variant="warning"
                    icon={DollarSign}
                  >
                    Double
                  </ActionButton>
                  <ActionButton onClick={onSplit} disabled={submitting || countdownActive} variant="warning" icon={Split}>Split</ActionButton>
                  <ActionButton onClick={onSurrender} disabled={submitting || countdownActive} variant="danger">Surrender</ActionButton>
                </div>
              )}
              {gameState === 'finished' && (
                <ActionButton onClick={dealCards} variant="primary" icon={RotateCcw}>
                  New Hand
                </ActionButton>
              )}
            </div>

            {gameState === 'playing' && !canDoubleHard1011 && playerHand.length >= 2 && (
              <div className="mt-3 text-center text-xs text-white/60">
                Double is available only on a hard 10 or 11 on the first two cards
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <StatsPanel stats={stats} mode={mode} />
            <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Strategy Tip
              </h3>
              <p className="text-white/80 text-sm">
                {playerValue < 12 ? "You can't bust, consider hitting" :
                 playerValue >= 17 ? "Strong hand, consider standing" :
                 "Consider the dealer's up card"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  )
}
