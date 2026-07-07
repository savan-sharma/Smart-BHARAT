/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Language, Message } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { Send, Sparkles, User, ArrowRight, RefreshCw, Landmark, FileCheck, Shield } from 'lucide-react';

interface ChatAssistantProps {
  currentLang: Language;
  initialQuery?: string;
}

const SUGGESTIONS: Record<Language, string[]> = {
  en: [
    'What documents are needed for a new Passport?',
    'How do I update my Aadhaar card mobile number?',
    'What schemes are available for small business owners?',
    'How can I track my submitted civic complaints?',
  ],
  hi: [
    'नया पासपोर्ट बनवाने के लिए कौन से दस्तावेज़ चाहिए?',
    'आधार कार्ड में मोबाइल नंबर कैसे अपडेट करें?',
    'लघु उद्योगों के लिए कौन सी योजनाएं उपलब्ध हैं?',
    'अपनी दर्ज नागरिक शिकायत को कैसे ट्रैक करें?',
  ],
  ta: [
    'புதிய கடவுச்சீட்டிற்கு என்ன ஆவணங்கள் தேவை?',
    'ஆதார் மொபைல் எண்ணை எவ்வாறு புதுப்பிப்பது?',
    'சிறு தொழில்முனைவோருக்கு என்ன திட்டங்கள் உள்ளன?',
    'குடிமைப் புகார்களை எவ்வாறு கண்காணிப்பது?',
  ],
  te: [
    'కొత్త పాస్‌పోర్ట్ కోసం ఏ పత్రాలు అవసరం?',
    'ఆధార్ కార్డ్ మొబైల్ నంబర్ ఎలా అప్‌డేట్ చేయాలి?',
    'చిన్న వ్యాపారస్తుల కోసం ఏ పథకాలు ఉన్నాయి?',
    'నా పౌర ఫిర్యాదును ఎలా ట్రాక్ చేయాలి?',
  ],
  mr: [
    'नवीन पासपोर्टसाठी कोणती कागदपत्रे आवश्यक आहेत?',
    'आधार कार्डवर मोबाईल नंबर कसा अपडेट करावा?',
    'लहान उद्योजकांसाठी कोणत्या योजना आहेत?',
    'माझ्या नागरी तक्रारीचा मागोवा कसा घ्यावा?',
  ],
  bn: [
    'নতুন পাসপোর্টের জন্য কী কী নথির প্রয়োজন?',
    'আধার কার্ডে কীভাবে মোবাইল নম্বর আপডেট করব?',
    'ক্ষুদ্র ব্যবসার মালিকদের জন্য কী কী যোজনা আছে?',
    'আমি কীভাবে আমার নাগরিক অভিযোগ ট্র্যাক করব?',
  ],
};

