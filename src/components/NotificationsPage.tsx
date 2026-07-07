/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  Bell,
  AlertTriangle,
  FileText,
  Bookmark,
  Check,
  CheckSquare,
  Clock,
  Trash2,
  Filter,
  XCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface NotificationsPageProps {
  currentLang: Language;
}

interface AppNotification {
  id: string;
  title: string;
  description: string;
  category: 'complaint' | 'scheme' | 'alert' | 'general';
  time: string;
  isRead: boolean;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = ({ currentLang }) => {
  const { toast } = useToast();

  const [activeCategory, setActiveCategory] = useState<'all' | 'complaint' | 'scheme' | 'alert'>('all');

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'NT-1',
      title: 'Grievance Status Advanced to [In Progress]',
      description: 'Your report SBG-2026-9043 regarding clogged drainage on Outer Ring Road has been inspected. Sanitary crew dispatched.',
      category: 'complaint',
      time: '10 mins ago',
      isRead: false
    },
    {
      id: 'NT-2',
      title: 'New Scheme Eligibility Matched!',
      description: 'Based on your registered profile, you qualify for the PM MUDRA Yojana collateral-free business subsidy up to ₹10 Lakhs.',
      category: 'scheme',
      time: '2 hours ago',
      isRead: false
    },
    {
      id: 'NT-3',
      title: 'National Aadhaar Biometric Security Lock Notification',
      description: 'UIDAI recommends checking settings to secure or lock demographic biometrics for offline safety.',
      category: 'alert',
      time: 'Yesterday, 03:20 PM',
      isRead: true
    },
    {
      id: 'NT-4',
      title: 'Streetlight Grievance Marked [Resolved]',
      description: 'BESCOM electric linemen team replaced defective streetlight opposing Sector 4 school. Diagnostic verified.',
      category: 'complaint',
      time: 'Yesterday, 04:30 PM',
      isRead: true
    },
    {
      id: 'NT-5',
      title: 'DigiLocker Database Synchronization Successful',
      description: 'Your verified electronic marksheet and PAN card are fully linked to Smart Bharat Desk.',
      category: 'general',
      time: '2 days ago',
      isRead: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast('All notifications marked as read.', 'success');
  };

  const handleToggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast('Notifications inbox cleared.', 'info');
  };

  const filteredList = notifications.filter(n => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'complaint':
        return { text: 'Grievance Update', color: 'bg-rose-500/10 text-rose-500 border-rose-500/10', icon: AlertTriangle };
      case 'scheme':
        return { text: 'Welfare Match', color: 'bg-amber-500/10 text-amber-500 border-amber-500/10', icon: Bookmark };
      case 'alert':
        return { text: 'Government Alert', color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/10', icon: Bell };
      default:
        return { text: 'General Service', color: 'bg-slate-500/10 text-slate-500 border-slate-500/10', icon: Info };
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-indigo-500" />
            {currentLang === 'hi' ? 'नागरिक सूचनाएं' : 'Citizen Notifications Alerts'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            Stay informed with verified government alerts, matched scheme notifications, and local ward updates.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs font-bold text-indigo-500 border border-indigo-500/10 rounded-xl">
            <CheckSquare className="w-3.5 h-3.5 mr-1" />
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-xs font-bold text-rose-500 border border-rose-500/10 rounded-xl hover:bg-rose-500/10">
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear Inbox
          </Button>
        </div>
      </div>

      {/* Categories Toggle Row */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900/5 dark:bg-white/5 p-1 rounded-2xl border border-slate-200/40 dark:border-white/5 max-w-fit">
        {(['all', 'complaint', 'scheme', 'alert'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
            }`}
          >
            {cat === 'all' ? 'All Notices' : cat === 'complaint' ? 'Grievances' : cat === 'scheme' ? 'Welfare' : 'Alerts'}
          </button>
        ))}
      </div>

      {/* Notifications list feed */}
      {filteredList.length > 0 ? (
        <div className="space-y-4">
          {filteredList.map((item) => {
            const meta = getCategoryMeta(item.category);
            return (
              <div
                key={item.id}
                onClick={() => handleToggleRead(item.id)}
                className={`p-5 rounded-3xl border border-slate-200/50 dark:border-white/10 transition-all cursor-pointer flex gap-4 text-xs ${
                  item.isRead
                    ? 'bg-white/30 dark:bg-slate-950/10 opacity-75 backdrop-blur-xs'
                    : 'bg-white dark:bg-slate-900 border-l-4 border-l-indigo-500 shadow-sm shadow-indigo-500/5 hover:scale-101'
                }`}
              >
                {/* Visual Circle Indicator */}
                <div className={`h-10 w-10 rounded-2xl shrink-0 flex items-center justify-center ${meta.color} border`}>
                  <meta.icon className="w-5 h-5" />
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                        {item.title}
                      </span>
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-indigo-500 block animate-pulse" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 select-none">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="secondary" className="text-[8px] font-black uppercase">
                      {meta.text}
                    </Badge>
                    <span className="text-[9px] text-indigo-500 font-extrabold opacity-0 hover:opacity-100 transition-opacity">
                      {item.isRead ? 'Mark as Unread' : 'Mark as Read'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-dashed border-slate-200/60 dark:border-white/5 rounded-3xl max-w-xl mx-auto">
          <XCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Inbox Empty</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
            No active notification updates mapped in this category under your citizen coordinates.
          </p>
        </div>
      )}
    </div>
  );
};
