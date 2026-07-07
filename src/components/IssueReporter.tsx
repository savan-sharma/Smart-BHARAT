/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, CivicIssue } from '../types';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import { AlertCircle, MapPin, ThumbsUp, Calendar, Filter, Send, Camera, ClipboardList, CheckCircle } from 'lucide-react';

interface IssueReporterProps {
  currentLang: Language;
}

// Initial preseeded realistic civic grievances in India
const INITIAL_ISSUES: CivicIssue[] = [
  {
    id: 'issue-1',
    title: 'Severe potholes on Outer Ring Road near Metro station',
    category: 'Roads & Potholes',
    description: 'There are multiple large potholes that cause dangerous driving conditions, especially for two-wheelers during night times.',
    location: 'Outer Ring Road, Bengaluru - 560103',
    reportedAt: '2026-07-06',
    status: 'In Progress',
    upvotes: 42,
    hasUpvoted: false,
  },
  {
    id: 'issue-2',
    title: 'Overflowing community garbage bins near park entrance',
    category: 'Garbage & Waste',
    description: 'The municipal bin has not been cleared for 3 days. Trash is piling up on the sidewalk attracting stray animals and creating unhealthy smells.',
    location: 'Sector 4, Dwarka, Delhi - 110075',
    reportedAt: '2026-07-05',
    status: 'Assigned',
    upvotes: 19,
    hasUpvoted: false,
  },
  {
    id: 'issue-3',
    title: 'Entire block streetlight line out of order',
    category: 'Electricity & Streetlights',
    description: 'Over 8 consecutive streetlights are broken. The complete lane is dark, making citizens feel unsafe during late hours.',
    location: 'Juhu Tara Road, Santacruz West, Mumbai - 400049',
    reportedAt: '2026-07-04',
    status: 'Resolved',
    upvotes: 61,
    hasUpvoted: true,
  },
];

const ISSUE_CATEGORIES = [
  'Roads & Potholes',
  'Garbage & Waste',
  'Electricity & Streetlights',
  'Water Supply & Leakage',
  'Sewage & Drainage',
  'Traffic & Encroachments',
];

export const IssueReporter: React.FC<IssueReporterProps> = ({ currentLang }) => {
  const { toast } = useToast();

  const [issues, setIssues] = useState<CivicIssue[]>([]);
  const [filter, setFilter] = useState<string>('All');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(ISSUE_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [mockPhoto, setMockPhoto] = useState<string>('None');

  // Load from localstorage or preseed
  useEffect(() => {
    const saved = localStorage.getItem('smart_bharat_civic_issues');
    if (saved) {
      try {
        setIssues(JSON.parse(saved));
      } catch (e) {
        setIssues(INITIAL_ISSUES);
      }
    } else {
      setIssues(INITIAL_ISSUES);
    }
  }, []);

  // Save to localstorage
  const saveIssues = (updatedIssues: CivicIssue[]) => {
    setIssues(updatedIssues);
    localStorage.setItem('smart_bharat_civic_issues', JSON.stringify(updatedIssues));
  };

  // Submit new civic issue
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !location || !pincode) {
      toast(
        currentLang === 'hi' 
          ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' 
          : 'Please fill in all mandatory fields before submitting.',
        'error'
      );
      return;
    }

    const newIssue: CivicIssue = {
      id: `issue-${Math.random().toString(36).substring(2, 9)}`,
      title,
      category,
      description,
      location: `${location}, Pin - ${pincode}`,
      reportedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      upvotes: 1,
      hasUpvoted: true,
    };

    const updated = [newIssue, ...issues];
    saveIssues(updated);

    // Reset Form
    setTitle('');
    setDescription('');
    setLocation('');
    setPincode('');
    setMockPhoto('None');

    toast(
      currentLang === 'hi'
        ? 'शिकायत सफलतापूर्वक दर्ज की गई! इसे वार्ड समन्वयक को भेज दिया गया है।'
        : 'Civic issue registered successfully! Dispatched to ward engineer.',
      'success'
    );
  };

  // Handle upvoting
  const handleUpvote = (id: string) => {
    const updated = issues.map((issue) => {
      if (issue.id === id) {
        const hasUpvoted = !issue.hasUpvoted;
        return {
          ...issue,
          hasUpvoted,
          upvotes: hasUpvoted ? issue.upvotes + 1 : issue.upvotes - 1,
        };
      }
      return issue;
    });
    saveIssues(updated);
    
    const target = issues.find((i) => i.id === id);
    if (target) {
      if (!target.hasUpvoted) {
        toast(
          currentLang === 'hi' 
            ? 'शिकायत का समर्थन (Upvote) करने के लिए धन्यवाद!' 
            : 'Upvoted! High-priority alerts broadcasted to the municipality.',
          'success'
        );
      }
    }
  };

  // Filter issues list
  const filteredIssues = issues.filter((issue) => {
    if (filter === 'All') return true;
    return issue.status === filter;
  });

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'primary';
      case 'In Progress':
        return 'warning';
      case 'Assigned':
        return 'info';
      case 'Resolved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Badge variant="danger" className="mb-3">
          Community Grievance
        </Badge>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
          {currentLang === 'hi' ? 'नागरिक शिकायत मंच' : 'Report & Track Civic Grievances'}
        </h2>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          {currentLang === 'hi'
            ? 'अपने क्षेत्र में गड्ढे, बिजली गुल, या कचरे के संचय की रिपोर्ट करें। स्थानीय प्रशासन द्वारा समाधान प्रगति को लाइव ट्रैक करें।'
            : 'Pinpoint local civic issues like potholes, malfunctioning streetlights, or waste accumulation. Track resolving milestones in real time.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        {/* Issue Reporter Form */}
        <div className="lg:col-span-5">
          <div className="glass-card rounded-3xl p-6 shadow-sm sticky top-24">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="p-2 bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 rounded-xl">
                <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {currentLang === 'hi' ? 'नई शिकायत दर्ज करें' : 'File a New Grievance'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4.5 text-left">
              {/* Issue Title */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  {currentLang === 'hi' ? 'समस्या का शीर्षक' : 'Brief Issue Title'}*
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    currentLang === 'hi' 
                      ? 'उदा. मुख्य चौराहे पर सड़क का गड्ढा' 
                      : 'e.g., Pothole on Sector 5 Main Road'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  {currentLang === 'hi' ? 'समस्या की श्रेणी' : 'Grievance Category'}*
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                >
                  {ISSUE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  {currentLang === 'hi' ? 'विस्तृत विवरण' : 'Detailed Description'}*
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={
                    currentLang === 'hi' 
                      ? 'समस्या के बारे में अधिक बताएं ताकि अधिकारी इसे समझ सकें...' 
                      : 'Provide relevant context, reference points, and details...'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 resize-none"
                />
              </div>

              {/* Location details */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {currentLang === 'hi' ? 'पता / मोहल्ला' : 'Locality / Area'}*
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Koramangala 4th block"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    Pin Code*
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="560034"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 text-center"
                  />
                </div>
              </div>

              {/* Simulated Photo attachment */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  {currentLang === 'hi' ? 'फोटो अटैच करें (सिम्युलेटेड)' : 'Attach Photo (Simulated)'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'None', value: 'None' },
                    { label: 'pothole_pic.jpg', value: 'Pothole Pic' },
                    { label: 'overflow_bin.jpg', value: 'Trash Pic' },
                    { label: 'streetlight.jpg', value: 'Streetlight Pic' },
                  ].map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setMockPhoto(preset.value)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${
                        mockPhoto === preset.value
                          ? 'bg-indigo-600/90 border-indigo-600/20 text-white'
                          : 'bg-white/30 dark:bg-white/5 border-slate-200/40 dark:border-white/5 text-slate-500 hover:bg-slate-900/5 dark:hover:bg-white/10 backdrop-blur-xs'
                      }`}
                    >
                      <span className="truncate">{preset.label}</span>
                      <Camera className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="danger" className="w-full justify-center mt-2 bg-rose-600 hover:bg-rose-700">
                <Send className="w-4 h-4 mr-1.5" />
                {currentLang === 'hi' ? 'शिकायत जमा करें' : 'Submit Grievance Alert'}
              </Button>
            </form>
          </div>
        </div>

        {/* Complaints Live Feed */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Filters Bar */}
          <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-slate-400" />
              {currentLang === 'hi' ? 'फिल्टर करें' : 'Filter by Status'}
            </span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {['All', 'Submitted', 'Assigned', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border cursor-pointer transition-colors ${
                    filter === st
                      ? 'bg-slate-950 border-white/10 text-white dark:bg-white dark:border-white/5 dark:text-slate-950'
                      : 'bg-white/45 dark:bg-slate-950/25 border-slate-200/40 dark:border-white/5 text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 backdrop-blur-xs'
                  }`}
                >
                  {st === 'All' ? (currentLang === 'hi' ? 'सभी' : 'All Complaints') : st}
                </button>
              ))}
            </div>
          </div>

          {/* Grievance List Cards */}
          {filteredIssues.length > 0 ? (
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="glass-card rounded-2xl p-5 text-left shadow-xs"
                >
                  {/* Status, ID & Category */}
                  <div className="flex items-center justify-between gap-4 mb-3.5">
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusVariant(issue.status)}>
                        {issue.status}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-400">
                        ID: #{issue.id.toUpperCase()}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {issue.category}
                    </Badge>
                  </div>

                  {/* Grievance Body */}
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {issue.title}
                  </h4>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {issue.description}
                  </p>

                  {/* Metadata: Location, Reported Date */}
                  <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/40 dark:border-white/5 pt-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="font-medium truncate">{issue.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{currentLang === 'hi' ? 'दर्ज तिथि' : 'Reported on'}: {issue.reportedAt}</span>
                    </div>
                  </div>

                  {/* Upvote & Interactive support tracker */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-200/40 dark:border-white/5 pt-4.5">
                    <button
                      onClick={() => handleUpvote(issue.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer text-xs font-semibold ${
                        issue.hasUpvoted
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/30 dark:border-indigo-800 dark:text-indigo-400 shadow-xs'
                          : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
                      {issue.upvotes} {currentLang === 'hi' ? 'समर्थन' : 'Upvotes'}
                    </button>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
                      {issue.status === 'Resolved' ? (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Municipal Engineer Solved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
                          Assigned to Ward Engineer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-dashed border-slate-200/60 dark:border-white/10 rounded-3xl p-12 text-center">
              <ClipboardList className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {currentLang === 'hi' ? 'इस श्रेणी में कोई शिकायत नहीं' : 'No Complaints Found'}
              </h4>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {currentLang === 'hi'
                  ? 'चयनित स्थिति फ़िल्टर के साथ कोई शिकायत नहीं मिली है।'
                  : "Everything is clear under this status filter! No outstanding grievances registered."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
