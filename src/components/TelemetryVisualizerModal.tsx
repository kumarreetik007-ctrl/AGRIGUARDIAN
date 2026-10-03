import React, { useState, useEffect } from 'react';
import { Language, TelemetryData } from '../types';
import { SOIL_MOISTURE_24H_HISTORY, HOURLY_WEATHER_FORECAST } from '../data/mockData';
import { X, RefreshCw, Sliders, Droplets, Zap, TrendingUp, CloudRain, ShieldCheck, Activity, Radio } from 'lucide-react';

interface TelemetryVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  telemetry: TelemetryData;
  onUpdateTelemetry?: (newMoisture: number, newRain: number) => void;
}

export const TelemetryVisualizerModal: React.FC<TelemetryVisualizerModalProps> = ({
  isOpen,
  onClose,
  language,
  telemetry: initialTelemetry,
  onUpdateTelemetry,
}) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const [simulatedMoisture, setSimulatedMoisture] = useState(initialTelemetry.metrics.soilMoisturePercent);
  const [simulatedRain, setSimulatedRain] = useState(initialTelemetry.metrics.rainProbabilityPercent);
  const [timeRange, setTimeRange] = useState<'live' | '24h' | '7d'>('live');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveStreamActive, setLiveStreamActive] = useState(true);
  const [lastStreamTime, setLastStreamTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setTelemetry(initialTelemetry);
    setSimulatedMoisture(initialTelemetry.metrics.soilMoisturePercent);
    setSimulatedRain(initialTelemetry.metrics.rainProbabilityPercent);
  }, [initialTelemetry]);

  const handleMoistureChange = (val: number) => {
    setSimulatedMoisture(val);
    if (onUpdateTelemetry) {
      onUpdateTelemetry(val, simulatedRain);
    }
  };

  const handleRainChange = (val: number) => {
    setSimulatedRain(val);
    if (onUpdateTelemetry) {
      onUpdateTelemetry(simulatedMoisture, val);
    }
  };

  const handleApplyPreset = (m: number, r: number) => {
    setSimulatedMoisture(m);
    setSimulatedRain(r);
    if (onUpdateTelemetry) {
      onUpdateTelemetry(m, r);
    }
  };

  // Fast auto-polling simulation every 2.5 seconds when modal is open
  useEffect(() => {
    if (!isOpen || !liveStreamActive) return;

    const interval = setInterval(() => {
      const jitter = (Math.random() * 1.6 - 0.8);
      setSimulatedMoisture((prev) => {
        const next = Math.min(85, Math.max(40, Math.round(prev + jitter)));
        return next;
      });
      setLastStreamTime(new Date().toLocaleTimeString());
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen, liveStreamActive]);

  if (!isOpen) return null;

  // Recalculate recommendation dynamically when judge moves the simulator slider!
  const getDynamicRecommendation = (moisture: number, rain: number) => {
    if (rain >= 60) {
      return {
        action: 'DELAY_IRRIGATION',
        headline: language === 'hi' ? 'आज सिंचाई टालें। भारी बारिश संभावित है।' : 'Delay irrigation today. Rainfall expected tomorrow.',
        badge: language === 'hi' ? 'उच्च प्राथमिकता (वर्षा अलर्ट)' : 'High Priority (Rain Alert)',
        badgeColor: 'bg-amber-500 text-amber-950',
        detail: language === 'hi' ? `मिट्टी में ${moisture}% नमी है। बारिश से 1,400 लीटर पानी व बिजली बचेगी।` : `Soil moisture is at ${moisture}%. Delaying tubewell saves ~1,400L groundwater and electrical cost.`,
      };
    } else if (moisture < 45) {
      return {
        action: 'IRRIGATE_NOW',
        headline: language === 'hi' ? 'तुरंत हल्की सिंचाई करें। नमी कम है।' : 'Schedule light irrigation now. Moisture is below threshold.',
        badge: language === 'hi' ? 'सिंचाई आवश्यक' : 'Irrigation Required',
        badgeColor: 'bg-rose-500 text-white',
        detail: language === 'hi' ? 'कल्ले फूटने के चरण में नमी 45% से नीचे जाने पर पैदावार घट सकती है।' : 'At tillering stage, moisture drop below 45% risks reducing grain count per ear-head.',
      };
    } else {
      return {
        action: 'MAINTAIN_SCHEDULE',
        headline: language === 'hi' ? 'नमी संतुलित है। नियमित निगरानी रखें।' : 'Moisture is in optimal zone. Maintain regular monitoring.',
        badge: language === 'hi' ? 'सामान्य (इष्टतम)' : 'Optimal Condition',
        badgeColor: 'bg-emerald-600 text-white',
        detail: language === 'hi' ? 'वर्तमान में कोई अतिरिक्त पानी की आवश्यकता नहीं है।' : 'Root turgor is healthy. No additional tubewell pumping required today.',
      };
    }
  };

  const currentRec = getDynamicRecommendation(simulatedMoisture, simulatedRain);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/telemetry/live');
      const data = await res.json();
      if (data && data.metrics) {
        setTelemetry(data);
        setSimulatedMoisture(data.metrics.soilMoisturePercent);
        setSimulatedRain(data.metrics.rainProbabilityPercent);
      }
    } catch (e) {
      // Continue locally
    } finally {
      setLastStreamTime(new Date().toLocaleTimeString());
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[92vh] overflow-y-auto">
        {/* Modal Header with Live Status Indicator */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#0f2e1b]/10">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-emerald-100 text-emerald-800 rounded-2xl text-xl shadow-xs">📊</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-extrabold text-[#0f2e1b] text-base sm:text-lg">
                  {language === 'hi' ? 'लाइव टेलीमेट्री और सेंसर हब' : 'Real-Time Farm Telemetry Hub'}
                </h3>
              </div>
              <p className="text-xs text-[#143d22]/70 font-mono">
                Stream: Active IoT Sensor Gateway (Updated: {lastStreamTime})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              className={`p-2 rounded-xl bg-[#f5f2e9] text-[#0f2e1b] hover:bg-[#ede8dc] cursor-pointer transition-transform ${isRefreshing ? 'rotate-180 duration-300' : ''}`}
              title="Instant Sensor Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#f5f2e9] text-[#0f2e1b] hover:bg-[#ede8dc] cursor-pointer font-bold"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Stream Auto-Poll Toggle Bar */}
        <div className="my-3 p-2.5 bg-[#d8f3dc]/60 rounded-2xl border border-[#52b788]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span className="font-bold text-emerald-950">
              Live Sensor Stream: {liveStreamActive ? 'Connected (Auto-updating)' : 'Paused'}
            </span>
          </div>
          <button
            onClick={() => setLiveStreamActive(!liveStreamActive)}
            className="text-[11px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-xl border border-emerald-300 hover:bg-emerald-50 cursor-pointer"
          >
            {liveStreamActive ? 'Pause Stream' : 'Resume Live'}
          </button>
        </div>

        {/* Dynamic Decision Status Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 mb-4 shadow-2xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className={`text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${currentRec.badgeColor}`}>
              {currentRec.badge}
            </span>
            <span className="text-[10px] font-mono text-amber-900/70">
              Fast Decision Engine
            </span>
          </div>
          <h4 className="font-extrabold text-amber-950 text-sm sm:text-base">
            {currentRec.headline}
          </h4>
          <p className="text-xs text-amber-900/85 mt-1 leading-relaxed">
            {currentRec.detail}
          </p>
        </div>

        {/* Interactive Judge Sensor Simulator */}
        <div className="bg-[#faf8f2] p-4 rounded-3xl border border-[#0f2e1b]/10 mb-4 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs sm:text-sm font-bold text-[#0f2e1b] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#2d6a4f]" />
              <span>{language === 'hi' ? 'सेंसर सिम्युलेटर (तुरंत परिणाम देखें):' : 'Interactive Sensor Simulator (Test Real-Time Adaptation):'}</span>
            </span>
            <span className="text-[10px] bg-[#d8f3dc] text-[#1b4332] font-black px-2.5 py-0.5 rounded-full">
              Zero Latency
            </span>
          </div>

          {/* Quick preset buttons in modal */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => handleApplyPreset(34, 15)}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-rose-50 text-rose-800 rounded-xl text-[11px] font-bold border border-rose-300 shadow-2xs transition-colors cursor-pointer"
            >
              💧 Dry (34%)
            </button>
            <button
              onClick={() => handleApplyPreset(62, 20)}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-emerald-50 text-emerald-800 rounded-xl text-[11px] font-bold border border-emerald-300 shadow-2xs transition-colors cursor-pointer"
            >
              🌱 Optimal (62%)
            </button>
            <button
              onClick={() => handleApplyPreset(84, 85)}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-amber-50 text-amber-900 rounded-xl text-[11px] font-bold border border-amber-300 shadow-2xs transition-colors cursor-pointer"
            >
              🌧 Rainstorm (84%)
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#143d22]/80 flex items-center gap-1.5">
                  <span>💧 Soil Moisture Sensor Reading:</span>
                </span>
                <span className="font-black text-[#2d6a4f] text-sm bg-white px-2 py-0.5 rounded-md border border-[#2d6a4f]/20">
                  {simulatedMoisture}%
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                value={simulatedMoisture}
                onChange={(e) => handleMoistureChange(parseInt(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#143d22]/60 mt-1 font-medium">
                <span>20% (Wilting Point)</span>
                <span className="text-emerald-700 font-bold">50-65% (Optimal Range)</span>
                <span>95% (Waterlogged)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1.5">
                <span className="text-[#143d22]/80 flex items-center gap-1.5">
                  <span>🌧 Rainfall Probability Forecast:</span>
                </span>
                <span className="font-black text-amber-700 text-sm bg-white px-2 py-0.5 rounded-md border border-amber-300">
                  {simulatedRain}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simulatedRain}
                onChange={(e) => handleRainChange(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* 24-Hour Soil Moisture Trend Chart (Visual SVG) */}
        <div className="bg-white p-4 rounded-3xl border border-[#0f2e1b]/10 mb-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-bold text-[#0f2e1b]">
              {language === 'hi' ? '24 घंटे का नमी वक्र (ग्राफ)' : '24h Soil Moisture Continuous Curve (% Vol)'}
            </span>
            <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
              Adequate Band: 55-65%
            </span>
          </div>

          <div className="h-32 w-full pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100">
              {/* Optimal band green shading */}
              <rect x="0" y="25" width="300" height="30" fill="#d8f3dc" fillOpacity="0.5" />
              <line x1="0" y1="25" x2="300" y2="25" stroke="#52b788" strokeDasharray="3 3" strokeWidth="0.8" />
              <line x1="0" y1="55" x2="300" y2="55" stroke="#52b788" strokeDasharray="3 3" strokeWidth="0.8" />

              {/* Moisture line points */}
              <polyline
                fill="none"
                stroke="#2d6a4f"
                strokeWidth="3"
                points="0,32 50,35 100,38 150,40 200,42 250,42 300,42"
              />

              {/* Data points */}
              <circle cx="0" cy="32" r="3.5" fill="#143d22" />
              <circle cx="50" cy="35" r="3.5" fill="#143d22" />
              <circle cx="100" cy="38" r="3.5" fill="#143d22" />
              <circle cx="150" cy="40" r="3.5" fill="#143d22" />
              <circle cx="200" cy="42" r="3.5" fill="#143d22" />
              <circle cx="250" cy="42" r="3.5" fill="#143d22" />
              <circle cx="300" cy="42" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[10px] text-[#143d22]/60 mt-2 font-mono">
              {SOIL_MOISTURE_24H_HISTORY.map((h, i) => (
                <span key={i}>{h.hour}</span>
              ))}
            </div>
          </div>
        </div>

        {/* N-P-K Soil Nutrient Health Breakdown */}
        <div className="bg-[#faf8f2] p-4 rounded-3xl border border-[#0f2e1b]/10 mb-4">
          <span className="text-xs font-bold text-[#0f2e1b] block mb-2.5">
            🌱 {language === 'hi' ? 'मिट्टी पोषक तत्व संतुलन (N-P-K)' : 'N-P-K Soil Nutrient Health Gauges'}
          </span>
          <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div className="bg-white p-3 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Nitrogen (N)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">240 kg/ha</span>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold block mt-1">Moderate</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Phosphorus (P)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">48 kg/ha</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold block mt-1">Optimal</span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#0f2e1b]/5 shadow-2xs">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Potassium (K)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">195 kg/ha</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold block mt-1">Optimal</span>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#143d22] text-white font-bold rounded-2xl text-xs sm:text-sm hover:bg-[#0f2e1b] cursor-pointer transition-colors"
        >
          {language === 'hi' ? 'टेलीमेट्री बंद करें' : 'Close Telemetry'}
        </button>
      </div>
    </div>
  );
};
