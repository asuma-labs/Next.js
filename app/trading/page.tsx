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
    Clock,
    X,
    TrendingUp,
    Activity
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { createChart, CandlestickSeries, HistogramSeries, UTCTimestamp } from 'lightweight-charts';

interface Asset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    high24h: number;
    low24h: number;
    volume24h: number;
}

interface PortfolioAsset {
    id: string;
    symbol: string;
    amount: number;
    buyPrice: number;
}

interface OpenOrder {
    id: string;
    symbol: string;
    side: 'buy' | 'sell';
    type: 'limit' | 'market';
    price: number;
    amount: number;
    total: number;
    time: string;
}

interface TradeHistory {    id: string;
    price: number;
    amount: number;
    time: string;
    side: 'buy' | 'sell';
}

const MOCK_ASSETS: Asset[] = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 965000, change: 2.4, high24h: 980000, low24h: 930000, volume24h: 2100000000 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 45000, change: -1.2, high24h: 46000, low24h: 44000, volume24h: 850000000 },
    { id: 'sbn', name: 'SBN Digital', symbol: 'SBN', price: 1500, change: 0.8, high24h: 1550, low24h: 1480, volume24h: 120000000 },
    { id: 'gauge', name: 'Gauge Token', symbol: 'GAUGE', price: 850, change: -3.5, high24h: 900, low24h: 820, volume24h: 45000000 },
];

const TIMEFRAMES = ['1m', '5m', '15m', '1H', '4H', '1D'];

