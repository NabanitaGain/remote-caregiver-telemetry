import { useMemo, useState } from "react";
import { Search, UserPlus, SlidersHorizontal } from "lucide-react";
import { patients } from "../data/mockData";
import PatientTable from "../components/PatientTable";

export default function Patients() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => patients.filter(p =>
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())) &&
    (status === "All" || p.status === status)
  ), [query, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h1 className="text-3xl font-bold">Patients</h1><p className="opacity-60">Manage and monitor your remote patient population.</p></div><button className="btn btn-primary"><UserPlus size={17}/> Add patient</button></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="input input-bordered flex-1"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or patient ID..." /></label>
          <label className="select select-bordered"><SlidersHorizontal size={16}/><select value={status} onChange={e => setStatus(e.target.value)}><option>All</option><option>Stable</option><option>Monitoring</option><option>Needs Attention</option><option>Critical</option></select></label>
        </div>
      </div></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body p-0"><PatientTable patients={filtered}/></div></div>
    </div>
  );
}
