import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import CoinFlip from './components/CoinFlip'

function App() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [chosenSide, setChosenSide] = useState('heads');
  const [result, setResult] = useState(null);
  const [token, setToken] = useState("SOL");
  const [flipping, setFlipping] = useState(false)
  const [coins, setCoins] = useState(5)

  // Fetch balance
  const getBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    getBalance();
  }, [publicKey]);

  const handleTokenChange = (e) => setToken(e.target.value);

  // const performFlip = (side) => {
  //   setFlipping(true);
  //   const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
  //   setTimeout(() => {
  //     setResult(flipResult);
  //     setFlipping(false);

  //     if (flipResult === side) {
  //       const winAmount = parseFloat(amount) * 2;
  //       alert(`You won! ${winAmount} ${token} has been credited to your wallet.`);
  //       setCoins(coins + winAmount);
  //     } else {
  //       alert('You lost! Better luck next time.');
  //       setCoins(coins - amount);
  //     }
  //   }, 1000); // Match this duration with the animation duration
  // };



  const handleFlip = async () => {

    if (!publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }



    const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
    setResult(flipResult);

    if (flipResult === chosenSide) {
      // User wins: send double the amount
      const solAmount = parseFloat(amount);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // For demonstration, sending back to the same wallet
          lamports: solAmount * 2 * LAMPORTS_PER_SOL, // Double the amount
        }),

      );

      try {
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
        alert(`You won! ${solAmount * 2} SOL has been credited to your wallet.`);
        getBalance();
      } catch (error) {
        console.error(error);
        alert('Transaction failed.');
      }
    } else {

      alert('You lost! Better luck next time.');
    }
  };

  const handleFlipDemo = async () => {
    const flipResult = await Math.random() < 0.5 ? 'heads' : 'tails';
    setResult(flipResult);
    if (!result) {
      return
    }

    if (coins <= 0 || coins < amount || amount == '') {
      alert("Please Enter valid amount!!!")
      return
    }


    console.log(chosenSide)
    console.log(result)
    if (result === chosenSide) {
      const winingAmount = amount * 2;
      const remainingAmount = coins - amount
      const totalAmount = winingAmount + remainingAmount;
      setCoins(totalAmount)
      alert(`You won! ${amount * 2} SOL has been credited to your wallet.`)
      return
    }
    if (result !== chosenSide) {
      const remainingAmount = coins - amount
      alert('You lost! Better luck next time.')
      setCoins(remainingAmount)
      return
    }

  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Solana Coinflip Game</h1>
      <WalletMultiButton />
      {publicKey && (
        <div className="mt-4">
          <p className="text-lg">
            <strong>Wallet Address:</strong> {publicKey.toBase58()}
          </p>
          <p className="text-lg">
            <strong>Balance:</strong> {balance} SOL
          </p>
          <p className="text-lg">
            <strong>Balance (Demo):</strong> {coins} SOL
          </p>
        </div>
      )}
      <div className="mt-8 w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Choose Side:</label>
          <select
            value={chosenSide}
            onChange={(e) => setChosenSide(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="heads">Heads</option>
            <option value="tails">Tails</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Token:
          </label>
          <select
            value={token}
            onChange={handleTokenChange}
            className="block w-full  border border-gray-300 p-2 rounded"
          >
            <option value="SOL">SOL</option>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount to Risk {token}:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter amount"
          />
        </div>
        <button
          onClick={handleFlip}
          className={`w-full  text-white p-2 rounded  transition bg-blue-500 `}
        >
          Flip Coin
        </button>
        <button
          onClick={handleFlipDemo}
          className={`w-full  text-white mt-2 p-2 rounded  transition bg-blue-500 `}
        >
          Flip Coin (Demo)
        </button>

        {result && (
          <div className="mt-4 text-center   ">
            <p className="flex justify-center"> <CoinFlip result={result} flipping={flipping} /></p>
            {result === chosenSide ? (
              <p className="text-green-500 mt-2">You won!</p>
            ) : (
              <p className="text-red-500 mt-2">You lost!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
