import { CheckCircle2, Clock3 } from "lucide-react";

const colors = { Critical: "badge-error", Warning: "badge-warning", Info: "badge-info" };

export default function AlertTable({ items, onResolve }) {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead><tr><th>Alert</th><th>Patient</th><th>Reading</th><th>Severity</th><th>Time</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id} className="hover">
              <td><div className="font-medium">{a.type}</div><div className="text-xs opacity-40">{a.id}</div></td>
              <td>{a.patient}</td>
              <td className="font-semibold">{a.value}</td>
              <td><span className={`badge ${colors[a.severity]} badge-sm`}>{a.severity}</span></td>
              <td className="text-sm opacity-60">{a.time}</td>
              <td><span className="badge badge-ghost badge-sm">{a.status}</span></td>
              <td>{a.status === "Open" && <button onClick={() => onResolve(a.id)} className="btn btn-outline btn-xs"><CheckCircle2 size={14}/> Resolve</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
