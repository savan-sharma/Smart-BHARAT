/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  Settings,
  Languages,
  Bell,
  Eye,
  Shield,
  Key,
  Database,
  CheckCircle2,
  Lock,
  Volume2,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  CloudLightning,
  AlertCircle
} from 'lucide-react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';

interface SettingsPageProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentLang,
  onLangChange,
  isDarkMode,
  onThemeToggle,
}) => {
  const { toast } = useToast();

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [grievanceUpdates, setGrievanceUpdates] = useState(true);

  // Accessibility states
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Security / Privacy states
  const [aadhaarDataLocked, setAadhaarDataLocked] = useState(false);
  const [digilockerConnected, setDigilockerConnected] = useState(true);

  const handleSaveNotificationSettings = () => {
    toast('Notification preferences applied.', 'success');
  };

  const handleSaveAccessibilitySettings = () => {
    toast('Accessibility options synced.', 'info');
  };

  const handleClearCache = () => {
    toast('Offline cache successfully cleared.', 'success');
  };

  const handleLockAadhaar = () => {
    setAadhaarDataLocked(!aadhaarDataLocked);
    toast(
      aadhaarDataLocked
        ? 'Aadhaar biometric verification unlocked.'
        : 'Aadhaar biometric parameters locked.',
      'info'
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-500" />
          {currentLang === 'hi' ? 'सेटिंग्स और प्राथमिकताएं' : 'Portal Settings & Config'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
          Customize interface behaviors, notifications, accessibility assistance, and encrypted biometrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side: Navigation Links */}
        <div className="md:col-span-4 space-y-2">
          <div className="p-2.5 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 block">
              Categories
            </span>
            {[
              { label: 'Appearance & Language', icon: Languages },
              { label: 'Notifications Alerts', icon: Bell },
              { label: 'Accessibility Aid', icon: Eye },
              { label: 'Privacy & DigiLocker', icon: Shield },
              { label: 'Security Password', icon: Key },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                  idx === 0
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
            <CloudLightning className="w-5 h-5 text-amber-500 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider">
                Offline Capabilities
              </h4>
              <p className="text-[10px] leading-relaxed text-amber-700 dark:text-amber-300 font-medium">
                This app is optimized to sync cached checklists and reported grievances locally once internet cuts.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form details */}
        <div className="md:col-span-8 space-y-6">
          {/* Section 1: Visual Theme & Language */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-white/5 uppercase tracking-wider flex items-center gap-2">
              <Languages className="w-4.5 h-4.5 text-indigo-500" />
              Appearance & Language
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Dark Mode Mode</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Toggle between light/dark visual theme styles.</p>
                </div>
                <button
                  onClick={onThemeToggle}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer relative flex items-center ${
                    isDarkMode ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <span className="w-4.5 h-4.5 rounded-full bg-white shadow-md block" />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200/40 dark:border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Language System</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Select preferred language for regional communications.</p>
                </div>
                <select
                  value={currentLang}
                  onChange={(e) => onLangChange(e.target.value as Language)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white dark:bg-slate-950 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Notifications Config */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-white/5 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4.5 h-4.5 text-indigo-500" />
              Notifications & Alerts
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Push Alerts for Grievances</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Get live reports as ward offices review your tickets.</p>
                </div>
                <input
                  type="checkbox"
                  checked={grievanceUpdates}
                  onChange={(e) => setGrievanceUpdates(e.target.checked)}
                  className="accent-indigo-600 h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">SMS Verification Codes</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Receive secondary confirmation codes on phone.</p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="accent-indigo-600 h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Welfare Digest Digest</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Receive weekly matched scheme digests via Email.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="accent-indigo-600 h-4 w-4"
                />
              </div>

              <Button variant="outline" size="sm" onClick={handleSaveNotificationSettings} className="rounded-xl font-bold mt-2">
                Apply Preferences
              </Button>
            </div>
          </div>

          {/* Section 3: Accessibility Settings */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-white/5 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4.5 h-4.5 text-indigo-500" />
              Accessibility Assistance
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Screen Reader Assistance</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Provides audio voiceover text-to-speech feedbacks on click.</p>
                </div>
                <input
                  type="checkbox"
                  checked={textToSpeech}
                  onChange={(e) => setTextToSpeech(e.target.checked)}
                  className="accent-indigo-600 h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">High Contrast Mode</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Sharpens color layers for easier reading.</p>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="accent-indigo-600 h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between pt-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Font Dimension</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Increase portal-wide layout typography sizes.</p>
                </div>
                <div className="flex gap-1.5 bg-slate-900/5 dark:bg-white/5 p-1 rounded-xl border border-slate-200/40 dark:border-white/5">
                  {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition-colors ${
                        fontSize === sz
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={handleSaveAccessibilitySettings} className="rounded-xl font-bold mt-2">
                Apply Accessibility
              </Button>
            </div>
          </div>

          {/* Section 4: Privacy & Encrypted Data */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-white/5 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-indigo-500" />
              Privacy & DigiLocker Links
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Aadhaar Bio Lock</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Secures your registered biometric profile against queries.</p>
                </div>
                <button
                  onClick={handleLockAadhaar}
                  className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer relative flex items-center ${
                    aadhaarDataLocked ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'
                  }`}
                >
                  <span className="w-4.5 h-4.5 rounded-full bg-white shadow-md block" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/40 dark:border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">DigiLocker Consent Bridge</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Authorizes electronic data synchronization with UIDAI registry.</p>
                </div>
                <Badge
                  variant={digilockerConnected ? 'success' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => {
                    setDigilockerConnected(!digilockerConnected);
                    toast(
                      digilockerConnected
                        ? 'DigiLocker access revoked.'
                        : 'DigiLocker bridge linked successfully.',
                      'info'
                    );
                  }}
                >
                  {digilockerConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/40 dark:border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Cache offline data</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Clear pre-downloaded PDF application checklists to free up room.</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleClearCache} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/15 rounded-xl font-bold">
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Clear Cache
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
