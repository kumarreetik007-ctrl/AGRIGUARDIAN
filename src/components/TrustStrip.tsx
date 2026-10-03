import React from 'react';
import { Language } from '../types';

interface TrustStripProps {
  language: Language;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ language }) => {
  const items = [
    { icon: '🌱', en: 'Simple to Use', hi: 'उपयोग में सरल' },
    { icon: '💧', en: 'Resource Saving', hi: 'संसाधन बचत' },
    { icon: '🤖', en: 'AI Assisted', hi: 'एआई सहायता' },
    { icon: '🛡️', en: 'Safety First', hi: 'सुरक्षा सर्वोपरि' },
    { icon: '🌐', en: 'Hindi + English', hi: 'हिंदी + अंग्रेजी' },
    { icon: '📊', en: 'Real-Time Data', hi: 'लाइव टेलीमेट्री' },
  ];

  return (
    <section className="py-2">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#0f2e1b]/10 shadow-xs text-xs sm:text-sm font-bold text-[#0f2e1b] hover:bg-[#faf8f2] hover:border-[#2d6a4f]/30 transition-all cursor-default"
          >
            <span>{item.icon}</span>
            <span>{language === 'hi' ? item.hi : item.en}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
