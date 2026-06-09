'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Check, 
  Crown, 
  Zap, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Coins,
  History,
  Info
} from 'lucide-react';

interface Invoice {
  id: string;
  plan: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending';
}

export default function PlansBillingPage() {
  const [activePlan, setActivePlan] = useState<'free' | 'vip'>('vip');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Stats
  const linkLimitUsed = 124;
  const linkLimitTotal = 1000;
  const daysLeft = 24;

  const invoices: Invoice[] = [
    { id: 'TX-78410', plan: 'VIP Premium - Monthly', amount: 'Rp 49.000', date: 'June 01, 2026', status: 'paid' },
    { id: 'TX-76402', plan: 'VIP Premium - Monthly', amount: 'Rp 49.000', date: 'May 01, 2026', status: 'paid' },
    { id: 'TX-74321', plan: 'VIP Premium - Monthly', amount: 'Rp 49.000', date: 'April 01, 2026', status: 'paid' }
  ];

  const handleSubscribeSim = (planName: string) => {
    alert(`Thank you! Loading payment gateway simulation for the ${planName} Plan...`);
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
            <CreditCard className="w-8 h-8 text-zinc-900 dark:text-white" />
            Billing & Subscription
          </h1>
          <p className="text-zinc-500 mt-2">
            Manage your Asuma Bot subscription plan, credit consumption, and invoice receipts
          </p>
        </div>
      </motion.div>

      {/* Overview stats layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active plan view */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-2 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Current Plan Overview</span>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">VIP Premium Plan</h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                <Crown className="w-3.5 h-3.5" /> Premium
              </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-lg">
              You are globally linked as an Asuma VIP member. Private commands, automated social features, and 24/7 dedicated container hosting are operational.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-900 mt-6 md:mt-0">
            <div className="space-y-1">
              <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium"><Coins className="w-3.5 h-3.5" /> Quota Usage</span>
              <p className="text-xl font-bold font-mono">{linkLimitUsed} / {linkLimitTotal}</p>
              <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-805 rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-zinc-900 dark:bg-white rounded-full" 
                  style={{ width: `${(linkLimitUsed / linkLimitTotal) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-zinc-400 flex items-center gap-1 font-medium"><Clock className="w-3.5 h-3.5" /> Next Billing Date</span>
              <p className="text-lg font-bold font-sans">July 02, 2026</p>
              <p className="text-[10px] text-zinc-400 font-medium">In {daysLeft} days (Auto-renews)</p>
            </div>

            <div className="col-span-2 lg:col-span-1 flex items-end">
              <button 
                onClick={() => alert('Subscription cancel sequence requested. Please contact support.')}
                className="text-xs text-zinc-400 hover:text-red-500 hover:underline font-semibold tracking-wide "
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quota breakdown side card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 flex flex-col justify-between shadow-inner"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            </div>
            <h3 className="font-bold">Daily Conversion Limit</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Premium tier users are allowed up to 100 active WhatsApp trigger commands each day. Real-time logging is kept for performance tuning.
            </p>
          </div>

          <div className="pt-6">
            <span className="text-xs bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/15 p-2 rounded-xl flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" /> Dynamic Load Balancing Active
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pricing Comparison Cards */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight">Available Subscription Plans</h3>
            <p className="text-sm text-zinc-500">Pick a scaling profile tailored to your automation workload needs</p>
          </div>

          {/* Billing selector pill */}
          <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-900 rounded-full w-fit border border-zinc-200/50 dark:border-zinc-800/50">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${billingCycle === 'monthly' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-500'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow' : 'text-zinc-500'}`}
            >
              Yearly <span className="text-[9px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between h-full hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-bold">Standard Free</h4>
                <p className="text-xs text-zinc-500">Essential triggers for trial tests</p>
              </div>

              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">Rp 0</span>
                <span className="text-xs text-zinc-400 font-medium ml-1">/ lifetime</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                {['50 command limits daily', 'Standard queue latency', 'Responsive web dashboard', 'Basic public profiles'].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => handleSubscribeSim('Free')}
                className="w-full h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-xs transition-colors"
              >
                Downgrade to Free
              </button>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="p-8 rounded-3xl border-2 border-zinc-900 dark:border-white bg-white dark:bg-zinc-950 flex flex-col justify-between h-full relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-[9px] font-black tracking-widest px-4 py-1 uppercase rounded-bl-xl">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-lg font-extrabold">VIP Premium</h4>
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                </div>
                <p className="text-xs text-zinc-500">Unleash advanced robot capabilities</p>
              </div>

              <div className="flex items-baseline">
                <span className="text-4xl font-black tracking-tight">
                  {billingCycle === 'monthly' ? 'Rp 49K' : 'Rp 39K'}
                </span>
                <span className="text-xs text-zinc-400 font-medium ml-1">/ month</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                {['Unlimited daily triggers', 'Priority socket routing', '1000 downloader queries', 'VIP premium badges', 'Dedicated 24/7 background worker'].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                    <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-white shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                disabled
                className="w-full h-11 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold text-xs disabled:opacity-75 relative"
              >
                Active Subscription
              </button>
            </div>
          </div>

          {/* Enterprise custom tier */}
          <div className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between h-full hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors">
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-lg font-bold">Enterprise</h4>
                <p className="text-xs text-zinc-500">High-volume multi-device deployment</p>
              </div>

              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold tracking-tight">Custom</span>
                <span className="text-xs text-zinc-400 font-medium ml-1">/ tailored</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                {['Multiple WhatsApp links', 'Custom API webhook stream integration', 'Custom brand whitelabel overlay', 'Premium slack / telegram channel support'].map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => handleSubscribeSim('Enterprise')}
                className="w-full h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-xs transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction billing logs */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm space-y-6"
      >
        <h3 className="text-lg font-bold flex items-center gap-2">
          <History className="w-5 h-5 text-zinc-500" />
          Recent Transactions
        </h3>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-900 text-zinc-400 font-semibold">
                <th className="py-3 px-1">Transaction ID</th>
                <th className="py-3 px-1">Subscription Plan</th>
                <th className="py-3 px-1">Amount Paid</th>
                <th className="py-3 px-1">Transaction Date</th>
                <th className="py-3 px-1 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
              {invoices.map((inv) => (
                <tr key={inv.id} className="text-zinc-800 dark:text-zinc-200">
                  <td className="py-3.5 px-1 font-mono font-bold">{inv.id}</td>
                  <td className="py-3.5 px-1 font-medium">{inv.plan}</td>
                  <td className="py-3.5 px-1 font-semibold font-mono">{inv.amount}</td>
                  <td className="py-3.5 px-1 text-zinc-500">{inv.date}</td>
                  <td className="py-3.5 px-1 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 uppercase tracking-widest text-[9px]">
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
