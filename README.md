# Bet404 Games 🎯

**Professional advantage-play training platform for serious players**

A sophisticated hole-carding trainer built with modern web technologies, featuring high-fidelity decision-point reproduction, real-time grading against optimal references, and persistent user-specific performance analytics.

## 🎮 Overview

Bet404 Games is a comprehensive training ecosystem designed for advantage players seeking to master hole-carding techniques in Blackjack and Spanish 21. The platform simulates live table conditions with mathematical precision, providing immediate feedback and long-term progress tracking.

### 🎯 Core Features

- **Multi-Modal Training**: Perfect, bucketed, and A-9 hole-carding scenarios
- **Real-Time Grading**: Server-side validation against game-theory-optimal charts
- **Persistent Analytics**: Cross-session statistics and performance tracking
- **Chart Customization**: User-specific strategy modifications with live validation
- **Mobile-First**: Touch-optimized interface for on-the-go training

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React SPA] --> B[Authentication]
        A --> C[Game Table]
        A --> D[Strategy Charts]
        A --> E[Analytics Dashboard]
    end
    
    subgraph "Backend Services"
        F[Flask API] --> G[Authentication Routes]
        F --> H[Game Logic Engine]
        F --> I[Chart Management]
        F --> J[Statistics Engine]
    end
    
    subgraph "Data Layer"
        K[(PostgreSQL)]
        L[(Supabase Auth)]
    end
    
    subgraph "Infrastructure"
        M[Vercel Edge]
        N[CDN Assets]
    end
    
    A --> F
    F --> K
    B --> L
    F --> M
    A --> N
    
    style A fill:#e1f5fe
    style F fill:#f3e5f5
    style K fill:#e8f5e8
    style M fill:#fff3e0
```

## 🎲 Game Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Flask API
    participant DB as PostgreSQL
    participant GE as Grading Engine
    
    U->>FE: Configure Settings
    FE->>API: POST /api/settings_update
    API->>DB: Update user_settings
    
    U->>FE: Start Session
    FE->>API: GET /api/deal_newhand
    API->>FE: Return cards + settings
    
    U->>FE: Make Decision
    FE->>API: POST /api/grade
    API->>GE: Validate decision
    GE->>API: Return grade + optimal move
    API->>DB: Update statistics
    API->>FE: Return result
    
    FE->>FE: Update session stats
    FE->>FE: Auto-deal next hand
```

## 🧠 Decision Engine Logic

```mermaid
flowchart TD
    A[Player Decision] --> B{Mode Type}
    
    B -->|Perfect| C[Extract Dealer Total]
    B -->|Bucket| D[Map to Range]
    
    C --> E[Perfect Chart Lookup]
    D --> F[Standard Chart Lookup]
    
    E --> G{Priority Check}
    F --> H{Cell Resolution}
    
    G --> I[1. Split]
    I --> J[2. Surrender]
    J --> K[3. Double]
    K --> L[4. Hit/Stand]
    
    H --> M{Macro Resolution}
    M -->|DS| N[Double else Stand]
    M -->|RH| O[Surrender else Hit]
    M -->|Slash| P[H17/S17 Split]
    
    L --> Q[Grade Decision]
    N --> Q
    O --> Q
    P --> Q
    
    Q --> R[Update Statistics]
    R --> S[Return Result]
    
    style A fill:#ffeb3b
    style Q fill:#4caf50
    style R fill:#2196f3
```

## 📊 Database Schema

```mermaid
erDiagram
    users {
        text user_id PK
        text email UK
        text password
        timestamp created_at
    }
    
    user_settings {
        text user_id PK,FK
        text hole_card
        boolean surrender_allowed
        boolean soft17_hit
        int decks_count
        text double_first_two
    }
    
    user_stats {
        text user_id PK,FK
        int total_4to10_hands
        int errors_4to10_hands
        int total_2to3_hands
        int errors_2to3_hands
        int total_perfect_hands
        int errors_perfect_hands
        int total_a9das_hands
        int errors_a9das_hands
        int total_a9nodas_hands
        int errors_a9nodas_hands
        int total_spa4to9_hands
        int errors_spa4to9_hands
        int total_spa2to3_hands
        int errors_spa2to3_hands
        int total_spa_perfect_hands
        int errors_spa_perfect_hands
    }
    
    charts {
        serial chart_id PK
        text user_id FK
        text mode
    }
    
    chart_entries {
        serial entry_id PK
        int chart_id FK
        text dealer_val
        int player_val
        text player_hand_type
        text dealer_hand_type
        boolean player_pair
        text recommended_move
    }
    
    perfect_entries {
        serial entry_id PK
        int chart_id FK
        text dealer_val
        text hit_until_hard
        text hit_until_soft
        text double_hards
        text double_softs
        text splits
        text late_surrender_hards
        text late_surrender_softs
    }
    
    users ||--o{ user_settings : has
    users ||--o{ user_stats : tracks
    users ||--o{ charts : owns
    charts ||--o{ chart_entries : contains
    charts ||--o{ perfect_entries : contains
```

