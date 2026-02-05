import { React, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Import your new Dashboard here
 import AgriDashboard from "./pages/AgriDashboard"; 

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
    <div className="flex flex-col items-center max-w-xs w-full px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse scale-150" />
        <AiOutlineLoading3Quarters className="text-4xl text-green-500 animate-spin relative z-10" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-white text-lg font-semibold tracking-tight">
          Agro-Renewable IoT
        </h2>
        <p className="text-slate-400 text-sm font-light">
          Connecting to Smart Farm Nodes...
        </p>
      </div>
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate a quick connection to the IoT backend
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-slate-900 min-h-screen">
      <Routes>
        {/* Only one route: Home */}
        <Route path="/" element={<AgriDashboard />} />
      </Routes>
    </div>
  );
}


export default App;