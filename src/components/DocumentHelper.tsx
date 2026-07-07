/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { FileText, Download, CheckCircle, Info, ExternalLink, ShieldCheck, HeartPulse, UserCheck, CreditCard, ChevronRight } from 'lucide-react';

interface DocumentHelperProps {
  currentLang: Language;
}

interface DocGuide {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  fee: string;
  timeline: string;
  steps: string[];
  tips: string[];
  formName: string;
}

const DOCUMENT_GUIDES: DocGuide[] = [
  {
    id: 'aadhaar-guide',
    name: {
      en: 'Aadhaar Verification',
      hi: 'आधार बायोमेट्रिक सत्यापन',
      ta: 'ஆதார் சரிபார்ப்பு',
      te: 'ఆధార్ ధృవీకరణ',
      mr: 'आधार पडताळणी',
      bn: 'আধার যাচাইকরণ',
    },
    subtitle: {
      en: 'Biometrics and credentials seeding guide',
      hi: 'बायोमेट्रिक्स और क्रेडेंशियल लिंकिंग गाइड',
      ta: 'கைரேகை மற்றும் சான்றுகள் இணைப்பு வழிகாட்டி',
      te: 'బయోమెట్రిక్స్ మరియు ఆధారాలు అనుసంధాన మార్గదర్శకం',
      mr: 'बायोमेट्रिक्स आणि क्रेडेन्शियल्स सीडिंग मार्गदर्शक',
      bn: 'বায়োমেট্রিক্স এবং শংসাপত্র সংযোগকারী নির্দেশিকা',
    },
    fee: '₹50 (Demographic) / ₹100 (Biometric)',
    timeline: '10-15 working days',
    steps: [
      'Locate your nearest official Aadhaar Enrolment Kendra.',
      'Carry physical copies of Proof of Identity (POI) and Proof of Address (POA).',
      'Fill up the physical Aadhaar Enrolment/Correction form.',
      'Submit biometrics scans (iris and ten fingerprints) at the station.',
      'Receive your 14-digit Enrolment ID slip for online status tracking.',
    ],
    tips: [
      'Ensure the spelling of your name matches EXACTLY across PAN and Proof of Birth.',
      'Your linked mobile number must be active to receive security OTPs.',
    ],
    formName: 'Aadhaar_Enrolment_Correction_Form.pdf',
  },
  {
    id: 'pan-guide',
    name: {
      en: 'PAN Card Allocation',
      hi: 'पैन कार्ड आवंटन नियम',
      ta: 'பான் அட்டை ஒதுக்கீடு',
      te: 'పాన్ కార్డ్ కేటాయింపు',
      mr: 'पॅन कार्ड वाटप',
      bn: 'প্যান কার্ড বরাদ্দ',
    },
    subtitle: {
      en: 'Permanent Account Number registration procedures',
      hi: 'स्थायी खाता संख्या पंजीकरण प्रक्रियाएं',
      ta: 'பான் அட்டை பதிவு நடைமுறைகள்',
      te: 'శాశ్వత ఖాతా సంఖ్య నమోదు విధానాలు',
      mr: 'पॅन कार्ड नोंदणी प्रक्रिया',
      bn: 'স্থায়ী অ্যাকাউন্ট নম্বর নথিভুক্তিকরণ প্রক্রিয়া',
    },
    fee: '₹107 (Physical Card) / ₹66 (e-PAN only)',
    timeline: '5-10 working days',
    steps: [
      'Visit the official NSDL or UTITSL website.',
      'Fill up Form 49A (for Indian Citizens) online.',
      'Submit Aadhaar details to enable paperless e-KYC instant processing.',
      'Pay the application fee via net-banking or debit card.',
      'Digitally sign using Aadhaar OTP or post physical documents to NSDL Pune.',
    ],
    tips: [
      'No physical document submission is required if you choose the e-Sign Aadhaar route.',
      'Keep a scanned copy of your clear signature ready for digital upload.',
    ],
    formName: 'Form_49A_PAN_Indian_Citizens.pdf',
  },
  {
    id: 'passport-guide',
    name: {
      en: 'Passport Issuance',
      hi: 'पासपोर्ट जारी करने की प्रक्रिया',
      ta: 'கடவுச்சீட்டு வழங்குதல்',
      te: 'పాస్‌పోర్ట్ జారీ',
      mr: 'पासपोर्ट जारी करण्याची प्रक्रिया',
      bn: 'পাসপোর্ট ইস্যুকরণ',
    },
    subtitle: {
      en: 'Step-by-step document preparation checklist',
      hi: 'चरण-दर-चरण दस्तावेज़ तैयारी चेकलिस्ट',
      ta: 'படிபடியாக ஆவணங்கள் தயாரிக்கும் சரிபார்ப்புப் பட்டியல்',
      te: 'దశలవారీగా పత్రాల తయారీ తనిఖీ జాబితా',
      mr: 'तपशीलवार दस्तऐवज तयारी चेकलिस्ट',
      bn: 'ধাপে ধাপে নথি প্রস্তুত করার চেকলিস্ট',
    },
    fee: '₹1,500 (Normal) / ₹3,500 (Tatkaal)',
    timeline: '15-20 days (Normal) / 3-5 days (Tatkaal)',
    steps: [
      'Register on the Passport Seva Online Portal.',
      'Select your nearest Passport Seva Kendra (PSK) or Post Office PSK.',
      'Fill out the online application and schedule an appointment.',
      'Pay the fee online to confirm your appointment slot.',
      'Visit the PSK with ALL original physical documents for verification.',
      'Undergo local Police Verification at your registered address.',
    ],
    tips: [
      'ECR (Emigration Check Required) is applied by default if you do not attach matriculation details.',
      'Verify that your current living address has active proof of residence for at least 1 year.',
    ],
    formName: 'Passport_Seva_Online_Form_Manual.pdf',
  },
];