## 🛠️ Technology Stack

### Frontend Architecture
- **React 18** - Component architecture with hooks and concurrent features
- **Tailwind CSS 3.4** - Utility-first styling with JIT compilation
- **Vite 5.0** - Lightning-fast HMR and optimized builds
- **ES2022** - Modern JavaScript with optional chaining and nullish coalescing

### Backend Infrastructure
- **Flask 3.0.3** - WSGI application with Blueprint modularization
- **PostgreSQL 14+** - ACID-compliant RDBMS with JSON support
- **Supabase** - BaaS with Row Level Security and real-time subscriptions
- **psycopg2-binary** - High-performance PostgreSQL adapter

### Deployment & Infrastructure
- **Vercel Edge Network** - Global CDN with serverless functions
- **Python 3.9 Runtime** - Optimized for cold start performance
- **HTTP/2 & HTTP/3** - Modern protocol support for reduced latency

## 🎮 Training Modules

### Blackjack Implementation
```mermaid
mindmap
  root((Blackjack))
    Perfect Mode
      Exact hole card known
      dealer_total = up_card + hole_card
      Priority: Split → Surrender → Double → Hit/Stand
      Mathematical EV calculations
    4-10 Range
      hole_card ∈ {4,5,6,7,8,9,T,J,Q,K}
      Weighted probability distributions
      Conservative strategy adjustments
    2-3 Range
      hole_card ∈ {2,3}
      Low card scenarios
      Aggressive doubling opportunities
    A-9 DAS
      hole_card ∈ {A,2,3,4,5,6,7,8,9}
      Double After Split = true
      Complex pair splitting EV
    A-9 NoDAS
      hole_card ∈ {A,2,3,4,5,6,7,8,9}
      Double After Split = false
      Conservative splitting strategy
```

### Spanish 21 Mechanics
```mermaid
mindmap
  root((Spanish 21))
    Deck Composition
      48 cards per deck
      No 10-spot cards
      J,Q,K remain (value=10)
      Adjusted house edge: +0.76%
    Spanish Perfect
      Exact hole card known
      Modified surrender tables
      Redoubling rules
    Spanish 4-9
      hole_card ∈ {4,5,6,7,8,9}
      No natural 10-value cards
      Liberal doubling rules
    Spanish 2-3
      hole_card ∈ {2,3}
      Super bonus payouts
      Match the dealer bonuses
```

## 🔧 API Architecture

### RESTful Endpoints
```typescript
// Authentication & User Management
POST   /api/auth/exchange        // Supabase token exchange
POST   /api/auth/logout          // Session termination
GET    /api/me                   // Current user profile
POST   /api/new_user             // Account initialization

// Game Engine
GET    /api/deal_newhand         // Shuffle & deal new scenario
POST   /api/grade                // Decision validation
POST   /api/settings_update      // Runtime configuration

// Chart Management
GET    /api/{mode}_chart         // Retrieve strategy matrix
POST   /api/chart/update_cell    // Cell-level modifications
POST   /api/chart/update_perfect_cell  // Perfect mode row updates
POST   /api/reset_entries_default      // Factory reset

// Analytics
GET    /api/stats                // Performance metrics
```

