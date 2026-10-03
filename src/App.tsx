import React, { useState, useEffect } from 'react';
import { Language, FarmerProfile, TelemetryData, DiagnosisResult } from './types';
import { DEMO_FARMERS, INITIAL_TELEMETRY, PRESET_DIAGNOSES } from './data/mockData';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { LiveFarmHub } from './components/LiveFarmHub';
import { WhatShouldIDoToday } from './components/WhatShouldIDoToday';
import { CropDoctor } from './components/CropDoctor';
import { BilingualCompanion } from './components/BilingualCompanion';
import { IntelligentEcosystem } from './components/IntelligentEcosystem';
import { HowItWorks } from './components/HowItWorks';
import { SustainabilitySection } from './components/SustainabilitySection';
import { DigitalRecordPassport } from './components/DigitalRecordPassport';
import { KrishiMitraChat } from './components/KrishiMitraChat';
import { SocialSharingFeed } from './components/SocialSharingFeed';
import { FarmerFriendlyPromise } from './components/FarmerFriendlyPromise';
import { ConversionCTA } from './components/ConversionCTA';
import { Footer } from './components/Footer';
import { TelemetryVisualizerModal } from './components/TelemetryVisualizerModal';
import { AuthModal } from './components/AuthModal';
import { JudgesGuideModal } from './components/JudgesGuideModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Authentication State with localStorage persistence
  const [currentFarmer, setCurrentFarmer] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem('agriguardian_farmer');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEMO_FARMERS[0];
  });

  // Fast Telemetry State & IoT Streamer
  const [telemetry, setTelemetry] = useState<TelemetryData>(INITIAL_TELEMETRY);
  const [isStreamingActive, setIsStreamingActive] = useState<boolean>(true);

  // Plant Leaf Diagnosis & Confidence State according to leaf pic
  const [activeLeafDiagnosis, setActiveLeafDiagnosis] = useState<DiagnosisResult>(PRESET_DIAGNOSES[0].diagnosis);
  const [activePresetKey, setActivePresetKey] = useState<string>('leaf_blight');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isSocialFeedOpen, setIsSocialFeedOpen] = useState(false);
  const [isJudgesGuideOpen, setIsJudgesGuideOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  // Fetch initial telemetry from server
  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch('/api/telemetry/live');
        const data = await res.json();
        if (data && data.metrics) {
          setTelemetry(data);
        }
      } catch (e) {
        // Fallback to initial
      }
    };
    fetchTelemetry();
  }, []);

  // Continuous Fast IoT Sensor stream (live telemetry updates with ±0.8% micro fluctuation)
  useEffect(() => {
    if (!isStreamingActive) return;

    const timer = setInterval(() => {
      const jitter = (Math.random() * 1.6 - 0.8);
      setTelemetry((prev) => {
        const current = prev.metrics.soilMoisturePercent;
        const next = Math.min(85, Math.max(38, Math.round(current + jitter)));
        if (next === current) return prev;

        return {
          ...prev,
          timestamp: new Date().toISOString(),
          metrics: {
            ...prev.metrics,
            soilMoisturePercent: next,
            soilMoistureStatus: next > 72 ? 'High' : next < 45 ? 'Low' : 'Adequate',
          },
        };
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isStreamingActive]);

  // Central Dynamic Telemetry & Decision Intelligence engine
  const updateTelemetryMetrics = (newMoisture: number, newRain?: number) => {
    setTelemetry((prev) => {
      const moisture = Math.min(95, Math.max(20, Math.round(newMoisture)));
      const rain = newRain !== undefined ? Math.min(100, Math.max(0, Math.round(newRain))) : prev.metrics.rainProbabilityPercent;

      let action = 'DELAY_IRRIGATION';
      let headline = 'Delay irrigation today. Rainfall expected tomorrow.';
      let headlineHindi = 'आज सिंचाई टालें। कल बारिश का पूर्वानुमान है।';
      let priority = 'HIGH (Rain Alert)';
      let waterSaved = 1400;
      let savings = 340;

      if (rain >= 55) {
        action = 'DELAY_IRRIGATION';
        headline = 'Delay irrigation today. Rainfall expected tomorrow.';
        headlineHindi = 'आज सिंचाई टालें। कल बारिश का पूर्वानुमान है।';
        priority = 'HIGH (Rain Alert)';
        waterSaved = 1400;
        savings = 340;
      } else if (moisture < 45) {
        action = 'IRRIGATE_NOW';
        headline = `Moisture low at ${moisture}%. Schedule light irrigation now.`;
        headlineHindi = `नमी ${moisture}% तक घट गई है। तुरंत हल्की सिंचाई करें।`;
        priority = 'URGENT (Moisture Deficit)';
        waterSaved = 0;
        savings = 0;
      } else if (moisture > 72) {
        action = 'DRAINAGE_ALERT';
        headline = `Soil moisture saturated at ${moisture}%. Inspect field drainage.`;
        headlineHindi = `मिट्टी में नमी ${moisture}% है। जलभराव रोकने हेतु जल निकासी सुनिश्चित करें।`;
        priority = 'NOTICE (Saturated Soil)';
        waterSaved = 2100;
        savings = 480;
      } else {
        action = 'MAINTAIN_SCHEDULE';
        headline = `Moisture is balanced at ${moisture}%. Soil health optimal.`;
        headlineHindi = `नमी ${moisture}% पर संतुलित है। अतिरिक्त पानी की आवश्यकता नहीं है।`;
        priority = 'OPTIMAL';
        waterSaved = 800;
        savings = 210;
      }

      return {
        ...prev,
        timestamp: new Date().toISOString(),
        metrics: {
          ...prev.metrics,
          soilMoisturePercent: moisture,
          soilMoistureStatus: moisture > 72 ? 'High' : moisture < 45 ? 'Low' : 'Adequate',
          rainProbabilityPercent: rain,
          rainExpectedArrival: rain >= 55 ? 'Tomorrow, ~2:00 PM' : 'Clear skies next 48h',
        },
        recommendation: {
          action,
          headline,
          headlineHindi,
          priority,
          waterSavedEstimateLiters: waterSaved,
          savingsInr: savings,
        },
      };
    });
  };

  // Synchronize plant leaf picture selection between Hero and Crop Doctor
  const handleSelectPresetLeaf = (presetKey: string) => {
    setActivePresetKey(presetKey);
    const found = PRESET_DIAGNOSES.find((p) => p.key === presetKey);
    if (found) {
      setActiveLeafDiagnosis(found.diagnosis);
    }
  };

  const handleDiagnosisChange = (diagnosis: DiagnosisResult, _imageUrl: string) => {
    setActiveLeafDiagnosis(diagnosis);
  };

  const handleSelectFarmer = (farmer: FarmerProfile) => {
    setCurrentFarmer(farmer);
    try {
      localStorage.setItem('agriguardian_farmer', JSON.stringify(farmer));
    } catch {}
  };

  const handleUpdateFarmer = (updated: FarmerProfile) => {
    setCurrentFarmer(updated);
    try {
      localStorage.setItem('agriguardian_farmer', JSON.stringify(updated));
    } catch {}
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleAskAI = (query: string) => {
    setChatInitialQuery(query);
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTriggerScenario = (scenario: string) => {
    if (scenario === 'crop_doctor') {
      const el = document.getElementById('crop-doctor');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (scenario === 'telemetry') {
      setIsTelemetryOpen(true);
    } else if (scenario === 'community') {
      const el = document.getElementById('community-feed');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (scenario === 'certificate') {
      const el = document.getElementById('certificate-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-[#0f2e1b] bg-[#faf8f2] min-h-screen selection:bg-[#52b788] selection:text-white">
      {/* Sticky Top Website Navbar */}
      <Header
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentFarmer={currentFarmer}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenJudgesGuide={() => setIsJudgesGuideOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenSocialFeed={() => setIsSocialFeedOpen(true)}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Mobile/Tablet Dropdown Navigation Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        language={language}
        currentFarmer={currentFarmer}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenJudgesGuide={() => setIsJudgesGuideOpen(true)}
        onOpenTelemetry={() => setIsTelemetryOpen(true)}
        onOpenSocialFeed={() => setIsSocialFeedOpen(true)}
      />

      {/* Main Expansive Website Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-12 sm:space-y-16">
        {/* 1. Hero Section (2-Column Responsive Layout with Leaf Picture & Live Telemetry) */}
        <HeroSection
          language={language}
          onOpenTelemetry={() => setIsTelemetryOpen(true)}
          onOpenCropDoctor={() => {
            const el = document.getElementById('crop-doctor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSustainability={() => {
            const el = document.getElementById('sustainability');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          activeLeafDiagnosis={activeLeafDiagnosis}
          onSelectPresetLeaf={handleSelectPresetLeaf}
          telemetry={telemetry}
        />

        {/* 2. Trust Strip Pill Rail */}
        <TrustStrip language={language} />

        {/* 3. Farm Command Center: Live Farm Hub + Decision Intelligence Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5">
            <LiveFarmHub
              language={language}
              telemetry={telemetry}
              currentFarmer={currentFarmer}
              onOpenTelemetry={() => setIsTelemetryOpen(true)}
              onUpdateMoisture={(val) => updateTelemetryMetrics(val)}
              onUpdateRain={(val) => updateTelemetryMetrics(telemetry.metrics.soilMoisturePercent, val)}
              isStreaming={isStreamingActive}
              onToggleStreaming={() => setIsStreamingActive((prev) => !prev)}
            />
          </div>
          <div className="lg:col-span-7">
            <WhatShouldIDoToday
              language={language}
              telemetry={telemetry}
              currentFarmer={currentFarmer}
              onAskAI={handleAskAI}
              onRecordSaved={() => {}}
              onUpdateMoisture={(val) => updateTelemetryMetrics(val)}
            />
          </div>
        </div>

        {/* 4. AI Crop Doctor Visual Diagnostic Studio (2-Column Layout with exact confidence according to leaf pic) */}
        <CropDoctor
          language={language}
          activePresetKey={activePresetKey}
          onDiagnosisChange={handleDiagnosisChange}
        />

        {/* 5. Farmer-First Inclusivity & 24/7 Krishi Mitra AI Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5">
            <BilingualCompanion
              language={language}
              onSetLanguage={setLanguage}
              onOpenCropDoctor={() => {
                const el = document.getElementById('crop-doctor');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenChat={() => {
                const el = document.getElementById('ai-assistant');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
          <div className="lg:col-span-7">
            <KrishiMitraChat
              language={language}
              currentFarmer={currentFarmer}
              initialQuery={chatInitialQuery}
            />
          </div>
        </div>

        {/* 6. Social Sharing Feed: Krishi Chaupal Community */}
        <SocialSharingFeed
          language={language}
          currentFarmer={currentFarmer}
        />

        {/* 7. Intelligent Ecosystem: 6 Core Modules (3-Column Grid) */}
        <IntelligentEcosystem
          language={language}
          onOpenCropDoctor={() => {
            const el = document.getElementById('crop-doctor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenWeather={() => {
            const el = document.getElementById('today-action');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSoil={() => setIsTelemetryOpen(true)}
          onOpenSustainability={() => {
            const el = document.getElementById('sustainability');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCertificate={() => {
            const el = document.getElementById('certificate-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Simple Process: How AgriGuardian Works (4-Column Progression) */}
        <HowItWorks language={language} />

        {/* 9. Eco-Farming Credential Suite: Sustainability Score + Digital Record Passport Side-by-Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <SustainabilitySection language={language} />
          <DigitalRecordPassport
            language={language}
            currentFarmer={currentFarmer}
            sustainabilityScore={currentFarmer.sustainabilityScore}
          />
        </div>

        {/* 10. Farmer-Friendly Promise */}
        <FarmerFriendlyPromise language={language} />

        {/* 11. Conversion CTA */}
        <ConversionCTA
          language={language}
          onOpenCropDoctor={() => {
            const el = document.getElementById('crop-doctor');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAssistant={() => {
            const el = document.getElementById('ai-assistant');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Bottom Persistent Floating Assistant Pill */}
      <aside className="fixed bottom-5 right-5 z-30">
        <a
          href="#ai-assistant"
          className="flex items-center gap-2.5 px-5 py-3 bg-[#0f2e1b] hover:bg-[#143d22] text-white rounded-full shadow-2xl border border-[#74c69d]/50 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-full bg-[#52b788] text-[#081a0f] font-bold flex items-center justify-center text-base shadow-xs group-hover:scale-110 transition-transform">
            🤖
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-1">
            {language === 'hi' ? 'एग्रीगार्डियन से पूछें' : 'Ask AgriGuardian'}
          </span>
        </a>
      </aside>

      {/* Comprehensive Multi-Column Website Footer */}
      <Footer
        language={language}
        onOpenCropDoctor={() => {
          const el = document.getElementById('crop-doctor');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWeather={() => {
          const el = document.getElementById('today-action');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSoil={() => setIsTelemetryOpen(true)}
        onOpenCertificate={() => {
          const el = document.getElementById('certificate-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenJudgesGuide={() => setIsJudgesGuideOpen(true)}
      />

      {/* Interactive Modals */}
      <TelemetryVisualizerModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
        language={language}
        telemetry={telemetry}
        onUpdateTelemetry={(m, r) => updateTelemetryMetrics(m, r)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        currentFarmer={currentFarmer}
        onSelectFarmer={handleSelectFarmer}
        onUpdateFarmer={handleUpdateFarmer}
      />

      <JudgesGuideModal
        isOpen={isJudgesGuideOpen}
        onClose={() => setIsJudgesGuideOpen(false)}
        language={language}
        onTriggerScenario={handleTriggerScenario}
      />

      {isSocialFeedOpen && (
        <SocialSharingFeed
          language={language}
          currentFarmer={currentFarmer}
          isOpenAsModal={true}
          onClose={() => setIsSocialFeedOpen(false)}
        />
      )}
    </div>
  );
}
