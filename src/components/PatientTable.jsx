import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const statusClass = {
  Stable: "badge-success",
  "Needs Attention": "badge-warning",
  Critical: "badge-error",
  Monitoring: "badge-info"
};

export default function PatientTable({ patients, compact = false }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead><tr><th>Patient</th><th>Status</th><th>Heart Rate</th><th>SpO₂</th><th>BP</th><th>Last Seen</th><th></th></tr></thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id} className="hover">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                  <div className="w-10 rounded-full ring-2 ring-base-300">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                  <div><div className="font-semibold">{p.name}</div><div className="text-xs opacity-50">{p.id} · {p.age} yrs</div></div>
                </div>
              </td>
              <td><span className={`badge ${statusClass[p.status] || "badge-ghost"} badge-sm`}>{p.status}</span></td>
              <td className="font-medium">{p.vitals.heartRate} bpm</td>
              <td className={p.vitals.spo2 < 92 ? "font-bold text-error" : ""}>{p.vitals.spo2}%</td>
              <td>{p.vitals.systolic}/{p.vitals.diastolic}</td>
              <td className="text-sm opacity-60">{p.lastSeen}</td>
              <td><Link to={`/patients/${p.id}`} className="btn btn-ghost btn-sm"><Eye size={16} /></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
