import React, { useState, useEffect } from 'react'
import { 
  Heart, Diamond, Club, Spade, 
  Eye, EyeOff, TrendingUp, AlertCircle, 
  RotateCcw, PlayCircle, XCircle, CheckCircle,
  Zap, Shield, Split, DollarSign, Settings
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
        bg-gradient-to-br from-blue-600 to-blue-800 
        rounded-lg shadow-xl 
        flex items-center justify-center 
        transform transition-all duration-300 
        hover:shadow-2xl hover:-translate-y-1
        relative overflow-hidden
      `}>
        <div className="absolute inset-0 bg-white opacity-10 
          bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,.05)_10px,rgba(255,255,255,.05)_20px)]">
        </div>
        <div className="text-white font-bold text-lg">?</div>
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

const HoleCardDisplay = ({ card, mode, revealed }) => {
  const getBucketDisplay = (card) => {
    if (!card) return '?'
    if (card.hole_bucket) return card.hole_bucket
    const v = card.value === 'A' ? 11 :
              ['K','Q','J'].includes(card.value) ? 10 :
              parseInt(card.value)
    if (mode === 'bucket4to10') {
      if (v >= 4 && v <= 6) return '4-6'
      if (v >= 7 && v <= 9) return '7-9'
      if (v === 10) return '10'
      return String(v)
    } else if (mode === 'bucket2to3') {
      if (v >= 2 && v <= 3) return '2-3'
      if (v >= 4 && v <= 6) return '4-6'
      if (v >= 7 && v <= 9) return '7-9'
      return String(v)
    }
    return `${card.value}${card.suit?.[0]?.toUpperCase() || ''}`
  }

  return (
    <div className="relative">
      {mode === 'perfect' || revealed ? (
        <Card {...card} mini highlight />
      ) : (
        <div className="w-12 h-16 bg-gradient-to-br from-purple-600 to-purple-800 
          rounded-lg shadow-xl flex items-center justify-center
          border-2 border-purple-400 transform transition-all duration-300">
          <div className="text-white font-bold text-xs">
            {getBucketDisplay(card)}
          </div>
        </div>
      )}
      {!revealed && mode !== 'perfect' && (
        <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1">
          <Eye className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  )
}

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
  const [canDouble, setCanDouble] = useState(false)
  const [canSplit, setCanSplit] = useState(false)
  const [stats, setStats] = useState({ handsPlayed: 0, correctMoves: 0, accuracy: 0, streak: 0 })
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  const calculateHandValue = (hand) => {
    let value = 0
    let aces = 0
    for (const card of hand) {
      if (card.value === 'A') { aces++; value += 11 }
      else if (['K','Q','J'].includes(card.value)) value += 10
      else value += parseInt(card.value)
    }
    while (value > 21 && aces > 0) { value -= 10; aces-- }
    return value
  }

  // Fetch a brand new hand and shoe from the API
 const fetchNewHand = async () => {
  console.log('fetchNewHand start');
  try {
    const res = await fetch('/api/deal_newhand', { method: 'GET' });
    console.log('deal_newhand status:', res.status);

    if (!res.ok) {
      // read once on error only
      const errText = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}. ${errText}`);
    }

    // read once on success
    const data = await res.json();
    console.log('deal_newhand data:', data);

    const mapCard = c => ({ value: c.value || c.rank, suit: c.suit });
    const pHand = (data.player_cards || []).map(mapCard);
    const dCards = (data.dealer_cards || []).map(mapCard);
    const remainingShoe = (data.shoe || []).map(mapCard);

    setPlayerHand(pHand);
    setDealerHand([dCards[0]]);
    setDealerHoleCard(dCards[1]);
    setDeck(remainingShoe);
    setShowHoleCard(false);
    setGameState('playing');
    setMessage('Make your move');

    const pValue = calculateHandValue(pHand);
    setCanDouble(pValue >= 9 && pValue <= 11);
    setCanSplit(pHand[0].value === pHand[1].value);
  } catch (e) {
    console.log('fetchNewHand error:', e);
    setMessage(`Dealing service error, using local shoe. ${e.message || e}`);
    // keep your local fallback here
  }
};


  const dealCards = () => { 
      console.log('Deal button clicked'); 
fetchNewHand(); }

  const hit = () => {
    if (deck.length === 0) return
    const newDeck = [...deck]
    const newCard = newDeck.pop()
    const newHand = [...playerHand, newCard]
    setPlayerHand(newHand)
    setDeck(newDeck)
    setCanDouble(false)
    setCanSplit(false)
    const value = calculateHandValue(newHand)
    if (value > 21) { setMessage('Bust! You lose.'); endHand(false) }
    else if (value === 21) { stand() }
    checkCorrectMove('hit')
  }

  const stand = () => {
    setShowHoleCard(true)
    dealerPlay()
    checkCorrectMove('stand')
  }

  const double = () => {
    if (!canDouble || deck.length === 0) return
    const newDeck = [...deck]
    const newCard = newDeck.pop()
    const newHand = [...playerHand, newCard]
    setPlayerHand(newHand)
    setDeck(newDeck)
    const value = calculateHandValue(newHand)
    if (value > 21) { setMessage('Bust! You lose.'); endHand(false) } else { stand() }
    checkCorrectMove('double')
  }

  const split = () => {
    if (!canSplit) return
    // Your split logic can also draw from deck state
    checkCorrectMove('split')
  }

  const surrender = () => {
    setMessage('Surrendered. Half bet returned.')
    endHand(false)
    checkCorrectMove('surrender')
  }

  const dealerPlay = () => {
    let dHand = [...dealerHand, dealerHoleCard]
    let dValue = calculateHandValue(dHand)
    let newDeck = [...deck]
    while (dValue < 17 && newDeck.length > 0) {
      dHand.push(newDeck.pop())
      dValue = calculateHandValue(dHand)
    }
    setDealerHand(dHand)
    setDeck(newDeck)
    const pValue = calculateHandValue(playerHand)
    if (dValue > 21) { setMessage('Dealer busts! You win!'); endHand(true) }
    else if (dValue > pValue) { setMessage('Dealer wins.'); endHand(false) }
    else if (pValue > dValue) { setMessage('You win!'); endHand(true) }
    else { setMessage('Push!'); endHand(null) }
  }

  const checkCorrectMove = (action) => {
    const playerVal = calculateHandValue(playerHand)
    let correct = false
    if (playerVal >= 17) correct = action === 'stand'
    else if (playerVal <= 11) correct = action === 'hit' || (playerVal === 11 && action === 'double')
    else correct = true
    setIsCorrect(correct)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
    setStats(prev => ({
      ...prev,
      handsPlayed: prev.handsPlayed + 1,
      correctMoves: prev.correctMoves + (correct ? 1 : 0),
      accuracy: Math.round(((prev.correctMoves + (correct ? 1 : 0)) / (prev.handsPlayed + 1)) * 100),
      streak: correct ? prev.streak + 1 : 0
    }))
  }

  const endHand = () => {
    setGameState('finished')
    setShowHoleCard(true)
  }

  const newGame = () => {
    setPlayerHand([])
    setDealerHand([])
    setDealerHoleCard(null)
    setShowHoleCard(false)
    setGameState('betting')
    setMessage('Place your bet to start')
    setIsCorrect(null)
    setShowFeedback(false)
  }

  useEffect(() => {
    setPlayerValue(calculateHandValue(playerHand))
    setDealerValue(calculateHandValue(showHoleCard ? [...dealerHand, dealerHoleCard].filter(Boolean) : dealerHand))
  }, [playerHand, dealerHand, dealerHoleCard, showHoleCard])

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
                {dealerHoleCard && !showHoleCard && (<Card hidden />)}
                {dealerHoleCard && showHoleCard && (<Card {...dealerHoleCard} highlight />)}
              </div>
              {dealerHoleCard && mode !== 'normal' && !showHoleCard && (
                <div className="flex justify-center mt-4">
                  <HoleCardDisplay card={dealerHoleCard} mode={mode} revealed={showHoleCard} />
                </div>
              )}
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
                      <span className="text-green-400 font-semibold">Correct!</span>
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
                  <ActionButton onClick={hit} variant="primary">Hit</ActionButton>
                  <ActionButton onClick={stand} variant="secondary">Stand</ActionButton>
                  <ActionButton onClick={double} disabled={!canDouble} variant="warning" icon={DollarSign}>Double</ActionButton>
                  <ActionButton onClick={split} disabled={!canSplit} variant="warning" icon={Split}>Split</ActionButton>
                  <ActionButton onClick={surrender} variant="danger">Surrender</ActionButton>
                </div>
              )}
              {gameState === 'finished' && (
                <ActionButton onClick={newGame} variant="primary" icon={RotateCcw}>
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
