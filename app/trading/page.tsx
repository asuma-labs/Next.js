'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft, Wallet, Bitcoin, Coins, Landmark, Gauge,
    AlertCircle, CheckCircle, Loader2, LogIn, X, History
} from 'lucide-react';
import { getToken } from '@/lib/auth';
import { createChart, CrosshairMode, AreaSeries, UTCTimestamp } from 'lightweight-charts';

interface Asset {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume?: number;
    high24h?: number;
    low24h?: number;
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

interface OrderBookEntry {
    price: number;    amount: number;
    total: number;
}

const MOCK_ASSETS: Asset[] = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 965000, change: 2.4, volume: 1245000000, high24h: 982000, low24h: 941000 },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 45000, change: -1.2, volume: 432000000, high24h: 46200, low24h: 43800 },
    { id: 'sbn', name: 'SBN Digital', symbol: 'SBN', price: 1500, change: 0.8, volume: 12500000, high24h: 1540, low24h: 1480 },
    { id: 'gauge', name: 'Gauge Token', symbol: 'GAUGE', price: 850, change: -3.5, volume: 4200000, high24h: 890, low24h: 810 },
];

const FEE_RATE = 0.001;
const MAX_HISTORY = 50;

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
    const [activeTab, setActiveTab] = useState<'chart' | 'trade' | 'portfolio'>('chart');

    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
    const [limitPrice, setLimitPrice] = useState('');
    const [tradeAmount, setTradeAmount] = useState('');
    const [isBuying, setIsBuying] = useState(true);
    const [isTrading, setIsTrading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [tradeHistory, setTradeHistory] = useState<{ id: string; type: 'buy' | 'sell'; asset: string; amount: number; price: number; time: string }[]>([]);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);
    const historyDataRef = useRef<{ time: UTCTimestamp; value: number }[]>([]);
    const selectedAssetRef = useRef<Asset | null>(null);
    const mockIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const generateOrderBook = useCallback((currentPrice: number) => {
        const spread = currentPrice * 0.0005;
        const asks: OrderBookEntry[] = [];
        const bids: OrderBookEntry[] = [];
        for (let i = 5; i >= 1; i--) {            const price = Math.round(currentPrice + (spread * i) + (Math.random() * 100));
            const amount = parseFloat((Math.random() * 2).toFixed(4));
            asks.push({ price, amount, total: parseFloat((price * amount).toFixed(2)) });
        }
        for (let i = 1; i <= 5; i++) {
            const price = Math.round(currentPrice - (spread * i) - (Math.random() * 100));
            const amount = parseFloat((Math.random() * 2).toFixed(4));
            bids.push({ price, amount, total: parseFloat((price * amount).toFixed(2)) });
        }
        return { asks: asks.reverse(), bids };
    }, []);

    const [orderBook, setOrderBook] = useState<{ asks: OrderBookEntry[]; bids: OrderBookEntry[] }>({ asks: [], bids: [] });

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
    }, [selectedAsset]);

    useEffect(() => {
        if (isGuest) {
            mockIntervalRef.current = setInterval(() => {
                setAssets((prev) =>
                    prev.map((asset) => {
                        const change = (Math.random() - 0.5) * 4;
                        const newPrice = Math.max(Math.round(asset.price + (asset.price * change / 100)), 100);
                        return { ...asset, price: newPrice, change: parseFloat(change.toFixed(2)) };
                    })
                );
            }, 2000);
            return () => {
                if (mockIntervalRef.current) clearInterval(mockIntervalRef.current);
            };
        }
    }, [isGuest]);

    useEffect(() => {        if (selectedAsset && !isGuest) {
            setOrderBook(generateOrderBook(selectedAsset.price));
        }
    }, [selectedAsset, isGuest, generateOrderBook]);

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
                            const updatedAsset = data.assets.find((a: Asset) => a.id === selectedAssetRef.current?.id);
                            if (updatedAsset) {
                                setOrderBook(generateOrderBook(updatedAsset.price));
                                const now = Math.floor(Date.now() / 1000) as UTCTimestamp;                                const lastTime = historyDataRef.current[historyDataRef.current.length - 1]?.time || 0;
                                const time = now > lastTime ? now : (lastTime + 1) as UTCTimestamp;
                                const newPoint = { time, value: updatedAsset.price };
                                historyDataRef.current.push(newPoint);
                                if (historyDataRef.current.length > 200) {
                                    historyDataRef.current = historyDataRef.current.slice(-200);
                                }
                                if (seriesRef.current) {
                                    seriesRef.current.update(newPoint);
                                }
                            }
                        }

                        if (data.type === 'trade_success') {
                            const tradeData = data as TradeSuccessData;
                            setBalance(tradeData.balance);
                            setPortfolio(tradeData.portfolio);
                            setMessage({ text: `Berhasil ${tradeData.action === 'buy' ? 'membeli' : 'menjual'} ${tradeData.amount} ${tradeData.asset.symbol}`, type: 'success' });
                            setTradeHistory(prev => [{
                                id: Math.random().toString(36).substring(2, 11),
                                type: tradeData.action,
                                asset: tradeData.asset.symbol,
                                amount: tradeData.amount,
                                price: tradeData.asset.price,
                                time: new Date().toLocaleTimeString('id-ID')
                            }, ...prev].slice(0, MAX_HISTORY));
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                        }

                        if (data.type === 'trade_error') {
                            setMessage({ text: data.error || 'Trade gagal!', type: 'error' });
                            setTimeout(() => setMessage(null), 4000);
                            setIsTrading(false);
                        }
                    } catch (err) {
                        console.error('Parse error:', err);
                    }
                };

                ws.onclose = () => {
                    setConnected(false);
                    if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
                    reconnectTimeout.current = setTimeout(connectWebSocket, 3000);
                };

                ws.onerror = () => {
                    setError('Koneksi WebSocket gagal');
                    ws.close();
                };            } catch (err) {
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
    }, [token, isGuest, generateOrderBook]);

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
            height: 450,
            layout: { background: { color: isDark ? '#0B0E11' : '#ffffff' }, textColor: isDark ? '#848E9C' : '#1f2937' },
            grid: { vertLines: { color: isDark ? '#1E2329' : '#e5e7eb' }, horzLines: { color: isDark ? '#1E2329' : '#e5e7eb' } },
            crosshair: { mode: CrosshairMode.Normal },
            rightPriceScale: { borderColor: isDark ? '#1E2329' : '#e5e7eb' },
            timeScale: { borderColor: isDark ? '#1E2329' : '#e5e7eb', timeVisible: true, secondsVisible: false },
        });
        chartRef.current = chart;
        const areaSeries = chart.addSeries(AreaSeries, { lineColor: '#0ECB81', topColor: '#0ECB8130', bottomColor: '#0ECB8105', lineWidth: 2 });
        seriesRef.current = areaSeries;

        let chartData = historyDataRef.current;
        if (!chartData || chartData.length === 0) {
            const now = new Date();
            chartData = [];
            for (let i = 0; i < 40; i++) {
                const time = new Date(now.getTime() - (40 - i) * 5000);
                chartData.push({ time: Math.floor(time.getTime() / 1000) as UTCTimestamp, value: selectedAsset.price + (Math.random() - 0.5) * 1000 });
            }
            historyDataRef.current = chartData;
        }

        areaSeries.setData(chartData);
        chart.timeScale().fitContent();
        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
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
            if (historyDataRef.current.length > 200) historyDataRef.current = historyDataRef.current.slice(-200);
            if (seriesRef.current) seriesRef.current.update(newPoint);
        }
    }, [assets, isGuest, selectedAsset]);

    const calculateTotal = () => {
        const amount = parseFloat(tradeAmount || '0');
        const price = orderType === 'limit' ? parseFloat(limitPrice || '0') : selectedAsset?.price || 0;
        return amount * price;
    };

    const calculateFee = () => calculateTotal() * FEE_RATE;

    const handleSliderChange = (percentage: number) => {
        if (!selectedAsset) return;
        const price = orderType === 'limit' && limitPrice ? parseFloat(limitPrice) : selectedAsset.price;
        
        if (isBuying) {
            const maxAmount = balance / price;
            setTradeAmount((maxAmount * (percentage / 100)).toFixed(6));
        } else {
            const ownedAsset = portfolio.find(p => p.id === selectedAsset.id);
            const maxAmount = ownedAsset?.amount || 0;
            setTradeAmount((maxAmount * (percentage / 100)).toFixed(6));
        }
    };
    const handleTrade = () => {
        if (isGuest) {
            setMessage({ text: 'Login terlebih dahulu untuk trading', type: 'error' });
            setTimeout(() => setMessage(null), 4000);
            return;
        }
        if (!selectedAsset || !tradeAmount || parseFloat(tradeAmount) <= 0) {
            setMessage({ text: 'Masukkan jumlah yang valid', type: 'error' });
            return;
        }
        if (orderType === 'limit' && (!limitPrice || parseFloat(limitPrice) <= 0)) {
            setMessage({ text: 'Masukkan harga limit yang valid', type: 'error' });
            return;
        }

        const price = orderType === 'limit' ? parseFloat(limitPrice) : selectedAsset.price;
        const total = calculateTotal() + calculateFee();

        if (isBuying && total > balance) {
            setMessage({ text: 'Saldo tidak mencukupi', type: 'error' });
            setTimeout(() => setMessage(null), 4000);
            return;
        }

        if (!isBuying) {
            const ownedAsset = portfolio.find(p => p.id === selectedAsset.id);
            if (!ownedAsset || ownedAsset.amount < parseFloat(tradeAmount)) {
                setMessage({ text: 'Jumlah aset tidak mencukupi', type: 'error' });
                setTimeout(() => setMessage(null), 4000);
                return;
            }
        }

        setShowConfirm(true);
    };

    const executeTrade = () => {
        setShowConfirm(false);
        setIsTrading(true);
        if (wsRef.current) {
            wsRef.current.send(JSON.stringify({
                type: 'trade',
                action: isBuying ? 'buy' : 'sell',
                assetId: selectedAsset!.id,
                amount: parseFloat(tradeAmount),
            }));
        }
        setTradeAmount('');
        if (orderType === 'limit') setLimitPrice('');
    };
    const getAssetIcon = (id: string) => {
        switch (id) {
            case 'btc': return <Bitcoin className="w-5 h-5 text-[#F0B90B]" />;
            case 'eth': return <Coins className="w-5 h-5 text-[#627EEA]" />;
            case 'sbn': return <Landmark className="w-5 h-5 text-[#00C087]" />;
            case 'gauge': return <Gauge className="w-5 h-5 text-[#8A2BE2]" />;
            default: return <Coins className="w-5 h-5 text-[#848E9C]" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0E11] text-[#848E9C]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#F0B90B]" />
                    <p className="text-sm">Memuat data pasar...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0B0E11] p-6 text-center">
                <div className="p-4 rounded-full bg-red-500/10"><AlertCircle className="w-10 h-10 text-red-500" /></div>
                <p className="text-red-500 font-medium">{error}</p>
                <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-[#F0B90B] text-black font-medium rounded-lg hover:bg-[#DCA300]">Coba Lagi</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0E11] text-[#EAECEF] font-sans">
            <div className="border-b border-[#1E2329] bg-[#181A20] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-[#848E9C] hover:text-[#EAECEF] transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        {getAssetIcon(selectedAsset?.id || 'btc')}
                        <span className="font-bold text-lg">{selectedAsset?.symbol}/IDR</span>
                        <span className={`text-sm font-medium ${selectedAsset?.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                            {selectedAsset?.change >= 0 ? '+' : ''}{selectedAsset?.change.toFixed(2)}%
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {isGuest ? (                        <button onClick={() => router.push('/login')} className="px-4 py-1.5 bg-[#F0B90B] text-black text-sm font-bold rounded hover:bg-[#DCA300] transition-colors flex items-center gap-2">
                            <LogIn className="w-4 h-4" /> Login
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-1 bg-[#1E2329] rounded-lg text-sm">
                            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'}`} />
                            <span className="text-[#848E9C]">{connected ? 'Terhubung' : 'Menghubungkan...'}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="lg:hidden flex border-b border-[#1E2329] bg-[#181A20]">
                {(['chart', 'trade', 'portfolio'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'}`}>
                        {tab === 'chart' ? 'Grafik' : tab === 'trade' ? 'Trading' : 'Portofolio'}
                    </button>
                ))}
            </div>

            <div className="max-w-[1920px] mx-auto p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
                <div className={`lg:col-span-9 space-y-3 ${activeTab !== 'chart' ? 'hidden lg:block' : ''}`}>
                    <div className="bg-[#181A20] rounded-xl border border-[#1E2329] p-3">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedAsset?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</h2>
                                <div className="flex items-center gap-3 text-xs text-[#848E9C] mt-1">
                                    <span>24J Tinggi: <span className="text-[#EAECEF]">{selectedAsset?.high24h?.toLocaleString('id-ID')}</span></span>
                                    <span>24J Rendah: <span className="text-[#EAECEF]">{selectedAsset?.low24h?.toLocaleString('id-ID')}</span></span>
                                    <span>Vol: <span className="text-[#EAECEF]">{((selectedAsset?.volume || 0) / 1e6).toFixed(2)}M</span></span>
                                </div>
                            </div>
                            <div className="hidden md:flex gap-2">
                                {['1m', '5m', '15m', '1H', '1D'].map(tf => (
                                    <button key={tf} className="px-3 py-1.5 text-xs rounded bg-[#1E2329] hover:bg-[#2B3139] transition-colors text-[#848E9C] hover:text-[#EAECEF]">{tf}</button>
                                ))}
                            </div>
                        </div>
                        <div ref={chartContainerRef} className="w-full h-[350px] lg:h-[450px] rounded-lg overflow-hidden" />
                    </div>

                    <div className="bg-[#181A20] rounded-xl border border-[#1E2329] p-4">
                        <h3 className="text-sm font-semibold text-[#848E9C] mb-3 flex items-center gap-2"><History className="w-4 h-4" /> Riwayat Transaksi</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-[#848E9C] border-b border-[#1E2329]">
                                    <tr>
                                        <th className="pb-2 text-left font-medium">Waktu</th>
                                        <th className="pb-2 text-left font-medium">Pair</th>
                                        <th className="pb-2 text-left font-medium">Tipe</th>                                        <th className="pb-2 text-right font-medium">Jumlah</th>
                                        <th className="pb-2 text-right font-medium">Harga</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1E2329]">
                                    {tradeHistory.length > 0 ? tradeHistory.map(trade => (
                                        <tr key={trade.id} className="hover:bg-[#1E2329]/50">
                                            <td className="py-2.5 text-[#848E9C]">{trade.time}</td>
                                            <td className="py-2.5">{trade.asset}</td>
                                            <td className={`py-2.5 font-medium ${trade.type === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                                                {trade.type === 'buy' ? 'Beli' : 'Jual'}
                                            </td>
                                            <td className="py-2.5 text-right">{trade.amount}</td>
                                            <td className="py-2.5 text-right">{trade.price.toLocaleString('id-ID')}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="py-6 text-center text-[#848E9C]">Belum ada transaksi</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className={`lg:col-span-3 space-y-3 ${activeTab === 'chart' ? 'hidden lg:block' : ''}`}>
                    {activeTab === 'trade' && (
                        <>
                            <div className="bg-[#181A20] rounded-xl border border-[#1E2329] p-4">
                                <div className="flex bg-[#1E2329] rounded-lg p-1 mb-4">
                                    <button onClick={() => setIsBuying(true)} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isBuying ? 'bg-[#0ECB81] text-white' : 'text-[#848E9C]'}`}>Beli</button>
                                    <button onClick={() => setIsBuying(false)} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isBuying ? 'bg-[#F6465D] text-white' : 'text-[#848E9C]'}`}>Jual</button>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <button onClick={() => setOrderType('market')} className={`flex-1 py-2 text-xs rounded-lg border transition-all ${orderType === 'market' ? 'border-[#F0B90B] text-[#F0B90B] bg-[#F0B90B]/10' : 'border-[#1E2329] text-[#848E9C]'}`}>Market</button>
                                    <button onClick={() => setOrderType('limit')} className={`flex-1 py-2 text-xs rounded-lg border transition-all ${orderType === 'limit' ? 'border-[#F0B90B] text-[#F0B90B] bg-[#F0B90B]/10' : 'border-[#1E2329] text-[#848E9C]'}`}>Limit</button>
                                </div>

                                <div className="space-y-3">
                                    {orderType === 'limit' && (
                                        <div>
                                            <label className="text-xs text-[#848E9C] mb-1 block">Harga Limit (IDR)</label>
                                            <input type="number" value={limitPrice} onChange={(e) => setLimitPrice(e.target.value)} placeholder="0.00" className="w-full px-3 py-2.5 rounded-lg bg-[#0B0E11] border border-[#1E2329] focus:border-[#F0B90B] focus:outline-none text-sm" />
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs text-[#848E9C] mb-1 block">Jumlah {selectedAsset?.symbol}</label>
                                        <input type="number" value={tradeAmount} onChange={(e) => setTradeAmount(e.target.value)} placeholder="0.00" className="w-full px-3 py-2.5 rounded-lg bg-[#0B0E11] border border-[#1E2329] focus:border-[#F0B90B] focus:outline-none text-sm" />
                                    </div>
                                    <div className="flex justify-between text-xs text-[#848E9C] px-1">                                        <span>0%</span>
                                        <span>25%</span>
                                        <span>50%</span>
                                        <span>75%</span>
                                        <span>100%</span>
                                    </div>
                                    <input type="range" min="0" max="100" step="25" className="w-full accent-[#F0B90B] h-1 bg-[#1E2329] rounded-lg appearance-none cursor-pointer" onChange={(e) => handleSliderChange(parseFloat(e.target.value))} />
                                </div>

                                <div className="mt-4 pt-4 border-t border-[#1E2329] space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[#848E9C]">Total</span><span className="font-medium">{calculateTotal().toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                                    <div className="flex justify-between"><span className="text-[#848E9C]">Biaya (0.1%)</span><span className="text-[#848E9C]">{calculateFee().toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                                    <div className="flex justify-between font-bold text-base pt-2"><span>Total + Biaya</span><span>{(calculateTotal() + calculateFee()).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                                </div>

                                {!isGuest ? (
                                    <button onClick={handleTrade} disabled={isTrading || !tradeAmount || parseFloat(tradeAmount) <= 0} className={`w-full mt-4 py-3 rounded-lg font-bold text-base transition-all disabled:opacity-50 ${isBuying ? 'bg-[#0ECB81] hover:bg-[#0ABE73] text-white' : 'bg-[#F6465D] hover:bg-[#E4435A] text-white'}`}>
                                        {isTrading ? 'Memproses...' : isBuying ? 'Beli' : 'Jual'}
                                    </button>
                                ) : (
                                    <div className="mt-4 p-3 bg-[#F0B90B]/10 border border-[#F0B90B]/30 rounded-lg text-center">
                                        <p className="text-[#F0B90B] text-sm font-medium mb-1">Mode Simulasi</p>
                                        <button onClick={() => router.push('/login')} className="text-xs underline hover:text-[#DCA300]">Login untuk Trading</button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-[#181A20] rounded-xl border border-[#1E2329] p-4">
                                <h3 className="text-sm font-semibold text-[#848E9C] mb-3">Order Book</h3>
                                <div className="space-y-1 text-xs font-mono">
                                    {orderBook.asks.slice(-5).reverse().map((ask, i) => (
                                        <div key={`ask-${i}`} className="flex justify-between py-1 relative">
                                            <div className="absolute inset-0 bg-[#F6465D]/10" style={{ width: `${Math.min((ask.total / 1000) * 100, 100)}%`, right: 0 }} />
                                            <span className="text-[#F6465D] relative z-10">{ask.price.toLocaleString()}</span>
                                            <span className="text-[#848E9C] relative z-10">{ask.amount}</span>
                                        </div>
                                    ))}
                                    <div className="py-2 text-center font-bold text-lg border-y border-[#1E2329] my-1">
                                        <span className={selectedAsset?.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                                            {selectedAsset?.price.toLocaleString()}
                                        </span>
                                    </div>
                                    {orderBook.bids.slice(0, 5).map((bid, i) => (
                                        <div key={`bid-${i}`} className="flex justify-between py-1 relative">
                                            <div className="absolute inset-0 bg-[#0ECB81]/10" style={{ width: `${Math.min((bid.total / 1000) * 100, 100)}%`, right: 0 }} />
                                            <span className="text-[#0ECB81] relative z-10">{bid.price.toLocaleString()}</span>
                                            <span className="text-[#848E9C] relative z-10">{bid.amount}</span>
                                        </div>
                                    ))}
                                </div>                            </div>
                        </>
                    )}

                    {activeTab === 'portfolio' && (
                        <div className="bg-[#181A20] rounded-xl border border-[#1E2329] p-4 space-y-4">
                            <div className="p-4 bg-[#1E2329] rounded-xl">
                                <p className="text-xs text-[#848E9C] mb-1">Saldo Tersedia</p>
                                <p className="text-xl font-bold">{balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</p>
                            </div>
                            <h3 className="text-sm font-semibold text-[#848E9C] flex items-center gap-2"><Wallet className="w-4 h-4" /> Aset Saya</h3>
                            <div className="space-y-2">
                                {portfolio.filter(p => p.amount > 0).length > 0 ? portfolio.filter(p => p.amount > 0).map(p => {
                                    const asset = assets.find(a => a.id === p.id);
                                    const value = p.amount * (asset?.price || 0);
                                    const pnl = value - (p.amount * p.buyPrice);
                                    return (
                                        <div key={p.id} className="p-3 bg-[#0B0E11] rounded-lg border border-[#1E2329]">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">{getAssetIcon(p.id)}<span className="font-medium">{p.symbol}</span></div>
                                                <span className={`text-sm ${pnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>{pnl >= 0 ? '+' : ''}{pnl.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                                            </div>
                                            <div className="flex justify-between text-xs text-[#848E9C]">
                                                <span>{p.amount.toFixed(6)} {p.symbol}</span>
                                                <span>Nilai: {value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span>
                                            </div>
                                        </div>
                                    );
                                }) : <p className="text-center text-[#848E9C] py-4 text-sm">Portofolio kosong. Mulai trading!</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#181A20] border border-[#1E2329] rounded-2xl w-full max-w-sm p-5 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Konfirmasi Order</h3>
                            <button onClick={() => setShowConfirm(false)} className="p-1 hover:bg-[#1E2329] rounded"><X className="w-5 h-5 text-[#848E9C]" /></button>
                        </div>
                        <div className="space-y-3 text-sm mb-6">
                            <div className="flex justify-between"><span className="text-[#848E9C]">Tipe</span><span className="font-medium">{isBuying ? 'Beli' : 'Jual'} {selectedAsset?.symbol}</span></div>
                            <div className="flex justify-between"><span className="text-[#848E9C]">Jumlah</span><span className="font-medium">{tradeAmount} {selectedAsset?.symbol}</span></div>
                            <div className="flex justify-between"><span className="text-[#848E9C]">Harga</span><span className="font-medium">{(orderType === 'limit' ? parseFloat(limitPrice) : selectedAsset?.price).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                            <div className="flex justify-between"><span className="text-[#848E9C]">Biaya</span><span className="font-medium">{calculateFee().toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                            <div className="flex justify-between border-t border-[#1E2329] pt-3 font-bold text-base"><span>Total</span><span>{(calculateTotal() + calculateFee()).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></div>
                        </div>
                        <button onClick={executeTrade} className={`w-full py-3 rounded-xl font-bold text-base transition-all ${isBuying ? 'bg-[#0ECB81] hover:bg-[#0ABE73] text-white' : 'bg-[#F6465D] hover:bg-[#E4435A] text-white'}`}>                            Konfirmasi {isBuying ? 'Pembelian' : 'Penjualan'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
