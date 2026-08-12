import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { weeklyAdmissions } from "../data/mockData";

export default function Analytics() {
  const risk = [{name:"Stable", value:3},{name:"Monitoring",value:1},{name:"Attention",value:1},{name:"Critical",value:1}];
  return <div className="space-y-6">
    <div><h1 className="text-3xl font-bold">Analytics</h1><p className="opacity-60">Population-level monitoring insights and operational trends.</p></div>
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="card border border-base-300 bg-base-100 shadow-sm xl:col-span-2"><div className="card-body"><h2 className="card-title">Patient Monitoring Trend</h2><p className="text-xs opacity-50">Daily status distribution</p><div className="h-80"><ResponsiveContainer><BarChart data={weeklyAdmissions}><CartesianGrid strokeDasharray="3 3" opacity={.2}/><XAxis dataKey="day"/><YAxis/><Tooltip/><Legend/><Bar dataKey="stable" name="Stable" fill="#22c55e"/><Bar dataKey="attention" name="Attention" fill="#f59e0b"/><Bar dataKey="critical" name="Critical" fill="#ef4444"/></BarChart></ResponsiveContainer></div></div></div>
      <div className="card border border-base-300 bg-base-100 shadow-sm"><div className="card-body"><h2 className="card-title">Current Risk Mix</h2><div className="h-72"><ResponsiveContainer><PieChart><Pie data={risk} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100} paddingAngle={3}>{risk.map((_,i)=><Cell key={i} fill={["#22c55e","#3b82f6","#f59e0b","#ef4444"][i]}/>)}</Pie><Tooltip/><Legend/></PieChart></ResponsiveContainer></div></div></div>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      <div className="card border border-base-300 bg-base-100"><div className="card-body"><div className="text-sm opacity-60">Avg. Response Time</div><div className="text-3xl font-bold">4m 18s</div><div className="text-xs text-success">12% faster this week</div></div></div>
      <div className="card border border-base-300 bg-base-100"><div className="card-body"><div className="text-sm opacity-60">Alert Resolution</div><div className="text-3xl font-bold">94.6%</div><div className="text-xs text-success">+2.8% vs last month</div></div></div>
      <div className="card border border-base-300 bg-base-100"><div className="card-body"><div className="text-sm opacity-60">Device Connectivity</div><div className="text-3xl font-bold">99.2%</div><div className="text-xs text-success">Healthy network</div></div></div>
    </div>
  </div>;
}
