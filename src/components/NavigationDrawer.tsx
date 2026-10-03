import React from 'react';
import { Language, FarmerProfile } from '../types';
import { Award, BarChart3, Users, ShieldCheck, LogIn, UserCheck, X } from 'lucide-react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentFarmer: FarmerProfile;
  onOpenAuth: () => void;
  onOpenJudgesGuide: () => void;
  onOpenTelemetry: () => void;
  onOpenSocialFeed: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  language,
  currentFarmer,
  onOpenAuth,
  onOpenJudgesGuide,
  onOpenTelemetry,
  onOpenSocialFeed,
}) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-b border-[#0f2e1b]/10 bg-[#fcfbf8] px-4 sm:px-6 py-4 transition-all shadow-lg z-40">
      <div className="max-w-2xl mx-auto flex flex-col gap-2.5 font-semibold text-sm text-[#143d22]">
        {/* Hackathon Judges Showcase Banner */}
        <button
          onClick={() => {
            onClose();
            onOpenJudgesGuide();
          }}
          className="p-3 bg-gradient-to-r from-amber-100 to-amber-200 border-2 border-amber-400/80 rounded-2xl flex items-center justify-between text-left active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🏆</span>
            <div>
              <p className="text-xs font-black text-amber-950 uppercase tracking-wide">
                Hackathon Judges Portal
              </p>
              <p className="text-[11px] text-amber-900/80 font-normal">
                Architecture, Gemini AI, &amp; 1-click test scenarios
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-white/70 px-2 py-0.5 rounded-full">Explore →</span>
        </button>

        {/* Real-Time Telemetry Data Hub */}
        <button
          onClick={() => {
            onClose();
            onOpenTelemetry();
          }}
          className="py-2.5 px-3 rounded-xl hover:bg-[#f5f2e9] border border-emerald-600/20 bg-emerald-50/60 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2 text-emerald-950">
            <BarChart3 className="w-4 h-4 text-emerald-700" />
            <span className="font-bold">📊 Real-Time Data &amp; Sensor Hub</span>
          </div>
          <span className="bg-emerald-200 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
            Live Stream
          </span>
        </button>

        {/* Social Sharing Community Feed (Krishi Chaupal) */}
        <button
          onClick={() => {
            onClose();
            onOpenSocialFeed();
          }}
          className="py-2.5 px-3 rounded-xl hover:bg-[#f5f2e9] border border-blue-600/20 bg-blue-50/60 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2 text-blue-950">
            <Users className="w-4 h-4 text-blue-700" />
            <span className="font-bold">👥 Krishi Chaupal (Social Feed)</span>
          </div>
          <span className="bg-blue-200 text-blue-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Community
          </span>
        </button>

        {/* Standard In-page Anchors */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            onClick={onClose}
            href="#crop-doctor"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between"
          >
            <span>📷 AI Crop Doctor</span>
          </a>

          <a
            onClick={onClose}
            href="#today-action"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between"
          >
            <span>🌦 What Should I Do?</span>
          </a>

          <a
            onClick={onClose}
            href="#features"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between"
          >
            <span>🌾 6 Smart Modules</span>
          </a>

          <a
            onClick={onClose}
            href="#sustainability"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between"
          >
            <span>♻️ Eco Score (78/100)</span>
          </a>

          <a
            onClick={onClose}
            href="#certificate-section"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between"
          >
            <span>📜 Farming Passport</span>
          </a>

          <a
            onClick={onClose}
            href="#ai-assistant"
            className="p-2.5 rounded-xl border border-[#0f2e1b]/5 hover:bg-[#f5f2e9] flex items-center justify-between text-[#2d6a4f]"
          >
            <span>🤖 Bilingual Krishi Mitra</span>
          </a>
        </div>

        {/* User Auth Info & Toggle */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="flex-1 py-2.5 rounded-xl border border-[#143d22] text-[#143d22] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#f5f2e9] active:scale-95 transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile: {currentFarmer.name.split(' ')[0]}</span>
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="flex-1 py-2.5 rounded-xl bg-[#143d22] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Switch / Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};
