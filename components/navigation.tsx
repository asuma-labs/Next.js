'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X, Sparkles, Github } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
const isDashboardPage = pathname === '/dashboard' || pathname.match(/^\/[^\/]+$/);
if (isDashboardPage) {
  return null;
}
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
  ];

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 shadow-sm' : 'bg-transparent'}`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex flex-row items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="hidden sm:block">Asuma Bot</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-full font-medium transition-colors text-sm ${isActive ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}`}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:flex items-center px-4 py-2 rounded-full font-medium text-sm transition-colors bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            Login
          </Link>
          <a href="https://github.com/asuma-labs/Next.js/tree/main" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
             className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            {mounted ? (resolvedTheme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />) : <div className="w-4 h-4" />}
          </button>
          <button className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'}`}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              );
            })}
            <Link href="/login" 
              className="px-4 py-3 rounded-xl font-medium transition-colors bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-center mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
