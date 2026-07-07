/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { AuthPages } from './components/AuthPages';
import { ToastProvider, useToast } from './components/ui/Toast';

function AppContent() {
  const { toast } = useToast();
  
  // User profile state
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('smart_bharat_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Tab configuration: 'home', 'auth' or specific subtabs
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');

  // Multi-language support state
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('smart_bharat_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Preloaded query for the landing page AI Search
  const [preloadedQuery, setPreloadedQuery] = useState<string>('');

  // Handle dark mode side effects
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smart_bharat_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smart_bharat_theme', 'light');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    toast(
      currentLang === 'hi'
        ? `थीम परिवर्तित की गई!`
        : `Visual styling adjusted successfully.`,
      'info'
    );
  };

  const handleLangChange = (lang: Language) => {
    setCurrentLang(lang);
    const nativeLang = lang === 'hi' ? 'हिंदी' : lang === 'ta' ? 'தமிழ்' : lang === 'te' ? 'తెలుగు' : lang === 'mr' ? 'मराठी' : lang === 'bn' ? 'বাংলা' : 'English';
    toast(
      lang === 'hi'
        ? `भाषा बदलकर ${nativeLang} कर दी गई है।`
        : `Language updated to ${nativeLang}.`,
      'success'
    );
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smart_bharat_user');
    setActiveTab('home');
    toast(
      currentLang === 'hi'
        ? 'सफलतापूर्वक लॉग आउट हो गया।'
        : 'Citizen credentials locked out safely.',
      'info'
    );
  };

  // Nav clicks
  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      setActiveTab('home');
      setActiveSubTab('overview');
    } else if (tab === 'dashboard') {
      setActiveTab('dashboard');
      setActiveSubTab('overview');
    } else if (tab === 'profile' || tab === 'settings' || tab === 'help' || tab === 'admin' || tab === 'notifications') {
      setActiveTab('dashboard');
      setActiveSubTab(tab);
    } else {
      // If direct module tab clicked (e.g. services, schemes, report, chat, docs)
      setActiveTab('dashboard');
      setActiveSubTab(tab);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sub-tab switcher inside Dashboard sidebar
  const handleSubTabChange = (sub: string) => {
    setActiveSubTab(sub);
    // If we leave chat tab, clear any preloaded queries
    if (sub !== 'chat') {
      setPreloadedQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Land page AI search submit
  const handleSearchSubmit = (query: string) => {
    setPreloadedQuery(query);
    setActiveTab('dashboard');
    setActiveSubTab('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast(
      currentLang === 'hi'
        ? 'आपके प्रश्न को एआई सहायक में स्थानांतरित कर दिया गया है।'
        : 'Query routed to AI Citizen Desk companion.',
      'success'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 relative overflow-hidden">
      
      {/* Frosted Glass Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 dark:bg-orange-600/20 blur-[120px] rounded-full transition-opacity duration-500" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 dark:bg-emerald-600/20 blur-[120px] rounded-full transition-opacity duration-500" />
        <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] bg-blue-600/10 dark:bg-blue-600/20 blur-[120px] rounded-full transition-opacity duration-500" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Dynamic Header Navbar */}
        <Navbar
          currentLang={currentLang}
          onLangChange={handleLangChange}
          isDarkMode={isDarkMode}
          onThemeToggle={handleThemeToggle}
          activeTab={activeTab === 'home' ? 'home' : activeSubTab}
          onTabChange={handleTabChange}
          user={user}
          onLogout={handleLogout}
          onTriggerAuth={() => setActiveTab('auth')}
        />

        {/* Main Content Layout switcher */}
        <div className="flex-1">
          {activeTab === 'home' ? (
            <LandingPage
              currentLang={currentLang}
              onTabChange={handleTabChange}
              onSearchSubmit={handleSearchSubmit}
            />
          ) : activeTab === 'auth' ? (
            <div className="max-w-md mx-auto py-12 px-4">
              <AuthPages
                currentLang={currentLang}
                onAuthSuccess={(userData) => {
                  setUser(userData);
                  localStorage.setItem('smart_bharat_user', JSON.stringify(userData));
                  setActiveTab('dashboard');
                  setActiveSubTab('overview');
                  toast(
                    currentLang === 'hi'
                      ? 'लॉगिन सफलतापूर्वक संपन्न हुआ!'
                      : 'Citizen profile synchronised successfully.',
                    'success'
                  );
                }}
                onCancel={() => {
                  setActiveTab('home');
                }}
              />
            </div>
          ) : (
            <Dashboard
              currentLang={currentLang}
              activeSubTab={activeSubTab}
              onSubTabChange={handleSubTabChange}
              preloadedQuery={preloadedQuery}
              onClearPreloadedQuery={() => setPreloadedQuery('')}
              user={user}
              isDarkMode={isDarkMode}
              onThemeToggle={handleThemeToggle}
              onLangChange={handleLangChange}
            />
          )}
        </div>

        {/* Shared SaaS styled footer */}
        <Footer currentLang={currentLang} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
