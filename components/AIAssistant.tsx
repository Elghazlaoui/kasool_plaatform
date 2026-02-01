import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, BrainCircuit, Copy, Trash2, Lightbulb } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

// قاعدة المعرفة المحلية
const knowledgeBase = {
  // الرياضيات
  رياضيات: {
    keywords: ['رياضيات', 'حساب', 'جبر', 'هندسة', 'تحليل', 'معادلة', 'دالة', 'مشتقة', 'تكامل', 'احتمالات'],
    responses: [
      'الرياضيات تحتاج للممارسة المستمرة. ابدأ بفهم المفاهيم الأساسية ثم انتقل للتمارين التطبيقية.',
      'لحل المعادلات، حدد المجهول أولاً ثم استخدم العمليات العكسية للوصول للحل.',
      'المشتقات تمثل معدل التغير. تذكر القواعد الأساسية: مشتقة x^n = n×x^(n-1)',
      'في الهندسة، ارسم شكلاً توضيحياً دائماً. هذا يساعدك على فهم المسألة بشكل أفضل.'
    ]
  },
  
  // الفيزياء
  فيزياء: {
    keywords: ['فيزياء', 'طاقة', 'حركة', 'قوة', 'كهرباء', 'مغناطيس', 'ضوء', 'موجات', 'ميكانيكا'],
    responses: [
      'الفيزياء تعتمد على فهم القوانين وتطبيقها. اكتب القانون أولاً ثم عوض بالقيم المعطاة.',
      'في مسائل الحركة، حدد المعطيات والمطلوب، ثم اختر القانون المناسب من قوانين الحركة.',
      'الطاقة محفوظة دائماً. في أي نظام معزول، مجموع الطاقات يبقى ثابتاً.',
      'تذكر: القوة = الكتلة × التسارع (F = ma). هذا القانون أساسي في الميكانيكا.'
    ]
  },
  
  // علوم الحياة والأرض
  'علوم الحياة': {
    keywords: ['بيولوجيا', 'خلية', 'وراثة', 'جينات', 'adn', 'arn', 'بروتين', 'تنفس', 'هضم', 'svt'],
    responses: [
      'في علوم الحياة، الفهم أهم من الحفظ. افهم العمليات البيولوجية ثم حفظ التفاصيل.',
      'الخلية هي وحدة الحياة الأساسية. تعرف على مكوناتها ووظيفة كل عضي.',
      'الوراثة تعتمد على DNA. تذكر: DNA → RNA → البروتين (العقيدة المركزية)',
      'ارسم مخططات ورسومات تفصيلية. هذا يساعدك على فهم العمليات المعقدة.'
    ]
  },
  
  // الكيمياء
  كيمياء: {
    keywords: ['كيمياء', 'ذرة', 'جزيء', 'تفاعل', 'حمض', 'قاعدة', 'أكسدة', 'اختزال', 'ph'],
    responses: [
      'الكيمياء هي علم التحولات. افهم كيف تتفاعل المواد وتتحول لمواد جديدة.',
      'في التفاعلات الكيميائية، تأكد دائماً من موازنة المعادلة قبل الحسابات.',
      'pH يقيس حموضة المحلول: pH < 7 حمضي، pH = 7 متعادل، pH > 7 قاعدي.',
      'تذكر: عدد مولات المادة = الكتلة ÷ الكتلة المولية'
    ]
  },
  
  // اللغة العربية
  'اللغة العربية': {
    keywords: ['عربي', 'نحو', 'صرف', 'بلاغة', 'أدب', 'شعر', 'نثر', 'إعراب'],
    responses: [
      'اللغة العربية تحتاج للقراءة الكثيرة. اقرأ نصوصاً متنوعة لتحسين مستواك.',
      'في الإعراب، حدد نوع الكلمة أولاً (اسم/فعل/حرف) ثم موقعها في الجملة.',
      'البلاغة تعتمد على الذوق الأدبي. تدرب على تحليل النصوص الأدبية.',
      'حفظ الشواهد الأدبية يساعدك في الإجابة على أسئلة الامتحان.'
    ]
  },
  
  // اللغة الفرنسية
  français: {
    keywords: ['français', 'french', 'فرنسية', 'grammaire', 'conjugaison', 'vocabulaire'],
    responses: [
      'Pour améliorer ton français, lis beaucoup et pratique régulièrement l\'écriture.',
      'La conjugaison est essentielle. Maîtrise les temps: présent, passé composé, imparfait, futur.',
      'Enrichis ton vocabulaire en lisant des textes variés et en notant les nouveaux mots.',
      'La grammaire française a des règles précises. Apprends-les progressivement et pratique avec des exercices.'
    ]
  },
  
  // الفلسفة
  فلسفة: {
    keywords: ['فلسفة', 'منطق', 'وعي', 'معرفة', 'أخلاق', 'سياسة', 'ديكارت', 'أرسطو'],
    responses: [
      'الفلسفة تعتمد على التفكير النقدي. اقرأ النصوص بعناية وحلل الأفكار.',
      'في المقالة الفلسفية: مقدمة (إشكالية) → عرض (تحليل) → خاتمة (تركيب).',
      'افهم المفاهيم الأساسية وتعرف على الفلاسفة وأفكارهم الرئيسية.',
      'التدرب على كتابة المقالات الفلسفية أساسي للنجاح في الامتحان.'
    ]
  },
  
  // نصائح عامة للدراسة
  دراسة: {
    keywords: ['دراسة', 'مراجعة', 'امتحان', 'باك', 'بكالوريا', 'حفظ', 'تركيز', 'تنظيم'],
    responses: [
      'نظم وقتك جيداً. اصنع جدولاً للمراجعة يشمل جميع المواد.',
      'خذ فترات راحة منتظمة (تقنية البومودورو: 25 دقيقة عمل + 5 دقائق راحة).',
      'اختبر نفسك باستمرار. حل تمارين وامتحانات السنوات السابقة.',
      'نم جيداً وتغذى بشكل صحي. الصحة الجسدية تؤثر على الأداء الدراسي.',
      'لا تؤجل المراجعة للحظة الأخيرة. المراجعة المبكرة والمنتظمة أفضل.',
      'اشرح ما تعلمته لشخص آخر. هذه أفضل طريقة للتأكد من فهمك.'
    ]
  },
  
  // التحفيز
  تحفيز: {
    keywords: ['تحفيز', 'ملل', 'تعب', 'يأس', 'صعب', 'مستحيل', 'فشل'],
    responses: [
      'النجاح يحتاج للصبر والمثابرة. كل مجهود تبذله اليوم سيؤتي ثماره غداً! 💪',
      'تذكر هدفك ولماذا بدأت. التحفيز يأتي من الداخل.',
      'الفشل جزء من التعلم. لا تستسلم، حاول مرة أخرى بطريقة مختلفة.',
      'أنت قادر على النجاح! آمن بنفسك وبقدراتك. 🌟',
      'خذ استراحة عندما تشعر بالتعب، ثم عد بطاقة جديدة.',
      'تحدث مع أصدقائك أو عائلتك عندما تشعر بالضغط. المشاركة تخفف العبء.'
    ]
  }
};

