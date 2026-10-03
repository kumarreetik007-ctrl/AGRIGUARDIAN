import React, { useState } from 'react';
import { Language, FarmerProfile } from '../types';
import { DEMO_FARMERS } from '../data/mockData';
import { User, Phone, KeyRound, ShieldCheck, Check, LogOut, Sparkles, X, Edit3 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currentFarmer: FarmerProfile;
  onSelectFarmer: (farmer: FarmerProfile) => void;
  onUpdateFarmer: (updated: FarmerProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  currentFarmer,
  onSelectFarmer,
  onUpdateFarmer,
}) => {
  const [authMode, setAuthMode] = useState<'profile' | 'otp' | 'edit'>('profile');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Editable Profile fields
  const [editName, setEditName] = useState(currentFarmer.name);
  const [editDistrict, setEditDistrict] = useState(currentFarmer.district);
  const [editCrop, setEditCrop] = useState(currentFarmer.crop);
  const [editAcreage, setEditAcreage] = useState(currentFarmer.acreage);
  const [editSoil, setEditSoil] = useState(currentFarmer.soilType);

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (phoneNumber.length < 10) {
      setOtpError(language === 'hi' ? 'कृपया 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setOtpError('');
  };

  const handleVerifyOtp = () => {
    if (otpCode !== '8492' && otpCode.length !== 4) {
      setOtpError(language === 'hi' ? 'गलत ओटीपी। डेमो कोड 8492 डालें' : 'Invalid OTP. Enter demo code 8492');
      return;
    }

    const matched = DEMO_FARMERS.find((f) => f.phone.includes(phoneNumber.slice(-4))) || DEMO_FARMERS[0];
    onSelectFarmer(matched);
    setAuthMode('profile');
    setOtpSent(false);
    setOtpCode('');

    try {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#52b788', '#2d6a4f'],
      });
    } catch {}
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: FarmerProfile = {
      ...currentFarmer,
      name: editName,
      district: editDistrict,
      crop: editCrop,
      acreage: Number(editAcreage),
      soilType: editSoil,
    };
    onUpdateFarmer(updated);
    setAuthMode('profile');
    try {
      confetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#0f2e1b]/10 max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-[#d8f3dc] text-[#2d6a4f] rounded-xl text-lg">👤</span>
            <div>
              <h3 className="font-extrabold text-[#0f2e1b] text-base">
                {language === 'hi' ? 'किसान प्रमाणीकरण व प्रोफ़ाइल' : 'Farmer Authentication & Profile'}
              </h3>
              <p className="text-[11px] text-[#143d22]/70">
                {language === 'hi' ? 'सत्यापित खाता व भूमि विवरण प्रबंधन' : 'Manage your verified landholdings & credentials'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode 1: Active Profile & Fast Switcher */}
        {authMode === 'profile' && (
          <div className="space-y-4 pt-3 text-xs">
            {/* Active User Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#143d22] to-[#0f2e1b] text-white shadow-md relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-2xl bg-[#52b788]/20 border border-[#74c69d]/40 flex items-center justify-center text-2xl shadow-inner">
                    {currentFarmer.avatar}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-white text-base">
                        {currentFarmer.name}
                      </h4>
                      {currentFarmer.isVerified && (
                        <span title="Verified Landholder">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#95d5b2]">
                      {currentFarmer.phone} · {currentFarmer.district}, {currentFarmer.state}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setAuthMode('edit')}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#b7e4c7] transition-colors"
                  title="Edit Farm Details"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#1b4332] text-center">
                <div>
                  <span className="text-[10px] text-[#95d5b2] block">Crop Cultivar</span>
                  <span className="font-extrabold text-white text-xs truncate block">{currentFarmer.crop.split(' ')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#95d5b2] block">Land Size</span>
                  <span className="font-extrabold text-white text-xs">{currentFarmer.acreage} Acres</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#95d5b2] block">Eco Score</span>
                  <span className="font-extrabold text-[#74c69d] text-xs">{currentFarmer.sustainabilityScore}/100</span>
                </div>
              </div>
            </div>

            {/* Quick 1-Click Demo Profiles for Judges */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#0f2e1b] flex items-center gap-1">
                  <span>⚡ 1-Click Demo Farmer Switcher</span>
                </span>
                <span className="text-[10px] text-[#2d6a4f] font-semibold">For Hackathon Judges</span>
              </div>

              <div className="space-y-2">
                {DEMO_FARMERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onSelectFarmer(f)}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      f.id === currentFarmer.id
                        ? 'bg-[#d8f3dc] border-[#2d6a4f] text-[#0f2e1b] shadow-xs'
                        : 'bg-[#faf8f2] border-[#0f2e1b]/10 hover:bg-[#f5f2e9] text-[#143d22]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{f.avatar}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-xs">{f.name}</p>
                          <span className="text-[10px] text-[#143d22]/60">({f.district})</span>
                        </div>
                        <p className="text-[10px] text-[#143d22]/70 font-normal">
                          {f.crop} · {f.acreage} Acres
                        </p>
                      </div>
                    </div>

                    {f.id === currentFarmer.id ? (
                      <span className="text-xs font-bold text-emerald-800 bg-white/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" /> Active
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-[#2d6a4f] hover:underline">
                        Switch →
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Alternate Login / Sign up Options */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setAuthMode('otp')}
                className="flex-1 py-2.5 bg-[#f5f2e9] hover:bg-[#ede8dc] text-[#0f2e1b] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#2d6a4f]" />
                <span>Phone / OTP Login</span>
              </button>

              <button
                onClick={() => setAuthMode('edit')}
                className="flex-1 py-2.5 border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#d8f3dc]/20 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Land Details</span>
              </button>
            </div>
          </div>
        )}

        {/* View Mode 2: Phone OTP Authentication */}
        {authMode === 'otp' && (
          <div className="space-y-4 pt-3 text-xs">
            <div className="p-3 bg-[#f5f2e9] rounded-2xl border border-[#0f2e1b]/10 text-center">
              <span className="font-bold text-xs text-[#0f2e1b] block">
                {language === 'hi' ? 'भारतीय किसान मोबाइल लॉगिन' : 'Indian Farmer Mobile OTP Auth'}
              </span>
              <p className="text-[11px] text-[#143d22]/70 mt-0.5">
                Simulated zero-friction login designed for rural connectivity
              </p>
            </div>

            {!otpSent ? (
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-[#0f2e1b] block mb-1">
                    {language === 'hi' ? 'मोबाइल नंबर (+91)' : 'Mobile Phone Number (+91):'}
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2 bg-[#f5f2e9] rounded-xl border border-[#0f2e1b]/15 font-bold text-xs flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="flex-1 bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                  {otpError && <p className="text-[11px] text-rose-600 mt-1 font-semibold">{otpError}</p>}
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full py-3 bg-[#2d6a4f] hover:bg-[#143d22] text-white font-bold rounded-xl text-xs shadow-md transition-all"
                >
                  {language === 'hi' ? 'ओटीपी प्राप्त करें' : 'Send Verification OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-[#0f2e1b]">
                      {language === 'hi' ? '4-अंकीय ओटीपी दर्ज करें:' : 'Enter 4-Digit OTP:'}
                    </label>
                    <button
                      onClick={() => setOtpCode('8492')}
                      className="text-[10px] font-bold text-[#2d6a4f] bg-[#d8f3dc] px-2 py-0.5 rounded-full hover:underline"
                    >
                      ⚡ Auto-fill 8492
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="8492"
                    className="w-full text-center tracking-[0.5em] font-mono font-black text-lg bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl py-2 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                  />
                  {otpError && <p className="text-[11px] text-rose-600 mt-1 font-semibold text-center">{otpError}</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setOtpSent(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#0f2e1b]/20 font-bold text-xs"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOtp}
                    className="flex-1 py-2.5 bg-[#2d6a4f] hover:bg-[#143d22] text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Verify &amp; Sign In
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setAuthMode('profile')}
              className="w-full py-1 text-center text-[11px] text-[#143d22]/60 hover:underline"
            >
              ← Return to Current Profile
            </button>
          </div>
        )}

        {/* View Mode 3: Edit Farm Details */}
        {authMode === 'edit' && (
          <form onSubmit={handleSaveEdit} className="space-y-3 pt-3 text-xs">
            <div>
              <label className="font-bold text-[#0f2e1b] block mb-1">Farmer Full Name:</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f2e1b] block mb-1">District &amp; State:</label>
              <input
                type="text"
                required
                value={editDistrict}
                onChange={(e) => setEditDistrict(e.target.value)}
                className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-[#0f2e1b] block mb-1">Primary Crop Cultivar:</label>
              <input
                type="text"
                required
                value={editCrop}
                onChange={(e) => setEditCrop(e.target.value)}
                className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">Acreage (Acres):</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={editAcreage}
                  onChange={(e) => setEditAcreage(parseFloat(e.target.value))}
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-[#0f2e1b] block mb-1">Soil Texture:</label>
                <input
                  type="text"
                  required
                  value={editSoil}
                  onChange={(e) => setEditSoil(e.target.value)}
                  className="w-full bg-[#faf8f2] border border-[#0f2e1b]/15 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAuthMode('profile')}
                className="flex-1 py-2.5 rounded-xl border border-[#0f2e1b]/20 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#2d6a4f] text-white font-bold rounded-xl text-xs shadow-md"
              >
                Save Farm Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
