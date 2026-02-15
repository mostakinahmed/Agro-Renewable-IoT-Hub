import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://your-server-ip:5000"); // Replace with your Node.js server IP

const Radar = () => {
  const canvasRef = useRef(null);
  const [data, setData] = useState({ angle: 0, distance: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 20;
    const radius = canvas.width / 2 - 20;

    // Listen for real-time data from Node.js
    socket.on("radar-update", (incomingData) => {
      setData(incomingData);
      drawRadar(
        ctx,
        centerX,
        centerY,
        radius,
        incomingData.angle,
        incomingData.distance,
      );
    });

    return () => socket.off("radar-update");
  }, []);

  const drawRadar = (ctx, cx, cy, r, angle, distance) => {
    // 1. Clear Canvas with a slight fade effect (creates the trail)
    ctx.fillStyle = "rgba(10, 20, 10, 0.2)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // 2. Draw Radar Grid
    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (r / 4) * i, Math.PI, 2 * Math.PI);
      ctx.stroke();
    }

    // 3. Draw the Sweeping Line
    const rad = (angle * Math.PI) / 180;
    const lineX = cx - r * Math.cos(rad);
    const lineY = cy - r * Math.sin(rad);

    ctx.strokeStyle = "#00ff41";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(lineX, lineY);
    ctx.stroke();

    // 4. Draw Detected Object (Red Dot)
    if (distance > 0 && distance < 40) {
      // Only show if within 40cm
      const objR = (distance / 40) * r; // Scale distance to canvas
      const objX = cx - objR * Math.cos(rad);
      const objY = cy - objR * Math.sin(rad);

      ctx.fillStyle = "#ff0000";
      ctx.beginPath();
      ctx.arc(objX, objY, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = "red";
    }
  };

  return (
    <div className="  bg-slate-900 text-green-400 w-full">
      <div className="bg-slate-800/50  p-6 rounded-2xl shadow-2xl border border-green-900/50">
        <h3 className="text-lg text-white font-semibold mb-6 flex items-center gap-2">
          Security Radar
        </h3>
        <canvas
          ref={canvasRef}
          className="rounded-lg w-full h-30 bg-black/50 border border-green-500/30"
        />

        <div className="grid grid-cols-2 gap-3 mt-4">
          {/* Angle Card */}
          <div className="bg-slate-700/40 flex items-center justify-between px-3 py-2 rounded-lg border border-green-500/20">
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold">
              Angle
            </span>
            <span className="text-lg font-mono text-green-400">
              {data.angle}°
            </span>
          </div>

          {/* Distance Card */}
          <div
            className={`bg-slate-700/40 flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-300 ${
              data.distance < 35 && data.distance > 0
                ? "border-red-500/50 bg-red-900/10"
                : "border-green-500/20"
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider opacity-50 font-bold">
              Dist
            </span>
            <span
              className={`text-lg font-mono ${data.distance < 35 && data.distance > 0 ? "text-red-400" : "text-green-400"}`}
            >
              {data.distance}cm
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${data.distance < 35 ? "bg-red-500" : "bg-green-500"}`}
          ></div>
          <span className="text-sm font-medium uppercase tracking-tighter">
            {data.distance < 35 ? "Intruder Detected" : "System Secure"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Radar;
