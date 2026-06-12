export default function ProgressPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-400">Progress</p>
        <h1 className="text-3xl font-bold text-white">This month</h1>
        <p className="mt-2 text-slate-300">
          Your top strength, grappling, and consistency insights will go here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Strength</p>
          <p className="mt-2 text-lg font-semibold text-white">
            No PR data yet
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Grappling</p>
          <p className="mt-2 text-lg font-semibold text-white">
            No focus data yet
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Consistency</p>
          <p className="mt-2 text-lg font-semibold text-white">
            No streak yet
          </p>
        </div>
      </div>
    </section>
  );
}