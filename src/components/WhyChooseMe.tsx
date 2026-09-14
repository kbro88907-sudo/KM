import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_REASONS } from '../data/portfolio';
import { Zap, Target, Handshake, Clock, PiggyBank, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const WhyChooseMe: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-7 h-7 text-amber-400" />;
      case 'Target':
        return <Target className="w-7 h-7 text-cyan-400" />;
      case 'Handshake':
        return <Handshake className="w-7 h-7 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-7 h-7 text-purple-400" />;
      case 'PiggyBank':
        return <PiggyBank className="w-7 h-7 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-7 h-7 text-amber-400" />;
    }
  };

  return (
    <section id="why-me" className="py-24 bg-white relative overflow-hidden border-t border-b border-slate-200">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-bold">
            <span>💡 ليه تختارني؟</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900">
            مميزات تعاملك مع <span className="gradient-text">خالد برو</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-semibold">
            تجربة عمل مريحة، تواصل مباشر، والتزام تام بأعلى معايير الجودة والسرعة
          </p>
        </div>

        {/* Reasons Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_REASONS.map((reason, idx) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-3xl p-7 space-y-5 border-2 border-slate-200 bg-slate-50 hover:border-amber-500 transition-all duration-300 relative group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  {getIcon(reason.icon)}
                </div>

                {reason.highlightText && (
                  <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                    {reason.highlightText}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-3xl p-7 border-2 border-emerald-300 bg-emerald-50/80 flex flex-col justify-between space-y-5 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300 shadow-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">ضمان الرضا ١٠٠٪</h3>
                <p className="text-xs text-emerald-800 font-bold">تعديلات حتى الإرضاء التام</p>
              </div>
            </div>

            <p className="text-slate-700 text-xs leading-relaxed font-semibold">
              مش بنقفل مشروعك إلا لما تكون راضي تمامًا عن النتيجة النهائية، وتكون واثق إن التصميم هيعمل الفرق المطلوب لمشروعك.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>ثقة متبادلة مع مئات العملاء</span>
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
