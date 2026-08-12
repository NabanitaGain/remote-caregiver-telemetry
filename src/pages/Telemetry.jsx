import { useState } from "react";
import { Activity, Radio } from "lucide-react";
import { patients, telemetry } from "../data/mockData";
import TelemetryChart from "../components/TelemetryChart";

export default function Telemetry() {
  const [patient, setPatient] = useState(patients[0].id);
  const selected = patients.find(p => p.id === patient) || patients[0];

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h1 className="text-3xl font-bold">Live Telemetry</h1><p className="opacity-60">Monitor incoming wearable and home-device readings.</p></div><span className="badge badge-success gap-1 p-3"><Radio size={14}/> Streaming</span></div>
    <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body">
      <label className="form-control max-w-md"><span className="label-text mb-2 font-medium">Select patient</span><select className="select select-bordered" value={patient} onChange={e => setPatient(e.target.value)}>{patients.map(p => <option key={p.id} value={p.id}>{p.name} — {p.id}</option>)}</select></label>
    </div></div>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-figure text-primary"><Activity/></div><div className="stat-title">Heart Rate</div><div className="stat-value text-2xl">{selected.vitals.heartRate}<span className="text-sm"> bpm</span></div><div className="stat-desc">Live reading</div></div>
      <div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-title">SpO₂</div><div className="stat-value text-2xl">{selected.vitals.spo2}<span className="text-sm">%</span></div><div className="stat-desc">Pulse oximeter</div></div>
      <div className="stat rounded-2xl border border-base-300 bg-base-100"><div className="stat-title">Respiratory Rate</div><div className="stat-value text-2xl">{selected.vitals.respiratory}<span className="text-sm"> /min</span></div><div className="stat-desc">Respiration sensor</div></div>
    </div>
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body"><TelemetryChart data={telemetry} metric="heartRate"/></div></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body"><TelemetryChart data={telemetry} metric="spo2"/></div></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body"><TelemetryChart data={telemetry} metric="bloodPressure"/></div></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body"><TelemetryChart data={telemetry} metric="temperature"/></div></div>
    </div>
  </div>;
}
