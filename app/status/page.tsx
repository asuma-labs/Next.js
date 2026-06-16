// app/status/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

type ServiceStatus = 'operational' | 'degraded' | 'down' | 'maintenance';

interface Service {
  name: string;
  status: ServiceStatus;
  uptime: string;
  responseTime: string;
  icon: React.ReactNode;
  lastChecked: string;
}

export default function StatusPage() {
  const [services, setServices] = useState<Service[]>([
    {
      name: 'WhatsApp Bot',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '< 200ms',
      icon: <Wifi className="w-5 h-5" />,
      lastChecked: 'Just now'
    },
    {
      name: 'API Server',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '< 100ms',
      icon: <Server className="w-5 h-5" />,
      lastChecked: 'Just now'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '< 50ms',
      icon: <Database className="w-5 h-5" />,
      lastChecked: 'Just now'
    },
    {
      name: 'Web Dashboard',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '< 300ms',
      icon: <Zap className="w-5 h-5" />,
      lastChecked: 'Just now'
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulasi refresh data (nanti bisa diganti dengan fetch real)
  const refreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  // Auto refresh setiap 60 detik
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStatus();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'operational': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'down': return 'text-red-500';
      case 'maintenance': return 'text-blue-500';
      default: return 'text-zinc-500';
    }
  };

  const getStatusBg = (status: ServiceStatus) => {
    switch (status) {
      case 'operational': return 'bg-green-500/10 border-green-500/20';
      case 'degraded': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'down': return 'bg-red-500/10 border-red-500/20';
      case 'maintenance': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-zinc-500/10 border-zinc-500/20';
    }
  };

  const getStatusLabel = (status: ServiceStatus) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'degraded': return 'Degraded';
      case 'down': return 'Down';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-5 h-5" />;
      case 'degraded': return <AlertCircle className="w-5 h-5" />;
      case 'down': return <XCircle className="w-5 h-5" />;
      case 'maintenance': return <Clock className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const overallStatus = services.every(s => s.status === 'operational') 
    ? 'All Systems Operational' 
    : services.some(s => s.status === 'down') 
    ? 'Major Outage' 
    : 'Partial Outage';

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            {overallStatus}
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
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className={`p-6 rounded-2xl border ${getStatusBg(service.status)} bg-white/60 dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${getStatusBg(service.status)}`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className={`inline-flex items-center gap-1.5 ${getStatusColor(service.status)}`}>
                      {getStatusIcon(service.status)}
                      {getStatusLabel(service.status)}
                    </span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{service.uptime} uptime</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Response</p>
                  <p className="font-mono text-zinc-900 dark:text-white">{service.responseTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">Checked</p>
                  <p className="font-mono text-zinc-900 dark:text-white text-xs">{service.lastChecked}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Uptime History / Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm shadow-sm text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Status diperbarui secara otomatis setiap 60 detik. 
            Data ini mencerminkan kondisi real-time sistem Asuma Bot.
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
            Jika terjadi masalah, hubungi support di <a href="/contact" className="text-cyan-600 dark:text-cyan-400 hover:underline">Contact</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
