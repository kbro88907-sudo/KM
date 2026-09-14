import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolio';
import {
  Film,
  UtensilsCrossed,
  QrCode,
  Image as ImageIcon,
  Share2,
  Palette,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Send,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesChainCarouselProps {
  onSelectServiceOrder: (serviceId: string) => void;
}

export const ServicesChainCarousel: React.FC<ServicesChainCarouselProps> = ({
  onSelectServiceOrder,
}) => {
  const { lang, dir } = useLanguage();
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalServices = SERVICES_DATA.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance every 2 seconds EXACTLY (كل 2 ثانيه بالظبط)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % totalServices);
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalServices]);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalServices);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  // ONE single service card displayed at a time (خدمة واحدة فقط بدل 2)
  const currentService = SERVICES_DATA[startIndex];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-7 h-7 text-purple-600" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-7 h-7 text-amber-600" />;
      case 'QrCode':
        return <QrCode className="w-7 h-7 text-cyan-600" />;
      case 'Image':
        return <ImageIcon className="w-7 h-7 text-emerald-600" />;
      case 'Share2':
        return <Share2 className="w-7 h-7 text-blue-600" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-rose-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-amber-600" />;
    }
  };

  return (
    <div
      id="services-chain-section"
      className="w-full relative mt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* NO top header / banner text ("متخليهاش تظهر مكتوبه من فوق") */}

      {/* Single Service Card Container */}
      <div className="max-w-xl mx-auto relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, x: dir === 'rtl' ? -35 : 35, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? 35 : -35, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="rounded-none bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-xl p-5 sm:p-6 flex flex-col justify-between relative group text-right"
          >
            {/* Top row: Icon + Counter + Badge */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="w-13 h-13 rounded-none bg-slate-100 border border-slate-900/40 flex items-center justify-center shadow-inner">
                {getServiceIcon(currentService.icon)}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-2.5 py-1 rounded-none bg-slate-900 text-amber-400">
                  {startIndex + 1} / {totalServices}
                </span>
                {currentService.badge && (
                  <span className="px-2.5 py-1 text-xs font-black bg-amber-100 text-amber-900 border border-amber-400 rounded-none">
                    {currentService.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Service Title & Details */}
            <div className="space-y-2 flex-1">
              <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                {currentService.title}
              </h4>
              <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                {currentService.shortDesc}
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100">
                {currentService.features.slice(0, 2).map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-1.5 text-xs text-slate-700 font-bold"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions Row: Navigation controls & Order CTA */}
            <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
              {/* Minimalist Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={dir === 'rtl' ? handleNext : handlePrev}
                  className="p-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-all"
                  title="السابق"
                >
                  {dir === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-50 border border-slate-200">
                  {SERVICES_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStartIndex(idx)}
                      className={`h-1.5 rounded-none transition-all duration-300 ${
                        startIndex === idx ? 'w-4 bg-amber-500' : 'w-1.5 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={dir === 'rtl' ? handlePrev : handleNext}
                  className="p-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition-all"
                  title="التالي"
                >
                  {dir === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Order Button */}
              <button
                onClick={() => onSelectServiceOrder(currentService.id)}
                className="px-5 py-2.5 rounded-none bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>{lang === 'ar' ? 'طلب هذه الخدمة' : 'Order Service'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
