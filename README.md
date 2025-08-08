# 🃏 BET404 - Holecarding Blackjack Training App

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/yourusername/bet404)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-000000.svg?logo=flask)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **A professional-grade single-hand blackjack training tool focused exclusively on holecarding techniques**

BET404 eliminates full gameplay loops and bankroll management, targeting rapid drill and grading of each decision. Train like a pro with immediate feedback and comprehensive statistics tracking.

---

## 🎯 **Key Features**

### 🚀 **One-Hand Drill System**
- Every iteration deals exactly **one hand** and auto-reshuffles 6+ decks
- No bankroll management or multi-hand complexity
- Pure focus on decision-making accuracy

### ⚡ **Immediate Grading**
- Each decision (Hit, Stand, Double, Split, Surrender) scored **instantly**
- Real-time feedback with ✅ or ❌ indicators
- Lifetime and session statistics tracking

### 🎛️ **Mode Flexibility**
- Toggle holecard visibility mid-session
- Switch between Perfect, 4-10 Bucket, and 2-3 Bucket modes
- Adjust rule variants on-the-fly

---

## 🏗️ **Architecture Overview**

```mermaid
graph TB
    subgraph "Frontend (React)"
        UI[User Interface]
        GT[Game Table Component]
        AUTH[Authentication]
        STATS[Statistics Panel]
    end
    
    subgraph "Backend (Flask)"
        API[API Routes]
        DEAL[Deal Newhand Endpoint]
        CHARTS[Chart Validation]
        DB[(Database)]
    end
    
    subgraph "Training Modes"
        PERFECT[Perfect Mode<br/>Full Visibility]
        BUCKET4[4-10 Bucket<br/>Grouped Cards]
        BUCKET2[2-3 Bucket<br/>Low Cards]
    end
    
    UI --> AUTH
    UI --> GT
    GT --> DEAL
    GT --> STATS
    DEAL --> API
    API --> DB
    CHARTS --> DB
    
    GT -.-> PERFECT
    GT -.-> BUCKET4
    GT -.-> BUCKET2
    
    style UI fill:#e1f5fe
    style GT fill:#f3e5f5
    style DEAL fill:#e8f5e8
    style DB fill:#fff3e0
```

## 🎮 **Training Flow**

```mermaid
sequenceDiagram
    participant U as User
    participant UI as React UI
    participant API as Flask API
    participant DB as Database
    
    U->>UI: Start Training Session
    UI->>API: GET /deal_newhand
    API->>API: Shuffle 6+ deck shoe
    API->>API: Deal player cards (2)
    API->>API: Deal dealer cards (up + hole)
    API-->>UI: Return hand data
    
    UI->>UI: Display cards based on mode
    Note over UI: Perfect: Show all<br/>4-10: Show bucket<br/>2-3: Show bucket
    
    U->>UI: Make decision (H/S/D/P/RS)
    UI->>API: Validate against chart
    API->>DB: Check correct move
    API-->>UI: Return feedback
    
    UI->>UI: Show ✅/❌ + update stats
    UI->>API: Request next hand
    
    loop Training Session
        Note over U,DB: Repeat for each hand
    end
```

## 🔧 **Holecard Visibility Modes**

