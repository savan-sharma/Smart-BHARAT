/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { useToast } from './ui/Toast';
import {
  User,
  Shield,
  CreditCard,
  Building,
  GraduationCap,
  MapPin,
  FileCheck,
  Bookmark,
  MessageSquare,
  AlertOctagon,
  Languages,
  Activity,
  LogOut,
  Settings,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { Language } from '../types';

interface ProfilePageProps {
  currentLang: Language;
  user: any;
  onLogout: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentLang,
  user,
  onLogout,
  onNavigateToTab,
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [phone, setPhone] = useState(user?.phone || '');
  const [occupation, setOccupation] = useState(user?.occupation || '');
  const [education, setEducation] = useState(user?.education || '');
  const [income, setIncome] = useState(user?.income || '');

  const handleSave = () => {
    setIsEditing(false);
    toast('Profile credentials updated.', 'success');
  };

  if (!user) {
    return (
      <div className="text-center py-16 bg-white/20 dark:bg-slate-950/10 backdrop-blur-md border border-dashed border-slate-200/60 dark:border-white/10 rounded-3xl max-w-xl mx-auto">
        <User className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Profile Active</h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-2 leading-relaxed">
          Please log in or initialize a new citizen profile to access custom portfolios.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in text-left">
      {/* Header Profile Banner Card */}
      <div className="bg-gradient-to-tr from-slate-900 via-indigo-950/80 to-slate-950 border border-white/10 p-6 sm:p-8 rounded-3xl text-white shadow-lg relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute right-0 bottom-0 h-44 w-44 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
          <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-md">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold tracking-tight">{user.name}</h2>
              <Badge variant="success" className="bg-emerald-500/15 border-emerald-500/20 text-emerald-400">
                Aadhaar Verified
              </Badge>
            </div>
            <p className="text-xs text-indigo-200 font-medium">{user.email}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Citizen ID: IND-{user.aadhaar.substring(user.aadhaar.length - 4)}-2026
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0 self-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-white hover:bg-white/10 font-bold border border-white/15 rounded-xl"
          >
            {isEditing ? 'Cancel Edit' : 'Modify Credentials'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20 font-bold rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Hand: Demographic Portfolio cards */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-indigo-500" />
              Verified Credentials
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5">
                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">Aadhaar Card</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {user.aadhaar}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5">
                <span className="text-[9px] font-bold text-slate-400 block uppercase mb-1">PAN Account Card</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {user.pan}
                </span>
              </div>

              <div className="space-y-3.5 pt-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Mobile Coordinate</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-xs font-semibold"
                    />
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{phone}</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Occupation Segment</span>
                  {isEditing ? (
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="mt-1 w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-xs font-semibold"
                    >
                      <option value="Self-Employed">Self-Employed</option>
                      <option value="Farmer">Farmer / Agriculture</option>
                      <option value="Corporate">Private Sector Employee</option>
                      <option value="Academic">Student / Researcher</option>
                    </select>
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{occupation}</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Highest Education</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="mt-1 w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-xs font-semibold"
                    />
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{education}</span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Household Annual income</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="mt-1 w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-transparent text-xs font-semibold"
                    />
                  ) : (
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      ₹{parseInt(income).toLocaleString('en-IN')} / Year
                    </span>
                  )}
                </div>

                {isEditing && (
                  <Button variant="primary" size="sm" onClick={handleSave} className="w-full justify-center mt-2">
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Residence & Demographics */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/50 dark:border-white/10">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-rose-500" />
              Resident Location
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-[9px] text-slate-400 block uppercase mb-0.5">State</span>
                <span className="text-slate-800 dark:text-slate-200">{user.state}</span>
              </div>
              <div className="p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-[9px] text-slate-400 block uppercase mb-0.5">District</span>
                <span className="text-slate-800 dark:text-slate-200">{user.district}</span>
              </div>
              <div className="col-span-2 p-3 bg-slate-900/5 dark:bg-white/5 rounded-2xl">
                <span className="text-[9px] text-slate-400 block uppercase mb-0.5">Postal PIN Area</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{user.pincode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand: Interactive lists and summaries */}
        <div className="lg:col-span-8 space-y-6">
          {/* Saved Schemes & Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Bookmark className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20" />
                  Saved Welfare Schemes
                </h3>
                <span className="text-[10px] font-bold text-slate-400">
                  {user.savedSchemes.length} Pinned
                </span>
              </div>
              
              {user.savedSchemes.length > 0 ? (
                <div className="space-y-2.5">
                  {user.savedSchemes.map((id: string) => (
                    <div key={id} className="p-3 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                          {id === 'pm-kisan' ? 'PM Kisan Samman Nidhi' : id === 'mudra-yojana' ? 'PM MUDRA Loan Yojana' : id}
                        </h4>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-semibold mt-0.5">
                          National Welfare Support
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigateToTab('schemes')}
                        className="p-1 text-indigo-500 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-lg"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 font-semibold border border-dashed border-slate-200/50 dark:border-white/5 rounded-2xl">
                  No bookmarked schemes.
                </div>
              )}
            </div>

            <div className="glass-card rounded-3xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4.5 h-4.5 text-indigo-500" />
                  Saved Identity Services
                </h3>
                <span className="text-[10px] font-bold text-slate-400">
                  {user.savedServices.length} Pinned
                </span>
              </div>

              {user.savedServices.length > 0 ? (
                <div className="space-y-2.5">
                  {user.savedServices.map((id: string) => (
                    <div key={id} className="p-3 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[160px]">
                          {id === 'passport-apply' ? 'Passport Office Registration' : id === 'pan-verify' ? 'PAN Card Permanent Verification' : id}
                        </h4>
                        <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-semibold mt-0.5">
                          Documentation Service
                        </span>
                      </div>
                      <button
                        onClick={() => onNavigateToTab('services')}
                        className="p-1 text-indigo-500 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-lg"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 font-semibold border border-dashed border-slate-200/50 dark:border-white/5 rounded-2xl">
                  No bookmarked services.
                </div>
              )}
            </div>
          </div>

          {/* Grievance Complaint History */}
          <div className="glass-card rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-200/40 dark:border-white/5">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <AlertOctagon className="w-4.5 h-4.5 text-rose-500" />
                Your Civic Report History
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateToTab('report')}
                className="text-xs font-bold text-indigo-500 hover:bg-indigo-500/5 rounded-xl h-8 px-2.5"
              >
                Launch Tracker
              </Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'SBG-2026-9043',
                  title: 'Blocked Drainage on Outer Ring Road',
                  dept: 'Municipal Corporation (BBMP)',
                  status: 'In Progress',
                  date: 'Today, 10:15 AM',
                  statusColor: 'bg-amber-500/10 text-amber-500',
                },
                {
                  id: 'SBG-2026-8721',
                  title: 'Flickering Streetlight Near Ward 12 Intersection',
                  dept: 'Electricity Board (BESCOM)',
                  status: 'Resolved',
                  date: 'Yesterday, 04:30 PM',
                  statusColor: 'bg-emerald-500/10 text-emerald-500',
                },
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{item.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300 mt-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.dept} • Reported: {item.date}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-xl self-start sm:self-center"
                    onClick={() => onNavigateToTab('report')}
                  >
                    Track Status
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Account Security Card */}
          <div className="glass-card rounded-3xl p-6 shadow-xs bg-gradient-to-tr from-indigo-500/5 to-transparent border border-indigo-500/10">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4.5 h-4.5 text-indigo-500" />
              Portal Security Control
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-950/20 border border-slate-200/40 dark:border-white/5 space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">2-Factor Biometrics</h4>
                <p className="text-[10px] text-slate-400 font-medium">Secured using Fingerprint check via Aadhaar linkage.</p>
                <Badge variant="success" className="mt-2 block bg-emerald-500/10 text-emerald-500 max-w-fit">
                  Enabled
                </Badge>
              </div>

              <div className="p-4 rounded-2xl bg-white/40 dark:bg-slate-950/20 border border-slate-200/40 dark:border-white/5 space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">DigiLocker Bridge</h4>
                <p className="text-[10px] text-slate-400 font-medium">Auto-verifies official electronic documents on checkouts.</p>
                <Badge variant="success" className="mt-2 block bg-emerald-500/10 text-emerald-500 max-w-fit">
                  Connected
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