// أسئلة سريعة مقترحة
const quickQuestions = [
  'كيف أحسن من مستواي في الرياضيات؟',
  'ما هي أفضل طريقة للمراجعة؟',
  'كيف أتعامل مع ضغط الامتحانات؟',
  'نصائح لحل تمارين الفيزياء',
  'كيف أنظم وقتي للدراسة؟'
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, time?: string }[]>([
    { 
      role: 'assistant', 
      content: 'مرحباً! 👋 أنا مساعدك التعليمي الذكي. يمكنني مساعدتك في:\n\n📚 جميع المواد الدراسية\n💡 نصائح للمراجعة\n⏰ تنظيم الوقت\n🎯 التحضير للامتحانات\n\nكيف يمكنني مساعدتك اليوم؟', 
      time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  // دالة للعثور على أفضل إجابة
  const findBestResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // البحث في قاعدة المعرفة
    for (const [category, data] of Object.entries(knowledgeBase)) {
      const matchedKeyword = data.keywords.find(keyword => 
        lowerQuestion.includes(keyword.toLowerCase())
      );
      
      if (matchedKeyword) {
        // اختيار إجابة عشوائية من الإجابات المتاحة
        const randomIndex = Math.floor(Math.random() * data.responses.length);
        return data.responses[randomIndex];
      }
    }
    
    // إجابات افتراضية للأسئلة العامة
    const generalResponses = [
      'هذا سؤال مهم! حاول تقسيمه لأجزاء صغيرة والبحث عن كل جزء على حدة.',
      'يمكنك مراجعة الكتاب المدرسي أو سؤال أستاذك للحصول على إجابة أكثر تفصيلاً.',
      'هذا الموضوع يحتاج لمزيد من التوضيح. حاول البحث في المراجع أو سؤال زملائك.',
      'للإجابة على هذا السؤال بشكل أفضل، حدد المادة أو الموضوع الذي تسأل عنه.',
      'سؤال جيد! ركز على فهم المفاهيم الأساسية أولاً ثم انتقل للتفاصيل.'
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSend = async (messageText?: string) => {
    const userMsg = messageText || input.trim();
    if (!userMsg || isTyping) return;

    const now = new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' });
    setInput('');
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', content: userMsg, time: now }]);
    setIsTyping(true);

    // محاكاة التفكير
    setTimeout(() => {
      const response = findBestResponse(userMsg);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response, 
        time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
      }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // وقت عشوائي بين 0.8 - 2 ثانية
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: 'مرحباً! 👋 أنا مساعدك التعليمي الذكي. يمكنني مساعدتك في:\n\n📚 جميع المواد الدراسية\n💡 نصائح للمراجعة\n⏰ تنظيم الوقت\n🎯 التحضير للامتحانات\n\nكيف يمكنني مساعدتك اليوم؟', 
      time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
    }]);
    setShowSuggestions(true);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 shadow-2xl overflow-hidden border-l dark:border-slate-800" style={{ animation: 'slideInRight 0.3s ease' }}>
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
            <BrainCircuit size={22} />
          </div>
          <div>
            <h3 className="font-black text-lg">مساعد كسول الذكي</h3>
            <div className="flex items-center gap-1.5 opacity-80">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-bold uppercase tracking-wider">متصل</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-xl transition-colors" title="مسح المحادثة">
            <Trash2 size={18} />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} group`}>
            <div className={`max-w-[85%] flex gap-2.5 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center shadow-sm mt-0.5 ${msg.role === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-500' : 'bg-indigo-600 text-white'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="flex flex-col">
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${msg.role === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none' : 'bg-indigo-50 dark:bg-indigo-900/30 text-slate-900 dark:text-slate-100 border border-indigo-100/50 dark:border-indigo-900/50 rounded-tl-none'}`}>
                  {msg.content}
                </div>
                <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="text-[9px] text-slate-400">{msg.time}</span>
                  {msg.role === 'assistant' && (
                    <button onClick={() => copyMessage(msg.content)} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600">
                      <Copy size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Quick suggestions */}
        {showSuggestions && messages.length === 1 && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <Lightbulb size={14} className="text-amber-500" />
              <span>أسئلة سريعة:</span>
            </div>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="w-full text-right p-3 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-end">
            <div className="flex gap-2.5 flex-row-reverse">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm mt-0.5">
                <Bot size={14} />
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3.5 rounded-2xl rounded-tl-none flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:'0.15s'}}></span>
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:'0.3s'}}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="relative group">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسألني أي شيء عن المواد الدراسية..."
            className="w-full pr-4 pl-14 py-3.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-600 rounded-2xl outline-none shadow-sm transition-all dark:text-white text-sm"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 disabled:opacity-40 transition-all active:scale-90"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="text-[9px] text-center mt-2.5 text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
           <Sparkles size={9} className="text-amber-400" />
           مساعد محلي ذكي - يعمل بدون اتصال بالإنترنت
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />
    </div>
  );
};

export default AIAssistant;