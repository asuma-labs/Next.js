// app/dashboard/page.tsx
import { Bot, Download, Zap, Shield } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Active Bots', value: '3', icon: Bot, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Total Downloads', value: '1,240', icon: Download, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'API Requests', value: '8.5k', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Account Status', value: 'Premium', icon: Shield, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, ditss! 👋</h1>
        <p className="text-foreground/60 mt-1">Here's what's happening with your Asuma bots today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="p-6 rounded-2xl border border-border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-foreground/40 group-hover:text-primary transition-colors">+12% from last week</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions / Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-background/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Bot Session Reconnected</p>
                  <p className="text-xs text-foreground/50">WhatsApp Bot • 2 minutes ago</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <h2 className="text-lg font-semibold mb-2">Upgrade to Pro</h2>
          <p className="text-blue-100 text-sm mb-6">Get unlimited bot sessions, priority support, and advanced downloader features.</p>
          <button className="w-full py-2.5 px-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
            View Plans
          </button>
        </div>
      </div>
    </div>
  );
}
