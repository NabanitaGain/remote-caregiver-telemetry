import { useMemo, useState } from "react";
import { alerts as initialAlerts } from "../data/mockData";
import AlertTable from "../components/AlertTable";

export default function Alerts() {
  const [items, setItems] = useState(initialAlerts);
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => items.filter(a => filter === "All" || a.severity === filter), [items, filter]);
  const resolve = id => setItems(items.map(a => a.id === id ? {...a, status: "Resolved"} : a));

  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold">Alerts & Events</h1><p className="opacity-60">Review abnormal telemetry and caregiver actions.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-title">Open</div><div className="stat-value">{items.filter(a => a.status === "Open").length}</div></div><div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-title">Critical</div><div className="stat-value text-error">{items.filter(a => a.severity === "Critical").length}</div></div><div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-title">Resolved</div><div className="stat-value text-success">{items.filter(a => a.status === "Resolved").length}</div></div></div>
    <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-0">
      <div className="flex flex-wrap gap-2 border-b border-base-300 p-4">{["All","Critical","Warning","Info"].map(x => <button key={x} onClick={() => setFilter(x)} className={`btn btn-sm ${filter === x ? "btn-primary" : "btn-ghost"}`}>{x}</button>)}</div>
      <AlertTable items={filtered} onResolve={resolve}/>
    </div></div>
  </div>;
}
