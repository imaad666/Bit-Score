import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTrendingCoins } from '../utils/ragModel';
import { formatCompactNumber, formatCurrency } from '../utils/format';

const TrendingCoins: React.FC = () => {
    const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getTrendingCoins = async () => {
            try {
                const coins = await fetchTrendingCoins();
                setTrendingCoins(coins);
            } catch (err) {
                setError('Failed to fetch trending coins');
            } finally {
                setLoading(false);
            }
        };

        getTrendingCoins();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="trending-grid">
            {trendingCoins.map((coin) => {
                const change = typeof coin.priceChange24h === 'number' ? coin.priceChange24h : null;
                const changeClass = change !== null ? (change >= 0 ? 'text-green-400' : 'text-red-400') : 'text-gray-400';
                return (
                    <button key={coin.id} className="coin-card" onClick={() => navigate(`/coin/${coin.id}`)}>
                        <div className="coin-header">
                            {coin.image ? (
                                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-md" />
                            ) : (
                                <div className="coin-avatar">{coin.symbol?.slice(0, 3)?.toUpperCase()}</div>
                            )}
                            <div className="coin-name">{coin.name}</div>
                        </div>
                        <div className="coin-stats">
                            <div className="stat"><span className="label">Price</span><span className="value">{formatCurrency(coin.price)}</span></div>
                            <div className="stat"><span className="label">Mkt Cap</span><span className="value">{formatCompactNumber(coin.marketCap)}</span></div>
                            <div className={`stat ${changeClass}`}><span className="label">24h</span><span className="value">{change !== null ? `${change.toFixed(2)}%` : '-'}</span></div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default TrendingCoins;