### Grading Engine Internals
```python
def _grade_perfect(user_id, player_cards, dealer_up, dealer_hole, 
                  attempted, surrender_allowed, soft17_hit, 
                  double_first_two, mode, cur):
    """
    Perfect mode grading with priority-based decision tree
    
    Priority Order:
    1. Split (if pair and splits token contains pair_char)
    2. Surrender (hardcoded tables by dealer total)
    3. Double (environment-gated by double_first_two setting)
    4. Hit/Stand (threshold-based on total)
    """
    
    # Extract dealer total from both cards
    dealer_key = _dealer_key_for_perfect(dealer_up, dealer_hole)
    
    # Priority 1: Split evaluation
    if pair and pair_char and splits_tok and (pair_char in set(splits_tok)):
        return _result_payload(mode, attempted, 'P')
    
    # Priority 2: Surrender lookup from hardcoded tables
    if surrender_allowed and _should_surrender_from_tables(
        mode, dealer_key, total, soft, player_cards
    ):
        return _result_payload(mode, attempted, 'R')
    
    # Priority 3: Double evaluation (gated by environment)
    if double_allowed_env:
        if not soft and _should_double_hard(total, double_hards_text):
            return _result_payload(mode, attempted, 'D')
        elif soft and _should_double_soft(player_cards, double_softs_text):
            return _result_payload(mode, attempted, 'D')
    
    # Priority 4: Hit/Stand threshold
    resolved = _hit_or_stand(total, threshold_text)
    return _result_payload(mode, attempted, resolved)
```

## 🎯 Chart Syntax Specification

### Standard Charts (Cell-by-Cell)
```yaml
# Atomic Actions
H: Hit                    # Take another card
S: Stand                  # End turn with current total
D: Double                 # Double bet, take one card, end turn
P: Split                  # Split pair into two hands
R: Surrender             # Forfeit half bet, end hand

# Smart Macros (Conditional Logic)
DS: Double else Stand     # Preferred: Double | Fallback: Stand
DH: Double else Hit       # Preferred: Double | Fallback: Hit
RH: Surrender else Hit    # Preferred: Surrender | Fallback: Hit
RS: Surrender else Stand  # Preferred: Surrender | Fallback: Stand

# H17/S17 Rule Variants (Slash Notation)
"RH/H": "H17: Surrender, S17: Hit"
"S/H":  "H17: Stand, S17: Hit"
"DS/S": "H17: Double-else-Stand, S17: Stand"
```

### Perfect Charts (Row-by-Row Configuration)
```typescript
interface PerfectEntry {
  dealer_val: string;           // "20"|"19"|...|"4"|"A6"|"A5"|...|"AA"
  hit_until_hard: string;      // "17" | "16/18" (H17/S17)
  hit_until_soft: string;      // "19" | "18/20" (H17/S17)
  double_hards: string;        // "9-11" | "10-11/11" | null
  double_softs: string;        // "A2-A7" | "A3-A8/A2-A9" | null
  splits: string;              // "A23456789T" | "A789/A89" | null
  late_surrender_hards: string; // Hardcoded tables
  late_surrender_softs: string; // Hardcoded tables
}

// Example: Dealer has 16 (6 up, T hole)
{
  dealer_val: "16",
  hit_until_hard: "12",        // Hit hard totals < 12
  hit_until_soft: "18",        // Hit soft totals < 18
  double_hards: "4-11",        // Double hard 4-11
  double_softs: "A2-AT",       // Double A2 through AT (A10)
  splits: "A2346789T",         // Split these pairs
  late_surrender_hards: null,  // No surrender vs 16
  late_surrender_softs: null
}
```

## 🚀 Development Environment

### Prerequisites & Dependencies
```bash
# System Requirements
Node.js >= 18.0.0
Python >= 3.9.0
PostgreSQL >= 14.0
Git >= 2.30.0

# Frontend Dependencies
npm install react@18.2.0 react-dom@18.2.0
npm install @tailwindcss/forms @tailwindcss/typography
npm install lucide-react react-hot-toast
npm install @supabase/supabase-js

# Backend Dependencies  
pip install flask==3.0.3 flask-cors python-dotenv
pip install psycopg2-binary supabase
```

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/yourusername/bet404-games.git
cd bet404-games

# Frontend setup
npm install
cp .env.example .env.local
# Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev  # Starts Vite dev server on :5173

# Backend setup (separate terminal)
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure DATABASE_URL and Supabase keys
python app.py  # Starts Flask dev server on :5001
```

### Database Initialization
```sql
-- Execute in PostgreSQL shell
\i backend/db/sql/create.sql      -- Core schema
\i backend/db/sql/insert.sql      -- Test user
\i backend/db/sql/insert_chart.sql -- Blackjack 4-10 & 2-3
\i backend/db/sql/insert_perfect.sql -- Perfect charts
\i backend/db/sql/insert_ato9.sql   -- A-9 DAS/NoDAS
\i backend/db/sql/insert_spanish.sql -- Spanish 21 charts
\i backend/db/sql/insert_spanish_perfect.sql -- Spanish perfect
```

## 📈 Performance Optimizations

### Frontend Optimizations
```javascript
// Code splitting with React.lazy()
const GameTable = React.lazy(() => import('./components/GameTable'))
const StrategyChart = React.lazy(() => import('./components/StrategyChart'))

