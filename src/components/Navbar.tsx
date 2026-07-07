/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../constants';
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  LogIn,
  Globe,
  Bell,
  Search,
  User,
  Settings,
  HelpCircle,
  ShieldAlert,
  LogOut,
  ChevronDown,
  Check,
  AlertTriangle,
  Bookmark
} from 'lucide-react';
import { Button } from './ui/Button';

interface NavbarProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  user: any;
  onLogout: () => void;
  onTriggerAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLangChange,
  isDarkMode,
  onThemeToggle,
  activeTab,
  onTabChange,
  user,
  onLogout,
  onTriggerAuth,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  // Mock notifications inside the dropdown
  const [dropdownNotifications, setDropdownNotifications] = useState([
    { id: 'n1', title: 'Grievance Stage: In Progress', desc: 'Sanitary team cleared Outer Ring Road clog.', category: 'complaint', isRead: false },
    { id: 'n2', title: 'MUDRA Loan Subsidy Match!', descriptor: 'Qualify for up to ₹10 Lakhs business loan.', category: 'scheme', isRead: false },
    { id: 'n3', title: 'Aadhaar Biometric Warning', desc: 'Verify biometric security in profile setup.', category: 'alert', isRead: true },
  ]);

  const unreadCount = dropdownNotifications.filter(n => !n.isRead).length;

  const handleGlobalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Set query inside localStorage and trigger tab change to ai chat
    localStorage.setItem('smart_bharat_preloaded_query', searchQuery);
    onTabChange('chat');
    setSearchQuery('');
  };

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'dashboard', label: t('dashboard') },
    { id: 'services', label: t('services') },
    { id: 'schemes', label: t('schemes') },
    { id: 'report', label: t('reportIssue') },
    { id: 'chat', label: t('aiAssistant') },
    { id: 'docs', label: t('docHub') },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setIsOpen(false);
  };

  const markAllRead = () => {
    setDropdownNotifications(dropdownNotifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/40 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/40 transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onTabChange('home')}
          className="flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer text-left shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 via-white to-emerald-500 shadow-lg shadow-orange-500/10 text-slate-900 border border-white/20">
            <Sparkles className="h-5 w-5 animate-pulse text-indigo-950" />
          </div>
          <div className="hidden sm:block">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white block leading-none">
              {t('brand')}
            </span>
            <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 block uppercase tracking-wider mt-0.5">
              {t('companion')}
            </span>
          </div>
        </button>

        {/* Global Search Bar (Middle) */}
        <form onSubmit={handleGlobalSearchSubmit} className="hidden md:flex items-center relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search portal (e.g. Mudra, Passport)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
          />
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-0.5 shrink-0">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === item.id
                  ? 'bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Utility Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:hover:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer backdrop-blur-xs"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowLangMenu(!showLangMenu);
                setShowNotifications(false);
                setShowProfileMenu(false);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 text-slate-700 dark:border-white/10 dark:hover:bg-white/5 dark:text-slate-300 transition-colors cursor-pointer text-xs font-bold backdrop-blur-xs"
            >
              <Globe className="h-4 w-4 text-slate-400" />
              {LANGUAGES.find((l) => l.code === currentLang)?.label.split(' ')[0]}
            </button>

            {showLangMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200/50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md p-1 shadow-xl dark:border-white/10 z-20 text-left">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLangChange(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                          : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Notifications Dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowLangMenu(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 rounded-xl border border-slate-200/50 hover:bg-slate-50/50 text-slate-500 hover:text-slate-800 dark:border-white/10 dark:hover:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer relative"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 rounded-3xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-2xl dark:border-white/10 p-4 z-20 space-y-3.5 text-left text-xs font-semibold">
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/40 dark:border-white/5">
                      <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">
                        Notifications ({unreadCount} Unread)
                      </span>
                      <button onClick={markAllRead} className="text-[10px] text-indigo-500 font-bold hover:underline">
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-none">
                      {dropdownNotifications.map(n => (
                        <div key={n.id} className="p-2.5 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors flex gap-2">
                          <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                            n.category === 'complaint' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'
                          }`}>
                            {n.category === 'complaint' ? <AlertTriangle className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className={`font-bold text-slate-800 dark:text-slate-200 truncate max-w-[190px] ${!n.isRead ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                              {n.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 truncate max-w-[190px]">
                              {n.desc || n.descriptor}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2.5 border-t border-slate-200/40 dark:border-white/5 text-center">
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          onTabChange('notifications');
                        }}
                        className="text-[11px] text-indigo-500 font-bold hover:underline"
                      >
                        Open Notifications Dashboard
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* User Auth Selector */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                  setShowLangMenu(false);
                }}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-slate-900/5 dark:hover:bg-white/5 cursor-pointer"
              >
                <div className="h-8.5 w-8.5 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-sm shrink-0">
                  <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200/50 bg-white dark:bg-slate-900 shadow-2xl dark:border-white/10 p-1.5 z-20 text-left text-xs font-semibold space-y-0.5">
                    <div className="px-3 py-2 border-b border-slate-200/40 dark:border-white/5 mb-1 text-slate-500 dark:text-slate-400">
                      <span className="font-extrabold text-slate-900 dark:text-white block truncate">{user.name}</span>
                      <span className="text-[10px] block truncate">{user.email}</span>
                    </div>

                    {[
                      { label: 'My Portfolio', icon: User, action: () => onTabChange('profile') },
                      { label: 'Administration Hub', icon: ShieldAlert, action: () => onTabChange('admin') },
                      { label: 'Portal Preferences', icon: Settings, action: () => onTabChange('settings') },
                      { label: 'Help Desk Support', icon: HelpCircle, action: () => onTabChange('help') },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5 transition-all flex items-center gap-2.5 cursor-pointer"
                      >
                        <item.icon className="w-4 h-4 text-slate-400" />
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        onLogout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all flex items-center gap-2.5 border-t border-slate-200/40 dark:border-white/5 mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={onTriggerAuth}>
              <LogIn className="h-4 w-4 mr-1.5" />
              Sign In / Access
            </Button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5 cursor-pointer"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200/40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md px-4 py-4 shadow-xl dark:border-white/10 text-left">
          {user && (
            <div className="px-4 py-3 border-b border-slate-200/30 dark:border-white/10 mb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-xs shrink-0">
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 dark:text-white block leading-none">{user.name}</span>
                <span className="text-[10px] text-slate-400 mt-1 block">{user.email}</span>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/10'
                    : 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-200/30 dark:border-white/10 mt-2 space-y-2">
              {user ? (
                <>
                  <Button variant="outline" className="w-full justify-center rounded-xl" onClick={() => handleNavClick('profile')}>
                    My Portfolio
                  </Button>
                  <Button variant="ghost" className="w-full justify-center rounded-xl text-rose-500 hover:bg-rose-500/10" onClick={() => { onLogout(); setIsOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => { onTriggerAuth(); setIsOpen(false); }}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In / Access
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

