'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  QrCode, 
  MessageSquare, 
  Settings, 
  RefreshCw, 
  Power, 
  Key, 
  CheckCircle, 
  AlertTriangle, 
  Hash, 
  Sparkles,
  Smartphone,
  Check,
  Send,
  Sliders,
  BellRing
} from 'lucide-react';

export default function BotConfigPage() {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [pairingMethod, setPairingMethod] = useState<'qr' | 'code'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);

  // Bot configuration settings
  const [prefix, setPrefix] = useState('!');
  const [autoDownloader, setAutoDownloader] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(true);
  const [selfMode, setSelfMode] = useState(false);

  const startConnecting = () => {
    if (pairingMethod === 'code' && !phoneNumber) {
      alert('Please enter your WhatsApp phone number first.');
      return;
    }
    
    setIsGenerating(true);
    setConnectionStatus('connecting');
    
    setTimeout(() => {
      setIsGenerating(false);
      if (pairingMethod === 'code') {
        const generated = Math.random().toString(36).substring(2, 10).toUpperCase();
        setPairingCode(generated);
      } else {
        setQrLoaded(true);
      }
    }, 1500);
  };

  const simulateConnected = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setConnectionStatus('connected');
    }, 2000);
  };

  const disconnectBot = () => {
    setConnectionStatus('disconnected');
    setPairingCode('');
    setQrLoaded(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 w-full pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6"
      >
        <div>
          <h1 className="text-3xl tracking-tight font-bold flex items-center gap-2.5">
            <Bot className="w-8 h-8 text-zinc-900 dark:text-white" />
            WhatsApp Bot Settings
          </h1>
          <p className="text-zinc-500 mt-2">
            Link and configure your Asuma Bot session
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {connectionStatus === 'connected' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          )}
          {connectionStatus === 'connecting' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              Pairing Pending
            </span>
          )}
          {connectionStatus === 'disconnected' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-semibold border border-zinc-200 dark:border-zinc-700">
              <span className="w-2 h-2 rounded-full bg-zinc-400" />
              Disconnected
            </span>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Device Linking Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-zinc-900 dark:text-white" />
              Link Device
            </h2>
            <p className="text-zinc-500 text-sm mb-6">
              Connect your WhatsApp number to Asuma Bot using a QR code or pairing code.
            </p>

            <AnimatePresence mode="wait">
              {connectionStatus === 'disconnected' && (
                <motion.div 
                  key="disconnected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl relative w-fit">
                    <button 
                      onClick={() => setPairingMethod('qr')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative z-10 ${pairingMethod === 'qr' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
                    >
                      <QrCode className="w-4 h-4" /> QR Code
                    </button>
                    <button 
                      onClick={() => setPairingMethod('code')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative z-10 ${pairingMethod === 'code' ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
                    >
                      <Key className="w-4 h-4" /> Pairing Code
                    </button>
                    <motion.div 
                      layoutId="pairing-pill" 
                      className="absolute inset-y-1 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 z-0"
                      animate={{
                        left: pairingMethod === 'qr' ? '4px' : '108px',
                        width: pairingMethod === 'qr' ? '100px' : '122px'
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>

                  {pairingMethod === 'code' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3"
                    >
                      <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 block">Phone Number</label>
                      <div className="flex gap-3 max-w-md">
                        <input 
                          type="text" 
                          placeholder="Convert: 628123456789" 
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all text-sm font-mono"
                        />
                      </div>
                    </motion.div>
                  )}

                  <button 
                    onClick={startConnecting}
                    disabled={isGenerating}
                    className="h-12 px-6 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Start Connecting'}
                  </button>
                </motion.div>
              )}

              {connectionStatus === 'connecting' && (
                <motion.div 
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/55 dark:bg-zinc-900/10"
                >
                  {pairingMethod === 'qr' ? (
                    <div className="space-y-6 flex flex-col items-center">
                      <div className="relative w-48 h-48 bg-white border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center p-3 shadow-md group overflow-hidden">
                        {qrLoaded ? (
                          <>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=asuma-bot-premium-setup-2026" alt="QR Code" className="w-full h-full" />
                            <div className="absolute inset-0 bg-zinc-950/10 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs bg-white text-zinc-90 w-fit px-2 py-1 rounded shadow-sm flex items-center gap-1 font-bold"><RefreshCw className="w-3 h-3 animate-spin" /> Live Sync</span>
                            </div>
                          </>
                        ) : (
                          <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
                        )}
                      </div>
                      <div className="max-w-md space-y-2">
                        <p className="font-bold text-sm">Scan QR Code from WhatsApp</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Open WhatsApp on your phone, go to Menu or Settings &gt; Linked Devices &gt; Link a Device, and point your camera at this screen.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 flex flex-col items-center w-full">
                      <div className="h-16 px-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-mono text-2xl font-black tracking-widest text-zinc-900 dark:text-white shadow-inner">
                        {pairingCode || '--------'}
                      </div>
                      <div className="max-w-md space-y-2">
                        <p className="font-bold text-sm">Enter Pairing Code on WhatsApp</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Go to Linked Devices on your mobile app, select &quot;Link with phone number instead&quot;, and enter this 8-digit code.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button 
                      onClick={simulateConnected}
                      className="h-10 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all"
                    >
                      Simulate Link Success
                    </button>
                    <button 
                      onClick={disconnectBot}
                      className="h-10 px-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {connectionStatus === 'connected' && (
                <motion.div 
                  key="connected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl border border-emerald-100 dark:border-emerald-950/50 bg-emerald-500/5 dark:bg-emerald-500/5 flex flex-col sm:flex-row items-center sm:items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Connection Established</h3>
                    <p className="text-sm text-emerald-700 dark:text-emerald-500/90 leading-relaxed">
                      Your WhatsApp application has successfully connected to Asuma server instance. Active commands and listeners are fully operational.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={disconnectBot}
                        className="h-9 px-4 rounded-lg bg-red-650 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 justify-center"
                      >
                        <Power className="w-3.5 h-3.5" /> Disconnect Bot
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right SIDE: Configuration panel */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Bot Config
            </h2>

            {/* Prefix */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                <Hash className="w-4 h-4 text-zinc-500" /> Command Prefix
              </label>
              <input 
                type="text" 
                maxLength={4}
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all text-sm font-mono font-bold"
              />
              <p className="text-xs text-zinc-500">Character that starts bot commands (e.g. !help, .menu)</p>
            </div>

            {/* Switches */}
            <div className="space-y-4 pt-2">
              {/* Welcome Msg */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold block">Welcome Message</span>
                  <span className="text-xs text-zinc-500">Greet new group members</span>
                </div>
                <button 
                  onClick={() => setWelcomeMessage(!welcomeMessage)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${welcomeMessage ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                >
                  <motion.div 
                    layout
                    className={`w-4 h-4 rounded-full bg-white dark:bg-zinc-900 mx-1 absolute`} 
                    animate={{ x: welcomeMessage ? 20 : 0 }}
                  />
                </button>
              </div>

              {/* Downloader Integration */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold block">Auto Downloader</span>
                  <span className="text-xs text-zinc-500">Convert links automatically in chats</span>
                </div>
                <button 
                  onClick={() => setAutoDownloader(!autoDownloader)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${autoDownloader ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                >
                  <motion.div 
                    layout
                    className={`w-4 h-4 rounded-full bg-white dark:bg-zinc-900 mx-1 absolute`} 
                    animate={{ x: autoDownloader ? 20 : 0 }}
                  />
                </button>
              </div>

              {/* Self mode */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <span className="text-sm font-semibold block">Self Mode</span>
                  <span className="text-xs text-zinc-500 font-medium text-amber-600 dark:text-amber-400">Only respond to you</span>
                </div>
                <button 
                  onClick={() => setSelfMode(!selfMode)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${selfMode ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                >
                  <motion.div 
                    layout
                    className={`w-4 h-4 rounded-full bg-white dark:bg-zinc-900 mx-1 absolute`} 
                    animate={{ x: selfMode ? 20 : 0 }}
                  />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800/80 text-xs text-zinc-500 space-y-2">
              <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Asuma Cloud Hosting
              </div>
              <p>Your WhatsApp Bot runs completely on our highly optimized server node clusters, so it remains online 24/7 even when your cellular network or mobile app is disconnected!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