// Memoization for expensive calculations
const handValue = useMemo(() => calculateHandValue(cards), [cards])

// Virtualized chart rendering for large datasets
const Chart = ({ entries }) => {
  const visibleRows = useMemo(() => 
    entries.slice(scrollTop, scrollTop + viewportHeight), 
    [entries, scrollTop, viewportHeight]
  )
  return <VirtualizedTable rows={visibleRows} />
}
```

### Backend Optimizations
```python
# Connection pooling with psycopg2
from psycopg2 import pool
connection_pool = psycopg2.pool.SimpleConnectionPool(
    minconn=1, maxconn=20, dsn=DATABASE_URL
)

# Indexed database queries
@app.route('/api/grade')
def grade():
    # Optimized chart lookup with composite index
    cur.execute("""
        SELECT recommended_move FROM chart_entries 
        WHERE chart_id=%s AND dealer_val=%s AND player_val=%s 
        AND player_pair=%s AND player_hand_type=%s
        LIMIT 1
    """, (chart_id, dealer_val, player_val, player_pair, hand_type))
```

### Critical Database Indexes
```sql
-- High-frequency lookup optimization
CREATE INDEX CONCURRENTLY idx_chart_entries_lookup 
ON chart_entries (chart_id, dealer_val, player_val, player_pair, player_hand_type);

-- Perfect chart access optimization  
CREATE INDEX CONCURRENTLY idx_perfect_entries_chart_dealer 
ON perfect_entries (chart_id, dealer_val);

-- User statistics aggregation
CREATE INDEX CONCURRENTLY idx_user_stats_user_id 
ON user_stats (user_id);

-- Chart ownership verification
CREATE INDEX CONCURRENTLY idx_charts_user_mode 
ON charts (user_id, mode);
```

## 🔒 Security Architecture

### Authentication Flow
```mermaid
sequenceDiagram
    participant C as Client
    participant S as Supabase
    participant A as Flask API
    participant D as Database
    
    C->>S: signInWithPassword()
    S-->>C: JWT access_token
    C->>A: Request with Bearer token
    A->>S: Verify token with service key
    S-->>A: User metadata
    A->>D: Query with user_id constraint
    D-->>A: User-specific data
    A-->>C: Authorized response
```

### Row Level Security (RLS)
```sql
-- Supabase RLS policies for user isolation
CREATE POLICY "Users can only access own data" ON user_settings
    FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can only modify own charts" ON charts  
    FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Users can only view own statistics" ON user_stats
    FOR SELECT USING (auth.uid()::text = user_id);
```

### Input Validation & Sanitization
```python
# Parameterized queries prevent SQL injection
def update_chart_cell(chart_id: int, dealer_val: str, 
                     player_val: int, new_move: str):
    # Validate enum constraints
    if dealer_val not in VALID_DEALER_VALUES:
        raise ValueError(f"Invalid dealer_val: {dealer_val}")
    
    if new_move not in ALLOWED_MOVES:
        raise ValueError(f"Invalid move: {new_move}")
    
    # Use parameterized query
    cur.execute("""
        UPDATE chart_entries 
        SET recommended_move = %s 
        WHERE chart_id = %s AND dealer_val = %s AND player_val = %s
    """, (new_move, chart_id, dealer_val, player_val))
```

## 🧪 Testing Strategy

### Unit Testing (Backend)
```python
import pytest
from backend.routes.grading import _grade_4to10

def test_basic_strategy_grading():
    """Test fundamental blackjack strategy decisions"""
    # Player 12 vs Dealer 2 should Hit
    result = _grade_4to10(
        user_id='test',
        player_cards=[{'rank': '7', 'suit': 'hearts'}, 
                     {'rank': '5', 'suit': 'clubs'}],
        dealer_up={'rank': '2', 'suit': 'spades'},
        attempted='H',
        surrender_allowed=True,
        soft17_hit=False,
        double_first_two='any',
        mode='4-10',
        cursor=mock_cursor
    )
    assert result['is_correct'] == True
    assert result['correct_move'] == 'H'

