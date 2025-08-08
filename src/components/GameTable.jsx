import React, { useState, useEffect } from 'react'
import { 
  Heart, Diamond, Club, Spade, 
  Eye, TrendingUp, AlertCircle, 
  RotateCcw, PlayCircle, XCircle, CheckCircle,
  Zap, Split, DollarSign, Settings
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

const gradeEndpoint = '/api/grade_decision';

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

export default function GameTable({ mode = 'perfect', onBack }) {
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
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  // training states
  const [initialDeal, setInitialDeal] = useState(null)
  const [handId, setHandId] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // normalize to keep ranks consistent and make tens a single letter if needed
  const normalizeRank = (v) => {
    if (!v) return v
    const s = String(v).toUpperCase()
    return s === '10' ? 'T' : s
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

  // map frontend action to backend action names if required
  const toBackendAction = (a) => (
    a === 'double' ? 'double_down' :
    a === 'split'  ? 'split_pairs' :
    a
  )

  // Fetch a brand new hand
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

    } catch (e) {
      console.log('fetchNewHand error:', e);
      setMessage(`Dealing service error, using local shoe. ${e.message || e}`);
    }
  };

  const dealCards = () => { 
    console.log('Deal button clicked'); 
    fetchNewHand();
  }

  // Training flow: send action to backend, show grade, then new hand
  const sendDecisionForGrading = async (action) => {
    if (!initialDeal) return;
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        hand_id: handId,
        action: toBackendAction(action),
        initial_cards: {
          player_cards: initialDeal.player_cards,
          dealer_upcard: initialDeal.dealer_upcard,
          dealer_hole_card: initialDeal.dealer_hole_card
        },
        settings: initialDeal.settings,
        mode
      };

      const res = await fetch(gradeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      const correct = Boolean(result.correct);
      setIsCorrect(correct);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1200);

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

    } catch (e) {
      console.error('grading error', e);
      setMessage('Could not grade that action. Try again');
    } finally {
      setSubmitting(false);
      await fetchNewHand();
    }
  };

  // Buttons always enabled during play, only blocked while submitting
  const onHit = () => sendDecisionForGrading('hit');
  const onStand = () => sendDecisionForGrading('stand');
  const onDouble = () => sendDecisionForGrading('double');
  const onSplit = () => sendDecisionForGrading('split');
  const onSurrender = () => sendDecisionForGrading('surrender');

  // Values for UI only
  useEffect(() => {
    setPlayerValue(calculateHandValue(playerHand))
    setDealerValue(calculateHandValue(showHoleCard ? [...dealerHand, dealerHoleCard].filter(Boolean) : dealerHand))
  }, [playerHand, dealerHand, dealerHoleCard, showHoleCard])

  // Optional relaxed split logic if you want to display a tip or icon somewhere
  const canShowSplitTip = playerHand[0] && playerHand[1] && (
    playerHand[0].value === playerHand[1].value ||
    (isTenValue(playerHand[0].value) && isTenValue(playerHand[1].value))
  );

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
              <span className="font-semibold capitalize">{mode.replace(/([A-Z])/g, ' $1')}</span>
            </div>
            <button className="text-white/60 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
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

            <div className="text-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-black/30 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-white font-semibold text-lg">{message}</span>
              </div>
              {showFeedback && (
                <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full ${isCorrect ? 'bg-green-500/30 border border-green-500' : 'bg-red-500/30 border border-red-500'}`}>
                  {isCorrect ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      <span className="text-green-400 font-semibold">Correct</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400 mr-2" />
                      <span className="text-red-400 font-semibold">Incorrect</span>
                    </>
                  )}
                </div>
              )}
            </div>

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
                  <ActionButton onClick={onHit} disabled={submitting} variant="primary">Hit</ActionButton>
                  <ActionButton onClick={onStand} disabled={submitting} variant="secondary">Stand</ActionButton>
                  <ActionButton onClick={onDouble} disabled={submitting} variant="warning" icon={DollarSign}>Double</ActionButton>
                  <ActionButton onClick={onSplit} disabled={submitting} variant="warning" icon={Split}>Split</ActionButton>
                  <ActionButton onClick={onSurrender} disabled={submitting} variant="danger">Surrender</ActionButton>
                </div>
              )}
              {gameState === 'finished' && (
                <ActionButton onClick={dealCards} variant="primary" icon={RotateCcw}>
                  New Hand
                </ActionButton>
              )}
            </div>
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
