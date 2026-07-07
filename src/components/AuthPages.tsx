/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Button } from './ui/Button';
import { useToast } from './ui/Toast';
import {
  Lock,
  Mail,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  Phone,
  Landmark,
  CreditCard,
  Building,
  GraduationCap,
  MapPin,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Language } from '../types';

interface AuthPagesProps {
  currentLang: Language;
  onAuthSuccess: (user: any) => void;
  onCancel: () => void;
}

type ScreenType = 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'complete-profile';

export const AuthPages: React.FC<AuthPagesProps> = ({
  currentLang,
  onAuthSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const [screen, setScreen] = useState<ScreenType>('login');

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Complete profile states
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [income, setIncome] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');

  // Password verification states
  const [verificationCode, setVerificationCode] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score, text: 'Weak Password', color: 'bg-rose-500' };
    if (score <= 4) return { score, text: 'Medium Strength', color: 'bg-amber-500' };
    return { score, text: 'Strong Security Password', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const validateEmail = (mail: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email address is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('Please correct the highlighted errors.', 'error');
      return;
    }

    setErrors({});
    // Simulate login
    const mockUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '9876543210',
      aadhaar: 'xxxx-xxxx-5643',
      pan: 'ABCDE9876Z',
      occupation: 'Self-Employed',
      education: 'Bachelor Degree',
      income: 500000,
      language: currentLang,
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      pincode: '560001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      savedSchemes: ['pm-kisan'],
      savedServices: ['passport-apply'],
    };

    onAuthSuccess(mockUser);
    toast(currentLang === 'hi' ? 'सफलतापूर्वक लॉग इन किया गया!' : 'Logged in securely as ' + mockUser.name, 'success');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = 'Full legal name is required';
    if (!email) newErrors.email = 'Email address is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';

    if (!phone) newErrors.phone = 'Mobile number is required';
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone number must be exactly 10 digits';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!agreeTerms) newErrors.terms = 'You must accept the terms of service';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('Please complete all mandatory parameters.', 'error');
      return;
    }

    setErrors({});
    // Move to verification code screen
    setScreen('verify');
    toast('Security code dispatched to ' + phone, 'info');
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      setErrors({ verify: 'Enter the 6-digit confirmation code' });
      return;
    }
    setErrors({});
    // Success, move to profile setup
    setScreen('complete-profile');
    toast('Email & Mobile Verified Successfully', 'success');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!aadhaar) newErrors.aadhaar = 'Aadhaar (12 digits) is required for verification eligibility';
    else if (!/^\d{12}$/.test(aadhaar.replace(/[-\s]/g, ''))) newErrors.aadhaar = 'Aadhaar must be a 12-digit number';

    if (!stateName) newErrors.state = 'State is required';
    if (!district) newErrors.district = 'District is required';
    if (!pincode) newErrors.pincode = '6-digit pincode is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast('Please verify Aadhaar and Location fields', 'error');
      return;
    }

    setErrors({});
    const fullUser = {
      name: name || 'Aarav Sharma',
      email: email || 'aarav@govmail.in',
      phone: phone || '9876543210',
      aadhaar: aadhaar,
      pan: pan || 'Not Linked',
      occupation: occupation || 'Retailer / Self Employed',
      education: education || 'Higher Secondary',
      income: income ? parseInt(income) : 360000,
      language: currentLang,
      state: stateName,
      district: district,
      pincode: pincode,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      savedSchemes: [],
      savedServices: [],
    };

    onAuthSuccess(fullUser);
    toast('Citizen profile initialized successfully!', 'success');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setErrors({ email: 'Provide a valid verified email address' });
      return;
    }
    setErrors({});
    setScreen('reset');
    toast('Reset password link transmitted to ' + email, 'info');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }
    setErrors({});
    setScreen('login');
    toast('Password successfully renewed. Please log in.', 'success');
  };

  const loadDemoUser = () => {
    const demoUser = {
      name: 'Aarav Sharma',
      email: 'aarav.sharma@govmail.in',
      phone: '9876543210',
      aadhaar: 'xxxx-xxxx-8901',
      pan: 'ABCDE1234F',
      occupation: 'Self-Employed / Retail',
      education: "Bachelor's Degree",
      income: 450000,
      language: currentLang,
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      pincode: '560001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      savedSchemes: ['pm-kisan', 'mudra-yojana'],
      savedServices: ['passport-apply', 'pan-verify'],
    };
    onAuthSuccess(demoUser);
    toast('Standard verified citizen profile loaded!', 'success');
  };

  return (
    <div className="max-w-md w-full mx-auto my-12 relative z-10 px-4">
      <div className="glass-card rounded-3xl p-8 shadow-xl border border-slate-200/50 dark:border-white/10 text-left">
        {/* Title branding block */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 via-white to-emerald-500 shadow-lg shadow-orange-500/10 text-slate-900 border border-white/20 mb-3">
            <Sparkles className="h-6 w-6 animate-pulse text-indigo-950" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
            {screen === 'login' && (currentLang === 'hi' ? 'नागरिक पोर्टल लॉग इन' : 'Citizen Access Center')}
            {screen === 'signup' && 'Create Citizen Profile'}
            {screen === 'forgot' && 'Reset Secure Access'}
            {screen === 'reset' && 'Define New Password'}
            {screen === 'verify' && 'Dual Factor Verification'}
            {screen === 'complete-profile' && 'Complete Profile Verification'}
          </h2>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {screen === 'complete-profile' ? 'Official Digilocker Matcher' : 'Smart Bharat Integrated Services'}
          </p>
        </div>

        {/* SCREEN 1: LOGIN */}
        {screen === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Citizen Email ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g., aarav.sharma@govmail.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.email && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Secret PIN / Password
                </label>
                <button
                  type="button"
                  onClick={() => setScreen('forgot')}
                  className="text-[10px] font-bold text-indigo-500 hover:underline cursor-pointer"
                >
                  Forgot PIN?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
              {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.password}</span>}
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3 mt-2">
              Sign In to Citizen Desk
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <div className="relative my-6 text-center">
              <span className="absolute inset-x-0 top-2.5 h-px bg-slate-200/40 dark:bg-white/5" />
              <span className="relative bg-white dark:bg-slate-900 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none">
                No Account Created?
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full justify-center rounded-xl border-dashed"
              onClick={() => setScreen('signup')}
            >
              Initialize New Account
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full justify-center text-xs font-bold text-indigo-500 hover:bg-slate-900/5 dark:hover:bg-white/5 border border-indigo-500/10 rounded-xl"
              onClick={loadDemoUser}
            >
              🇮🇳 Fast Demo Citizen Login (Pre-Verified)
            </Button>
          </form>
        )}

        {/* SCREEN 2: SIGNUP */}
        {screen === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Full Legal Name (As in Aadhaar)
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g., Aarav Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.name && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g., aarav.sharma@govmail.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.email && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Verified Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.phone && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.phone}</span>}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Define Secret Access Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {/* Password strength meter */}
              {password && (
                <div className="mt-2.5">
                  <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 mb-1">
                    <span>Password Strength:</span>
                    <span className="uppercase text-[8px] font-extrabold">{strength.text}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/40 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.password}</span>}
            </div>

            <label className="flex items-start gap-2.5 mt-4 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 accent-indigo-600 rounded"
              />
              <span className="text-[11px] font-semibold text-slate-500 leading-normal">
                I hereby accept the DigiLocker Consent Framework and Smart Bharat security terms.
              </span>
            </label>
            {errors.terms && <span className="text-[10px] font-bold text-rose-500 block mt-0.5">{errors.terms}</span>}

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3 mt-4">
              Trigger Verification Code
              <ShieldCheck className="w-4 h-4 ml-1.5" />
            </Button>

            <button
              type="button"
              onClick={() => setScreen('login')}
              className="text-center w-full text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mt-4 block"
            >
              Already Registered? <span className="text-indigo-500">Sign In</span>
            </button>
          </form>
        )}

        {/* SCREEN 3: VERIFY FORGOT PASSWORD */}
        {screen === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Enter your registered citizen email ID. We will transmit a cryptographically signed recovery reference to reset your secure Access PIN.
            </p>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Registered Email ID
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g., aarav.sharma@govmail.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.email && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3">
              Transmit Reset Code
            </Button>

            <button
              type="button"
              onClick={() => setScreen('login')}
              className="flex items-center justify-center gap-1.5 text-center w-full text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mt-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Login Page
            </button>
          </form>
        )}

        {/* SCREEN 4: RESET PASSWORD */}
        {screen === 'reset' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Define your new credentials securely. Make sure not to reuse prior security passwords.
            </p>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                New Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
              </div>
              {errors.password && <span className="text-[10px] font-bold text-rose-500 mt-1 block">{errors.password}</span>}
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3">
              Renew PIN & Password
            </Button>
          </form>
        )}

        {/* SCREEN 5: VERIFY DUAL-FACTOR CODE */}
        {screen === 'verify' && (
          <form onSubmit={handleVerifySubmit} className="space-y-5">
            <div className="bg-slate-900/5 dark:bg-white/5 border border-slate-200/30 dark:border-white/5 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                Dual Factor authentication is active. We sent a 6-digit cryptographic security code to your registered coordinates.
              </p>
            </div>

            <div>
              <label className="block text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Enter 6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center px-4 py-3 rounded-xl tracking-[0.75em] text-lg font-bold border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 backdrop-blur-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
              />
              {errors.verify && <span className="text-center text-[10px] font-bold text-rose-500 mt-1.5 block">{errors.verify}</span>}
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3">
              Confirm Verification
            </Button>

            <button
              type="button"
              onClick={() => {
                toast('New verification code dispatched.', 'success');
              }}
              className="text-center w-full text-[11px] font-bold text-indigo-500 hover:underline block"
            >
              Didn't receive? Resend Code
            </button>
          </form>
        )}

        {/* SCREEN 6: COMPLETE OFFICIAL PROFILE */}
        {screen === 'complete-profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Link official national cards to automatically verify service eligibility. Your data is stored encrypted locally.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Aadhaar Card (12 digits) *
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={14}
                    placeholder="1234-5678-9012"
                    value={aadhaar}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const formatted = val.match(/.{1,4}/g)?.join('-') || val;
                      setAadhaar(formatted.substring(0, 14));
                    }}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                {errors.aadhaar && <span className="text-[9px] font-bold text-rose-500 mt-1 block">{errors.aadhaar}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  PAN Card Number
                </label>
                <div className="relative">
                  <Landmark className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    maxLength={10}
                    placeholder="ABCDE1234F"
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Current Occupation
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="">Select Occupation</option>
                    <option value="Farmer">Farmer / Agriculture</option>
                    <option value="Self-Employed">Self-Employed / Retail</option>
                    <option value="Private Employee">Private Corporate Sector</option>
                    <option value="Student">Student / Academic</option>
                    <option value="Unemployed">Unemployed / Looking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Highest Education
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                  >
                    <option value="">Select Level</option>
                    <option value="Below Matric">Under 10th Standard</option>
                    <option value="Matriculation">Matriculation (10th)</option>
                    <option value="Higher Secondary">Higher Secondary (12th)</option>
                    <option value="Graduate">Graduate (Bachelor's)</option>
                    <option value="Postgraduate">Postgraduate (Master's+)</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Annual Household Income (INR)
              </label>
              <input
                type="number"
                placeholder="e.g., 450000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  placeholder="Karnataka"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
                {errors.state && <span className="text-[9px] font-bold text-rose-500 mt-1 block">{errors.state}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  District *
                </label>
                <input
                  type="text"
                  placeholder="Bengaluru"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40"
                />
                {errors.district && <span className="text-[9px] font-bold text-rose-500 mt-1 block">{errors.district}</span>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Pincode *
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="560001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200/50 dark:border-white/10 bg-white/30 dark:bg-slate-950/20 text-slate-900 dark:text-white text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500/40 text-center"
                />
                {errors.pincode && <span className="text-[9px] font-bold text-rose-500 mt-1 block">{errors.pincode}</span>}
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full justify-center rounded-xl py-3 mt-4">
              Verify & Authorize Profile
              <CheckCircle2 className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            Cancel and Return
          </button>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            SHA-256 Secured
          </div>
        </div>
      </div>
    </div>
  );
};
