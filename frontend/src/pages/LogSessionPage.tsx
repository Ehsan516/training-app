export default function LogSessionPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-400">Log session</p>
        <h1 className="text-3xl font-bold text-white">What did you train?</h1>
        <p className="mt-2 text-slate-300">
          This will become the fast logging flow for strength, BJJ, wrestling,
          conditioning, and mobility.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {["Strength", "BJJ", "Wrestling", "Conditioning", "Mobility"].map(
          (type) => (
            <button
              key={type}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left hover:border-slate-600"
            >
              <span className="text-lg font-semibold text-white">{type}</span>
              <p className="mt-2 text-sm text-slate-400">
                Start a {type.toLowerCase()} log.
              </p>
            </button>
          )
        )}
      </div>
    </section>
  );
}