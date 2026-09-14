import React from 'react';
import { motion } from 'motion/react';
import {
  Send,
  MessageSquare,
  ShieldCheck,
  Lock,
  Clock,
  Award,
  Search,
  BookOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONFIG, getAgencyWhatsAppNumber } from '../config';
import { KMLogo } from './KMLogo';
import { ServicesChainCarousel } from './ServicesChainCarousel';

interface HeroProps {
  onOpenOrderModal: () => void;
  onOpenAboutSheet?: () => void;
  onSelectServiceOrder: (serviceId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenOrderModal,
  onOpenAboutSheet,
  onSelectServiceOrder,
}) => {
  const { lang, t } = useLanguage();

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? 'أهلاً وكالة صمملي KM! حابب أستفسر عن تنفيذ مشروع جديد معكم 🚀'
        : 'Hello Sammemly KM Agency! I would like to inquire about starting a new project with you 🚀'
    );
    window.open(`https://wa.me/${getAgencyWhatsAppNumber()}?text=${text}`, '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 sm:pt-32 pb-12 overflow-hidden flex flex-col justify-center bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Top Header & Intro Row - (اللافتة العلوية تم حذفها كما طُلب) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6 text-right"
          >
            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.25] sm:leading-[1.2]">
              {lang === 'ar' ? (
                <>
                  تصاميم استثنائية تصنع الفارق وموشن جرافيك{' '}
                  <span className="gradient-text">يخطف الأنظار</span>
                </>
              ) : (
                <>
                  Exceptional Designs & Motion Graphics that{' '}
                  <span className="gradient-text">Drive Results</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-3xl">
              {lang === 'ar'
                ? 'نحول أفكارك إلى هوية بصرية ساحرة، منيوهات تفتح الشهية، وفيديوهات موشن جرافيك احترافية تزيد مبيعاتك وأرباحك من أول نظرة بكل موثوقية وأمان.'
                : 'We transform your business ideas into visual masterpieces, delicious restaurant menus, and viral motion graphics that boost sales with rock-solid security.'}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Order Button */}
              <button
                id="hero-order-btn"
                onClick={onOpenOrderModal}
                className="px-6 sm:px-8 py-3.5 sm:py-4 btn-creative-primary text-sm sm:text-base flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === 'ar' ? 'طلب تصميم جديد 🚀' : 'Start New Project 🚀'}</span>
              </button>

              {/* "About Us" Button - ("من نحن" فقط كما طُلب مع الاحتفاظ بورقة التعريف) */}
              {onOpenAboutSheet && (
                <button
                  id="hero-about-sheet-btn"
                  onClick={onOpenAboutSheet}
                  className="px-5 sm:px-7 py-3.5 sm:py-4 btn-creative-white text-sm sm:text-base flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>{lang === 'ar' ? 'من نحن' : 'About Us'}</span>
                </button>
              )}

              {/* Order Tracker Button */}
              <a
                href="#tracker"
                id="hero-track-btn"
                className="px-5 sm:px-6 py-3.5 sm:py-4 btn-creative-dark text-sm sm:text-base flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ar' ? 'استعلام عن طلبك' : 'Track Order'}</span>
              </a>

              {/* Direct WhatsApp Button */}
              <button
                id="hero-whatsapp-btn"
                onClick={handleWhatsAppClick}
                className="px-5 sm:px-6 py-3.5 sm:py-4 btn-creative-emerald text-sm sm:text-base flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('btnWhatsApp')}</span>
              </button>
            </div>

            {/* Experience & Trust Stats Row - (الرضا 98 إلى 100 وحذف ما تحته) */}
            <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-4 max-w-xl">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-amber-700">
                  {t('heroStatExpTitle')}
                </div>
                <div className="text-xs text-slate-600 font-bold">
                  {t('heroStatExpSub')}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  {t('heroStatProjectsTitle')}
                </div>
                <div className="text-xs text-slate-600 font-bold">
                  {t('heroStatProjectsSub')}
                </div>
              </div>

              {/* Satisfaction Stat: 98% - 100% and creative font presentation */}
              <div className="space-y-1">
                <div className="text-lg sm:text-xl font-black text-emerald-700 font-mono tracking-tight bg-emerald-50 px-2.5 py-1 border border-emerald-400 inline-block shadow-sm">
                  98% — 100%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: KM Monogram with Sharp Edges & Trust Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col items-center justify-center text-center"
          >
            <div className="p-6 sm:p-7 rounded-none border-2 border-slate-900 bg-white/95 backdrop-blur-md shadow-2xl space-y-4 w-full max-w-sm relative">
              {/* Central KM Monogram */}
              <div className="flex flex-col items-center gap-3">
                <KMLogo size="xl" withShield={true} />
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    {lang === 'ar' ? 'صمملي | KM' : 'Sammemly | KM'}
                  </h3>
                  <p className="text-xs text-amber-800 font-bold">
                    Motion Graphic & Brand Identity Studio
                  </p>
                </div>
              </div>

              {/* Reassuring Guarantee Badges with Sharp Borders */}
              <div className="space-y-2 pt-3 border-t border-slate-200 text-right">
                <div className="flex items-center gap-2 text-xs text-slate-800 font-bold p-2.5 rounded-none bg-emerald-50 border border-emerald-300">
                  <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>عربون رسمي 50% مع عقد وضمان تنفيذ</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-bold p-2.5 rounded-none bg-amber-50 border border-amber-300">
                  <Award className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>تعديلات متواصلة حتى الرضا التام</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-800 font-bold p-2.5 rounded-none bg-sky-50 border border-sky-300">
                  <Clock className="w-4 h-4 text-sky-700 shrink-0" />
                  <span>تسليم فوري في المواعيد المحددة بدقة</span>
                </div>
              </div>

              {/* Order Trigger */}
              <button
                onClick={onOpenOrderModal}
                className="w-full py-3.5 btn-creative-dark text-xs flex items-center justify-center gap-2"
              >
                <span>ابدأ مشروعك بأمان تام 🛡️</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* 2-Second Moving Services Chain (1 service at a time, no top text) */}
        <ServicesChainCarousel onSelectServiceOrder={onSelectServiceOrder} />

      </div>
    </section>
  );
};
