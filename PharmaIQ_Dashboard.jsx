import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const C = {
  navy: "#1E3A5F", blue: "#2563EB", sky: "#0EA5E9", teal: "#0D9488",
  green: "#10B981", amber: "#F59E0B", red: "#EF4444", purple: "#8B5CF6",
  orange: "#F97316", bg: "#F1F5F9", card: "#FFFFFF", border: "#E2E8F0",
  tp: "#0F172A", ts: "#64748B", tm: "#94A3B8"
};
const PIE_COLORS = ["#2563EB", "#0D9488", "#F59E0B", "#8B5CF6", "#F97316", "#10B981"];

// ── DATA ──────────────────────────────────────────────────────────────────────

const gmvData = [
  { month: "Apr", gmv: 42.3, lastYear: 31.2 }, { month: "May", gmv: 45.1, lastYear: 33.5 },
  { month: "Jun", gmv: 43.8, lastYear: 34.1 }, { month: "Jul", gmv: 47.2, lastYear: 35.8 },
  { month: "Aug", gmv: 48.6, lastYear: 36.2 }, { month: "Sep", gmv: 51.3, lastYear: 38.4 },
  { month: "Oct", gmv: 53.9, lastYear: 40.1 }, { month: "Nov", gmv: 56.2, lastYear: 41.8 },
  { month: "Dec", gmv: 61.4, lastYear: 44.2 }, { month: "Jan", gmv: 54.1, lastYear: 42.3 },
  { month: "Feb", gmv: 55.8, lastYear: 43.1 }, { month: "Mar", gmv: 58.7, lastYear: 45.6 }
];

const categoryData = [
  { name: "Chronic Medicines", value: 35, revenue: 20.5 },
  { name: "OTC Medicines",     value: 22, revenue: 12.9 },
  { name: "Wellness",          value: 18, revenue: 10.6 },
  { name: "Personal Care",     value: 12, revenue: 7.0  },
  { name: "Baby Care",         value:  8, revenue: 4.7  },
  { name: "Vitamins & Supps",  value:  5, revenue: 2.9  }
];

const inventoryData = [
  { category: "Chronic",       turnover: 8.2, benchmark: 7.5 },
  { category: "OTC",           turnover: 12.4, benchmark: 11.0 },
  { category: "Wellness",      turnover: 6.8, benchmark: 7.2 },
  { category: "Personal Care", turnover: 9.1, benchmark: 8.5 },
  { category: "Baby Care",     turnover: 7.3, benchmark: 7.0 },
  { category: "Vitamins",      turnover: 5.9, benchmark: 6.5 }
];

const supplierData = [
  { name: "Sun Pharma",  score: 94, onTime: 97, quality: 98, fill: 96 },
  { name: "Cipla",       score: 91, onTime: 94, quality: 96, fill: 93 },
  { name: "Dr Reddy's",  score: 88, onTime: 91, quality: 93, fill: 90 },
  { name: "Lupin",       score: 85, onTime: 88, quality: 90, fill: 87 },
  { name: "Abbott India",score: 82, onTime: 85, quality: 88, fill: 84 }
];

const slaData = [
  { zone: "Metro",  target: 24, actual: 22 },
  { zone: "Tier 1", target: 36, actual: 31 },
  { zone: "Tier 2", target: 48, actual: 43 },
  { zone: "Tier 3", target: 72, actual: 68 }
];

const competitorData = [
  { metric: "Market Share",        "Tata 1mg": 34, "PharmEasy": 28, "Apollo": 22, "Netmeds": 16 },
  { metric: "Delivery Speed",      "Tata 1mg": 88, "PharmEasy": 72, "Apollo": 80, "Netmeds": 68 },
  { metric: "App Rating",          "Tata 1mg": 92, "PharmEasy": 84, "Apollo": 78, "Netmeds": 76 },
  { metric: "Chronic Penetration", "Tata 1mg": 82, "PharmEasy": 65, "Apollo": 70, "Netmeds": 58 },
  { metric: "Price Index",         "Tata 1mg": 76, "PharmEasy": 72, "Apollo": 68, "Netmeds": 74 },
  { metric: "Pincode Coverage",    "Tata 1mg": 88, "PharmEasy": 80, "Apollo": 72, "Netmeds": 76 }
];

