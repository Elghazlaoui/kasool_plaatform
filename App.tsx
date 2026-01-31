
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  LayoutDashboard, 
  Search,
  Bell,
  Menu,
  X,
  Settings,
  BrainCircuit,
  Zap,
  Dna,
  PenTool,
  BookText,
  Languages,
  Activity,
  LogOut,
  Calculator,
  Compass,
  Globe2,
  FlaskConical,
  Moon as MoonIcon,
  Sun,
  History,
  User as UserIcon,
  Camera,
  Edit3,
  CheckCircle2,
  ChevronLeft,
  Heart,
  Code2,
  Command,
  UserCircle,
  ChevronDown,
  Instagram,
  Facebook
} from 'lucide-react';
import { Subject, Notification, Material } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import SubjectView from './components/SubjectView.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import NotificationToast from './components/NotificationToast.tsx';
import SearchResults from './components/SearchResults.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import Auth from './components/Auth.tsx';
import { translations } from './translations.ts';
import { ALL_SUBJECTS } from './data/lessons.ts';

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', title: 'تحديث المحتوى', description: 'تم إضافة دروس جديدة في مادة الفلسفة واللغة العربية.', time: 'الآن', isRead: false, subjectId: 'philo', type: 'new_material' },
  { id: '2', title: 'تنبيه هام', description: 'بقي وقت كافٍ للتحضير للامتحان الوطني 2026. واصل الاجتهاد!', time: 'أمس', isRead: false, type: 'exam_alert' }
];

const AVATAR_SEEDS = [
  'Felix', 'Jack', 'Oliver', 'Milo', 'Leo', 'Max', 'Sam', 'George', 
  'Aidan', 'Amir', 'Hiroshi', 'Mateo', 'Kofi', 'Ivan', 'Liam', 'Zayd',
  'Aria', 'Luna', 'Maya', 'Nora', 'Zoe', 'Lola', 'Jade', 'Iris',
  'Yuki', 'Fatima', 'Elena', 'Amara', 'Sasha', 'Mei', 'Zara', 'Inaya'
];

