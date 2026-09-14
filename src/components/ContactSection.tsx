import React, { useState } from 'react';
import { Phone, Mail, Copy, Check, MessageSquare, Send, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONFIG, getAgencyWhatsAppNumber } from '../config';

interface ContactSectionProps {
  onOpenOrderModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenOrderModal }) => {
  const { lang } = useLanguage();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const contactInfo = {
    phoneFormatted: AGENCY_CONFIG.whatsappFormatted,
    phoneRaw: getAgencyWhatsAppNumber(),
    email: AGENCY_CONFIG.email,
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? 'أهلاً وكالة صمملي KM! حابب أستفسر عن تنفيذ مشروع جديد معكم 🚀'
        : 'Hello Sammemly KM Agency! I would like to inquire about starting a new project with you 🚀'
    );
    window.open(`https://wa.me/${contactInfo.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-8 sm:py-10 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* لافتة تواصل معنا المختصرة والأنيقة (Phone & Email Only - No Redundancy) */}
        <div className="bg-white/95 backdrop-blur-md border-2 border-slate-900 shadow-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-right">
          
          {/* Title & Trust info */}
          <div className="space-y-1.5 text-center lg:text-right w-full lg:w-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-400 text-xs font-black">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'ar' ? 'تواصل فوري ومباشر' : 'Direct Official Contact'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-bold">
              {lang === 'ar'
                ? 'جاهزون للرد الفوري وبدء تنفيذ مشروعك'
                : 'Ready for instant response and project kickoff'}
            </p>
          </div>

          {/* Contact Items: Phone & Email Only */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            {/* Phone & WhatsApp Card */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex items-center justify-between gap-4 min-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {lang === 'ar' ? 'الهاتف / واتساب' : 'Phone / WhatsApp'}
                  </span>
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="text-sm sm:text-base font-black text-slate-900 hover:text-emerald-700 dir-ltr block transition-colors"
                  >
                    {contactInfo.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyToClipboard(contactInfo.phoneFormatted, 'phone')}
                  className="p-2 bg-white text-slate-700 hover:text-slate-950 border border-slate-300 transition-all"
                  title="نسخ الرقم"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-4 bg-slate-50 border-2 border-slate-900 flex items-center justify-between gap-4 min-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm font-black">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Official Email'}
                  </span>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-xs sm:text-sm font-black text-slate-900 hover:text-amber-700 dir-ltr block transition-colors truncate max-w-[160px]"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => copyToClipboard(contactInfo.email, 'email')}
                  className="p-2 bg-white text-slate-700 hover:text-slate-950 border border-slate-300 transition-all"
                  title="نسخ البريد"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp or Order Action */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-5 py-3.5 btn-creative-emerald text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب 💬</span>
            </button>

            <button
              onClick={onOpenOrderModal}
              className="px-5 py-3.5 btn-creative-primary text-xs sm:text-sm flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>طلب تصميم 🚀</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
