import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, ArrowRight, TrendingUp } from 'lucide-react';

const trendingCoins = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Solana', symbol: 'SOL' },
    { name: 'Dogecoin', symbol: 'DOGE' },
    { name: 'Shiba Inu', symbol: 'SHIB' },
];

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(createPageUrl(`CoinDetails?coin=${searchTerm.trim().toLowerCase()}`));
        }
    };

    const handleTrendingClick = (coinSymbol: string) => {
        navigate(createPageUrl(`CoinDetails?coin=${coinSymbol.toLowerCase()}`));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">AI-Powered Crypto<br /><span className="text-blue-400">Trust Analysis</span></h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">Bitscore uses AI to analyze on-chain data, news, and social sentiment to provide a simple trust score for any cryptocurrency.</p>
            </div>

            <div>
                <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-16">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder='Search for a coin (e.g. "Bitcoin" or "ETH")' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-md hover:bg-blue-500 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2"><TrendingUp className="text-blue-400" />Trending Coins</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {trendingCoins.map((coin, index) => (
                        <div key={coin.symbol} onClick={() => handleTrendingClick(coin.symbol)} className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg text-center hover:bg-gray-800/70 hover:border-blue-500 cursor-pointer transition-all">
                            <p className="font-bold text-white">{coin.name}</p>
                            <p className="text-sm text-gray-400">{coin.symbol}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;


