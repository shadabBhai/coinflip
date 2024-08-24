import { useState, useEffect } from 'react';
import "./coinFlipAnimation.css"


// eslint-disable-next-line react/prop-types
const CoinFlip = ({ result, flipping }) => {
    const [finalResult, setFinalResult] = useState('');

    useEffect(() => {
        if (!flipping) {
            setFinalResult(result); // Set the final result once the flipping stops
        }
    }, [flipping, result]);

    return (
        <div className="coin-container">
            <div className={`coin ${flipping ? 'flipping' : finalResult === 'heads' ? 'heads-face' : 'tails-face'}`}>
                <div className="coin-face coin-heads">Heads</div>
                <div className="coin-face coin-tails">Tails</div>
            </div>
        </div>
    );
};


export default CoinFlip;
