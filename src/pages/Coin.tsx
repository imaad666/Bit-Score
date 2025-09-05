import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCoinDetails, fetchCoinMarketData } from '../utils/ragModel';
import { formatCompactNumber, formatCurrency } from '../utils/format';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const ranges = [
    { key: '1', label: '1D', days: 1 },
    { key: '7', label: '1W', days: 7 },
    { key: '30', label: '1M', days: 30 },
    { key: '90', label: '3M', days: 90 },
    { key: '180', label: '6M', days: 180 },
    { key: '365', label: '1Y', days: 365 },
    { key: 'max', label: 'All', days: 'max' as const },
];

type ChartPoint = { time: number; price: number };

const Coin: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<any>(null);
    const [chart, setChart] = useState<ChartPoint[]>([]);
    const [range, setRange] = useState<string | number>(7);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const [d, c] = await Promise.all([
                    fetchCoinDetails(id),
                    fetchCoinMarketData(id, range),
                ]);
                setDetails(d);
                const points: ChartPoint[] = (c.prices || []).map((p: [number, number]) => ({ time: p[0], price: p[1] }));
                setChart(points);
            } catch (e) {
                setError('Failed to load coin');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, range]);

    const formatted = useMemo(() => chart.map(p => ({
        time: new Date(p.time).toLocaleDateString(),
        price: p.price,
    })), [chart]);

    if (loading) return <div className="page"><div className="content">Loading...</div></div>;
    if (error) return <div className="page"><div className="content">{error}</div></div>;
    if (!details) return null;

    return (
        <div className="page">
            <header className="header">
                <div className="brand">BitScore</div>
                <div className="tagline">{details.name}</div>
            </header>
            <main className="content coin-view">
                <div className="chart-panel">
                    <div className="panel-header">
                        <h2>Price</h2>
                        <div className="range-switch">
                            {ranges.map(r => (
                                <button key={r.key} className={String(range) === String(r.days) ? 'active' : ''} onClick={() => setRange(r.days)}>{r.label}</button>
                            ))}
                        </div>
                    </div>
                    <div className="chart-wrap">
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart data={formatted} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                                <XAxis dataKey="time" stroke="#888" hide={formatted.length > 60} />
                                <YAxis stroke="#888" domain={[
                                    (dataMin: number) => Math.floor(dataMin),
                                    (dataMax: number) => Math.ceil(dataMax)
                                ]} />
                                <Tooltip contentStyle={{ background: '#121212', border: '1px solid #333' }} />
                                <Line type="monotone" dataKey="price" stroke="#6ee7ff" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="tiles">
                    <div className="tile"><div className="tile-label">Current Price</div><div className="tile-value">{formatCurrency(details.price)}</div></div>
                    <div className="tile"><div className="tile-label">Market Cap</div><div className="tile-value">{formatCompactNumber(details.marketCap)}</div></div>
                    <div className="tile"><div className="tile-label">24h Change</div><div className="tile-value">—</div></div>
                    <div className="tile"><div className="tile-label">Circulating Supply</div><div className="tile-value">{formatCompactNumber(details.circulatingSupply)}</div></div>
                    <div className="tile"><div className="tile-label">Total Supply</div><div className="tile-value">{formatCompactNumber(details.totalSupply)}</div></div>
                    <div className="tile"><div className="tile-label">Volume (24h)</div><div className="tile-value">{formatCompactNumber(details.volume24h)}</div></div>
                    <div className="tile"><div className="tile-label">All-Time High</div><div className="tile-value">{formatCurrency(details.ath)}</div></div>
                    <div className="tile"><div className="tile-label">All-Time Low</div><div className="tile-value">{formatCurrency(details.atl)}</div></div>
                    <div className="tile"><div className="tile-label">Bought Today</div><div className="tile-value">—</div></div>
                    <div className="tile"><div className="tile-label">Sold Today</div><div className="tile-value">—</div></div>
                    <div className="tile"><div className="tile-label">Social Score</div><div className="tile-value">—</div></div>
                    <div className="tile"><div className="tile-label">Risk Score</div><div className="tile-value">—</div></div>
                </div>
            </main>
        </div>
    );
};

export default Coin;


