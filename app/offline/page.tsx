export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">📴 Offline</h1>
        <p className="text-lg mb-8">
          Kamu sedang offline. Beberapa fitur mungkin tidak tersedia.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
        >
          Coba Muat Ulang
        </button>
      </div>
    </div>
  );
}
