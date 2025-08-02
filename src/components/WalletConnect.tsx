import React, { useState } from 'react';

const WalletConnect: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert('Please install a Web3 wallet like MetaMask to use this feature.');
        }
    };

    return (
        <div className="wallet-connect">
            {isConnected ? (
                <div>
                    <p>Connected Wallet: {walletAddress}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;