
import React from 'react';
import { X, Moon, Sun, Type, Languages, Check } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  config: { theme: 'light' | 'dark', fontSize: 'small' | 'medium' | 'large', language: 'ar' | 'fr' };
  updateConfig: (key: string, value: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, config, updateConfig }) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">إعدادات المنصة</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400">
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
          <section>
            <div className="flex items-center gap-3 mb-4 text-slate-500 dark:text-slate-400">
              <Sun size={20} />
              <h4 className="text-sm font-bold uppercase tracking-wider">المظهر العام</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => updateConfig('theme', 'light')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${config.theme === 'light' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Sun size={24} />
                <span className="font-bold text-xs">فاتح</span>
              </button>
              <button 
                onClick={() => updateConfig('theme', 'dark')}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${config.theme === 'dark' ? 'border-indigo-500 bg-indigo-900/30 text-indigo-400' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <Moon size={24} />
                <span className="font-bold text-xs">داكن</span>
              </button>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-slate-500 dark:text-slate-400">
              <Languages size={20} />
              <h4 className="text-sm font-bold uppercase tracking-wider">اللغة</h4>
            </div>
            <div className="flex gap-4">
              {['ar', 'fr'].map(l => (
                <button 
                  key={l}
                  onClick={() => updateConfig('language', l)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${config.language === l ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  {l === 'ar' ? 'العربية' : 'Français'}
                  {config.language === l && <Check size={16} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4 text-slate-500 dark:text-slate-400">
              <Type size={20} />
              <h4 className="text-sm font-bold uppercase tracking-wider">حجم الخط</h4>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl">
              {['small', 'medium', 'large'].map(sz => (
                <button 
                  key={sz}
                  onClick={() => updateConfig('fontSize', sz)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${config.fontSize === sz ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
                >
                  {sz === 'small' ? 'صغير' : sz === 'medium' ? 'متوسط' : 'كبير'}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="p-8 bg-slate-50 dark:bg-slate-900/80 border-t dark:border-slate-800">
           <button onClick={onClose} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700">حفظ الإعدادات</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
