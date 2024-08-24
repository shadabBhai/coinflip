# Solana Coinflip Game

This is a simple coin flip game implemented on the Solana blockchain. Users can connect their Solana wallet, choose a side (Heads or Tails), risk some tokens (SOL), and flip a virtual coin. If the coin lands on the selected side, users get double the amount they risked. Otherwise, they get nothing.

## Features

- Connect Solana wallet using Phantom wallet.
- Select token (currently only SOL is supported for transactions).
- Enter the amount of tokens to risk.
- Choose Heads or Tails for the coin flip.
- Get double the tokens if you win, or lose the tokens if you lose.

## Technologies Used

- React
- Solana Web3.js
- Tailwind CSS
- @solana/wallet-adapter-react
- @solana/wallet-adapter-wallets

## Installation

### Prerequisites

- Node.js and npm installed.
- Solana wallet (e.g., Phantom) installed in your browser.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/shadabBhai/coinflip.git
   cd coinflip

   ```

2. Install the dependencies:

npm install

3. Set up environment variables:

Create a .env file in the root directory.
Add your Solana devnet or testnet configurations if needed.

4. Run the development server:

npm start
