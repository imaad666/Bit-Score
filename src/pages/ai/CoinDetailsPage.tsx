import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { InvokeLLM } from '../../integrations/Core';
import { createPageUrl } from '../../utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ArrowLeft, TrendingUp, TrendingDown, Users, Newspaper, AlertTriangle, HelpCircle, CheckCircle, XCircle } from 'lucide-react';

const MetricCard: React.FC<{ icon: any; label: string; value?: any; unit?: string; change?: string; changeType?: 'positive' | 'negative'; description?: string; }> = ({ icon: Icon, label, value, unit, change, changeType, description }) => {
    const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';
    const ChangeIcon = changeType === 'positive' ? TrendingUp : TrendingDown;

    return (
        <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg relative group">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <p className="text-sm text-gray-400">{label}</p>
                </div>
                <HelpCircle className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{value} <span className="text-lg text-gray-500">{unit}</span></p>
            {change && (
                <div className={`flex items-center text-sm mt-1 ${changeColor}`}>
                    <ChangeIcon className="w-4 h-4 mr-1" />
                    <span>{change}</span>
                </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-gray-300">{description}</p>
            </div>
        </div>
    );
};

const ScoreGuage: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    let color;
    if (score > 75) color = '#4ade80';
    else if (score > 40) color = '#facc15';
    else color = '#f87171';
    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="45" stroke="#374151" strokeWidth="10" fill="transparent" />
                <circle cx="64" cy="64" r="45" stroke={color} strokeWidth="10" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="text-xs text-gray-400">/ 100</span>
            </div>
        </div>
    );
};

const CoinDetailsPage: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const coin = new URLSearchParams(location.search).get('coin');
        if (coin) {
            fetchCoinData(coin);
        }
    }, [location.search]);

    const fetchCoinData = async (coin: string) => {
        setLoading(true);
        setError(null);
        setData(null);
        const prompt = `Analyze the cryptocurrency "${coin}". Provide a detailed credibility and trust analysis. Generate the following data points in a JSON object: coin_name, coin_symbol, bitscore (0-100), price (USD), price_change_24h_percent, market_cap, trading_volume_24h, wallet_holders, new_holders_24h, suspicious_transactions, social_sentiment_score (-1..1), social_mentions_24h, news_sentiment_score (-1..1), news_articles (3 strings), price_history (30 objects with date, price).`;
        try {
            const result = await InvokeLLM({ prompt });
            setData(result);
        } catch (e) {
            setError('Failed to fetch data from AI. The coin might not be well-known or an error occurred.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num?: number) => {
        if (num === undefined || num === null) return '-';
        if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
        if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
        if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
        return num.toString();
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
                <p className="mt-4 text-gray-400">AI is analyzing the blockchain...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 max-w-lg mx-auto">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        );
    }

    if (!data) return null;
    const priceChangePositive = data.price_change_24h_percent >= 0;

    return (
        <div className="max-w-7xl mx-auto">
            <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Search
            </Link>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 p-6 bg-gray-900/30 border border-gray-800 rounded-xl">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-white">{data.coin_name} <span className="text-gray-500">{data.coin_symbol}</span></h1>
                    <div className="flex items-baseline gap-4 mt-2">
                        <p className="text-3xl text-white">${data.price?.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 text-lg ${priceChangePositive ? 'text-green-400' : 'text-red-400'}`}>
                            {priceChangePositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                            <span>{data.price_change_24h_percent?.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-sm font-semibold text-blue-300 mb-2">BITSCORE</h2>
                    <ScoreGuage score={data.bitscore} />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-lg h-[400px]">
                        <h3 className="text-lg font-semibold text-white mb-4">Price History (30 Days)</h3>
                        <ResponsiveContainer width="100%" height="90%">
                            <LineChart data={data.price_history}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={(value: number) => `$${value.toFixed(2)}`} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} labelStyle={{ color: '#d1d5db' }} />
                                <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Newspaper /> Recent News</h3>
                        <div className="space-y-3">
                            {data.news_articles.map((article: string, i: number) => (
                                <div key={i} className="bg-gray-900/50 border border-gray-800 p-3 rounded-lg text-sm text-gray-300">{article}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <MetricCard icon={Users} label="Wallet Holders" value={formatNumber(data.wallet_holders)} description="Total unique wallets holding this asset." />
                    <MetricCard icon={TrendingUp} label="New Holders (24h)" value={formatNumber(data.new_holders_24h)} description="Number of new wallets that acquired this asset in the last 24 hours." />
                    <MetricCard icon={AlertTriangle} label="Suspicious Transactions" value={formatNumber(data.suspicious_transactions)} description="AI-flagged transactions that may indicate wash trading or manipulation." changeType={data.suspicious_transactions > 100 ? 'negative' : 'positive'} />
                    <MetricCard icon={data.social_sentiment_score > 0 ? CheckCircle : XCircle} label="Social Sentiment" value={data.social_sentiment_score?.toFixed(2)} description="Sentiment score from social media posts. >0 is positive, <0 is negative." changeType={data.social_sentiment_score > 0 ? 'positive' : 'negative'} />
                    <MetricCard icon={data.news_sentiment_score > 0 ? CheckCircle : XCircle} label="News Sentiment" value={data.news_sentiment_score?.toFixed(2)} description="Sentiment score from news articles. >0 is positive, <0 is negative." changeType={data.news_sentiment_score > 0 ? 'positive' : 'negative'} />
                    <MetricCard icon={Users} label="Social Mentions (24h)" value={formatNumber(data.social_mentions_24h)} description="Number of times this asset was mentioned on social media in the last 24 hours." />
                </div>
            </div>
        </div>
    );
};

export default CoinDetailsPage;


