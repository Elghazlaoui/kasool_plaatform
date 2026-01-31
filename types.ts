
export type MaterialType = 'lesson' | 'summary' | 'video' | 'series' | 'exam' | 'assignment';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Material {
  id: string;
  title: string;
  type: MaterialType;
  date: string;
  fileUrl: string;
  description?: string;
  duration?: string;
  quiz?: Quiz;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  materials: Material[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  subjectId?: string;
  type: 'new_material' | 'exam_alert' | 'system';
}

export interface Translations {
  app_name: string;
  subtitle: string;
  dashboard: string;
  subjects: string;
  countdown: string;
  days: string;
  settings: string;
  logout: string;
  search_placeholder: string;
  ai_assistant: string;
  prep_2024: string;
  welcome_title: string;
  welcome_subtitle: string;
  welcome_desc: string;
  done_lessons: string;
  summaries: string;
  scientific_branch: string;
  intl_branch: string;
  recent_updates: string;
  view_all: string;
  important_dates: string;
  national_exam: string;
  national_desc: string;
  final_exams: string;
  final_exams_desc: string;
  tip_day: string;
  tip_content: string;
  lessons_cat: string;
  summaries_cat: string;
  videos_cat: string;
  series_cat: string;
  exams_cat: string;
  assignments_cat: string;
  all_cat: string;
  files: string;
  no_results: string;
  open_standalone: string;
  download_direct: string;
  preparing: string;
  pdf_fallback_msg: string;
  SM_branch: string;
  PC_branch: string;
  SVT_branch: string;
  quiz_tab: string;
  content_tab: string;
  generate_ai_quiz: string;
  score: string;
  finish_quiz: string;
  correct: string;
  wrong: string;
  next_question: string;
  restart_quiz: string;
}
