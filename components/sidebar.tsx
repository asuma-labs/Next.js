'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Bot, Download, CreditCard, Settings, ChevronLeft, Menu, X, LogOut, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/bot', label: 'WhatsApp Bot', icon: Bot },
    { href: '/dashboard/downloader', label: 'Downloader', icon: Download },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-lg text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all">
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)} 
        />
      )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 h-screen z-50 border-r border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}>
        <div className="flex flex-col h-full">
           <div className={`flex items-center h-16 border-b border-zinc-200 dark:border-zinc-800 px-4 shrink-0 transition-opacity ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
             <Link href="/" className={`flex items-center gap-2 font-bold text-xl tracking-tight ${isCollapsed ? 'md:hidden' : ''}`}>
               <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center shrink-0">
                 <Sparkles className="w-4 h-4" />
               </div>
               <span>Asuma Bot</span>
             </Link>
             {isCollapsed && (
               <Link href="/" className="hidden md:flex w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 items-center justify-center shrink-0">
                 <Sparkles className="w-4 h-4" />
               </Link>
             )}
             <button onClick={() => setIsCollapsed(!isCollapsed)}
               className="hidden md:flex p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-all">
               <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
             </button>
           </div>
          
           <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1.5 scrollbar-none">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${isActive ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-zinc-100'}`}>
                  {isActive && <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-900 dark:bg-white rounded-r-full" />}
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white'}`} />
                  <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'}`}>
                    {item.label}
                  </span>
                  {isCollapsed && (
                    <div className="hidden md:block absolute left-full ml-2 px-2.5 py-1.5 bg-zinc-900 text-white text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-zinc-800">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
           </div>

           <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
             <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer group">
               <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 font-bold border border-zinc-300 dark:border-zinc-700">
                 U
               </div>
               <div className={`flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'}`}>
                 <span className="text-sm font-semibold truncate leading-tight">User Name</span>
                 <span className="text-xs text-zinc-500 truncate leading-tight">Free Plan</span>
               </div>
               <LogOut className={`w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors ml-auto ${isCollapsed ? 'md:hidden' : 'block'}`} />
             </div>
           </div>
        </div>
      </aside>
    </>
  );
}
