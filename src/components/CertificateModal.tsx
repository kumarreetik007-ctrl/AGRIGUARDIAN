import React from 'react';
import { Language, FarmerProfile } from '../types';
import { X, Printer, ShieldCheck, Download, Award, CheckCircle } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  farmer: FarmerProfile;
  sustainabilityScore: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  language,
  farmer,
  sustainabilityScore,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border-4 border-[#2d6a4f]/20 max-h-[95vh] overflow-y-auto">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#0f2e1b]/10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <span className="font-extrabold text-[#0f2e1b] text-sm">
              {language === 'hi' ? 'सत्यापित डिजिटल पासपोर्ट' : 'Verifiable Farming Passport'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-1 px-3 bg-[#f5f2e9] hover:bg-[#ede8dc] text-[#0f2e1b] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable High-Resolution Certificate Document */}
        <div className="bg-[#fcfbf8] border-2 border-[#2d6a4f] rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-inner text-center">
          {/* Security Guilloche Watermark Pattern Simulation */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#2d6a4f_1px,transparent_1px)] [background-size:12px_12px]" />
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#52b788]/20 rounded-full blur-2xl" />

          {/* Certificate Header */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#143d22] text-[#74c69d] flex items-center justify-center text-2xl mb-2 shadow-sm">
              🌱
            </div>
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#2d6a4f]">
              AGRIGUARDIAN ECO-CERTIFICATION AUTHORITY
            </span>
            <h1 className="text-lg sm:text-xl font-black text-[#0f2e1b] tracking-tight mt-0.5">
              Sustainable Farming Passport
            </h1>
            <p className="text-[11px] text-[#143d22]/70 font-serif italic mt-0.5">
              Verified Compliance with National Water &amp; Low-Pesticide Residue Guidelines
            </p>
          </div>

          {/* Verified Badge Ribbon */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-black mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Cryptographically Verified · Level 2 Certified</span>
          </div>

          {/* Main Credentials Table */}
          <div className="bg-white/90 border border-[#0f2e1b]/10 rounded-xl p-3.5 text-left text-xs mb-4 space-y-2">
            <div className="flex justify-between border-b border-[#0f2e1b]/5 pb-1.5">
              <span className="text-[#143d22]/60 font-medium">Farmer Identity:</span>
              <span className="font-extrabold text-[#0f2e1b]">{farmer.name} ({farmer.nameHindi})</span>
            </div>
            <div className="flex justify-between border-b border-[#0f2e1b]/5 pb-1.5">
              <span className="text-[#143d22]/60 font-medium">Registered Land Parcel:</span>
              <span className="font-bold text-[#0f2e1b]">{farmer.acreage} Acres · {farmer.district}, {farmer.state}</span>
            </div>
            <div className="flex justify-between border-b border-[#0f2e1b]/5 pb-1.5">
              <span className="text-[#143d22]/60 font-medium">Primary Crop Cultivar:</span>
              <span className="font-bold text-[#0f2e1b]">{farmer.crop}</span>
            </div>
            <div className="flex justify-between border-b border-[#0f2e1b]/5 pb-1.5">
              <span className="text-[#143d22]/60 font-medium">Sustainability Index:</span>
              <span className="font-black text-[#2d6a4f]">{sustainabilityScore} / 100 (Eco-Pioneer Grade)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#143d22]/60 font-medium">Water Conservation Audited:</span>
              <span className="font-bold text-emerald-700">14,200 Liters Conserved (Season 2026)</span>
            </div>
          </div>

          {/* Cryptographic Footprint & QR Simulator */}
          <div className="flex items-center justify-between text-left border-t border-dashed border-[#0f2e1b]/20 pt-3 text-[10px]">
            <div>
              <p className="font-mono text-[#143d22]/70 font-semibold">Record ID: AG-2026-9482</p>
              <p className="font-mono text-[#143d22]/70">SHA-256: 8f9a4b2e...3c12d8</p>
              <p className="text-[9px] text-[#143d22]/50 mt-0.5">Valid for Agri-Loans &amp; KVK Mandi Premiums</p>
            </div>

            {/* QR Mock */}
            <div className="w-14 h-14 bg-white border border-[#0f2e1b]/20 rounded-lg p-1 flex flex-col items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#0f2e1b] rounded-xs flex items-center justify-center text-white text-[8px] font-mono">
                QR VERIFIED
              </div>
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="mt-4 flex gap-2 print:hidden">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#143d22] text-white font-bold rounded-xl text-xs hover:bg-[#0f2e1b] transition-colors"
          >
            {language === 'hi' ? 'बंद करें' : 'Close Preview'}
          </button>
        </div>
      </div>
    </div>
  );
};
