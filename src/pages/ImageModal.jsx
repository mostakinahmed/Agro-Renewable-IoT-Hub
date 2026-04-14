import React, { useState } from "react";
import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

const ImageModal = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🎨 Frame colors
  const colors = [
    "bg-emerald-900/40",
    "bg-blue-900/40",
    "bg-amber-900/40",
    "bg-purple-900/40",
  ];

  // 🔥 Dynamic Image Data (1 → 18)
  const galleryData = Array.from({ length: 17 }, (_, i) => ({
    title: `Project Image ${i + 1}`,
    url: `/image/${i + 1}.jpg`,
    description: `This is image ${i + 1} of the IoT Smart Agriculture system.`,
    frameColor: colors[i % colors.length],
  }));

  if (!isOpen) return null;

  const activeImg = galleryData[currentIndex];

  // 👉 Next Image
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  // 👉 Previous Image
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
      {/* Main Container */}
      <div className="relative max-w-7xl md:mt-10 w-full flex flex-col items-center">
        {/* Header */}
        <div className="absolute -top-14 left-0 right-0 flex justify-between items-center px-2">
          <div>
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <ImageIcon size={20} className="text-emerald-400" />
              {activeImg.title}
              <span className="text-slate-500 text-xs font-normal ml-2">
                {currentIndex + 1} / {galleryData.length}
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activeImg.url}
              download
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <Download size={20} />
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-red-500/20 hover:text-red-500 rounded-full text-white transition-all"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        {/* Image Area */}
        <div className="relative w-full group flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-10 p-2 bg-black/50 hover:bg-emerald-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-10 p-2 bg-black/50 hover:bg-emerald-600 text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Frame */}
          <div
            className={`${activeImg.frameColor} p-2 md:p-4 rounded border border-white/10 shadow-2xl flex flex-col items-center w-full`}
          >
            <img
              src={activeImg.url}
              alt={activeImg.title}
              className="h-[45vh] md:h-[65vh]  w-auto object-contain rounded shadow-2xl"
            />

            {/* Description */}
            <div className="mt-4 pb-2 text-center">
              <p className="text-slate-300 text-sm md:text-base italic">
                {activeImg.description}
              </p>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-6 flex gap-3 overflow-x-auto p-2 max-w-full no-scrollbar">
          {galleryData.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? "border-emerald-500 scale-110"
                  : "border-slate-700 opacity-40 hover:opacity-100"
              }`}
            >
              <img
                src={img.url}
                className="w-full h-full object-cover"
                alt="preview"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
