import React from 'react';
import { Language } from '../types';

interface HowItWorksProps {
  language: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const steps = [
    {
      num: '01',
      titleEn: 'Tell Us About Your Farm',
      titleHi: 'अपने खेत के बारे में बताएं',
      descEn: 'Select crop (Wheat, Mustard, Cotton, Rice), location district, and acre size.',
      descHi: 'फसल (गेहूं, सरसों, कपास, धान), जिला और एकड़ क्षेत्रफल चुनें।',
    },
    {
      num: '02',
      titleEn: 'Check Your Farm',
      titleHi: 'खेत की स्थिति की जांच करें',
      descEn: 'Take a leaf photo, or let automated sensors pull satellite weather and soil moisture.',
      descHi: 'पत्ती का फोटो लें, या सैटेलाइट मौसम और मिट्टी की नमी का स्वचालित डेटा देखें।',
    },
    {
      num: '03',
      titleEn: 'Get AI Guidance',
      titleHi: 'एआई से सटीक मार्गदर्शन पाएं',
      descEn: 'Read recommendations in clear Hindi or English with exact milliliter dosage and timings.',
      descHi: 'सटीक मिलीलीटर खुराक और छिड़काव समय के साथ सरल हिंदी या अंग्रेजी में सलाह पढ़ें।',
    },
    {
      num: '04',
      titleEn: 'Take Action & Save Costs',
      titleHi: 'कदम उठाएं और लागत बचाएं',
      descEn: 'Prevent crop loss, avoid wasted pesticide, and track your sustainability score rise.',
      descHi: 'फसल नुकसान रोकें, बेकार कीटनाशक खर्च बचाएं और अपना सस्टेनेबिलिटी स्कोर बढ़ते देखें।',
      isLast: true,
    },
  ];

  return (
    <section className="space-y-4 py-4" data-purpose="how-it-works-steps">
      <div>
        <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
          {language === 'hi' ? 'सरल व पारदर्शी प्रक्रिया' : 'Simple 4-Step Process'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2e1b] tracking-tight">
          {language === 'hi' ? 'एग्रीगार्डियन कैसे काम करता है' : 'How AgriGuardian Works'}
        </h2>
        <p className="text-xs sm:text-sm text-[#143d22]/80 max-w-2xl mt-1">
          {language === 'hi'
            ? 'स्मार्टफोन फोटो से लेकर फसल कटाई तक 4 पारदर्शी चरणों में।'
            : 'From phone snapshot to harvest action in 4 transparent steps.'}
        </p>
      </div>

      {/* Core Banner: See Understand Decide Act */}
      <div className="bg-[#0f2e1b] text-[#95d5b2] py-3 px-6 rounded-3xl flex items-center justify-between text-xs sm:text-sm font-black tracking-wide border border-[#1b4332] shadow-sm">
        <span className="flex items-center gap-1.5"><span>👁️</span> {language === 'hi' ? 'देखें (See)' : 'See'}</span>
        <span className="text-[#52b788]/60">→</span>
        <span className="flex items-center gap-1.5"><span>🧠</span> {language === 'hi' ? 'समझें (Understand)' : 'Understand'}</span>
        <span className="text-[#52b788]/60">→</span>
        <span className="flex items-center gap-1.5"><span>⚖️</span> {language === 'hi' ? 'तय करें (Decide)' : 'Decide'}</span>
        <span className="text-[#52b788]/60">→</span>
        <span className="text-amber-400 font-extrabold flex items-center gap-1.5"><span>⚡</span> {language === 'hi' ? 'कार्रवाई (Act)' : 'Act'}</span>
      </div>

      {/* 4 Steps in Horizontal Grid on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#2d6a4f]/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-9 h-9 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 shadow-2xs ${
                    s.isLast ? 'bg-[#40916c] text-white' : 'bg-[#143d22] text-[#faf8f2]'
                  }`}
                >
                  {s.num}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#143d22]/50 tracking-wider">
                  Step {s.num}
                </span>
              </div>
              <h3 className="text-sm font-black text-[#0f2e1b] uppercase tracking-wide">
                {language === 'hi' ? s.titleHi : s.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
                {language === 'hi' ? s.descHi : s.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
