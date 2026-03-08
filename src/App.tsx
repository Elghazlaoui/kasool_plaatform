import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function App() {
  // Replace this with your actual main website URL
  const mainWebsiteUrl = "https://kasool.xyz";

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-6 font-sans selection:bg-[#3b36b8] selection:text-white" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-center border border-black/5"
      >
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-[#3b36b8] rounded-2xl flex items-center justify-center text-white">
            <ExternalLink size={32} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          تم تحديث الرابط
        </h1>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          الرابط الحالي لا يعمل. لقد تم تحديث الرابط، يرجى الضغط على الزر أدناه للمتابعة إلى الموقع الجديد.
        </p>

        <motion.a
          href={mainWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center justify-center gap-3 w-full bg-[#3b36b8] text-white py-4 px-6 rounded-2xl font-medium transition-all hover:opacity-90"
        >
          <span>انتقل إلى الموقع الأساسي</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-[-4px]" />
        </motion.a>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            شكراً لزيارتك
          </p>
        </div>
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200/50 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

