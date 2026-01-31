
import React, { useState } from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  User, 
  Sparkles, 
  Fingerprint,
  UserPlus,
  LogIn,
  CheckCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import { translations } from '../translations';

interface AuthProps {
  onLogin: (user: { name: string; branch: string }) => void;
  lang: 'ar' | 'fr';
}

const Auth: React.FC<AuthProps> = ({ onLogin, lang }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [branch, setBranch] = useState('PC');
  
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const BRANCHES = [
    { id: 'PC', label: t.PC_branch, icon: '⚡' },
    { id: 'SM', label: t.SM_branch, icon: '📐' },
    { id: 'SVT', label: t.SVT_branch, icon: '🧬' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup' && !name.trim()) return;
    if (!email.trim() || !password.trim()) return;
    
    // استخدام الاسم المُدخل أو الجزء الأول من البريد الإلكتروني كاسم عرض
    const displayName = activeTab === 'signup' ? name : email.split('@')[0];
    onLogin({ name: displayName, branch });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 font-['Cairo'] relative overflow-hidden">
      {/* تأثيرات الخلفية */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]"></div>

      <div className="w-full max-w-[500px] relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-white dark:border-slate-800 overflow-hidden transition-all duration-500">
          
          {/* Header */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="inline-flex relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg text-indigo-600 animate-bounce">
                <Sparkles size={16} />
              </div>
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              {t.app_name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
              {t.subtitle}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="px-8 mb-6">
            <div className="bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-[1.25rem] flex items-center shadow-inner">
              <button 
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'signup' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <UserPlus size={16} />
                {isRtl ? 'إنشاء حساب' : 'Sign Up'}
              </button>
              <button 
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${activeTab === 'login' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LogIn size={16} />
                {isRtl ? 'تسجيل الدخول' : 'Login'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-5">
            {/* حقل الاسم - يظهر فقط في إنشاء حساب */}
            {activeTab === 'signup' && (
              <div className="animate-in slide-in-from-bottom-2 duration-300">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 px-1 uppercase tracking-widest">
                  {isRtl ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors`}>
                    <User size={18} />
                  </div>
                  <input 
                    required
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRtl ? "أدخل اسمك الكامل..." : "Your full name..."}
                    className={`w-full ${isRtl ? 'pr-12 pl-5' : 'pl-12 pr-5'} py-3.5 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 dark:focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white font-bold text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                  />
                </div>
              </div>
            )}

            {/* حقل البريد الإلكتروني */}
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 px-1 uppercase tracking-widest">
                {isRtl ? 'البريد الإلكتروني (Gmail)' : 'Email Address'}
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors`}>
                  <Mail size={18} />
                </div>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className={`w-full ${isRtl ? 'pr-12 pl-5' : 'pl-12 pr-5'} py-3.5 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 dark:focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white font-bold text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 px-1 uppercase tracking-widest">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative group">
                <div className={`absolute inset-y-0 ${isRtl ? 'right-4' : 'left-4'} flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors`}>
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full ${isRtl ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-3.5 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-indigo-600 dark:focus:border-indigo-500 rounded-2xl outline-none transition-all dark:text-white font-bold text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} flex items-center text-slate-400 hover:text-indigo-600 transition-colors`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* اختيار التخصص - يظهر فقط في إنشاء حساب */}
            {activeTab === 'signup' && (
              <div className="animate-in slide-in-from-bottom-2 duration-400">
                <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 px-1 uppercase tracking-widest">
                  {isRtl ? 'تخصصك الدراسي' : 'Academic Branch'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {BRANCHES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBranch(b.id)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${branch === b.id ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'border-transparent bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                      <span className="text-lg">{b.icon}</span>
                      <span className="font-bold text-[10px] whitespace-nowrap">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* زر الإرسال */}
            <button 
              type="submit"
              className="group w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-[0_20px_40px_-12px_rgba(79,70,229,0.4)] hover:bg-indigo-700 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span>
                {activeTab === 'signup' 
                  ? (isRtl ? 'بدء الرحلة التعليمية' : 'Start Journey') 
                  : (isRtl ? 'دخول للمنصة' : 'Enter Platform')}
              </span>
              <ArrowRight size={18} className={`${isRtl ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
            </button>
          </form>

          {/* Footer Info */}
          <div className="px-8 pb-8 text-center border-t dark:border-slate-800 pt-6 mt-2">
             <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600">
                <Fingerprint size={14} />
                <p className="text-[9px] font-black uppercase tracking-widest">
                   نظام مشفر وآمن بالكامل لطلاب البكالوريا
                </p>
             </div>
          </div>
        </div>

        <p className="text-center mt-6 text-slate-400 dark:text-slate-500 text-[10px] font-bold">
           &copy; 2026 Kasool Platform • Made with ❤️ for Students
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Auth;
