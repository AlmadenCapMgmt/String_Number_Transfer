# HybridStorage Infrastructure Flow Diagram

```mermaid
graph TD
    A[👤 Developer] -->|1. Develops Code| B[💻 Local Development]
    B --> C[📁 HybridStorage.sol Contract]
    B --> D[🧪 Test Suite]
    B --> E[⚙️ Hardhat Framework]
    
    F[🔑 Environment Setup] --> G[.env File]
    G --> H[🌐 Infura API Key]
    G --> I[🔐 Private Key]
    G --> J[📊 Etherscan API Key]
    
    B -->|2. Compile & Test| K[📦 Hardhat Toolchain]
    K --> L[✅ Contract Compilation]
    K --> M[🧪 Run Test Suite]
    M --> N[✅ All Tests Pass]
    
    A -->|3. Deploy Command| O[🚀 Deployment Process]
    I -->|Signs Transaction| O
    O --> P[📡 Infura RPC Node]
    P -->|HTTPS Connection| Q[🌍 Sepolia Testnet]
    
    O -->|Deploy Transaction| Q
    Q -->|Returns| R[📋 Contract Address]
    R --> S[Contract: 0x...]
    
    A -->|4. Verify Contract| T[🔍 Etherscan Verification]
    J --> T
    T -->|Upload Source Code| U[📊 Etherscan Platform]
    U --> V[✅ Verified Contract]
    
    W[👥 Public Users] -->|5. Read Data| X[🌐 Etherscan Interface]
    X -->|Free Calls| V
    X -->|getString()| Y1[📝 String Data]
    X -->|getNumber()| Y2[🔢 Number Data]
    X -->|getBoth()| Y3[📊 Both Values]
    
    Z[🏦 Contract Owner] -->|6. Write Data| AA[🦊 MetaMask Connection]
    AA -->|setString()| BB[💰 Gas Payment]
    AA -->|setNumber()| BB
    AA -->|setBoth()| BB
    AA -->|transferOwnership()| BB
    BB --> Q
    
    Q --> CC[📚 Blockchain State]
    CC --> DD[🔒 Immutable Storage]
    DD --> EE[String: "Hello"]
    DD --> FF[Number: 42]
    DD --> GG[Owner: 0x...]
    
    style A fill:#e1f5fe
    style Q fill:#f3e5f5
    style V fill:#e8f5e8
    style DD fill:#fff3e0
    style Z fill:#ffebee
    
    classDef infra fill:#f9f,stroke:#333,stroke-width:2px
    classDef blockchain fill:#bbf,stroke:#333,stroke-width:3px
    classDef user fill:#bfb,stroke:#333,stroke-width:2px
    classDef owner fill:#fbb,stroke:#333,stroke-width:2px
    
    class H,I,J,P,U infra
    class Q,CC,DD blockchain
    class A,W user
    class Z,AA owner
```

## System Architecture

### 1. Development Environment
- **HybridStorage.sol**: Smart contract storing string + number values
- **Hardhat Framework**: Development, testing, and deployment platform
- **Test Suite**: Comprehensive contract functionality verification
- **Local Node.js**: Runtime environment for development tools

### 2. External Infrastructure
- **Infura RPC Node**: Ethereum network access provider
  - Endpoint: `https://sepolia.infura.io/v3/PROJECT_ID`
  - Handles all blockchain communication
- **Etherscan Platform**: Block explorer and contract interaction hub
  - Source code verification and public interface
  - Contract state inspection and transaction history

### 3. Security & Authentication Layer
- **Private Key**: Cryptographic signature for all transactions
- **MetaMask Wallet**: User interface for transaction signing
- **Environment Variables**: Secure credential storage (.env file)
- **Access Control**: Owner-only write permissions

### 4. Blockchain Infrastructure
- **Sepolia Testnet**: Ethereum test network for development
- **Smart Contract**: Deployed HybridStorage instance
- **Immutable Storage**: Permanent on-chain data persistence

## Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Developer     │    │   Public Users  │    │ Contract Owner  │
│   Environment   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Deploy              │ 2. Read              │ 3. Write
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Infura RPC Layer                             │
└─────────────────────────────────────────────────────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Sepolia Blockchain                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              HybridStorage Contract                     │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐  │   │
│  │  │   String    │ │   Number    │ │     Owner       │  │   │
│  │  │  Storage    │ │   Storage   │ │   Address       │  │   │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Interactions

### 1. Deployment Phase
```
Developer → Hardhat → Infura → Sepolia → Contract Address
```
- Developer compiles contract locally
- Hardhat signs deployment transaction with private key
- Transaction sent via Infura to Sepolia network
- Contract deployed, address returned

### 2. Verification Phase
```
Developer → Etherscan API → Verification → Public Interface
```
- Source code uploaded to Etherscan
- Bytecode verification performed
- Public read/write interface becomes available

### 3. Public Read Operations (No Gas)
```
User → Etherscan → View Functions → Blockchain State
```
- `getString()` → Returns stored string
- `getNumber()` → Returns stored number  
- `getBoth()` → Returns both values
- `owner()` → Returns owner address

### 4. Owner Write Operations (Gas Required)
```
Owner → MetaMask → Transaction → Gas Payment → Blockchain Update
```
- `setString(newString)` → Updates string storage
- `setNumber(newNumber)` → Updates number storage
- `setBoth(string, number)` → Updates both values
- `transferOwnership(address)` → Changes contract owner

## Security Architecture

### Access Control Matrix
| Function | Public Access | Owner Access | Gas Required |
|----------|---------------|--------------|--------------|
| getString() | ✅ | ✅ | ❌ |
| getNumber() | ✅ | ✅ | ❌ |
| getBoth() | ✅ | ✅ | ❌ |
| owner() | ✅ | ✅ | ❌ |
| setString() | ❌ | ✅ | ✅ |
| setNumber() | ❌ | ✅ | ✅ |
| setBoth() | ❌ | ✅ | ✅ |
| transferOwnership() | ❌ | ✅ | ✅ |

### Security Boundaries
1. **Network Layer**: HTTPS encryption via Infura
2. **Authentication**: Private key cryptographic signatures
3. **Authorization**: Smart contract owner-only modifiers
4. **Validation**: Input sanitization and zero-address checks
5. **Transparency**: Event logging for all state changes

## Gas Optimization Strategy

### Read Operations (Free)
- All getter functions are `view` - no gas cost
- Public accessibility encourages data transparency
- Multiple read patterns supported (individual/batch)

### Write Operations (Optimized)
- `setBoth()` function saves gas vs separate calls
- Single transaction updates both string and number
- Event emissions grouped for efficiency

## Network Topology

```
┌──────────────────┐
│  Local Machine   │
│  (Development)   │
└─────────┬────────┘
          │ HTTPS
          ▼
┌──────────────────┐
│   Infura RPC     │
│   (Gateway)      │
└─────────┬────────┘
          │ P2P
          ▼
┌──────────────────┐
│ Sepolia Network  │
│  (Blockchain)    │
└─────────┬────────┘
          │ Storage
          ▼
┌──────────────────┐
│ Contract State   │
│  (Immutable)     │
└──────────────────┘
```

This infrastructure provides secure, scalable, and transparent data storage with proper access controls and public verifiability.