const regionalData = [
  { city: "Mumbai",    gmv: 12.4, growth: 18.2, orders: 52, tier: 1 },
  { city: "Delhi NCR", gmv: 10.8, growth: 22.1, orders: 46, tier: 1 },
  { city: "Bengaluru", gmv: 9.2,  growth: 25.3, orders: 39, tier: 1 },
  { city: "Hyderabad", gmv: 5.8,  growth: 19.7, orders: 25, tier: 1 },
  { city: "Chennai",   gmv: 4.9,  growth: 16.4, orders: 21, tier: 1 },
  { city: "Pune",      gmv: 3.7,  growth: 21.8, orders: 16, tier: 2 },
  { city: "Ahmedabad", gmv: 3.1,  growth: 28.4, orders: 13, tier: 2 },
  { city: "Jaipur",    gmv: 2.4,  growth: 34.2, orders: 10, tier: 2 }
];

const tierData = [
  { tier: "Tier 1", gmv: 43.1, growth: 21.4, share: 73.4 },
  { tier: "Tier 2", gmv: 11.2, growth: 31.7, share: 19.1 },
  { tier: "Tier 3", gmv: 4.4,  growth: 47.3, share: 7.5  }
];

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────

function KPICard({ label, value, unit, sub, trend }) {
  const up = trend > 0;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", flex: 1 }}>
      <div style={{ fontSize: 11, color: C.ts, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: C.tp }}>{value}</span>
        {unit && <span style={{ fontSize: 13, color: C.ts, fontWeight: 500 }}>{unit}</span>}
      </div>
      {trend !== undefined && (
        <div style={{ fontSize: 12, fontWeight: 600, color: up ? C.green : C.red }}>
          {up ? "▲" : "▼"} {Math.abs(trend).toFixed(1)}% vs last month
        </div>
      )}
      {sub && <div style={{ fontSize: 11, color: C.tm, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function CardWrap({ children, title }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
      {title && (
        <div style={{ fontSize: 14, fontWeight: 700, color: C.tp, marginBottom: 16, paddingBottom: 8, borderBottom: `2px solid ${C.blue}`, display: "inline-block" }}>
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

const Tip = ({ active, payload, label, prefix = "", suffix = "" }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
      <div style={{ fontWeight: 700, color: C.tp, marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{prefix}{typeof p.value === "number" ? p.value.toFixed(1) : p.value}{suffix}</strong>
        </div>
      ))}
    </div>
  );
};

// ── TAB: OVERVIEW ─────────────────────────────────────────────────────────────

function OverviewTab() {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KPICard label="Monthly GMV"       value="₹58.7" unit="Cr"  trend={5.2} />
        <KPICard label="Order Fill Rate"   value="94.2"  unit="%"   trend={0.8} />
        <KPICard label="Avg Order Value"   value="₹423"             trend={3.1} />
        <KPICard label="Active Users"      value="4.2"   unit="M"   trend={7.4} />
        <KPICard label="Net Promoter Score" value="62"              trend={2.0} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <CardWrap title="GMV Trend (₹ Cr) — FY 2024–25">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={gmvData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.ts }} />
              <YAxis tick={{ fontSize: 11, fill: C.ts }} domain={[25, 70]} />
              <Tooltip content={<Tip prefix="₹" suffix=" Cr" />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="gmv" name="FY25" stroke={C.blue} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="lastYear" name="FY24" stroke={C.tm} strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardWrap>

        <CardWrap title="Revenue by Category — Mar 2025">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width="55%" height={240}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={52} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {categoryData.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[i], flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, color: C.tp, fontWeight: 500, lineHeight: 1.3 }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: C.ts }}>₹{d.revenue}Cr · {d.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardWrap>
      </div>
    </div>
  );
}

// ── TAB: SUPPLY CHAIN ─────────────────────────────────────────────────────────

function SupplyChainTab() {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KPICard label="Avg Inventory Turnover" value="8.3"  unit="×"  trend={4.2} />
        <KPICard label="Stockout Rate"           value="3.8"  unit="%"  trend={-0.6} />
        <KPICard label="On-Time Delivery"        value="91.4" unit="%"  trend={1.2} />
        <KPICard label="Supplier Fill Rate"      value="96.2" unit="%"  trend={0.4} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <CardWrap title="Inventory Turnover vs Benchmark">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={inventoryData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: C.ts }} domain={[0, 15]} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: C.ts }} width={88} />
              <Tooltip content={<Tip suffix="×" />} />
              <Legend iconType="square" iconSize={9} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="turnover"  name="Actual"    fill={C.blue} radius={[0, 4, 4, 0]} barSize={9} />
              <Bar dataKey="benchmark" name="Benchmark" fill={C.tm}   radius={[0, 4, 4, 0]} barSize={9} />
            </BarChart>
          </ResponsiveContainer>
        </CardWrap>

        <CardWrap title="Delivery SLA Performance (hrs)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={slaData} margin={{ left: 0, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="zone" tick={{ fontSize: 12, fill: C.ts }} />
              <YAxis tick={{ fontSize: 11, fill: C.ts }} />
              <Tooltip content={<Tip suffix=" hrs" />} />
              <Legend iconType="square" iconSize={9} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="actual" name="Actual"  fill={C.teal} radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target"  fill={C.tm}   radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardWrap>
      </div>

      <CardWrap title="Supplier Scorecard">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              {["Supplier", "Overall Score", "On-Time %", "Quality", "Fill Rate", "Status"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: C.ts, fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {supplierData.map((s, i) => {
              const status = s.score > 90 ? ["Preferred", "#D1FAE5", "#065F46"] : s.score > 85 ? ["Approved", "#FEF3C7", "#92400E"] : ["Review", "#FEE2E2", "#991B1B"];
              const barColor = s.score > 90 ? C.green : s.score > 85 ? C.amber : C.red;
              return (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: C.tp }}>{s.name}</td>
                  <td style={{ padding: "10px 12px", minWidth: 120 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "#F1F5F9", borderRadius: 3 }}>
                        <div style={{ width: `${s.score}%`, height: "100%", background: barColor, borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.tp, minWidth: 26 }}>{s.score}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", color: C.tp }}>{s.onTime}%</td>
                  <td style={{ padding: "10px 12px", color: C.tp }}>{s.quality}%</td>
                  <td style={{ padding: "10px 12px", color: C.tp }}>{s.fill}%</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: status[1], color: status[2] }}>{status[0]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardWrap>
    </div>
  );
}

// ── TAB: MARKET INTELLIGENCE ──────────────────────────────────────────────────

function MarketTab() {
  const compCols = ["Tata 1mg", "PharmEasy", "Apollo", "Netmeds"];
  const compColors = [C.blue, C.orange, C.teal, C.purple];

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KPICard label="Market Share"          value="34"    unit="%"  trend={2.1} sub="ePharmacy segment" />
        <KPICard label="App Store Rating"      value="4.6"   unit="★"  trend={0.2} sub="4.2M reviews" />
        <KPICard label="Chronic Penetration"   value="82"    unit="%"  trend={3.4} sub="Highest in category" />
        <KPICard label="Pincode Coverage"      value="21K+"            sub="Dark store network" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <CardWrap title="Competitive Positioning Radar">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={competitorData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: C.ts }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Tata 1mg"  dataKey="Tata 1mg"  stroke={C.blue}   fill={C.blue}   fillOpacity={0.15} strokeWidth={2.5} />
              <Radar name="PharmEasy" dataKey="PharmEasy" stroke={C.orange}  fill={C.orange} fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
              <Radar name="Apollo"    dataKey="Apollo"    stroke={C.teal}    fill={C.teal}   fillOpacity={0.08} strokeWidth={1.5} strokeDasharray="4 2" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </CardWrap>

        <CardWrap title="Key Metric Comparison (%)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={competitorData.slice(0, 4)} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="metric" tick={{ fontSize: 10, fill: C.ts }} interval={0} angle={-20} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: C.ts }} />
              <Tooltip content={<Tip suffix="%" />} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              {compCols.map((col, i) => <Bar key={col} dataKey={col} fill={compColors[i]} radius={[3, 3, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>
        </CardWrap>
      </div>

      <CardWrap title="Competitive Intelligence Scorecard">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              <th style={{ padding: "8px 12px", textAlign: "left", color: C.ts, fontSize: 12, fontWeight: 600 }}>Metric</th>
              {compCols.map((col, i) => (
                <th key={col} style={{ padding: "8px 12px", textAlign: "center", color: compColors[i], fontSize: 12, fontWeight: 700 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {competitorData.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: C.tp }}>{row.metric}</td>
                {compCols.map((col) => {
                  const val = row[col];
                  const maxVal = Math.max(...compCols.map(c => row[c]));
                  const isMax = val === maxVal;
                  return (
                    <td key={col} style={{ padding: "10px 12px", textAlign: "center" }}>
                      <span style={{ fontWeight: isMax ? 700 : 400, color: isMax ? C.blue : C.tp, background: isMax ? "#EFF6FF" : "transparent", padding: isMax ? "2px 8px" : 0, borderRadius: 4 }}>
                        {val}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </CardWrap>
    </div>
  );
}

// ── TAB: REGIONAL ─────────────────────────────────────────────────────────────

function RegionalTab() {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <KPICard label="Tier 1 GMV Share"  value="73.4" unit="%" trend={-1.2} sub="Healthy mix shifting" />
        <KPICard label="Tier 2 Growth"     value="31.7" unit="%" trend={8.4}  sub="YoY acceleration" />
        <KPICard label="Tier 3 Growth"     value="47.3" unit="%" trend={12.1} sub="Underpenetrated" />
        <KPICard label="Cities Covered"    value="1,040"          trend={9.4}  sub="Across all tiers" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <CardWrap title="GMV by City Tier (₹ Cr)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tierData} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="tier" tick={{ fontSize: 13, fill: C.ts }} />
              <YAxis tick={{ fontSize: 11, fill: C.ts }} />
              <Tooltip content={<Tip prefix="₹" suffix=" Cr" />} />
              <Bar dataKey="gmv" name="GMV" fill={C.blue} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardWrap>

        <CardWrap title="YoY Growth Rate by Tier (%)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tierData} margin={{ left: 0, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="tier" tick={{ fontSize: 13, fill: C.ts }} />
              <YAxis tick={{ fontSize: 11, fill: C.ts }} />
              <Tooltip content={<Tip suffix="%" />} />
              <Bar dataKey="growth" name="YoY Growth %" fill={C.green} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardWrap>
      </div>

      <CardWrap title="Top City Performance — Mar 2025">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              {["City", "Tier", "GMV (₹ Cr)", "YoY Growth", "Orders (k)", "Signal"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: C.ts, fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {regionalData.map((r, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: C.tp }}>{r.city}</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: r.tier === 1 ? "#DBEAFE" : "#FEF3C7", color: r.tier === 1 ? "#1D4ED8" : "#92400E" }}>
                    Tier {r.tier}
                  </span>
                </td>
                <td style={{ padding: "10px 12px", fontWeight: 600, color: C.tp }}>₹{r.gmv}</td>
                <td style={{ padding: "10px 12px", color: C.green, fontWeight: 600 }}>▲ {r.growth}%</td>
                <td style={{ padding: "10px 12px", color: C.tp }}>{r.orders}k</td>
                <td style={{ padding: "10px 12px" }}>
                  <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: r.growth > 25 ? "#D1FAE5" : "#F3F4F6", color: r.growth > 25 ? "#065F46" : "#374151" }}>
                    {r.growth > 25 ? "↑ High Growth" : "Stable"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardWrap>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Business Overview" },
  { id: "supply",   label: "Supply Chain" },
  { id: "market",   label: "Market Intelligence" },
  { id: "regional", label: "Regional Performance" }
];

export default function PharmaIQ() {
  const [active, setActive] = useState("overview");

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: C.bg, minHeight: "100vh" }}>
      {/* ── Header ── */}
      <div style={{ background: C.navy, padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: C.sky, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17, color: "#fff" }}>P</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 19, letterSpacing: "-0.025em" }}>PharmaIQ</div>
            <div style={{ color: "#94A3B8", fontSize: 11 }}>ePharmacy Strategy Intelligence · Tata 1mg</div>
          </div>
        </div>
        <div style={{ color: "#94A3B8", fontSize: 12 }}>Last updated: 31 Mar 2025 · FY 2024–25</div>
      </div>

      {/* ── Tab Bar ── */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "0 28px", display: "flex", gap: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: "14px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer",
            border: "none", background: "transparent", outline: "none",
            color: active === t.id ? C.blue : C.ts,
            borderBottom: `3px solid ${active === t.id ? C.blue : "transparent"}`,
            transition: "color 0.15s, border-color 0.15s"
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── Content ── */}
      <div style={{ padding: "24px 28px" }}>
        {active === "overview" && <OverviewTab />}
        {active === "supply"   && <SupplyChainTab />}
        {active === "market"   && <MarketTab />}
        {active === "regional" && <RegionalTab />}
      </div>
    </div>
  );
}
