import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, BrainCircuit, Copy, Trash2, Lightbulb } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIAssistantProps {
  onClose: () => void;
}

const quickQuestions = [
  'كيف أحسن من مستواي في الرياضيات؟',
  'ما هي أفضل طريقة للمراجعة؟',
  'نصائح للتعامل مع قلق الامتحان',
  'كيف أنظم وقتي للدراسة؟',
  'شرح لي المشتقات في الرياضيات'
];

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, time?: string }[]>([
    { 
      role: 'assistant', 
      content: 'مرحباً! 👋 أنا مساعدك التعليمي الذكي المدعوم بـ Google Gemini\n\nيمكنني مساعدتك في:\n\n📚 شرح المفاهيم الصعبة في جميع المواد\n💡 حل التمارين والمسائل خطوة بخطوة\n⏰ تنظيم الوقت وخطط المراجعة\n🎯 نصائح للامتحانات\n💪 التحفيز والدعم النفسي\n\nاسألني أي شيء! 😊', 
      time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleSend = async (messageText?: string) => {
    const userMsg = messageText || input.trim();
    if (!userMsg || isTyping) return;

    const now = new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' });
    setInput('');
    setShowSuggestions(false);
    setApiError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMsg, time: now }]);
    setIsTyping(true);

    try {
      // الحصول على مفتاح API من متغيرات البيئة
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error('API_KEY_MISSING');
      }

      // إنشاء كائن Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-1.5-flash',
        systemInstruction: `أنت مساعد تعليمي ذكي ومتخصص في مساعدة طلاب البكالوريا في المغرب.

مهامك:
- شرح المفاهيم الدراسية بطريقة مبسطة وواضحة
- مساعدة الطلاب في حل التمارين والمسائل خطوة بخطوة
- تقديم نصائح للمراجعة وتنظيم الوقت
- تحفيز الطلاب ودعمهم نفسياً
- الإجابة على أسئلة المواد الدراسية (رياضيات، فيزياء، كيمياء، SVT، لغات...)

أسلوبك:
- استخدم اللغة العربية الفصحى البسيطة
- كن واضحاً ومختصراً (200-300 كلمة كحد أقصى)
- استخدم الأمثلة العملية
- نظم إجابتك بشكل جميل (استخدم النقاط والترقيم)
- كن مشجعاً وإيجابياً
- إذا سأل الطالب بالفرنسية أو الإنجليزية، أجب بنفس اللغة

مهم: 
- إذا سئلت عن مسألة رياضية أو فيزيائية، حلها خطوة بخطوة
- إذا كان السؤال غير واضح، اطلب توضيحاً
- لا تعطي إجابات طويلة جداً`
      });

      // بناء سياق المحادثة (آخر 6 رسائل)
      const conversationHistory = messages.slice(-6).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      // بدء المحادثة
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800,
        },
      });

      // إرسال الرسالة
      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: text, 
        time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
      }]);

    } catch (error: any) {
      console.error('Gemini AI error:', error);
      
      let errorMessage = 'عذراً، واجهت مشكلة في الاتصال. ';
      
      if (error.message === 'API_KEY_MISSING') {
        errorMessage = `⚠️ لم يتم تكوين مفتاح API

للحصول على مساعد ذكي فعّال، يجب إضافة مفتاح Google Gemini API:

📝 الخطوات:
1. اذهب إلى: https://makersuite.google.com/app/apikey
2. سجل دخول بحساب Google
3. اضغط "Create API Key" واحصل على المفتاح (مجاني!)
4. أنشئ ملف .env.local في مجلد المشروع
5. أضف: VITE_GEMINI_API_KEY=المفتاح_الذي_حصلت_عليه
6. أعد تشغيل المشروع

💡 Gemini API مجاني تماماً للاستخدام العادي!`;
        setApiError('missing_key');
      } else if (error.message?.includes('API key')) {
        errorMessage = '⚠️ مفتاح API غير صالح. تأكد من صحة المفتاح في ملف .env.local';
        setApiError('invalid_key');
      } else if (error.message?.includes('quota')) {
        errorMessage = '⚠️ تم تجاوز حد الاستخدام اليومي. حاول مرة أخرى غداً أو استخدم مفتاح API آخر.';
        setApiError('quota');
      } else {
        errorMessage += 'تأكد من اتصالك بالإنترنت وحاول مرة أخرى.';
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: 'مرحباً! 👋 أنا مساعدك التعليمي الذكي المدعوم بـ Google Gemini\n\nيمكنني مساعدتك في:\n\n📚 شرح المفاهيم الصعبة في جميع المواد\n💡 حل التمارين والمسائل خطوة بخطوة\n⏰ تنظيم الوقت وخطط المراجعة\n🎯 نصائح للامتحانات\n💪 التحفيز والدعم النفسي\n\nاسألني أي شيء! 😊', 
      time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) 
    }]);
    setShowSuggestions(true);
    setApiError(null);
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
               <span className={`w-2 h-2 rounded-full ${apiError ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`}></span>
               <span className="text-[10px] font-bold uppercase tracking-wider">
                 {apiError ? 'يحتاج إعداد' : 'مدعوم بـ Gemini'}
               </span>
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
        {showSuggestions && messages.length === 1 && !apiError && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
              <Lightbulb size={14} className="text-amber-500" />
              <span>جرّب هذه الأسئلة:</span>
            </div>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="w-full text-right p-3 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 transition-all hover:scale-[1.02]"
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
            placeholder="اسألني أي شيء... (مثلاً: شرح لي المشتقات)"
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
           مدعوم بذكاء Google Gemini الاصطناعي
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />
    </div>
  );
};

export default AIAssistant;