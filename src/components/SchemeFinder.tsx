/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Language, Scheme } from '../types';
import { SCHEMES } from '../constants';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';
import { useToast } from './ui/Toast';
import { SlidersHorizontal, Calculator, FileText, Check, Award, HelpCircle, ArrowRight, Bookmark, Landmark, Sparkles } from 'lucide-react';

interface SchemeFinderProps {
  currentLang: Language;
}

const OCCUPATIONS = [
  'Farmer',
  'Agriculture Land Owner',
  'Entrepreneur',
  'Small Business Owner',
  'Shopkeeper',
  'Artisan',
  'Low Income Group',
  'Middle Income Group',
  'Economically Weaker Section',
  'Below Poverty Line',
  'Ration Card Holders',
  'Other / Salaried',
];

export const SchemeFinder: React.FC<SchemeFinderProps> = ({ currentLang }) => {
  const { toast } = useToast();
  
  // Questionnaire states
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'Male' | 'Female' | 'All'>('All');
  const [income, setIncome] = useState<string>('150000');
  const [selectedOccupations, setSelectedOccupations] = useState<string[]>(['Farmer']);
  
  const [hasCalculated, setHasCalculated] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<string[]>([]);

  // Toggle occupation
  const handleOccupationToggle = (occ: string) => {
    setSelectedOccupations((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  // Profile-based Scheme matching algorithm
  const matchedSchemes = useMemo(() => {
    if (!hasCalculated) return [];

    const userAge = parseInt(age) || 0;
    const userIncome = parseInt(income) || 0;

    return SCHEMES.filter((scheme) => {
      // 1. Age validation
      if (scheme.eligibility.minAge && userAge < scheme.eligibility.minAge) return false;
      if (scheme.eligibility.maxAge && userAge > scheme.eligibility.maxAge) return false;

      // 2. Gender validation
      if (
        scheme.eligibility.gender &&
        scheme.eligibility.gender !== 'All' &&
        gender !== 'All' &&
        scheme.eligibility.gender !== gender
      ) {
        return false;
      }

      // 3. Income limits
      if (scheme.eligibility.incomeLimit && userIncome > scheme.eligibility.incomeLimit) {
        return false;
      }

      // 4. Occupation match
      if (scheme.eligibility.occupation && scheme.eligibility.occupation.length > 0) {
        const hasMatchingJob = scheme.eligibility.occupation.some((job) =>
          selectedOccupations.includes(job)
        );
        if (!hasMatchingJob) return false;
      }

      return true;
    });
  }, [hasCalculated, age, gender, income, selectedOccupations]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    toast(
      currentLang === 'hi'
        ? 'आपके प्रोफाइल के अनुसार योजनाओं की जांच की जा रही है...'
        : 'Analyzing scheme eligibility rules for your profile...',
      'info'
    );
  };

  const toggleBookmark = (id: string, name: string) => {
    setBookmarkedSchemes((prev) => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        toast(
          currentLang === 'hi'
            ? `योजना हटाई गई`
            : `Scheme bookmark removed successfully.`,
          'info'
        );
        return prev.filter((item) => item !== id);
      } else {
        toast(
          currentLang === 'hi'
            ? `योजना सफलतापूर्वक सहेजी गई!`
            : `Scheme added to your saved dashboard folder!`,
          'success'
        );
        return [...prev, id];
      }
    });
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Badge variant="accent" className="mb-3">
          Scheme Optimizer
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          {currentLang === 'hi' ? 'स्मार्ट योजना खोजक' : 'AI-Powered Government Scheme Finder'}
        </h2>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          {currentLang === 'hi'
            ? 'अपनी पात्रता की गणना करने और उपयुक्त सब्सिडी, सहायता और वित्तीय कल्याणकारी योजनाओं को खोजने के लिए त्वरित विवरण दर्ज करें।'
            : 'Find welfare benefit schemes, subsidies, and grants custom-matched to your demographic criteria.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Questionnaire Form - Left Column */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 rounded-xl">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {currentLang === 'hi' ? 'पात्रता विवरण भरें' : 'Eligibility Assessment'}
              </h3>
            </div>

            <form onSubmit={handleCalculate} className="space-y-5">
              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {currentLang === 'hi' ? 'आयु (वर्षों में)' : 'Age (in Years)'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {currentLang === 'hi' ? 'लिंग' : 'Gender'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['All', 'Male', 'Female'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        gender === g
                          ? 'bg-indigo-600/90 border-indigo-600/20 text-white shadow-xs'
                          : 'bg-white/30 dark:bg-white/5 border-slate-200/40 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/10 backdrop-blur-xs'
                      }`}
                    >
                      {g === 'All' && (currentLang === 'hi' ? 'सभी' : 'All')}
                      {g === 'Male' && (currentLang === 'hi' ? 'पुरुष' : 'Male')}
                      {g === 'Female' && (currentLang === 'hi' ? 'महिला' : 'Female')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Income */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {currentLang === 'hi' ? 'वार्षिक पारिवारिक आय (₹)' : 'Annual Household Income (₹)'}
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                />
              </div>

              {/* Occupation list checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {currentLang === 'hi' ? 'व्यवसाय / वर्ग श्रेणी' : 'Occupation / Segment Tags'}
                </label>
                <div className="max-h-44 overflow-y-auto border border-slate-200/40 dark:border-white/5 bg-white/20 dark:bg-slate-950/15 backdrop-blur-md rounded-xl p-3 space-y-1.5 scrollbar-thin">
                  {OCCUPATIONS.map((occ) => (
                    <label
                      key={occ}
                      className="flex items-center gap-2.5 px-2 py-1.5 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOccupations.includes(occ)}
                        onChange={() => handleOccupationToggle(occ)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                        {occ}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center">
                <Calculator className="w-4 h-4 mr-1.5" />
                {currentLang === 'hi' ? 'पात्रता की जाँच करें' : 'Analyze Matching Schemes'}
              </Button>
            </form>
          </div>
        </div>

        {/* Results - Right Column */}
        <div className="lg:col-span-7 flex flex-col">
          {!hasCalculated ? (
            <div className="bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-dashed border-slate-200/60 dark:border-white/10 rounded-3xl p-12 text-center flex-1 flex flex-col items-center justify-center min-h-[350px]">
              <div className="h-14 w-14 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center justify-center mb-4">
                <Calculator className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                {currentLang === 'hi' ? 'खोजने के लिए तैयार' : 'Ready to Match schemes'}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
                {currentLang === 'hi'
                  ? 'बाएँ पैनल में अपनी जनसांख्यिकी और आय श्रेणी दर्ज करें और तत्काल अपनी सुझाई गई कल्याणकारी योजनाओं को देखने के लिए जाँच बटन पर क्लिक करें।'
                  : 'Enter your demographics in the left panel to trigger our matching algorithm and inspect eligible benefit pools.'}
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-6">
              {/* Header metrics */}
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  {currentLang === 'hi'
                    ? `आपके लिए ${matchedSchemes.length} योजनाएं मिलीं`
                    : `Matched Schemes (${matchedSchemes.length})`}
                </h4>
                {bookmarkedSchemes.length > 0 && (
                  <Badge variant="success">
                    {currentLang === 'hi'
                      ? `${bookmarkedSchemes.length} सहेजी गई`
                      : `${bookmarkedSchemes.length} Saved`}
                  </Badge>
                )}
              </div>

              {matchedSchemes.length > 0 ? (
                <div className="space-y-4">
                  {matchedSchemes.map((scheme) => {
                    const isSaved = bookmarkedSchemes.includes(scheme.id);
                    return (
                      <div
                        key={scheme.id}
                        className="glass-card rounded-2xl p-5 flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          {/* Ministry and Actions */}
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                              <Landmark className="w-3 h-3" />
                              {scheme.ministry[currentLang] || scheme.ministry['en']}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleBookmark(scheme.id, scheme.name['en'])}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  isSaved
                                    ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400'
                                    : 'bg-transparent border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                }`}
                              >
                                <Bookmark className="w-4 h-4 fill-current" />
                              </button>
                            </div>
                          </div>

                          {/* Title */}
                          <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {scheme.name[currentLang] || scheme.name['en']}
                          </h4>
                          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {scheme.description[currentLang] || scheme.description['en']}
                          </p>
                        </div>

                        {/* Benefits breakdown */}
                        <div className="mt-4 pt-4 border-t border-slate-200/40 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="text-xs">
                            <span className="font-bold text-slate-400 uppercase block tracking-wider text-[9px] mb-0.5">
                              {currentLang === 'hi' ? 'मुख्य लाभ' : 'Estimated Benefits'}
                            </span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {scheme.benefits[currentLang] || scheme.benefits['en']}
                            </span>
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedScheme(scheme)}
                            className="rounded-xl shrink-0"
                          >
                            {currentLang === 'hi' ? 'आवेदन कैसे करें' : 'How to Apply'}
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-slate-200/60 dark:border-white/10 rounded-3xl p-10 text-center">
                  <HelpCircle className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    {currentLang === 'hi' ? 'कोई योजना योग्य नहीं पाई गई' : 'No Eligible Schemes Found'}
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    {currentLang === 'hi'
                      ? 'आपकी दी गई जनसांख्यिकी और आय स्तर के लिए कोई प्रत्यक्ष योजना मेल नहीं खाती। कृपया अन्य सीमाएँ दर्ज करें।'
                      : 'No schemes currently match all criteria perfectly. Try tweaking your household income threshold or occupation sectors.'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scheme Detail Dialog */}
      <Dialog
        isOpen={selectedScheme !== null}
        onClose={() => setSelectedScheme(null)}
        title={selectedScheme?.name[currentLang] || ''}
      >
        {selectedScheme && (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {currentLang === 'hi' ? 'संबंधित मंत्रालय' : 'Nodal Agency / Ministry'}
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Landmark className="w-4 h-4" />
                {selectedScheme.ministry[currentLang] || selectedScheme.ministry['en']}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                {currentLang === 'hi' ? 'योजना का उद्देश्य' : 'Scheme Objectives'}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedScheme.description[currentLang] || selectedScheme.description['en']}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                {currentLang === 'hi' ? 'कल्याणकारी लाभ विवरण' : 'Welfare Benefit Breakdown'}
              </span>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                {selectedScheme.benefits[currentLang] || selectedScheme.benefits['en']}
              </p>
            </div>

            {/* Document checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                {currentLang === 'hi' ? 'आवेदन हेतु आवश्यक दस्तावेज़' : 'Documents Required for Verification'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedScheme.documentsRequired.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            {/* Application steps guide mock */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
              <h5 className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-2">
                {currentLang === 'hi' ? 'ऑनलाइन आवेदन करने के चरण' : 'Verification and Application Steps'}
              </h5>
              <ol className="list-decimal list-inside text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium">
                <li>Assemble all required digital credentials from the verification checklist.</li>
                <li>Submit Aadhaar biometric seeding authentication at your nearest CSC hub.</li>
                <li>Register online on the centralized DBT portal of the respective ministry.</li>
                <li>Submit land record or income statements in PDF formats.</li>
              </ol>
            </div>

            {/* Close */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right">
              <Button variant="primary" onClick={() => setSelectedScheme(null)}>
                Close Guidelines
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
