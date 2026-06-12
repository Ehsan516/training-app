export default function HistoryPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-400">History</p>
        <h1 className="text-3xl font-bold text-white">Training timeline</h1>
        <p className="mt-2 text-slate-300">
          Recent sessions will appear here as diary-style cards.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <p className="text-slate-300">No sessions loaded yet.</p>
      </div>
    </section>
  );
}