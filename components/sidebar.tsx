'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Bot, Download, CreditCard, Settings, 
  ChevronLeft, Menu, X, User, LogOut 
} from 'lucide-react';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/bot', label: 'WhatsApp Bot', icon: Bot },
    { href: '/dashboard/downloader', label: 'Downloader', icon: Download },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border shadow-lg text-foreground hover:bg-accent transition-all"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 border-r border-border bg-background/95 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >        <div className="flex flex-col gap-2 p-4">
          {/* Collapse Toggle (Desktop Only) */}
          <div className="hidden md:flex justify-end mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg border border-border hover:bg-accent hover:text-primary text-foreground/60 transition-all"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 shadow-sm' 
                      : 'text-foreground/60 hover:bg-accent hover:text-foreground'
                    }
                  `}
                >
                  {/* Active Indicator Glow */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-r-full" />
                  )}

                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-foreground/50 group-hover:text-foreground'}`} />
                  
                  <span className={`whitespace-nowrap transition-all duration-300 
                    ${isCollapsed ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'}
                  `}>
                    {item.label}
                  </span>

                  {/* Tooltip for Collapsed State */}
                  {isCollapsed && (
                    <div className="hidden md:block absolute left-full ml-3 px-2.5 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                    </div>
                  )}
                </Link>
              );            })}
          </nav>
        </div>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition-colors cursor-pointer group`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 text-white font-bold shadow-md">
              D
            </div>
            <div className={`flex flex-col min-w-0 transition-all duration-300
              ${isCollapsed ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'}
            `}>
              <span className="text-sm font-semibold text-foreground truncate">ditss</span>
              <span className="text-xs text-foreground/50 truncate">Premium Owner</span>
            </div>
            
            {/* Logout Icon (Visible on hover or always if collapsed) */}
            <LogOut className={`w-4 h-4 text-foreground/40 group-hover:text-red-500 transition-colors ml-auto
              ${isCollapsed ? 'md:hidden' : 'block'}
            `} />
          </div>
        </div>
      </aside>
    </>
  );
}
