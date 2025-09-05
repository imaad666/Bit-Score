import React from 'react';
import TrendingCoins from '../components/TrendingCoins';

const Home: React.FC = () => {
    return (
        <div className="page">
            <header className="header">
                <div className="brand">BitScore</div>
                <div className="tagline">crypto insights integrated with AI</div>
            </header>
            <main className="content">
                <h1 className="section-title">Trending Coins</h1>
                <TrendingCoins />
            </main>
        </div>
    );
};

export default Home;