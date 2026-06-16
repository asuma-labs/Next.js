// app/status/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Zap, 
  Server,
  Wifi,
  Database,
  RefreshCw,
  ArrowLeft,
  HardDrive,
  Cpu,
  Activity
} from 'lucide-react';

interface StatusData {
  system: {
    status: string;
    uptime: string;
    platform: string;
    cpu_cores: number;
    cpu_model: string;
    memory_total_gb: string;
    memory_used_gb: string;
    memory_percent: number;
  };
  endpoints: Record<string, {
    status: string;
    http_code?: number;
    latency_ms?: number;
    error?: string;
    note?: string;
  }>;
  sqlite: Record<string, {
    status: string;
    size: string;
    error?: string;
  }>;
  json_files: Record<string, {
    status: string;
    size: string;
  }>;
  meta: {
    overall: string;
    bot_name: string;
    server_name: string;
    stats: {
      total: number;
      operational: number;
      degraded: number;
      down: number;
    };
  };
  checked_at: string;
  server_uptime: number;
}

export default function StatusPage() {
  const [statusData, setStatusData] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStatus = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('https://db.asuma.my.id/api/status');
      if (!res.ok) throw new Error('Failed to fetch status');
      const data = await res.json();
      setStatusData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Auto refresh tiap 60 detik
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      case 'not_found': return 'text-yellow-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500/10 border-green-500/20';
      case 'degraded': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'down': return 'bg-red-500/10 border-red-500/20';
      case 'not_found': return 'bg-yellow-500/10 border-yellow-500/20';
      default: return 'bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5" />;
      case 'degraded': return <AlertCircle className="w-5 h-5" />;
      case 'down': return <XCircle className="w-5 h-5" />;
      case 'not_found': return <AlertCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'degraded': return 'Degraded';
      case 'down': return 'Down';
      case 'not_found': return 'Not Found';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white" />
      </div>
    );
  }

  if (error || !statusData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] p-6">
        <p className="text-red-500 font-medium">{error || 'Failed to load status'}</p>
        <button 
          onClick={fetchStatus}
          className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  const { system, endpoints, sqlite, json_files, meta } = statusData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-indigo-50/50 dark:from-[#060D1F] dark:via-[#0A1628] dark:to-[#0D1B2E] text-zinc-900 dark:text-white transition-colors duration-300 p-6 pt-24 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl opacity-75 dark:opacity-100" />
        <div className="absolute bottom-0 right-1/4 w-96 h-64 rounded-full bg-indigo-500/10 blur-3xl opacity-75 dark:opacity-100" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" className="inline-flex items-center text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors mb-8 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center space-y-4 mb-12"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
            meta.overall === 'operational' 
              ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'
              : meta.overall === 'degraded'
              ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400'
              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
          }`}>
            {meta.overall === 'operational' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {meta.overall === 'operational' ? 'All Systems Operational' : 
             meta.overall === 'degraded' ? 'Partially Degraded' : 'Service Outage'}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-650 via-indigo-650 to-sky-650 dark:from-cyan-300 dark:via-sky-200 dark:to-indigo-300 bg-clip-text text-transparent">
            Service Status
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Pantau status layanan Asuma Bot secara real-time
          </p>
        </motion.div>

        {/* Last Updated & Refresh */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 px-2"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Clock className="w-4 h-4" />
            Last updated: {lastUpdated.toLocaleString('id-ID')}
          </div>
          <button
            onClick={fetchStatus}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-2xl font-bold text-green-500">{meta.stats.operational}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Operational</p>
          </div>
          <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-center">
            <p className="text-2xl font-bold text-yellow-500">{meta.stats.degraded}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Degraded</p>
          </div>
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-2xl font-bold text-red-500">{meta.stats.down}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Down</p>
          </div>
        </motion.div>

        {/* System Resources */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm mb-4"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Server className="w-4 h-4" />
            System Resources
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Uptime</p>
              <p className="font-mono text-sm">{system.uptime}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">CPU</p>
              <p className="font-mono text-sm">{system.cpu_cores} cores</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Memory</p>
              <p className="font-mono text-sm">{system.memory_used_gb}GB / {system.memory_total_gb}GB</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Platform</p>
              <p className="font-mono text-sm text-xs">{system.platform}</p>
            </div>
          </div>
        </motion.div>

        {/* Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm mb-4"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            Endpoints
          </h3>
          <div className="space-y-2">
            {Object.entries(endpoints).map(([name, data]) => (
              <div key={name} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl ${getStatusBg(data.status)}`}>
                <span className="text-sm font-medium">{name}</span>
                <div className="flex items-center gap-3 text-sm">
                  {data.latency_ms && <span className="text-zinc-500">{data.latency_ms}ms</span>}
                  {data.http_code && <span className="font-mono text-zinc-500">{data.http_code}</span>}
                  <span className={`inline-flex items-center gap-1 ${getStatusColor(data.status)}`}>
                    {getStatusIcon(data.status)}
                    {getStatusLabel(data.status)}
                  </span>
                </div>
                {data.note && <p className="text-xs text-zinc-500 col-span-full">{data.note}</p>}
                {data.error && <p className="text-xs text-red-500 col-span-full">{data.error}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* SQLite & JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" />
              SQLite
            </h3>
            <div className="space-y-2">
              {Object.entries(sqlite).map(([name, data]) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <span>{name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{data.size}</span>
                    <span className={`inline-flex items-center gap-1 ${getStatusColor(data.status)}`}>
                      {getStatusIcon(data.status)}
                      {getStatusLabel(data.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Config Files
            </h3>
            <div className="space-y-2">
              {Object.entries(json_files).map(([name, data]) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <span>{name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{data.size}</span>
                    <span className={`inline-flex items-center gap-1 ${getStatusColor(data.status)}`}>
                      {getStatusIcon(data.status)}
                      {getStatusLabel(data.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm text-center"
        >
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {meta.bot_name} · {meta.server_name} · Server uptime: {Math.floor(statusData.server_uptime / 3600)}h {(Math.floor(statusData.server_uptime / 60) % 60)}m
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Auto-refresh every 60 seconds · {new Date(statusData.checked_at).toLocaleString('id-ID')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
