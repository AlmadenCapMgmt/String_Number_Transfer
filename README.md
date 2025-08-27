# HybridStorage Smart Contract

A secure hybrid storage smart contract that allows the owner to store both string and number values while enabling public read access. Built with Solidity and featuring comprehensive ownership controls.

## Contract Overview

The HybridStorage contract provides:
- **Dual data storage**: Store both string and number values on the blockchain
- **Owner-only write access**: Only the contract deployer can modify stored data
- **Public read access**: Anyone can read both stored values
- **Ownership management**: Transfer ownership to another address
- **Event logging**: Track all data updates and ownership changes
- **Batch operations**: Set both values simultaneously for gas efficiency

## Contract Functions

### Public Read Functions (No gas required)
- `getString()` - Returns the stored string value
- `getNumber()` - Returns the stored number value  
- `getBoth()` - Returns both stored values in a single call
- `owner()` - Returns the current owner address

### Owner-Only Write Functions (Requires gas + owner wallet)
- `setString(string memory newString)` - Updates the stored string
- `setNumber(uint256 newNumber)` - Updates the stored number
- `setBoth(string memory newString, uint256 newNumber)` - Updates both values at once
- `transferOwnership(address newOwner)` - Transfers contract ownership

## Environment Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the project root:

```env
SEPOLIA_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### 3. Get Required API Keys

#### Infura API Key
1. Go to [Infura](https://infura.io/)
2. Sign up for a free account
3. Create a new project
4. Copy the Project ID and replace `YOUR_INFURA_PROJECT_ID` in your `.env` file

#### Etherscan API Key
1. Go to [Etherscan](https://etherscan.io/)
2. Create an account and log in
3. Go to "API Keys" in your account dashboard
4. Create a new API key
5. Copy the API key and replace `your_etherscan_api_key_here` in your `.env` file

#### Private Key
1. Open MetaMask wallet
2. Click on account menu → Account Details → Export Private Key
3. Enter your password and copy the private key
4. Replace `your_private_key_here` in your `.env` file
⚠️ **WARNING**: Never share your private key or commit it to version control!

## Deployment Commands

### Compile the Contract
```bash
npm run compile
```

### Run Tests
```bash
npm run test
```

### Deploy to Sepolia Testnet
```bash
npm run deploy:sepolia
```

### Verify Contract on Etherscan
After deployment, verify your contract:
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

## Interacting with the Contract

### Via Etherscan
1. Go to your contract on Sepolia Etherscan: `https://sepolia.etherscan.io/address/<CONTRACT_ADDRESS>`
2. Click "Contract" tab to view verified source code
3. Use "Read Contract" section to call getter functions
4. Connect your wallet and use "Write Contract" section for owner-only functions

### Functions Available on Etherscan

#### Read Functions (Free)
- **getString**: Returns the currently stored string
- **getNumber**: Returns the currently stored number
- **getBoth**: Returns both string and number values
- **owner**: Returns the address of the contract owner

#### Write Functions (Gas required + owner wallet)
- **setString**: Update the stored string (owner only)
- **setNumber**: Update the stored number (owner only)
- **setBoth**: Update both values simultaneously (owner only)
- **transferOwnership**: Transfer contract ownership (owner only)

## Contract Features

### Data Storage
- **String Storage**: Stores any text data (UTF-8 supported)
- **Number Storage**: Stores uint256 values (0 to 2^256-1)
- **Efficient Retrieval**: Individual or batch read operations

### Access Control
- **Owner Privileges**: Only deployer can write data
- **Public Reads**: Anyone can read stored values
- **Ownership Transfer**: Secure handoff to new owners

### Event Logging
- **StringStored**: Emitted when string is updated
- **NumberStored**: Emitted when number is updated  
- **OwnershipTransferred**: Emitted when ownership changes

### Gas Optimization
- **Batch Operations**: `setBoth()` saves gas vs separate calls
- **View Functions**: Read operations are free
- **Efficient Storage**: Minimal storage slots used

## Security Features

- **Access Control**: Only the deployer (owner) can modify stored data
- **Ownership Transfer**: Secure ownership transfer with zero-address protection
- **Event Logging**: All actions are logged via events for transparency
- **Input Validation**: Prevents invalid ownership transfers
- **Public Reads**: Anyone can verify stored data without restrictions

## Example Usage

### Basic Operations
1. **Deploy contract** → You become the owner
2. **Set string**: Call `setString("Hello, Blockchain!")`
3. **Set number**: Call `setNumber(42)`
4. **Read values**: Anyone can call `getString()` and `getNumber()`
5. **Read both**: Anyone can call `getBoth()` for efficiency

### Batch Operations
1. **Set both values**: Call `setBoth("Updated Text", 100)`
2. **Save gas**: One transaction instead of two separate calls

### Ownership Management
1. **Transfer ownership**: Call `transferOwnership(newOwnerAddress)`
2. **New owner**: Can now modify stored values
3. **Previous owner**: Loses write access

## Use Cases

### Data Registry
- Store configuration data (string) and version numbers
- Public verification of settings and versions
- Controlled updates by authorized parties

### Simple Database
- Key-value storage with dual data types
- Public read access for transparency
- Restricted write access for data integrity

### Configuration Management
- Application settings (string) with numeric parameters
- Immutable audit trail via events
- Secure ownership-based updates

## Technical Specifications

- **Solidity Version**: 0.8.24
- **License**: MIT
- **Network**: Sepolia Testnet
- **Gas Optimization**: Batch operations available
- **Event Logging**: Comprehensive activity tracking

## Project Structure

```
StrNumTran_Contract/
├── contracts/
│   └── HybridStorage.sol      # Main smart contract
├── scripts/
│   └── deploy.js              # Deployment script
├── test/
│   └── HybridStorage.test.js  # Test suite
├── hardhat.config.js          # Hardhat configuration
├── package.json               # Dependencies and scripts
├── README.md                  # This documentation
├── infrastructure-flow.md     # Architecture diagram
└── .env.example               # Environment template
```

## License
MIT License - see contract header for details