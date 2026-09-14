import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  Target,
  Users,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Award,
  Lock,
  Printer,
  FileCheck,
  Send,
  Building2,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONFIG, getAgencyWhatsAppNumber } from '../config';
import { KMLogo } from './KMLogo';

interface AboutBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOrderModal: () => void;
}

export const AboutBottomSheet: React.FC<AboutBottomSheetProps> = ({
  isOpen,
  onClose,
  onOpenOrderModal,
}) => {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Bottom Sheet Document ("ورقة عمل واعتماد صمملي الرسمية") */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="relative w-full max-w-4xl bg-white border-t-4 border-slate-900 shadow-2xl max-h-[92vh] flex flex-col z-10 overflow-hidden text-right"
          >
            {/* Document Header Bar */}
            <div className="p-4 sm:p-5 border-b-2 border-slate-900 bg-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <KMLogo size="sm" withShield={true} />
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{lang === 'ar' ? 'ورقة التعريف والاعتماد الرسمية' : 'Official Agency Charter'}</span>
                    <span className="px-2 py-0.5 bg-slate-900 text-amber-400 text-[10px] font-black font-mono">
                      KM-CERT-2026
                    </span>
                  </h3>
                  <p className="text-xs text-slate-600 font-bold">
                    {lang === 'ar'
                      ? 'صمملي (Sammemly KM Studio) — ميثاق الجودة والأمان للمشاريع'
                      : 'Sammemly KM Studio — Official Trust & Quality Charter'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintDocument}
                  className="p-2.5 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-900 shadow-sm transition-all"
                  title="طباعة الورقة الرسمية"
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border-2 border-slate-900 shadow-sm transition-all"
                  title="إغلاق الورقة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Parchment Paper Styling) */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-gradient-to-b from-white via-amber-50/20 to-white relative">
              
              {/* Official Seal Watermark */}
              <div className="absolute top-20 left-10 opacity-5 pointer-events-none select-none">
                <KMLogo size="xl" withShield={true} />
              </div>

              {/* Title & Official Serial Number */}
              <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black px-2.5 py-1 bg-amber-400 text-slate-950 border border-slate-900 inline-block mb-2">
                    وثيقة معتمدة وموثقة ⚖️
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                    وكالة صمملي (Sammemly | KM Studio)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                    استوديو متخصص في الموشن جرافيك، الهويات البصرية، وتصميمات السوشيال ميديا للمطاعم والشركات
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border-2 border-slate-900 text-xs font-mono font-black text-slate-800 self-stretch sm:self-auto text-center sm:text-right">
                  <div>كود الوثيقة: KM-DOC-2026</div>
                  <div className="text-emerald-700 mt-1">الحالة: سارية ومعتمدة ✓</div>
                </div>
              </div>

              {/* Agency Mission Statement */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white border-2 border-slate-900 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-amber-400 font-black text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>رسالة الوكالة وقيمنا الأساسية</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                  {t('aboutText1')}
                </p>
                <div className="text-xs text-amber-300 font-bold pt-2 border-t border-slate-800">
                  هدفنا ليس مجرد تسليم ملف تصميم، بل صناعة هوية بصرية تحقق أهدافك التسويقية وتزيد أرباحك ومبيعاتك.
                </div>
              </div>

              {/* 4 Pillars of Guarantee (ميثاق الضمان الأمني للعملاء) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    بنود ميثاق الأمان والضمان الرسمي للعميل (المعايير المعتمدة):
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 border-2 border-slate-900 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-black text-emerald-950 text-sm">
                      <Lock className="w-4 h-4 text-emerald-700" />
                      <span>١. عربون رسمي 50% مع عقد تنفيذ</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      لا يتم سداد باقي التكلفة إلا بعد استعراض المسودة الأولى واعتمادك الكامل لسير العمل بكل ثقة.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 border-2 border-slate-900 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
                      <Award className="w-4 h-4 text-amber-700" />
                      <span>٢. تعديلات متواصلة حتى الرضا التام 100%</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      نلتزم بمراجعة وتعديل التصاميم والمشاهد حتى تصل للنتيجة المطابقة لتطلعاتك التسويقية دون تراجع.
                    </p>
                  </div>

                  <div className="p-4 bg-sky-50 border-2 border-slate-900 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-black text-sky-950 text-sm">
                      <Clock className="w-4 h-4 text-sky-700" />
                      <span>٣. دقة متناهية في مواعيد التسليم</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      نحدد جدولاً زمنياً صارماً لكل مشروع ونلتزم به، مع نظام تتبع مباشر ومحدث لمراحل الإنجاز.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border-2 border-slate-900 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 font-black text-purple-950 text-sm">
                      <FileCheck className="w-4 h-4 text-purple-700" />
                      <span>٤. ملكية وسرية تامة للملفات المفتوحة</span>
                    </div>
                    <p className="text-xs text-slate-700 font-bold leading-relaxed">
                      تسليم كافة الملفات بجودة 4K فائقة والملفات المصدرية المفتوحة والجاهزة للطباعة مع الحفاظ التام على الخصوصية.
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Stamp & Sign-off */}
              <div className="p-5 bg-slate-100 border-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-400 border-2 border-slate-900 flex items-center justify-center font-black text-slate-950 text-lg shadow-sm">
                    KM
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-sm">اعتماد إدارة وكالة صمملي</div>
                    <div className="text-[11px] text-slate-600 font-bold">المقر: القاهرة • خدمات معتمدة لمصر والخليج العربي</div>
                  </div>
                </div>

                <div className="text-center sm:text-left border-t sm:border-t-0 sm:border-r-2 border-slate-300 pt-3 sm:pt-0 sm:pr-4">
                  <div className="text-[10px] text-slate-500 font-bold">الختم الرقمي المعتمد:</div>
                  <div className="text-xs font-mono font-black text-emerald-800 mt-0.5">VERIFIED • SAMMEMLY-KM</div>
                </div>
              </div>

              {/* Creative Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t-2 border-slate-900">
                <button
                  onClick={() => {
                    onClose();
                    onOpenOrderModal();
                  }}
                  className="w-full sm:w-1/2 py-4 btn-creative-primary flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>بدء مشروع جديد مع صمملي 🚀</span>
                </button>

                <a
                  href={`https://wa.me/${getAgencyWhatsAppNumber()}?text=${encodeURIComponent(
                    'أهلاً وكالة صمملي! قرأت ورقة التعريف الرسمية وحابب أستفسر عن بدء مشروع جديد 👋'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-1/2 py-4 btn-creative-emerald flex items-center justify-center gap-2 text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>تواصل مباشر مع الإدارة عبر واتساب</span>
                </a>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
