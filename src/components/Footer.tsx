import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenCropDoctor: () => void;
  onOpenWeather: () => void;
  onOpenSoil: () => void;
  onOpenCertificate: () => void;
  onOpenJudgesGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenCropDoctor,
  onOpenWeather,
  onOpenSoil,
  onOpenCertificate,
  onOpenJudgesGuide,
}) => {
  return (
    <footer className="border-t border-[#0f2e1b]/10 bg-[#f5f2e9]/80 pt-12 pb-16 text-[#0f2e1b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-2xl bg-[#143d22] text-[#74c69d] flex items-center justify-center text-xl shadow-xs">
                🌱
              </span>
              <div>
                <span className="text-lg font-black tracking-tight text-[#0f2e1b] block leading-tight">
                  AgriGuardian
                </span>
                <span className="text-xs font-semibold text-[#2d6a4f]">
                  {language === 'hi' ? 'स्मार्ट, सुरक्षित और टिकाऊ कृषि साथी' : 'Smart, Safe & Sustainable Farming Companion'}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#143d22]/80 leading-relaxed max-w-sm">
              Empowering Indian farmers with cutting-edge multimodal AI vision for instant crop disease detection, localized precipitation radar to save groundwater, and verifiable tamper-proof sustainable farming passports.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#2d6a4f]">
              <span>🇮🇳 Built for Indian Agriculture</span>
              <span>·</span>
              <span>ICAR &amp; KVK Grounded</span>
            </div>
          </div>

          {/* Column 2: Core Tools */}
          <div>
            <h4 className="font-extrabold text-[#0f2e1b] text-sm mb-3">Core Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#143d22]/80">
              <li>
                <button onClick={onOpenCropDoctor} className="hover:text-[#2d6a4f] text-left cursor-pointer">
                  AI Crop Doctor (Multimodal)
                </button>
              </li>
              <li>
                <button onClick={onOpenWeather} className="hover:text-[#2d6a4f] text-left cursor-pointer">
                  Irrigation Advisor &amp; Radar
                </button>
              </li>
              <li>
                <button onClick={onOpenSoil} className="hover:text-[#2d6a4f] text-left cursor-pointer">
                  Soil Health &amp; N-P-K Gauges
                </button>
              </li>
              <li>
                <button onClick={onOpenCertificate} className="hover:text-[#2d6a4f] text-left cursor-pointer">
                  Verifiable Farming Passport
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Safety & Governance */}
          <div>
            <h4 className="font-extrabold text-[#0f2e1b] text-sm mb-3">Languages &amp; Safety</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#143d22]/80">
              <li>
                <span className="hover:text-[#2d6a4f] cursor-default">हिन्दी सहायता (Hindi Support)</span>
              </li>
              <li>
                <span className="hover:text-[#2d6a4f] cursor-default">English Language Inclusivity</span>
              </li>
              <li>
                <span className="hover:text-[#2d6a4f] cursor-default">CIBRC Chemical Hazard Bands</span>
              </li>
              <li>
                <span className="hover:text-[#2d6a4f] cursor-default">Kisan Call Centre 1800-180-1551</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hackathon Judges */}
          <div>
            <h4 className="font-extrabold text-[#0f2e1b] text-sm mb-3">Hackathon Portal</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#143d22]/80">
              <li>
                <button
                  onClick={onOpenJudgesGuide}
                  className="font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>🏆</span>
                  <span>Judges Walkthrough</span>
                </button>
              </li>
              <li>
                <span className="text-xs text-[#143d22]/70 block mt-1">Google Gemini 3.8 Multimodal</span>
              </li>
              <li>
                <span className="text-xs text-[#143d22]/70">Express &amp; React 19 Full-Stack</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#0f2e1b]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#143d22]/60">
          <p>© 2026 AgriGuardian AI Pvt. Ltd. Made with ❤️ for Indian Farmers 🇮🇳</p>
          <div className="flex gap-4 text-xs font-medium">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:underline">Contact Agronomist</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