def test_perfect_mode_priority():
    """Test decision priority in perfect mode"""
    # AA vs dealer 6 should Split (priority 1)
    result = _grade_perfect(
        user_id='test',
        player_cards=[{'rank': 'A', 'suit': 'hearts'}, 
                     {'rank': 'A', 'suit': 'clubs'}],
        dealer_up={'rank': '6', 'suit': 'spades'},
        dealer_hole={'rank': '5', 'suit': 'diamonds'},
        attempted='P',
        surrender_allowed=True,
        soft17_hit=False,
        double_first_two='any',
        mode='perfect',
        cursor=mock_cursor
    )
    assert result['is_correct'] == True
    assert result['meta']['stage'] == 'split'
```

### Integration Testing (Frontend)
```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GameTable from '../components/GameTable'

describe('Game Table Integration', () => {
  test('grades decision and updates statistics', async () => {
    const mockSettings = {
      hole_mode: 'perfect',
      surrender_allowed: true,
      soft17_hit: false,
      double_first_two: 'any'
    }
    
    render(<GameTable settings={mockSettings} />)
    
    // Simulate dealing cards
    fireEvent.click(screen.getByText('Deal Cards'))
    
    await waitFor(() => {
      expect(screen.getByText('Make your move')).toBeInTheDocument()
    })
    
    // Make decision
    fireEvent.click(screen.getByText('Hit'))
    
    await waitFor(() => {
      expect(screen.getByText(/Correct|Incorrect/)).toBeInTheDocument()
    })
  })
})
```

### Performance Testing
```python
import time
import concurrent.futures
from locust import HttpUser, task, between

class BlackjackUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        # Authenticate user
        response = self.client.post("/api/auth/exchange", json={
            "access_token": "test_token"
        })
    
    @task(3)
    def deal_new_hand(self):
        self.client.get("/api/deal_newhand")
    
    @task(10)  
    def grade_decision(self):
        self.client.post("/api/grade", json={
            "hole_mode": "perfect",
            "player_cards": [
                {"rank": "A", "suit": "hearts"},
                {"rank": "6", "suit": "clubs"}
            ],
            "dealer_up": {"rank": "6", "suit": "spades"},
            "dealer_hole": {"rank": "5", "suit": "diamonds"},
            "action": "D"
        })
```

## 🚀 Production Deployment

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/app.py",
      "use": "@vercel/python",
      "config": {
        "runtime": "python3.9",
        "memory": 1024,
        "maxDuration": 30
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/app.py"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "SUPABASE_URL": "@supabase_url",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_key",
    "DATABASE_URL": "@database_url"
  }
}
```

### Environment Configuration
```bash
# Production Environment Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
FLASK_ENV=production

# Frontend Build Variables  
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_API_BASE=https://bet404-games.vercel.app
```

### CDN & Caching Strategy
```javascript
// Vite build optimization
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['lucide-react', 'react-hot-toast']
        }
      }
    },
    target: 'es2022',
    sourcemap: false,
    minify: 'terser'
  }
})
```

## 📊 Monitoring & Observability

### Application Metrics
```python
import time
from functools import wraps

def monitor_performance(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            logger.info(f"{func.__name__} completed in {duration:.3f}s")
            return result
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"{func.__name__} failed after {duration:.3f}s: {e}")
            raise
    return wrapper

@monitor_performance
@require_user
def grade():
    # Grade user decision with timing
    pass
```

### Error Tracking & Alerting
```javascript
// Frontend error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('React Error Boundary:', error, errorInfo)
    
    // Track user actions leading to error
    const breadcrumbs = getBreadcrumbs()
    reportError(error, { breadcrumbs, errorInfo })
  }
}

// API error handling
const authFetch = async (path, init = {}) => {
  try {
    const response = await fetch(path, init)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    return response
  } catch (error) {
    // Log client-side errors
    console.error(`API Error [${path}]:`, error)
    throw error
  }
}
```

## 🤝 Contributing

### Code Style Standards
```json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "max-len": ["error", { "code": 100 }],
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Development Workflow
```bash
# Feature development
git checkout -b feature/new-training-mode
git commit -m "feat: add Ultimate Texas Hold'em module"
git push origin feature/new-training-mode

# Pull request requirements
- Unit tests for new functionality
- Integration tests for API changes  
- Performance impact assessment
- Security review for data access
```

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Blackjack Theory**: Built upon decades of mathematical analysis by advantage-play pioneers
- **Spanish 21 Rules**: Comprehensive rule variations from major casino operators  
- **UI/UX Inspiration**: Modern casino training platforms and educational tools
- **Community**: Beta testers and feedback from professional advantage players

---

**Bet404 Games** - *Where advantage meets precision* 🎯

*For support, feature requests, or professional training inquiries, contact us at support@bet404.games*