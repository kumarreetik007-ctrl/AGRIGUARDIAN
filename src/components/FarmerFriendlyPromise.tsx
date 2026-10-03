import React from 'react';
import { Language } from '../types';

interface FarmerFriendlyPromiseProps {
  language: Language;
}

export const FarmerFriendlyPromise: React.FC<FarmerFriendlyPromiseProps> = ({ language }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0f2e1b]/10 shadow-xs">
      <h2 className="text-center text-xl sm:text-2xl font-extrabold text-[#0f2e1b] mb-6">
        {language === 'hi' ? 'हमारा किसान-हितैषी संकल्प' : 'Our Farmer-Friendly Promise'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {/* Value 1 */}
        <div className="p-5 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 hover:border-[#2d6a4f]/20 transition-colors">
          <span className="text-3xl block mb-2">🎯</span>
          <h3 className="text-sm sm:text-base font-black text-[#0f2e1b]">
            {language === 'hi' ? 'सटीक निर्णय' : 'Less Guessing'}
          </h3>
          <p className="text-xs sm:text-sm text-[#143d22]/70 mt-1.5 leading-relaxed">
            {language === 'hi' ? 'अटकलों के बजाय स्पष्ट वास्तविक डेटा' : 'Clear data instead of guesswork'}
          </p>
        </div>

        {/* Value 2 */}
        <div className="p-5 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 hover:border-[#2d6a4f]/20 transition-colors">
          <span className="text-3xl block mb-2">💰</span>
          <h3 className="text-sm sm:text-base font-black text-[#0f2e1b]">
            {language === 'hi' ? 'कम बर्बादी' : 'Less Waste'}
          </h3>
          <p className="text-xs sm:text-sm text-[#143d22]/70 mt-1.5 leading-relaxed">
            {language === 'hi' ? 'पानी, बिजली और महंगी दवाओं की बचत' : 'Save water & chemical expenses'}
          </p>
        </div>

        {/* Value 3 */}
        <div className="p-5 rounded-2xl bg-[#faf8f2] border border-[#0f2e1b]/5 hover:border-[#2d6a4f]/20 transition-colors">
          <span className="text-3xl block mb-2">🤝</span>
          <h3 className="text-sm sm:text-base font-black text-[#0f2e1b]">
            {language === 'hi' ? 'पूर्ण विश्वास' : 'More Confidence'}
          </h3>
          <p className="text-xs sm:text-sm text-[#143d22]/70 mt-1.5 leading-relaxed">
            {language === 'hi' ? 'आपके फोन पर द्विभाषी एआई साथी' : 'Bilingual AI on your smartphone'}
          </p>
        </div>
      </div>
    </section>
  );
};
