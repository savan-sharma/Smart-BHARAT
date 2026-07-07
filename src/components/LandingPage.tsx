/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, Scheme, Service } from '../types';
import { SERVICES, SCHEMES, TRANSLATIONS } from '../constants';
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle, Star, Search, Check, FileText, Fingerprint, Award, AlertCircle, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Dialog } from './ui/Dialog';

interface LandingPageProps {
  currentLang: Language;
  onTabChange: (tab: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onTabChange,
  onSearchSubmit,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  const handleSearchSubmitLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearchSubmit(searchInput.trim());
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const FAQS = [
    {
      q: currentLang === 'hi' ? 'क्या यह पोर्टल सरकार द्वारा अधिकृत है?' : 'Is this portal officially affiliated with the government?',
      a: currentLang === 'hi' 
        ? 'यह एक डिजिटल भारत हैकथॉन प्रदर्शन प्रोजेक्ट है जो नागरिकों को सीधे सत्यापित सरकारी पोर्टल लिंक और योजनाओं के साथ मार्गदर्शन करने के लिए बनाया गया है।' 
        : 'Smart Bharat is a premium, proof-of-concept civic dashboard designed for hackathons. It integrates and routes citizens directly to official, verified Government of India portal links (like UIDAI, NVSP, and Passport Seva).',
    },
    {
      q: currentLang === 'hi' ? 'यह शिकायत निवारण को कैसे तेज करता है?' : 'How does the Civic Grievance module dispatch reported complaints?',
      a: currentLang === 'hi'
        ? 'हम आपके दर्ज शिकायत के पिनकोड के आधार पर स्वचालित रूप से संबंधित वार्ड अधिकारियों और इंजीनियरों को एसएमएस / ईमेल अलर्ट भेजकर समन्वय करते हैं।'
        : 'Once an issue is reported, our metadata engine parses the local Pincode and category to instantly route notifications to ward coordinators. Citizens can collectively upvote unresolved issues to raise their priority index.',
    },
    {
      q: currentLang === 'hi' ? 'क्या मेरी व्यक्तिगत जानकारी सुरक्षित है?' : 'Is my personal data secure on this platform?',
      a: currentLang === 'hi'
        ? 'हाँ, हम कोई संवेदनशील बायोमेट्रिक जानकारी संग्रहीत नहीं करते हैं। आपके सहेजे गए विवरण सत्र के बाद हटा दिए जाते हैं।'
        : 'Absolutely. We do not persist sensitive identity data on our databases. All eligibility questionnaires and bookmarks are safely localized, aligning with standard privacy guidelines.',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-transparent text-slate-800 dark:text-slate-100">
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="pt-16 pb-20 text-center lg:pt-24 lg:pb-28">
          <Badge variant="accent" className="mb-4 text-xs tracking-wide py-1 px-3 bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20">
            🇮🇳 Digital India Unified Civic Companion
          </Badge>
          
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6.5xl leading-none">
            Empowering Citizens with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-indigo-500 to-emerald-500 dark:from-orange-400 dark:via-indigo-400 dark:to-emerald-400">Intelligent Governance</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-500 dark:text-slate-400 sm:text-lg leading-relaxed font-medium">
            {t('heroSubtitle')}
          </p>

          {/* AI Search Bar Mock with Glow border */}
          <div className="mx-auto mt-10 max-w-2xl relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-indigo-500 to-emerald-500 rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <form onSubmit={handleSearchSubmitLocal} className="relative p-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t('aiSearchPlaceholder')}
                className="w-full bg-transparent border-0 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden py-3"
              />
              <Button type="submit" variant="primary" size="sm" className="rounded-xl shrink-0 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Query AI
              </Button>
            </form>
            
            {/* Quick Suggestions Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-400 relative z-10">
              <span>Try asking:</span>
              {[
                { en: 'Farmer Subsidies', hi: 'किसान योजना' },
                { en: 'Passport Timelines', hi: 'पासपोर्ट गाइड' },
                { en: 'Aadhaar Fee', hi: 'आधार शुल्क' },
              ].map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSearchInput(tag[currentLang] || tag.en);
                    onSearchSubmit(tag[currentLang] || tag.en);
                  }}
                  className="px-2.5 py-1 bg-white/60 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900/80 border border-slate-200/40 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-400 transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tag[currentLang] || tag.en}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* METRIC STATISTICS */}
        <section className="py-10 border border-slate-200/30 dark:border-white/10 mb-20 bg-white/30 dark:bg-slate-950/20 backdrop-blur-md rounded-3xl px-4 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { id: 'citizens', val: '4.8M+', key: 'statCitizens' },
              { id: 'services', val: '450+', key: 'statServices' },
              { id: 'resolved', val: '92%', key: 'statResolved' },
              { id: 'langs', val: '12+', key: 'statLanguages' },
            ].map((stat) => (
              <div key={stat.id} className="space-y-1">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 sm:text-4xl">
                  {stat.val}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {t(stat.key)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR GOVERNMENT SERVICES */}
        <section className="py-12 mb-20 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="accent">National Directory</Badge>
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2.5">
                {currentLang === 'hi' ? 'लोकप्रिय नागरिक सेवाएं' : 'Popular Civic Services'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
                Instant access to guidelines, processing timelines, fees, and application channels.
              </p>
            </div>
            <Button variant="outline" onClick={() => onTabChange('services')} className="shrink-0">
              View Directory
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 3).map((serv) => (
              <div
                key={serv.id}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-indigo-600 dark:text-indigo-400 mb-4 shadow-2xs">
                    {serv.id === 'aadhaar' && <Fingerprint className="w-5 h-5" />}
                    {serv.id === 'passport' && <FileText className="w-5 h-5" />}
                    {serv.id === 'pan' && <Award className="w-5 h-5" />}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {serv.name[currentLang] || serv.name.en}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {serv.description[currentLang] || serv.description.en}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {serv.processingTime[currentLang] || serv.processingTime.en}
                  </span>
                  <button
                    onClick={() => setSelectedService(serv)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer flex items-center gap-1"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GOVERNMENT SCHEMES COMPONENT PREVIEW */}
        <section className="py-12 mb-20 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="success">Welfare & Schemes</Badge>
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2.5">
                {currentLang === 'hi' ? 'प्रधानमंत्री प्रमुख योजनाएं' : 'Key Government Welfare Schemes'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
                Direct financial aids, agriculture credit loans, subsidies, and housing missions.
              </p>
            </div>
            <Button variant="outline" onClick={() => onTabChange('schemes')} className="shrink-0">
              Go to Scheme Finder
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHEMES.slice(0, 2).map((sch) => (
              <div
                key={sch.id}
                className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <Badge variant="primary">{sch.id.toUpperCase()}</Badge>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[200px]">
                      {sch.ministry[currentLang] || sch.ministry.en}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {sch.name[currentLang] || sch.name.en}
                  </h3>
                  <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {sch.description[currentLang] || sch.description.en}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Benefits
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {sch.benefits[currentLang] || sch.benefits.en}
                    </span>
                  </div>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedScheme(sch)}>
                    Apply Guide
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS TIMELINE */}
        <section className="py-12 mb-20 text-left">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Badge variant="primary">Process flow</Badge>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2.5">
              {t('howItWorks')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
              A smooth modern roadmap designed for direct public transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: currentLang === 'hi' ? 'विवरण दर्ज करें' : 'Demographic Assessment',
                desc: currentLang === 'hi' 
                  ? 'अपनी आयु, आय और श्रेणी का चयन करके योजनाओं की खोज शुरू करें।' 
                  : 'Specify age, occupation and income factors inside our matching questionnaire.',
              },
              {
                step: '02',
                title: currentLang === 'hi' ? 'एआई गाइडेंस' : 'Document Cleansing',
                desc: currentLang === 'hi'
                  ? 'हमारे साथी एआई से दस्तावेज नियम और फाइलिंग प्रक्रिया की गाइडलाइन प्राप्त करें।'
                  : 'Review required proofs (DOB, Address, Identity) via interactive checklists.',
              },
              {
                step: '03',
                title: currentLang === 'hi' ? 'शिकायत निपटान' : 'Unified Filing',
                desc: currentLang === 'hi'
                  ? 'सीधे सरकारी साइटों पर रीडायरेक्ट हों या पिनकोड आधारित शिकायत दर्ज करें।'
                  : 'Route directly to official application forms or raise geo-tagged local alerts.',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative glass-card p-6.5 rounded-3xl shadow-xs">
                <span className="text-4xl font-extrabold text-indigo-500/20 dark:text-indigo-400/10 block mb-3">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-12 mb-20 text-left bg-gradient-to-tr from-slate-900/60 to-slate-950/80 text-white rounded-3xl p-8 sm:p-12 border border-white/10 backdrop-blur-md relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 h-40 w-40 bg-indigo-500/15 blur-3xl rounded-full" />
          <div className="max-w-xl mb-10">
            <Badge variant="accent" className="bg-amber-500/10 text-amber-300 border-amber-500/20">Success Stories</Badge>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2.5">
              Empowering Millions Across Districts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: currentLang === 'hi' 
                  ? 'पीएम किसान योजना के लिए मुझे अपनी पात्रता जांचने में सिर्फ 2 मिनट लगे। यह मंच अद्भुत है!' 
                  : 'Using Scheme Finder, I calculated my eligibility for the MUDRA Yojana without middlemen. The document instructions were extremely clear.',
                author: 'Ramesh Patel',
                role: 'Agri-entrepreneur, Anand (Gujarat)',
              },
              {
                quote: currentLang === 'hi'
                  ? 'हमारे मोहल्ले की टूटी स्ट्रीट लाइट की शिकायत दर्ज करने के बाद, वार्ड इंजीनियर ने इसे 48 घंटे में ठीक कर दिया।'
                  : 'We reported a community garbage backlog in our ward, and it was assigned and resolved within 36 hours. Absolute transparency!',
                author: 'Sowmya Krishnan',
                role: 'Civic Coordinator, Chennai (Tamil Nadu)',
              },
            ].map((test, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-slate-300">
                  "{test.quote}"
                </p>
                <div>
                  <h4 className="text-sm font-bold text-white">{test.author}</h4>
                  <span className="text-[11px] text-slate-400 block">{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-12 mb-20 text-left max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2.5">
              {t('faqTitle')}
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-900/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${faqOpen[idx] ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen[idx] && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-200/40 dark:border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* POPULAR SERVICE DETAILS MODAL */}
      <Dialog
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name[currentLang] || ''}
      >
        {selectedService && (
          <div className="space-y-5">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {selectedService.description[currentLang] || selectedService.description.en}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block">PROCESSING TIMELINE</span>
                <span className="text-xs font-bold mt-1 block">{selectedService.processingTime[currentLang] || selectedService.processingTime.en}</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block">OFFICIAL FEE</span>
                <span className="text-xs font-bold mt-1 block">{selectedService.fee[currentLang] || selectedService.fee.en}</span>
              </div>
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-500 mb-2">REQUIRED DOCUMENTS</h5>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.requiredDocs.map((doc, idx) => (
                  <Badge key={idx} variant="secondary">
                    {doc}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
              <Button variant="primary" onClick={() => onTabChange('services')}>
                Proceed to Guide
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      {/* POPULAR SCHEME DETAILS MODAL */}
      <Dialog
        isOpen={selectedScheme !== null}
        onClose={() => setSelectedScheme(null)}
        title={selectedScheme?.name[currentLang] || ''}
      >
        {selectedScheme && (
          <div className="space-y-5">
            <div>
              <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">NODAL AGENCY</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{selectedScheme.ministry[currentLang] || selectedScheme.ministry.en}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {selectedScheme.description[currentLang] || selectedScheme.description.en}
            </p>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl">
              <span className="text-[9px] font-bold text-emerald-600 block uppercase mb-1">CASH OR WELFARE AID</span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">{selectedScheme.benefits[currentLang] || selectedScheme.benefits.en}</span>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
              <Button variant="primary" onClick={() => onTabChange('schemes')}>
                Check My Eligibility
              </Button>
            </div>
          </div>
        )}
      </Dialog>

    </div>
  );
};
