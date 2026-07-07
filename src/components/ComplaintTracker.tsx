/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  AlertOctagon,
  Search,
  Clock,
  ArrowRight,
  Send,
  MessageSquare,
  Shield,
  FileCheck2,
  ThumbsUp,
  MapPin,
  Calendar,
  Building,
  CheckCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { Language } from '../types';

interface ComplaintTrackerProps {
  currentLang: Language;
}

interface CivicIssue {
  id: string;
  title: string;
  category: string;
  dept: string;
  description: string;
  location: string;
  reportedAt: string;
  lastUpdated: string;
  status: 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  comments: { sender: string; text: string; date: string }[];
  timeline: { title: string; desc: string; date: string; status: 'completed' | 'active' | 'upcoming' }[];
}

export const ComplaintTracker: React.FC<ComplaintTrackerProps> = ({ currentLang }) => {
  const { toast } = useToast();

  const [searchId, setSearchId] = useState('');
  const [activeIssueIndex, setActiveIssueIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');

  // Pre-configured mock complaint issues
  const [issues, setIssues] = useState<CivicIssue[]>([
    {
      id: 'SBG-2026-9043',
      title: 'Blocked Drainage on Outer Ring Road',
      category: 'Drainage & Sewage',
      dept: 'Municipal Corporation (BBMP)',
      description: 'The main commercial drain adjacent to Ward 12 bus stand is clogged and overflowing onto the pedestrian pathway, causing severe traffic issues and odor.',
      location: 'Outer Ring Road, Near Ward 12 Bus Stand, Bengaluru',
      reportedAt: 'July 6, 2026, 10:15 AM',
      lastUpdated: 'Today, 09:12 AM',
      status: 'In Progress',
      priority: 'High',
      comments: [
        { sender: 'Citizen Desk Bot', text: 'Grievance cataloged. Initial system diagnostics verified local photo attachments.', date: 'July 6, 2026, 10:16 AM' },
        { sender: 'Inspector R. Kumar', text: 'Site inspection dispatched. Sanitary crew scheduled for clearing debris.', date: 'Today, 09:12 AM' }
      ],
      timeline: [
        { title: 'Grievance Logged', desc: 'Report filed by Citizen with photographic references.', date: 'July 6, 2026, 10:15 AM', status: 'completed' },
        { title: 'Nodal Officer Assigned', desc: 'Forwarded to Municipal Ward Inspector (BBMP Zone 4).', date: 'July 6, 2026, 02:40 PM', status: 'completed' },
        { title: 'Sanitation Inspection Scheduled', desc: 'Sanitary crew dispatched for clearing sand blockages.', date: 'Today, 09:12 AM', status: 'active' },
        { title: 'Resolution Approved', desc: 'Formal closure with verified final photo verification.', date: 'Upcoming Stage', status: 'upcoming' }
      ]
    },
    {
      id: 'SBG-2026-8721',
      title: 'Flickering Streetlight Near Intersection',
      category: 'Streetlights',
      dept: 'Electricity Board (BESCOM)',
      description: 'The street lamp opposite to the government primary school has been flickering continuously for the last 3 days, making the road unsafe for children at night.',
      location: 'Opposite Government Primary School, Sector 4, Bengaluru',
      reportedAt: 'July 5, 2026, 08:20 AM',
      lastUpdated: 'Yesterday, 04:30 PM',
      status: 'Resolved',
      priority: 'Medium',
      comments: [
        { sender: 'Citizen Desk Bot', text: 'Grievance dispatched to BESCOM Ward Executive.', date: 'July 5, 2026, 08:21 AM' },
        { sender: 'Lineman S. Gowda', text: 'Flickering bulb replaced with standard energy-saving LED.', date: 'Yesterday, 04:25 PM' }
      ],
      timeline: [
        { title: 'Grievance Logged', desc: 'Report filed with geo-coordinates verified.', date: 'July 5, 2026, 08:20 AM', status: 'completed' },
        { title: 'Assigned to Ward Crew', desc: 'Lineman S. Gowda designated for bulb diagnostic.', date: 'July 5, 2026, 11:30 AM', status: 'completed' },
        { title: 'Bulb Replaced', desc: 'Fitted energy-efficient LED block.', date: 'Yesterday, 04:25 PM', status: 'completed' },
        { title: 'Issue Resolved', desc: 'Ward coordinator approved and closed the ticket.', date: 'Yesterday, 04:30 PM', status: 'completed' }
      ]
    }
  ]);

  const activeIssue = issues[activeIssueIndex];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment = {
      sender: 'Citizen (You)',
      text: commentInput,
      date: 'Just now'
    };

    const updatedIssues = [...issues];
    updatedIssues[activeIssueIndex].comments.push(newComment);
    setIssues(updatedIssues);
    setCommentInput('');
    toast('Feedback logged on ticket.', 'success');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const index = issues.findIndex(i => i.id.toLowerCase().includes(searchId.toLowerCase()));
    if (index !== -1) {
      setActiveIssueIndex(index);
      toast(`Found matching Grievance ${issues[index].id}`, 'success');
    } else {
      toast('No matching grievance ID detected.', 'error');
    }
  };

  const getStatusProgress = (st: string) => {
    if (st === 'Submitted') return 25;
    if (st === 'Assigned') return 50;
    if (st === 'In Progress') return 75;
    return 100;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <AlertOctagon className="w-6 h-6 text-indigo-500" />
          {currentLang === 'hi' ? 'शिकायत ट्रैकर' : 'Live Grievance Tracker'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
          Monitor your reported civic anomalies, check live administrative timelines, and review coordinator logs in real-time.
        </p>
      </div>

      {/* Grid: Search bar & Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Ticket selector sidebar list */}
        <div className="lg:col-span-4 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Complaint ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
            />
          </form>

          <div className="p-2 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-3.5 py-1.5 block">
              Grievance List
            </span>
            {issues.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIssueIndex(idx)}
                className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 cursor-pointer ${
                  activeIssueIndex === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-[10px] font-bold">{item.id}</span>
                  <Badge
                    variant={item.status === 'Resolved' ? 'success' : 'secondary'}
                    className={`text-[8px] font-bold px-1.5 py-0 ${
                      activeIssueIndex === idx ? 'bg-white/20 text-white border-transparent' : ''
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <h4 className="text-xs font-bold truncate max-w-[190px] mt-1">{item.title}</h4>
                <span className="text-[9px] opacity-70 block mt-0.5">{item.dept}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Hand: Detailed Status logs */}
        {activeIssue ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Header info card */}
            <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">ID: {activeIssue.id}</span>
                  <Badge variant={activeIssue.priority === 'High' ? 'accent' : 'secondary'}>
                    {activeIssue.priority} Priority
                  </Badge>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Last Updated: {activeIssue.lastUpdated}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                  {activeIssue.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                  {activeIssue.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/40 dark:border-white/5 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-indigo-500">
                    <Building className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Department</span>
                    <span className="text-slate-800 dark:text-slate-200">{activeIssue.dept}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center text-rose-500">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Location Coordinates</span>
                    <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] block">
                      {activeIssue.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Widget */}
            <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Workflow Resolution Gauge
                </h4>
                <span className="text-xs font-bold text-indigo-500">
                  {getStatusProgress(activeIssue.status)}% Stage Reached
                </span>
              </div>

              {/* Graphical nodes */}
              <div className="relative pt-2">
                <div className="h-2 w-full bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${getStatusProgress(activeIssue.status)}%` }}
                  />
                </div>

                <div className="grid grid-cols-4 text-center text-[10px] font-bold uppercase tracking-wider">
                  <div className="text-indigo-600">Submitted</div>
                  <div className={getStatusProgress(activeIssue.status) >= 50 ? 'text-indigo-600' : 'text-slate-400'}>Assigned</div>
                  <div className={getStatusProgress(activeIssue.status) >= 75 ? 'text-indigo-600' : 'text-slate-400'}>In Progress</div>
                  <div className={getStatusProgress(activeIssue.status) === 100 ? 'text-emerald-500 font-black animate-pulse' : 'text-slate-400'}>Resolved</div>
                </div>
              </div>
            </div>

            {/* Timeline Workflow */}
            <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-6">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-200/40 dark:border-white/5">
                Detailed Inspection Timeline
              </h4>

              <div className="relative border-l border-slate-200 dark:border-white/10 pl-6 ml-3 space-y-6">
                {activeIssue.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle indicators */}
                    <span className={`absolute -left-[31px] top-0 h-4.5 w-4.5 rounded-full border-2 bg-white dark:bg-slate-900 flex items-center justify-center transition-all ${
                      step.status === 'completed'
                        ? 'border-indigo-600 text-indigo-600'
                        : step.status === 'active'
                          ? 'border-emerald-500 text-emerald-500 scale-110 shadow-md shadow-emerald-500/10'
                          : 'border-slate-300 dark:border-white/10 text-slate-400'
                    }`}>
                      {step.status === 'completed' && <CheckCircle className="w-3 h-3 fill-indigo-600/15" />}
                      {step.status === 'active' && <Clock className="w-3 h-3 animate-spin text-emerald-500" />}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{step.title}</h5>
                        {step.status === 'active' && (
                          <span className="px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase bg-emerald-500/15 text-emerald-500 tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{step.desc}</p>
                      <span className="text-[10px] text-slate-400 font-medium block">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments & Conversation logs */}
            <div className="glass-card rounded-3xl p-6 shadow-xs space-y-5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider pb-3 border-b border-slate-200/40 dark:border-white/5 flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-indigo-500" />
                Citizen & Inspector Notes
              </h4>

              <div className="space-y-3 max-h-[180px] overflow-y-auto scrollbar-none pb-2">
                {activeIssue.comments.map((comment, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-xs font-semibold">
                    <div className="flex justify-between items-center text-[9px] text-slate-400 mb-1">
                      <span className="font-extrabold uppercase text-indigo-500">{comment.sender}</span>
                      <span>{comment.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Form to submit update */}
              <form onSubmit={handlePostComment} className="flex gap-2 pt-2 border-t border-slate-200/40 dark:border-white/5">
                <input
                  type="text"
                  required
                  placeholder="Post diagnostic update or coordinate comments..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
                <Button type="submit" variant="primary" className="rounded-xl px-4 shrink-0 font-bold">
                  <Send className="w-4 h-4 mr-1.5" />
                  Post
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 py-20 text-center text-slate-400 font-semibold border border-dashed border-slate-200/50 dark:border-white/5 rounded-3xl">
            No grievance details currently selected.
          </div>
        )}
      </div>
    </div>
  );
};