```mermaid
graph LR
    subgraph "Training Modes"
        A[Perfect Mode] --> A1[Exact dealer<br/>hole cards face-up]
        B[Bucket 4-10] --> B1[Hole cards shown<br/>as "4-10" bucket]
        C[Bucket 2-3] --> C1[Hole cards shown<br/>as "2-3" bucket]
    end
    
    subgraph "Backend Storage"
        A1 --> CHARTS[12 Chart Variants<br/>3 modes × 2 surrender × 2 soft17]
        B1 --> CHARTS
        C1 --> CHARTS
    end
    
    style A fill:#4caf50
    style B fill:#ff9800
    style C fill:#f44336
    style CHARTS fill:#9c27b0
```

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bet404.git
   cd bet404
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```

4. **Environment Setup**
   ```bash
   # Create .env file
   cp .env.example .env
   # Configure your database and auth settings
   ```

### 🎯 **Usage**

1. **Create Account** - Sign up with email/password
2. **Choose Settings** - Select holecard mode, surrender rules, soft 17 handling
3. **Start Training** - Begin single-hand drills with immediate feedback
4. **Track Progress** - Monitor accuracy and improvement over time

---

## 📊 **Data Models**

```mermaid
erDiagram
    USER {
        id string PK
        email string
        password_hash string
        created_at timestamp
    }
    
    CHART {
        id string PK
        mode string "perfect/4-10/2-3"
        surrender_allowed boolean
        soft17_hit boolean
        chart_data json
    }
    
    SESSION {
        id string PK
        user_id string FK
        hand_data json
        user_decision string
        correct_decision string
        is_correct boolean
        mode string
        timestamp timestamp
    }
    
    STATS {
        id string PK
        user_id string FK
        mode string
        total_hands integer
        correct_moves integer
        accuracy decimal
        streak integer
    }
    
    USER ||--o{ SESSION : plays
    USER ||--o{ STATS : has
    CHART ||--o{ SESSION : validates
```

## 🎛️ **Configuration Options**

### Rule Variants (12 Total Combinations)
| Dimension | Options |
|-----------|---------|
| **Holecard Visibility** | Perfect, 4-10, 2-3 |
| **Surrender Allowed** | Yes, No |
| **Dealer Soft 17** | Hit, Stand |

### Session Settings
- **Deck Count**: Fixed at 6+ (auto-reshuffle)
- **Surrender Toggle**: Enable/disable mid-session
- **Soft 17 Rule**: Hit or Stand
- **Holecard Mode**: Switch between visibility modes

---

## 🧪 **API Endpoints**

### 🃏 **Deal New Hand**
```http
GET /api/deal_newhand
```

**Response:**
```json
{
  "player_cards": [
    {"suit": "hearts", "rank": "A"},
    {"suit": "spades", "rank": "K"}
  ],
  "dealer_cards": [
    {"suit": "diamonds", "rank": "7"},
    {"hole_bucket": "4-10"}
  ],
  "settings": {
    "hole_mode": "4-10",
    "surrender_allowed": true,
    "soft17_hit": false,
    "decks_count": 6,
    "double_first_two": "any"
  }
}
```

### 📈 **Validation Flow**
```http
POST /api/validate_move
Content-Type: application/json

{
  "player_cards": [...],
  "dealer_upcard": {...},
  "hole_info": {...},
  "user_decision": "H",
  "settings": {...}
}
```

---

## 📱 **UI Components**

### 🎮 **Game Table**
- **Dealer Area**: Upcard + holecard info per mode
- **Player Area**: Two upcards + action buttons
- **Feedback**: Real-time correct/incorrect overlay
- **Stats Panel**: Current session accuracy

### 📊 **Statistics Dashboard**
- Lifetime accuracy across all modes
- Per-mode performance breakdown
- Current streak tracking
- Hands played counter

### ⚙️ **Settings Panel**
- Holecard visibility mode selector
- Rule variant toggles
- Chart upload functionality (admin)
- Session preferences

---

## 🔮 **Future Roadmap**

```mermaid
timeline
    title BET404 Development Roadmap
    
    section Version 1.0
        Current : Single-hand drills
                : Basic statistics
                : 3 holecard modes
                : Web-first design
    
    section Version 1.5
        Q2 2024 : Multi-hand drills
                : Advanced analytics
                : Mistake pattern heatmaps
                : Adaptive difficulty
    
    section Version 2.0
        Q3 2024 : Native iOS wrapper
                : Push notifications
                : Offline caching
                : TestFlight distribution
    
    section Version 2.5
        Q4 2024 : Bankroll simulation
                : Shoe penetration drills
                : Social features
                : Leaderboards
    
    section Version 3.0
        2025    : Full casino simulation
                : Spanish 21 support
                : Multiplayer training
                : AI coach integration
```

---

## 🛠️ **Development**

### Project Structure
```
bet404/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utility functions
├── backend/                 # Flask API
│   ├── api/                # API blueprints
│   ├── models/             # Database models
│   └── utils/              # Backend utilities
├── docs/                   # Documentation
└── tests/                  # Test suites
```

### 🧪 **Testing**
```bash
# Frontend tests
cd frontend && npm test

# Backend tests  
cd backend && python -m pytest

# E2E tests
npm run test:e2e
```

### 🚀 **Deployment**
```bash
# Build frontend
npm run build

# Deploy to production
docker-compose up -d
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Blackjack Strategy**: Built on decades of mathematical analysis
- **Holecarding Techniques**: Advanced card counting methodologies  
- **UI/UX Design**: Modern web standards for professional training tools
- **Community**: Feedback from professional blackjack players and trainers

---

<div align="center">

**Made with ❤️ for professional blackjack training**

[📧 Contact](mailto:contact@bet404.com) • [🐛 Report Bug](https://github.com/yourusername/bet404/issues) • [💡 Request Feature](https://github.com/yourusername/bet404/issues)

</div>