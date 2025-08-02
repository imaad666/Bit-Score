import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinData = async (coinId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coin data:', error);
        throw error;
    }
};

export const fetchCoinNews = async (coinId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/coins/${coinId}/news`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coin news:', error);
        throw error;
    }
};

export const fetchCoinMarketData = async (coinId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        return response.data;
    } catch (error) {
        console.error('Error fetching coin market data:', error);
        throw error;
    }
};

export const fetchSuspiciousTransactions = async (walletAddress) => {
    // Placeholder for fetching suspicious transactions related to a wallet
    // This function should implement logic to analyze transaction history
    // and identify any suspicious activity.
    return []; // Return an empty array for now
};