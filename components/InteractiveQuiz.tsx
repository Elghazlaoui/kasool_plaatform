import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, XCircle, ChevronRight, RotateCcw, BrainCircuit } from 'lucide-react';
import { Quiz } from '../types.ts';
import { translations } from '../translations.ts';

interface InteractiveQuizProps {
  quiz?: Quiz;
  lessonTitle: string;
  lang: 'ar' | 'fr';
  onComplete?: () => void;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz: initialQuiz, lessonTitle, lang, onComplete }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(initialQuiz || null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    if (isFinished && onComplete) {
      onComplete();
    }
  }, [isFinished, onComplete]);

  // ─── توليد الاختبار عبر Claude AI ────────────────────────────────────────────
  const generateAIQuiz = async () => {
    setIsGenerating(true);
    setGenerateError(null);

    try {
      const prompt = `قم بتوليد اختبار اختيار من متعدد مكون من 5 أسئلة حول الدرس: "${lessonTitle}".
يجب أن تكون الأسئلة باللغة ${lang === 'ar' ? 'العربية' : 'الفرنسية'}.
أرجع النتيجة بتنسيق JSON فقط بدون أي نص إضافي أو شرح:
{"questions":[{"question":"السؤال","options":["خيار1","خيار2","خيار3","خيار4"],"correctIndex":0}]}
الشروط:
- كل سؤال له بالضبط 4 خيارات
- correctIndex يشير للخيار الصحيح (0 أو 1 أو 2 أو 3)
- الأسئلة يجب أن تكون متنوعة وذات صلة بالدرس
- أرجع فقط JSON بدون أي تفسير أو نص إضافي`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': 'PLACEHOLDER' // سيتم معالجة هذا تلقائياً في بيئة Artifacts
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2000,
          messages: [
            { role: 'user', content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        // إذا فشل الطلب، نستخدم اختبار افتراضي
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.content
        .map((item: any) => (item.type === 'text' ? item.text : ''))
        .filter(Boolean)
        .join('\n');

      // إزالة علامات الـ Markdown لو وجدت احتياطياً
      let jsonText = rawText.trim();
      const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) jsonText = match[1].trim();

      const parsed = JSON.parse(jsonText);

      if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
        setQuiz(parsed);
      } else {
        setGenerateError('حدث خطأ في فهم البيانات. حاول مرة أخرى.');
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
      // في حالة فشل API، نستخدم اختبار تجريبي
      const fallbackQuiz = generateFallbackQuiz();
      setQuiz(fallbackQuiz);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── توليد اختبار احتياطي في حالة فشل API ────────────────────────────────────
  const generateFallbackQuiz = (): Quiz => {
    const quizzes: { [key: string]: Quiz } = {
      ar: {
        questions: [
          {
            question: `ما هو الموضوع الرئيسي في درس "${lessonTitle}"؟`,
            options: [
              'المفاهيم الأساسية',
              'التطبيقات العملية',
              'النظريات المتقدمة',
              'الأمثلة التوضيحية'
            ],
            correctIndex: 0
          },
          {
            question: 'أي من التالي يعتبر من أهم النقاط في هذا الدرس؟',
            options: [
              'الفهم العميق للموضوع',
              'الحفظ السريع',
              'التطبيق المباشر',
              'المراجعة المستمرة'
            ],
            correctIndex: 0
          },
          {
            question: 'ما الهدف الأساسي من دراسة هذا الدرس؟',
            options: [
              'اكتساب المعرفة',
              'النجاح في الامتحان فقط',
              'إضاعة الوقت',
              'لا شيء مما سبق'
            ],
            correctIndex: 0
          },
          {
            question: 'كيف يمكن تطبيق ما تعلمته في هذا الدرس؟',
            options: [
              'من خلال الممارسة والتطبيق',
              'بالحفظ فقط',
              'بالنسيان',
              'لا يمكن التطبيق'
            ],
            correctIndex: 0
          },
          {
            question: 'ما أفضل طريقة لمراجعة محتوى هذا الدرس؟',
            options: [
              'المراجعة المنتظمة والتكرار',
              'قراءة واحدة فقط',
              'عدم المراجعة',
              'الانتظار حتى الامتحان'
            ],
            correctIndex: 0
          }
        ]
      },
      fr: {
        questions: [
          {
            question: `Quel est le sujet principal de la leçon "${lessonTitle}"?`,
            options: [
              'Les concepts fondamentaux',
              'Les applications pratiques',
              'Les théories avancées',
              'Les exemples illustratifs'
            ],
            correctIndex: 0
          },
          {
            question: 'Lequel des éléments suivants est le plus important dans cette leçon?',
            options: [
              'Une compréhension approfondie du sujet',
              'La mémorisation rapide',
              'L\'application directe',
              'La révision continue'
            ],
            correctIndex: 0
          },
          {
            question: 'Quel est l\'objectif principal de l\'étude de cette leçon?',
            options: [
              'Acquérir des connaissances',
              'Réussir l\'examen uniquement',
              'Perdre du temps',
              'Aucune de ces réponses'
            ],
            correctIndex: 0
          },
          {
            question: 'Comment peut-on appliquer ce qui a été appris dans cette leçon?',
            options: [
              'Par la pratique et l\'application',
              'Par la mémorisation uniquement',
              'En oubliant',
              'On ne peut pas l\'appliquer'
            ],
            correctIndex: 0
          },
          {
            question: 'Quelle est la meilleure façon de réviser le contenu de cette leçon?',
            options: [
              'La révision régulière et la répétition',
              'Une seule lecture',
              'Pas de révision',
              'Attendre jusqu\'à l\'examen'
            ],
            correctIndex: 0
          }
        ]
      }
    };

    return quizzes[lang];
  };

  // ─── السلوك الباقي كما هو ─────────────────────────────────────────────────
  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === quiz?.questions[currentQuestion].correctIndex) {
      setScore(prev => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (!quiz) return;
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  // ─── حالة: جاري التوليد ──────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full space-y-4 text-center p-6">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <BrainCircuit className="absolute inset-0 m-auto text-indigo-600 animate-pulse" size={28} />
        </div>
        <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white">{t.preparing}</h3>
        <p className="text-xs md:text-sm text-slate-500">{t.generate_ai_quiz}...</p>
      </div>
    );
  }

  // ─── حالة: لا يوجد اختبار بعد ────────────────────────────────────────────
  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] h-full space-y-6 text-center p-6">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center text-indigo-600">
          <Sparkles size={32} />
        </div>
        <div className="space-y-2 px-4">
          <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white">جاهز للتحدي؟</h3>
          <p className="text-xs md:text-sm text-slate-500">لا يوجد اختبار لهذا الدرس بعد، لكن يمكنني توليد واحد لك الآن!</p>
        </div>
        {generateError && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 max-w-sm text-center">
            <p className="text-xs text-red-600 dark:text-red-400">{generateError}</p>
          </div>
        )}
        <button
          onClick={generateAIQuiz}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <BrainCircuit size={18} />
          {t.generate_ai_quiz}
        </button>
      </div>
    );
  }

  // ─── حالة: انتهى الاختبار ────────────────────────────────────────────────
  if (isFinished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 md:space-y-8 text-center p-6" style={{ animation: 'fadeIn 0.5s ease' }}>
        <div className="relative">
          <svg className="w-24 h-24 md:w-32 md:h-32 transform -rotate-90">
            <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
            <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset={`${251 * (1 - percentage / 100)}`} className="text-indigo-600 transition-all duration-1000" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl md:text-3xl font-black text-slate-800 dark:text-white">{percentage}%</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mb-2 px-4">
            {percentage >= 80 ? '🎉 عمل مذهل!' : percentage >= 50 ? '👏 جيد جداً!' : '💪 استمر في المحاولة!'}
          </h3>
          <p className="text-xs md:text-sm text-slate-500">{t.score}: {score} / {quiz.questions.length}</p>
        </div>

        <div className="flex gap-3">
          <button onClick={restartQuiz} className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2">
            <RotateCcw size={16} /> {t.restart_quiz}
          </button>
        </div>
      </div>
    );
  }

  // ─── حالة: سؤال فعلي ─────────────────────────────────────────────────────
  const question = quiz.questions[currentQuestion];

  return (
    <div className="h-full flex flex-col p-4 sm:p-8 max-w-2xl mx-auto w-full" style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 text-white rounded-lg md:rounded-xl flex items-center justify-center font-black text-sm">{currentQuestion + 1}</span>
          <div className="h-2 w-24 sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">{currentQuestion + 1} / {quiz.questions.length}</span>
      </div>

      <h3 className="text-base sm:text-xl font-black text-slate-800 dark:text-white mb-5 leading-snug text-center sm:text-right">
        {question.question}
      </h3>

      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar pb-4">
        {question.options.map((option, idx) => {
          const isCorrect = idx === question.correctIndex;
          const isSelected = idx === selectedOption;

          let btnClass = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
          if (showResult) {
            if (isCorrect) btnClass = 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400';
            else if (isSelected) btnClass = 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400';
            else btnClass = 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-700 text-slate-400 opacity-60';
          } else {
            btnClass += ' hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-[0.98]';
          }

          return (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-right p-4 rounded-2xl border-2 font-bold text-xs md:text-sm transition-all flex items-center justify-between ${btnClass}`}
            >
              <span className="flex-1 px-1">{option}</span>
              {showResult && isCorrect && <CheckCircle2 size={18} className="text-green-500 shrink-0 ml-2" />}
              {showResult && isSelected && !isCorrect && <XCircle size={18} className="text-red-500 shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4 pb-2">
          <button
            onClick={nextQuestion}
            className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            {currentQuestion === quiz.questions.length - 1 ? t.finish_quiz : t.next_question}
            <ChevronRight className={lang === 'ar' ? 'rotate-180' : ''} size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveQuiz;