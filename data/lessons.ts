import { Subject, Material } from '../types';

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║           📚 دليل إضافة الدروس والمحتوى التعليمي                  ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 * 
 * 🎯 كيفية إضافة محتوى جديد:
 * ───────────────────────────────
 * 
 * 1️⃣  pdf       → رابط ملف PDF للدرس الكامل
 * 2️⃣  summary   → رابط ملف PDF للملخص
 * 3️⃣  video     → رابط فيديو يوتيوب (https://www.youtube.com/watch?v=...)
 * 4️⃣  series    → رابط ملف PDF لسلسلة التمارين
 * 5️⃣  exam      → رابط ملف PDF للامتحانات السابقة
 * 6️⃣  assignment → رابط ملف PDF للفروض المحروسة
 * 
 * 📝 مثال على إضافة درس كامل:
 * ─────────────────────────────
 * {
 *   title: "عنوان الدرس",
 *   pdf: "رابط_ملف_الدرس.pdf",
 *   summary: "رابط_ملف_الملخص.pdf",
 *   video: "https://www.youtube.com/watch?v=VIDEO_ID",
 *   series: "رابط_ملف_التمارين.pdf",
 *   exam: "رابط_ملف_الامتحان.pdf",
 *   assignment: "رابط_ملف_الفرض.pdf"
 * }
 * 
 * ⚠️  ملاحظات مهمة:
 * ─────────────────
 * • يمكنك حذف أي خاصية غير موجودة (مثلاً إذا لم يكن هناك فيديو)
 * • تأكد من صحة الروابط قبل الإضافة
 * • روابط YouTube يجب أن تكون بالصيغة الكاملة
 * • ملفات PDF يجب أن تكون متاحة للعرض العام
 */

// ═══════════════════════════════════════════════════════════════════
// 🔧 واجهة البيانات (لا تعدل هذا الجزء)
// ═══════════════════════════════════════════════════════════════════

interface SimpleLesson {
  title: string;
  pdf?: string;
  video?: string;
  summary?: string;
  series?: string;
  exam?: string;
  assignment?: string;
}

// ═══════════════════════════════════════════════════════════════════
// 🎨 روابط تجريبية (استبدلها بروابطك الحقيقية)
// ═══════════════════════════════════════════════════════════════════

const EXAMPLE_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
const EXAMPLE_VIDEO = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

// ═══════════════════════════════════════════════════════════════════
// 🔄 دالة تحويل البيانات (لا تعدل هذا الجزء)
// ═══════════════════════════════════════════════════════════════════

const mapToMaterials = (prefix: string, lessons: SimpleLesson[]): Material[] => {
  const materials: Material[] = [];
  lessons.forEach((l, index) => {
    if (l.pdf) {
      materials.push({
        id: `${prefix}-lesson-${index}`,
        title: l.title,
        type: 'lesson',
        date: '2026-01',
        fileUrl: l.pdf,
        description: `الدرس الكامل لـ ${l.title}`
      });
    }
    if (l.summary) {
      materials.push({
        id: `${prefix}-sum-${index}`,
        title: `ملخص: ${l.title}`,
        type: 'summary',
        date: '2026-01',
        fileUrl: l.summary
      });
    }
    if (l.video) {
      materials.push({
        id: `${prefix}-vid-${index}`,
        title: `شرح فيديو: ${l.title}`,
        type: 'video',
        date: '2026-01',
        fileUrl: l.video
      });
    }
    if (l.series) {
      materials.push({
        id: `${prefix}-ser-${index}`,
        title: `سلسلة تمارين: ${l.title}`,
        type: 'series',
        date: '2026-01',
        fileUrl: l.series
      });
    }
    if (l.exam) {
      materials.push({
        id: `${prefix}-exam-${index}`,
        title: `نماذج امتحانات: ${l.title}`,
        type: 'exam',
        date: '2026-02',
        fileUrl: l.exam
      });
    }
    if (l.assignment) {
      materials.push({
        id: `${prefix}-assign-${index}`,
        title: `فروض محروسة: ${l.title}`,
        type: 'assignment',
        date: '2026-02',
        fileUrl: l.assignment
      });
    }
  });
  return materials;
};

// ╔═══════════════════════════════════════════════════════════════════╗
// ║                                                                   ║
// ║           🎓 ابدأ إضافة دروسك من هنا ⬇️                           ║
// ║                                                                   ║
// ╚═══════════════════════════════════════════════════════════════════╝

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📐 مادة الرياضيات
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const mathLessonData: SimpleLesson[] = [
  {
    title: "Continuité d'une fonction",
    pdf: "https://drive.google.com/file/d/1CnpuCRyJZZg5Gu97Yb9rr7NRI4CodlPJ/preview",        // 📄 ضع رابط PDF للدرس هنا
    summary: "https://drive.google.com/file/d/.../view",    // 📝 ضع رابط PDF للملخص هنا
    video: "https://www.youtube.com/watch?v=...",           // 🎥 ضع رابط يوتيوب هنا
    series: "https://drive.google.com/file/d/.../view",     // 📋 ضع رابط PDF للتمارين هنا
    exam: "https://drive.google.com/file/d/.../view",       // 📊 ضع رابط PDF للامتحان هنا
    assignment: "https://drive.google.com/file/d/.../view"  // 📌 ضع رابط PDF للفرض هنا
  },
  {
    title: "Dérivabilité d'une fonction",
    pdf: "https://drive.google.com/file/d/1LgSgEawVDDCg-XPnh0Ogiu-_W_j2Mbzn/preview",           // 👈 استبدل EXAMPLE_PDF برابطك
    summary: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",       // 👈 استبدل EXAMPLE_VIDEO برابطك
    series: EXAMPLE_PDF
  },
  {
    title: "Etude des fonctions",
    pdf: "https://drive.google.com/file/d/1wDHZo2XbRQ0jFvx4ko7AA2wIJtuPoIP8/preview",
    summary: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exam: EXAMPLE_PDF
  },
  {
    title: "Limite d'une suite",
    pdf: "https://drive.google.com/file/d/1HkEh83Ir40QLWGEsTU3t2kYv8dUgII9I/preview",
    video:  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    series: EXAMPLE_PDF
  },
  {
    title: "Primitive",
    pdf: "https://drive.google.com/file/d/1NMIqFbSiUY_AnvqmrELOV79Hxx6vyfa3/preview",
    summary: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    series: EXAMPLE_PDF,
    exam: EXAMPLE_PDF,
  },
    {
    title: "Logarithme népérien",
    pdf: "https://drive.google.com/file/d/1ZAneYQ_pa8NM-GV37WlySNHJ76mK4HzH/preview",
    summary: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    series: EXAMPLE_PDF,
    exam: EXAMPLE_PDF,
  },
  {
    title: "Nombres complexes",
    pdf:  "https://drive.google.com/file/d/1FovBZmMxi96M87xTJpFALwZZTmegWXwJ/preview",
    summary: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Fonction exponentielles",
    pdf: "https://drive.google.com/file/d/1zdeuhl7u7EVWgiQN86MxF-o-cvRAL4uv/preview",
    series: EXAMPLE_PDF,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Equations différentielles",
    pdf: "https://drive.google.com/file/d/1l9bS7Ql7N1v2bT7a83FMGTzr4JbCRwAW/preview",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exam: EXAMPLE_PDF,
  },
  {
    title: "Intégrales",
    pdf: "https://drive.google.com/file/d/103ZyGg09V2TW3mE6YRxR-DnlE-jqpR11/preview",
    video: EXAMPLE_VIDEO,
    assignment: EXAMPLE_PDF,
  },
  {
    title: "Produit scalaires dans l'espace",
    pdf: "https://drive.google.com/file/d/18o9q5jOLzNoqZPjEgb3-woqudFi48_pp/preview",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exam: EXAMPLE_PDF,
  },
  {
    title: "Produit vectoriel",
    pdf: "https://drive.google.com/file/d/1H_G2OxhTzryBShf1Aa6Ce9n53--ANjv-/preview",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exam: EXAMPLE_PDF,
  },
  {
    title: "Probabilités",
    pdf: "https://drive.google.com/file/d/1G_OTRLWO0myrZeGYkJbPUAV9dZ18TC2E/preview",
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    exam: EXAMPLE_PDF,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚡ مادة الفيزياء والكيمياء
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const physiqueLessonData: SimpleLesson[] = [
  {
    title: "الموجات الميكانيكية - Ondes Mécaniques",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
    exam: EXAMPLE_PDF
  },
  {
    title: "انتشار موجة ضوئية - Propagation d'une Onde Lumineuse",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF
  },
  {
    title: "ثنائي القطب RC - Dipôle RC",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF
  },
  {
    title: "ثنائي القطب RL - Dipôle RL",
    pdf: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF
  },
  {
    title: "التحولات النووية - Transformations Nucléaires",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    exam: EXAMPLE_PDF
  },
  {
    title: "الميكانيك: قوانين نيوتن - Mécanique: Lois de Newton",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF
  },
  {
    title: "الأعمدة والتحليل الكهربائي - Piles et Électrolyse",
    pdf: EXAMPLE_PDF,
    series: EXAMPLE_PDF
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧬 مادة علوم الحياة والأرض
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const svtLessonData: SimpleLesson[] = [
  {
    title: "Libération de l’énergie emmagasinée dans la matière organique",
    pdf: "https://drive.google.com/file/d/16exg7nGclihVECbEv7WASpbBSoxuD5sx/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
  {
    title: "Rôle du muscle squelettique strié dans la conversion de l’énergie",
    pdf: "https://drive.google.com/file/d/10aD9POel11V30pKXENfH8ycLj4ruRCE8/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    exam: EXAMPLE_PDF,
  },
  {
    title: "Nature de l’information génétique",
    pdf: "https://drive.google.com/file/d/1BXJEGkMikrqVLCjFybKQZlbgN77_IDpW/preview",
    series: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF,
  },
  {
    title: "Expression de l’information génétique",
    pdf: "https://drive.google.com/file/d/17diYPiaHk7XwMwqZgl4dryNnpkWcAd5j/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    exam: EXAMPLE_PDF,
  },
  {
    title: "Transfert de l’information génétique au cours de la reproduction sexuée",
     pdf: "https://drive.google.com/file/d/15tlsNL9wdP51nHQDfl_kaFxenWRcU6qW/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
    {
    title: "Les lois statistiques de la transmission des caractères héréditaires chez les diploïdes",
    pdf: "https://drive.google.com/file/d/1kiWDFvwDtN6Wd-dOYJDhkDXRmWQXyXcl/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
    {
    title: "Les déchets ménagers issus de l’utilisation des matières organiques et inorganiques",
    pdf: "https://drive.google.com/file/d/1q30BtocLeLo53GRF2q-M8l7p4yBzbvvQ/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
    {
    title: "Les pollutions issues de la consommation des produits énergétiques, de l’utilisation de la matière organique et inorganique dans les industries chimiques, alimentaires et minérales",
    pdf: "https://drive.google.com/file/d/1Wwdyh1GfFNz8TubROq8YxoSu63RGcJpk/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
    {
    title: "Les matières radioactives et l’énergie nucléaire",
    pdf: "https://drive.google.com/file/d/159WP9ZibABrqKYDklSuMgGElxSS15Ae_/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
    {
    title: "Contrôle de la qualité et de la salubrité des milieux naturels",
    pdf: "https://drive.google.com/file/d/1W854RZS3qB5BMQ7svWsOaXNkXBZktQtz/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
  {
    title: "Les chaînes de montagnes récentes et leurs relations avec la tectonique des plaque",
    pdf: "https://drive.google.com/file/d/1ocjdY99MiGbTeYF8vpl-MHpqXhZpKAqG/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
  {
    title: "Le métamorphisme et sa relation avec la tectonique des plaques",
    pdf: "https://drive.google.com/file/d/1JrauzoT-MitBIRToNtv7D1tyqlOOimyz/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
  {
    title: "La granitisation et sa relation avec le métamorphisme",
    pdf: "https://drive.google.com/file/d/1nRIeguBFY6bFZ9o6mGHCsQyhWOGK9_cJ/preview",
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🇫🇷 مادة اللغة الفرنسية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const frenchLessonData: SimpleLesson[] = [
  {
    title: "La Boîte à Merveilles - Ahmed Sefrioui",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    assignment: EXAMPLE_PDF
  },
  {
    title: "Antigone - Jean Anouilh",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    exam: EXAMPLE_PDF
  },
  {
    title: "Le Dernier Jour d'un Condamné - Victor Hugo",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF
  },
  {
    title: "Figures de Style - الأساليب البلاغية",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF
  },
  {
    title: "Production Écrite: Plan Dialectique",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    series: EXAMPLE_PDF
  },
  {
    title: "Plan Analytique / Simple",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧠 مادة الفلسفة
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const philoLessonData: SimpleLesson[] = [
  {
    title: "مفهوم الشخص - La Personne",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    assignment: EXAMPLE_PDF
  },
  {
    title: "مفهوم الغير - Autrui",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    exam: EXAMPLE_PDF
  },
  {
    title: "النظرية والتجريب - Théorie et Expérience",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  },
  {
    title: "الحقيقة - La Vérité",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  },
  {
    title: "الدولة - L'État",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    exam: EXAMPLE_PDF
  },
  {
    title: "الحق والعدالة - Le Droit et la Justice",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🕌 مادة التربية الإسلامية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const islamicLessonData: SimpleLesson[] = [
  {
    title: "سورة يس - Sourate Yassine",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO
  },
  {
    title: "التوحيد والحرية - Unicité et Liberté",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    exam: EXAMPLE_PDF
  },
  {
    title: "الزواج: الأحكام والمقاصد - Le Mariage",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF
  },
  {
    title: "حق الله: الوفاء بالأمانة - Droit de Dieu",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  },
  {
    title: "حق النفس: الصبر واليقين - Droit de Soi",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✍️ مادة اللغة العربية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const arabicLessonData: SimpleLesson[] = [
  {
    title: "إحياء النموذج - القصيدة التقليدية",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    exam: EXAMPLE_PDF
  },
  {
    title: "سؤال الذات - الشعر الرومانسي",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  },
  {
    title: "تكسير البنية - الشعر الحر",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    series: EXAMPLE_PDF
  },
  {
    title: "تجديد الرؤيا - شعر الحداثة",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  },
  {
    title: "القصة والمسرحية - السرد",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF
  },
  {
    title: "المنهج البنيوي والاجتماعي - النقد",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🇬🇧 مادة اللغة الإنجليزية
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const englishLessonData: SimpleLesson[] = [
  {
    title: "Unit 1: Cultural Issues",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF
  },
  {
    title: "Unit 2: Gifts of Youth",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO
  },
  {
    title: "Unit 3: Education",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF,
    exam: EXAMPLE_PDF
  },
  {
    title: "Grammar: Tenses",
    pdf: EXAMPLE_PDF,
    video: EXAMPLE_VIDEO,
    series: EXAMPLE_PDF,
    assignment: EXAMPLE_PDF
  },
  {
    title: "Writing: Email & Letter",
    pdf: EXAMPLE_PDF,
    summary: EXAMPLE_PDF
  }
];

// ╔═══════════════════════════════════════════════════════════════════╗
// ║                                                                   ║
// ║           🔚 انتهى قسم إضافة الدروس                              ║
// ║           لا تعدل الكود أدناه ⬇️                                  ║
// ║                                                                   ║
// ╚═══════════════════════════════════════════════════════════════════╝

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎓 تصدير جميع المواد
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const ALL_SUBJECTS: Subject[] = [
  { 
    id: 'math', 
    name: 'الرياضيات', 
    icon: 'Calculator', 
    color: 'from-blue-600 to-indigo-700', 
    materials: mapToMaterials('math', mathLessonData) 
  },
  { 
    id: 'physique', 
    name: 'الفيزياء والكيمياء', 
    icon: 'Zap', 
    color: 'from-purple-600 to-indigo-700', 
    materials: mapToMaterials('phys', physiqueLessonData) 
  },
  { 
    id: 'svt', 
    name: 'علوم الحياة والأرض', 
    icon: 'Dna', 
    color: 'from-green-500 to-emerald-700', 
    materials: mapToMaterials('svt', svtLessonData) 
  },
  { 
    id: 'french', 
    name: 'اللغة الفرنسية', 
    icon: 'Languages', 
    color: 'from-blue-400 to-indigo-500', 
    materials: mapToMaterials('fr', frenchLessonData) 
  },
  { 
    id: 'philo', 
    name: 'الفلسفة', 
    icon: 'BrainCircuit', 
    color: 'from-slate-600 to-slate-800', 
    materials: mapToMaterials('philo', philoLessonData) 
  },
  { 
    id: 'islamic', 
    name: 'التربية الإسلامية', 
    icon: 'Moon', 
    color: 'from-emerald-500 to-emerald-600', 
    materials: mapToMaterials('is', islamicLessonData) 
  },
  { 
    id: 'arabic', 
    name: 'اللغة العربية', 
    icon: 'PenTool', 
    color: 'from-red-500 to-rose-700', 
    materials: mapToMaterials('ar', arabicLessonData) 
  },
  { 
    id: 'english', 
    name: 'اللغة الإنجليزية', 
    icon: 'Languages', 
    color: 'from-amber-500 to-orange-600', 
    materials: mapToMaterials('en', englishLessonData) 
  }
];

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║                    📌 ملاحظات مهمة                               ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 * 
 * 💡 نصائح للحصول على روابط PDF:
 * ─────────────────────────────────
 * 
 * 🔹 Google Drive:
 *    1. ارفع الملف على Google Drive
 *    2. اضغط بالزر الأيمن → مشاركة → الحصول على الرابط
 *    3. اجعله "يمكن لأي شخص لديه الرابط العرض"
 *    4. استخدم الرابط المباشر
 * 
 * 🔹 Dropbox:
 *    1. ارفع الملف
 *    2. اضغط على "مشاركة"
 *    3. انسخ الرابط
 *    4. استبدل "dl=0" بـ "dl=1" في نهاية الرابط
 * 
 * 🔹 OneDrive:
 *    1. ارفع الملف
 *    2. اضغط على "مشاركة"
 *    3. اختر "أي شخص لديه هذا الرابط"
 *    4. انسخ الرابط
 * 
 * 💡 نصائح لروابط YouTube:
 * ─────────────────────────
 * 
 * ✅ الصيغة الصحيحة:
 *    https://www.youtube.com/watch?v=VIDEO_ID
 * 
 * ❌ صيغ غير مدعومة:
 *    youtu.be/VIDEO_ID
 *    youtube.com/embed/VIDEO_ID
 * 
 * 🎯 تأكد من أن الفيديو:
 *    • متاح للعرض العام
 *    • غير محظور في بلدك
 *    • يعمل بشكل صحيح
 * 
 * ═══════════════════════════════════════════════════════════════════
 */