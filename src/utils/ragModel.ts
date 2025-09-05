import axios from 'axios';

const API_BASE_URL = '/api';

export const fetchCoinData = async (coinId: string) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/coins/${encodeURIComponent(coinId)}`);
        return {
            name: data.name,
            volumeHolder: 'N/A',
            news: 'No recent news available',
            parentOrg: data.asset_platform_id || 'N/A',
            suspiciousTransactions: 'None detected',
        };
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error;
    }
};

export const fetchTrendingCoins = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/trending`);
        return data.map((coin: any) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            marketCap: coin.market_cap,
            price: coin.current_price,
        }));
    } catch (error) {
        console.error('Error fetching trending coins:', error);
        throw error;
    }
};

export const fetchCoinDetails = async (coinId: string) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/coins/${encodeURIComponent(coinId)}`);

        const socials: Array<{ platform: string; link: string }> = [];
        if (data.links?.homepage?.[0]) socials.push({ platform: 'Website', link: data.links.homepage[0] });
        if (data.links?.twitter_screen_name) socials.push({ platform: 'Twitter', link: `https://twitter.com/${data.links.twitter_screen_name}` });
        if (data.links?.subreddit_url) socials.push({ platform: 'Reddit', link: data.links.subreddit_url });
        if (data.links?.telegram_channel_identifier) socials.push({ platform: 'Telegram', link: `https://t.me/${data.links.telegram_channel_identifier}` });

        return {
            name: data.name,
            price: data.market_data?.current_price?.usd ?? null,
            news: [],
            highestVolumeHolder: 'N/A',
            socials,
            suspiciousTransactions: [],
        };
    } catch (error) {
        console.error('Error fetching coin details:', error);
        throw error;
    }
};

export const fetchCoinMarketData = async (coinId: string) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/coins/${encodeURIComponent(coinId)}/market_chart`, {
            params: { vs_currency: 'usd', days: 7 },
        });
        return data;
    } catch (error) {
        console.error('Error fetching coin market data:', error);
        throw error;
    }
};

export const fetchSuspiciousTransactions = async (_walletAddress: string) => {
    // Placeholder for fetching suspicious transactions related to a wallet
    // This function should implement logic to analyze transaction history
    // and identify any suspicious activity.
    return [] as any[];
};