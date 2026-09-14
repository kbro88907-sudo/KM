import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONFIG } from '../config';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-bold">
            <span>{t('aboutBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            {t('aboutHeadingMain')}<span className="gradient-text">{t('aboutHeadingHighlight')}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-semibold">
            {t('aboutSub')}
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Avatar / Brand Image Box */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-2 border-slate-200 bg-slate-50 space-y-6 relative overflow-hidden shadow-lg">
              <div className="w-28 h-28 rounded-3xl overflow-hidden bg-slate-900 border-2 border-amber-400 shadow-xl mx-auto flex items-center justify-center">
                <img
                  src={AGENCY_CONFIG.logo}
                  alt="وكالة صمملي | Sammemly Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-slate-900">{t('brandName')}</h3>
                <p className="text-amber-700 font-bold text-sm">{t('aboutCardRole')}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900 block font-bold">{t('aboutVal1Title')}</strong>
                    {t('aboutVal1Desc')}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-700">
                    <strong className="text-slate-900 block font-bold">{t('aboutVal2Title')}</strong>
                    {t('aboutVal2Desc')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description & Philosophy Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <p className="text-slate-900 text-lg sm:text-xl leading-relaxed font-bold">
                {t('aboutText1')}
              </p>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                {t('aboutText2')}
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{t('aboutCheck1Title')}</h4>
                  <p className="text-xs text-slate-600 font-medium">{t('aboutCheck1Desc')}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{t('aboutCheck2Title')}</h4>
                  <p className="text-xs text-slate-600 font-medium">{t('aboutCheck2Desc')}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{t('aboutCheck3Title')}</h4>
                  <p className="text-xs text-slate-600 font-medium">{t('aboutCheck3Desc')}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 shadow-sm">
                <CheckCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{t('aboutCheck4Title')}</h4>
                  <p className="text-xs text-slate-600 font-medium">{t('aboutCheck4Desc')}</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

