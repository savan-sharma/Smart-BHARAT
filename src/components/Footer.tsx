/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Sparkles, Shield, Heart, HelpCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onTabChange: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onTabChange }) => {
  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  return (
    <footer className="border-t border-slate-200/40 bg-white/5 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/25 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('brand')}
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4 text-slate-500">
              An AI-powered unified ecosystem for direct access to public services, interactive state-level matching of schemes, and immediate civic complaints resolution.
            </p>
            <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              Secure Public Gateway
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Portal Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { id: 'dashboard', label: 'Citizen Dashboard' },
                { id: 'services', label: 'Civic Services Directory' },
                { id: 'schemes', label: 'Eligibility Scheme Matcher' },
                { id: 'report', label: 'Civic Grievance Feed' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onTabChange(link.id)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              National Resources
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'National Portal of India', url: 'https://www.india.gov.in' },
                { label: 'MyGov - Citizen Engagement', url: 'https://www.mygov.in' },
                { label: 'UIDAI - Aadhaar Portal', url: 'https://uidai.gov.in' },
                { label: 'Digital India Initiative', url: 'https://digitalindia.gov.in' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              AI Support Hub
            </h4>
            <p className="text-xs leading-relaxed text-slate-500 mb-3">
              Need immediate clarification or guidance on documentation workflows? Try our live AI Companion.
            </p>
            <button
              onClick={() => onTabChange('chat')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 dark:text-indigo-400 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Launch Assistant
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200/40 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Smart Bharat. Government Linkage and Verification Portal.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Digital India Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
};