const BOT_ANSWERS: Record<string, { reply: string; suggestions?: string[] }> = {
  'What documents are needed for a new Passport?': {
    reply: `To apply for a **Fresh Indian Passport**, you need the following validated documents:
1. **Proof of Address (any one):** Aadhaar Card, Rent Agreement, Utility Bill (Electricity/Water), or Bank Passbook with photo.
2. **Proof of Date of Birth (any one):** Birth Certificate, School Leaving Certificate, or PAN Card.
3. **Non-ECR Category proof (if matriculated):** 10th Standard passing certificate or higher educational degree.

**Fee Structure:**
* Normal application (36 pages): **₹1,500** (Timeline: 10-30 days)
* Tatkaal application: **₹3,500** (Timeline: 3-7 days)

Would you like me to open the official Passport Seva portal or match your eligibility for travel subsidies?`,
    suggestions: ['Match travel subsidies', 'Open official Passport Seva portal'],
  },
  'How do I update my Aadhaar card mobile number?': {
    reply: `To update or register your mobile number in Aadhaar, you **must visit an authorized Aadhaar Seva Kendra in person** because it requires biometric verification (fingerprint or iris scan). 

**Steps to follow:**
1. Use our **Services Directory** to locate your nearest Aadhaar Kendra.
2. Fill out the Aadhaar Correction Form (no additional documents required for mobile number update).
3. Provide your biometric thumbprint for identity authentication.
4. Pay the official fee of **₹50** at the counter.

*Note: Demographics updates take approximately 7-10 business days to reflect in the digital mAadhaar app.*`,
    suggestions: ['Find nearest Aadhaar Kendra', 'Download Aadhaar Form PDF'],
  },
  'What schemes are available for small business owners?': {
    reply: `For emerging entrepreneurs and small business owners, the Central Government provides excellent financial aids:
1. **PM MUDRA Yojana (PMMY):** Collateral-free loans up to **₹10 Lakhs** across three categories:
   * *Shishu:* Loans up to ₹50,000
   * *Kishor:* Loans from ₹50,000 to ₹5 Lakhs
   * *Tarun:* Loans from ₹5 Lakhs to ₹10 Lakhs
2. **Credit Guarantee Scheme (CGTMSE):** Guarantee-free credit facility up to ₹2 Crores.
3. **Stand-Up India:** Credit loans between ₹10 Lakhs and ₹1 Crore for SC/ST and Women entrepreneurs.

Would you like to calculate your direct eligibility for MUDRA Loan Shishu Category?`,
    suggestions: ['Calculate MUDRA eligibility', 'Go to Scheme Finder'],
  },
  'How can I track my submitted civic complaints?': {
    reply: `You can instantly monitor and track resolving metrics for all your reported issues directly inside the **Civic Grievance** board of Smart Bharat.

**Tracking Details:**
1. Navigate to the **Report Issue** section in our main menu.
2. Find the *Complaints Live Feed* column on the right side.
3. Use the filter buttons to check status:
   * **Submitted:** Logged into municipal database.
   * **Assigned:** Dispatched to ward engineer.
   * **In Progress:** Work started on ground.
   * **Resolved:** Verification photo uploaded and closed.

You can also upvote existing grievances to escalate their municipal priority ranking.`,
    suggestions: ['Go to Civic Grievance Feed', 'Report a new local issue'],
  },
};

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ currentLang, initialQuery }) => {
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // Initialize with greeting
  useEffect(() => {
    const greetingText =
      currentLang === 'hi'
        ? 'नमस्ते! मैं आपका स्मार्ट भारत एआई सहायक हूं। मैं सरकारी योजनाओं, नागरिक सेवाओं और शिकायत ट्रैकिंग में आपकी सहायता कर सकता हूं। आज आप क्या जानना चाहते हैं?'
        : 'Namaste! I am your Smart Bharat AI companion. I can guide you through mandatory document requirements, assess welfare scheme eligibility, or assist with civic grievance logging. What would you like to inquire about today?';

    setMessages([
      {
        id: 'greet-1',
        sender: 'assistant',
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [currentLang]);

  // Handle preset queries on click or initial
  const triggerBotResponse = (userText: string) => {
    // Add User message
    const userMsg: Message = {
      id: `msg-${Math.random()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing delay for premium humanlike chatbot feel
    setTimeout(() => {
      // Find matching standard reply or formulate fallback
      let botText = '';
      let suggestions: string[] = [];

      // Match English or translate keys
      const matchedKey = Object.keys(BOT_ANSWERS).find(
        (key) => key.toLowerCase() === userText.trim().toLowerCase()
      );

      if (matchedKey) {
        botText = BOT_ANSWERS[matchedKey].reply;
        suggestions = BOT_ANSWERS[matchedKey].suggestions || [];
      } else {
        // Formulate a smart fallback representing the future Gemini API implementation
        botText = `I have received your request about **"${userText}"**. 

In the upcoming Phase, our **Gemini 2.5 Flash model** will be fully connected to query the direct databases of India's National Portal, providing real-time eligibility calculations, document classification via OCR, and digital application automation.

**Here is a simulated response based on our current indexed knowledge:**
* Ensure your **Aadhaar card** is seeded with your active mobile number.
* Small business holders should procure an **Udyam Registration Certificate** for interest subsidies.
* Civic complaints in this portal are automatically dispatched using automated pincode routing.

Would you like to explore our matching welfare schemes or file a formal complaint?`;
        suggestions = ['Go to Scheme Finder', 'Report a Civic Issue'];
      }

      const botMsg: Message = {
        id: `msg-${Math.random()}`,
        sender: 'assistant',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const query = input.trim();
    setInput('');
    triggerBotResponse(query);
  };

  const handleSuggestionClick = (text: string) => {
    triggerBotResponse(text);
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="py-6 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <Badge variant="primary" className="mb-2">
          Assistant Sandbox
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {currentLang === 'hi' ? 'एआई नागरिक सहायक' : 'AI-Powered Citizen Desk'}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {currentLang === 'hi'
            ? 'पात्रता, सरकारी कार्यालयों, शुल्क और जटिल सरकारी नियमों के बारे में तत्काल प्रश्न पूछें।'
            : 'Get instant interactive guidance on passport rules, subsidy filings, and public documentation pipelines.'}
        </p>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden shadow-sm h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="bg-white/10 dark:bg-slate-950/20 px-6 py-4 border-b border-slate-200/40 dark:border-white/5 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                Bharat Companion AI
                <Badge variant="success" className="text-[9px] py-0 px-1.5 font-bold">
                  Active Demo
                </Badge>
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Simulated AI Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMessages((prev) => [prev[0]]);
                toast('Chat log cleared.', 'info');
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-900/10 dark:hover:bg-white/10 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Clear chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-[10px] font-bold text-slate-500">
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              Verified Desk
            </div>
          </div>
        </div>

        {/* Chat Messages Log Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse text-right' : 'text-left'
              }`}
            >
              {/* Avatar */}
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-slate-600 dark:text-slate-300'
                    : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Msg Box */}
              <div className="space-y-1">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white/45 dark:bg-slate-950/25 border border-slate-200/40 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-tl-none font-medium whitespace-pre-wrap backdrop-blur-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] font-bold text-slate-400 block px-1.5">
                  {msg.timestamp}
                </span>

                {/* Sub suggestions inside assistant responses */}
                {msg.sender === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 justify-start">
                    {msg.suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(sug)}
                        className="px-2.5 py-1 bg-white/40 hover:bg-white/60 dark:bg-slate-950/30 dark:hover:bg-slate-950/50 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-slate-200/40 dark:border-white/5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 backdrop-blur-2xs"
                      >
                        {sug}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 text-left">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-white/45 dark:bg-slate-950/25 border border-slate-200/40 dark:border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-1 backdrop-blur-xs">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Dynamic Suggestions pills */}
        <div className="px-6 py-3 bg-white/10 dark:bg-slate-950/20 border-t border-slate-200/40 dark:border-white/5 flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-none backdrop-blur-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 select-none">
            <Landmark className="w-3.5 h-3.5" />
            Suggested:
          </span>
          <div className="flex gap-2">
            {SUGGESTIONS[currentLang]?.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(sug)}
                className="px-3.5 py-1.5 bg-white/40 hover:bg-white/65 dark:bg-slate-950/25 dark:hover:bg-slate-950/45 border border-slate-200/40 dark:border-white/5 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl transition-all cursor-pointer shadow-2xs hover:scale-102 backdrop-blur-2xs"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-4 bg-white/30 dark:bg-slate-950/20 border-t border-slate-200/40 dark:border-white/5 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                currentLang === 'hi' 
                  ? 'मुझसे कोई भी प्रश्न पूछें...' 
                  : 'Type a query or choose a suggested pill above...'
              }
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/10 backdrop-blur-xs text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
            />
            <Button type="submit" variant="primary" className="rounded-xl shrink-0">
              <Send className="w-4.5 h-4.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
