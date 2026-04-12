import React, { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  Sun,
  Power,
  Battery,
  Activity,
  CloudRain,
  Sprout,
  Wifi,
  FileText,
  Image as ImageIcon, // Added ImageIcon
} from "lucide-react";
import { io } from "socket.io-client";
import TeamMember from "./TeamMember";
import Footer from "./Footer";
import Radar from "./Radar";
import DocModal from "./DocModal";
import ImageModal from "./ImageModal"; // Import your ImageModal

const BASE_URL = "https://api.smartfarm.mostakinahmed.com";

const socket = io(BASE_URL, {
  transports: ["websocket"],
  upgrade: false,
});

const AgriDashboard = () => {
  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState({ title: "", url: "" });

  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState({ title: "", url: "" });

  const [data, setData] = useState({
    latestData: {
      temp: "--",
      humidity: "--",
      moisture: "--",
      light: "--",
      rainRaw: "--",
      system: "OFF",
    },
    activeDevices: { isPumpOn: false, isFanOn: false },
    batteryPct: 0,
    chargingStatus: "Standby",
    nitrogen: 45,
    phosphorus: 32,
    potassium: 58,
  });

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const result = await response.json();
        if (result) setData((prev) => ({ ...prev, ...result }));
      } catch (err) {
        console.error("❌ Initial fetch failed:", err);
      }
    };
    fetchInitialData();

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("update_dashboard", (newData) => {
      setData((prev) => ({
        ...prev,
        latestData: { ...prev.latestData, ...newData },
      }));
    });

    return () => {
      socket.off("update_dashboard");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const toggleDevice = async (device) => {
    const currentState = data.activeDevices?.[device] || false;
    const newState = !currentState;
    setData((prev) => ({
      ...prev,
      activeDevices: { ...prev.activeDevices, [device]: newState },
    }));

    try {
      await fetch(`${BASE_URL}/api/iot/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device, state: newState }),
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        activeDevices: { ...prev.activeDevices, [device]: currentState },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white md:px-4 md:py-2  p-3 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center md:mb-4 mb-3 border-b border-slate-700 pb-5 gap-4">
        <div className="flex gap-3">
          <div className="">
            <img className="h-13 w-13 rounded-full" src="/logo a.png" alt="" />
          </div>
          <div>
            <h1 className="md:text-3xl text-2xl font-bold text-green-400 tracking-tight">
              Agro-Renewable IoT Hub
            </h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Wifi
                size={14}
                className={isConnected ? "text-green-500" : "text-red-500"}
              />

              {isConnected
                ? "Daffodil Smart Agriculture Farm (DEMO)"
                : "Connecting..."}
            </p>
          </div>
        </div>

        {/* RESPONSIVE BUTTON GROUP */}
        <div className="flex flex-col md:flex-row items-center md:gap-3 gap-4 w-full md:w-auto">
          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* 1. DOCUMENTATION BUTTON */}
            <button
              onClick={() => {
                setSelectedDoc({
                  title: "Project Report & Specs",
                  url: "/docs/reports.pdf",
                });
                setIsModalOpen(true);
              }}
              className="h-8 flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 rounded-xl transition-all shadow-lg active:scale-95 group whitespace-nowrap"
            >
              <FileText
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              <span className="md:text-xs text-[11px] font-bold uppercase tracking-widest text-white">
                Documentation
              </span>
            </button>

            {/* 2. IMAGE GALLERY BUTTON */}
            <button
              onClick={() => {
                setSelectedImg({
                  title: "Hardware Setup",
                  url: "/images/setup.jpg",
                  bgColor: "bg-emerald-900/20", // Optional: pass your specific color here
                });
                setIsImgModalOpen(true);
              }}
              className="h-8 flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-5 rounded-xl transition-all shadow-lg active:scale-95 group whitespace-nowrap"
            >
              <ImageIcon
                size={16}
                className="group-hover:scale-110 transition-transform text-white"
              />
              <span className="md:text-xs text-[11px] font-bold uppercase tracking-widest text-white">
                Gallery
              </span>
            </button>
          </div>

          {/* SYSTEM STATUS BAR - Matched Height */}
          <div className=" flex justify-between w-full gap-3">
            <div
              className={`h-8 flex items-center justify-center md:justify-start px-5 rounded-xl border transition-all duration-500 w-full md:w-auto ${
                data.latestData.system === "ON"
                  ? "bg-green-500/5 border-green-500/30"
                  : "bg-red-500/5 border-red-500/30"
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full mr-3 ${
                  data.latestData.system === "ON"
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
              ></div>
              <span
                className={`md:text-xs text-[11px] font-bold uppercase tracking-widest ${
                  data.latestData.system === "ON"
                    ? "text-green-500"
                    : "text-red-400"
                }`}
              >
                {data.latestData.system === "ON"
                  ? "Server Connected"
                  : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <MetricCard
          icon={<Thermometer className="text-orange-400" />}
          label="Temp"
          value={`${data.latestData.temp}°C`}
          color="border-orange-500/20"
        />
        <MetricCard
          icon={<Droplets className="text-blue-400" />}
          label="Humidity"
          value={`${data.latestData.humidity}%`}
          color="border-blue-500/20"
        />
        <MetricCard
          icon={
            <Activity
              className={
                data.latestData.moisture ? "text-red-400" : "text-emerald-400"
              }
            />
          }
          label="Soil Dryness"
          value={`${Math.round(data.latestData.moisture)}`}
          color="border-emerald-500/20"
        />
        <MetricCard
          icon={<CloudRain className="text-indigo-400" />}
          label="Rain Level"
          value={data.latestData.rainRaw}
          color="border-indigo-500/20"
        />
        <MetricCard
          icon={<Sun className="text-yellow-400" />}
          label="Light"
          value={data.latestData.light || "--"}
          color="border-yellow-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3  gap-3 md:mt-4 mt-3">
        <div className="bg-slate-800/50 rounded px-6 py-4 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold md:mb-6 mb-4 flex items-center gap-2">
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

        <div className="bg-slate-800/50 rounded px-6 py-3 border border-slate-700 shadow-xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Power size={18} className="text-red-400" /> Devices
          </h3>
          <div className="space-y-4">
            <ToggleButton
              label="Irrigation Pump"
              isActive={data.activeDevices.isPumpOn}
              onClick={() => toggleDevice("isPumpOn")}
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
        <div className="flex">
          <Radar />
        </div>
      </div>

      <div className="mt-">
        <TeamMember />
      </div>
      <div className="mt-">
        <Footer />
      </div>

      {/* --- RENDER ALL MODALS --- */}
      <DocModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={selectedDoc.url}
        title={selectedDoc.title}
      />

      <ImageModal
        isOpen={isImgModalOpen}
        onClose={() => setIsImgModalOpen(false)}
        imageUrl={selectedImg.url}
        title={selectedImg.title}
      />
    </div>
  );
};

// ... Sub-components (MetricCard, NPKBar, ToggleButton) stay the same ...
const MetricCard = ({ icon, label, value, color }) => (
  <div
    className={`bg-slate-800/40 backdrop-blur-md px-6 py-2 rounded border ${color} hover:bg-slate-800/60 transition-all`}
  >
    <div className="flex justify-between items-start mb-2">
      <div className="p-2 bg-slate-900 rounded-lg">{icon}</div>

      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-4">
        Real-time
        <span className="h-2.5 w-2.5 rounded-full -mt-1 bg-green-500 animate-pulse"></span>
      </span>
    </div>
    <p className="text-slate-400 text-sm font-medium">{label}</p>
    <h2 className="md:text-3xl text-2xl font-bold mt-1 tracking-tight">
      {value}
    </h2>
  </div>
);

const NPKBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1.5 font-medium text-slate-300">
      <span>{label}</span>
      <span className="text-slate-500">{value} mg/kg</span>
    </div>
    <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden">
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
      />
    </button>
  </div>
);

export default AgriDashboard;
