import React, { useState } from 'react';
import { Language, FarmerProfile } from '../types';
import { ShieldCheck, Download, Award, FileText } from 'lucide-react';
import { CertificateModal } from './CertificateModal';

interface DigitalRecordPassportProps {
  language: Language;
  currentFarmer: FarmerProfile;
  sustainabilityScore: number;
}

export const DigitalRecordPassport: React.FC<DigitalRecordPassportProps> = ({
  language,
  currentFarmer,
  sustainabilityScore,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <section className="space-y-4 h-full flex flex-col justify-between" id="certificate-section">
      <div>
        <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
          {language === 'hi' ? 'आधिकारिक साख प्रमाण' : 'Official Credential'}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2e1b] tracking-tight">
          {language === 'hi' ? 'डिजिटल कृषि रिकॉर्ड' : 'Digital Farming Record'}
        </h2>
        <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1">
          {language === 'hi'
            ? 'कम बैंक ब्याज दर और प्रीमियम फसल मंडी मूल्य प्राप्त करने हेतु छेड़छाड़-मुक्त सत्यापित पासपोर्ट।'
            : 'Tamper-proof verifiable badge to unlock lower bank interest and premium crop market prices.'}
        </p>
      </div>

      {/* Certificate Card */}
      <div className="relative bg-gradient-to-b from-[#fcfbf8] to-white rounded-3xl p-6 sm:p-7 border-2 border-[#52b788]/30 shadow-lg overflow-hidden flex-1 flex flex-col justify-between">
        {/* Security Watermark Pattern Hint */}
        <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between pb-3.5 border-b border-[#0f2e1b]/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <div>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-[#2d6a4f]">
                  {language === 'hi' ? 'सत्यापित एग्रीगार्डियन रिकॉर्ड' : 'Certified AgriGuardian Record'}
                </p>
                <h3 className="text-base sm:text-lg font-black text-[#0f2e1b]">
                  {language === 'hi' ? 'सस्टेनेबल फार्मिंग पासपोर्ट' : 'Sustainable Farming Passport'}
                </h3>
              </div>
            </div>
            <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'सत्यापित' : 'Verified'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4 text-xs sm:text-sm">
            <div className="p-3 bg-[#faf8f2] rounded-2xl border border-[#0f2e1b]/5">
              <span className="text-[11px] text-[#143d22]/60 block font-medium">
                {language === 'hi' ? 'किसान का नाम' : 'Farmer Name'}
              </span>
              <span className="font-extrabold text-[#0f2e1b] text-sm sm:text-base block mt-0.5">
                {language === 'hi' ? currentFarmer.nameHindi : currentFarmer.name}
              </span>
            </div>

            <div className="p-3 bg-[#faf8f2] rounded-2xl border border-[#0f2e1b]/5">
              <span className="text-[11px] text-[#143d22]/60 block font-medium">
                {language === 'hi' ? 'मुख्य फसल' : 'Primary Crop'}
              </span>
              <span className="font-extrabold text-[#0f2e1b] text-sm sm:text-base block mt-0.5">
                {language === 'hi' ? currentFarmer.cropHindi : currentFarmer.crop}
              </span>
            </div>

            <div className="p-3 bg-[#faf8f2] rounded-2xl border border-[#0f2e1b]/5">
              <span className="text-[11px] text-[#143d22]/60 block font-medium">
                {language === 'hi' ? 'पंजीकृत रकबा' : 'Registered Acreage'}
              </span>
              <span className="font-extrabold text-[#0f2e1b] text-sm sm:text-base block mt-0.5">
                {currentFarmer.acreage} {language === 'hi' ? 'एकड़' : 'Acres'}
              </span>
            </div>

            <div className="p-3 bg-[#faf8f2] rounded-2xl border border-[#0f2e1b]/5">
              <span className="text-[11px] text-[#143d22]/60 block font-medium">
                {language === 'hi' ? 'स्थिरता सूचकांक' : 'Sustainability Index'}
              </span>
              <span className="font-black text-[#2d6a4f] text-sm sm:text-base block mt-0.5">
                {sustainabilityScore} / 100 (Level 2)
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-dashed border-[#0f2e1b]/15 flex items-center justify-between text-xs">
            <div>
              <span className="text-[#143d22]/60 block font-mono text-[11px]">Record ID: AG-2026-9482</span>
              <span className="text-[#143d22]/60 font-mono text-[11px]">Hash: 8f9a...3c12 (Verified)</span>
            </div>
            <span className="text-[#0f2e1b] font-extrabold bg-[#f5f2e9] px-3 py-1 rounded-xl text-xs">
              Valid 2026 Season
            </span>
          </div>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="w-full mt-6 py-3.5 bg-[#143d22] hover:bg-[#0f2e1b] active:scale-[0.98] text-[#faf8f2] font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
        >
          <span>📥</span>
          <span>
            {language === 'hi'
              ? 'सत्यापित प्रमाणपत्र देखें व प्रिंट करें (PDF)'
              : 'Download Verified Certificate (PDF)'}
          </span>
        </button>
      </div>

      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        language={language}
        farmer={currentFarmer}
        sustainabilityScore={sustainabilityScore}
      />
    </section>
  );
};
