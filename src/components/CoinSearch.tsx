import React, { useState } from 'react';
import { fetchCoinData } from '../utils/ragModel';

const CoinSearch: React.FC = () => {
    const [coinName, setCoinName] = useState('');
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchCoinData(coinName);
            setCoinData(data);
        } catch (err) {
            setError('Error fetching coin data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="coin-search">
            <input
                type="text"
                value={coinName}
                onChange={(e) => setCoinName(e.target.value)}
                placeholder="Search for a coin..."
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p className="error">{error}</p>}
            {coinData && (
                <div className="coin-data">
                    <h2>{coinData.name}</h2>
                    <p>Volume Holder: {coinData.volumeHolder}</p>
                    <p>News: {coinData.news}</p>
                    <p>Parent Organization: {coinData.parentOrg}</p>
                    <p>Suspicious Transactions: {coinData.suspiciousTransactions}</p>
                </div>
            )}
        </div>
    );
};

export default CoinSearch;