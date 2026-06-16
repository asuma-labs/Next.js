'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Wallet,
    Plus,
    Minus,
    Bitcoin,
    Coins,
    Landmark,
    Gauge,
    AlertCircle,
    CheckCircle,
    Loader2,
    LogIn,
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { createChart, ColorType, CrosshairMode, AreaSeries, UTCTimestamp } from 'lightweight-charts';

interface Asset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
}

interface PortfolioAsset {
    id: string;
    symbol: string;
    amount: number;
    buyPrice: number;
}

interface TradeSuccessData {
    type: 'trade_success';
    action: 'buy' | 'sell';
    asset: Asset;
    amount: number;
    totalCost: number;
    balance: number;
    portfolio: PortfolioAsset[];
}

interface InitData {
    type: 'init';
    assets: Asset[];    balance: number;
    portfolio: PortfolioAsset[];
    history: Record<string, { time: number; value: number }[]>;
}

const MOCK_ASSETS: Asset[] = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 965000, change: 2.4 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 45000, change: -1.2 },
    { id: 'sbn', name: 'SBN Digital', symbol: 'SBN', price: 1500, change: 0.8 },
    { id: 'gauge', name: 'Gauge Token', symbol: 'GAUGE', price: 850, change: -3.5 },
];

export default function TradingPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
    const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [tradeAmount, setTradeAmount] = useState('');
    const [isBuying, setIsBuying] = useState(true);
    const [isTrading, setIsTrading] = useState(false);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);
    const historyDataRef = useRef<{ time: UTCTimestamp; value: number }[]>([]);
    const selectedAssetRef = useRef<Asset | null>(null);
    const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const t = getToken();
        if (!t) {
            setIsGuest(true);
            setToken(null);
            setLoading(false);
            setAssets(MOCK_ASSETS);
            setSelectedAsset(MOCK_ASSETS[0]);
            return;
        }
        setToken(t);
        setIsGuest(false);    }, [router]);

    useEffect(() => {
        selectedAssetRef.current = selectedAsset;
    }, [selectedAsset]);

    useEffect(() => {
        if (isGuest) {
            mockIntervalRef.current = setInterval(() => {
                setAssets((prev) =>
                    prev.map((asset) => {
                        const change = (Math.random() - 0.5) * 4;
                        const newPrice = Math.max(Math.round(asset.price + (asset.price * change / 100)), 100);
                        return {
                            ...asset,
                            price: newPrice,
                            change: parseFloat(change.toFixed(2)),
                        };
                    })
                );
            }, 2000);

            return () => {
                if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
            };
        }
    }, [isGuest]);

    useEffect(() => {
        if (!token || isGuest) return;

        const connectWebSocket = () => {
            try {
                const ws = new WebSocket(`wss://db.asuma.my.id?token=${token}`);
                wsRef.current = ws;

                ws.onopen = () => {
                    setConnected(true);
                    setError(null);
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);

                        if (data.type === 'init') {
                            const initData = data as InitData;
                            setAssets(initData.assets);
                            setBalance(initData.balance);
                            setPortfolio(initData.portfolio || []);                            setLoading(false);

                            if (initData.assets.length > 0) {
                                setSelectedAsset(initData.assets[0]);
                            }

                            if (initData.history && initData.assets[0]) {
                                const assetId = initData.assets[0].id;
                                if (initData.history[assetId]) {
                                    historyDataRef.current = initData.history[assetId].map((h: any) => ({
                                        time: h.time as UTCTimestamp,
                                        value: h.value,
                                    }));
                                }
                            }
                        }

                        if (data.type === 'price_update') {
                            setAssets(data.assets);

                            const currentAsset = selectedAssetRef.current;
                            if (currentAsset && seriesRef.current) {
                                const updatedAsset = data.assets.find((a: Asset) => a.id === currentAsset.id);
                                if (updatedAsset) {
                                    const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
                                    const lastTime = historyDataRef.current[historyDataRef.current.length - 1]?.time || 0;
                                    const time = now > lastTime ? now : (lastTime + 1) as UTCTimestamp;
                                    
                                    const newPoint = { time, value: updatedAsset.price };

                                    historyDataRef.current.push(newPoint);
                                    if (historyDataRef.current.length > 200) {
                                        historyDataRef.current = historyDataRef.current.slice(-200);
                                    }

                                    try {
                                        seriesRef.current.update(newPoint);
                                    } catch (err) {
                                        console.error('Chart update error:', err);
                                    }
                                }
                            }
                        }

                        if (data.type === 'trade_success') {
                            const tradeData = data as TradeSuccessData;
                            setBalance(tradeData.balance);
                            setPortfolio(tradeData.portfolio);
                            setMessage({
                                text: `Berhasil ${tradeData.action === 'buy' ? 'membeli' : 'menjual'} ${tradeData.amount} ${tradeData.asset.symbol}`,                                type: 'success',
                            });
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                        }

                        if (data.type === 'trade_error') {
                            setMessage({
                                text: data.error || 'Trade gagal!',
                                type: 'error',
                            });
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                        }
                    } catch (err) {
                        console.error('Parse error:', err);
                    }
                };

                ws.onclose = () => {
                    setConnected(false);
                    if (reconnectTimeout.current) {
                        clearTimeout(reconnectTimeout.current);
                    }
                    reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
                };

                ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    setError('Koneksi WebSocket gagal');
                    ws.close();
                };
            } catch (err) {
                console.error('WebSocket connection failed:', err);
                setError('Gagal terhubung ke server');
                setLoading(false);
            }
        };

        connectWebSocket();

        return () => {
            if (wsRef.current) wsRef.current.close();
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
        };
    }, [token, isGuest]);

    useEffect(() => {
        if (!chartContainerRef.current || !selectedAsset) return;
        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
            seriesRef.current = null;
        }

        const isDark = document.documentElement.classList.contains('dark');

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: isDark ? '#0a0c10' : '#ffffff' },
                textColor: isDark ? '#d1d5db' : '#1f2937',
            },
            grid: {
                vertLines: { color: isDark ? '#1e2330' : '#e5e7eb' },
                horzLines: { color: isDark ? '#1e2330' : '#e5e7eb' },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                borderColor: isDark ? '#1e2330' : '#e5e7eb',
            },
            timeScale: {
                borderColor: isDark ? '#1e2330' : '#e5e7eb',
                timeVisible: true,
                secondsVisible: false,
            },
        });

        chartRef.current = chart;

        const areaSeries = chart.addSeries(AreaSeries, {
            lineColor: '#00e5a0',
            topColor: '#00e5a030',
            bottomColor: '#00e5a005',
            lineWidth: 2,
        });

        seriesRef.current = areaSeries;

        let chartData = historyDataRef.current;
        if (!chartData || chartData.length === 0) {
            const now = new Date();
            chartData = [];
            for (let i = 0; i < 30; i++) {
                const time = new Date(now.getTime() - (30 - i) * 10000);
                const basePrice = selectedAsset.price || 965000;                const randomChange = (Math.random() - 0.5) * 1000;
                chartData.push({
                    time: Math.floor(time.getTime() / 1000) as UTCTimestamp,
                    value: Math.max(basePrice + randomChange, 100),
                });
            }
            historyDataRef.current = chartData;
        }

        try {
            areaSeries.setData(chartData);
            chart.timeScale().fitContent();
        } catch (err) {
            console.error('Chart setData error:', err);
        }

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                });
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
                seriesRef.current = null;
            }
        };
    }, [selectedAsset]);

    useEffect(() => {
        if (isGuest && seriesRef.current && selectedAsset) {
            const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
            const lastTime = historyDataRef.current[historyDataRef.current.length - 1]?.time || 0;
            const time = now > lastTime ? now : (lastTime + 1) as UTCTimestamp;
            
            const newPoint = { time, value: selectedAsset.price };

            historyDataRef.current.push(newPoint);
            if (historyDataRef.current.length > 200) {
                historyDataRef.current = historyDataRef.current.slice(-200);
            }

            try {                seriesRef.current.update(newPoint);
            } catch (err) {
                console.error('Chart update error:', err);
            }
        }
    }, [assets, isGuest, selectedAsset]);

    const handleTrade = () => {
        if (isGuest) {
            setMessage({ text: 'Login terlebih dahulu untuk trading', type: 'error' });
            setTimeout(() => setMessage(null), 4000);
            return;
        }

        if (!selectedAsset || !tradeAmount || !wsRef.current) {
            setMessage({ text: 'Pilih aset dan masukkan jumlah', type: 'error' });
            return;
        }

        const amount = parseFloat(tradeAmount);
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Masukkan jumlah yang valid', type: 'error' });
            return;
        }

        setIsTrading(true);

        wsRef.current.send(JSON.stringify({
            type: 'trade',
            action: isBuying ? 'buy' : 'sell',
            assetId: selectedAsset.id,
            amount: amount,
        }));

        setTradeAmount('');
    };

    const totalPortfolioValue = portfolio.reduce((total, p) => {
        const asset = assets.find((a) => a.id === p.id);
        return total + (asset ? p.amount * asset.price : 0);
    }, 0);

    const totalProfitLoss = portfolio.reduce((total, p) => {
        const asset = assets.find((a) => a.id === p.id);
        return total + (asset ? p.amount * (asset.price - p.buyPrice) : 0);
    }, 0);

    const getAssetIcon = (id: string) => {
        switch (id) {
            case 'btc': return <Bitcoin className="w-5 h-5" />;            case 'eth': return <Coins className="w-5 h-5" />;
            case 'sbn': return <Landmark className="w-5 h-5" />;
            case 'gauge': return <Gauge className="w-5 h-5" />;
            default: return <Coins className="w-5 h-5" />;
        }
    };

    const getAssetColor = (id: string) => {
        switch (id) {
            case 'btc': return 'text-orange-500';
            case 'eth': return 'text-indigo-500';
            case 'sbn': return 'text-emerald-500';
            case 'gauge': return 'text-purple-500';
            default: return 'text-zinc-500';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Menghubungkan ke server...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] p-6">
                <div className="p-4 rounded-full bg-red-500/10">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-red-500 font-medium">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-xl"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] text-zinc-900 dark:text-white transition-colors duration-300 p-6 pt-24 pb-24 relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl opacity-75 dark:opacity-100" />
                <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-indigo-500/10 blur-3xl opacity-75 dark:opacity-100" />            </div>

            <div className="w-full max-w-6xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2 text-sm">
                        {isGuest ? (
                            <>
                                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                <span className="text-zinc-500">Guest Mode</span>
                                <button
                                    onClick={() => router.push('/login')}
                                    className="ml-2 px-3 py-1 bg-cyan-500 text-white text-xs rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-1"
                                >
                                    <LogIn className="w-3 h-3" />
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-zinc-500">{connected ? 'Live' : 'Reconnecting...'}</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-650 via-indigo-650 to-sky-650 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
                        Virtual Trading
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {isGuest ? 'Mode tamu - Lihat pergerakan harga secara real-time' : 'Trading aset virtual secara real-time dengan data historis'}
                    </p>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-xl ${message.type === 'success'
                            ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
                        } flex items-center gap-3`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span>{message.text}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">                    <div className="lg:col-span-1 space-y-4">
                        {!isGuest && (
                            <>
                                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500">Saldo</p>
                                    <p className="text-xl font-bold mt-1">Rp {balance.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500">Portfolio</p>
                                    <p className="text-xl font-bold mt-1">Rp {totalPortfolioValue.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500">P/L</p>
                                    <p className={`text-xl font-bold mt-1 ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {totalProfitLoss >= 0 ? '+' : ''}
                                        Rp {totalProfitLoss.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                    <p className="text-xs text-zinc-500">Aset</p>
                                    <p className="text-xl font-bold mt-1">{portfolio.filter(p => p.amount > 0).length}</p>
                                </div>
                            </>
                        )}

                        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs text-zinc-500 mb-3">Asset List</p>
                            <div className="space-y-2">
                                {assets.map((asset) => {
                                    const isSelected = selectedAsset?.id === asset.id;
                                    const userAsset = portfolio.find((p) => p.id === asset.id);
                                    return (
                                        <button
                                            key={asset.id}
                                            onClick={() => setSelectedAsset(asset)}
                                            className={`w-full flex items-center justify-between p-2 rounded-lg transition-all text-sm ${isSelected
                                                    ? 'bg-cyan-500/10 border border-cyan-500/20'
                                                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`${getAssetColor(asset.id)}`}>
                                                    {getAssetIcon(asset.id)}
                                                </div>
                                                <span>{asset.symbol}</span>
                                                {userAsset && userAsset.amount > 0 && (
                                                    <span className="text-xs text-zinc-500">
                                                        {userAsset.amount.toFixed(4)}
                                                    </span>
                                                )}                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-xs">Rp {asset.price.toLocaleString('id-ID')}</p>
                                                <p className={`text-xs ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                    {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(1)}%
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">
                                        {selectedAsset?.name || 'Pilih Aset'}
                                    </h3>
                                    <p className="text-sm text-zinc-500">
                                        {selectedAsset?.symbol || ''} · Rp {selectedAsset?.price.toLocaleString('id-ID') || 0}
                                    </p>
                                </div>
                                <div className={`text-sm font-semibold ${selectedAsset?.change && selectedAsset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedAsset?.change && selectedAsset.change >= 0 ? '+' : ''}
                                    {selectedAsset?.change?.toFixed(2) || 0}%
                                </div>
                            </div>
                            <div ref={chartContainerRef} className="w-full h-[400px]" />

                            {!isGuest && (
                                <>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                                                Jumlah {selectedAsset?.symbol || ''}
                                            </label>
                                            <input
                                                type="number"
                                                value={tradeAmount}
                                                onChange={(e) => setTradeAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                            />
                                            <div className="mt-2 flex gap-2">
                                                <button
                                                    onClick={() => setTradeAmount('0.001')}
                                                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"                                                >
                                                    0.001
                                                </button>
                                                <button
                                                    onClick={() => setTradeAmount('0.01')}
                                                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                                >
                                                    0.01
                                                </button>
                                                <button
                                                    onClick={() => setTradeAmount('0.1')}
                                                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                                >
                                                    0.1
                                                </button>
                                                <button
                                                    onClick={() => setTradeAmount('1')}
                                                    className="px-2 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                                >
                                                    1
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-end">
                                            <button
                                                onClick={() => setIsBuying(true)}
                                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${isBuying
                                                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                                    }`}
                                            >
                                                Buy
                                            </button>
                                            <button
                                                onClick={() => setIsBuying(false)}
                                                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${!isBuying
                                                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                                                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                                    }`}
                                            >
                                                Sell
                                            </button>
                                            <button
                                                onClick={handleTrade}
                                                disabled={isTrading}
                                                className={`px-6 py-2.5 rounded-xl font-semibold text-white transition-all disabled:opacity-50 ${isBuying
                                                        ? 'bg-green-600 hover:bg-green-700'
                                                        : 'bg-red-600 hover:bg-red-700'
                                                    }`}
                                            >                                                {isTrading ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                                ) : isBuying ? (
                                                    <span className="flex items-center gap-2">
                                                        <Plus className="w-4 h-4" /> Buy
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        <Minus className="w-4 h-4" /> Sell
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-sm text-zinc-500">
                                        <span>Total: Rp {(parseFloat(tradeAmount || '0') * (selectedAsset?.price || 0)).toLocaleString('id-ID')}</span>
                                        <span>Saldo: Rp {balance.toLocaleString('id-ID')}</span>
                                    </div>
                                </>
                            )}

                            {isGuest && (
                                <div className="mt-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                                    <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-2">
                                        Mode Tamu - Lihat Saja
                                    </p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                                        Login untuk mulai trading dan kelola portofolio
                                    </p>
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="px-6 py-2.5 bg-cyan-500 text-white font-semibold rounded-xl hover:bg-cyan-600 transition-colors flex items-center gap-2 mx-auto"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        Login Sekarang
                                    </button>
                                </div>
                            )}
                        </div>

                        {!isGuest && portfolio.filter((p) => p.amount > 0).length > 0 && (
                            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    My Portfolio
                                </h3>
                                <div className="space-y-2">
                                    {portfolio
                                        .filter((p) => p.amount > 0)
                                        .map((p) => {                                            const asset = assets.find((a) => a.id === p.id);
                                            if (!asset) return null;
                                            const currentValue = p.amount * asset.price;
                                            const profit = currentValue - p.amount * p.buyPrice;

                                            return (
                                                <div
                                                    key={p.id}
                                                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 ${getAssetColor(p.id)}`}>
                                                            {getAssetIcon(p.id)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{p.symbol}</p>
                                                            <p className="text-sm text-zinc-500">
                                                                {p.amount.toFixed(4)} · Buy: Rp {p.buyPrice.toLocaleString('id-ID')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">Rp {currentValue.toLocaleString('id-ID')}</p>
                                                        <p className={`text-sm ${profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                                            {profit >= 0 ? '+' : ''}
                                                            Rp {profit.toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