export default function TradingPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
    const [balance, setBalance] = useState(10000000);
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
    const [activeTab, setActiveTab] = useState<'open' | 'history'>('open');

    const [priceDirection, setPriceDirection] = useState<'up' | 'down' | 'neutral'>('neutral');
    const [openOrders, setOpenOrders] = useState<OpenOrder[]>([]);
    const [lastTrades, setLastTrades] = useState<TradeHistory[]>([]);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const candleSeriesRef = useRef<any>(null);
    const volumeSeriesRef = useRef<any>(null);
    const selectedAssetRef = useRef<Asset | null>(null);
    const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const candleDataRef = useRef<any[]>([]);
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
        setIsGuest(false);
    }, [router]);

    useEffect(() => {
        selectedAssetRef.current = selectedAsset;
        if (selectedAsset) {
            setLimitPrice(selectedAsset.price.toString());
        }
    }, [selectedAsset]);

    useEffect(() => {
        if (!token || isGuest) return;

        const connectWebSocket = () => {
            try {
                const wsUrl = `wss://db.asuma.my.id?token=${token}`;
                const ws = new WebSocket(wsUrl);
                wsRef.current = ws;

                ws.onopen = () => {
                    console.log('✅ WebSocket connected');
                    setConnected(true);
                    setError(null);
                };

                ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data);
                        console.log('📩 WebSocket message:', data.type, data);

                        if (data.type === 'init') {
                            const assetsData = data.assets || [];
                            setAssets(assetsData);
                            setBalance(data.balance || 0);
                            setPortfolio(data.portfolio || []);
                            setLoading(false);

                            if (assetsData.length > 0) {                                const firstAsset = assetsData[0];
                                setSelectedAsset(firstAsset);
                                
                                if (data.marketData && data.marketData[firstAsset.id]) {
                                    const marketData = data.marketData[firstAsset.id];
                                    if (marketData.history && marketData.history.length > 0) {
                                        const candles = marketData.history.map((h: any) => ({
                                            time: h.time as UTCTimestamp,
                                            open: h.open || h.value || 0,
                                            high: h.high || h.value || 0,
                                            low: h.low || h.value || 0,
                                            close: h.close || h.value || 0,
                                        }));
                                        candleDataRef.current = candles;
                                    }
                                }
                            }
                        }

                        if (data.type === 'order_book_update') {
                            if (data.assetId && data.depth) {
                                setAssets(prev => prev.map(asset => 
                                    asset.id === data.assetId 
                                        ? { ...asset, price: data.depth.lastPrice || asset.price, volume24h: data.depth.volume24h || 0 }
                                        : asset
                                ));
                                
                                if (selectedAsset?.id === data.assetId) {
                                    setSelectedAsset(prev => prev ? {
                                        ...prev,
                                        price: data.depth.lastPrice || prev.price,
                                    } : null);
                                }
                            }
                        }

                        if (data.type === 'new_trade') {
                            if (data.trades && data.trades.length > 0) {
                                const newTrades: TradeHistory[] = data.trades.map((t: any) => ({
                                    id: t.id,
                                    price: t.price,
                                    amount: t.amount,
                                    time: new Date(t.timestamp).toLocaleTimeString('id-ID'),
                                    side: t.takerSide,
                                }));
                                setLastTrades(prev => [...newTrades, ...prev].slice(0, 15));
                                
                                const lastTrade = data.trades[data.trades.length - 1];
                                if (data.assetId) {
                                    setAssets(prev => prev.map(asset =>                                        asset.id === data.assetId
                                            ? { ...asset, price: lastTrade.price }
                                            : asset
                                    ));
                                    if (selectedAsset?.id === data.assetId) {
                                        setSelectedAsset(prev => prev ? { ...prev, price: lastTrade.price } : null);
                                    }
                                }
                            }
                        }

                        if (data.type === 'trade_executed') {
                            setMessage({
                                text: `Order ${data.trade.takerSide === 'buy' ? 'beli' : 'jual'} berhasil!`,
                                type: 'success',
                            });
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                            
                            const portfolioData = data.portfolio;
                            if (portfolioData) {
                                setPortfolio(portfolioData);
                            }
                            
                            const balanceData = data.balance;
                            if (balanceData !== undefined) {
                                setBalance(balanceData);
                            }
                        }

                        if (data.type === 'order_placed') {
                            const newOrder: OpenOrder = {
                                id: data.order.id,
                                symbol: data.order.assetId.toUpperCase(),
                                side: data.order.side,
                                type: data.order.type,
                                price: data.order.price,
                                amount: data.order.amount,
                                total: data.order.price * data.order.amount,
                                time: new Date(data.order.createdAt).toLocaleTimeString('id-ID'),
                            };
                            setOpenOrders(prev => [newOrder, ...prev]);
                            setMessage({
                                text: 'Order limit berhasil dibuat',
                                type: 'success',
                            });
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                        }
                    } catch (err) {                        console.error('Parse error:', err);
                    }
                };

                ws.onclose = () => {
                    console.log('❌ WebSocket disconnected');
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
        if (!chartContainerRef.current) return;

        if (chartRef.current) {
            chartRef.current.remove();
            chartRef.current = null;
            candleSeriesRef.current = null;
            volumeSeriesRef.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: '#0B0E11' },
                textColor: '#d1d5db',
            },            grid: {
                vertLines: { color: '#1e2330' },
                horzLines: { color: '#1e2330' },
            },
            crosshair: { mode: 1 },
            rightPriceScale: { borderColor: '#1e2330' },
            timeScale: { borderColor: '#1e2330', timeVisible: true, secondsVisible: false },
        });

        chartRef.current = chart;

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#0ecb81', downColor: '#f6465d',
            borderUpColor: '#0ecb81', borderDownColor: '#f6465d',
            wickUpColor: '#0ecb81', wickDownColor: '#f6465d',
        });
        candleSeriesRef.current = candleSeries;

        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceFormat: { type: 'volume' },
            priceScaleId: '',
            scaleMargins: { top: 0.8, bottom: 0 },
        });
        volumeSeriesRef.current = volumeSeries;

        const now = new Date();
        const mockCandles = [];
        const mockVolumes = [];
        let currentPrice = selectedAsset?.price || 965000;
        
        for (let i = 50; i >= 0; i--) {
            const time = new Date(now.getTime() - i * 60000) as unknown as UTCTimestamp;
            const open = currentPrice;
            const volatility = currentPrice * 0.005;
            const close = open + (Math.random() - 0.5) * volatility;
            const high = Math.max(open, close) + Math.random() * volatility * 0.5;
            const low = Math.min(open, close) - Math.random() * volatility * 0.5;
            const volume = Math.random() * 100;
            
            mockCandles.push({ time, open, high, low, close });
            mockVolumes.push({
                time,
                value: volume,
                color: close >= open ? 'rgba(14, 203, 129, 0.5)' : 'rgba(246, 70, 93, 0.5)',
            });
            currentPrice = close;
        }

        candleDataRef.current = mockCandles;
        candleSeries.setData(mockCandles);        volumeSeries.setData(mockVolumes);
        chart.timeScale().fitContent();

        const handleResize = () => {
            if (chartContainerRef.current && chartRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    }, [selectedAsset, timeframe]);

    useEffect(() => {
        if (candleSeriesRef.current && volumeSeriesRef.current && selectedAsset) {
            const updateData = (price: number) => {
                const candles = candleDataRef.current;
                if (candles.length === 0) return;
                const lastCandle = candles[candles.length - 1];
                const now = Math.floor(Date.now() / 1000) as UTCTimestamp;
                
                const updatedCandle = {
                    ...lastCandle,
                    close: price,
                    high: Math.max(lastCandle.high, price),
                    low: Math.min(lastCandle.low, price),
                };

                if (now - (lastCandle.time as number) > 60) {
                    const newCandle = { time: now, open: price, high: price, low: price, close: price };
                    candles.push(newCandle);
                    if (candles.length > 100) candles.shift();
                    candleSeriesRef.current.update(newCandle);
                    volumeSeriesRef.current.update({
                        time: now,
                        value: Math.random() * 100,
                        color: price >= newCandle.open ? 'rgba(14, 203, 129, 0.5)' : 'rgba(246, 70, 93, 0.5)',
                    });
                } else {
                    candles[candles.length - 1] = updatedCandle;
                    candleSeriesRef.current.update(updatedCandle);
                }
            };
            if (isGuest) updateData(selectedAsset.price);        }
    }, [assets, isGuest, selectedAsset]);

    useEffect(() => {
        if (!isGuest && connected) {
            const interval = setInterval(() => {
                const newTrade = {
                    id: Math.random().toString(36).substr(2, 9),
                    price: selectedAsset?.price || 0,
                    amount: parseFloat((Math.random() * 0.5).toFixed(4)),
                    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    side: Math.random() > 0.5 ? 'buy' : 'sell' as 'buy' | 'sell',
                };
                setLastTrades(prev => [newTrade, ...prev].slice(0, 15));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [selectedAsset, isGuest, connected]);

    const handlePercentClick = (pct: number) => {
        if (!selectedAsset) return;
        if (isBuying) {
            const maxAmount = balance / selectedAsset.price;
            setTradeAmount((maxAmount * (pct / 100)).toFixed(6));
        } else {
            const holding = portfolio.find(p => p.id === selectedAsset.id)?.amount || 0;
            setTradeAmount((holding * (pct / 100)).toFixed(6));
        }
    };

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

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({                type: 'trade',
                assetId: selectedAsset.id,
                side: isBuying ? 'buy' : 'sell',
                type: orderType,
                price: orderType === 'limit' ? parseFloat(limitPrice) : undefined,
                amount: amount,
            }));
        } else {
            setMessage({ text: 'Koneksi WebSocket belum siap', type: 'error' });
            setIsTrading(false);
        }

        setTradeAmount('');
    };

    const cancelOrder = (id: string) => {
        setOpenOrders(prev => prev.filter(o => o.id !== id));
        setMessage({ text: 'Order berhasil dibatalkan', type: 'success' });
    };

    const estimatedTotal = useMemo(() => {
        const amt = parseFloat(tradeAmount) || 0;
        const prc = orderType === 'limit' ? (parseFloat(limitPrice) || 0) : (selectedAsset?.price || 0);
        return amt * prc;
    }, [tradeAmount, limitPrice, selectedAsset, orderType]);

    const fee = estimatedTotal * 0.001;
    const receiveAmount = isBuying ? parseFloat(tradeAmount) || 0 : estimatedTotal - fee;

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
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0B0E11]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Menghubungkan ke server...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#0B0E11] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#181A20] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg ${getAssetColor(selectedAsset?.id || 'btc')} bg-zinc-100 dark:bg-zinc-800`}>
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold flex items-center gap-2">
                                {selectedAsset?.symbol || 'BTC'}/IDR
                                <span className="text-xs font-normal text-zinc-500">{selectedAsset?.name || 'Bitcoin'}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isGuest ? (
                        <button onClick={() => router.push('/login')} className="px-4 py-2 bg-cyan-500 text-white text-sm font-semibold rounded-lg hover:bg-cyan-600 transition-colors flex items-center gap-2">
                            <LogIn className="w-4 h-4" /> Login
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                            <div className="flex items-baseline gap-3">
                                <div className={`text-3xl font-bold transition-colors duration-300 ${
                                    priceDirection === 'up' ? 'text-[#0ecb81]' : priceDirection === 'down' ? 'text-[#f6465d]' : 'text-zinc-900 dark:text-white'
                                }`}>
                                    Rp {selectedAsset?.price.toLocaleString('id-ID') || 0}
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${selectedAsset && selectedAsset.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                    {selectedAsset && selectedAsset.change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                                    {Math.abs(selectedAsset?.change || 0)}%
                                </div>
                            </div>
                            <div className="flex gap-6 text-xs">
                                <div><span className="text-zinc-500 block">24h High</span><span className="font-semibold">Rp {selectedAsset?.high24h.toLocaleString('id-ID') || 0}</span></div>                                <div><span className="text-zinc-500 block">24h Low</span><span className="font-semibold">Rp {selectedAsset?.low24h.toLocaleString('id-ID') || 0}</span></div>
                                <div><span className="text-zinc-500 block">24h Volume</span><span className="font-semibold">{selectedAsset ? (selectedAsset.volume24h / 1000000).toFixed(1) + 'M' : '0'}</span></div>
                            </div>
                            <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                {TIMEFRAMES.map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}
                                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                            timeframe === tf ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
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
                                <button onClick={() => setIsBuying(true)} className={`flex-1 py-2 text-center font-bold rounded-lg transition-all ${isBuying ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'text-zinc-500'}`}>Beli</button>
                                <button onClick={() => setIsBuying(false)} className={`flex-1 py-2 text-center font-bold rounded-lg transition-all ${!isBuying ? 'bg-[#f6465d]/10 text-[#f6465d]' : 'text-zinc-500'}`}>Jual</button>
                            </div>

                            <div className="flex gap-2 mb-4">
                                <button onClick={() => setOrderType('market')} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${orderType === 'market' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'}`}>Market</button>
                                <button onClick={() => setOrderType('limit')} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${orderType === 'limit' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'text-zinc-500'}`}>Limit</button>
                            </div>

                            <div className="space-y-4">
                                {orderType === 'limit' && (
                                    <div>
                                        <label className="text-xs text-zinc-500 mb-1 block">Harga (IDR)</label>
                                        <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Jumlah {selectedAsset?.symbol}</label>
                                    <input type="number" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    <div className="flex gap-2 mt-2">
                                        {[25, 50, 75, 100].map((pct) => (
                                            <button key={pct} onClick={() => handlePercentClick(pct)} className="flex-1 py-1 text-xs rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">{pct}%</button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-3 space-y-2 text-sm">                                    <div className="flex justify-between"><span className="text-zinc-500">Estimasi Total</span><span className="font-medium">Rp {estimatedTotal.toLocaleString('id-ID')}</span></div>
                                    <div className="flex justify-between"><span className="text-zinc-500">Fee (0.1%)</span><span className="font-medium">Rp {fee.toLocaleString('id-ID')}</span></div>
                                    <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2">
                                        <span className="text-zinc-500">{isBuying ? 'Diterima' : 'Total Diterima (IDR)'}</span>
                                        <span className="font-bold text-cyan-500">
                                            {isBuying ? `${(parseFloat(tradeAmount) || 0).toFixed(6)} ${selectedAsset?.symbol}` : `Rp ${(estimatedTotal - fee).toLocaleString('id-ID')}`}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={handleTrade} disabled={isTrading || !selectedAsset} className={`w-full py-3.5 rounded-lg font-bold text-white transition-all disabled:opacity-50 ${isBuying ? 'bg-[#0ecb81] hover:bg-[#0ecb81]/90' : 'bg-[#f6465d] hover:bg-[#f6465d]/90'}`}>
                                    {isTrading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : `Konfirmasi ${isBuying ? 'Pembelian' : 'Penjualan'}`}
                                </button>
                            </div>
                        </div>
                    )}

                    {isGuest && (
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                            <p className="text-cyan-600 dark:text-cyan-400 font-bold mb-2">Mode Tamu Aktif</p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Login untuk mengakses fitur trading, portofolio, dan riwayat transaksi.</p>
                            <button onClick={() => router.push('/login')} className="px-6 py-2.5 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors inline-flex items-center gap-2">
                                <LogIn className="w-4 h-4" /> Login Sekarang
                            </button>
                        </div>
                    )}

                    {!isGuest && (
                        <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
                                <button onClick={() => setActiveTab('open')} className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'open' ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-zinc-500'}`}>Open Orders ({openOrders.length})</button>
                                <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'history' ? 'text-cyan-500 border-b-2 border-cyan-500' : 'text-zinc-500'}`}>Trade History</button>
                            </div>
                            <div className="p-4">
                                {activeTab === 'open' && (
                                    openOrders.length === 0 ? (
                                        <div className="text-center py-8 text-zinc-500 text-sm">Tidak ada order terbuka</div>
                                    ) : (
                                        <div className="space-y-2">
                                            {openOrders.map((order) => (
                                                <div key={order.id} className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg text-sm">
                                                    <div className="flex items-center gap-3">
                                                        <span className={`font-bold px-2 py-0.5 rounded text-xs ${order.side === 'buy' ? 'bg-[#0ecb81]/10 text-[#0ecb81]' : 'bg-[#f6465d]/10 text-[#f6465d]'}`}>
                                                            {order.side === 'buy' ? 'BUY' : 'SELL'}
                                                        </span>
                                                        <div>
                                                            <div className="font-medium">{order.symbol} <span className="text-zinc-500 text-xs">Limit</span></div>
                                                            <div className="text-xs text-zinc-500">{order.time}</div>
                                                        </div>
                                                    </div>                                                    <div className="text-right">
                                                        <div className="font-medium">{order.amount} @ Rp {order.price.toLocaleString('id-ID')}</div>
                                                        <div className="text-xs text-zinc-500">Total: Rp {order.total.toLocaleString('id-ID')}</div>
                                                    </div>
                                                    <button onClick={() => cancelOrder(order.id)} className="p-2 text-zinc-500 hover:text-red-500 transition-colors"><X className="w-4 h-4" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                )}
                                {activeTab === 'history' && (
                                    <div className="text-center py-8 text-zinc-500 text-sm">Riwayat transaksi akan muncul di sini</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex justify-between text-xs font-semibold text-zinc-500">
                            <span>Harga</span><span>Jumlah</span>
                        </div>
                        <div className="max-h-[180px] overflow-y-auto">
                            {Array.from({ length: 8 }).map((_, i) => {
                                const price = (selectedAsset?.price || 0) + (i + 1) * (selectedAsset?.price || 0) * 0.001;
                                return (
                                    <div key={`ask-${i}`} className="flex justify-between px-3 py-1 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer relative">
                                        <div className="absolute right-0 top-0 bottom-0 bg-[#f6465d]/10" style={{ width: `${Math.random() * 60 + 10}%` }} />
                                        <span className="text-[#f6465d] relative z-10">{price.toLocaleString('id-ID')}</span>
                                        <span className="text-zinc-600 dark:text-zinc-400 relative z-10">{(Math.random() * 2).toFixed(4)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="py-2 px-3 text-lg font-bold text-center border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                            <span className={selectedAsset && selectedAsset.change >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}>
                                {selectedAsset?.price.toLocaleString('id-ID') || 0}
                            </span>
                        </div>
                        <div className="max-h-[180px] overflow-y-auto">
                            {Array.from({ length: 8 }).map((_, i) => {
                                const price = (selectedAsset?.price || 0) - (i + 1) * (selectedAsset?.price || 0) * 0.001;
                                return (
                                    <div key={`bid-${i}`} className="flex justify-between px-3 py-1 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer relative">
                                        <div className="absolute right-0 top-0 bottom-0 bg-[#0ecb81]/10" style={{ width: `${Math.random() * 60 + 10}%` }} />
                                        <span className="text-[#0ecb81] relative z-10">{price.toLocaleString('id-ID')}</span>
                                        <span className="text-zinc-600 dark:text-zinc-400 relative z-10">{(Math.random() * 2).toFixed(4)}</span>
                                    </div>
                                );                            })}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 flex items-center gap-2">
                            <Activity className="w-3 h-3" /> Last Trades
                        </div>
                        <div className="max-h-[200px] overflow-y-auto">
                            {lastTrades.map((trade) => (
                                <div key={trade.id} className="flex justify-between px-3 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                    <span className={trade.side === 'buy' ? 'text-[#0ecb81]' : 'text-[#f6465d]'}>{trade.price.toLocaleString('id-ID')}</span>
                                    <span className="text-zinc-600 dark:text-zinc-400">{trade.amount}</span>
                                    <span className="text-zinc-500">{trade.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {!isGuest && (
                        <div className="bg-white dark:bg-[#181A20] rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm"><Wallet className="w-4 h-4" /> Saldo & Aset</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                                    <span className="text-sm text-zinc-500">Saldo IDR</span>
                                    <span className="font-bold">Rp {balance.toLocaleString('id-ID')}</span>
                                </div>
                                {portfolio.filter((p) => p.amount > 0).map((p) => {
                                    const asset = assets.find((a) => a.id === p.id);
                                    if (!asset) return null;
                                    const currentValue = p.amount * asset.price;
                                    const pnl = currentValue - (p.amount * p.buyPrice);
                                    const pnlPercent = ((asset.price - p.buyPrice) / p.buyPrice) * 100;
                                    return (
                                        <div key={p.id} className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold text-sm`}>{p.symbol}</span>
                                                    <span className="text-xs text-zinc-500">{p.amount.toFixed(4)}</span>
                                                </div>
                                                <div className={`text-xs font-medium ${pnl >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                                                    {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}% (Rp {pnl.toLocaleString('id-ID')})
                                                </div>
                                            </div>
                                            <span className="font-medium text-sm">Rp {currentValue.toLocaleString('id-ID')}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>                    )}
                </div>
            </div>
        </div>
    );
}
