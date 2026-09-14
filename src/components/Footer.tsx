import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, ShieldCheck, Phone } from 'lucide-react';
import { AGENCY_CONFIG, getAgencyWhatsAppNumber } from '../config';
import { getVisitorStats, VisitorStats } from '../utils/visitorTracker';
import { KMLogo } from './KMLogo';

interface FooterProps {
  onOpenAdminModal?: () => void;
  onOpenAboutSheet?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminModal, onOpenAboutSheet }) => {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    setStats(getVisitorStats());

    const handleUpdate = () => {
      setStats(getVisitorStats());
    };

    window.addEventListener('zenith_visitor_update', handleUpdate);
    return () => window.removeEventListener('zenith_visitor_update', handleUpdate);
  }, []);

  return (
    <footer className="bg-slate-100 border-t-2 border-slate-300 py-12 text-slate-700 text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-300">
          
          {/* Logo & Identity with KM Monogram */}
          <div className="flex items-center gap-3">
            <KMLogo size="md" withShield={true} />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-slate-900 font-black text-base">{AGENCY_CONFIG.agencyName}</h4>
                <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-black border border-amber-300">
                  KM
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                وكالة تصميم الهوية البصرية والموشن جرافيك بضمان وأمان كامل 🛡️
              </p>
            </div>
          </div>

          {/* Nav quick links */}
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 text-xs font-bold text-slate-700">
            <a href="#hero" className="hover:text-amber-700 transition-colors">الرئيسية</a>
            {onOpenAboutSheet && (
              <button
                onClick={onOpenAboutSheet}
                className="hover:text-amber-700 transition-colors text-slate-800 font-bold"
              >
                من نحن
              </button>
            )}
            <a href="#services-chain-section" className="hover:text-amber-700 transition-colors">⛓️ سلسلة الخدمات</a>
            <a href="#portfolio" className="hover:text-amber-700 transition-colors">🎨 الأعمال</a>
            <a href="#tracker" className="hover:text-amber-700 transition-colors">🔍 استعلام عن طلب</a>
            <a href="#contact" className="hover:text-amber-700 transition-colors">📞 تواصل معنا</a>

            {/* Live Visitors Counter Badge */}
            {stats && (
              <div id="footer-live-visitor-badge" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-slate-800 text-[11px] font-extrabold shadow-inner">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>الزوار: {stats.totalVisits.toLocaleString()}</span>
              </div>
            )}
          </div>

        </div>

        {/* Contact info strip: Phone & Email Only as requested */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>هاتف وواتساب:</span>
            <span className="font-mono text-emerald-800 dir-ltr">{AGENCY_CONFIG.whatsappFormatted}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-600" />
            <span>البريد الإلكتروني:</span>
            <span className="font-mono text-slate-900">{AGENCY_CONFIG.email}</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 font-black">
            <ShieldCheck className="w-4 h-4" />
            <span>ضمان أمان رسمي وعربون 50%</span>
          </div>
        </div>

        {/* Bottom copyright & discrete admin link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <p className="flex items-center gap-1">
              <span>جميع الحقوق محفوظة © {new Date().getFullYear()} — </span>
              <strong className="text-slate-900 font-black">صمملي | Sammemly (KM)</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenAdminModal && (
              <button
                onClick={onOpenAdminModal}
                className="text-slate-400 hover:text-slate-700 transition-colors text-[11px] font-mono hover:underline"
              >
                🔐 دخول الإدارة
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
