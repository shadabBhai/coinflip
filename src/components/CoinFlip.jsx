import { useState, useEffect } from 'react';
import "./coinFlipAnimation.css"

const CoinFlip = ({ result }) => {
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
        if (result !== null) {
            setFlipping(true);
            const timer = setTimeout(() => setFlipping(false), 1000); // Set animation duration
            return () => clearTimeout(timer);
        }
    }, [result]);

    return (
        <div className="coin-container">
            <div className={`coin ${flipping ? 'flipping' : ''}`}>
                <div className="coin-face coin-heads">Heads</div>
                <div className="coin-face coin-tails">Tails</div>
            </div>
        </div>
    );
};

export default CoinFlip;
