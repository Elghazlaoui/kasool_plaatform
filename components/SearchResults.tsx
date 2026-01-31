
import React, { useMemo } from 'react';
import { FileText, Search, X, ChevronRight, BookOpen, Layers, Sparkles, BrainCircuit } from 'lucide-react';
import { Subject, Material } from '../types';

interface SearchResultsProps {
  query: string;
  results: { material: Material; subject: Subject }[];
  onResultClick: (s: Subject) => void;
  onClear: () => void;
  lang: 'ar' | 'fr';
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onResultClick, onClear, lang }) => {
  const isRtl = lang === 'ar';

  // Group results by subject for better organization
  const groupedResults = useMemo(() => {
    const groups: Record<string, { subject: Subject; materials: Material[] }> = {};
    results.forEach(res => {
      if (!groups[res.subject.id]) {
        groups[res.subject.id] = { subject: res.subject, materials: [] };
      }
      groups[res.subject.id].materials.push(res.material);
    });
    return Object.values(groups);
  }, [results]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 dark:bg-indigo-500/50 text-indigo-900 dark:text-indigo-100 rounded-sm px-0.5">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <Search className="text-indigo-600" size={24} />
            {isRtl ? `نتائج البحث عن "${query}"` : `Résultats pour "${query}"`}
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-bold">
            {isRtl ? `تم العثور على ${results.length} مادة دراسية` : `${results.length} fichiers trouvés`}
          </p>
        </div>
        <button 
          onClick={onClear} 
          className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-6 py-2.5 rounded-xl transition-all font-black text-xs uppercase tracking-widest border border-transparent hover:border-red-100"
        >
          <X size={18} /> {isRtl ? 'إلغاء البحث' : 'Annuler'}
        </button>
      </div>

      {groupedResults.length > 0 ? (
        <div className="space-y-12 pb-20">
          {groupedResults.map((group) => (
            <div key={group.subject.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center gap-4 mb-6 px-2">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${group.subject.color} flex items-center justify-center text-white shadow-lg`}>
                  <Layers size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800 dark:text-white">{group.subject.name}</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.materials.map((material) => (
                  <div 
                    key={material.id} 
                    onClick={() => onResultClick(group.subject)}
                    className="group bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 hover:border-indigo-500 dark:hover:border-indigo-400 cursor-pointer transition-all flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 rounded-xl flex items-center justify-center transition-colors">
                        <FileText size={20} />
                      </div>
                      <span className="text-[9px] font-black px-2 py-1 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg uppercase tracking-wider">
                        {material.type}
                      </span>
                    </div>
                    
                    <h4 className="font-black text-slate-800 dark:text-white group-hover:text-indigo-600 transition-colors leading-snug mb-2">
                      {highlightText(material.title, query)}
                    </h4>
                    
                    {material.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed italic">
                        {highlightText(material.description, query)}
                      </p>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                          <BookOpen size={12} />
                          <span>{group.subject.name}</span>
                       </div>
                       <ChevronRight className={`${isRtl ? 'rotate-180' : ''} text-slate-300 group-hover:text-indigo-500 transition-all`} size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-[4rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Search className="text-slate-300 dark:text-slate-600" size={48} />
          </div>
          <h3 className="text-2xl font-black text-slate-400 mb-4">
            {isRtl ? 'لا توجد نتائج مطابقة لبحثك' : 'Aucun résultat correspondant'}
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 leading-relaxed">
            {isRtl 
              ? 'تأكد من كتابة الكلمات بشكل صحيح، أو جرب كلمات مفتاحية أخرى أكثر شمولاً.' 
              : 'Assurez-vous que les mots sont correctement orthographiés ou essayez d\'autres mots-clés.'}
          </p>
          <button 
            onClick={() => onClear()}
            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            <BrainCircuit size={18} />
            {isRtl ? 'اسأل المساعد الذكي بدلاً من ذلك' : 'Demander à l\'assistant IA'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
