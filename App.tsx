import React, { useState, useEffect } from 'react';
import { Language, SUPPORTED_LANGUAGES, Tab } from './types';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import ServicePage from './components/ServicePage';
import CropDoctorView from './components/CropDoctorView';
import LiveVoiceInterface from './components/LiveVoiceInterface';
import AboutPage from './components/AboutPage';
import KnowledgeHub from './components/KnowledgeHub';
import WeatherView from './components/WeatherView';
import MarketView from './components/MarketView';
import ImageWithFallback from './components/ImageWithFallback';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
        window.removeEventListener('online', handleStatusChange);
        window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const navigateToChat = (prompt?: string) => {
    if (prompt) {
      setChatInitialPrompt(prompt);
    }
    setActiveTab('chat');
  };

  const handleNavigate = (tab: Tab) => {
    setActiveTab(tab);
  };

  const goBack = () => {
    setActiveTab('home');
  };

  // Helper to render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard language={language} onNavigate={handleNavigate} onNavigateToChat={navigateToChat} />;
      case 'chat':
        return (
            <ChatInterface 
              language={language} 
              isVisible={true} 
              initialPrompt={chatInitialPrompt}
              onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
            />
        );
      case 'voice':
        return <LiveVoiceInterface language={language} onBack={goBack} />;
      case 'knowledge':
        return <KnowledgeHub language={language} onNavigate={handleNavigate} />;
      case 'weather':
        return <WeatherView language={language} onBack={() => setActiveTab('knowledge')} />;
      case 'market':
        return <MarketView language={language} onBack={() => setActiveTab('knowledge')} />;
      case 'schemes':
        return (
            <ServicePage 
                title={language === 'en' ? "Govt Schemes" : "सरकारी योजनाएं"}
                icon={
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=100&q=80" 
                    alt="Govt" 
                    className="w-8 h-8 rounded-full border border-earth-200" 
                  />
                }
                heroImage="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                galleryImages={[
                  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80",
                  "https://images.unsplash.com/photo-1595252636230-61f43f07a16d?auto=format&fit=crop&w=500&q=80", 
                  "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=500&q=80",
                  "https://plus.unsplash.com/premium_photo-1661962692059-55d5a4319814?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80"
                ]}
                prompt="List 5 major government agricultural schemes currently active in India for 2024-25 (like PM Kisan, Pradhan Mantri Fasal Bima Yojana). For each scheme, strictly provide the following details: 1. **Benefits**, 2. **Eligibility**, 3. **How to Apply** (include step-by-step instructions), and 4. **Official Application Website URL**. Use Google Search to find the latest application procedures and direct links. Ensure the website URL is written clearly (e.g., https://pmkisan.gov.in)."
                language={language}
                onBack={() => setActiveTab('knowledge')}
            />
        );
      case 'crop_calendar':
        return (
            <ServicePage 
                title={language === 'en' ? "Crop Calendar" : "फसल कैलेंडर"}
                icon="🗓️"
                heroImage="https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=1000&q=80"
                prompt="Create a detailed Crop Calendar for Indian agriculture for the current year. Categorize by seasons: Kharif, Rabi, and Zaid. For each season, list 5 major crops and strictly provide their Sowing Time and Harvesting Time. Format as a clean list."
                language={language}
                onBack={() => setActiveTab('knowledge')}
            />
        );
      case 'crop_guides':
        return (
            <ServicePage 
                title={language === 'en' ? "Crop Guides" : "फसल गाइड"}
                icon="🍃"
                heroImage="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                prompt="Provide a comprehensive guide for major Indian crops categorized by seasons: Rabi (e.g., Wheat, Mustard), Kharif (e.g., Rice, Maize), and Zaid (e.g., Cucumber). For each season, list top 3 crops with sowing time, harvesting time, and key care tips."
                language={language}
                onBack={() => setActiveTab('knowledge')}
            />
        );
      case 'fertilizer':
        return (
            <ServicePage 
                title={language === 'en' ? "Fertilizer Usage" : "उर्वरक उपयोग"}
                icon="🧪"
                heroImage="https://images.unsplash.com/photo-1605000797499-95a05f52e095?auto=format&fit=crop&w=1000&q=80"
                prompt="Explain the usage of fertilizers for common Indian crops. Include NPK ratios for major crops (Rice, Wheat), the importance of organic options like Vermicompost/FYM, and the best timing for application to maximize yield."
                language={language}
                onBack={() => setActiveTab('knowledge')}
            />
        );
      case 'pests':
        return (
             <ServicePage 
                title={language === 'en' ? "Pest Database" : "कीट डेटाबेस"}
                icon="🐞"
                heroImage="https://images.unsplash.com/photo-1471193945509-9adadd0974ce?auto=format&fit=crop&w=1000&q=80"
                prompt="List 5 common pests affecting major Indian crops (like Rice Stem Borer, Cotton Bollworm) and provide identification tips, symptoms, and organic/chemical management strategies for each."
                language={language}
                onBack={() => setActiveTab('knowledge')}
            />
        );
      case 'soil':
        return (
            <ServicePage 
                title={language === 'en' ? "Soil Health Guide" : "मिट्टी स्वास्थ्य गाइड"}
                icon="🌱"
                heroImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1000&q=80"
                prompt="Explain how a farmer can test their soil health. What are the steps to collect a soil sample? Where should they send it? Why is soil testing important? Provide a step-by-step guide."
                language={language}
                onBack={goBack}
            />
        );
      case 'doctor':
        return <CropDoctorView language={language} onBack={goBack} />;
      case 'about':
        return <AboutPage onBack={goBack} />;
      default:
        return <Dashboard language={language} onNavigate={handleNavigate} onNavigateToChat={navigateToChat} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-earth-50 max-w-md mx-auto shadow-2xl overflow-hidden md:max-w-2xl lg:max-w-4xl border-x border-earth-200 relative">
      
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-earth-800 text-white text-center text-xs py-1.5 px-4 sticky top-0 z-50 animate-fade-in flex items-center justify-center gap-2 shadow-md">
            <svg className="w-3 h-3 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" /></svg>
            <span className="font-medium tracking-wide">You are offline. Showing limited features.</span>
        </div>
      )}

      {/* Header - Show on all tabs except when inside a Service View (and not voice) */}
      {(activeTab === 'home' || activeTab === 'chat' || activeTab === 'knowledge') && (
      <header className="bg-leaf-700 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full shadow-sm">
            <span className="text-2xl leading-none" role="img" aria-label="sprout">🌱</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">KrishiSahay AI</h1>
            <p className="text-[10px] text-leaf-200 opacity-90 tracking-wide">Digital Farming Companion</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-1 bg-leaf-800 hover:bg-leaf-900 px-3 py-1.5 rounded-full text-sm transition-colors border border-leaf-600 shadow-sm"
          >
            <span className="font-medium">{SUPPORTED_LANGUAGES[language].split(' ')[0]}</span>
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>

          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-earth-100 py-2 text-gray-800 z-50 animate-fade-in overflow-hidden">
              {(Object.keys(SUPPORTED_LANGUAGES) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm hover:bg-leaf-50 transition-colors ${language === lang ? 'bg-leaf-50 font-semibold text-leaf-700' : ''}`}
                >
                  {SUPPORTED_LANGUAGES[lang]}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-earth-50 relative">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar */}
      {(activeTab === 'home' || activeTab === 'chat' || activeTab === 'knowledge' || activeTab === 'schemes') && (
      <nav className="bg-white border-t border-earth-200 pb-safe pt-2 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sticky bottom-0 z-30">
        <div className="flex justify-around items-center h-14">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            label="Home"
          />
          
          <div className="relative -top-5">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`p-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 border-4 border-earth-50 ${activeTab === 'chat' ? 'bg-leaf-600 text-white' : 'bg-leaf-500 text-white'}`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </button>
          </div>

          <NavButton 
            active={activeTab === 'knowledge' || activeTab === 'schemes'} 
            onClick={() => setActiveTab('knowledge')} 
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            label="Hub"
          />
        </div>
      </nav>
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 transition-colors ${active ? 'text-leaf-700' : 'text-earth-400 hover:text-earth-600'}`}
  >
    <div className={`transition-all duration-300 ${active ? '-translate-y-1' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-medium mt-1 ${active ? 'opacity-100' : 'opacity-0 scale-0'} transition-all duration-300`}>
      {label}
    </span>
  </button>
);

export default App;