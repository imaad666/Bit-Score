import React from 'react';
import CoinSearch from './CoinSearch';
import TrendingCoins from './TrendingCoins';
import WalletConnect from './WalletConnect';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Bitscore Dashboard</h1>
            <WalletConnect />
            <CoinSearch />
            <TrendingCoins />
        </div>
    );
};

export default Dashboard;