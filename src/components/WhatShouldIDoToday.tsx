import React, { useState } from 'react';
import { Language, TelemetryData, FarmerProfile } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Droplets, Wind, AlertTriangle, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface WhatShouldIDoTodayProps {
  language: Language;
  telemetry: TelemetryData;
  currentFarmer: FarmerProfile;
  onAskAI: (query: string) => void;
  onRecordSaved: () => void;
  onUpdateMoisture?: (moisture: number) => void;
}

export const WhatShouldIDoToday: React.FC<WhatShouldIDoTodayProps> = ({
  language,
  telemetry,
  currentFarmer,
  onAskAI,
  onRecordSaved,
  onUpdateMoisture,
}) => {
  const [isDelayedConfirmed, setIsDelayedConfirmed] = useState(false);
  const [savingState, setSavingState] = useState(false);

  const moisture = telemetry.metrics.soilMoisturePercent;
  const rain = telemetry.metrics.rainProbabilityPercent;

  // Dynamic Decision Intelligence engine based on live telemetry numbers
  const getDecision = () => {
    if (rain >= 55) {
      return {
        type: 'DELAY_IRRIGATION',
        icon: '🌧️',
        badge: language === 'hi' ? 'उच्च प्राथमिकता (वर्षा अलर्ट)' : 'High Priority (Rain Alert)',
        badgeColor: 'bg-amber-200 text-amber-900 border-amber-300',
        headline: language === 'hi'
          ? 'आज सिंचाई टालें। कल दोपहर बारिश का पूर्वानुमान है।'
          : 'Delay irrigation today. Rainfall expected tomorrow.',
        detail: language === 'hi'
          ? `मिट्टी की नमी वर्तमान में ${moisture}% है। निर्धारित नलकूप सिंचाई टालने से लगभग 1,400 लीटर पानी और बिजली का खर्च बचेगा।`
          : `Soil moisture is at ${moisture}%. Delaying scheduled tubewell irrigation will save approx. 1,400 liters of groundwater and electrical bill.`,
        bgClass: 'bg-amber-50 border-amber-400/80',
        titleColor: 'text-amber-950',
        textColor: 'text-amber-900/90',
        buttonClass: 'bg-amber-500 hover:bg-amber-600 text-amber-950',
        buttonText: language === 'hi' ? 'देरी की पुष्टि करें (ऑडिट रिकॉर्ड)' : 'Confirm Delay (Save Record)',
        waterSaved: 1400,
        moneySaved: 340,
        ecoScore: '+4 Eco Score',
      };
    } else if (moisture < 45) {
      return {
        type: 'IRRIGATE_NOW',
        icon: '💧',
        badge: language === 'hi' ? 'अति आवश्यक (नमी की कमी)' : 'Urgent (Moisture Deficit)',
        badgeColor: 'bg-rose-200 text-rose-900 border-rose-300',
        headline: language === 'hi'
          ? `तुरंत हल्की सिंचाई करें। नमी ${moisture}% तक घट गई है।`
          : `Schedule light irrigation now. Moisture dropped to ${moisture}%.`,
        detail: language === 'hi'
          ? `गेहूं के कल्ले फूटने (टिल्लरिंग) के चरण में नमी 45% से कम होने पर बालियों में दानों की संख्या घट सकती है। 2-3 सेमी हल्की सिंचाई करें।`
          : `At tillering stage, moisture drop below 45% risks reducing grain count per ear-head. Apply a light furrow irrigation of 2-3 cm today.`,
        bgClass: 'bg-rose-50 border-rose-400/80',
        titleColor: 'text-rose-950',
        textColor: 'text-rose-900/90',
        buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white',
        buttonText: language === 'hi' ? 'सिंचाई शुरू की पुष्टि करें' : 'Confirm Irrigation Started',
        waterSaved: 0,
        moneySaved: 0,
        ecoScore: '+3 Agronomy Points',
      };
    } else if (moisture > 72) {
      return {
        type: 'DRAINAGE_ALERT',
        icon: '🌊',
        badge: language === 'hi' ? 'सतर्कता (अत्यधिक नमी)' : 'Notice (Saturated Soil)',
        badgeColor: 'bg-blue-200 text-blue-900 border-blue-300',
        headline: language === 'hi'
          ? `खेत में नमी ${moisture}% है। जलभराव रोकने हेतु जल निकासी जांचें।`
          : `Soil saturated at ${moisture}%. Inspect field drainage channels.`,
        detail: language === 'hi'
          ? `अत्यधिक नमी से जड़ों में ऑक्सीजन की कमी हो सकती है। मेड़ों से अतिरिक्त पानी निकालने की व्यवस्था रखें और यूरिया न डालें।`
          : `Saturated moisture risks root hypoxia and fungal damping-off. Clear field ditches and withhold nitrogen application until drainage.`,
        bgClass: 'bg-blue-50 border-blue-400/80',
        titleColor: 'text-blue-950',
        textColor: 'text-blue-900/90',
        buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        buttonText: language === 'hi' ? 'जल निकासी निरीक्षण दर्ज करें' : 'Record Drainage Inspected',
        waterSaved: 2100,
        moneySaved: 480,
        ecoScore: '+5 Eco Score',
      };
    } else {
      return {
        type: 'MAINTAIN_SCHEDULE',
        icon: '🌱',
        badge: language === 'hi' ? 'इष्टतम स्थिति (संतुलित नमी)' : 'Optimal Status (Balanced Moisture)',
        badgeColor: 'bg-emerald-200 text-emerald-900 border-emerald-300',
        headline: language === 'hi'
          ? `नमी ${moisture}% पर संतुलित है। नियमित निगरानी जारी रखें।`
          : `Soil moisture is optimal at ${moisture}%. No pumping needed today.`,
        detail: language === 'hi'
          ? `मिट्टी की केशिका नमी आदर्श 45-70% दायरे में है। आज कोई ट्यूबवेल चलाने की आवश्यकता नहीं है, नियमित फसल निगरानी रखें।`
          : `Capillary moisture is within the ideal 45-70% zone for healthy root turgor. No tubewell pumping is required today.`,
        bgClass: 'bg-emerald-50 border-emerald-400/80',
        titleColor: 'text-emerald-950',
        textColor: 'text-emerald-900/90',
        buttonClass: 'bg-emerald-700 hover:bg-emerald-800 text-white',
        buttonText: language === 'hi' ? 'निरीक्षण लॉग सहेजें' : 'Save Health Inspection Log',
        waterSaved: 800,
        moneySaved: 210,
        ecoScore: '+4 Eco Score',
      };
    }
  };

  const decision = getDecision();

  const handleConfirmAction = async () => {
    if (isDelayedConfirmed) return;
    setSavingState(true);

    try {
      await fetch('/api/records/confirm-delay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer: currentFarmer.name,
          liters: decision.waterSaved,
          savings: decision.moneySaved,
          action: decision.headline,
        }),
      });
    } catch (e) {
      // Continue locally
    }

    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.65 },
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
              {language === 'hi' ? 'निर्णय आसूचना' : 'Decision Intelligence Engine'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2e1b] tracking-tight">
              {language === 'hi' ? '“आज मुझे क्या करना चाहिए?”' : '"What Should I Do Today?"'}
            </h2>
          </div>
          <span className="text-[11px] font-mono font-bold text-[#143d22]/70 bg-[#f5f2e9] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs border border-[#0f2e1b]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Telemetry Response</span>
          </span>
        </div>

        {/* Dynamic Priority Action Card */}
        <div className={`${decision.bgClass} border-2 rounded-3xl p-5 sm:p-6 shadow-sm transition-all duration-300`}>
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/80 border border-black/10 flex items-center justify-center text-2xl shrink-0 shadow-xs">
              {decision.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${decision.badgeColor}`}>
                  {decision.badge}
                </span>
                <span className="text-[11px] font-mono font-bold text-gray-700">
                  Moisture: {moisture}% · Rain: {rain}%
                </span>
              </div>
              <h3 className={`text-base sm:text-lg font-extrabold ${decision.titleColor} leading-snug`}>
                {decision.headline}
              </h3>
              <p className={`text-xs sm:text-sm ${decision.textColor} mt-1.5 leading-relaxed`}>
                {decision.detail}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3.5 border-t border-black/10 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleConfirmAction}
              disabled={savingState}
              className={`flex-1 py-3 px-4 font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                isDelayedConfirmed
                  ? 'bg-emerald-600 text-white'
                  : decision.buttonClass
              }`}
            >
              {isDelayedConfirmed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>{language === 'hi' ? `पुष्टि सहेज ली गई (${decision.ecoScore})` : `Confirmed & Logged (${decision.ecoScore})`}</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>{decision.buttonText}</span>
                </>
              )}
            </button>

            <button
              onClick={() => onAskAI(
                language === 'hi'
                  ? `मेरे खेत की नमी ${moisture}% है और बारिश की संभावना ${rain}% है। मुझे क्या करना चाहिए?`
                  : `My field soil moisture is ${moisture}% and rain chance is ${rain}%. What is your agronomy advice?`
              )}
              className="py-3 px-4 bg-white/90 hover:bg-white text-[#0f2e1b] font-bold text-xs sm:text-sm rounded-xl border border-black/15 shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span>🤖</span>
              <span>{language === 'hi' ? 'कृषि मित्र से पूछें' : 'Consult AI Agronomist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <a
          href="#crop-doctor"
          className="p-3.5 bg-white rounded-2xl border border-[#0f2e1b]/10 shadow-xs flex items-center justify-between hover:border-[#2d6a4f]/40 hover:bg-[#faf8f2] transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🍂</span>
            <div>
              <p className="text-xs font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'पत्ती रोग व कॉन्फिडेंस लैब' : 'Leaf Disease & Confidence Lab'}
              </p>
              <p className="text-[11px] text-[#143d22]/70">
                {language === 'hi' ? 'तस्वीर से रोग की जांच करें' : 'Evaluate plant leaf photo'}
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#2d6a4f] group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="p-3.5 bg-white rounded-2xl border border-[#0f2e1b]/10 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚖️</span>
            <div>
              <p className="text-xs font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'नाइट्रोजन-फास्फोरस-पोटाश' : 'Soil Nutrient Balance'}
              </p>
              <p className="text-[11px] text-[#143d22]/70">
                {language === 'hi' ? 'एनपीके स्तर: इष्टतम दायरा' : 'NPK Level: Optimal range'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-[#d8f3dc] text-[#1b4332] px-2 py-0.5 rounded-full">
            Optimal
          </span>
        </div>
      </div>
    </section>
  );
};
