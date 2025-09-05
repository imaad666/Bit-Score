import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Layout from './pages/ai/Layout';
import AIHome from './pages/ai/HomePage';
import AICoinDetails from './pages/ai/CoinDetailsPage';
import './styles/main.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/coin/:id" element={<Coin />} />
                <Route path="/ai" element={<Layout><AIHome /></Layout>} />
                <Route path="/ai/coin-details" element={<Layout><AICoinDetails /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;


