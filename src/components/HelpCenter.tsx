/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  HelpCircle,
  Phone,
  Mail,
  FileText,
  Send,
  MessageSquare,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  CheckCircle,
  UploadCloud,
  FileCheck2,
  Clock
} from 'lucide-react';
import { Language } from '../types';

interface HelpCenterProps {
  currentLang: Language;
}

interface Ticket {
  id: string;
  title: string;
  category: string;
  priority: string;
  description: string;
  status: 'Open' | 'Assigned' | 'Resolved';
  date: string;
}

export const HelpCenter: React.FC<HelpCenterProps> = ({ currentLang }) => {
  const { toast } = useToast();

  // Search FAQ
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Raising Ticket form states
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Portal Login Error');
  const [ticketPriority, setTicketPriority] = useState('Medium');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketAttachment, setTicketAttachment] = useState<string | null>(null);

  // Active tickets list
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT-2026-1049',
      title: 'Aadhaar Biometric Check fails on Mudra Loan scheme',
      category: 'Scheme Application',
      priority: 'High',
      description: 'The Mudra Loan portal displays fingerprint verification mismatch.',
      status: 'Assigned',
      date: 'Today, 09:30 AM'
    }
  ]);

  // Live Help Chat states
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Smart Bharat Support Hub. How can I guide you today with any service queries or ticketing errors?', time: 'Just now' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const faqs = [
    {
      q: 'Can I apply for a Passport fully online under Smart Bharat?',
      a: 'You can submit the application form, upload documents, and complete fee payments online through our Portal. However, you must schedule a physical appointment at your selected Passport Seva Kendra (PSK) for biometric verification.',
      cat: 'Passport'
    },
    {
      q: 'How does the DigiLocker paperless document verification operate?',
      a: 'When you apply for a matched scheme or identity service, our Portal prompts a secure DigiLocker request. Once authorized, your pre-verified credentials are programmatically checked, eliminating physical paperwork.',
      cat: 'Verification'
    },
    {
      q: 'What is the processing time for MUDRA Loan approvals?',
      a: 'Normal processing is finished within 7-14 working days after submitting a fully completed application checklist and identity cards to an authorized partner bank.',
      cat: 'Schemes'
    },
    {
      q: 'What should I do if my local civic complaint is closed without a fix?',
      a: 'If a reported grievance was closed unsatisfactorily, you can use the "Raise Dispute" trigger inside the Tracker timeline. This auto-escalates the ticket coordinates to the District Nodal Officer.',
      cat: 'Grievances'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDescription) {
      toast('Please provide a ticket title and description.', 'error');
      return;
    }

    const newTicket: Ticket = {
      id: `TKT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: ticketTitle,
      category: ticketCategory,
      priority: ticketPriority,
      description: ticketDescription,
      status: 'Open',
      date: 'Just now'
    };

    setTickets([newTicket, ...tickets]);
    toast(`Ticket ${newTicket.id} registered successfully!`, 'success');

    // Reset Form
    setTicketTitle('');
    setTicketDescription('');
    setTicketAttachment(null);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    const query = chatInput;
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "I have captured your query. I will route this to a real ward coordinator, or you can register a formal Support Ticket under 'Raise a ticket' column.";
      
      const lower = query.toLowerCase();
      if (lower.includes('passport') || lower.includes('travel')) {
        botReply = "For Passports, you can review the steps in the 'Document Hub' tab. A Normal Passport application fee is ₹1,500 and takes around 15 days.";
      } else if (lower.includes('aadhaar') || lower.includes('mobile')) {
        botReply = "To register or update your Aadhaar mobile number, you must visit an authorized Aadhaar Seva Kendra in person for biometric checks. Demographics cost is ₹50.";
      } else if (lower.includes('complain') || lower.includes('grievance') || lower.includes('drain')) {
        botReply = "You can log municipal issues under 'Grievance Feed' with local photos. Our department routing engine will alert the ward engineer.";
      } else if (lower.includes('mudra') || lower.includes('loan') || lower.includes('scheme')) {
        botReply = "Check out the PM MUDRA Yojana scheme on our 'Scheme Matcher' tab. You can get collateral-free business loans up to ₹10 Lakhs.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply, time: 'Just now' }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fade-in text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950/80 to-slate-950 border border-white/10 p-6 sm:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative z-10 max-w-xl">
          <Badge className="bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 mb-3">
            24/7 Citizen Support desk
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Smart Bharat Help Desk</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Browse through national service FAQs, launch interactive ticket logs with state coordinators, or discuss with live AI support.
          </p>
        </div>
      </div>

      {/* Main double column split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: FAQ Catalog & Raising Tickets */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* FAQ panel */}
          <div className="glass-card rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-4.5 h-4.5 text-indigo-500" />
              Frequently Answered Questions
            </h3>

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search queries (e.g. Aadhaar, Passport)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/40 dark:border-white/5 bg-slate-900/5 dark:bg-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-xs font-bold text-slate-800 dark:text-slate-200 text-left"
                  >
                    <span>{faq.q}</span>
                    {expandedFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Raise Support Ticket Form */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-indigo-500" />
              Register Support Ticket
            </h3>

            <form onSubmit={handleRaiseTicket} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Brief Ticket Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DigiLocker sync mismatch on Birth certificate"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Category Type
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="Portal Login Error">Portal Login Error</option>
                    <option value="Scheme Application">Scheme Application</option>
                    <option value="Grievance Escalate">Grievance Escalate</option>
                    <option value="DigiLocker Bridge">DigiLocker Bridge</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Priority Level
                  </label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map((pr) => (
                      <button
                        key={pr}
                        type="button"
                        onClick={() => setTicketPriority(pr)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          ticketPriority === pr
                            ? pr === 'High'
                              ? 'bg-rose-500/90 border-rose-500 text-white shadow-xs'
                              : 'bg-indigo-600/90 border-indigo-600 text-white shadow-xs'
                            : 'bg-white/30 dark:bg-white/5 border-slate-200/40 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-900/5'
                        }`}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Detailed Issue Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explain the error code or mismatch parameters..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 resize-none"
                />
              </div>

              {/* Upload screenshot mockup */}
              <div className="border border-dashed border-slate-200/50 dark:border-white/10 p-4 rounded-xl text-center cursor-pointer hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors relative">
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={() => setTicketAttachment('screenshot.png')}
                />
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                <span className="text-[11px] font-bold text-slate-500 block">
                  {ticketAttachment ? `Attached: ${ticketAttachment}` : 'Attach Error Screenshots (Optional)'}
                </span>
              </div>

              <Button type="submit" variant="primary" className="w-full justify-center py-2.5 rounded-xl">
                Submit Formal Ticket
              </Button>
            </form>
          </div>

          {/* Active Tickets tracking */}
          <div className="glass-card rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200/40 dark:border-white/5">
              <Clock className="w-4.5 h-4.5 text-indigo-500" />
              Active Registered Tickets
            </h3>
            
            <div className="space-y-3">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-xs">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{t.id}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        t.priority === 'High' ? 'bg-rose-500/15 text-rose-500' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {t.priority} Priority
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/15 text-indigo-500">
                        {t.status}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300 mt-2">{t.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Category: {t.category} • Date: {t.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Emergency Helpline list & Live Support Chatbot */}
        <div className="lg:col-span-5 space-y-8">
          {/* Helplines widget */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4.5 h-4.5 text-rose-500" />
              National Emergency Hotlines
            </h3>

            <div className="space-y-3 text-xs font-bold">
              <div className="flex items-center justify-between p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-slate-600 dark:text-slate-400">Citizen Helpline Center</span>
                <span className="text-indigo-500 font-mono">1800-115-555</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-slate-600 dark:text-slate-400">DigiLocker HelpDesk</span>
                <span className="text-indigo-500 font-mono">011-24303513</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-slate-600 dark:text-slate-400">Grievance Portal (CPGRAMS)</span>
                <span className="text-indigo-500 font-mono">1800-111-960</span>
              </div>
            </div>
          </div>

          {/* Interactive live support chat box */}
          <div className="glass-card rounded-3xl p-6 shadow-xs h-[500px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/40 dark:border-white/5">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
                  Live Chat Assistant
                </h4>
                <Badge variant="success">Support Online</Badge>
              </div>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-none">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed font-semibold ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat inputs */}
            <form onSubmit={handleSendMessage} className="flex gap-2 pt-2.5 border-t border-slate-200/40 dark:border-white/5">
              <input
                type="text"
                placeholder="Ask quick assistance here..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              />
              <Button type="submit" variant="primary" className="rounded-xl px-3 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
