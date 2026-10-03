import React from 'react';
import { Language, TelemetryData, FarmerProfile } from '../types';
import { BarChart2, Radio, Activity, MapPin } from 'lucide-react';

interface LiveFarmHubProps {
  language: Language;
  telemetry: TelemetryData;
  currentFarmer: FarmerProfile;
  onOpenTelemetry: () => void;
}

export const LiveFarmHub: React.FC<LiveFarmHubProps> = ({
  language,
  telemetry,
  currentFarmer,
  onOpenTelemetry,
}) => {
  return (
    <section className="bg-[#0f2e1b] text-[#fcfbf8] rounded-3xl p-5 sm:p-6 shadow-xl border border-[#1b4332]/70 relative overflow-hidden h-full flex flex-col justify-between">
      {/* Decorative subtle ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#1b4332]">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#74c69d] font-extrabold block">
                {language === 'hi' ? 'लाइव फार्म टेलीमेट्री हब' : 'Live Farm Hub'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-white">
              {language === 'hi' ? 'आपका खेत, आपका वास्तविक डेटा' : 'Your Farm, Your Data'}
            </h2>
          </div>
          <span className="px-3 py-1 bg-[#52b788]/20 text-[#95d5b2] border border-[#74c69d]/30 text-xs rounded-xl font-bold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#74c69d]" />
            <span>{currentFarmer.name.split(' ')[0]} ({currentFarmer.district})</span>
          </span>
        </div>

        {/* Quick Metrics Grid */}
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

          <div className="bg-[#143d22]/80 p-3 rounded-2xl border border-[#1b4332]/60 hover:border-[#52b788]/40 transition-colors">
            <span className="text-xs block text-[#95d5b2] font-semibold">
              💧 {language === 'hi' ? 'नमी' : 'Moisture'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-400 mt-0.5 block">
              {telemetry.metrics.soilMoisturePercent}%
            </span>
            <span className="text-[10px] text-emerald-300/80 block mt-1">
              {language === 'hi' ? 'पर्याप्त (संतुलित)' : 'Adequate'}
            </span>
          </div>
        </div>

        {/* Weather probability bar */}
        <div className="mt-4 bg-[#143d22]/60 p-3.5 rounded-2xl border border-[#1b4332]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌧</span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                {language === 'hi'
                  ? `बारिश की संभावना: ${telemetry.metrics.rainProbabilityPercent}%`
                  : `Rain Probability: ${telemetry.metrics.rainProbabilityPercent}%`}
              </p>
              <p className="text-xs text-[#f5f2e9]/70">
                {language === 'hi' ? 'संभावित समय: कल दोपहर ~2:00 बजे' : `Expected arrival: ${telemetry.metrics.rainExpectedArrival}`}
              </p>
            </div>
          </div>
          <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
            {language === 'hi' ? 'उच्च' : 'High'}
          </span>
        </div>
      </div>

      {/* Action button to open full telemetry interactive visualizer */}
      <button
        onClick={onOpenTelemetry}
        className="w-full mt-4 py-2.5 bg-[#1b4332] hover:bg-[#245a43] active:scale-[0.98] text-[#95d5b2] hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all border border-[#52b788]/20 cursor-pointer"
      >
        <BarChart2 className="w-4 h-4 text-[#52b788]" />
        <span>{language === 'hi' ? 'लाइव 24h सेंसर चार्ट व N-P-K डेटा देखें →' : 'View Live 24h Sensor Stream & N-P-K Charts →'}</span>
      </button>
    </section>
  );
};
