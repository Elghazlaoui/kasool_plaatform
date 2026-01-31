import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, BrainCircuit, Copy, Trash2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, time?: string }[]>([
    { role: 'assistant', content: 'مرحباً! أنا مساعدك التعليمي الذكي. كيف يمكنني مساعدتك اليوم في التحضير للامتحانات؟', time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    const now = new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' });
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, time: now }]);
    setIsTyping(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ لم يتم تحديد مفتاح API. تأكد من إنشاء ملف .env.local وإضافة GEMINI_API_KEY فيه.', time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) }]);
        setIsTyping(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: 'أنت مساعد تعليمي متخصص في مساعدة طلاب البكالوريا في المغرب. كن مشجعاً، واضحاً، ومختصراً. قدم شروحات مبسطة للمفاهيم العلمية والرياضية. أجب دائماً باللغة العربية إلا إذا طلب المستخدم غير ذلك.'
      });

      // Build conversation history for context
      const history = messages.slice(-6).map(m => ({
        role: m.role === 'assistant' ? 'model' as const : 'user' as const,
        parts: [{ text: m.content }]
      }));

      const chat = model.startChat({ history });
      const response = await chat.sendMessage(userMsg);
      const text = response.text || 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.';
      setMessages(prev => [...prev, { role: 'assistant', content: text, time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، واجهت مشكلة في الاتصال. تأكد من صحة مفتاح API والإنترنت.', time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: 'مرحباً! أنا مساعدك التعليمي الذكي. كيف يمكنني مساعدتك اليوم في التحضير للامتحانات؟', time: new Date().toLocaleTimeString('ar-MA', { hour:'2-digit', minute:'2-digit' }) }]);
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
            <h3 className="font-black text-lg">مساعد إيدو الذكي</h3>
            <div className="flex items-center gap-1.5 opacity-80">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-bold uppercase tracking-wider">مدعوم بـ Gemini</span>
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
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none' : 'bg-indigo-50 dark:bg-indigo-900/30 text-slate-900 dark:text-slate-100 border border-indigo-100/50 dark:border-indigo-900/50 rounded-tl-none'}`}>
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
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 disabled:opacity-40 transition-all active:scale-90"
          >
            <Send size={17} />
          </button>
        </div>
        <p className="text-[9px] text-center mt-2.5 text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
           <Sparkles size={9} className="text-amber-400" />
           التزم بآداب الحوار لتحصل على أفضل إجابة
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />
    </div>
  );
};

export default AIAssistant;
