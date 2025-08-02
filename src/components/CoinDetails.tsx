import React, { useEffect, useState } from 'react';
import { fetchCoinDetails } from '../utils/ragModel';
import { CoinDetailsProps } from '../types';

const CoinDetails: React.FC<CoinDetailsProps> = ({ coinId }) => {
    const [coinData, setCoinData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCoinDetails = async () => {
            try {
                const data = await fetchCoinDetails(coinId);
                setCoinData(data);
            } catch (err) {
                setError('Failed to fetch coin details');
            } finally {
                setLoading(false);
            }
        };

        getCoinDetails();
    }, [coinId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="coin-details">
            <h2>{coinData.name} Details</h2>
            <p>Current Price: ${coinData.price}</p>
            <h3>News</h3>
            <ul>
                {coinData.news.map((newsItem: any, index: number) => (
                    <li key={index}>{newsItem.title}</li>
                ))}
            </ul>
            <h3>Highest Volume Holder</h3>
            <p>{coinData.highestVolumeHolder}</p>
            <h3>Social Media Links</h3>
            <ul>
                {coinData.socials.map((social: any, index: number) => (
                    <li key={index}><a href={social.link} target="_blank" rel="noopener noreferrer">{social.platform}</a></li>
                ))}
            </ul>
            <h3>Suspicious Transactions</h3>
            <ul>
                {coinData.suspiciousTransactions.map((transaction: any, index: number) => (
                    <li key={index}>{transaction}</li>
                ))}
            </ul>
        </div>
    );
};

export default CoinDetails;