export const DocumentHelper: React.FC<DocumentHelperProps> = ({ currentLang }) => {
  const { toast } = useToast();
  const [activeGuide, setActiveGuide] = useState<string>(DOCUMENT_GUIDES[0].id);

  const selectedGuide = DOCUMENT_GUIDES.find((g) => g.id === activeGuide) || DOCUMENT_GUIDES[0];

  const handleDownload = (formName: string) => {
    toast(
      currentLang === 'hi'
        ? `दस्तावेज़ डाउनलोड शुरू हुआ: ${formName}`
        : `Simulated download started for ${formName}`,
      'success'
    );
  };

  return (
    <div className="py-8 animate-fade-in text-left">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Badge variant="info" className="mb-3">
          Document Hub
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          {currentLang === 'hi' ? 'दस्तावेज़ सहायता केंद्र' : 'Citizen Document Hub'}
        </h2>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          {currentLang === 'hi'
            ? 'अपनी पहचान पत्र, कर और नागरिक साख को सत्यापित करने के लिए आवश्यकताओं, आधिकारिक सरकारी प्रपत्रों और आवश्यक सावधानियों को समझें।'
            : 'Explore validation steps, official form downloads, and critical filing advice to secure identity cards.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Left Side: Document List Selection */}
        <div className="lg:col-span-4 space-y-3">
          {DOCUMENT_GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActiveGuide(guide.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                activeGuide === guide.id
                  ? 'bg-indigo-600/90 border-indigo-600/20 text-white shadow-lg shadow-indigo-500/15'
                  : 'glass-card text-slate-700 dark:text-slate-300'
              }`}
            >
              <div>
                <h4 className="text-sm font-bold tracking-tight">
                  {guide.name[currentLang] || guide.name['en']}
                </h4>
                <p
                  className={`text-[10px] mt-1 font-semibold truncate max-w-[200px] ${
                    activeGuide === guide.id ? 'text-indigo-100' : 'text-slate-400'
                  }`}
                >
                  {guide.subtitle[currentLang] || guide.subtitle['en']}
                </p>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  activeGuide === guide.id ? 'text-white' : 'text-slate-400'
                }`}
              />
            </button>
          ))}

          {/* Secure verification notice card */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <h5 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Paperless Verification
            </h5>
            <p className="text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300 font-medium">
              You can fetch electronic copies of these documents directly via **DigiLocker** using your registered Aadhaar credential during applications.
            </p>
          </div>
        </div>

        {/* Right Side: Step-by-Step Instructions */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-3xl p-6 shadow-sm space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/40 dark:border-white/5">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedGuide.name[currentLang] || selectedGuide.name['en']}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
                  {selectedGuide.subtitle[currentLang] || selectedGuide.subtitle['en']}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(selectedGuide.formName)}
                className="rounded-xl border-indigo-200 text-indigo-700 hover:bg-indigo-50/50 dark:border-indigo-900/60 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
              >
                <Download className="w-4 h-4 mr-1.5" />
                {currentLang === 'hi' ? 'फॉर्म डाउनलोड' : 'Form PDF'}
              </Button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Estimated Fees
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                    {selectedGuide.fee}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Processing Timelines
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                    {selectedGuide.timeline}
                  </span>
                </div>
              </div>
            </div>

            {/* Preparation Steps timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                {currentLang === 'hi' ? 'सत्यापन के चरण' : 'Filing and Verification Milestones'}
              </h4>
              <div className="relative border-l border-slate-200/40 dark:border-white/5 ml-3.5 pl-6.5 space-y-6">
                {selectedGuide.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-10 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/10 dark:bg-white/10 ring-4 ring-slate-100 dark:ring-slate-900 border border-indigo-500/40 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings and Pitfalls */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl">
              <h5 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-2">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                {currentLang === 'hi' ? 'महत्वपूर्ण सावधानियां' : 'Mandatory Pitfalls to Avoid'}
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
                {selectedGuide.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold shrink-0">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
