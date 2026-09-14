import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Clock,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  FileText,
  Bell,
  BellRing,
  EyeOff,
  Lock,
  AlertCircle,
  RefreshCw,
  Send,
  Check,
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Briefcase,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { getAgencyWhatsAppNumber } from '../config';

export interface SavedOrder {
  id: string;
  clientName: string;
  phone: string;
  brandName?: string;
  serviceTitle: string;
  serviceId: string;
  timeframe: string;
  notes?: string;
  createdAt: string;
  status: 'review' | 'in_progress' | 'ready' | 'completed';
  progress: number;
}

interface OrderTrackerProps {
  onOpenOrderModal: (serviceId?: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ onOpenOrderModal }) => {
  const { lang, t, dir } = useLanguage();
  const [orderCodeInput, setOrderCodeInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<SavedOrder | null>(null);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [recentNotificationMsg, setRecentNotificationMsg] = useState<string | null>(null);

  // Check stored notification preference
  useEffect(() => {
    try {
      const storedPref = localStorage.getItem('zenith_notifications_enabled');
      if (storedPref === 'true') {
        setNotificationsEnabled(true);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleToggleNotifications = async () => {
    if (!notificationsEnabled) {
      if ('Notification' in window && Notification.permission !== 'granted') {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            new Notification('وكالة صمملي 🚀', {
              body: 'تم تفعيل إشعارات التطورات لمشروعك بنجاح!',
            });
          }
        } catch {
          // ignore
        }
      }

      setNotificationsEnabled(true);
      localStorage.setItem('zenith_notifications_enabled', 'true');
      setRecentNotificationMsg('🔔 تم تفعيل إشعارات تطورات المشاريع والطلبات بنجاح!');
      confetti({ particleCount: 35, spread: 50 });
      setTimeout(() => setRecentNotificationMsg(null), 4000);
    } else {
      setNotificationsEnabled(false);
      localStorage.setItem('zenith_notifications_enabled', 'false');
      setRecentNotificationMsg('🔕 تم إيقاف الإشعارات مؤقتاً.');
      setTimeout(() => setRecentNotificationMsg(null), 3000);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = orderCodeInput.trim().toUpperCase();
    if (!cleanQuery) return;

    setSearched(true);
    setSearchError('');

    try {
      const stored = localStorage.getItem('zenith_orders');
      const ordersList: SavedOrder[] = stored ? JSON.parse(stored) : [];

      const found = ordersList.find(
        (o) =>
          o.id.toUpperCase() === cleanQuery ||
          o.id.toUpperCase() === `ZEN-${cleanQuery}` ||
          o.phone.replace(/[^0-9]/g, '').includes(cleanQuery.replace(/[^0-9]/g, ''))
      );

      if (found) {
        setActiveOrder(found);
        confetti({ particleCount: 25, spread: 45 });
      } else {
        setActiveOrder(null);
        setSearchError(
          lang === 'ar'
            ? 'لم يتم العثور على طلب بهذا الكود أو الرقم. يرجى التأكد من الرمز المسجل أو التواصل معنا مباشرة.'
            : 'No matching order found. Please verify your order code or phone number, or reach out to us.'
        );
      }
    } catch {
      setActiveOrder(null);
      setSearchError(lang === 'ar' ? 'حدث خطأ أثناء الاستعلام. يرجى المحاولة ثانية.' : 'Inquiry error. Please try again.');
    }
  };

  const handleClearInquiry = () => {
    setActiveOrder(null);
    setOrderCodeInput('');
    setSearched(false);
    setSearchError('');
  };

  const getStatusBadge = (status: SavedOrder['status']) => {
    switch (status) {
      case 'review':
        return (
          <span className="px-3 py-1 bg-amber-100 border border-amber-400 text-amber-900 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>قيد المراجعة والبدء</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-3 py-1 bg-sky-100 border border-sky-400 text-sky-900 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <RefreshCw className="w-3.5 h-3.5 text-sky-600 animate-spin" />
            <span>جاري التصميم والتنفيذ</span>
          </span>
        );
      case 'ready':
        return (
          <span className="px-3 py-1 bg-purple-100 border border-purple-400 text-purple-900 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>جاهز للمراجعة والتعديل</span>
          </span>
        );
      case 'completed':
        return (
          <span className="px-3 py-1 bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>تم التسليم بنجاح 100%</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleWhatsAppOrderInquiry = (order: SavedOrder) => {
    const text = encodeURIComponent(
      `أهلاً وكالة صمملي KM! استفسار بخصوص طلبي المعتمد:\n` +
      `كود الطلب: #${order.id}\n` +
      `الاسم: ${order.clientName}\n` +
      `الخدمة: ${order.serviceTitle}\n` +
      `الحالة الحالية: ${order.status === 'completed' ? 'تم التسليم' : 'جاري التنفيذ'} (${order.progress}%)`
    );
    window.open(`https://wa.me/${getAgencyWhatsAppNumber()}?text=${text}`, '_blank');
  };

  return (
    <section id="tracker" className="py-16 sm:py-20 bg-transparent relative overflow-hidden">
      
      {/* Toast Alert */}
      <AnimatePresence>
        {recentNotificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-slate-950 text-amber-400 border-2 border-amber-400 text-xs sm:text-sm font-black shadow-2xl flex items-center gap-2"
          >
            <BellRing className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>{recentNotificationMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-100 border-2 border-slate-900 text-slate-950 text-xs font-black">
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('trackerBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            {t('trackerTitle')}
            <span className="gradient-text">{t('trackerTitleHighlight')}</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-semibold">
            {t('trackerDesc')}
          </p>
        </div>

        {/* 1. مسار مرور المشروع (في خانة واحدة موحدة كما طُلب) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm border border-slate-900 shadow-sm">
                KM
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {lang === 'ar' ? 'مسار مرور المشروع المعتمد' : 'Official Project Workflow Path'}
                </h3>
                <p className="text-xs text-slate-500 font-bold">
                  {lang === 'ar' ? '٤ مراحل واضحة تضمن تسليم العمل بأعلى دقة وأمان' : '4 clear stages from consultation to final handoff'}
                </p>
              </div>
            </div>

            <span className="self-start sm:self-auto text-xs px-3 py-1 bg-emerald-100 text-emerald-950 border border-emerald-400 font-black">
              🛡️ ضمان الرضا 100%
            </span>
          </div>

          {/* Connected Single Row Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex flex-col justify-between space-y-3 relative group hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shadow-sm">
                  ١
                </span>
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 border border-amber-300">
                  البداية
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{t('workflowStep1Title')}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('workflowStep1Desc')}</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex flex-col justify-between space-y-3 relative group hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shadow-sm">
                  ٢
                </span>
                <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                  عربون 50%
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{t('workflowStep2Title')}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('workflowStep2Desc')}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex flex-col justify-between space-y-3 relative group hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shadow-sm">
                  ٣
                </span>
                <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 border border-sky-300">
                  الإبداع
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{t('workflowStep3Title')}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('workflowStep3Desc')}</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex flex-col justify-between space-y-3 relative group hover:bg-amber-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 bg-slate-900 text-amber-400 font-black text-sm flex items-center justify-center shadow-sm">
                  ٤
                </span>
                <span className="text-[10px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 border border-purple-300">
                  تسليم تام
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-1">{t('workflowStep4Title')}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('workflowStep4Desc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Order Status Tracker (Private Inquiry) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-600" />
                <span>استعلام خاص ومشفر عن حالة الطلب</span>
              </h3>
              <p className="text-xs text-slate-600 font-bold mt-1">
                أدخل كود طلبك أو رقم هاتفك لمعرفة المرحلة الحالية وتفاصيل الإنجاز مباشرة
              </p>
            </div>

            {/* Creative Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <button
                onClick={handleToggleNotifications}
                className={`px-4 py-2.5 text-xs font-black flex items-center gap-1.5 transition-all border-2 border-slate-900 shadow-sm active:translate-y-0.5 ${
                  notificationsEnabled
                    ? 'bg-emerald-100 text-emerald-950'
                    : 'bg-white text-slate-800 hover:bg-slate-100'
                }`}
                title="تفعيل الإشعارات"
              >
                {notificationsEnabled ? (
                  <>
                    <BellRing className="w-3.5 h-3.5 text-emerald-700" />
                    <span>الإشعارات مفعلة ✓</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-3.5 h-3.5 text-slate-700" />
                    <span>تفعيل الإشعارات 🔔</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenOrderModal()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black border-2 border-slate-900 shadow-sm transition-all active:translate-y-0.5 shrink-0"
              >
                + {t('btnOrder')}
              </button>
            </div>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute top-3.5 right-4 pointer-events-none" />
              <input
                type="text"
                value={orderCodeInput}
                onChange={(e) => {
                  setOrderCodeInput(e.target.value);
                  setSearchError('');
                }}
                placeholder="أدخل كود طلبك أو رقم هاتفك المسجل للاستعلام..."
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border-2 border-slate-900 text-slate-900 font-black text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm border-2 border-slate-900 shadow-sm transition-all active:translate-y-0.5 shrink-0 flex items-center justify-center gap-2"
            >
              <span>{t('trackSearchBtn')}</span>
            </button>
          </form>

          {/* Search Error Message */}
          {searchError && (
            <div className="p-4 bg-rose-50 border-2 border-rose-400 text-rose-900 text-xs sm:text-sm font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Active Order Display */}
          {activeOrder && (
            <motion.div
              key={activeOrder.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-7 bg-slate-50 border-2 border-slate-900 space-y-6 relative shadow-md"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-wider bg-amber-400 px-3 py-1 border border-slate-900">
                      #{activeOrder.id}
                    </span>
                    {getStatusBadge(activeOrder.status)}
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2">
                    {activeOrder.serviceTitle}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-600 font-bold sm:text-left">
                    <div>تاريخ الطلب: {activeOrder.createdAt}</div>
                    <div className="text-amber-800 mt-0.5">{activeOrder.timeframe}</div>
                  </div>

                  <button
                    onClick={handleClearInquiry}
                    className="p-2 bg-white border-2 border-slate-900 text-slate-800 hover:bg-slate-100 text-xs font-black transition-all"
                  >
                    استعلام آخر ✕
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-black">
                  <span className="text-slate-700">نسبة التقدم وإنجاز التصميم:</span>
                  <span className="text-amber-700 font-mono text-sm">{activeOrder.progress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 border border-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-700"
                    style={{ width: `${activeOrder.progress}%` }}
                  />
                </div>
              </div>

              {/* Order Meta Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white border border-slate-300">
                  <span className="text-[11px] text-slate-500 font-bold block">اسم العميل</span>
                  <span className="text-xs font-black text-slate-900">{activeOrder.clientName}</span>
                </div>
                <div className="p-3 bg-white border border-slate-300">
                  <span className="text-[11px] text-slate-500 font-bold block">البراند / النشاط</span>
                  <span className="text-xs font-black text-slate-900">{activeOrder.brandName || 'غير محدد'}</span>
                </div>
                <div className="p-3 bg-white border border-slate-300">
                  <span className="text-[11px] text-slate-500 font-bold block">ملاحظات العمل</span>
                  <span className="text-xs font-black text-slate-900 truncate block">
                    {activeOrder.notes || 'تسليم بالموعد المتفق عليه'}
                  </span>
                </div>
              </div>

              {/* Actions for Order */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>تحديثات مستمرة حتى الرضا التام</span>
                </div>

                <button
                  onClick={() => handleWhatsAppOrderInquiry(activeOrder)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs border-2 border-slate-900 shadow-sm flex items-center gap-2 transition-all active:translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>متابعة الطلب مع المصمم واتساب</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
