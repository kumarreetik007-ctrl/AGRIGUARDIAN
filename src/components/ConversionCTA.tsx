import React from 'react';
import { Language } from '../types';

interface ConversionCTAProps {
  language: Language;
  onOpenCropDoctor: () => void;
  onOpenAssistant: () => void;
}

export const ConversionCTA: React.FC<ConversionCTAProps> = ({
  language,
  onOpenCropDoctor,
  onOpenAssistant,
}) => {
  return (
    <section className="bg-gradient-to-b from-[#143d22] to-[#0f2e1b] text-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden my-4" id="start-free">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#52b788]/20 text-[#95d5b2] text-xs font-bold border border-[#74c69d]/30">
          🌾 {language === 'hi' ? 'शून्य अतिरिक्त हार्डवेयर आवश्यक' : 'Zero Additional Hardware Required'}
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {language === 'hi' ? 'क्या आप अपने खेत को स्मार्ट बनाने के लिए तैयार हैं?' : 'Ready To Make Your Farm Smarter?'}
        </h2>
        <p className="text-xs sm:text-base text-[#faf8f2]/80 leading-relaxed max-w-xl mx-auto">
          {language === 'hi'
            ? 'हजारों प्रगतिशील किसानों के साथ जुड़ें जो पानी का सदुपयोग कर रहे हैं, कीटों को रोक रहे हैं और पैदावार बढ़ा रहे हैं।'
            : 'Join thousands of progressive farmers optimizing water, preventing pest outbreaks, and boosting harvest profits.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={onOpenCropDoctor}
            className="w-full sm:w-auto py-3.5 px-8 bg-[#52b788] hover:bg-[#40916c] active:scale-[0.98] text-[#081a0f] font-black rounded-2xl text-sm sm:text-base transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🌱</span>
            <span>{language === 'hi' ? 'आज ही मुफ्त शुरुआत करें' : 'Get Started Free Today'}</span>
          </button>
          <button
            onClick={onOpenAssistant}
            className="w-full sm:w-auto py-3.5 px-8 bg-transparent border border-white/20 active:bg-white/10 text-white font-semibold rounded-2xl text-sm transition-colors cursor-pointer hover:bg-white/10"
          >
            {language === 'hi' ? 'इंटरैक्टिव डेमो देखें' : 'Explore Interactive Demo'}
          </button>
        </div>
        <p className="text-[11px] text-[#faf8f2]/60 pt-2">
          {language === 'hi'
            ? 'कोई क्रेडिट कार्ड या महंगे सेंसर की आवश्यकता नहीं · किसी भी स्मार्टफोन या कंप्यूटर पर काम करता है'
            : 'No credit card or paid sensor required · Works seamlessly on any smartphone or browser'}
        </p>
      </div>
    </section>
  );
};
