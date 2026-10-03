import React, { useState } from 'react';
import { Language, DiagnosisResult, TelemetryData } from '../types';
import { PRESET_DIAGNOSES, LeafPreset } from '../data/mockData';
import { Sparkles, Check, CloudRain, ShieldCheck, Droplets, Leaf, Target, Camera, ArrowRight, Activity, Percent } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  onOpenTelemetry: () => void;
  onOpenCropDoctor: () => void;
  onOpenSustainability: () => void;
  activeLeafDiagnosis?: DiagnosisResult;
  onSelectPresetLeaf?: (presetKey: string) => void;
  telemetry?: TelemetryData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenTelemetry,
  onOpenCropDoctor,
  onOpenSustainability,
  activeLeafDiagnosis,
  onSelectPresetLeaf,
  telemetry,
}) => {
  const [heroActivePreset, setHeroActivePreset] = useState<LeafPreset>(PRESET_DIAGNOSES[0]);

  const handlePresetClick = (preset: LeafPreset) => {
    setHeroActivePreset(preset);
    if (onSelectPresetLeaf) {
      onSelectPresetLeaf(preset.key);
    }
  };

  const displayDiagnosis = activeLeafDiagnosis || heroActivePreset.diagnosis;
  const displayImage = displayDiagnosis.leafImageUrl || heroActivePreset.imageUrl;
  const moisture = telemetry?.metrics.soilMoisturePercent ?? 62;
  const rain = telemetry?.metrics.rainProbabilityPercent ?? 78;

  return (
    <section className="pt-4 pb-2 lg:py-6" data-purpose="hero-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline, Leaf Detection Highlights, CTAs */}
        <div className="lg:col-span-7 space-y-5">
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d8f3dc] border border-[#52b788]/30 text-[#143d22] text-xs font-semibold shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse-dot" />
            <span className="text-[11px] sm:text-xs uppercase tracking-wider font-extrabold text-[#0f2e1b]">
              🌱 {language === 'hi' ? 'एआई-संचालित पत्ती रोग व कृषि सहायक' : 'AI Leaf Disease & Vision Intelligence Engine'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f2e1b] leading-[1.18] tracking-tight">
            {language === 'hi' ? (
              <>
                पत्ती की तस्वीर से पाएं रोग का{' '}
                <span className="text-[#2d6a4f] underline decoration-amber-400 decoration-wavy decoration-3">
                  सटीक कॉन्फिडेंस स्कोर।
                </span>
              </>
            ) : (
              <>
                Detect Plant Leaf Disease With{' '}
                <span className="text-[#2d6a4f] underline decoration-amber-400 decoration-wavy decoration-3">
                  Exact AI Confidence.
                </span>
              </>
            )}
          </h1>

          {/* Subtitle Description */}
          <p className="text-[#143d22]/85 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
            {language === 'hi'
              ? 'फसल की पत्ती का फोटो खींचें। हमारा विज़न मॉडल घावों के आकार, नेक्रोटिक धब्बों और क्लोरोफिल के आधार पर सटीक विश्वास प्रतिशत (Confidence Score) और उपचार खुराक बताता है।'
              : 'Snap any plant leaf photograph to instantly calculate disease diagnosis and confidence percentage based on real visual symptom morphology, necrotic margins, and chlorosis.'}
          </p>

          {/* Real Plant Leaf Picture Tester with Dynamic Confidence according to pic */}
          <div className="p-4 bg-white/95 backdrop-blur-md rounded-3xl border border-[#2d6a4f]/25 shadow-sm max-w-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold text-[#0f2e1b] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#2d6a4f]" />
                <span>{language === 'hi' ? 'पत्ती तस्वीर चुनें व लाइव कॉन्फिडेंस देखें:' : 'Choose Plant Leaf Picture & View Live Confidence:'}</span>
              </span>
              <a href="#crop-doctor" className="text-xs text-[#2d6a4f] hover:underline flex items-center gap-1 font-bold">
                <span>Diagnostic Lab →</span>
              </a>
            </div>

            {/* 4 Plant Leaf Photos with Instant Confidence Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_DIAGNOSES.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handlePresetClick(item)}
                  className={`p-2 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer group ${
                    heroActivePreset.key === item.key
                      ? 'bg-[#d8f3dc] border-[#2d6a4f] ring-2 ring-[#52b788] shadow-xs'
                      : 'bg-[#faf8f2] hover:bg-white border-[#0f2e1b]/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#0f2e1b]/15 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="truncate leading-tight">
                    <span className="font-extrabold text-[11px] text-[#0f2e1b] block truncate">
                      {item.label.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-black text-[#2d6a4f]">
                      {item.confidence}% Conf.
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Dynamic Confidence Meter Bar according to selected plant pic */}
            <div className="pt-2 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-[#0f2e1b]">
                  {heroActivePreset.label.split('(')[0]}:
                </span>
                <span className="text-emerald-800 font-mono font-black text-sm bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                  {displayDiagnosis.confidence}% Match
                </span>
              </div>
              <span className="text-[11px] text-[#143d22]/70 font-medium">
                Lesion Match: {displayDiagnosis.lesionMatchScore || 96}%
              </span>
            </div>
          </div>

          {/* Dual CTAs in Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href="#crop-doctor"
              className="py-3.5 px-6 bg-[#2d6a4f] hover:bg-[#143d22] active:scale-[0.98] text-white rounded-2xl font-bold text-center text-sm sm:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Camera className="w-5 h-5 text-amber-300" />
              <span>{language === 'hi' ? 'अपनी पत्ती स्कैन करें' : 'Scan Your Plant Leaf Photo'}</span>
            </a>
            <a
              href="#ai-assistant"
              className="py-3.5 px-6 bg-white border border-[#0f2e1b]/15 hover:bg-[#faf8f2] active:scale-[0.98] text-[#0f2e1b] rounded-2xl font-bold text-center text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>🤖</span>
              <span>{language === 'hi' ? 'द्विभाषी कृषि मित्र से पूछें' : 'Ask Krishi Mitra (Bilingual AI)'}</span>
            </a>
          </div>

          {/* Hero Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold text-[#143d22]/90 pt-1">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>Leaf Picture Vision</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>Confidence Breakdown</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>Fast Live Telemetry</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[#40916c] font-black text-sm">✓</span>
              <span>Hindi &amp; English</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual with Real Leaf Picture Overlay telemetry */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#52b788]/30 bg-[#0f2e1b] group">
            {/* Farmer in field holding phone */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABvNejr67q7kNS_LRl71EBpkxeFq-VE0erzA8KJ0VDLHGOEWCLsmH2dfryyd2TnXyv5GdAOn3XyuwmGltGgnhgjUFnVGE9WaBUgzRq76HOR2MtFgYkKWNiYu2PI6Khpx0zq_nDR3wWqYp1QsdU1EEHQQw82Zlrfsarp6CNk7KEKqyof8WwW3sKnWukC1nKXPbcPXC5TmD2ip7RMS-dPk_jMPDVt1479reOyCOVFxtr5BVmcDKfu1AllA"
              alt="Indian farmer smiling in crop field with digital phone interface"
              className="w-full h-auto object-cover object-center max-h-[470px] transform group-hover:scale-[1.02] transition-transform duration-700"
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
                  {language === 'hi' ? 'लाइव मौसम व नमी' : 'Live IoT Telemetry'}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#0f2e1b]">💧 {moisture}% · 🌧 {rain}%</p>
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

            {/* Floating Card 3: Dynamic Plant Picture & Verified Confidence Badge Bottom Left */}
            <a
              href="#crop-doctor"
              className="absolute bottom-20 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-3 max-w-[240px] text-left active:scale-95 hover:bg-white transition-all cursor-pointer ring-2 ring-emerald-500/60"
              title="Click to view leaf pathology breakdown"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-emerald-500 relative">
                <img
                  src={displayImage}
                  alt="Scanned plant leaf"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-[11px] font-extrabold text-emerald-950 truncate max-w-[130px]">
                    {displayDiagnosis.diseaseName.split('(')[0]}
                  </p>
                </div>
                <p className="text-xs font-black text-[#2d6a4f] mt-0.5">
                  {displayDiagnosis.confidence}% Confidence
                </p>
                <span className="text-[9px] text-[#143d22]/60 block mt-0.5">Calculated from pic →</span>
              </div>
            </a>

            {/* Floating Card 4: Action Alert Irrigation Bottom Banner */}
            <a
              href="#today-action"
              className={`absolute bottom-3 inset-x-3 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border flex items-center justify-between active:scale-[0.99] transition-all cursor-pointer ${
                rain >= 55
                  ? 'bg-amber-500/95 text-amber-950 border-amber-300 hover:bg-amber-400'
                  : moisture < 45
                  ? 'bg-rose-500/95 text-white border-rose-300 hover:bg-rose-600'
                  : 'bg-emerald-600/95 text-white border-emerald-300 hover:bg-emerald-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{rain >= 55 ? '🌧' : moisture < 45 ? '💧' : '🌱'}</span>
                <div className="leading-tight">
                  <span className="text-[10px] font-extrabold uppercase tracking-wide px-1.5 py-0.5 rounded inline-block mb-0.5 bg-black/15">
                    {language === 'hi' ? 'सिंचाई सलाह' : 'Irrigation Advice'}
                  </span>
                  <p className="text-xs sm:text-sm font-bold">
                    {rain >= 55
                      ? (language === 'hi' ? 'सिंचाई टालें · कल बारिश संभावित है' : 'Delay irrigation · Rain expected tomorrow')
                      : moisture < 45
                      ? (language === 'hi' ? `तुरंत सिंचाई करें · नमी ${moisture}% कम है` : `Irrigate now · Moisture at ${moisture}% is low`)
                      : (language === 'hi' ? `इष्टतम नमी · ${moisture}% संतुलित है` : `Optimal moisture · ${moisture}% balanced`)}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-xs font-bold bg-black/30 text-white px-2.5 py-1 rounded-xl shadow-xs">
                Take Action →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
