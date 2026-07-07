/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, CivicIssue } from '../types';
import { ServicesHub } from './ServicesHub';
import { SchemeFinder } from './SchemeFinder';
import { IssueReporter } from './IssueReporter';
import { ChatAssistant } from './ChatAssistant';
import { DocumentHelper } from './DocumentHelper';
import { ProfilePage } from './ProfilePage';
import { SettingsPage } from './SettingsPage';
import { HelpCenter } from './HelpCenter';
import { AdminDashboard } from './AdminDashboard';
import { ComplaintTracker } from './ComplaintTracker';
import { NotificationsPage } from './NotificationsPage';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Sparkles,
  SearchCode,
  FileSpreadsheet,
  AlertOctagon,
  FileSignature,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ThumbsUp,
  MapPin,
  ListFilter,
  CheckCircle,
  HelpCircle,
  FolderOpen,
  User,
  Bell,
  ShieldAlert,
  Settings
} from 'lucide-react';

interface DashboardProps {
  currentLang: Language;
  activeSubTab: string;
  onSubTabChange: (sub: string) => void;
  preloadedQuery?: string;
  onClearPreloadedQuery?: () => void;
  user: any;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onLangChange: (lang: Language) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentLang,
  activeSubTab,
  onSubTabChange,
  preloadedQuery,
  onClearPreloadedQuery,
  user,
  isDarkMode,
  onThemeToggle,
  onLangChange,
}) => {
  const { toast } = useToast();
  const [complaintCount, setComplaintCount] = useState(3);
  const [solvedCount, setSolvedCount] = useState(1);

  // Monitor complaint storage count to show live metrics in dashboard overview
  useEffect(() => {
    const checkGrievances = () => {
      const saved = localStorage.getItem('smart_bharat_civic_issues');
      if (saved) {
        try {
          const parsed: CivicIssue[] = JSON.parse(saved);
          setComplaintCount(parsed.length);
          setSolvedCount(parsed.filter((i) => i.status === 'Resolved').length);
        } catch (e) {
          // ignore
        }
      }
    };
    checkGrievances();
    // Also poll occasionally or on tab change
    const interval = setInterval(checkGrievances, 2500);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    // Core Tools
    { id: 'overview', label: currentLang === 'hi' ? 'सामान्य अवलोकन' : 'Overview', icon: LayoutDashboard },
    { id: 'services', label: currentLang === 'hi' ? 'नागरिक सेवाएं' : 'Civic Services', icon: SearchCode },
    { id: 'schemes', label: currentLang === 'hi' ? 'योजना खोजक' : 'Scheme Matcher', icon: FileSpreadsheet },
    { id: 'report', label: currentLang === 'hi' ? 'शिकायत फ़ीड' : 'Grievance Feed', icon: AlertOctagon },
    { id: 'tracker', label: currentLang === 'hi' ? 'शिकायत ट्रैकर' : 'Complaint Tracker', icon: Clock },
    { id: 'docs', label: currentLang === 'hi' ? 'दस्तावेज़ हब' : 'Document Hub', icon: FileSignature },
    { id: 'chat', label: currentLang === 'hi' ? 'एआई सहायक' : 'AI Companion', icon: Sparkles },
    
    // User Portfolio
    { id: 'profile', label: currentLang === 'hi' ? 'मेरा पोर्टफोलियो' : 'My Portfolio', icon: User },
    { id: 'notifications', label: currentLang === 'hi' ? 'सूचनाएं' : 'Notifications', icon: Bell },
    { id: 'admin', label: currentLang === 'hi' ? 'व्यवस्थापक हब' : 'Admin Hub', icon: ShieldAlert },
    { id: 'help', label: currentLang === 'hi' ? 'सहायता केंद्र' : 'Support Desk', icon: HelpCircle },
    { id: 'settings', label: currentLang === 'hi' ? 'सेटिंग्स' : 'Settings', icon: Settings },
  ];

  // Render the matched tab content
  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case 'services':
        return <ServicesHub currentLang={currentLang} />;
      case 'schemes':
        return <SchemeFinder currentLang={currentLang} />;
      case 'report':
        return <IssueReporter currentLang={currentLang} />;
      case 'tracker':
        return <ComplaintTracker currentLang={currentLang} />;
      case 'docs':
        return <DocumentHelper currentLang={currentLang} />;
      case 'chat':
        return (
          <ChatAssistant
            currentLang={currentLang}
            initialQuery={preloadedQuery}
          />
        );
      case 'profile':
        return <ProfilePage currentLang={currentLang} />;
      case 'notifications':
        return <NotificationsPage currentLang={currentLang} />;
      case 'admin':
        return <AdminDashboard currentLang={currentLang} />;
      case 'help':
        return <HelpCenter currentLang={currentLang} />;
      case 'settings':
        return (
          <SettingsPage
            currentLang={currentLang}
            onLangChange={onLangChange}
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
          />
        );
      case 'overview':
      default:
        return renderOverview();
    }
  };

  // Main administrative control center overview screen
  const renderOverview = () => {
    return (
      <div className="space-y-8 animate-fade-in text-left">
        {/* Top welcome banner */}
        <div className="bg-gradient-to-tr from-indigo-950/80 via-slate-900/90 to-slate-950 text-white rounded-3xl p-6.5 sm:p-8 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-lg">
          <div className="absolute right-0 bottom-0 h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-xl">
            <Badge variant="accent" className="mb-3.5 bg-amber-500/10 text-amber-300 border-amber-500/20">
              🇮🇳 Citizen Portal Live
            </Badge>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold tracking-tight leading-none">
              Welcome to Smart Bharat Desk
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Access localized verification checklists, run customized criteria scheme queries, or audit local grievance feeds on ground.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button
                variant="accent"
                size="sm"
                onClick={() => onSubTabChange('schemes')}
                className="bg-amber-500 hover:bg-amber-600 font-bold"
              >
                Match Schemes
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSubTabChange('chat')}
                className="text-white hover:bg-white/10 font-semibold"
              >
                Launch Companion
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Metric metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
          {[
            {
              label: 'My Grievance Reports',
              val: complaintCount,
              desc: `${complaintCount - solvedCount} active in community`,
              icon: AlertOctagon,
              color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30',
            },
            {
              label: 'Resolved Reports',
              val: solvedCount,
              desc: 'Closed by ward coordinators',
              icon: CheckCircle,
              color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
            },
            {
              label: 'Identity Services',
              val: '4',
              desc: 'Indexed document checklists',
              icon: FileSignature,
              color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30',
            },
            {
              label: 'Indexed Schemes',
              val: '4',
              desc: 'National welfare subsidies',
              icon: FileSpreadsheet,
              color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl flex items-center justify-between shadow-2xs hover:scale-101 transition-all"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.label}
                </span>
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">
                  {item.val}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">
                  {item.desc}
                </span>
              </div>
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="w-5.5 h-5.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Double Column Panel: Mini interactive widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Municipal Activity SVG Chart */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6.5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4.5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4.5 h-4.5 text-indigo-500" />
                  Grievance Resolution Speed
                </h3>
                <Badge variant="success">District Avg: 36 Hrs</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                Simulated response analytics for resolving civic complaints reported inside Ward coordinates.
              </p>
            </div>

            {/* Custom Interactive SVG Graph bar representation */}
            <div className="space-y-4">
              <div className="h-40 w-full flex items-end gap-3.5 pt-4 border-b border-slate-100 dark:border-slate-800 pb-2 relative">
                
                {/* Horizontal reference lines */}
                <div className="absolute top-2 left-0 right-0 border-t border-slate-100 dark:border-slate-800/60" />
                <div className="absolute top-1/2 left-0 right-0 border-t border-slate-100 dark:border-slate-800/60" />

                {[
                  { label: 'Mon', count: 48, fill: 'bg-indigo-500' },
                  { label: 'Tue', count: 82, fill: 'bg-indigo-500' },
                  { label: 'Wed', count: 64, fill: 'bg-indigo-500' },
                  { label: 'Thu', count: 91, fill: 'bg-emerald-500 animate-pulse' },
                  { label: 'Fri', count: 52, fill: 'bg-indigo-500' },
                  { label: 'Sat', count: 41, fill: 'bg-indigo-500' },
                  { label: 'Sun', count: 33, fill: 'bg-indigo-500' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                    {/* Tooltip on hover */}
                    <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-slate-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-transform z-10 shadow-md">
                      {bar.count}%
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${bar.fill}`}
                      style={{ height: `${bar.count}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-400">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-1">
                <span className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  Resolved (Weekly avg)
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Live Ward Speed (Today)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6.5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2.5">
                <FolderOpen className="w-4.5 h-4.5 text-indigo-500" />
                Quick Actions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
                Skip menus and jump straight to crucial public procedures.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Calculate PMAY Subsidy', target: 'schemes' },
                { label: 'New Passport Checklist', target: 'docs' },
                { label: 'File Grievance Alert', target: 'report' },
                { label: 'Aadhaar Center Locations', target: 'services' },
              ].map((act, i) => (
                <button
                  key={i}
                  onClick={() => onSubTabChange(act.target)}
                  className="w-full flex items-center justify-between p-3 border border-slate-200/40 dark:border-white/5 rounded-xl text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {act.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar Nav for Desktop */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-4 glass-card p-4.5 rounded-3xl shadow-2xs">
            <div className="px-3 py-1.5 bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 rounded-xl mb-4 text-left font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Session Pincode
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
                National Portal Gateway
              </span>
            </div>

            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSubTabChange(item.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer lg:w-full text-left ${
                      activeSubTab === item.id
                        ? 'bg-indigo-600/95 hover:bg-indigo-600 text-white border border-indigo-500/20 shadow-md shadow-indigo-500/10'
                        : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Workspace content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderSubTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};
