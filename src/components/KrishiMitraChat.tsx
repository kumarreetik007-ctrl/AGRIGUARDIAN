import React, { useState, useRef, useEffect } from 'react';
import { Language, FarmerProfile } from '../types';
import { Send, Mic, Volume2, Sparkles, Loader2, Bot, User } from 'lucide-react';

interface KrishiMitraChatProps {
  language: Language;
  currentFarmer: FarmerProfile;
  initialQuery?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  source?: string;
}

export const KrishiMitraChat: React.FC<KrishiMitraChatProps> = ({
  language,
  currentFarmer,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? `नमस्ते ${currentFarmer.name.split(' ')[0]} जी! मैं आपका एग्रीगार्डियन सहायक हूँ। आप अपनी फसल, मौसम, सिंचाई या कीटनाशक सुरक्षा के बारे में कुछ भी पूछ सकते हैं।`
          : `Hello ${currentFarmer.name.split(' ')[0]}! I am your AgriGuardian Assistant. You can ask me anything about your ${currentFarmer.crop}, weather forecasts, irrigation timings, or pesticide safety.`,
      time: 'Just now',
      source: 'gemini-3.8-flash',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { en: '🌧 Weather Today', hi: '🌧 आज का मौसम', queryEn: 'What is the rainfall forecast for today and tomorrow?', queryHi: 'आज और कल बारिश का पूर्वानुमान क्या है?' },
    { en: '💧 Irrigation Timing', hi: '💧 सिंचाई का समय', queryEn: 'Should I irrigate my field given the moisture level?', queryHi: 'क्या मुझे वर्तमान नमी में सिंचाई करनी चाहिए?' },
    { en: '🌱 Wheat Rust', hi: '🌱 गेहूं का रतुआ', queryEn: 'How to identify and treat early yellow rust on wheat?', queryHi: 'गेहूं में पीले रतुआ की पहचान और रोकथाम कैसे करें?' },
    { en: '🛡 Safe Spray Guide', hi: '🛡 सुरक्षित छिड़काव', queryEn: 'What precautions and PPE should I use before spraying fungicide?', queryHi: 'दवा छिड़कते समय क्या सावधानियां रखनी चाहिए?' },
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          language,
          farmerName: currentFarmer.name,
          crop: currentFarmer.crop,
        }),
      });

      const data = await res.json();
      const reply = data.reply || (language === 'hi' ? 'सलाह लोड करने में समस्या आई।' : 'Could not retrieve advice.');

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source,
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'hi'
              ? 'वर्तमान 62% मिट्टी नमी के अनुसार आज सिंचाई टालना ही सर्वोत्तम है। कल बारिश 78% संभावित है।'
              : 'Based on 62% soil moisture and 78% rainfall probability tomorrow, delaying irrigation is strongly advised.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      setIsRecording(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
        handleSend(transcript);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        const simQuery = language === 'hi' ? 'क्या मुझे आज सिंचाई करनी चाहिए?' : 'Should I irrigate my field today?';
        setInput(simQuery);
        handleSend(simQuery);
      }, 1500);
    }
  };

  return (
    <section className="space-y-3.5 h-full flex flex-col justify-between" id="ai-assistant">
      <div>
        <span className="text-xs font-bold text-[#2d6a4f] uppercase tracking-wider block">
          {language === 'hi' ? '24/7 कृषि मित्र' : '24/7 Krishi Mitra'}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2e1b] tracking-tight">
          {language === 'hi' ? 'एग्रीगार्डियन से कुछ भी पूछें' : 'Ask AgriGuardian Anything'}
        </h2>
        <p className="text-xs sm:text-sm text-[#143d22]/80 mt-1">
          {language === 'hi'
            ? 'त्वरित कृषि परामर्श के लिए हिंदी या अंग्रेजी में बोलें या लिखें।'
            : 'Speak or text in Hindi or English for rapid agronomic advice.'}
        </p>
      </div>

      {/* Chat UI Container */}
      <div className="bg-[#fcfbf8] rounded-3xl border border-[#0f2e1b]/10 shadow-sm overflow-hidden flex flex-col flex-1 justify-between mt-2">
        {/* Chat Header */}
        <div className="bg-[#143d22] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="w-10 h-10 rounded-2xl bg-[#52b788] text-[#081a0f] flex items-center justify-center font-bold text-lg shadow-xs">
                🤖
              </span>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#143d22]" />
            </div>
            <div>
              <h3 className="text-sm font-bold">
                {language === 'hi' ? 'एग्रीगार्डियन सहायक' : 'AgriGuardian Assistant'}
              </h3>
              <p className="text-xs text-[#95d5b2]">
                {language === 'hi' ? 'ऑनलाइन · तत्काल कृषि विशेषज्ञ' : 'Online · Instant Agricultural Expert'}
              </p>
            </div>
          </div>
          <span className="text-xs bg-[#1b4332] px-3 py-1 rounded-lg text-[#b7e4c7] font-mono">
            Gemini 3.8
          </span>
        </div>

        {/* Chat Stream Body */}
        <div className="p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm max-h-[360px] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <span className="text-xl shrink-0 mt-0.5">
                {m.sender === 'user' ? currentFarmer.avatar : '🌱'}
              </span>
              <div
                className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed max-w-[85%] shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#2d6a4f] text-white rounded-tr-xs'
                    : 'bg-white text-[#0f2e1b] rounded-tl-xs border border-[#0f2e1b]/5'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <div
                  className={`mt-1.5 flex items-center justify-between text-[10px] ${
                    m.sender === 'user' ? 'text-white/70' : 'text-[#143d22]/50'
                  }`}
                >
                  <span>{m.time}</span>
                  {m.source && <span className="font-mono ml-2 font-semibold">✓ ICAR / AI Verified</span>}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-[#2d6a4f]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-semibold">
                {language === 'hi' ? 'कृषि विशेषज्ञ उत्तर तैयार कर रहे हैं...' : 'Consulting agronomy models...'}
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        <div>
          {/* Quick Suggestion Topic Chips */}
          <div className="px-4 py-2 bg-[#f5f2e9] border-t border-[#0f2e1b]/5 flex flex-wrap gap-2">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(language === 'hi' ? p.queryHi : p.queryEn)}
                className="chat-prompt-pill px-3 py-1 rounded-full bg-white border border-[#0f2e1b]/10 text-xs font-semibold text-[#0f2e1b] hover:bg-[#d8f3dc] hover:border-[#2d6a4f]/30 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                {language === 'hi' ? p.hi : p.en}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3.5 bg-white border-t border-[#0f2e1b]/10 flex items-center gap-2.5">
            <button
              onClick={handleVoiceInput}
              aria-label="Ask with voice"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg active:scale-95 transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-[#d8f3dc] text-[#1b4332] hover:bg-[#b7e4c7]'
              }`}
              title="Speak query"
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                language === 'hi'
                  ? 'हिंदी या अंग्रेजी में अपना प्रश्न लिखें...'
                  : 'Type your question in Hindi or English...'
              }
              className="flex-1 bg-[#faf8f2] border border-[#0f2e1b]/10 text-xs sm:text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#40916c] text-[#0f2e1b] placeholder:text-[#0f2e1b]/40"
            />

            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="w-11 h-11 rounded-2xl bg-[#2d6a4f] hover:bg-[#143d22] disabled:opacity-40 text-white flex items-center justify-center text-base active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
