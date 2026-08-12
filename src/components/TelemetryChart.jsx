import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from "recharts";

export default function TelemetryChart({ data, metric = "heartRate" }) {
  const configs = {
    heartRate: { title: "Heart Rate", unit: "bpm", color: "var(--color-primary, #570df8)", key: "heartRate" },
    spo2: { title: "Blood Oxygen (SpO₂)", unit: "%", color: "#16a34a", key: "spo2" },
    bloodPressure: { title: "Blood Pressure", unit: "mmHg", key: "systolic" },
    temperature: { title: "Body Temperature", unit: "°C", key: "temperature" }
  };
  const c = configs[metric] || configs.heartRate;

  return (
    <div className="h-80 w-full">
      <div className="mb-2">
        <h3 className="font-semibold">{c.title}</h3>
        <p className="text-xs opacity-50">Last 24 hours · {c.unit}</p>
      </div>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval={3} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #ddd" }} />
          {metric === "bloodPressure" ? (
            <>
              <Line type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={2.5} dot={false} name="Systolic" />
              <Line type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Diastolic" />
              <Legend />
            </>
          ) : (
            <Line type="monotone" dataKey={c.key} stroke={c.color} strokeWidth={2.5} dot={false} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
