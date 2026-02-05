import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const TeamMember = () => {
  const team = [
    { id: 1, name: "Mostakin Ahmed", role: "Lead Developer", isAdmin: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mostakin" },
    { id: 2, name: "Member Two", role: "IoT Engineer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
    { id: 3, name: "Member Three", role: "UI/UX Designer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
    { id: 4, name: "Member Four", role: "Backend Expert", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=4" },
    { id: 5, name: "Member Five", role: "Hardware Specialist", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=5" },
    { id: 6, name: "Member Six", role: "System Analyst", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=6" },
    { id: 7, name: "Member Seven", role: "Researcher", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=7" },
    { id: 8, name: "Member Eight", role: "Network Engineer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=8" },
    { id: 9, name: "Member Nine", role: "QA Engineer", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=9" },
    { id: 10, name: "Member Ten", role: "Documentation", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=10" },
  ];

  return (
    <div className="mt-10 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/60">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 uppercase tracking-tight">
          <span className="w-1.5 h-4 bg-green-500 rounded-full"></span>
          Team Members
        </h3>
        <span className="text-[10px] font-bold bg-slate-800 text-green-500 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">
          10 Persons
        </span>
      </div>

      {/* X-Axis Scroll Container */}
      <div className="flex overflow-x-auto pb-4 justify-between gap-4 scrollbar-hide snap-x cursor-grab active:cursor-grabbing">
        {team.map((member) => (
          <div
            key={member.id}
            className="min-w-[160px] max-w-[200px] bg-slate-800/60 border border-slate-700/40 rounded-xl py-3 snap-start hover:border-green-500/40 transition-all group relative overflow-hidden shadow-lg"
          >
            {/* Lead Tag */}
            {member.isAdmin && (
              <div className="absolute top-0 right-0 bg-green-500 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tighter">
                Lead
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full bg-slate-900 border border-slate-700 group-hover:border-green-500/60 transition-colors"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-800 animate-pulse"></div>
              </div>

              <div className="text-center mb-4">
                <h4 className="text-slate-100 font-bold text-sm truncate w-full px-1">
                  {member.name}
                </h4>
                <p className="text-green-500/80 text-[9px] uppercase font-bold tracking-widest">
                  {member.role}
                </p>
              </div>

              <div className="flex gap-2 border-t border-slate-700/50 pt-3 w-full justify-center">
                <SocialIcon icon={<Linkedin size={13} />} />
                <SocialIcon icon={<Github size={13} />} />
                <SocialIcon icon={<Mail size={13} />} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hidden Scrollbar Logic */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const SocialIcon = ({ icon }) => (
  <button className="p-1.5 bg-slate-900/80 border border-slate-700/50 rounded-lg text-slate-500 hover:text-green-400 hover:border-green-500/30 transition-all">
    {icon}
  </button>
);

export default TeamMember;