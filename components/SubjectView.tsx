import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  FileText, Download, Eye, X, Youtube, 
  Search, ExternalLink, Play, BookOpen, 
  FileCheck, Layers, Clock,
  Calculator, Zap, Dna, FlaskConical, PenTool, BrainCircuit, Languages, Moon,
  GraduationCap, Sparkles, Bell, Info, CheckCircle2, AlertCircle, 
  Maximize2, RefreshCw, Award, Target, TrendingUp
} from 'lucide-react';
import Plyr from 'plyr';
import { Subject, MaterialType, Material } from '../types';
import { translations } from '../translations';
import InteractiveQuiz from './InteractiveQuiz';



interface SubjectViewProps {
  subject: Subject;
  lang: 'ar' | 'fr';
}

const CATEGORY_CONFIG: Record<MaterialType, { icon: any, color: string, lightColor: string }> = {
  lesson: { icon: BookOpen, color: 'text-blue-600', lightColor: 'bg-blue-50 dark:bg-blue-900/20' },
  summary: { icon: FileCheck, color: 'text-emerald-600', lightColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
  video: { icon: Youtube, color: 'text-red-600', lightColor: 'bg-red-50 dark:bg-red-900/20' },
  series: { icon: Layers, color: 'text-purple-600', lightColor: 'bg-purple-50 dark:bg-purple-900/20' },
  exam: { icon: GraduationCap, color: 'text-orange-600', lightColor: 'bg-orange-50 dark:bg-orange-900/20' },
  assignment: { icon: FileText, color: 'text-amber-600', lightColor: 'bg-amber-50 dark:bg-amber-900/20' },
};

/**
 * Customizable Video Player Sub-component using Plyr
 */
const PlyrPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      playerRef.current = new Plyr(containerRef.current, {
        settings: ['quality', 'speed', 'loop'],
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
        },
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'pip',
          'airplay',
          'fullscreen',
        ],
        tooltips: { controls: true, seek: true },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900 overflow-hidden">
      <div className="w-full max-w-4xl p-2 sm:p-4 md:p-8">
        <div className="rounded-xl sm:rounded-[2rem] overflow-hidden shadow-2xl bg-black aspect-video">
          <div ref={containerRef} className="plyr__video-embed">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
              allowFullScreen
              allowTransparency
              allow="autoplay"
              title="Kasool Video Player"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * تحويل روابط Google Drive إلى روابط معاينة وتحميل مباشرة
 */
const convertGoogleDriveLink = (url: string, forDownload: boolean = false): string => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const fileId = match[1];
    if (forDownload) {
      // رابط التحميل المباشر
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    // رابط المعاينة
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) {
    const fileId = idMatch[1];
    if (forDownload) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
};

/**
 * عارض PDF محسّن مع تتبع التقدم
 */
const GooglePDFViewer: React.FC<{ 
  url: string; 
  title: string; 
  lang: 'ar' | 'fr'; 
  onProgressUpdate?: (progress: number) => void;
  currentProgress: number;
}> = ({ url, title, lang, onProgressUpdate, currentProgress }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isRtl = lang === 'ar';

  const previewUrl = convertGoogleDriveLink(url, false);
  const downloadUrl = convertGoogleDriveLink(url, true);

  useEffect(() => {
    const interval = setInterval(() => {
      setReadingTime(prev => {
        const newTime = prev + 1;
        const calculatedProgress = Math.min(Math.floor(newTime / 60) * 10, 50);
        setReadingProgress(calculatedProgress);
        
        if (onProgressUpdate && calculatedProgress > (currentProgress % 50)) {
          onProgressUpdate(calculatedProgress);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onProgressUpdate, currentProgress]);

  useEffect(() => {
    setIsLoading(true);
    setLoadError(false);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [reloadKey]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const reloadViewer = () => {
    setReloadKey(prev => prev + 1);
    setLoadError(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* شريط الأدوات المحسّن للموبايل */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          {/* الصف الأول: مؤشرات التقدم */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                <Clock size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                  {formatTime(readingTime)}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                <Target size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                  {readingProgress}%
                </span>
              </div>
            </div>

            {/* أزرار الإجراءات */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={reloadViewer}
                className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                title={isRtl ? 'إعادة التحميل' : 'Recharger'}
              >
                <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold items-center gap-1.5 transition-all shadow-md hover:shadow-lg"
              >
                <Maximize2 size={14} />
                <span className="hidden md:inline">{isRtl ? 'فتح' : 'Ouvrir'}</span>
              </a>
              <a
                href={downloadUrl}
                download
                className="flex px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold items-center gap-1.5 transition-all shadow-md hover:shadow-lg"
              >
                <Download size={14} />
                <span className="hidden sm:inline">{isRtl ? 'تحميل' : 'Télécharger'}</span>
              </a>
            </div>
          </div>

          {/* شريط التقدم الجميل */}
          {readingProgress > 0 && readingProgress < 50 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {isRtl ? 'تقدم القراءة' : 'Progression'}
                  </span>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {isRtl ? `${5 - Math.floor(readingTime / 60)} دقائق` : `${5 - Math.floor(readingTime / 60)} min`}
                </span>
              </div>
              
              {/* شريط التقدم الأنيق */}
              <div className="relative h-3 w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 transition-all duration-700 ease-out rounded-full"
                  style={{ 
                    width: `${(readingProgress / 50) * 100}%`,
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  <div className="absolute inset-0 bg-white/10 animate-shimmer" />
                </div>
                
                {/* النسبة المئوية داخل الشريط */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black text-white drop-shadow-lg">
                    {Math.round((readingProgress / 50) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* رسالة إكمال القراءة */}
          {readingProgress >= 50 && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-2 border-emerald-200 dark:border-emerald-800/30 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300">
                {isRtl ? '✨ ممتاز! انتقل للاختبار' : '✨ Parfait! Passez au quiz'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* منطقة عرض PDF */}
      <div className="flex-1 relative overflow-hidden">
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                {isRtl ? 'جاري التحميل...' : 'Chargement...'}
              </p>
            </div>
          </div>
        )}

        {loadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 z-10 p-4 sm:p-8">
            <div className="max-w-sm text-center space-y-4 sm:space-y-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full flex items-center justify-center">
                <AlertCircle size={40} className="sm:w-12 sm:h-12 text-amber-600 dark:text-amber-500" />
              </div>
              
              <div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white mb-2 sm:mb-3">
                  {isRtl ? 'تعذر العرض' : 'Erreur'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isRtl 
                    ? 'تأكد من الإذن العام للملف'
                    : 'Vérifiez les permissions'}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <button
                  onClick={reloadViewer}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
                >
                  <RefreshCw size={16} />
                  {isRtl ? 'إعادة المحاولة' : 'Réessayer'}
                </button>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all border-2 border-slate-200 dark:border-slate-700 shadow-lg text-sm"
                >
                  <ExternalLink size={16} />
                  {isRtl ? 'فتح خارجياً' : 'Ouvrir'}
                </a>
              </div>
            </div>
          </div>
        )}

        <iframe
          key={`google-${reloadKey}`}
          ref={iframeRef}
          src={previewUrl}
          title={title}
          className="w-full h-full border-none bg-white dark:bg-slate-900"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allowFullScreen
        />
      </div>

      {!isLoading && !loadError && readingProgress < 50 && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border-t border-indigo-100 dark:border-indigo-900/30 px-3 sm:px-6 py-2 sm:py-3">
          <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 text-center flex items-center justify-center gap-1.5 sm:gap-2">
            <Info size={10} className="sm:w-3 sm:h-3 shrink-0" />
            <span className="truncate">
              {isRtl 
                ? `اقرأ ${5 - Math.floor(readingTime / 60)} دقائق للحصول على 50%` 
                : `${5 - Math.floor(readingTime / 60)} min pour 50%`}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const SubjectView: React.FC<SubjectViewProps> = ({ subject, lang }) => {
  const [activeCategory, setActiveCategory] = useState<MaterialType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingMaterial, setViewingMaterial] = useState<Material | null>(null);
  const [viewMode, setViewMode] = useState<'video' | 'pdf' | 'quiz' | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<{ id: string, title: string, category: MaterialType }[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  
  const notifRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const CATEGORIES: { id: MaterialType; label: string }[] = [
    { id: 'lesson', label: t.lessons_cat },
    { id: 'summary', label: t.summaries_cat },
    { id: 'video', label: t.videos_cat },
    { id: 'series', label: t.series_cat },
    { id: 'exam', label: t.exams_cat },
    { id: 'assignment', label: t.assignments_cat },
  ];

  useEffect(() => {
    const loadedProgress: Record<string, number> = {};
    subject.materials.forEach(m => {
      const p = localStorage.getItem(`progress_${m.id}`);
      if (p) loadedProgress[m.id] = parseInt(p);
    });
    setProgressMap(loadedProgress);
  }, [subject.id]);

  const updateProgress = (materialId: string, value: number) => {
    const current = progressMap[materialId] || 0;
    if (value > current) {
      localStorage.setItem(`progress_${materialId}`, value.toString());
      setProgressMap(prev => ({ ...prev, [materialId]: value }));
    }
  };

  const handleQuizComplete = () => {
    if (viewingMaterial) {
      const currentProgress = progressMap[viewingMaterial.id] || 0;
      const newProgress = Math.min(currentProgress + 50, 100);
      updateProgress(viewingMaterial.id, newProgress);
    }
  };

  const handlePDFProgressUpdate = (readingProgress: number) => {
    if (viewingMaterial) {
      const currentProgress = progressMap[viewingMaterial.id] || 0;
      const quizProgress = currentProgress >= 50 ? 50 : 0;
      const newProgress = readingProgress + quizProgress;
      updateProgress(viewingMaterial.id, newProgress);
    }
  };

  useEffect(() => {
    if (activeCategory !== 'all') {
      const accessKey = `access_count_${subject.id}_${activeCategory}`;
      const count = parseInt(localStorage.getItem(accessKey) || '0') + 1;
      localStorage.setItem(accessKey, count.toString());
      localStorage.setItem(`last_seen_${subject.id}_${activeCategory}`, Date.now().toString());
    }

    const checkUpdates = () => {
      const topCategories = CATEGORIES
        .map(cat => ({ id: cat.id, count: parseInt(localStorage.getItem(`access_count_${subject.id}_${cat.id}`) || '0') }))
        .filter(c => c.count > 2)
        .sort((a, b) => b.count - a.count);

      if (topCategories.length > 0) {
        const topCat = topCategories[0];
        const lastNotifTime = parseInt(localStorage.getItem(`last_notif_${subject.id}_${topCat.id}`) || '0');
        
        if (Date.now() - lastNotifTime > 60000) {
          const newNotif = {
            id: `notif-${Date.now()}`,
            title: isRtl 
              ? `مواد جديدة في ${CATEGORIES.find(c => c.id === topCat.id)?.label}` 
              : `Nouveau: ${CATEGORIES.find(c => c.id === topCat.id)?.label}`,
            category: topCat.id
          };
          setNotifs(prev => [newNotif, ...prev].slice(0, 3));
          localStorage.setItem(`last_notif_${subject.id}_${topCat.id}`, Date.now().toString());
        }
      }
    };

    const interval = setTimeout(checkUpdates, 2000);
    return () => clearTimeout(interval);
  }, [subject.id, activeCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) setIsNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSubjectIcon = (iconName: string, size = 40) => {
    switch(iconName) {
      case 'Calculator': return <Calculator size={size} strokeWidth={2.5} />;
      case 'Zap': return <Zap size={size} strokeWidth={2.5} />;
      case 'Dna': return <Dna size={size} strokeWidth={2.5} />;
      case 'FlaskConical': return <FlaskConical size={size} strokeWidth={2.5} />;
      case 'PenTool': return <PenTool size={size} strokeWidth={2.5} />;
      case 'BrainCircuit': return <BrainCircuit size={size} strokeWidth={2.5} />;
      case 'Languages': return <Languages size={size} strokeWidth={2.5} />;
      case 'Moon': return <Moon size={size} strokeWidth={2.5} />;
      default: return <BookOpen size={size} strokeWidth={2.5} />;
    }
  };

  const displayedMaterials = useMemo(() => {
    let filtered = subject.materials;
    if (activeCategory !== 'all') filtered = filtered.filter(m => m.type === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m => m.title.toLowerCase().includes(q) || (m.description?.toLowerCase().includes(q)));
    }
    return filtered;
  }, [subject.materials, activeCategory, searchQuery]);

  const handleOpenMaterial = (material: Material) => {
    setViewingMaterial(material);
    setViewMode(material.type === 'video' ? 'video' : 'pdf');
    setActiveTab('content');
    
    const currentProgress = progressMap[material.id] || 0;
    if (currentProgress === 0) {
      updateProgress(material.id, 5);
    }
  };

  const closeViewer = () => {
    setViewingMaterial(null);
    setViewMode(null);
    setActiveTab('content');
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'from-green-500 via-emerald-500 to-green-600';
    if (progress >= 50) return 'from-indigo-500 via-purple-500 to-indigo-600';
    return 'from-blue-500 via-indigo-500 to-blue-600';
  };

  const getProgressLabel = (progress: number, isRtl: boolean) => {
    if (progress === 100) return isRtl ? '🎉 مكتمل' : '🎉 Terminé';
    if (progress >= 50) return isRtl ? '📚 قراءة' : '📚 Lecture';
    if (progress > 0) return isRtl ? '📖 جاري' : '📖 En cours';
    return isRtl ? '🆕 جديد' : '🆕 Nouveau';
  };

  return (
    <div className={`max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8 md:space-y-10 animate-in fade-in duration-500`}>
      
      {/* Header محسّن للموبايل */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${subject.color} rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-2xl transform rotate-3 shrink-0`}>
            {getSubjectIcon(subject.icon, 24)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white truncate">{subject.name}</h1>
              
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all relative shrink-0 ${notifs.length > 0 ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 animate-pulse' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  <Bell size={16} className="sm:w-5 sm:h-5" />
                  {notifs.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                  )}
                </button>
                
                {isNotifOpen && (
                  <div className={`absolute top-full mt-2 sm:mt-4 ${isRtl ? 'right-0' : 'left-0'} w-64 sm:w-72 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in duration-200`}>
                    <div className="p-3 sm:p-4 border-b dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500">{isRtl ? 'تحديثات' : 'Mises à jour'}</span>
                    </div>
                    <div className="max-h-48 sm:max-h-60 overflow-y-auto">
                      {notifs.length > 0 ? (
                        notifs.map(n => (
                          <button 
                            key={n.id}
                            onClick={() => {
                              setActiveCategory(n.category);
                              setIsNotifOpen(false);
                            }}
                            className="w-full p-3 sm:p-4 flex items-start gap-2 sm:gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b dark:border-slate-800 last:border-0"
                          >
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg shrink-0 flex items-center justify-center ${CATEGORY_CONFIG[n.category].lightColor} ${CATEGORY_CONFIG[n.category].color}`}>
                              {React.createElement(CATEGORY_CONFIG[n.category].icon, { size: 14 })}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <p className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-white leading-tight mb-1 truncate">{n.title}</p>
                              <span className="text-[9px] sm:text-[10px] text-indigo-500 font-bold uppercase">{CATEGORIES.find(c => c.id === n.category)?.label}</span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="p-6 sm:p-8 text-center">
                          <p className="text-[10px] sm:text-xs text-slate-400 italic">{isRtl ? 'لا توجد تحديثات' : 'Aucune mise à jour'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase">
                <FileText size={12} className="sm:w-3.5 sm:h-3.5" />
                {subject.materials.length} {t.files}
              </span>
            </div>
          </div>
        </div>

        {/* Search محسّن للموبايل */}
        <div className="relative w-full group">
          <div className={`absolute ${isRtl ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors`}>
            <Search size={16} className="sm:w-5 sm:h-5" />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search_placeholder}
            className={`w-full ${isRtl ? 'pr-10 sm:pr-12 pl-3 sm:pl-4' : 'pl-10 sm:pl-12 pr-3 sm:pr-4'} py-3 sm:py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl sm:rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-sm dark:shadow-none transition-all text-xs sm:text-sm font-medium`}
          />
        </div>
      </div>

      {/* Categories محسّن للموبايل */}
      <div className="sticky top-2 sm:top-4 z-40">
        <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold transition-all text-[10px] sm:text-xs whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shrink-0 ${activeCategory === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            {t.all_cat}
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold transition-all text-[10px] sm:text-xs whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shrink-0 ${activeCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              {React.createElement(CATEGORY_CONFIG[cat.id].icon, { size: 12, className: 'sm:w-3.5 sm:h-3.5' })}
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid محسّن للموبايل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pb-16 sm:pb-20">
        {displayedMaterials.length > 0 ? (
          displayedMaterials.map((material) => {
            const Config = CATEGORY_CONFIG[material.type];
            const progress = progressMap[material.id] || 0;
            return (
              <div key={material.id} className="group bg-white dark:bg-slate-900 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-400 transition-all duration-300 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${Config.lightColor} ${Config.color} rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                    {React.createElement(Config.icon, { size: 20, className: 'sm:w-6 sm:h-6' })}
                  </div>
                  <div className="flex gap-1 sm:gap-1.5">
                    <button onClick={() => handleOpenMaterial(material)} className="p-2 sm:p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg sm:rounded-xl transition-all"><Eye size={16} className="sm:w-[18px] sm:h-[18px]" /></button>
                    <a href={convertGoogleDriveLink(material.fileUrl, true)} download className="p-2 sm:p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg sm:rounded-xl transition-all"><Download size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">{material.title}</h3>
                
                {/* شريط التقدم الأنيق */}
                <div className="mt-2 mb-3 sm:mb-4">
                   <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        {progress === 100 && <Award size={10} className="sm:w-3 sm:h-3 text-yellow-500" />}
                        <span className="hidden sm:inline">{getProgressLabel(progress, isRtl)}</span>
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-600 dark:text-slate-300">
                        {progress}%
                      </span>
                   </div>
                   
                   {/* شريط التقدم الجميل */}
                   <div className="relative h-2.5 sm:h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-700`}
                        style={{ 
                          width: `${progress}%`,
                          boxShadow: progress > 0 ? '0 0 10px rgba(99, 102, 241, 0.3)' : 'none'
                        }}
                      >
                        {progress > 0 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            <div className="absolute inset-0 bg-white/10" />
                          </>
                        )}
                      </div>
                   </div>
                   
                   {progress > 0 && progress < 100 && (
                     <div className="flex items-center gap-2 sm:gap-3 mt-1.5 sm:mt-2">
                       <div className="flex items-center gap-1">
                         <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${progress >= 50 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                         <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-bold">
                           {isRtl ? 'قراءة' : 'Lecture'}
                         </span>
                       </div>
                       <div className="flex items-center gap-1">
                         <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${progress >= 100 ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                         <span className="text-[8px] sm:text-[9px] text-slate-500 dark:text-slate-400 font-bold">
                           {isRtl ? 'اختبار' : 'Quiz'}
                         </span>
                       </div>
                     </div>
                   )}
                </div>

                <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
                    <Clock size={10} className="sm:w-3 sm:h-3" />
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wider">{material.date}</span>
                  </div>
                  <span className={`text-[8px] sm:text-[9px] font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${Config.lightColor} ${Config.color} uppercase tracking-widest`}>
                    {CATEGORIES.find(c => c.id === material.type)?.label}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 sm:py-16 md:py-20 text-center bg-white/40 dark:bg-slate-900/40 rounded-2xl sm:rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <Search className="mx-auto mb-3 sm:mb-4 text-slate-300" size={32} />
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-500">{t.no_results}</h3>
          </div>
        )}
      </div>

      {/* Modal محسّن للموبايل */}
      {viewingMaterial && viewMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-2 md:p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in" onClick={closeViewer} />
          <div className="relative w-full max-w-7xl bg-white dark:bg-slate-900 rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-screen sm:h-[95vh] animate-in zoom-in slide-in-from-bottom-8 duration-300">
            
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${CATEGORY_CONFIG[viewingMaterial.type].lightColor} ${CATEGORY_CONFIG[viewingMaterial.type].color} rounded-lg sm:rounded-xl flex items-center justify-center shrink-0`}>
                  {React.createElement(CATEGORY_CONFIG[viewingMaterial.type].icon, { size: 16, className: 'sm:w-5 sm:h-5' })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-xs sm:text-sm md:text-base text-slate-900 dark:text-white truncate">{viewingMaterial.title}</h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase">{subject.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="hidden sm:flex items-center gap-1 sm:gap-2 bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-lg sm:rounded-xl">
                  <button 
                    onClick={() => setActiveTab('content')}
                    className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black transition-all ${activeTab === 'content' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-md' : 'text-slate-500'}`}
                  >
                    <FileText size={12} className="inline mr-1 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden md:inline">{t.content_tab}</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-black transition-all flex items-center gap-1 ${activeTab === 'quiz' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-md' : 'text-slate-500'}`}
                  >
                    <Sparkles size={12} className="text-amber-500 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden md:inline">{t.quiz_tab}</span>
                    {(progressMap[viewingMaterial.id] || 0) < 100 && (
                      <span className="text-[7px] sm:text-[8px] bg-amber-500 text-white px-1 sm:px-1.5 py-0.5 rounded-full">+50%</span>
                    )}
                  </button>
                </div>

                <button onClick={closeViewer} className="p-2 sm:p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg sm:rounded-xl transition-all">
                  <X size={18} className="sm:w-5 sm:h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="sm:hidden flex bg-slate-50 dark:bg-slate-800 border-b dark:border-slate-700">
              <button 
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-3 text-xs font-black transition-all ${activeTab === 'content' ? 'bg-white dark:bg-slate-900 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
              >
                <FileText size={14} className="inline mr-1" />
                {t.content_tab}
              </button>
              <button 
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-3 text-xs font-black transition-all ${activeTab === 'quiz' ? 'bg-white dark:bg-slate-900 text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}
              >
                <Sparkles size={14} className="inline mr-1 text-amber-500" />
                {t.quiz_tab}
                {(progressMap[viewingMaterial.id] || 0) < 100 && (
                  <span className="text-[7px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full ml-1">+50%</span>
                )}
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {activeTab === 'content' ? (
                <>
                  {viewMode === 'pdf' ? (
                    <GooglePDFViewer 
                      url={viewingMaterial.fileUrl} 
                      title={viewingMaterial.title}
                      lang={lang}
                      onProgressUpdate={handlePDFProgressUpdate}
                      currentProgress={progressMap[viewingMaterial.id] || 0}
                    />
                  ) : (
                    <PlyrPlayer videoId={getYoutubeId(viewingMaterial.fileUrl) || ''} />
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-white dark:bg-slate-900 overflow-y-auto">
                  <InteractiveQuiz 
                    quiz={viewingMaterial.quiz} 
                    lessonTitle={viewingMaterial.title} 
                    lang={lang} 
                    onComplete={handleQuizComplete}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectView;