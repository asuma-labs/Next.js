"use client";

import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">⚠️ Offline</h1>
        <p className="text-slate-300 mb-6">Koneksi internet terputus</p>
        <button
          onClick={() => router.refresh()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
