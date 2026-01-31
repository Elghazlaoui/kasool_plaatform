import { Subject } from '../types.ts';

export const ALL_SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'الرياضيات',
    color: 'from-blue-500 to-indigo-600',
    icon: 'Calculator',
    materials: [
      {
        id: 'math-1',
        title: 'الحدود والدوال الجبرية',
        type: 'lesson',
        date: '2026-01-15',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة الحدود والدوال الجبرية ودرجاتها',
        quiz: {
          questions: [
            { question: 'ما هي درجة الحد 3x⁴ - 2x² + 1؟', options: ['2', '3', '4', '1'], correctIndex: 2 },
            { question: 'ما هي نتيجة جمع الحدود: (2x² + 3x) + (x² - x)؟', options: ['3x² + 2x', '3x² + 4x', '2x² + 2x', 'x² + 4x'], correctIndex: 1 },
            { question: 'ما هي درجة الحد الثابت 7؟', options: ['1', '0', '7', 'غير محدد'], correctIndex: 1 },
            { question: 'ما هي حصيلة ضرب الحدين (2x)(3x²)؟', options: ['5x³', '6x²', '6x³', '5x²'], correctIndex: 2 },
            { question: 'عند x=2، ما قيمة الدالة f(x) = x² + 3x؟', options: ['8', '10', '7', '12'], correctIndex: 1 }
          ]
        }
      },
      {
        id: 'math-2',
        title: 'ملخص الحدود والدوال',
        type: 'summary',
        date: '2026-01-16',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل للحدود والدوال الجبرية'
      },
      {
        id: 'math-3',
        title: 'شرح فيديو: الحدود والدوال',
        type: 'video',
        date: '2026-01-17',
        fileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'شرح مرئي مفصل للحدود والدوال'
      },
      {
        id: 'math-4',
        title: 'سلسلة تمارين الحدود',
        type: 'series',
        date: '2026-01-18',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'سلسلة تدريجية من التمارين'
      },
      {
        id: 'math-5',
        title: 'فحص نموذجي - الرياضيات',
        type: 'exam',
        date: '2026-02-01',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل للرياضيات'
      },
      {
        id: 'math-6',
        title: 'فروض الأسبوع - الرياضيات',
        type: 'assignment',
        date: '2026-02-05',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فروض أسبوعية في الرياضيات'
      }
    ]
  },
  {
    id: 'physics',
    name: 'الفيزياء والكيمياء',
    color: 'from-orange-500 to-red-500',
    icon: 'Zap',
    materials: [
      {
        id: 'phys-1',
        title: 'الحركة المنتظمة والمسارات',
        type: 'lesson',
        date: '2026-01-14',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة الحركة المنتظمة والحركة المسارات',
        quiz: {
          questions: [
            { question: 'ما هي وحدة قياس السرعة؟', options: ['m', 'kg', 'm/s', 's'], correctIndex: 2 },
            { question: 'في الحركة المنتظمة، السرعة تكون؟', options: ['متزايدة', 'ثابتة', 'متناقصة', 'صفرية'], correctIndex: 1 },
            { question: 'إذا كانت السرعة 10 m/s والزمن 5s، فالمسافة؟', options: ['2 m', '50 m', '15 m', '500 m'], correctIndex: 1 },
            { question: 'ما هي وحدة قياس التسارع؟', options: ['m/s', 'm/s²', 'kg', 'm'], correctIndex: 1 },
            { question: 'الجسم ساكن يعني أن سرعته؟', options: ['كبيرة', 'متغيرة', 'صفرية', 'سالبة'], correctIndex: 2 }
          ]
        }
      },
      {
        id: 'phys-2',
        title: 'ملخص الحركة المنتظمة',
        type: 'summary',
        date: '2026-01-15',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل للحركة المنتظمة'
      },
      {
        id: 'phys-3',
        title: 'شرح فيديو: الحركة والسرعة',
        type: 'video',
        date: '2026-01-16',
        fileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'شرح مرئي للحركة والسرعة'
      },
      {
        id: 'phys-4',
        title: 'سلسلة تمارين الحركة',
        type: 'series',
        date: '2026-01-20',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'تمارين تدريجية في الحركة'
      },
      {
        id: 'phys-5',
        title: 'فحص نموذجي - الفيزياء',
        type: 'exam',
        date: '2026-02-10',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل'
      }
    ]
  },
  {
    id: 'svt',
    name: 'علوم الحياة والأرض',
    color: 'from-green-500 to-emerald-600',
    icon: 'Dna',
    materials: [
      {
        id: 'svt-1',
        title: 'البنية التحتية للخليه',
        type: 'lesson',
        date: '2026-01-13',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة البنية التحتية للخليه الحية',
        quiz: {
          questions: [
            { question: 'ما هو العضي المسؤول عن حفظ المعلومات الوراثية؟', options: ['الغشاء', 'النواة', 'المتوسطات', 'الجدار'], correctIndex: 1 },
            { question: 'ما الذي يحتوي عليه DNA؟', options: ['البروتينات', 'الأحماض الأمينية', 'قواعد نيوكليوتيدية', 'السكريات'], correctIndex: 2 },
            { question: 'كم قاعدة نيوكليوتيدية في DNA؟', options: ['2', '3', '4', '5'], correctIndex: 2 },
            { question: 'ما هي وظيفة الغشاء الخليوي؟', options: ['الحماية والنقل', 'التوليد', 'القوة فقط', 'التنفس فقط'], correctIndex: 0 },
            { question: 'الخليه الحيوانية تفتقر إلى؟', options: ['النواة', 'الجدار الخليوي', 'الغشاء', 'الميتوكندريا'], correctIndex: 1 }
          ]
        }
      },
      {
        id: 'svt-2',
        title: 'ملخص البنية الخليوية',
        type: 'summary',
        date: '2026-01-14',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل للبنية الخليوية'
      },
      {
        id: 'svt-3',
        title: 'شرح فيديو: الخليه',
        type: 'video',
        date: '2026-01-18',
        fileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'شرح مرئي عن الخليه'
      },
      {
        id: 'svt-4',
        title: 'فحص نموذجي - SVT',
        type: 'exam',
        date: '2026-02-08',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل في SVT'
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'الكيمياء',
    color: 'from-teal-500 to-cyan-600',
    icon: 'FlaskConical',
    materials: [
      {
        id: 'chem-1',
        title: 'البنية الذرية والجدول الدوري',
        type: 'lesson',
        date: '2026-01-12',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة البنية الذرية والجدول الدوري',
        quiz: {
          questions: [
            { question: 'كم إلكترون في نواة الهيدروجين؟', options: ['0', '1', '2', '3'], correctIndex: 1 },
            { question: 'ما عدد البروتونات في ذرة الكربون؟', options: ['4', '6', '8', '12'], correctIndex: 1 },
            { question: 'العنصر الأول في الجدول الدوري هو؟', options: ['الهيليوم', 'الكربون', 'الهيدروجين', 'الأوكسجين'], correctIndex: 2 },
            { question: 'ما يسمى العدد الذري؟', options: ['عدد البروتونات', 'عدد النيوترونات', 'عدد الإلكترونات فقط', 'عدد الذرات'], correctIndex: 0 },
            { question: 'العنصر الذي يملك رقم ذري 8 هو؟', options: ['الكربون', 'النيتروجين', 'الأوكسجين', 'الفلور'], correctIndex: 2 }
          ]
        }
      },
      {
        id: 'chem-2',
        title: 'ملخص البنية الذرية',
        type: 'summary',
        date: '2026-01-13',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل للبنية الذرية'
      },
      {
        id: 'chem-3',
        title: 'سلسلة تمارين الكيمياء',
        type: 'series',
        date: '2026-01-22',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'سلسلة تدريجية في الكيمياء'
      }
    ]
  },
  {
    id: 'arabic',
    name: 'اللغة العربية',
    color: 'from-amber-500 to-yellow-500',
    icon: 'PenTool',
    materials: [
      {
        id: 'ar-1',
        title: 'قراءة وتحليل النصوص',
        type: 'lesson',
        date: '2026-01-11',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة القراءة وتحليل النصوص الأدبية',
        quiz: {
          questions: [
            { question: 'ما هو نوع النص الذي يعتمد على الخيال؟', options: ['النص العلمي', 'النص الصحفي', 'النص الأدبي', 'النص القانوني'], correctIndex: 2 },
            { question: 'ما هو الإنشاء؟', options: ['القراءة فقط', 'التعبير الكتابي', 'الحفظ', 'الترجمة'], correctIndex: 1 },
            { question: 'ما الذي يسمى بالنص المقيد؟', options: ['القصة', 'القصيدة', 'المقال', 'الخطاب'], correctIndex: 2 },
            { question: 'نوع النص الذي يحكي عن أحداث حقيقية؟', options: ['القصة الخيالية', 'النص الوقائعي', 'الشعر', 'المسرحية'], correctIndex: 1 },
            { question: 'ما هو هدف التحليل النصي؟', options: ['الترجمة', 'فهم المعنى والبنية', 'الحفظ فقط', 'القراءة فقط'], correctIndex: 1 }
          ]
        }
      },
      {
        id: 'ar-2',
        title: 'ملخص التحليل النصي',
        type: 'summary',
        date: '2026-01-12',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل لتحليل النصوص'
      },
      {
        id: 'ar-3',
        title: 'فحص نموذجي - اللغة العربية',
        type: 'exam',
        date: '2026-02-12',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل في اللغة العربية'
      }
    ]
  },
  {
    id: 'french',
    name: 'اللغة الفرنسية',
    color: 'from-rose-500 to-pink-500',
    icon: 'Languages',
    materials: [
      {
        id: 'fr-1',
        title: 'الأفعال والجمل الأساسية',
        type: 'lesson',
        date: '2026-01-10',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة الأفعال والجمل الأساسية في الفرنسية',
        quiz: {
          questions: [
            { question: 'ما ترجمة كلمة "bonjour"؟', options: ['وداعاً', 'مرحباً', 'شكراً', 'من فضلك'], correctIndex: 1 },
            { question: 'ما ترجمة "eau"؟', options: ['هواء', 'نار', 'ماء', 'أرض'], correctIndex: 2 },
            { question: 'كيف تقول "I am" بالفرنسية؟', options: ['je suis', 'tu es', 'il est', 'nous sommes'], correctIndex: 0 },
            { question: 'ما ترجمة "merci"؟', options: ['من فضلك', 'شكراً', 'مرحباً', 'وداعاً'], correctIndex: 1 },
            { question: 'كيف تقول "good evening" بالفرنسية؟', options: ['bonjour', 'bonsoir', 'bonne nuit', 'au revoir'], correctIndex: 1 }
          ]
        }
      },
      {
        id: 'fr-2',
        title: 'ملخص الأفعال الأساسية',
        type: 'summary',
        date: '2026-01-11',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص الأفعال والجمل الأساسية'
      },
      {
        id: 'fr-3',
        title: 'شرح فيديو: الأفعال الفرنسية',
        type: 'video',
        date: '2026-01-20',
        fileUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'شرح مرئي للأفعال الفرنسية'
      }
    ]
  },
  {
    id: 'history',
    name: 'التاريخ والجغراف',
    color: 'from-violet-500 to-purple-600',
    icon: 'BrainCircuit',
    materials: [
      {
        id: 'hist-1',
        title: 'الحرب العالمية الأولى',
        type: 'lesson',
        date: '2026-01-09',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة أسباب وأحداث الحرب العالمية الأولى',
        quiz: {
          questions: [
            { question: 'متى بدأت الحرب العالمية الأولى؟', options: ['1910', '1914', '1918', '1920'], correctIndex: 1 },
            { question: 'متى انتهت الحرب العالمية الأولى؟', options: ['1916', '1917', '1918', '1919'], correctIndex: 2 },
            { question: 'ما الحدث الذي كان شرارة الحرب؟', options: ['غزو فرنسا', 'اغتيال الأمير فرديناند', 'سقوط ألمانيا', 'معركة نيل'], correctIndex: 1 },
            { question: 'كم سنة استمرت الحرب العالمية الأولى؟', options: ['2', '3', '4', '5'], correctIndex: 2 },
            { question: 'ما الدولة التي خسرت أكثر في الحرب العالمية الأولى؟', options: ['فرنسا', 'بريطانيا', 'روسيا', 'ألمانيا'], correctIndex: 2 }
          ]
        }
      },
      {
        id: 'hist-2',
        title: 'ملخص الحرب العالمية الأولى',
        type: 'summary',
        date: '2026-01-10',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل للحرب العالمية الأولى'
      },
      {
        id: 'hist-3',
        title: 'فحص نموذجي - التاريخ',
        type: 'exam',
        date: '2026-02-15',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل في التاريخ'
      }
    ]
  },
  {
    id: 'philo',
    name: 'الفلسفة',
    color: 'from-slate-500 to-gray-600',
    icon: 'Moon',
    materials: [
      {
        id: 'phil-1',
        title: 'مفهوم الحقيقة والمعرفة',
        type: 'lesson',
        date: '2026-01-08',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'دراسة مفهوم الحقيقة والمعرفة في الفلسفة',
        quiz: {
          questions: [
            { question: 'من هو فيلسوف قال إن المعرفة فضيلة؟', options: ['أفلاطون', 'سقراط', 'أرسطو', 'كانط'], correctIndex: 1 },
            { question: 'ما هو التفكير النقدي؟', options: ['الحفظ فقط', 'التحليل والتقييم', 'القراءة فقط', 'الإجابة فقط'], correctIndex: 1 },
            { question: 'من أسس مدرسة الأكاديمية؟', options: ['سقراط', 'أرسطو', 'أفلاطون', 'كانط'], correctIndex: 2 },
            { question: 'ما المعنى الحرفي لكلمة فلسفة؟', options: ['حب العلم', 'حب الحكمة', 'حب القوة', 'حب الجمال'], correctIndex: 1 },
            { question: 'من كتب كتاب "الجمهورية"؟', options: ['سقراط', 'أرسطو', 'أفلاطون', 'كانط'], correctIndex: 2 }
          ]
        }
      },
      {
        id: 'phil-2',
        title: 'ملخص الحقيقة والمعرفة',
        type: 'summary',
        date: '2026-01-09',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'ملخص شامل لمفهوم الحقيقة والمعرفة'
      },
      {
        id: 'phil-3',
        title: 'فحص نموذجي - الفلسفة',
        type: 'exam',
        date: '2026-02-18',
        fileUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs/view',
        description: 'فحص نموذجي كامل في الفلسفة'
      }
    ]
  }
];
