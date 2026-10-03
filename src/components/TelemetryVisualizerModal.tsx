import React, { useState, useEffect } from 'react';
import { Language, TelemetryData } from '../types';
import { SOIL_MOISTURE_24H_HISTORY, HOURLY_WEATHER_FORECAST } from '../data/mockData';
import { X, RefreshCw, Sliders, Droplets, Zap, TrendingUp, CloudRain, ShieldCheck, Activity } from 'lucide-react';

interface TelemetryVisualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  telemetry: TelemetryData;
}

export const TelemetryVisualizerModal: React.FC<TelemetryVisualizerModalProps> = ({
  isOpen,
  onClose,
  language,
  telemetry: initialTelemetry,
}) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const [simulatedMoisture, setSimulatedMoisture] = useState(initialTelemetry.metrics.soilMoisturePercent);
  const [simulatedRain, setSimulatedRain] = useState(initialTelemetry.metrics.rainProbabilityPercent);
  const [timeRange, setTimeRange] = useState<'live' | '24h' | '7d'>('live');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setTelemetry(initialTelemetry);
  }, [initialTelemetry]);

  if (!isOpen) return null;

  // Recalculate recommendation dynamically when judge moves the simulator slider!
  const getDynamicRecommendation = (moisture: number, rain: number) => {
    if (rain >= 60) {
      return {
        action: 'DELAY_IRRIGATION',
        headline: language === 'hi' ? 'आज सिंचाई टालें। भारी बारिश संभावित है।' : 'Delay irrigation today. Rainfall expected tomorrow.',
        badge: language === 'hi' ? 'उच्च प्राथमिकता (वर्षा अलर्ट)' : 'High Priority (Rain Alert)',
        badgeColor: 'bg-amber-500 text-amber-950',
        detail: language === 'hi' ? `मिट्टी में ${moisture}% नमी है। बारिश से 1,400 लीटर पानी व बिजली बचेगी।` : `Soil moisture is at ${moisture}%. Delaying tubewell saves ~1,400L groundwater and energy.`,
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

  const handleRefresh = async () => {
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
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-xl text-lg">📊</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-[#0f2e1b] text-base">
                  {language === 'hi' ? 'लाइव टेलीमेट्री और सेंसर हब' : 'Real-Time Farm Telemetry'}
                </h3>
              </div>
              <p className="text-[11px] text-[#143d22]/70">
                {language === 'hi' ? '24 घंटे का सेंसर स्ट्रीम और जल बचत विश्लेषक' : '24h live calibrated sensor telemetry & moisture curve'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl bg-[#f5f2e9] text-[#0f2e1b] hover:bg-[#ede8dc] ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh sensor stream"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#f5f2e9] text-[#0f2e1b] hover:bg-[#ede8dc]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Time Filter Tabs */}
        <div className="flex p-1 bg-[#f5f2e9] rounded-xl my-3 text-xs font-bold text-[#143d22]">
          <button
            onClick={() => setTimeRange('live')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${timeRange === 'live' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'hover:text-[#0f2e1b]'}`}
          >
            {language === 'hi' ? 'लाइव स्ट्रीम' : 'Live Stream'}
          </button>
          <button
            onClick={() => setTimeRange('24h')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${timeRange === '24h' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'hover:text-[#0f2e1b]'}`}
          >
            {language === 'hi' ? '24 घंटे' : 'Last 24 Hours'}
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`flex-1 py-1.5 rounded-lg transition-all ${timeRange === '7d' ? 'bg-[#2d6a4f] text-white shadow-xs' : 'hover:text-[#0f2e1b]'}`}
          >
            {language === 'hi' ? '7 दिन का रुझान' : '7-Day Trend'}
          </button>
        </div>

        {/* Dynamic Decision Status Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${currentRec.badgeColor}`}>
              {currentRec.badge}
            </span>
            <span className="text-[10px] font-mono text-amber-900/70">
              Sensor Updated {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h4 className="font-extrabold text-amber-950 text-xs sm:text-sm">
            {currentRec.headline}
          </h4>
          <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
            {currentRec.detail}
          </p>
        </div>

        {/* Interactive Judge Sensor Simulator */}
        <div className="bg-[#faf8f2] p-3.5 rounded-2xl border border-[#0f2e1b]/10 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0f2e1b] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#2d6a4f]" />
              <span>{language === 'hi' ? 'जज सिम्युलेटर: सेंसर मान बदलें' : 'Interactive Sensor Simulator (For Judges):'}</span>
            </span>
            <span className="text-[10px] bg-[#d8f3dc] text-[#1b4332] font-black px-2 py-0.5 rounded">
              Interactive
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#143d22]/80">💧 Soil Moisture:</span>
                <span className="font-extrabold text-[#2d6a4f]">{simulatedMoisture}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="85"
                value={simulatedMoisture}
                onChange={(e) => setSimulatedMoisture(parseInt(e.target.value))}
                className="w-full accent-[#2d6a4f] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-[#143d22]/50">
                <span>30% (Wilting Point)</span>
                <span>60% (Optimal)</span>
                <span>85% (Waterlogged)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#143d22]/80">🌧 Rain Forecast Probability:</span>
                <span className="font-extrabold text-amber-700">{simulatedRain}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simulatedRain}
                onChange={(e) => setSimulatedRain(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 24-Hour Soil Moisture Trend Chart (Visual SVG) */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#0f2e1b]/10 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0f2e1b]">
              {language === 'hi' ? '24 घंटे का नमी वक्र (ग्राफ)' : '24h Soil Moisture Curve (% Volume)'}
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Adequate Zone: 55-65%
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
                strokeWidth="2.5"
                points="0,32 50,35 100,38 150,40 200,42 250,42 300,42"
              />

              {/* Data points */}
              <circle cx="0" cy="32" r="3.5" fill="#143d22" />
              <circle cx="50" cy="35" r="3.5" fill="#143d22" />
              <circle cx="100" cy="38" r="3.5" fill="#143d22" />
              <circle cx="150" cy="40" r="3.5" fill="#143d22" />
              <circle cx="200" cy="42" r="3.5" fill="#143d22" />
              <circle cx="250" cy="42" r="3.5" fill="#143d22" />
              <circle cx="300" cy="42" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            </svg>
            <div className="flex justify-between text-[10px] text-[#143d22]/60 mt-1">
              {SOIL_MOISTURE_24H_HISTORY.map((h, i) => (
                <span key={i}>{h.hour}</span>
              ))}
            </div>
          </div>
        </div>

        {/* N-P-K Soil Nutrient Health Breakdown */}
        <div className="bg-[#faf8f2] p-3.5 rounded-2xl border border-[#0f2e1b]/10 mb-4">
          <span className="text-xs font-bold text-[#0f2e1b] block mb-2">
            🌱 {language === 'hi' ? 'मिट्टी पोषक तत्व संतुलन (N-P-K)' : 'N-P-K Soil Nutrient Health Meters'}
          </span>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white p-2.5 rounded-xl border border-[#0f2e1b]/5">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Nitrogen (N)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">240 kg/ha</span>
              <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold block mt-1">Moderate</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#0f2e1b]/5">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Phosphorus (P)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">48 kg/ha</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold block mt-1">Optimal</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[#0f2e1b]/5">
              <span className="text-[10px] text-[#143d22]/60 font-semibold block">Potassium (K)</span>
              <span className="font-extrabold text-[#0f2e1b] text-sm">195 kg/ha</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold block mt-1">Optimal</span>
            </div>
          </div>
        </div>

        {/* Cumulative Savings Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span className="text-emerald-800 text-[10px] font-bold block uppercase">Groundwater Conserved</span>
            <span className="text-base font-black text-emerald-950">14,200 Liters</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">Tubewell pumping avoided</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-amber-800 text-[10px] font-bold block uppercase">Farmer Financial Savings</span>
            <span className="text-base font-black text-amber-950">₹3,420 INR</span>
            <span className="text-[10px] text-amber-700 block mt-0.5">Electricity &amp; spray saved</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-[#143d22] text-white font-bold rounded-xl text-xs hover:bg-[#0f2e1b]"
        >
          {language === 'hi' ? 'बंद करें' : 'Close Telemetry'}
        </button>
      </div>
    </div>
  );
};
