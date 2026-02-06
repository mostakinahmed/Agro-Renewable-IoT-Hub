import React from "react";
import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Globe,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:mt-16 border-t border-slate-800 bg-slate-900/50 pt-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:gap-6 gap-2">
        {/* Left Side: Branding */}
        <div className="text-center md:text-left">
          <h2 className="md:text-xl text-lg font-bold text-white tracking-tight">
            Mostakin <span className="text-green-500">Ahmed</span>
          </h2>
          {/* <p className="text-slate-500 text-xs mt-1 font-medium uppercase tracking-widest">
            Full-Stack MERN Developer
          </p> */}
        </div>

        {/* Middle Side: Quick Contact */}
        <div className="flex flex-col items-center md:items-start gap-2 text-slate-400">
          <a
            href="https://mostakinahmed.com"
            className="flex items-center gap-2 tracking-wide hover:text-green-400 transition-colors text-sm"
          >
            <Globe size={15} /> mostakinahmed.com
          </a>
          <a
            href="mailto:me@mostakinahmed.com"
            className="flex items-center gap-2  tracking-wide hover:text-green-400 transition-colors text-sm"
          >
            <Mail size={15} /> me@mostakinahmed.com
          </a>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center md:gap-4 gap-1">
          <SocialLink
            href="https://github.com/mostakinahmed"
            icon={<Github size={18} />}
          />
          <SocialLink
            href="https://linkedin.com/in/mostakinahmed"
            icon={<Linkedin size={18} />}
          />
          <SocialLink
            href="https://facebook.com/mostakinahmed1971"
            icon={<Facebook size={18} />}
          />
          <SocialLink
            href="https://instagram.com/mostakin_ahmed71"
            icon={<Instagram size={18} />}
          />
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-6 pt-6 border-t border-slate-800/50 text-center">
        <p className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em] flex flex-col md:flex-row items-center justify-center gap-1">
          © {currentYear} All Rights Reserved • Made with{" "}
          <Heart size={24} className="text-red-500 animate-pulse" /> at Daffodil
          International University
        </p>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 text-slate-500 hover:text-green-400 hover:bg-slate-800 rounded-full transition-all duration-300 border border-transparent hover:border-slate-700"
  >
    {icon}
  </a>
);

export default Footer;
