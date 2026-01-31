
import React from 'react';
import { 
  BookOpen, Clock, Calendar, ChevronLeft, FileText, Star, 
  ShieldCheck, GraduationCap, Calculator, Zap, Dna, FlaskConical,
  PenTool, BrainCircuit, Languages, Moon
} from 'lucide-react';
import { Subject } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  subjects: Subject[];
  onSubjectClick: (s: Subject) => void;
  lang: 'ar' | 'fr';
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, onSubjectClick, lang }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const getSubjectIcon = (iconName: string, size = 24) => {
    switch(iconName) {
      case 'Calculator': return <Calculator size={size} />;
      case 'Zap': return <Zap size={size} />;
      case 'Dna': return <Dna size={size} />;
      case 'FlaskConical': return <FlaskConical size={size} />;
      case 'PenTool': return <PenTool size={size} />;
      case 'BrainCircuit': return <BrainCircuit size={size} />;
      case 'Languages': return <Languages size={size} />;
      case 'Moon': return <Moon size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-10 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-blue-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-8">
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md mb-4 md:mb-6 border border-white/10">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider">استعدادات 2026</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4 leading-tight">
              {t.welcome_title} <br/><span className="text-indigo-300">{t.welcome_subtitle}</span>
            </h2>
            <p className="text-indigo-100/80 mb-6 md:mb-8 text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">{t.welcome_desc}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-green-400/20 flex items-center justify-center text-green-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-200">{t.done_lessons}</p>
                  <p className="text-xs md:text-sm font-bold">65%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 md:px-5 md:py-3 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-400/20 flex items-center justify-center text-blue-400">
                  <BookOpen size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-200">{t.summaries}</p>
                  <p className="text-xs md:text-sm font-bold">24 {t.files}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex justify-end opacity-10">
             <GraduationCap size={280} strokeWidth={0.5} />
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full blur-[100px] md:blur-[120px] opacity-20"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 md:w-80 md:h-80 bg-blue-400 rounded-full blur-[80px] md:blur-[100px] opacity-10"></div>
      </section>

      {/* Subjects Grid */}
      <section>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8 text-center sm:text-right">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">{t.subjects}</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-[9px] md:text-[10px] font-bold">{t.scientific_branch}</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-[9px] md:text-[10px] font-bold">{t.intl_branch}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {subjects.map(subject => (
            <button 
              key={subject.id}
              onClick={() => onSubjectClick(subject)}
              className="group bg-white dark:bg-slate-900 p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xl transition-all text-center flex flex-col items-center"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${subject.color} rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-3 md:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {getSubjectIcon(subject.icon, 24)}
              </div>
              <h4 className="text-xs md:text-sm font-black text-slate-800 dark:text-white mb-1 line-clamp-1">{subject.name}</h4>
              <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{subject.materials.length} {t.files}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Stats & Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pb-10">
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-3 text-base md:text-lg">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Clock size={18} />
              </div>
              {t.recent_updates}
            </h3>
            <button className="text-[10px] md:text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
              {t.view_all}
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {subjects.flatMap(s => s.materials.map(m => ({ ...m, subjectName: s.name, subjectIcon: s.icon }))).slice(0, 5).map(material => (
              <div key={material.id} className="p-4 md:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 flex items-center justify-between group cursor-pointer transition-all">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex items-center justify-center text-slate-400 shrink-0">
                    {getSubjectIcon(material.subjectIcon, 18)}
                  </div>
                  <div className={`${isRtl ? 'text-right' : 'text-left'} truncate`}>
                    <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs md:text-sm mb-0.5 md:mb-1 truncate">{material.title}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] md:text-[10px] font-bold text-indigo-500 truncate">{material.subjectName}</span>
                      <span className="text-[9px] text-slate-400 capitalize">{t[`${material.type}_cat` as keyof typeof t]}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[9px] text-slate-400 hidden sm:block">{material.date}</span>
                  <div className={`p-1.5 text-slate-300 group-hover:text-indigo-500 transition-all ${!isRtl ? '' : 'rotate-180'}`}>
                    <ChevronLeft size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <h3 className="font-black text-slate-800 dark:text-white flex items-center gap-3 text-base md:text-lg">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg md:rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              {t.important_dates}
            </h3>
          </div>
          <div className="p-5 md:p-6 space-y-5 md:space-y-6 flex-1">
            <div className={`relative ${isRtl ? 'pr-6 border-r-2' : 'pl-6 border-l-2'} border-slate-100 dark:border-slate-800`}>
               <div className={`absolute ${isRtl ? '-right-[6px]' : '-left-[6px]'} top-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900`}></div>
               <p className="text-[9px] font-bold text-red-500 mb-0.5 uppercase">Juin 2026</p>
               <h5 className="font-black text-slate-800 dark:text-white text-xs md:text-sm">{t.national_exam}</h5>
               <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1">{t.national_desc}</p>
            </div>
            
            <div className={`relative ${isRtl ? 'pr-6 border-r-2' : 'pl-6 border-l-2'} border-slate-100 dark:border-slate-800`}>
               <div className={`absolute ${isRtl ? '-right-[6px]' : '-left-[6px]'} top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900`}></div>
               <p className="text-[9px] font-bold text-amber-500 mb-0.5 uppercase">Avril 2026</p>
               <h5 className="font-black text-slate-800 dark:text-white text-xs md:text-sm">{t.final_exams}</h5>
               <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 mt-1">{t.final_exams_desc}</p>
            </div>

            <div className="mt-4 md:mt-8 pt-4 md:pt-6 border-t border-dashed border-slate-200 dark:border-slate-800">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl md:rounded-2xl p-4 md:p-5 border border-indigo-100 dark:border-indigo-900/30">
                <p className="text-[10px] md:text-xs text-indigo-700 dark:text-indigo-400 font-bold mb-1.5 flex items-center gap-2">
                  <Star size={12} fill="currentColor" />
                  {t.tip_day}
                </p>
                <p className="text-[10px] md:text-[11px] text-indigo-900/70 dark:text-indigo-200/70 leading-relaxed italic">{t.tip_content}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
