import React, { useState } from 'react';
import { Language } from '../types';
import { Sparkles, Check, CheckCircle2, ChevronRight, X, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SustainabilitySectionProps {
  language: Language;
}

export const SustainabilitySection: React.FC<SustainabilitySectionProps> = ({ language }) => {
  const [score, setScore] = useState(78);
  const [showImproveModal, setShowImproveModal] = useState(false);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const actionableTips = [
    {
      id: 'tip-1',
      titleEn: 'Switch from synthetic copper to Trichoderma bio-fungicide',
      titleHi: 'सिंथेटिक कॉपर के स्थान पर ट्राइकोडर्मा बायो-फंगीसाइड अपनाएं',
      points: 4,
      category: 'Chemical Safety',
    },
    {
      id: 'tip-2',
      titleEn: 'Apply paddy straw / dry biomass mulch around wheat rows',
      titleHi: 'गेहूं की कतारों के बीच पुआल या सूखी घास की पलवार (मल्चिंग) करें',
      points: 3,
      category: 'Soil Management',
    },
    {
      id: 'tip-3',
      titleEn: 'Schedule irrigation strictly based on weather radar delays',
      titleHi: 'मौसम पूर्वानुमान के अनुसार ही ट्यूबवेल चलाएं',
      points: 3,
      category: 'Water Efficiency',
    },
  ];

  const toggleAction = (id: string, points: number) => {
    const isNowChecked = !completedActions[id];
    setCompletedActions((prev) => ({ ...prev, [id]: isNowChecked }));
    setScore((prev) => prev + (isNowChecked ? points : -points));

    if (isNowChecked) {
      try {
        confetti({
          particleCount: 35,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#52b788', '#2d6a4f', '#74c69d'],
        });
      } catch {}
    }
  };

  const circumference = 440;
  const strokeOffset = circumference - (circumference * score) / 100;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-[#0f2e1b]/10 shadow-lg h-full flex flex-col justify-between" id="sustainability">
      <div>
        <div className="text-center mb-4">
          <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
            {language === 'hi' ? 'पर्यावरण-कृषि सूचकांक' : 'Eco-Farming Index'}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2e1b] tracking-tight">
            {language === 'hi' ? 'आपका फार्म सस्टेनेबिलिटी स्कोर' : 'Your Farm Sustainability Score'}
          </h2>
          <p className="text-xs sm:text-sm text-[#143d22]/70 mt-1 max-w-md mx-auto">
            {language === 'hi'
              ? 'पारिस्थितिक स्वास्थ्य, जल संरक्षण और मिट्टी की दीर्घकालिक उर्वरता का पैमाना।'
              : 'Measures ecological health, water conservation, and soil longevity.'}
          </p>
        </div>

        {/* Circular SVG Gauge */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-3">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="#f0ede4"
              strokeWidth="12"
            />
            {/* Animated Score Track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="#2d6a4f"
              strokeWidth="12"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeOffset,
                transition: 'stroke-dashoffset 1s ease-in-out',
              }}
            />
          </svg>

          {/* Center Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-black text-[#0f2e1b] tracking-tight transition-all">
              {score}
            </span>
            <span className="text-xs font-bold text-[#143d22]/60 uppercase mt-0.5">
              {language === 'hi' ? '100 में से' : 'Out of 100'}
            </span>
            <span className="mt-1.5 px-2.5 py-0.5 bg-[#d8f3dc] text-[#1b4332] text-[11px] font-black rounded-full">
              {score >= 80 ? (language === 'hi' ? 'उत्कृष्ट रेटिंग' : 'Excellent Rating') : (language === 'hi' ? 'अच्छी रेटिंग' : 'Good Rating')}
            </span>
          </div>
        </div>

        {/* Breakdown Metrics List */}
        <div className="space-y-2.5 mt-5">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span>💧</span>
              <span className="font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'जल दक्षता' : 'Water Efficiency'}
              </span>
            </div>
            <span className="text-emerald-700 font-extrabold">Good (82%)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span>🌱</span>
              <span className="font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'मृदा प्रबंधन' : 'Soil Management'}
              </span>
            </div>
            <span className="text-emerald-700 font-extrabold">Excellent (88%)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span>♻️</span>
              <span className="font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'संसाधन उपयोग' : 'Resource Usage'}
              </span>
            </div>
            <span className="text-emerald-700 font-extrabold">Good (76%)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <span>🧪</span>
              <span className="font-bold text-[#0f2e1b]">
                {language === 'hi' ? 'रासायनिक सुरक्षा' : 'Chemical Usage'}
              </span>
            </div>
            <span className="text-amber-700 font-extrabold">
              {completedActions['tip-1'] ? 'Improved (72%)' : 'Needs Improvement (65%)'}
            </span>
          </div>
        </div>
      </div>

      {/* Improve Score Button */}
      <button
        onClick={() => setShowImproveModal(true)}
        className="w-full mt-6 py-3.5 bg-[#2d6a4f] hover:bg-[#143d22] active:scale-[0.98] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        <span>🚀</span>
        <span>
          {language === 'hi'
            ? 'स्कोर सुधारें (सुरक्षित कृषि कार्य लागू करें)'
            : 'Improve My Score (Get Safe Tips)'}
        </span>
      </button>

      {/* Modal: Improve Score Actions Checklist */}
      {showImproveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-[#d8f3dc] text-[#2d6a4f] rounded-xl text-lg">🌱</span>
                <div>
                  <h3 className="font-extrabold text-[#0f2e1b] text-base">
                    {language === 'hi' ? 'सस्टेनेबिलिटी स्कोर बूस्टर' : 'Sustainability Score Booster'}
                  </h3>
                  <p className="text-[11px] text-[#143d22]/70">
                    {language === 'hi' ? 'अभ्यास पूरा करें और लाइव स्कोर बढ़ते देखें' : 'Complete farm tasks to boost your score live'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowImproveModal(false)}
                className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3">
              <div className="p-3.5 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/10 flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#0f2e1b]">Current Score:</span>
                <span className="text-2xl font-black text-[#2d6a4f]">{score} / 100</span>
              </div>

              <div className="space-y-2.5">
                {actionableTips.map((tip) => {
                  const isChecked = !!completedActions[tip.id];
                  return (
                    <div
                      key={tip.id}
                      onClick={() => toggleAction(tip.id, tip.points)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-white border-[#0f2e1b]/10 hover:bg-[#faf8f2]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded text-[#2d6a4f] focus:ring-[#52b788]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-[#2d6a4f]">
                            {tip.category}
                          </span>
                          <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            +{tip.points} Pts
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#0f2e1b] mt-1">
                          {language === 'hi' ? tip.titleHi : tip.titleEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowImproveModal(false)}
              className="w-full mt-2 py-3 bg-[#143d22] text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#0f2e1b]"
            >
              {language === 'hi' ? 'सहेजें और बंद करें' : 'Save & Update Score'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
