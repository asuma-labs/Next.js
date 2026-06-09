import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full transition-all duration-300 md:ml-20 lg:ml-64 p-6 md:p-10 pt-20 md:pt-10">
        {children}
      </main>
    </div>
  );
}
