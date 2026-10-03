import React, { useState } from 'react';
import { Language, TelemetryData, FarmerProfile } from '../types';
import { BarChart2, Radio, Activity, MapPin, ChevronDown, ChevronUp, Zap, Sliders, RefreshCw, Droplets, CloudRain } from 'lucide-react';

interface LiveFarmHubProps {
  language: Language;
  telemetry: TelemetryData;
  currentFarmer: FarmerProfile;
  onOpenTelemetry: () => void;
  onUpdateMoisture?: (val: number) => void;
  onUpdateRain?: (val: number) => void;
  isStreaming?: boolean;
  onToggleStreaming?: () => void;
}

export const LiveFarmHub: React.FC<LiveFarmHubProps> = ({
  language,
  telemetry,
  currentFarmer,
  onOpenTelemetry,
  onUpdateMoisture,
  onUpdateRain,
  isStreaming = true,
  onToggleStreaming,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const moisture = telemetry.metrics.soilMoisturePercent;
  const rain = telemetry.metrics.rainProbabilityPercent;

  return (
    <section className="bg-[#0f2e1b] text-[#fcfbf8] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#1b4332]/70 relative overflow-hidden flex flex-col justify-between transition-all">
      {/* Decorative ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Top Header with Fast Live Streaming Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#1b4332] gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#74c69d] font-extrabold block">
                {language === 'hi' ? 'लाइव फार्म टेलीमेट्री हब' : 'Fast Live Telemetry Stream'}
              </span>
              <span className="bg-[#1b4332] text-emerald-300 font-mono text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {isStreaming ? '⚡ 1s IoT Ticker' : 'Paused'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
              {language === 'hi' ? 'आपका खेत, आपका लाइव डेटा' : 'Your Farm, Live IoT Sensors'}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onToggleStreaming && (
              <button
                onClick={onToggleStreaming}
                className="px-2.5 py-1 bg-[#143d22] hover:bg-[#1b4332] text-emerald-300 border border-emerald-500/30 text-[10px] rounded-lg font-mono font-bold cursor-pointer transition-colors"
                title="Toggle fast 1s telemetry stream"
              >
                {isStreaming ? '⏸ Pause Stream' : '▶ Resume 1s Stream'}
              </button>
            )}
            <span className="px-3 py-1 bg-[#52b788]/20 text-[#95d5b2] border border-[#74c69d]/30 text-xs rounded-xl font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#74c69d]" />
              <span>{currentFarmer.name.split(' ')[0]} ({currentFarmer.district})</span>
            </span>
          </div>
        </div>

        {/* Quick Metrics Grid with Live Pulsing Readings */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-4 text-center">
          <div className="bg-[#143d22]/80 p-3 rounded-2xl border border-[#1b4332]/60 hover:border-[#52b788]/40 transition-colors">
            <span className="text-xs block text-[#95d5b2] font-semibold">
              🌾 {language === 'hi' ? 'फसल' : 'Crop'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-white truncate block mt-0.5">
              {language === 'hi' ? currentFarmer.cropHindi.split(' ')[0] : currentFarmer.crop.split(' ')[0]}
            </span>
            <span className="text-[10px] text-[#74c69d]/80 block mt-1">
              {telemetry.growthStage}
            </span>
          </div>

          <div className="bg-[#143d22]/80 p-3 rounded-2xl border border-[#1b4332]/60 hover:border-[#52b788]/40 transition-colors">
            <span className="text-xs block text-[#95d5b2] font-semibold">
              📏 {language === 'hi' ? 'रकबा' : 'Size'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-white mt-0.5 block">
              {currentFarmer.acreage} {language === 'hi' ? 'एकड़' : 'Acres'}
            </span>
            <span className="text-[10px] text-[#74c69d]/80 block mt-1 truncate">
              {currentFarmer.soilType}
            </span>
          </div>

          {/* Live Moisture Metric with Active Pulse */}
          <div className="bg-[#143d22]/80 p-3 rounded-2xl border border-emerald-500/40 relative group">
            <span className="text-xs block text-[#95d5b2] font-semibold flex items-center justify-center gap-1">
              <span>💧 {language === 'hi' ? 'नमी' : 'Moisture'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-300 mt-0.5 block">
              {moisture}%
            </span>
            <span className="text-[10px] text-emerald-400/90 block mt-1 font-bold">
              {moisture > 72 ? 'Saturated' : moisture < 45 ? 'Deficit' : 'Optimal'} (Live)
            </span>
          </div>
        </div>

        {/* Live Weather probability bar */}
        <div className="mt-3.5 bg-[#143d22]/60 p-3.5 rounded-2xl border border-[#1b4332]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌧</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                {language === 'hi'
                  ? `बारिश की संभावना: ${rain}%`
                  : `Rain Probability: ${rain}%`}
              </p>
              <p className="text-xs text-[#f5f2e9]/70">
                {language === 'hi'
                  ? (rain >= 55 ? 'संभावित समय: कल दोपहर ~2:00 बजे' : 'अगले 48 घंटों में बारिश नहीं')
                  : (rain >= 55 ? `Expected arrival: ${telemetry.metrics.rainExpectedArrival}` : 'Clear skies next 48h')}
              </p>
            </div>
          </div>
          <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${
            rain >= 55
              ? 'text-amber-300 bg-amber-500/20 border-amber-400/30'
              : 'text-emerald-300 bg-emerald-500/20 border-emerald-400/30'
          }`}>
            {rain >= 55 ? (language === 'hi' ? 'उच्च' : 'High') : (language === 'hi' ? 'कम' : 'Low')}
          </span>
        </div>

        {/* Instant Fast Simulator Controls right on card */}
        <div className="mt-3.5 bg-[#081a0f]/80 p-3 rounded-2xl border border-[#1b4332] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#74c69d] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'त्वरित सेंसर टेस्ट (फास्ट सिमुलेशन):' : 'Instant Sensor Test (Fast Presets):'}</span>
            </span>
            <span className="text-[9px] text-[#95d5b2] font-mono">Instant Sync</span>
          </div>

          {/* 3 Quick Simulation Buttons that immediately trigger telemetry & recommendations */}
          <div className="grid grid-cols-3 gap-1.5">
            <button
              onClick={() => onUpdateMoisture && onUpdateMoisture(34)}
              className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                moisture < 45
                  ? 'bg-rose-500/30 text-rose-200 border-rose-400/60 ring-1 ring-rose-400'
                  : 'bg-[#143d22] text-[#95d5b2] hover:bg-[#1b4332] border-[#1b4332]'
              }`}
            >
              💧 Dry (34%)
            </button>
            <button
              onClick={() => onUpdateMoisture && onUpdateMoisture(62)}
              className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                moisture >= 45 && moisture <= 72
                  ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/60 ring-1 ring-emerald-400'
                  : 'bg-[#143d22] text-[#95d5b2] hover:bg-[#1b4332] border-[#1b4332]'
              }`}
            >
              🌱 Ideal (62%)
            </button>
            <button
              onClick={() => onUpdateMoisture && onUpdateMoisture(84)}
              className={`py-1.5 px-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                moisture > 72
                  ? 'bg-amber-500/30 text-amber-200 border-amber-400/60 ring-1 ring-amber-400'
                  : 'bg-[#143d22] text-[#95d5b2] hover:bg-[#1b4332] border-[#1b4332]'
              }`}
            >
              🌧 Saturated (84%)
            </button>
          </div>

          {/* Quick Slider for exact moisture manipulation */}
          <div className="pt-1 flex items-center gap-2">
            <span className="text-[10px] text-white/70 font-mono shrink-0">Moisture:</span>
            <input
              type="range"
              min="20"
              max="95"
              value={moisture}
              onChange={(e) => onUpdateMoisture && onUpdateMoisture(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-[#143d22] rounded-lg"
            />
            <span className="text-[11px] font-mono font-bold text-emerald-300 shrink-0 w-8 text-right">
              {moisture}%
            </span>
          </div>
        </div>

        {/* In-Page Expandable Live Sensor Drawer */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[#1b4332] space-y-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#74c69d] text-xs">
                📈 24h Soil Moisture Curve (% Volume):
              </span>
              <span className="text-[10px] text-emerald-300 font-mono">
                Sensor: Capacitive Depth 15cm
              </span>
            </div>

            {/* Quick SVG Moisture Curve */}
            <div className="h-20 w-full bg-[#081a0f]/60 rounded-xl p-2 border border-[#1b4332]">
              <svg className="w-full h-full" viewBox="0 0 300 70">
                <rect x="0" y="15" width="300" height="25" fill="#52b788" fillOpacity="0.15" />
                <polyline
                  fill="none"
                  stroke="#52b788"
                  strokeWidth="2.5"
                  points={`0,22 50,25 100,28 150,30 200,${Math.round(40 - (moisture / 3))} 250,${Math.round(40 - (moisture / 3))} 300,${Math.round(40 - (moisture / 3))}`}
                />
                <circle cx="300" cy={Math.round(40 - (moisture / 3))} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Live N-P-K Meters */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
              <div className="bg-[#143d22] p-2 rounded-xl border border-[#1b4332]">
                <span className="text-white/60 block text-[9px]">Nitrogen (N)</span>
                <span className="font-bold text-white">240 kg/ha</span>
              </div>
              <div className="bg-[#143d22] p-2 rounded-xl border border-[#1b4332]">
                <span className="text-white/60 block text-[9px]">Phosphorus (P)</span>
                <span className="font-bold text-emerald-400">48 kg/ha</span>
              </div>
              <div className="bg-[#143d22] p-2 rounded-xl border border-[#1b4332]">
                <span className="text-white/60 block text-[9px]">Potassium (K)</span>
                <span className="font-bold text-emerald-400">195 kg/ha</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dual Fast Actions: Quick Inline Toggle + Full Modal Trigger */}
      <div className="mt-4 pt-3 border-t border-[#1b4332] flex gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 py-2 px-3 bg-[#143d22] hover:bg-[#1b4332] text-[#95d5b2] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#52b788]/20"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>{isExpanded ? 'Hide Sensor Details' : '⚡ Live Sensor Graph'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onOpenTelemetry}
          className="flex-1 py-2 px-3 bg-[#2d6a4f] hover:bg-[#40916c] active:scale-[0.98] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>Full Telemetry Hub →</span>
        </button>
      </div>
    </section>
  );
};
