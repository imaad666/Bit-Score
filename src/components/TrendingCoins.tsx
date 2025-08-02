import React, { useEffect, useState } from 'react';
import { fetchTrendingCoins } from '../utils/ragModel';

const TrendingCoins: React.FC = () => {
    const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
        <div>
            <h2>Trending Coins</h2>
            <ul>
                {trendingCoins.map((coin) => (
                    <li key={coin.id}>
                        <h3>{coin.name} ({coin.symbol})</h3>
                        <p>Market Cap: {coin.marketCap}</p>
                        <p>Price: {coin.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingCoins;