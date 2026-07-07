/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  ShieldAlert,
  Users,
  AlertTriangle,
  CheckCircle,
  Building2,
  TrendingUp,
  Cpu,
  Search,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  Activity,
  FileSpreadsheet,
  Grid
} from 'lucide-react';
import { Language } from '../types';

interface AdminDashboardProps {
  currentLang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentLang }) => {
  const { toast } = useToast();

  const [activeFilter, setActiveFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { name: 'Aarav Sharma', state: 'Karnataka', district: 'Bengaluru Urban', verified: true, date: 'Today, 11:20 AM', role: 'Citizen' },
    { name: 'Priya Patel', state: 'Gujarat', district: 'Ahmedabad', verified: true, date: 'Today, 10:45 AM', role: 'Citizen' },
    { name: 'Karan Singh', state: 'Punjab', district: 'Amritsar', verified: false, date: 'Yesterday, 04:12 PM', role: 'Citizen' },
    { name: 'Sneha Reddy', state: 'Telangana', district: 'Hyderabad', verified: true, date: 'Yesterday, 02:50 PM', role: 'Citizen' },
    { name: 'Amit Banerjee', state: 'West Bengal', district: 'Kolkata', verified: true, date: 'July 5, 2026', role: 'Citizen' },
  ];

  const complaints = [
    { id: 'SBG-9021', title: 'Streetlight Blackout in Sector 4', dept: 'Electricity Board', priority: 'High', status: 'In Progress', date: 'Today, 08:30 AM' },
    { id: 'SBG-8874', title: 'Water leakage in Ward 45 main conduit', dept: 'Water Supply (BWSSB)', priority: 'Medium', status: 'Assigned', date: 'Yesterday, 03:20 PM' },
    { id: 'SBG-8712', title: 'Potholes on High Street Bypass', dept: 'Public Works Dept', priority: 'High', status: 'Resolved', date: 'July 5, 2026' },
    { id: 'SBG-8561', title: 'Unauthorized Waste Dump near Lake area', dept: 'Municipal Corp', priority: 'Low', status: 'Submitted', date: 'July 4, 2026' },
    { id: 'SBG-8430', title: 'No Internet bridge at Panchayat school', dept: 'Telecomm Board', priority: 'Medium', status: 'Resolved', date: 'July 2, 2026' },
  ];

  const departments = [
    { name: 'Municipal Corp (BBMP)', activeTickets: 34, resolutionSpeed: '28 Hours', loadFactor: '76%' },
    { name: 'Electricity Board (BESCOM)', activeTickets: 21, resolutionSpeed: '18 Hours', loadFactor: '45%' },
    { name: 'Water Supply (BWSSB)', activeTickets: 19, resolutionSpeed: '32 Hours', loadFactor: '62%' },
    { name: 'Public Works Dept (PWD)', activeTickets: 42, resolutionSpeed: '54 Hours', loadFactor: '88%' },
  ];

  const filteredComplaints = complaints.filter(item => {
    const matchesPriority = activeFilter === 'All' || item.priority === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handleAdminAction = (action: string) => {
    toast(`Administrative command executed: ${action}`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Top Banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950/80 to-slate-950 border border-white/10 p-6 sm:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute right-0 bottom-0 h-44 w-44 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative z-10 max-w-xl">
          <Badge className="bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-3 font-bold">
            🔒 Restricted Ward Administration
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Smart Bharat Command Center</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Monitor real-time citizen signups, track grievance resolving speeds across departments, and review AI-Powered diagnostic charts.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAdminAction('Export System Logs')}
          className="text-white border-white/10 hover:bg-white/10 shrink-0 self-start md:self-center font-bold"
        >
          <FileSpreadsheet className="w-4 h-4 mr-1.5" />
          Export Live Ledger
        </Button>
      </div>

      {/* Grid: Main administrative KPI stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        {[
          { label: 'Citizen Registrations', val: '12,490', change: '+12% this week', icon: Users, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' },
          { label: 'Total Grievances', val: '2,810', change: '84% resolved rate', icon: AlertTriangle, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' },
          { label: 'Pending Inspections', val: '312', change: 'Avg: 31 hours delay', icon: ShieldAlert, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' },
          { label: 'AI Companion Chats', val: '8,421', change: '96% satisfaction', icon: Cpu, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-200/50 dark:border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{stat.label}</span>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">{stat.val}</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-400 block">{stat.change}</span>
            </div>
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon className="w-5.5 h-5.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Charts: Status Resolution & AI API Calls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Hand: Custom SVG Line/Bar Interactive Graph */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4.5 h-4.5 text-indigo-500" />
                Resolution Efficiency Rate (Monthly Overview)
              </h3>
              <Badge variant="success">96.4% Compliance</Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mb-6">
              Compare average time elapsed to mark civic complaints resolved. Green indicates optimal ward speed targets.
            </p>
          </div>

          <div className="h-52 w-full flex items-end gap-5 pt-4 border-b border-slate-200/40 dark:border-white/5 pb-2 relative font-semibold text-[10px]">
            {/* Horizontal guidelines */}
            <div className="absolute top-2 left-0 right-0 border-t border-dashed border-slate-200/30 dark:border-white/5" />
            <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-200/30 dark:border-white/5" />

            {[
              { label: 'Jan', rate: 72, volume: '410 tickets', fill: 'bg-indigo-500/40' },
              { label: 'Feb', rate: 78, volume: '580 tickets', fill: 'bg-indigo-500/40' },
              { label: 'Mar', rate: 84, volume: '620 tickets', fill: 'bg-indigo-500/50' },
              { label: 'Apr', rate: 91, volume: '730 tickets', fill: 'bg-indigo-500/60' },
              { label: 'May', rate: 95, volume: '840 tickets', fill: 'bg-emerald-500/80 animate-pulse' },
              { label: 'Jun', rate: 97, volume: '910 tickets', fill: 'bg-emerald-500' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                <span className="absolute -top-7 scale-0 group-hover:scale-100 bg-slate-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all z-10">
                  {bar.volume} ({bar.rate}%)
                </span>
                <div
                  className={`w-full ${bar.fill} rounded-t-lg transition-all duration-500 hover:opacity-80`}
                  style={{ height: `${(bar.rate / 100) * 160}px` }}
                />
                <span className="text-slate-500 uppercase font-bold tracking-wider">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Hand: AI Usage Metrics */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 flex flex-col justify-between">
          <div className="pb-4 border-b border-slate-200/40 dark:border-white/5">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-indigo-500" />
              AI Companion Analytics
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mt-1">Classification of conversational requests handled by our AI Desk.</p>
          </div>

          <div className="py-4 space-y-3 text-xs font-bold">
            {[
              { label: 'Scheme Eligibility Matches', percentage: 48, count: '4,042 queries', color: 'bg-indigo-500' },
              { label: 'Document Guide Searches', percentage: 32, count: '2,694 queries', color: 'bg-emerald-500' },
              { label: 'Complaint Previews Generated', percentage: 14, count: '1,178 queries', color: 'bg-amber-500' },
              { label: 'Language Translations requests', percentage: 6, count: '505 queries', color: 'bg-rose-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between font-semibold text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                  <span className="text-slate-900 dark:text-white">{item.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
                <span className="text-[9px] text-slate-400 block mt-0.5">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Tables details (Users Table & Complaints Filter Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Complaints filter list */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-rose-500" />
              Grievance Inspection Ledger
            </h3>
            
            {/* Priority Quick Filter */}
            <div className="flex gap-1 bg-slate-900/5 dark:bg-white/5 p-1 rounded-xl border border-slate-200/40 dark:border-white/5 self-end sm:self-center">
              {(['All', 'High', 'Medium', 'Low'] as const).map((ft) => (
                <button
                  key={ft}
                  onClick={() => setActiveFilter(ft)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition-colors cursor-pointer ${
                    activeFilter === ft
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/5'
                  }`}
                >
                  {ft}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside admin table */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search grievances by ID, department, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          {/* Table representing complaints */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold">
              <thead>
                <tr className="border-b border-slate-200/40 dark:border-white/5 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-2">Complaint ID</th>
                  <th className="pb-3">Title & Dept</th>
                  <th className="pb-3">Priority</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/30 dark:divide-white/5 text-slate-700 dark:text-slate-300">
                {filteredComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">{item.id}</td>
                    <td className="py-3 max-w-[180px]">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-400">{item.dept}</p>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.priority === 'High' ? 'bg-rose-500/15 text-rose-500' : 'bg-slate-500/10 text-slate-400'
                      }`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-3">
                      <Badge variant={item.status === 'Resolved' ? 'success' : 'secondary'} className="text-[9px] font-bold">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAdminAction(`Review ${item.id}`)}
                        className="h-8 px-2.5 rounded-lg text-indigo-500 hover:bg-indigo-500/5"
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Users Table & Active Dept lists */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Registrations table */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-200/40 dark:border-white/5">
              <Users className="w-4.5 h-4.5 text-indigo-500" />
              Newly Registered Citizens
            </h3>

            <div className="space-y-3">
              {users.map((u, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 text-xs">
                  <div className="space-y-0.5 max-w-[180px]">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200">{u.name}</h4>
                      {u.verified && (
                        <Badge variant="success" className="text-[8px] px-1 py-0 bg-emerald-500/10 text-emerald-500">
                          Aadhaar
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold truncate">
                      {u.district}, {u.state}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{u.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Departments overview */}
          <div className="glass-card rounded-3xl p-6 shadow-xs border border-slate-200/50 dark:border-white/10 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4.5 h-4.5 text-indigo-500" />
              Department Load Factor
            </h3>

            <div className="space-y-3 text-xs">
              {departments.map((dept, idx) => (
                <div key={idx} className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-slate-200/40 dark:border-white/5 space-y-1.5 font-bold">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-800 dark:text-slate-200">{dept.name}</span>
                    <Badge variant="secondary" className="text-[9px]">
                      Avg Speed: {dept.resolutionSpeed}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400">
                    <span>{dept.activeTickets} Active Tickets</span>
                    <span>Load Factor: {dept.loadFactor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
