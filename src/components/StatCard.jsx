export default function StatCard({ title, value, unit, icon: Icon, trend, description, className = "" }) {
  return (
    <div className={`card border border-base-300 bg-base-100 shadow-sm ${className}`}>
      <div className="card-body p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium opacity-60">{title}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">{value}</span>
              {unit && <span className="text-sm opacity-50">{unit}</span>}
            </div>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon size={21} /></div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className={trend?.startsWith("+") ? "text-success" : trend?.startsWith("-") ? "text-error" : "opacity-60"}>{trend}</span>
          <span className="opacity-50">{description}</span>
        </div>
      </div>
    </div>
  );
}
