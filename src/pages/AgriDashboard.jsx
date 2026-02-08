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

const BASE_URL = "https://api.smartfarm.mostakinahmed.com";

// 1. IMPROVED: Forced WebSocket transport to bypass cPanel polling blocks (403 errors)
const socket = io(BASE_URL, {
  transports: ["websocket"],
  upgrade: false,
});

const AgriDashboard = () => {
  const [data, setData] = useState({
    temp: "--",
    humidity: "--",
    moisture: "--",
    light: "--",
    solarVolt: "--",
    batteryPct: 0,
    chargingStatus: "Standby",
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
    isPumpOn: false,
    isFanOn: false,
  });

  useEffect(() => {
    // 2. Initial Fetch: Grabs the last known state immediately on page load
    const fetchInitialData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/iot/latest-data`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        if (result) {
          // Merging result with default state to prevent losing values
          setData((prev) => ({ ...prev, ...result }));
        }
      } catch (err) {
        console.error("❌ Initial fetch failed:", err);
      }
    };

    fetchInitialData();

    // 3. REAL-TIME LISTENER: Matches backend io.emit("update_dashboard")
    socket.on("connect", () => {
      console.log("✅ Connected to Hub:", socket.id);
    });

    socket.on("update_dashboard", (newData) => {
      console.log("🔥 New IoT Data Received:", newData);
      setData((prev) => ({ ...prev, ...newData }));
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection Error:", err.message);
    });

    return () => {
      socket.off("update_dashboard");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, []);

  const toggleDevice = async (device) => {
    const newState = !data[device];

    // Optimistic Update: Change the UI color/icon immediately
    setData((prev) => ({ ...prev, [device]: newState }));

    try {
      const response = await fetch(`${BASE_URL}/api/iot/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device, state: newState }),
      });

      const result = await response.json();
      if (!result.success) {
        // Rollback UI if the server rejected the command
        setData((prev) => ({ ...prev, [device]: !newState }));
        alert("Device sync failed.");
      }
    } catch (err) {
      console.error("Command sync failed:", err);
      setData((prev) => ({ ...prev, [device]: !newState }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-700 pb-6 gap-4">
        <div>
          <h1 className="md:text-3xl text-2xl font-bold text-green-400 tracking-tight">
            Agro-Renewable IoT Hub
          </h1>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Wifi
              size={14}
              className={socket.connected ? "text-green-500" : "text-red-500"}
            />
            System:{" "}
            {socket.connected ? "Daffodil Farm Site (Online)" : "Connecting..."}
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-800 flex gap-2 px-4 py-2 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-500 font-bold uppercase">Solar:</p>
            <p className="text-sm -mt-1 text-yellow-500 font-semibold">
              {data.chargingStatus}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-slate-800 px-4 py-2 rounded-xl border border-green-500/30">
            <div className="md:w-3 md:h-3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium uppercase tracking-widest">
              Live Feed
            </span>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Thermometer className="text-orange-400" />}
          label="Temp"
          value={`${data.temp}°C`}
          color="border-orange-500/20"
        />
        <MetricCard
          icon={<Droplets className="text-blue-400" />}
          label="Humidity"
          value={`${data.humidity}%`}
          color="border-blue-500/20"
        />
        <MetricCard
          icon={<Activity className="text-emerald-400" />}
          label="Soil"
          value={`${data.moisture}%`}
          color="border-emerald-500/20"
        />
        <MetricCard
          icon={<Sun className="text-yellow-400" />}
          label="Light"
          value={data.light}
          color="border-yellow-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* NPK Section */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Sprout size={18} className="text-green-400" /> Nutrients
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

        {/* Control Center */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Power size={18} className="text-red-400" /> Devices
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
                  className="bg-yellow-500 h-full transition-all duration-700"
                  style={{ width: `${data.batteryPct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Logs */}
        <div className="lg:col-span-1 bg-slate-800/50 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap size={18} className="text-blue-400" /> Logs
          </h3>
          <div className="space-y-3 font-mono text-[11px] text-slate-400">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <p className="text-green-400 mb-1 font-bold">EVENT</p>
              <p>
                {data.moisture < 40
                  ? "Moisture low: Auto-pump ready."
                  : "Levels optimal."}
              </p>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
              <p className="text-yellow-400 mb-1 font-bold">ENERGY</p>
              <p>
                Storage: {data.batteryPct}%. Status: {data.chargingStatus}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <TeamMember />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

// Sub-components exactly as per your previous design
const MetricCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border ${color} hover:bg-slate-800/60 transition-all`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-900 rounded-lg">{icon}</div>
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
        Real-time
      </span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <h2 className="text-3xl font-bold mt-1 tracking-tight">{value}</h2>
  </div>
);

const NPKBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5 font-medium text-slate-300">
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
