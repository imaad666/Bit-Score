import React from 'react';
import Dashboard from '../components/Dashboard';
import CoinSearch from '../components/CoinSearch';
import TrendingCoins from '../components/TrendingCoins';
import WalletConnect from '../components/WalletConnect';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to BitScore</h1>
            <WalletConnect />
            <CoinSearch />
            <TrendingCoins />
            <Dashboard />
        </div>
    );
};

export default Home;