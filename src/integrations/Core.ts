type InvokeLLMArgs = {
    prompt: string;
    response_json_schema?: unknown;
};

export async function InvokeLLM({ prompt }: InvokeLLMArgs): Promise<any> {
    const match = /\"([^"]+)\"/.exec(prompt) || [];
    const coinName = match[1] || 'Unknown';
    const symbol = coinName.slice(0, 4).toUpperCase();
    const basePrice = Math.max(5, Math.random() * 50000);
    const price_history = Array.from({ length: 30 }).map((_, i) => ({
        date: `Day ${i + 1}`,
        price: Number((basePrice * (0.9 + Math.random() * 0.2)).toFixed(2))
    }));
    const price = price_history[price_history.length - 1].price;
    const price24 = price_history[Math.max(0, price_history.length - 2)].price;
    const price_change_24h_percent = Number((((price - price24) / price24) * 100).toFixed(2));

    return {
        coin_name: coinName,
        coin_symbol: symbol,
        bitscore: Math.floor(40 + Math.random() * 60),
        price,
        price_change_24h_percent,
        market_cap: Math.floor(1e9 + Math.random() * 3e11),
        trading_volume_24h: Math.floor(1e7 + Math.random() * 5e9),
        wallet_holders: Math.floor(1e5 + Math.random() * 5e6),
        new_holders_24h: Math.floor(Math.random() * 50000),
        suspicious_transactions: Math.floor(Math.random() * 500),
        social_sentiment_score: Number((-1 + Math.random() * 2).toFixed(2)),
        social_mentions_24h: Math.floor(Math.random() * 200000),
        news_sentiment_score: Number((-1 + Math.random() * 2).toFixed(2)),
        news_articles: [
            `${coinName} achieves new milestone in adoption`,
            `${coinName} community releases major update`,
            `Analysts discuss long-term outlook for ${coinName}`,
        ],
        price_history,
    };
}


