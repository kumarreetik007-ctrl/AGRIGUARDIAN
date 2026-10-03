import React, { useState } from 'react';
import { Language, TelemetryData, FarmerProfile } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Droplets, Wind, AlertTriangle } from 'lucide-react';

interface WhatShouldIDoTodayProps {
  language: Language;
  telemetry: TelemetryData;
  currentFarmer: FarmerProfile;
  onAskAI: (query: string) => void;
  onRecordSaved: () => void;
}

export const WhatShouldIDoToday: React.FC<WhatShouldIDoTodayProps> = ({
  language,
  telemetry,
  currentFarmer,
  onAskAI,
  onRecordSaved,
}) => {
  const [isDelayedConfirmed, setIsDelayedConfirmed] = useState(false);
  const [savingState, setSavingState] = useState(false);

  const handleConfirmDelay = async () => {
    if (isDelayedConfirmed) return;
    setSavingState(true);

    try {
      await fetch('/api/records/confirm-delay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer: currentFarmer.name,
          liters: telemetry.recommendation.waterSavedEstimateLiters,
          savings: telemetry.recommendation.savingsInr,
        }),
      });
    } catch (e) {
      // Continue locally
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#52b788', '#2d6a4f', '#f59e0b', '#3b82f6'],
      });
    } catch {}

    setSavingState(false);
    setIsDelayedConfirmed(true);
    onRecordSaved();
  };

  return (
    <section className="space-y-3.5 h-full flex flex-col justify-between" id="today-action">
      <div>
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
              {language === 'hi' ? 'निर्णय आसूचना' : 'Decision Intelligence'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2e1b] tracking-tight">
              {language === 'hi' ? '“आज मुझे क्या करना चाहिए?”' : '"What Should I Do Today?"'}
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#143d22]/60 bg-[#f5f2e9] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#143d22]/50" />
            <span>{language === 'hi' ? '10 मिनट पहले अपडेट' : 'Updated 10m ago'}</span>
          </span>
        </div>

        {/* Priority Action Card */}
        <div className="bg-amber-50 border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 shadow-sm transition-all">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-2xl shrink-0 shadow-xs">
              🌧️
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {language === 'hi' ? 'उच्च प्राथमिकता' : 'High Priority'}
                </span>
                <span className="text-xs font-semibold text-amber-800">
                  {language === 'hi' ? 'मौसम चेतावनी' : 'Weather Alert'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-amber-950 leading-snug">
                {language === 'hi'
                  ? 'आज सिंचाई टालें। कल दोपहर बारिश का पूर्वानुमान है।'
                  : 'Delay irrigation today. Rainfall expected tomorrow.'}
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/85 mt-1.5 leading-relaxed">
                {language === 'hi' ? (
                  <>
                    मिट्टी की नमी वर्तमान में <strong>{telemetry.metrics.soilMoisturePercent}%</strong> है। निर्धारित नलकूप सिंचाई टालने से लगभग{' '}
                    <strong>{telemetry.recommendation.waterSavedEstimateLiters.toLocaleString()} लीटर</strong> पानी और बिजली का खर्च बचेगा।
                  </>
                ) : (
                  <>
                    Soil moisture is currently at <strong>{telemetry.metrics.soilMoisturePercent}%</strong>. Delaying scheduled tubewell irrigation will save approx.{' '}
                    <strong>{telemetry.recommendation.waterSavedEstimateLiters.toLocaleString()} liters</strong> of groundwater and energy.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3.5 border-t border-amber-300/60 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleConfirmDelay}
              disabled={savingState}
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDelayedConfirmed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-[#081a0f]'
              }`}
            >
              {isDelayedConfirmed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>{language === 'hi' ? 'पुष्टि सहेज ली गई (+4 इको स्कोर)' : 'Confirmed & Saved to Record (+4 Eco Score)'}</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>{language === 'hi' ? 'देरी की पुष्टि करें (ऑडिट रिकॉर्ड)' : 'Confirm Delay (Save Record)'}</span>
                </>
              )}
            </button>

            <a
              href="#ai-assistant"
              onClick={() => onAskAI(language === 'hi' ? 'सिंचाई कब शुरू करनी चाहिए?' : 'When should I resume irrigation after rain?')}
              className="px-4 py-3 bg-white hover:bg-amber-100/50 border border-amber-400/80 font-bold rounded-xl text-xs sm:text-sm text-amber-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>🤖</span>
              <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Quick Pillar Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 pt-1">
        {/* Sub-card 1: Crop */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#0f2e1b]/10 shadow-xs text-left hover:border-[#2d6a4f]/30 transition-colors">
          <div className="flex items-center gap-1.5 mb-1 text-[#2d6a4f]">
            <span className="text-base">🌱</span>
            <span className="text-xs font-bold">{language === 'hi' ? 'फसल' : 'Crop'}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#0f2e1b]">{language === 'hi' ? 'पत्तियों की नोक देखें' : 'Monitor leaf tips'}</p>
          <p className="text-[10px] sm:text-xs text-[#143d22]/60 mt-0.5">{language === 'hi' ? 'झुलसा रोग की जांच' : 'Check for blight'}</p>
        </div>

        {/* Sub-card 2: Water */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#0f2e1b]/10 shadow-xs text-left hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-1.5 mb-1 text-blue-700">
            <span className="text-base">💧</span>
            <span className="text-xs font-bold">{language === 'hi' ? 'सिंचाई' : 'Water'}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#0f2e1b]">Moisture: {telemetry.metrics.soilMoisturePercent}%</p>
          <p className="text-[10px] sm:text-xs text-[#143d22]/60 mt-0.5">{language === 'hi' ? 'पंप आवश्यक नहीं' : 'No pump needed'}</p>
        </div>

        {/* Sub-card 3: Weather */}
        <div className="bg-white p-3.5 rounded-2xl border border-[#0f2e1b]/10 shadow-xs text-left hover:border-amber-500/30 transition-colors">
          <div className="flex items-center gap-1.5 mb-1 text-amber-700">
            <span className="text-base">🌦</span>
            <span className="text-xs font-bold">{language === 'hi' ? 'मौसम' : 'Weather'}</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-[#0f2e1b]">Rain {telemetry.metrics.rainProbabilityPercent}%</p>
          <p className="text-[10px] sm:text-xs text-[#143d22]/60 mt-0.5">Winds: {telemetry.metrics.windSpeedKmh} km/h</p>
        </div>
      </div>
    </section>
  );
};
