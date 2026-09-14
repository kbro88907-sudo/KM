import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/portfolio';
import { Film, UtensilsCrossed, QrCode, Image as ImageIcon, Share2, Palette, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ServicesProps {
  onSelectServiceOrder: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceOrder }) => {
  const { t } = useLanguage();

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
    <section id="services" className="py-24 relative overflow-hidden bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-bold">
            <span>{t('servicesBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            {t('servicesTitle')}<span className="gradient-text">{t('servicesTitleHighlight')}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-semibold">
            {t('servicesDesc')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between relative group hover:border-amber-500 transition-all duration-300 bg-white border-2 border-slate-200 shadow-md"
            >
              <div className="space-y-6">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getServiceIcon(service.icon)}
                  </div>

                  {service.badge && (
                    <span className="px-3 py-1 text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-700 text-sm leading-relaxed font-medium">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                      <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-bold">{service.sampleCount}</span>
                <button
                  id={`service-order-btn-${service.id}`}
                  onClick={() => onSelectServiceOrder(service.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 text-xs font-bold transition-all duration-200 border border-slate-800 hover:border-amber-400 shadow-sm"
                >
                  <span>{t('servicesOrderBtn')}</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

