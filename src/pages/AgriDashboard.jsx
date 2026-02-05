import React, { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Power,
  Battery,
  Activity,
  Zap,
  Sprout,
  Wifi,
  Fan,
} from "lucide-react";
import { io } from "socket.io-client";
import TeamMember from "./TeamMember";
import Footer from "./Footer";

// 1. IMPORT YOUR NEW COMPONENT

const socket = io("https://your-api-link.com");

const AgriDashboard = () => {
  const [data, setData] = useState({
    temp: 28,
    humidity: 65,
    moisture: 42,
    light: 800,
    solarVolt: 12.6,
    batteryPct: 88,
    chargingStatus: "Optimized",
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    isPumpOn: false,
    isFanOn: false,
  });

  useEffect(() => {
    socket.on("update_dashboard", (newData) => {
      setData((prev) => ({ ...prev, ...newData }));
    });
    return () => socket.disconnect();
  }, []);

  const toggleDevice = (device) => {
    const newState = !data[device];
    setData({ ...data, [device]: newState });
    socket.emit("control_device", { device, state: newState });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-700 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-400 tracking-tight">
            Agro-Renewable IoT Hub
          </h1>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Wifi size={14} className="text-green-500" /> System Active:
            Daffodil Farm Site
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 flex gap-2 px-4 py-2 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-500 font-bold uppercase">
              Solar Status:
            </p>
            <p className="text-sm -mt-1 text-yellow-500 font-semibold">
              {data.chargingStatus}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800 px-4 py-2 rounded-xl border border-green-500/30">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium uppercase tracking-widest">
              Live
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid: Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Thermometer className="text-orange-400" />}
          label="Temperature"
          value={`${data.temp}°C`}
          color="border-orange-500/20"
        />
        <MetricCard
          icon={<Droplets className="text-blue-400" />}
          label="Air Humidity"
          value={`${data.humidity}%`}
          color="border-blue-500/20"
        />
        <MetricCard
          icon={<Activity className="text-emerald-400" />}
          label="Soil Moisture"
          value={`${data.moisture}%`}
          color="border-emerald-500/20"
        />
        <MetricCard
          icon={<Sun className="text-yellow-400" />}
          label="Light (Lux)"
          value={data.light}
          color="border-yellow-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* NPK Section */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Sprout size={18} className="text-green-400" /> Soil Nutrients
          </h3>
          <div className="space-y-5">
            <NPKBar
              label="Nitrogen (N)"
              value={data.nitrogen}
              color="bg-blue-500"
            />
            <NPKBar
              label="Phosphorus (P)"
              value={data.phosphorus}
              color="bg-yellow-500"
            />
            <NPKBar
              label="Potassium (K)"
              value={data.potassium}
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Power size={18} className="text-red-400" /> Control Center
          </h3>
          <div className="space-y-4">
            <ToggleButton
              label="Irrigation Pump"
              isActive={data.isPumpOn}
              onClick={() => toggleDevice("isPumpOn")}
            />
            <ToggleButton
              label="Greenhouse Fan"
              isActive={data.isFanOn}
              onClick={() => toggleDevice("isFanOn")}
            />
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <Battery size={16} /> Battery
                </span>
                <span className="text-sm font-bold text-yellow-400">
                  {data.batteryPct}%
                </span>
              </div>
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full transition-all"
                  style={{ width: `${data.batteryPct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Logs */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-blue-400" /> Smart Analytics
          </h3>
          <div className="space-y-3 font-mono text-[11px] text-slate-400">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <p className="text-green-400 mb-1 font-bold uppercase">
                Automatic Event
              </p>
              <p>
                Moisture &lt; 40% detected. Preparing irrigation sequence...
              </p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <p className="text-yellow-400 mb-1 font-bold uppercase">
                Energy Report
              </p>
              <p>Solar Input: {data.solarVolt}V. Storage efficiency: 94%.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PLACING YOUR NEW TEAM COMPONENT HERE */}
      <div className="mt-12">
        <TeamMember />
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

// --- Sub-Components ---
const MetricCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border ${color} hover:bg-slate-800/60 transition-all`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-900 rounded-lg">{icon}</div>
      <span className="text-[10px] text-slate-500 font-bold uppercase">
        Real-time
      </span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <h2 className="text-3xl font-bold mt-1 tracking-tight">{value}</h2>
  </div>
);

const NPKBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-xs mb-1.5 font-medium text-slate-300">
      <span>{label}</span>
      <span className="text-slate-500">{value} mg/kg</span>
    </div>
    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
      <div
        className={`${color} h-full transition-all duration-1000`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const ToggleButton = ({ label, isActive, onClick }) => (
  <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
    <span className="text-sm font-medium">{label}</span>
    <button
      onClick={onClick}
      className={`w-12 h-6 rounded-full transition-colors relative ${isActive ? "bg-green-500" : "bg-slate-600"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? "left-7" : "left-1"}`}
      ></div>
    </button>
  </div>
);

export default AgriDashboard;