export default function App() {
  const [user, setUser] = useState<{ name: string; branch: string; avatar?: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'subject'>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAIChatOpen, setAIChatOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [isNotifPanelOpen, setIsNotifPanelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [editName, setEditName] = useState('');
  const [editBranch, setEditBranch] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState<{
    theme: 'light' | 'dark';
    fontSize: 'small' | 'medium' | 'large';
    language: 'ar' | 'fr';
  }>(() => {
    const saved = localStorage.getItem('kasool-config');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      fontSize: 'medium',
      language: 'ar'
    };
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const daysLeft = useMemo(() => {
    const examDate = new Date('2026-06-08T00:00:00');
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, []);

  useEffect(() => {
    localStorage.setItem('kasool-config', JSON.stringify(config));
    if (config.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const root = document.documentElement;
    if (config.fontSize === 'small') root.style.fontSize = '14px';
    else if (config.fontSize === 'medium') root.style.fontSize = '16px';
    else if (config.fontSize === 'large') root.style.fontSize = '18px';

    document.documentElement.dir = config.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = config.language;
  }, [config]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEditName(parsed.name);
      setEditBranch(parsed.branch);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifPanelOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = translations[config.language];
  const isRtl = config.language === 'ar';
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const updateConfig = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleLogin = (userData: { name: string; branch: string }) => {
    const finalUser = { ...userData, avatar: userData.name };
    setUser(finalUser);
    setEditName(userData.name);
    setEditBranch(userData.branch);
    localStorage.setItem('user', JSON.stringify(finalUser));
    setActiveToast(isRtl ? `أهلاً بك في كسول، ${userData.name}!` : `Bienvenue sur Kasool, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsProfileOpen(false);
  };

  const changeAvatar = (seed: string) => {
    if (!user) return;
    const updatedUser = { ...user, avatar: seed };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsAvatarModalOpen(false);
    setActiveToast(isRtl ? 'تم تحديث الصورة الشخصية بنجاح!' : 'Avatar mis à jour avec succès !');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    const updatedUser = { ...user, name: editName, branch: editBranch };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditProfileModalOpen(false);
    setIsProfileOpen(false);
    setActiveToast(isRtl ? 'تم تحديث بيانات الحساب بنجاح!' : 'Profil mis à jour avec succès !');
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setActiveTab('subject');
    setIsNotifPanelOpen(false);
    setIsProfileOpen(false);
    setSearchQuery('');
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const handleDashboardClick = () => {
    setActiveTab('dashboard');
    setSearchQuery('');
    setSelectedSubject(null);
    setIsProfileOpen(false);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const getSubjectIcon = (iconName: string) => {
    switch(iconName) {
      case 'Calculator': return <Calculator size={18} />;
      case 'Zap': return <Zap size={18} />;
      case 'Dna': return <Dna size={18} />;
      case 'FlaskConical': return <FlaskConical size={18} />;
      case 'PenTool': return <PenTool size={18} />;
      case 'Globe2': return <Globe2 size={18} />;
      case 'Compass': return <Compass size={18} />;
      case 'BookText': return <BookText size={18} />;
      case 'Languages': return <Languages size={18} />;
      case 'Activity': return <Activity size={18} />;
      case 'BrainCircuit': return <BrainCircuit size={18} />;
      case 'Moon': return <MoonIcon size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const results: { material: Material; subject: Subject }[] = [];
    
    ALL_SUBJECTS.forEach(subject => {
      const subjectMatch = subject.name.toLowerCase().includes(query);
      
      subject.materials.forEach(material => {
        const titleMatch = material.title.toLowerCase().includes(query);
        const descMatch = material.description?.toLowerCase().includes(query);
        const typeMatch = material.type.toLowerCase().includes(query);
        
        if (subjectMatch || titleMatch || descMatch || typeMatch) {
          results.push({ material, subject });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  if (!user) return <Auth onLogin={handleLogin} lang={config.language} />;

  const userAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar || user.name}`;

  return (
    <div className={`flex h-screen overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300 font-['Cairo']`}>
      {activeToast && <NotificationToast message={activeToast} onClose={() => setActiveToast(null)} />}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} config={config} updateConfig={updateConfig} />}

      {/* Edit Profile Modal */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsEditProfileModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{isRtl ? 'تعديل بيانات الحساب' : 'Modifier le profil'}</h3>
              <button onClick={() => setIsEditProfileModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">{isRtl ? 'الاسم الجديد' : 'Nouveau Nom'}</label>
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all dark:text-white font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">{isRtl ? 'الشعبة الدراسية' : 'Branche Académique'}</label>
                <div className="grid grid-cols-3 gap-3">
                  {['PC', 'SM', 'SVT'].map(b => (
                    <button 
                      key={b}
                      type="button"
                      onClick={() => setEditBranch(b)}
                      className={`py-3 rounded-xl border-2 font-bold text-xs transition-all ${editBranch === b ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95">
                {isRtl ? 'حفظ التغييرات' : 'Sauvegarder'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={() => setIsAvatarModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{isRtl ? 'اختر صورتك الشخصية' : 'Choisir votre avatar'}</h3>
              <button onClick={() => setIsAvatarModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {AVATAR_SEEDS.map(seed => (
                  <button 
                    key={seed} 
                    onClick={() => changeAvatar(seed)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 group ${user.avatar === seed ? 'border-indigo-600 ring-2 ring-indigo-500/20' : 'border-slate-100 dark:border-slate-800 shadow-sm'}`}
                  >
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} alt={seed} className="w-full h-full object-cover" />
                    {user.avatar === seed && (
                      <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center text-white">
                        <CheckCircle2 size={32} strokeWidth={3} className="drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden animate-in fade-in" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} z-[100] w-72 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full' : '-translate-x-full')}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleDashboardClick}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><GraduationCap size={24} /></div>
              <div>
                <h1 className="text-xl font-black text-slate-800 dark:text-white leading-none">{t.app_name}</h1>
                <p className="text-[9px] text-indigo-500 font-black uppercase mt-1">{t.subtitle}</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><X size={20} /></button>
          </div>

          <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto no-scrollbar">
            <button onClick={handleDashboardClick} className={`flex items-center gap-3 w-full p-3.5 rounded-2xl transition-all ${activeTab === 'dashboard' && !searchQuery ? 'bg-indigo-600 text-white shadow-lg font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <LayoutDashboard size={20} /> <span className="text-sm">{t.dashboard}</span>
            </button>
            <div className="pt-8 pb-3 px-4"><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.subjects}</p></div>
            <div className="space-y-1">
              {ALL_SUBJECTS.map(subject => (
                <button key={subject.id} onClick={() => handleSubjectClick(subject)} className={`flex items-center justify-between w-full p-3 rounded-xl transition-all group ${selectedSubject?.id === subject.id && activeTab === 'subject' && !searchQuery ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-sm`}>{getSubjectIcon(subject.icon)}</div>
                    <span className="text-xs line-clamp-1">{subject.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 shrink-0">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-4 text-center">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{t.countdown}</p>
              <p className="text-xl font-black text-red-500">{daysLeft} {t.days}</p>
            </div>
            <div className="space-y-1">
              <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-3 w-full p-3.5 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all">
                <Settings size={20} /> <span className="font-bold text-sm">{t.settings}</span>
              </button>
              <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all">
                <LogOut size={20} /> <span className="font-bold text-sm">{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-4 lg:px-10 shrink-0 z-50 relative">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"><Menu size={24} /></button>
            <div className="relative hidden sm:block">
              <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-400 pointer-events-none`}>
                <Search size={18} />
              </div>
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder={t.search_placeholder} 
                className={`${isRtl ? 'pr-12 pl-16' : 'pl-12 pr-16'} py-2.5 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl w-48 lg:w-80 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700`} 
              />
              <div className={`absolute ${isRtl ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[10px] font-black text-slate-400 uppercase pointer-events-none shadow-sm`}>
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button onClick={() => setAIChatOpen(!isAIChatOpen)} className="w-10 h-10 lg:w-auto lg:px-5 bg-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all active:scale-95"><BrainCircuit size={18} /><span className="text-sm font-bold hidden lg:inline">{t.ai_assistant}</span></button>
            
            <div className="relative" ref={notifRef}>
              <button onClick={() => setIsNotifPanelOpen(!isNotifPanelOpen)} className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors">
                <Bell size={22} />
                {unreadCount > 0 && <span className="absolute top-2 left-2 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">{unreadCount}</span>}
              </button>
              {isNotifPanelOpen && (
                <div className={`absolute top-full mt-4 ${isRtl ? 'left-0' : 'right-0'} w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 z-[120] overflow-hidden animate-in fade-in slide-in-from-top-2`}>
                  <div className="p-4 border-b dark:border-slate-800 font-black text-slate-800 dark:text-white flex items-center justify-between">
                    <span className="text-sm">الإشعارات</span>
                    <button onClick={() => setNotifications([])} className="text-[10px] text-indigo-600 dark:text-indigo-400">مسح الكل</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto no-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map(n => (
                        <div key={n.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 border-b dark:border-slate-800 last:border-0 transition-colors cursor-pointer">
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-1 leading-tight">{n.title}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">{n.description}</p>
                          <span className="text-[9px] text-slate-400 mt-2 block">{n.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-10 text-center text-slate-400 text-xs">لا توجد إشعارات حالياً</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all outline-none group">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm ring-2 ring-transparent group-hover:ring-indigo-50 transition-all">
                  <img src={userAvatarUrl} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-left hidden lg:flex flex-col pr-1">
                  <p className="text-xs font-black text-slate-800 dark:text-white leading-none line-clamp-1">{user.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase mt-1 flex items-center gap-1">
                    {user.branch}
                    <ChevronDown size={10} className={`transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </p>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className={`absolute top-full mt-4 ${isRtl ? 'left-0' : 'right-0'} w-56 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 z-[120] overflow-hidden animate-in fade-in slide-in-from-top-2`}>
                   <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-b dark:border-slate-800">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{isRtl ? 'حسابي' : 'Mon Compte'}</p>
                      <p className="text-sm font-black text-slate-800 dark:text-white truncate">{user.name}</p>
                   </div>
                   <div className="p-2">
                      <button 
                        onClick={() => { setIsEditProfileModalOpen(true); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                      >
                        <Edit3 size={18} className="group-hover:text-indigo-600" />
                        <span className="text-xs font-bold">{isRtl ? 'تعديل البيانات' : 'Modifier Profil'}</span>
                      </button>
                      <button 
                        onClick={() => { setIsAvatarModalOpen(true); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                      >
                        <Camera size={18} className="group-hover:text-indigo-600" />
                        <span className="text-xs font-bold">{isRtl ? 'تغيير الصورة' : 'Changer Photo'}</span>
                      </button>
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-2"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                      >
                        <LogOut size={18} />
                        <span className="text-xs font-bold">{isRtl ? 'تسجيل الخروج' : 'Déconnexion'}</span>
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth bg-slate-50 dark:bg-slate-950 transition-colors flex flex-col">
          <div className="flex-1">
            {searchQuery.trim() ? (
              <SearchResults 
                query={searchQuery} 
                results={searchResults} 
                onResultClick={handleSubjectClick} 
                onClear={() => setSearchQuery('')} 
                lang={config.language}
              />
            ) : activeTab === 'dashboard' ? (
              <Dashboard subjects={ALL_SUBJECTS} onSubjectClick={handleSubjectClick} lang={config.language} />
            ) : (
              selectedSubject && <SubjectView subject={selectedSubject} lang={config.language} />
            )}
          </div>

          <footer className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800 text-center pb-12 shrink-0">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 group">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl group-hover:rotate-12 transition-transform">
                  <Code2 size={24} />
                </div>
                <span className="font-black text-sm uppercase tracking-[0.3em]">{t.app_name}</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg font-black text-slate-800 dark:text-white px-4 leading-relaxed max-w-2xl mx-auto tracking-tight">
                  {isRtl 
                    ? "تمت برمجة الموقع من طرف محمد الغزلاوي" 
                    : "Site développé par Mohamed El Ghazlaoui"}
                </p>
                
                {/* Social Media Links */}
                <div className="flex items-center justify-center gap-4">
                  <a 
                    href="https://www.instagram.com/mohamedelghazlaoui/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
                    title="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href="https://www.facebook.com/mmid20667" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg hover:scale-110 active:scale-95 transition-all"
                    title="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                </div>

                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-60">
                   Premium Educational Engineering
                </p>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4">
                 <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-slate-200 dark:from-slate-800 to-transparent"></div>
                 <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <span>&copy; 2026</span>
                   <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                   <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-default">
                    <Heart size={12} className="text-red-500 fill-red-500" /> 
                    M. GHAZLAOUI
                   </span>
                 </div>
                 <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
              </div>
            </div>
          </footer>
        </div>

        {isAIChatOpen && (
          <div className={`fixed inset-y-0 ${isRtl ? 'left-0' : 'right-0'} w-full sm:w-[450px] z-[130] shadow-2xl`}>
            <AIAssistant onClose={() => setAIChatOpen(false)} />
          </div>
        )}
      </main>
    </div>
  );
}
