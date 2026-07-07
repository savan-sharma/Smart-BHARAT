/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Language, Service } from '../types';
import { SERVICES, TRANSLATIONS } from '../constants';
import { Search, Clock, CreditCard, ExternalLink, BookOpen, FileCheck, ArrowRight, ShieldCheck, Fingerprint, Award, Calendar } from 'lucide-react';
import { Dialog } from './ui/Dialog';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface ServicesHubProps {
  currentLang: Language;
}

const CATEGORIES = ['All', 'Identity & Authentication', 'Travel & Citizenship', 'Finance & Taxation', 'Elections & Democratic Rights'];

export const ServicesHub: React.FC<ServicesHubProps> = ({ currentLang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const t = (key: string) => TRANSLATIONS[key]?.[currentLang] || key;

  // Filter Services
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const nameText = (service.name[currentLang] || '').toLowerCase();
      const descText = (service.description[currentLang] || '').toLowerCase();
      const matchesSearch = nameText.includes(searchQuery.toLowerCase()) || descText.includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, currentLang]);

  // Icon selector based on service id
  const renderServiceIcon = (id: string) => {
    const iconClass = "w-6 h-6 text-indigo-600 dark:text-indigo-400";
    switch (id) {
      case 'aadhaar':
        return <Fingerprint className={iconClass} />;
      case 'passport':
        return <BookOpen className={iconClass} />;
      case 'pan':
        return <Award className={iconClass} />;
      case 'voter':
        return <Calendar className={iconClass} />;
      default:
        return <ShieldCheck className={iconClass} />;
    }
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Badge variant="primary" className="mb-3">
          Civic Directory
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          {currentLang === 'hi' ? 'नागरिक सेवा केंद्र' : 'National Civic Services Directory'}
        </h2>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          {currentLang === 'hi' 
            ? 'पूरी जानकारी, लगने वाले दस्तावेज़ और सीधे सरकारी आवेदन लिंक के साथ सभी प्रमुख नागरिक सेवाएं प्राप्त करें।'
            : 'Access step-by-step documentation timelines, service charges, and direct links to official government portals.'}
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              currentLang === 'hi' 
                ? 'आधार, पैन या वोटर आईडी कार्ड खोजें...' 
                : 'Search services (e.g., Aadhaar, PAN, Passport)...'
            }
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/40 dark:bg-slate-950/20 backdrop-blur-md border border-slate-200/50 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 shadow-xs transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 overflow-x-auto pb-1 max-w-3xl mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategory === cat
                  ? 'bg-indigo-600/90 border-indigo-600/30 text-white shadow-md shadow-indigo-500/10'
                  : 'bg-white/45 dark:bg-slate-950/25 border-slate-200/40 dark:border-white/5 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 backdrop-blur-xs'
              }`}
            >
              {cat === 'All' && (currentLang === 'hi' ? 'सभी सेवाएं' : 'All Services')}
              {cat !== 'All' && cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between group h-full relative overflow-hidden shadow-xs"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5">
                    {renderServiceIcon(service.id)}
                  </div>
                  <Badge variant="secondary">
                    {service.category}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {service.name[currentLang] || service.name['en']}
                </h3>
                <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {service.description[currentLang] || service.description['en']}
                </p>
              </div>

              {/* Card Footer Grid Details */}
              <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {currentLang === 'hi' ? 'प्रसंस्करण समय' : 'Processing Time'}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.processingTime[currentLang] || service.processingTime['en']}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedService(service)}
                  className="rounded-xl"
                >
                  {currentLang === 'hi' ? 'विवरण देखें' : 'View Guidelines'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-dashed border-slate-200/60 dark:border-white/10 rounded-3xl max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {currentLang === 'hi' ? 'कोई सेवा नहीं मिली' : 'No Services Found'}
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {currentLang === 'hi'
              ? 'कृपया कोई अन्य कीवर्ड आजमाएं या श्रेणी बदलें।'
              : "We couldn't find any services matching your search parameters."}
          </p>
        </div>
      )}

      {/* Service Detail Modal */}
      <Dialog
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name[currentLang] || ''}
      >
        {selectedService && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {currentLang === 'hi' ? 'विवरण' : 'About Service'}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedService.description[currentLang] || selectedService.description['en']}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {currentLang === 'hi' ? 'सरकारी शुल्क' : 'Service Cost / Fee'}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 leading-snug">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  {selectedService.fee[currentLang] || selectedService.fee['en']}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {currentLang === 'hi' ? 'प्रसंस्करण अवधि' : 'Official Timeline'}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 leading-snug">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  {selectedService.processingTime[currentLang] || selectedService.processingTime['en']}
                </span>
              </div>
            </div>

            {/* Mandatory Documents checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-500" />
                {currentLang === 'hi' ? 'आवश्यक दस्तावेज़' : 'Mandatory Document Checklists'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.requiredDocs.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <div className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Direct Portal Redirection */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                You will be redirected to the verified, official National Portal to apply.
              </span>
              <a
                href={selectedService.link}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="primary" className="w-full sm:w-auto group">
                  {currentLang === 'hi' ? 'आधिकारिक साइट पर जाएं' : 'Proceed to Official Portal'}
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
