export interface Coin {
    id: string;
    name: string;
    symbol: string;
    currentPrice: number;
    marketCap: number;
    volume: number;
    priceChangePercentage24h: number;
    circulatingSupply: number;
    totalSupply: number;
    allTimeHigh: number;
    allTimeLow: number;
    website: string;
    socialLinks: SocialLinks;
}

export interface SocialLinks {
    twitter?: string;
    facebook?: string;
    reddit?: string;
    telegram?: string;
    discord?: string;
}

export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: number;
    timestamp: Date;
}

export interface Wallet {
    address: string;
    balance: number;
    transactions: Transaction[];
}

export interface User {
    id: string;
    username: string;
    wallet: Wallet;
    favorites: string[];
}