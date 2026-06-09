'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Link2, 
  Video, 
  Music, 
  Youtube, 
  Instagram, 
  Facebook, 
  Loader2, 
  CheckCircle, 
  Play, 
  ListPlus, 
  Sparkles, 
  Globe, 
  Clock, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface DownloadHistoryItem {
  id: string;
  url: string;
  host: string;
  title: string;
  format: 'mp4' | 'mp3';
  size: string;
  date: string;
}

export default function DownloaderPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'mp4' | 'mp3'>('mp4');
  const [downloadStep, setDownloadStep] = useState<'idle' | 'analyzing' | 'downloading' | 'converting' | 'success'>('idle');
  const [progressVal, setProgressVal] = useState(0);
  const [detectedEngine, setDetectedEngine] = useState<'general' | 'youtube' | 'tiktok' | 'instagram' | 'facebook'>('general');
  const [activeMediaTitle, setActiveMediaTitle] = useState('');
  const [activeMediaSize, setActiveMediaSize] = useState('');

  const [history, setHistory] = useState<DownloadHistoryItem[]>([
    { id: '1', url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', host: 'youtube', title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)', format: 'mp4', size: '14.2 MB', date: 'Just now' },
    { id: '2', url: 'https://tiktok.com/@tiktok/video/1234567890', host: 'tiktok', title: 'Viral dance challenge trends today in global feeds', format: 'mp4', size: '4.8 MB', date: '2 hours ago' },
    { id: '3', url: 'https://instagram.com/p/C_abcd123456', host: 'instagram', title: 'Asuma Labs - Product Teaser and Layout Release Reel', format: 'mp3', size: '3.1 MB', date: 'Yesterday' }
  ]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputUrl(value);

    // Platform Auto-Detection
    if (value.includes('youtube.com') || value.includes('youtu.be')) {
      setDetectedEngine('youtube');
    } else if (value.includes('tiktok.com')) {
      setDetectedEngine('tiktok');
    } else if (value.includes('instagram.com')) {
      setDetectedEngine('instagram');
    } else if (value.includes('facebook.com') || value.includes('fb.watch')) {
      setDetectedEngine('facebook');
    } else {
      setDetectedEngine('general');
    }
  };

  const startDownloadSim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;

    setDownloadStep('analyzing');
    setProgressVal(0);

    // Simulate Title extraction
    let title = 'Extracted Media Content';
    let size = '12.5 MB';
    if (detectedEngine === 'youtube') {
      title = 'Asuma - Next.js Tutorial with Framer Motion Intro.mp4';
      size = '22.4 MB';
    } else if (detectedEngine === 'tiktok') {
      title = 'Tiktok_Video_Watermarkless_' + Math.floor(Math.random() * 1000) + '.mp4';
      size = '6.1 MB';
    } else if (detectedEngine === 'instagram') {
      title = 'Instagram_Post_Media_HD_Reel.mp4';
      size = '8.9 MB';
    } else if (detectedEngine === 'facebook') {
      title = 'Facebook_Video_Original_Quality.mp4';
      size = '18.0 MB';
    }
    setActiveMediaTitle(title);
    setActiveMediaSize(size);

    // Step 1: Analyzing (1.5s)
    setTimeout(() => {
      setDownloadStep('downloading');
      
      // Progress simulation loop
      const interval = setInterval(() => {
        setProgressVal((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setDownloadStep('converting');
            
            // Step 3: Converting (1.5s)
            setTimeout(() => {
              setDownloadStep('success');
              // Add to history list at beginning
              setHistory((prevHistory) => [
                {
                  id: String(Date.now()),
                  url: inputUrl,
                  host: detectedEngine,
                  title: title,
                  format: selectedFormat,
                  size: size,
                  date: 'Just now'
                },
                ...prevHistory
              ]);
            }, 1500);

            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }, 1500);
  };

  const getPlatformIcon = (host: string) => {
    switch (host) {
      case 'youtube': return <Youtube className="w-5 h-5 text-red-500" />;
      case 'tiktok': return <Play className="w-5 h-5 text-zinc-900 dark:text-white" />;
      case 'instagram': return <Instagram className="w-5 h-5 text-pink-500" />;
      case 'facebook': return <Facebook className="w-5 h-5 text-blue-600" />;
      default: return <Globe className="w-5 h-5 text-zinc-400" />;
    }
  };

  const resetForm = () => {
    setInputUrl('');
    setDownloadStep('idle');
    setProgressVal(0);
    setDetectedEngine('general');
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
            <Download className="w-8 h-8 text-zinc-900 dark:text-white" />
            Social Media Downloader
          </h1>
          <p className="text-zinc-500 mt-2">
            Instantly download videos or audio from YouTube, TikTok, Instagram, and more
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Converter Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              Download Console
            </h2>
            <p className="text-zinc-500 text-sm mb-8">
              Paste your link and select target conversion format profile.
            </p>

            <AnimatePresence mode="wait">
              {downloadStep === 'idle' ? (
                <motion.form 
                  key="form"
                  onSubmit={startDownloadSim}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative">
                    <input 
                      type="url" 
                      required
                      placeholder="Paste link e.g. https://www.youtube.com/watch?v=..."
                      value={inputUrl}
                      onChange={handleUrlChange}
                      className="w-full pl-12 pr-4 h-14 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white outline-none transition-all text-sm font-medium"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                      {getPlatformIcon(detectedEngine)}
                    </div>
                  </div>

                  {detectedEngine !== 'general' && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold border border-zinc-150 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Platform Detected: <span className="uppercase text-zinc-800 dark:text-white font-bold">{detectedEngine}</span>
                    </motion.div>
                  )}

                  {/* Format Choice */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Format Profile</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        type="button"
                        onClick={() => setSelectedFormat('mp4')}
                        className={`p-4 rounded-2xl border flex flex-col gap-2 text-left transition-all ${selectedFormat === 'mp4' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent shadow-md' : 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                      >
                        <Video className="w-5 h-5 shrink-0" />
                        <div>
                          <span className="text-sm font-bold block">Video MP4</span>
                          <span className={`text-[11px] ${selectedFormat === 'mp4' ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500'}`}>Full HD without Watermark</span>
                        </div>
                      </button>

                      <button 
                        type="button"
                        onClick={() => setSelectedFormat('mp3')}
                        className={`p-4 rounded-2xl border flex flex-col gap-2 text-left transition-all ${selectedFormat === 'mp3' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent shadow-md' : 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900'}`}
                      >
                        <Music className="w-5 h-5 shrink-0" />
                        <div>
                          <span className="text-sm font-bold block">Audio MP3</span>
                          <span className={`text-[11px] ${selectedFormat === 'mp3' ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500'}`}>320kbps High Fidelity</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-14 rounded-2xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 text-white dark:text-zinc-950 font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Fetch & Convert Link
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="simulating"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-3xl flex flex-col items-center justify-center text-center gap-6"
                >
                  {downloadStep === 'analyzing' && (
                    <div className="space-y-4 flex flex-col items-center py-6">
                      <Loader2 className="w-10 h-10 text-zinc-500 animate-spin" />
                      <div className="space-y-1">
                        <p className="font-bold">Analyzing URL Metadata...</p>
                        <p className="text-xs text-zinc-500">Querying platform endpoints for live stream segments.</p>
                      </div>
                    </div>
                  )}

                  {downloadStep === 'downloading' && (
                    <div className="space-y-6 w-full max-w-md py-4">
                      <div className="space-y-1.5 text-center">
                        <p className="font-bold text-sm">Downloading payload binary segment data...</p>
                        <p className="text-xs font-mono text-zinc-400">{progressVal}% complete • {activeMediaSize}</p>
                      </div>
                      <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <motion.div 
                          className="h-full bg-zinc-900 dark:bg-white rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progressVal}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  )}

                  {downloadStep === 'converting' && (
                    <div className="space-y-4 flex flex-col items-center py-6">
                      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                      <div className="space-y-1">
                        <p className="font-bold">Converting to high fidelity .{selectedFormat}...</p>
                        <p className="text-xs text-zinc-500">Joining audio & video tracks, applying codec normalization.</p>
                      </div>
                    </div>
                  )}

                  {downloadStep === 'success' && (
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="space-y-6 flex flex-col items-center w-full py-2"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-2 max-w-md">
                        <p className="font-bold text-lg text-zinc-900 dark:text-white">Conversion Complete!</p>
                        <p className="text-xs font-semibold text-zinc-500 leading-relaxed max-w-sm truncate text-ellipsis">{activeMediaTitle}</p>
                        <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{selectedFormat === 'mp4' ? 'Video format' : 'Audio format'} • {activeMediaSize}</p>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => {
                            alert('Your download has started in background!');
                          }}
                          className="h-11 px-6 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold text-sm flex items-center gap-2 shadow"
                        >
                          Save to Disk <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={resetForm}
                          className="h-11 px-6 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-zinc-150 dark:hover:bg-zinc-900"
                        >
                          Download Another
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* History Area */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm flex flex-col h-full space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-500" />
              Recent Logs
            </h3>

            <div className="space-y-4 max-h-[350px] overflow-y-auto scrollbar-none pr-1">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 flex flex-col gap-2 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(item.host)}
                      <span className="text-[10px] tracking-wider uppercase font-extrabold text-zinc-400">{item.host}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">{item.date}</span>
                  </div>
                  
                  <p className="text-xs font-bold font-sans text-zinc-800 dark:text-zinc-200 line-clamp-1">{item.title}</p>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-1">
                    <span>{item.size} • <span className="uppercase text-zinc-800 dark:text-zinc-300 font-bold">{item.format}</span></span>
                    <button 
                      onClick={() => alert(`Re-downloading ${item.title}`)}
                      className="text-zinc-900 dark:text-white font-bold hover:underline inline-flex items-center gap-1 focus:outline-none"
                    >
                      Redownload <Download className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-xs text-zinc-500">
              <div className="font-bold flex items-center gap-1 text-zinc-700 dark:text-zinc-300 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Unlimited Conversion
              </div>
              Asuma premium users enjoy infinite bandwidth capacity and instant format optimization streams. No files are stored permanently on our public proxy nodes.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
