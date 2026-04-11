import React from "react";
import { X, FileText, Download, ExternalLink } from "lucide-react";

const DocModal = ({ isOpen, onClose, pdfUrl, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-slate-800 w-full max-w-2xl md:h-[92vh] h-[92vh] rounded border border-slate-700 flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="px-5 py-2 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="text-blue-400" size={20} />
            </div>
            <div>
              <h2 className="hidden md:block font-bold text-lg text-white leading-tight">
                {title}
              </h2>
              <h2 className="md:hidden font-bold text-lg text-white leading-tight">
                Project Report
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink size={20} />
            </a>
            <button
              onClick={onClose}
              className="ml-2 p-2 bg-slate-700/50 hover:bg-red-500/20 hover:text-red-500 rounded-xl text-slate-300 transition-all"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body - Optimized for 1 page fit */}
        <div className="flex-1 bg-slate-900 relative overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&view=Fit`}
            className="w-full h-full border-none shadow-2xl"
            title="PDF Document Viewer"
            style={{ display: "block" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DocModal;
