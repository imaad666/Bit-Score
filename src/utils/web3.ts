import { ethers } from 'ethers';

let provider: ethers.providers.Web3Provider | null = null;

export const connectWallet = async (): Promise<string | null> => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            return accounts[0];
        } catch (error) {
            console.error("User denied account access or error occurred:", error);
            return null;
        }
    } else {
        console.error("No Ethereum provider found. Install MetaMask.");
        return null;
    }
};

export const getAccountBalance = async (address: string): Promise<string | null> => {
    if (!provider) {
        console.error("Wallet not connected.");
        return null;
    }
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
};

export const getTransactionHistory = async (address: string): Promise<any[]> => {
    // Placeholder for fetching transaction history
    // This function would typically call an API or use a library to fetch transaction data
    return [];
};