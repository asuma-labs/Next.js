'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Wallet,
    Loader2,
    LogIn,
    ArrowUp,
    ArrowDown,
    X,
    TrendingUp,
    Activity
} from 'lucide-react';
import { getToken } from '@/lib/auth';

const MOCK_ASSETS = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 965000, change: 2.4, high24h: 980000, low24h: 930000, volume24h: 2100000000 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 45000, change: -1.2, high24h: 46000, low24h: 44000, volume24h: 850000000 },
];

export default function TradingPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [assets, setAssets] = useState<any[]>(MOCK_ASSETS);
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [balance, setBalance] = useState(10000000);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<any>(MOCK_ASSETS[0]);
    const [tradeAmount, setTradeAmount] = useState('');
    const [isBuying, setIsBuying] = useState(true);
    const [isTrading, setIsTrading] = useState(false);
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
    const [limitPrice, setLimitPrice] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [chartLoaded, setChartLoaded] = useState(false);

    useEffect(() => {
        const t = getToken();
        if (!t) {
            setIsGuest(true);
            setLoading(false);
            return;
        }
        setToken(t);
        setIsGuest(false);        setLoading(false);
    }, []);

    useEffect(() => {
        if (selectedAsset) {
            setLimitPrice(selectedAsset.price.toString());
        }
    }, [selectedAsset]);

    const handleTrade = () => {
        if (isGuest) {
            setMessage({ text: 'Login untuk trading', type: 'error' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }
        
        if (!selectedAsset || !tradeAmount) {
            setMessage({ text: 'Isi jumlah trading', type: 'error' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        setIsTrading(true);
        setTimeout(() => {
            setMessage({ text: 'Order berhasil!', type: 'success' });
            setIsTrading(false);
            setTradeAmount('');
            setTimeout(() => setMessage(null), 3000);
        }, 1000);
    };

    const estimatedTotal = useMemo(() => {
        const amt = parseFloat(tradeAmount) || 0;
        const prc = orderType === 'limit' ? (parseFloat(limitPrice) || 0) : (selectedAsset?.price || 0);
        return amt * prc;
    }, [tradeAmount, limitPrice, selectedAsset, orderType]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0B0E11]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    <p className="text-zinc-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0E11] text-zinc-900 dark:text-zinc-100">            <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181A20] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center text-zinc-500">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-lg font-bold">{selectedAsset?.symbol || 'BTC'}/IDR</h1>
                    </div>
                </div>
                {isGuest ? (
                    <button onClick={() => router.push('/login')} className="px-4 py-2 bg-cyan-500 text-white text-sm rounded-lg">
                        Login
                    </button>
                ) : (
                    <div className="flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span>{connected ? 'Connected' : 'Connecting...'}</span>
                    </div>
                )}
            </div>

            <div className="max-w-6xl mx-auto p-4 space-y-4">
                <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                    <div className="flex items-baseline gap-3 mb-4">
                        <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                            Rp {selectedAsset?.price.toLocaleString('id-ID') || 0}
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${selectedAsset?.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {selectedAsset?.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                            {Math.abs(selectedAsset?.change || 0)}%
                        </div>
                    </div>
                    
                    <div className="h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">
                        Chart akan muncul di sini
                    </div>
                </div>

                {!isGuest && (
                    <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex gap-4 mb-4">
                            <button onClick={() => setIsBuying(true)} className={`flex-1 py-2 font-bold rounded-lg ${isBuying ? 'bg-green-500/10 text-green-500' : 'text-zinc-500'}`}>Beli</button>
                            <button onClick={() => setIsBuying(false)} className={`flex-1 py-2 font-bold rounded-lg ${!isBuying ? 'bg-red-500/10 text-red-500' : 'text-zinc-500'}`}>Jual</button>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <button onClick={() => setOrderType('market')} className={`px-4 py-1.5 rounded-lg ${orderType === 'market' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'}`}>Market</button>
                            <button onClick={() => setOrderType('limit')} className={`px-4 py-1.5 rounded-lg ${orderType === 'limit' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'}`}>Limit</button>
                        </div>
                        <div className="space-y-4">
                            {orderType === 'limit' && (
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Harga</label>
                                    <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700" />
                                </div>
                            )}
                            <div>
                                <label className="text-xs text-zinc-500 mb-1 block">Jumlah</label>
                                <input type="number" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700" />
                            </div>

                            <button onClick={handleTrade} disabled={isTrading} className="w-full py-3.5 rounded-lg font-bold text-white bg-green-500 hover:bg-green-600 disabled:opacity-50">
                                {isTrading ? 'Processing...' : (isBuying ? 'Beli' : 'Jual')}
                            </button>
                        </div>
                    </div>
                )}

                {message && (
                    <div className={`p-4 rounded-xl ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {message.text}
                    </div>
                )}

                {isGuest && (
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                        <p className="text-cyan-600 font-bold mb-2">Mode Tamu</p>
                        <button onClick={() => router.push('/login')} className="px-6 py-2.5 bg-cyan-500 text-white rounded-lg">Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}
