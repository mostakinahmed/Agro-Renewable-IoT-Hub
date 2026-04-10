import React from "react";
import { X, ZoomIn, Download } from "lucide-react";

const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
      onClick={onClose} // Close when clicking the background
    >
      <div
        className="relative max-w-5xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
      >
        {/* Header Controls */}
        <div className="absolute -top-12 left-0 right-0 flex justify-between items-center px-2">
          <h3 className="text-white font-medium flex items-center gap-2">
            <ZoomIn size={18} className="text-green-400" />
            {title}
          </h3>
          <div className="flex gap-4">
            <a
              href={imageUrl}
              download
              className="text-slate-300 hover:text-white transition-colors"
            >
              <Download size={22} />
            </a>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-red-500 transition-all"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="bg-slate-800 p-1 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[80vh] w-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
