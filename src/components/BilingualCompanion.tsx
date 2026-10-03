import React, { useState } from 'react';
import { Language } from '../types';
import { Volume2, Mic, Camera, VolumeX } from 'lucide-react';

interface BilingualCompanionProps {
  language: Language;
  onSetLanguage: (lang: Language) => void;
  onOpenCropDoctor: () => void;
  onOpenChat: () => void;
}

export const BilingualCompanion: React.FC<BilingualCompanionProps> = ({
  language,
  onSetLanguage,
  onOpenCropDoctor,
  onOpenChat,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);

  const demoContent = {
    en: {
      question: '"Should I irrigate my wheat field today?"',
      answer:
        '"Rain is expected tomorrow with 78% probability. You may safely delay irrigation today. This will save water and protect roots from waterlogging."',
    },
    hi: {
      question: '“क्या मुझे आज गेहूं के खेत में सिंचाई करनी चाहिए?”',
      answer:
        '“कल 78% बारिश होने की संभावना है। आप आज सिंचाई थोड़ी देर के लिए रोक सकते हैं। इससे पानी की बचत होगी और फसल की जड़ें सुरक्षित रहेंगी।”',
    },
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = demoContent[language].answer.replace(/[“”"]/g, '');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleMic = () => {
    setIsListeningMic(!isListeningMic);
    if (!isListeningMic) {
      setTimeout(() => {
        setIsListeningMic(false);
        onOpenChat();
      }, 1500);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#143d22] to-[#0f2e1b] text-white rounded-3xl p-6 sm:p-7 shadow-xl h-full flex flex-col justify-between" id="bilingual-demo">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#95d5b2]">
              Farmer-First Inclusivity
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">English + हिंदी Companion</h2>
          </div>

          {/* Toggle Pill */}
          <div className="inline-flex p-1 bg-[#081a0f]/60 rounded-full border border-[#1b4332]">
            <button
              onClick={() => onSetLanguage('en')}
              className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#52b788] text-[#081a0f] shadow-xs'
                  : 'text-[#b7e4c7] hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onSetLanguage('hi')}
              className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#52b788] text-[#081a0f] shadow-xs'
                  : 'text-[#b7e4c7] hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Dialogue Speech Bubble Box */}
        <div className="space-y-4">
          {/* User Query Bubble */}
          <div className="flex flex-col items-end">
            <span className="text-[10px] sm:text-xs text-[#95d5b2] font-semibold mb-1 mr-1">
              Ramesh Kumar (Farmer)
            </span>
            <div className="bg-[#1b4332]/90 border border-[#245a43] text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-xs max-w-[90%] text-xs sm:text-sm leading-relaxed shadow-sm">
              <span>{demoContent[language].question}</span>
            </div>
          </div>

          {/* Assistant Reply Bubble */}
          <div className="flex flex-col items-start">
            <div className="flex items-center justify-between w-full max-w-[95%] mb-1.5 ml-1">
              <span className="text-[10px] sm:text-xs text-[#95d5b2] font-semibold">
                🤖 AgriGuardian AI
              </span>
              <button
                onClick={handleSpeak}
                className="text-[11px] flex items-center gap-1.5 text-[#b7e4c7] hover:text-white bg-[#0f2e1b]/70 px-2.5 py-1 rounded-full border border-[#52b788]/30 transition-colors cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#52b788]" />
                    <span>Listen Voice Audio</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-white text-[#081a0f] p-4 rounded-2xl rounded-tl-xs max-w-[95%] text-xs sm:text-sm leading-relaxed shadow-lg border border-[#74c69d]">
              <span>{demoContent[language].answer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio & Camera Chips */}
      <div className="mt-6 pt-4 border-t border-[#1b4332]/80 flex items-center justify-between gap-2">
        <button
          onClick={toggleMic}
          className={`flex items-center gap-2 text-xs sm:text-sm font-semibold py-1.5 px-3 rounded-xl border transition-all cursor-pointer ${
            isListeningMic
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
              : 'text-[#b7e4c7] hover:text-white border-transparent'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>{isListeningMic ? (language === 'hi' ? 'सुन रहा है...' : 'Listening...') : (language === 'hi' ? 'आवाज इनपुट' : 'Voice Input Supported')}</span>
        </button>

        <button
          onClick={onOpenCropDoctor}
          className="flex items-center gap-2 text-xs sm:text-sm text-[#b7e4c7] hover:text-white font-semibold py-1.5 px-3 rounded-xl transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <span>{language === 'hi' ? 'फोटो विश्लेषण' : 'Photo Analysis'}</span>
        </button>
      </div>
    </section>
  );
};
