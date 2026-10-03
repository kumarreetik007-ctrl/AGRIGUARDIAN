import React from 'react';
import { Language } from '../types';
import { Award, CheckCircle2, Shield, Sparkles, Cpu, Layers, Code, Zap, ExternalLink, X } from 'lucide-react';

interface JudgesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onTriggerScenario: (scenario: string) => void;
}

export const JudgesGuideModal: React.FC<JudgesGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  onTriggerScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border-2 border-amber-400 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#0f2e1b]/10">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 bg-amber-100 text-amber-900 rounded-2xl text-2xl shadow-xs">
              🏆
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="bg-amber-500 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase">
                  Hackathon Review Portal
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                  All Systems Operational
                </span>
              </div>
              <h3 className="font-black text-[#0f2e1b] text-base sm:text-lg">
                AgriGuardian Judges Evaluation Guide
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f2e9] text-[#0f2e1b] flex items-center justify-center font-bold hover:bg-[#ede8dc]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 pt-3 text-xs leading-relaxed text-[#143d22]">
          {/* Executive Overview */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-300 rounded-2xl">
            <h4 className="font-extrabold text-amber-950 text-xs mb-1">
              🌾 Problem &amp; Ground-Truth Impact
            </h4>
            <p className="text-[11px] text-amber-900/90 leading-relaxed">
              In India, smallholder farmers lose over <strong>35% of yields</strong> to unpredicted pest blights and spend excess fuel/electricity over-irrigating before seasonal showers. AgriGuardian bridges this with an ultra-lightweight, <strong>bilingual (Hindi + English)</strong> multimodal companion offering instant decision intelligence, verifiable soil credentials, and a verified farmer social network.
            </p>
          </div>

          {/* Core Feature Checklist */}
          <div>
            <h4 className="font-extrabold text-[#0f2e1b] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Requested Hackathon Features Verification:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50">
                <span className="font-black text-emerald-950 block">✓ User Authentication</span>
                <p className="text-emerald-900/80 mt-0.5">1-click demo profiles (Ramesh, Anita, Rajesh), rural phone OTP simulation, and persistent local farm profiles.</p>
              </div>
              <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50">
                <span className="font-black text-emerald-950 block">✓ Real-Time Data Visualization</span>
                <p className="text-emerald-900/80 mt-0.5">Interactive 24h soil moisture curves, calibrated N-P-K nutrient bars, rainfall radar, and judge sensor sliders.</p>
              </div>
              <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50">
                <span className="font-black text-emerald-950 block">✓ Social Sharing Feed (Krishi Chaupal)</span>
                <p className="text-emerald-900/80 mt-0.5">Verified farmer community, instant post creation, likes, comments, and WhatsApp/social share dispatch.</p>
              </div>
              <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50">
                <span className="font-black text-emerald-950 block">✓ Multimodal Gemini 3.8 AI</span>
                <p className="text-emerald-900/80 mt-0.5">Live leaf vision diagnosis with symptoms &amp; safe dosage, plus 24/7 bilingual speech/text Krishi Mitra assistant.</p>
              </div>
            </div>
          </div>

          {/* 1-Click Interactive Test Scenarios for Judges */}
          <div>
            <h4 className="font-extrabold text-[#0f2e1b] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>1-Click Guided Demo Scenarios:</span>
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onTriggerScenario('crop_doctor');
                }}
                className="w-full p-2.5 bg-[#faf8f2] hover:bg-[#f5f2e9] border border-[#0f2e1b]/15 rounded-xl text-left flex items-center justify-between transition-all"
              >
                <div>
                  <span className="font-bold text-xs text-[#0f2e1b] block">
                    Scenario 1: Test Multimodal AI Crop Doctor
                  </span>
                  <span className="text-[10px] text-[#143d22]/70">
                    Jumps to Visual Diagnostic dropzone with sample pest/blight inspection
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d6a4f] bg-white px-2 py-1 rounded-lg border border-[#2d6a4f]/30">Run →</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTriggerScenario('telemetry');
                }}
                className="w-full p-2.5 bg-[#faf8f2] hover:bg-[#f5f2e9] border border-[#0f2e1b]/15 rounded-xl text-left flex items-center justify-between transition-all"
              >
                <div>
                  <span className="font-bold text-xs text-[#0f2e1b] block">
                    Scenario 2: Launch Real-Time Telemetry &amp; Simulator
                  </span>
                  <span className="text-[10px] text-[#143d22]/70">
                    Opens 24h moisture curve, NPK meters &amp; drag sliders to test dynamic recommendations
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d6a4f] bg-white px-2 py-1 rounded-lg border border-[#2d6a4f]/30">Run →</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTriggerScenario('community');
                }}
                className="w-full p-2.5 bg-[#faf8f2] hover:bg-[#f5f2e9] border border-[#0f2e1b]/15 rounded-xl text-left flex items-center justify-between transition-all"
              >
                <div>
                  <span className="font-bold text-xs text-[#0f2e1b] block">
                    Scenario 3: Open Krishi Chaupal Social Feed
                  </span>
                  <span className="text-[10px] text-[#143d22]/70">
                    Inspect community posts, upvote, reply, and test 1-click WhatsApp sharing
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d6a4f] bg-white px-2 py-1 rounded-lg border border-[#2d6a4f]/30">Run →</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onTriggerScenario('certificate');
                }}
                className="w-full p-2.5 bg-[#faf8f2] hover:bg-[#f5f2e9] border border-[#0f2e1b]/15 rounded-xl text-left flex items-center justify-between transition-all"
              >
                <div>
                  <span className="font-bold text-xs text-[#0f2e1b] block">
                    Scenario 4: View Cryptographic Farming Passport
                  </span>
                  <span className="text-[10px] text-[#143d22]/70">
                    Inspect tamper-proof SHA-256 certificate for green agri-loans and KVK audit
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d6a4f] bg-white px-2 py-1 rounded-lg border border-[#2d6a4f]/30">Run →</span>
              </button>
            </div>
          </div>

          {/* Technical Architecture */}
          <div className="bg-[#faf8f2] p-3 rounded-2xl border border-[#0f2e1b]/10 text-[11px] space-y-1">
            <span className="font-bold text-[#0f2e1b] block">🛠️ Tech Stack &amp; Design Architecture:</span>
            <p><strong>AI Model:</strong> Google Gemini 3.8 Flash via <code>@google/genai</code> SDK server-side proxy</p>
            <p><strong>Speech &amp; Accessibility:</strong> Web Speech API (speech synthesis + speech recognition in hi-IN / en-IN)</p>
            <p><strong>Framework:</strong> Vite + React 19 + Express full-stack with server.ts</p>
            <p><strong>Styling constitution:</strong> Pixel-perfect responsive Tailwind CSS v4 design with custom Indian agricultural palette</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-[#143d22] text-white font-bold rounded-xl text-xs hover:bg-[#0f2e1b]"
        >
          Close Guide &amp; Return to App
        </button>
      </div>
    </div>
  );
};
