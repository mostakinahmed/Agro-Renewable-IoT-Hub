import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const TeamMember = () => {
  const team = [
    {
      id: 1,
      name: "Mostakin Ahmed",
      role: "Lead Developer",
      isAdmin: true,
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/477698665_608008722158980_264333779372568677_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=m4kGP5BRA4AQ7kNvwEGscsR&_nc_oc=AdnVIoyZI_HyE6QAYM-M3RlIS2PKQmh8lsmoYyANt1j6uTZf4yN17sTUeJCLQ9U8HqI&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=RFy3cc-Pt-i9UOXmKmymlQ&oh=00_AfuZIR1nMGG9xVocbLBcEMkwWe8yDteEGsv-7viQYhntdw&oe=698DEF2E",
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
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/534900514_1814462739432123_1510006210458281349_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=xGi65PjPgm4Q7kNvwGDC4vH&_nc_oc=AdkOJ4Xp5BSiv7liC7fQe5sxbGmDHY3Fb7obZ5QJ7Mmv8A-1jUachJgsS5rVwqsmrxY&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=W2BSiYQ9sxXl7j0uAKLiuA&oh=00_AfuYE9U5NoQwwr1YBDYGojVQIlBiZdYSYgtEnaDnojOQYw&oe=698E21DC",
    },
    {
      id: 4,
      name: "Najmus Sakib",
      role: "Backend Expert",
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-1/608997397_122152102688401602_4176621420260749834_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=7nkKYsLnovkQ7kNvwHDI_9C&_nc_oc=AdlPP3Lph39xMGf04Lo0_vBA1_bFvupjuFpWNshRQd7atg99PPwDQl6g6ND7wb5Xx40&_nc_zt=24&_nc_ht=scontent.fdac155-1.fna&_nc_gid=gbDzcxJETXSbF7he9xtCNA&oh=00_AfsPxPZUNslDNRsu2Tbf8MxK3bG9SCm-bP4k6CSFLTXIbw&oe=698DF62E",
    },
    {
      id: 5,
      name: "Mourin Zaman Mouli",
      role: "Hardware Specialist",
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/518258208_1255881386174680_1257216703481227911_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ykmLnW8YHK4Q7kNvwEHdSx2&_nc_oc=AdlxJNdkdyZuYrl8Z6b5N7D-YNWjfG8ORnPJ4A-QZUnpdb2oa_--y7jbLgK-GvirOk8&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=KU3TmHiP8Z0ddDtWhBfu0w&oh=00_AfvwsBPY5WwQBFEpcsRi_qOb2r4qyvgNt72PW486g02XZg&oe=698DF766",
    },
    {
      id: 6,
      name: "Galiba Zannat Shucy",
      role: "System Analyst",
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/595674412_1400644688448684_8157688383790124156_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JTzKV63d3lUQ7kNvwFz6nfH&_nc_oc=Adlu1ivDD2No2LIr8ZTdOPp5U0e4eNZY4snwuQEg1S2m5aVghwnUtdLxLp9zPQaBkig&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=LMzOJU35Ipxyayl_c4zSpw&oh=00_AfvqkwOYgYq5AZ0Nv3CYR_7VDnZaD2cvxYfHWvhpF3vT5w&oe=698E193C",
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
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
    },
    {
      id: 9,
      name: "Al Israq",
      role: "QA Engineer",
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/481304732_1141014537678647_9071657129693207039_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=Jgg7ARtaIa4Q7kNvwEVl2sN&_nc_oc=Admi0GrRcpmfYpQ405ZEgXPDqINNj50Y87_V7ETDJzbeua7dwlte9MXtHjvpT2z_Emo&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=7vR8Dc9VldOLr71CeU8cQA&oh=00_AftQOE33nF4Kmy-ejGId0cLxFQrIU4QBUk7SzxpN4GX1Ug&oe=698E145F",
    },
    {
      id: 10,
      name: "Fardin Shafin",
      role: "Documentation",
      img: "https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/504840097_1233634601568120_9031023282070215479_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=H6MW06mAreAQ7kNvwGB2jiq&_nc_oc=AdnxacaISwc4zNmuBY_UNxaVFK0XNyCIrCD7UjTVLBaXCiMB91FHHOtprwAc3C1zdCk&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=7NksjcjOT1QcldmMoFxgkA&oh=00_AftZmDYaVQIsvUKn6uFsCAK49LxMWelmNASFT8XbFx09Zg&oe=698E0DEB",
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
