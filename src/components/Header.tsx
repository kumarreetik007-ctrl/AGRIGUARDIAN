import React from 'react';
import { Language, FarmerProfile } from '../types';
import { Award, User, Menu, X, BarChart3, Users, Leaf, ShieldAlert, Sparkles } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  currentFarmer: FarmerProfile;
  onOpenAuth: () => void;
  onOpenJudgesGuide: () => void;
  onOpenTelemetry: () => void;
  onOpenSocialFeed: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  currentFarmer,
  onOpenAuth,
  onOpenJudgesGuide,
  onOpenTelemetry,
  onOpenSocialFeed,
  isMenuOpen,
  onToggleMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf8f2]/95 backdrop-blur-md border-b border-[#0f2e1b]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 font-black text-xl tracking-tight text-[#0f2e1b] shrink-0">
          <span className="w-10 h-10 rounded-2xl bg-[#143d22] text-[#74c69d] flex items-center justify-center text-xl shadow-xs">
            🌱
          </span>
          <span className="flex flex-col">
            <span className="leading-none text-xl tracking-tight font-extrabold text-[#0f2e1b]">
              AgriGuardian
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#2d6a4f] mt-0.5">
              {language === 'hi' ? 'एआई फार्म साथी' : 'AI Farm Companion'}
            </span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-[#143d22]">
          <a href="#crop-doctor" className="hover:text-[#2d6a4f] transition-colors flex items-center gap-1">
            <span>📷 Crop Doctor</span>
          </a>
          <a href="#today-action" className="hover:text-[#2d6a4f] transition-colors flex items-center gap-1">
            <span>🌦 Advisory</span>
          </a>
          <button
            onClick={onOpenTelemetry}
            className="hover:text-[#2d6a4f] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Telemetry</span>
            <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded-full font-bold">Live</span>
          </button>
          <a href="#community-feed" className="hover:text-[#2d6a4f] transition-colors flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Krishi Chaupal</span>
          </a>
          <a href="#features" className="hover:text-[#2d6a4f] transition-colors">
            <span>🌾 Modules</span>
          </a>
          <a href="#sustainability" className="hover:text-[#2d6a4f] transition-colors">
            <span>♻️ Eco Score</span>
          </a>
          <a href="#ai-assistant" className="hover:text-[#2d6a4f] transition-colors flex items-center gap-1 text-[#2d6a4f]">
            <span>🤖 Krishi Mitra</span>
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Judges Guide Button */}
          <button
            onClick={onOpenJudgesGuide}
            className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Hackathon Judges Portal & Walkthrough"
          >
            <Award className="w-4 h-4 text-amber-700" />
            <span>Judges Guide</span>
          </button>

          {/* User Profile Avatar / Sign In */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 text-xs font-semibold py-1.5 px-3 rounded-full bg-white border border-[#2d6a4f]/25 text-[#0f2e1b] hover:bg-[#f5f2e9] active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Switch Farmer Profile / Sign In"
          >
            <span className="text-base">{currentFarmer.avatar}</span>
            <div className="text-left hidden sm:block leading-tight">
              <span className="block font-bold text-xs">{currentFarmer.name.split(' ')[0]}</span>
              <span className="block text-[9px] text-[#143d22]/60">{currentFarmer.district}</span>
            </div>
          </button>

          {/* Interactive Language Toggle Pill */}
          <button
            onClick={onToggleLanguage}
            aria-label="Toggle Language English Hindi"
            className="flex items-center text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f5f2e9] border border-[#2d6a4f]/20 text-[#143d22] hover:bg-[#ede8dc] active:scale-95 transition-transform cursor-pointer"
          >
            <span className={language === 'en' ? 'text-[#2d6a4f] font-bold' : 'text-[#0f2e1b]/60'}>EN</span>
            <span className="mx-1 text-[#0f2e1b]/30">|</span>
            <span className={language === 'hi' ? 'text-[#2d6a4f] font-bold' : 'text-[#0f2e1b]/60'}>हिंदी</span>
          </button>

          {/* Mobile Drawer Menu Toggle (visible on smaller screens) */}
          <button
            onClick={onToggleMenu}
            aria-label="Open Navigation"
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[#f5f2e9] text-[#0f2e1b] border border-[#0f2e1b]/10 active:scale-90 transition-transform cursor-pointer"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
