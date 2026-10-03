import React, { useState } from 'react';
import { Language } from '../types';
import { ShieldAlert, Droplet, Sprout, CloudRain, Award, FileCheck2, X, AlertTriangle, ArrowRight } from 'lucide-react';

interface IntelligentEcosystemProps {
  language: Language;
  onOpenCropDoctor: () => void;
  onOpenWeather: () => void;
  onOpenSoil: () => void;
  onOpenSustainability: () => void;
  onOpenCertificate: () => void;
}

export const IntelligentEcosystem: React.FC<IntelligentEcosystemProps> = ({
  language,
  onOpenCropDoctor,
  onOpenWeather,
  onOpenSoil,
  onOpenSustainability,
  onOpenCertificate,
}) => {
  const [showAgriSafeModal, setShowAgriSafeModal] = useState(false);

  return (
    <section className="space-y-5 py-4" id="features">
      <div>
        <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
          {language === 'hi' ? 'बुद्धिमान पारिस्थितिकी तंत्र' : 'Intelligent Ecosystem'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2e1b] tracking-tight">
          {language === 'hi' ? 'आधुनिक किसान की हर ज़रूरत' : 'Everything A Modern Farmer Needs'}
        </h2>
        <p className="text-xs sm:text-sm text-[#143d22]/80 max-w-2xl mt-1">
          {language === 'hi'
            ? 'स्वस्थ मिट्टी, उच्च पैदावार और टिकाऊ मुनाफे के लिए मिलकर काम करने वाले 6 स्मार्ट मॉड्यूल।'
            : '6 smart modules working together for healthy soil, higher yield, and sustainable profit.'}
        </p>
      </div>

      {/* 6 Interactive Cards in 3-Column Responsive Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Card 1: AI Crop Doctor */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-[#2d6a4f]/30 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#d8f3dc] text-[#2d6a4f] flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              🌿
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'एआई फसल डॉक्टर' : 'AI Crop Doctor'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'मोबाइल कैमरे के माध्यम से जैविक और रासायनिक उपचार उपायों के साथ त्वरित कीट व रोग पहचान।'
                : 'Instant pest and blight detection via mobile camera with organic & chemical treatment remedies.'}
            </p>
          </div>
          <button
            onClick={onOpenCropDoctor}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'फसल डॉक्टर खोलें' : 'Explore Crop Doctor'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>

        {/* Card 2: Smart Farming */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-amber-400/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              🌦️
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'स्मार्ट खेती और मौसम' : 'Smart Farming & Weather'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'दैनिक कार्यों को अनुकूलित करने के लिए पौधे की वृद्धि चरण के साथ स्थानीय वर्षा और आर्द्रता रडार।'
                : 'Localized rainfall and humidity radar synced with plant growth stage to optimize daily field tasks.'}
            </p>
          </div>
          <button
            onClick={onOpenWeather}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'स्मार्ट मौसम देखें' : 'View Smart Farming'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>

        {/* Card 3: Soil Health */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-[#8c5332]/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#f5ebe0] text-[#8c5332] flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              🪨
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'मृदा स्वास्थ्य व नमी' : 'Soil Health & Moisture'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'वास्तविक समय में N-P-K पोषक तत्व ट्रैकिंग, जैविक कार्बन संकेतक और कैलिब्रेटेड नमी स्तर।'
                : 'Real-time N-P-K nutrient tracking, organic carbon indicators, and calibrated moisture gauges.'}
            </p>
          </div>
          <button
            onClick={onOpenSoil}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'मृदा स्वास्थ्य जांचें' : 'Check Soil Health'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>

        {/* Card 4: AgriSafe Chemical Guard */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-red-400/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              🛡️
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'एग्रीसेफ केमिकल गार्ड' : 'AgriSafe Chemical Guard'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'रासायनिक सुरक्षा पत्रक, पीपीई किट सिफारिशें, छिड़काव अंतराल और आपातकालीन प्राथमिक चिकित्सा सलाह।'
                : 'Chemical hazard safety sheets, PPE recommendations, pre-harvest spray intervals, and emergency antidote advice.'}
            </p>
          </div>
          <button
            onClick={() => setShowAgriSafeModal(true)}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'सुरक्षा हब खोलें' : 'Explore Safety Hub'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>

        {/* Card 5: Sustainability Index */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-emerald-400/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              ♻️
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'स्थिरता स्कोर (78 / 100)' : 'Sustainability Score (78 / 100)'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'जल संरक्षण, जैविक खाद के उपयोग और कीटनाशक अपवाह में कमी को संख्यात्मक रूप से मापें।'
                : 'Quantify water conservation, organic fertilizer adoption, and lower pesticide runoff.'}
            </p>
          </div>
          <button
            onClick={onOpenSustainability}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'स्थिरता स्कोर देखें' : 'View Sustainability'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>

        {/* Card 6: Digital Farming Record */}
        <article className="bg-white p-5 rounded-3xl border border-[#0f2e1b]/10 shadow-xs hover:shadow-lg hover:border-sky-400/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center text-2xl mb-3 shadow-2xs group-hover:scale-105 transition-transform">
              📜
            </div>
            <h3 className="font-extrabold text-[#0f2e1b] text-base">
              {language === 'hi' ? 'डिजिटल कृषि रिकॉर्ड' : 'Digital Farming Record'}
            </h3>
            <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1.5 leading-relaxed">
              {language === 'hi'
                ? 'बैंक ऋण, सरकारी सब्सिडी और प्रीमियम खरीदारों के लिए क्रिप्टोग्राफिक हैश के साथ सत्यापन योग्य रिकॉर्ड।'
                : 'Verifiable audit record with cryptographic hash for bank crop loans, subsidies, and organic buyers.'}
            </p>
          </div>
          <button
            onClick={onOpenCertificate}
            className="mt-4 pt-3 border-t border-[#0f2e1b]/5 flex items-center justify-between text-xs font-bold text-[#2d6a4f] group-hover:text-[#0f2e1b] cursor-pointer"
          >
            <span>{language === 'hi' ? 'पासपोर्ट प्रमाणपत्र देखें' : 'View Verified Passport'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </article>
      </div>

      {/* AgriSafe Chemical Guard Detail Modal */}
      {showAgriSafeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
              <div className="flex items-center gap-2.5">
                <span className="p-2.5 bg-red-100 text-red-700 rounded-xl text-xl">🛡️</span>
                <div>
                  <h3 className="font-extrabold text-[#0f2e1b] text-base">
                    {language === 'hi' ? 'एग्रीसेफ केमिकल सुरक्षा हब' : 'AgriSafe Chemical Safety Hub'}
                  </h3>
                  <p className="text-xs text-[#143d22]/70">
                    {language === 'hi' ? 'केंद्रीय कीटनाशक बोर्ड (CIBRC) मानक' : 'Central Insecticides Board Safety Guide'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAgriSafeModal(false)}
                className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 pt-3 text-xs sm:text-sm">
              {/* Toxicity Triangle Bands */}
              <div>
                <h4 className="font-bold text-[#0f2e1b] mb-2">
                  {language === 'hi' ? 'भारतीय कीटनाशक विषाक्तता रंग कोड:' : 'Indian Toxicity Color Code Triangles:'}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-2xl border border-red-300 bg-red-50 text-red-900">
                    <span className="font-black block text-sm">🔴 Red (लाल)</span>
                    <p className="text-[11px] mt-1 font-medium">Extremely Toxic (अत्यधिक विषैला). Full PPE mandatory.</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-amber-300 bg-amber-50 text-amber-900">
                    <span className="font-black block text-sm">🟡 Yellow (पीला)</span>
                    <p className="text-[11px] mt-1 font-medium">Highly Toxic (अति विषैला). 14-day pre-harvest wait.</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-blue-300 bg-blue-50 text-blue-900">
                    <span className="font-black block text-sm">🔵 Blue (नीला)</span>
                    <p className="text-[11px] mt-1 font-medium">Moderately Toxic (मध्यम विषैला). E.g. Mancozeb.</p>
                  </div>
                  <div className="p-3 rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-900">
                    <span className="font-black block text-sm">🟢 Green (हरा)</span>
                    <p className="text-[11px] mt-1 font-medium">Slightly Toxic (कम विषैला). E.g. Bio-pesticides &amp; Neem.</p>
                  </div>
                </div>
              </div>

              {/* Farmer Safety Checklist */}
              <div className="bg-[#faf8f2] p-4 rounded-2xl border border-[#0f2e1b]/10 space-y-2">
                <span className="font-bold text-[#0f2e1b] block text-xs uppercase tracking-wide">
                  {language === 'hi' ? 'किसान सुरक्षा 5-सूत्रीय नियम:' : 'Farmer PPE 5-Point Safety Rules:'}
                </span>
                <p className="text-[#143d22]/85">1. कभी भी हवा की विपरीत दिशा में छिड़काव न करें।</p>
                <p className="text-[#143d22]/85">2. दवा मिलाते समय लकड़ी की डंडी का प्रयोग करें, नंगे हाथ न डालें।</p>
                <p className="text-[#143d22]/85">3. चेहरे पर मास्क और आंखों पर सुरक्षा चश्मा अनिवार्य रूप से पहनें।</p>
                <p className="text-[#143d22]/85">4. छिड़काव के बाद हाथ-मुंह साबुन से अच्छी तरह धोएं।</p>
                <p className="text-[#143d22]/85">5. खाली डिब्बों को नष्ट करके जमीन में सुरक्षित रूप से दबाएं।</p>
              </div>

              {/* Emergency Hotline */}
              <div className="p-3.5 rounded-2xl bg-amber-100/70 border border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">Kisan Call Centre (24x7 Toll-Free)</span>
                  <span className="font-black text-amber-950 text-base">📞 1800-180-1551</span>
                </div>
                <span className="text-xs bg-amber-200 px-2.5 py-1 rounded-md text-amber-900 font-bold">Govt of India</span>
              </div>
            </div>

            <button
              onClick={() => setShowAgriSafeModal(false)}
              className="w-full mt-4 py-3 bg-[#143d22] text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer hover:bg-[#0f2e1b]"
            >
              {language === 'hi' ? 'समझ गया (बंद करें)' : 'Understood, Close Safety Hub'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
