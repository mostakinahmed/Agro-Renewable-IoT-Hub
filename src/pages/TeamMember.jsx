import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const TeamMember = () => {
  const team = [
    {
      id: 1,
      name: "Mostakin Ahmed",
      role: "Lead Developer",
      isAdmin: true,
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/516519819_717315094561675_8093001746283994340_n.jpg",
    },
    {
      id: 2,
      name: "Rafiqul Islam",
      role: "IoT Engineer",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/475324235_1421578478816825_4924789071666219489_n%20%281%29.jpg",
    },
    {
      id: 3,
      name: "Joeyria Tabassum",
      role: "UI/UX Designer",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/tab.jpg",
    },
    {
      id: 4,
      name: "Najmus Sakib",
      role: "Backend Expert",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/ton.jpg",
    },
    {
      id: 5,
      name: "Mourin Zaman Mouli",
      role: "Hardware Specialist",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/589818280_1364181035344714_1541993033577189401_n.jpg",
    },
    {
      id: 6,
      name: "Galiba Zannat Shuchi",
      role: "System Analyst",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/gali.jpg",
    },
    {
      id: 7,
      name: "Nurjahan Mim",
      role: "Researcher",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/Screenshot%20from%202026-02-08%2013-23-38.png",
    },
    {
      id: 8,
      name: "Zannatul Ferdous Sayma",
      role: "Network Engineer",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/say.jpeg",
    },
    {
      id: 9,
      name: "Al Israq",
      role: "QA Engineer",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/isr.jpg",
    },
    {
      id: 10,
      name: "Fardin Shafin",
      role: "Documentation",
      img: "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/far.jpg",
    },
  ];

  return (
    <div className="mt-10 bg-slate-900/40 md:p-4 p-2 rounded-2xl border border-slate-800/60">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2 uppercase tracking-tight">
          <span className="w-1.5 h-4 bg-green-500 rounded-full"></span>
          Team Members
        </h3>
        <span className="text-[10px] font-bold bg-slate-800 text-green-500 px-2 py-0.5 rounded border border-slate-700 uppercase tracking-widest">
          10 Persons
        </span>
      </div>

      {/* X-Axis Scroll Container - Removed scrollbar-hide, added scroll-custom */}
      <div className="flex overflow-x-auto md:pb-6 pb-4 justify-start md:gap-3 gap-2 snap-x cursor-grab active:cursor-grabbing scroll-custom">
        {team.map((member) => (
          <div
            key={member.id}
            className="md:min-w-[162px] min-w-[150px] md:max-w-[200px] max-w-[200px] bg-slate-800/60 border border-slate-700/40 rounded-xl py-3 snap-start hover:border-green-500/40 transition-all group relative overflow-hidden shadow-lg"
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
                  className="w-24 h-24 rounded-full object-cover bg-slate-900 border border-slate-700 group-hover:border-green-500/60 transition-colors"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-800 animate-pulse"></div>
              </div>

              <div className="text-center mb-4 px-2 w-full">
                <h4 className="text-slate-100 font-bold text-sm truncate">
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

      {/* Custom Scrollbar Styling */}
      <style jsx>{`
        .scroll-custom::-webkit-scrollbar {
          height: 6px;
        }
        .scroll-custom::-webkit-scrollbar-track {
          background: #1e293b; /* slate-800 */
          border-radius: 10px;
        }
        .scroll-custom::-webkit-scrollbar-thumb {
          background: #22c55e; /* green-500 */
          border-radius: 10px;
        }
        .scroll-custom::-webkit-scrollbar-thumb:hover {
          background: #16a34a; /* green-600 */
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
