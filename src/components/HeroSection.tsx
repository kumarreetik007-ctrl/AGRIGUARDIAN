import React from 'react';
import { Language } from '../types';
import { Sparkles, Check, CloudRain, ShieldCheck, Droplets, Leaf } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenTelemetry: () => void;
  onOpenCropDoctor: () => void;
  onOpenSustainability: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenTelemetry,
  onOpenCropDoctor,
  onOpenSustainability,
}) => {
  return (
    <section className="pt-4 pb-2 lg:py-6" data-purpose="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Copy, Action Buttons, Trust Pills */}
        <div className="lg:col-span-7 space-y-5">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d8f3dc] border border-[#52b788]/30 text-[#143d22] text-xs font-semibold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse-dot" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider font-extrabold text-[#0f2e1b]">
              🌱 {language === 'hi' ? 'एआई-संचालित कृषि सहायक' : 'AI-POWERED FARMING ASSISTANT'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2e1b] leading-[1.18] tracking-tight">
            {language === 'hi' ? (
              <>
                स्मार्ट खेती की शुरुआत{' '}
                <span className="text-[#2d6a4f] underline decoration-amber-400 decoration-wavy decoration-3">
                  बेहतर फैसलों
                </span>{' '}
                से होती है।
              </>
            ) : (
              <>
                Smarter Farming Starts With{' '}
                <span className="text-[#2d6a4f] underline decoration-amber-400 decoration-wavy decoration-3">
                  Better Decisions.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle Description */}
          <p className="text-[#143d22]/85 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            {language === 'hi'
              ? 'एग्रीगार्डियन किसानों को फसल रोगों की पहचान करने, पानी और संसाधनों का प्रबंधन करने, सुरक्षित कृषि पद्धतियों का पालन करने और एआई के साथ बेहतर निर्णय लेने में मदद करता है।'
              : 'AgriGuardian helps farmers detect crop problems, manage water and resources, follow safe farming practices, and make smarter decisions with AI.'}
          </p>

          {/* Dual CTAs in Row on sm+ */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="#crop-doctor"
              className="py-3.5 px-6 bg-[#2d6a4f] hover:bg-[#143d22] active:scale-[0.98] text-white rounded-2xl font-bold text-center text-sm sm:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🌱</span>
              <span>{language === 'hi' ? 'मेरी फसल की जांच करें' : 'Check My Crop Now'}</span>
            </a>
            <a
              href="#ai-assistant"
              className="py-3.5 px-6 bg-white border border-[#0f2e1b]/15 hover:bg-[#faf8f2] active:scale-[0.98] text-[#0f2e1b] rounded-2xl font-bold text-center text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🤖</span>
              <span>{language === 'hi' ? 'एग्रीगार्डियन से पूछें (द्विभाषी एआई)' : 'Ask AgriGuardian (Bilingual AI)'}</span>
            </a>
          </div>

          {/* Hero Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold text-[#143d22]/90 pt-2">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>{language === 'hi' ? 'फसल आसूचना' : 'Crop Intelligence'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>{language === 'hi' ? 'स्मार्ट सिंचाई' : 'Smart Irrigation'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>{language === 'hi' ? 'मिट्टी व स्थिरता' : 'Soil Health'}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>Hindi &amp; English</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Container with Floating Glassmorphism Telemetry Cards */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#52b788]/30 bg-[#0f2e1b] group">
            {/* Farmer & Crop Field Illustration from Provided HTML */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABvNejr67q7kNS_LRl71EBpkxeFq-VE0erzA8KJ0VDLHGOEWCLsmH2dfryyd2TnXyv5GdAOn3XyuwmGltGgnhgjUFnVGE9WaBUgzRq76HOR2MtFgYkKWNiYu2PI6Khpx0zq_nDR3wWqYp1QsdU1EEHQQw82Zlrfsarp6CNk7KEKqyof8WwW3sKnWukC1nKXPbcPXC5TmD2ip7RMS-dPk_jMPDVt1479reOyCOVFxtr5BVmcDKfu1AllA"
              alt="Indian farmer smiling warmly in agricultural crop field holding smartphone"
              className="w-full h-auto object-cover object-center max-h-[460px] transform group-hover:scale-[1.02] transition-transform duration-700"
              loading="eager"
            />

            {/* Ambient Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081a0f]/85 via-transparent to-black/25 pointer-events-none" />

            {/* Floating Card 1: Live Weather Top Left */}
            <button
              onClick={onOpenTelemetry}
              className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2.5 text-left active:scale-95 hover:bg-white transition-all cursor-pointer"
              title="Click to view full real-time telemetry"
            >
              <span className="text-xl">🌦</span>
              <div className="leading-tight">
                <p className="text-[10px] uppercase font-bold text-[#0f2e1b]/60">
                  {language === 'hi' ? 'लाइव मौसम' : 'Live Weather'}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#0f2e1b]">28°C · Rain: 78%</p>
              </div>
            </button>

            {/* Floating Card 2: Sustainability Score Top Right */}
            <button
              onClick={onOpenSustainability}
              className="absolute top-4 right-4 bg-[#143d22]/90 backdrop-blur-md px-3 py-2 rounded-2xl shadow-xl border border-[#74c69d]/30 text-white flex items-center gap-2 active:scale-95 hover:bg-[#143d22] transition-all cursor-pointer"
              title="Click to inspect Eco-Score"
            >
              <span className="text-[#74c69d] text-sm">♻️</span>
              <div className="text-right leading-tight">
                <span className="text-[10px] uppercase font-medium text-[#b7e4c7] block">Eco Score</span>
                <span className="text-xs sm:text-sm font-black tracking-wide text-[#d8f3dc]">78 / 100</span>
              </div>
            </button>

            {/* Floating Card 3: Crop Health Bottom Left */}
            <button
              onClick={onOpenCropDoctor}
              className="absolute bottom-20 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2.5 max-w-[200px] text-left active:scale-95 hover:bg-white transition-all cursor-pointer"
              title="Click to diagnose crop"
            >
              <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shadow-2xs">
                🌱
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-emerald-800">
                  {language === 'hi' ? 'फसल स्वास्थ्य' : 'Healthy Crop'}
                </p>
                <p className="text-[10px] text-[#143d22]/70">92% confidence</p>
              </div>
            </button>

            {/* Floating Card 4: Action Alert Irrigation Bottom Banner */}
            <a
              href="#today-action"
              className="absolute bottom-3 inset-x-3 bg-amber-500/95 backdrop-blur-md text-amber-950 px-4 py-2.5 rounded-2xl shadow-xl border border-amber-300 flex items-center justify-between active:scale-[0.99] hover:bg-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">💧</span>
                <div className="leading-tight">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-900/20 px-1.5 py-0.5 rounded text-amber-950 inline-block mb-0.5">
                    {language === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advice'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-amber-950">
                    {language === 'hi' ? 'सिंचाई टालें · कल दोपहर बारिश संभावित है' : 'Delay irrigation · Rain expected tomorrow'}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs font-bold bg-amber-950 text-white px-2.5 py-1 rounded-xl shadow-xs">
                Take Action →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
