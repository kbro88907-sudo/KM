import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getAgencyWhatsAppNumber } from '../config';

export const WhatsAppFloatingButton: React.FC = () => {
  const handleClick = () => {
    const text = encodeURIComponent('أهلاً وكالة صمملي! 👋 حابب أستفسر عن تصميم جديد لمشروعي 🚀');
    window.open(`https://wa.me/${getAgencyWhatsAppNumber()}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2 group">
      <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-white border-2 border-emerald-300 text-emerald-950 text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        تحدث مع خالد الآن 🟢
      </div>
      <button
        id="floating-whatsapp-trigger"
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 relative"
        aria-label="تواصل واتساب"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-slate-950 stroke-emerald-500" />
      </button>
    </div>
  );
};
