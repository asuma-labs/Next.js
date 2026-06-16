'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
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
    Clock,
    ArrowUp,
    ArrowDown,
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { createChart, ColorType, CrosshairMode, CandlestickSeries, UTCTimestamp } from 'lightweight-charts';

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
    assets: Asset[];
    balance: number;
    portfolio: PortfolioAsset[];
    history: Record<string, { time: number; value: number }[]>;
}

const MOCK_ASSETS: Asset[] = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 965000, change: 2.4 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 45000, change: -1.2 },
    { id: 'sbn', name: 'SBN Digital', symbol: 'SBN', price: 1500, change: 0.8 },
    { id: 'gauge', name: 'Gauge Token', symbol: 'GAUGE', price: 850, change: -3.5 },
];

const TIMEFRAMES = ['1m', '5m', '15m', '1H', '4H', '1D'];

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
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
    const [limitPrice, setLimitPrice] = useState('');
    const [timeframe, setTimeframe] = useState('1m');

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);
    const selectedAssetRef = useRef<Asset | null>(null);
    const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const candleDataRef = useRef<any[]>([]);

    useEffect(() => {
        const t = getToken();
        if (!t) {
            setIsGuest(true);            setToken(null);
            setLoading(false);
            setAssets(MOCK_ASSETS);
            setSelectedAsset(MOCK_ASSETS[0]);
            return;
        }
        setToken(t);
        setIsGuest(false);
    }, [router]);

    useEffect(() => {
        selectedAssetRef.current = selectedAsset;
        if (selectedAsset) {
            setLimitPrice(selectedAsset.price.toString());
        }
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

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#0ecb81',
            downColor: '#f6465d',
            borderUpColor: '#0ecb81',
            borderDownColor: '#f6465d',
            wickUpColor: '#0ecb81',
            wickDownColor: '#f6465d',
        });

        seriesRef.current = candleSeries;

        const now = new Date();
        const mockCandles = [];
        let currentPrice = selectedAsset.price;
        
        for (let i = 50; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60000);
            const open = currentPrice;
            const volatility = currentPrice * 0.005;
            const close = open + (Math.random() - 0.5) * volatility;
            const high = Math.max(open, close) + Math.random() * volatility * 0.5;
            const low = Math.min(open, close) - Math.random() * volatility * 0.5;
            
            mockCandles.push({                time: Math.floor(time.getTime() / 1000) as UTCTimestamp,
                open,
                high,
                low,
                close,
            });
            currentPrice = close;
        }

        candleDataRef.current = mockCandles;

        try {
            candleSeries.setData(mockCandles);
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
        if (seriesRef.current && selectedAsset) {
            const updateCandle = (price: number) => {
                const candles = candleDataRef.current;
                if (candles.length === 0) return;

                const lastCandle = candles[candles.length - 1];
                const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
                
                const updatedCandle = {
                    ...lastCandle,
                    close: price,                    high: Math.max(lastCandle.high, price),
                    low: Math.min(lastCandle.low, price),
                };

                if (now - lastCandle.time > 60) {
                    const newCandle = {
                        time: now,
                        open: price,
                        high: price,
                        low: price,
                        close: price,
                    };
                    candles.push(newCandle);
                    if (candles.length > 100) candles.shift();
                    seriesRef.current.update(newCandle);
                } else {
                    candles[candles.length - 1] = updatedCandle;
                    seriesRef.current.update(updatedCandle);
                }
            };

            if (isGuest) {
                updateCandle(selectedAsset.price);
            }
        }
    }, [assets, isGuest, selectedAsset]);

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
                            setPortfolio(initData.portfolio || []);
                            setLoading(false);
                            if (initData.assets.length > 0) {
                                setSelectedAsset(initData.assets[0]);
                            }
                        }

                        if (data.type === 'price_update') {
                            setAssets(data.assets);
                            const currentAsset = selectedAssetRef.current;
                            if (currentAsset && seriesRef.current) {
                                const updatedAsset = data.assets.find((a: Asset) => a.id === currentAsset.id);
                                if (updatedAsset) {
                                    const candles = candleDataRef.current;
                                    if (candles.length > 0) {
                                        const lastCandle = candles[candles.length - 1];
                                        const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
                                        const updatedCandle = {
                                            ...lastCandle,
                                            close: updatedAsset.price,
                                            high: Math.max(lastCandle.high, updatedAsset.price),
                                            low: Math.min(lastCandle.low, updatedAsset.price),
                                        };

                                        if (now - lastCandle.time > 60) {
                                            const newCandle = {
                                                time: now,
                                                open: updatedAsset.price,
                                                high: updatedAsset.price,
                                                low: updatedAsset.price,
                                                close: updatedAsset.price,
                                            };
                                            candles.push(newCandle);
                                            if (candles.length > 100) candles.shift();
                                            seriesRef.current.update(newCandle);
                                        } else {
                                            candles[candles.length - 1] = updatedCandle;
                                            seriesRef.current.update(updatedCandle);
                                        }
                                    }
                                }
                            }
                        }

                        if (data.type === 'trade_success') {
                            const tradeData = data as TradeSuccessData;
                            setBalance(tradeData.balance);
                            setPortfolio(tradeData.portfolio);
                            setMessage({
                                text: `Berhasil ${tradeData.action === 'buy' ? 'membeli' : 'menjual'} ${tradeData.amount} ${tradeData.asset.symbol}`,
                                type: 'success',                            });
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

                ws.onerror = () => {
                    setError('Koneksi WebSocket gagal');
                    ws.close();
                };
            } catch (err) {
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

    const handleTrade = () => {
        if (isGuest) {
            setMessage({ text: 'Login terlebih dahulu untuk trading', type: 'error' });
            setTimeout(() => setMessage(null), 4000);
            return;
        }
        if (!selectedAsset || !tradeAmount) {
            setMessage({ text: 'Pilih aset dan masukkan jumlah', type: 'error' });
            return;
        }

        const amount = parseFloat(tradeAmount);
        if (isNaN(amount) || amount <= 0) {
            setMessage({ text: 'Masukkan jumlah yang valid', type: 'error' });
            return;
        }

        setIsTrading(true);

        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({
                type: 'trade',
                action: isBuying ? 'buy' : 'sell',
                assetId: selectedAsset.id,
                amount: amount,
            }));
        }

        setTradeAmount('');
    };

    const totalPortfolioValue = portfolio.reduce((total, p) => {
        const asset = assets.find((a) => a.id === p.id);
        return total + (asset ? p.amount * asset.price : 0);
    }, 0);

    const getAssetIcon = (id: string) => {
        switch (id) {
            case 'btc': return <Bitcoin className="w-5 h-5" />;
            case 'eth': return <Coins className="w-5 h-5" />;
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
    const mockOrderBook = useMemo(() => {
        if (!selectedAsset) return { asks: [], bids: [] };
        const basePrice = selectedAsset.price;
        const asks = Array.from({ length: 8 }, (_, i) => ({
            price: basePrice + (i + 1) * (basePrice * 0.001),
            amount: (Math.random() * 2).toFixed(4),
            total: 0,
        }));
        const bids = Array.from({ length: 8 }, (_, i) => ({
            price: basePrice - (i + 1) * (basePrice * 0.001),
            amount: (Math.random() * 2).toFixed(4),
            total: 0,
        }));
        return { asks, bids };
    }, [selectedAsset]);

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
        <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0E11] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181A20] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${getAssetColor(selectedAsset?.id || 'btc')} bg-zinc-100 dark:bg-zinc-800`}>
                            {getAssetIcon(selectedAsset?.id || 'btc')}
                        </div>
                        <div>
                            <h1 className="text-lg font-bold flex items-center gap-2">
                                {selectedAsset?.symbol}/IDR
                                <span className="text-xs font-normal text-zinc-500">{selectedAsset?.name}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isGuest ? (
                        <button
                            onClick={() => router.push('/login')}
                            className="px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2"
                        >
                            <LogIn className="w-4 h-4" />
                            Login
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 text-sm">
                            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                            <span className="text-zinc-500">{connected ? 'Connected' : 'Disconnected'}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-9 space-y-4">
                    <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <div className="text-3xl font-bold text-zinc-900 dark:text-white">
                                    Rp {selectedAsset?.price.toLocaleString('id-ID')}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${selectedAsset && selectedAsset.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                    {selectedAsset && selectedAsset.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    {Math.abs(selectedAsset?.change || 0)}%
                                </div>
                            </div>
                            <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                {TIMEFRAMES.map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}                                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                            timeframe === tf
                                                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                                                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                        }`}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div ref={chartContainerRef} className="w-full h-[400px] rounded-lg overflow-hidden" />
                    </div>

                    {!isGuest && (
                        <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <div className="flex gap-4 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                <button
                                    onClick={() => setIsBuying(true)}
                                    className={`flex-1 py-2 text-center font-bold rounded-lg transition-all ${
                                        isBuying ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    Beli
                                </button>
                                <button
                                    onClick={() => setIsBuying(false)}
                                    className={`flex-1 py-2 text-center font-bold rounded-lg transition-all ${
                                        !isBuying ? 'bg-[#f6465d]/10 text-[#f6465d]' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                >
                                    Jual
                                </button>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => setOrderType('market')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                        orderType === 'market' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'
                                    }`}
                                >
                                    Market
                                </button>
                                <button
                                    onClick={() => setOrderType('limit')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                                        orderType === 'limit' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'
                                    }`}
                                >                                    Limit
                                </button>
                            </div>

                            <div className="space-y-4">
                                {orderType === 'limit' && (
                                    <div>
                                        <label className="text-xs text-zinc-500 mb-1 block">Harga (IDR)</label>
                                        <input
                                            type="number"
                                            value={limitPrice}
                                            onChange={(e) => setLimitPrice(e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Jumlah {selectedAsset?.symbol}</label>
                                    <input
                                        type="number"
                                        value={tradeAmount}
                                        onChange={(e) => setTradeAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        {['25%', '50%', '75%', '100%'].map((pct) => (
                                            <button
                                                key={pct}
                                                className="flex-1 py-1 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                            >
                                                {pct}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleTrade}
                                    disabled={isTrading}
                                    className={`w-full py-3.5 rounded-lg font-bold text-white transition-all disabled:opacity-50 ${
                                        isBuying ? 'bg-[#0ecb81] hover:bg-[#0ecb81]/90' : 'bg-[#f6465d] hover:bg-[#f6465d]/90'
                                    }`}
                                >
                                    {isTrading ? (
                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                    ) : isBuying ? (
                                        `Beli ${selectedAsset?.symbol}`
                                    ) : (
                                        `Jual ${selectedAsset?.symbol}`                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {isGuest && (
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                            <p className="text-cyan-600 dark:text-cyan-400 font-bold mb-2">Mode Tamu Aktif</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Login untuk mengakses fitur trading, portofolio, dan riwayat transaksi.</p>
                            <button
                                onClick={() => router.push('/login')}
                                className="px-6 py-2.5 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                Login Sekarang
                            </button>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between text-xs font-semibold text-zinc-500">
                            <span>Harga (IDR)</span>
                            <span>Jumlah</span>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                            {mockOrderBook.asks.slice().reverse().map((ask, i) => (
                                <div key={`ask-${i}`} className="flex justify-between px-3 py-1 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer">
                                    <span className="text-[#f6465d]">{ask.price.toLocaleString('id-ID')}</span>
                                    <span className="text-zinc-600 dark:text-zinc-400">{ask.amount}</span>
                                </div>
                            ))}
                        </div>
                        <div className="py-2 px-3 text-lg font-bold text-center border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <span className={selectedAsset && selectedAsset.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}>
                                {selectedAsset?.price.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                            {mockOrderBook.bids.map((bid, i) => (
                                <div key={`bid-${i}`} className="flex justify-between px-3 py-1 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer">
                                    <span className="text-[#0ecb81]">{bid.price.toLocaleString('id-ID')}</span>
                                    <span className="text-zinc-600 dark:text-zinc-400">{bid.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!isGuest && (
                        <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                                <Wallet className="w-4 h-4" />
                                Saldo & Aset
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                                    <span className="text-sm text-zinc-500">Saldo IDR</span>
                                    <span className="font-bold">Rp {balance.toLocaleString('id-ID')}</span>
                                </div>
                                {portfolio.filter((p) => p.amount > 0).map((p) => {
                                    const asset = assets.find((a) => a.id === p.id);
                                    if (!asset) return null;
                                    return (
                                        <div key={p.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-sm ${getAssetColor(p.id)}`}>{p.symbol}</span>
                                                <span className="text-xs text-zinc-500">{p.amount.toFixed(4)}</span>
                                            </div>
                                            <span className="font-medium text-sm">Rp {(p.amount * asset.price).toLocaleString('id-ID')}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
