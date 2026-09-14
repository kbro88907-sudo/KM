import React, { useState, useEffect } from 'react';
import { MessageSquare, Menu as MenuIcon, X, Globe, CornerUpLeft } from 'lucide-react';
import { useLanguage, languagesList, Language } from '../context/LanguageContext';
import { getAgencyWhatsAppNumber } from '../config';
import { KMLogo } from './KMLogo';

interface NavbarProps {
  onOpenOrderModal: (serviceId?: string) => void;
  onOpenShareModal?: () => void;
  onOpenAdminModal?: () => void;
  onOpenAboutSheet?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrderModal,
  onOpenAboutSheet,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      lang === 'ar'
        ? 'أهلاً وكالة صمملي KM! حابب أستفسر عن خدمات التصميم والموشن جرافيك 🚀'
        : 'Hello Sammemly KM Agency! I would like to inquire about design and motion services 🚀'
    );
    window.open(`https://wa.me/${getAgencyWhatsAppNumber()}?text=${text}`, '_blank');
  };

  const currentLangObj = languagesList.find((l) => l.id === lang) || languagesList[0];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-2.5'
          : 'bg-white/90 backdrop-blur-sm py-3.5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo & Brand Name with KM Monogram */}
          <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
            <KMLogo size="sm" withShield={true} />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                {lang === 'ar' ? 'صمملي' : 'Sammemly'}
                <span className="text-amber-900 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 font-extrabold">
                  KM
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">
                {lang === 'ar' ? 'تصميم وموشن جرافيك بضمان أمان 🛡️' : 'Motion & Brand Identity Studio'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200">
            <a
              href="#hero"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
            >
              {t('navHome')}
            </a>

            {/* "من نحن" button opens the bottom sheet as requested! */}
            {onOpenAboutSheet && (
              <button
                onClick={onOpenAboutSheet}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
              >
                {t('navAbout')}
              </button>
            )}

            <a
              href="#services-chain-section"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
            >
              ⛓️ {t('navServices')}
            </a>

            <a
              href="#portfolio"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
            >
              {t('navPortfolio')}
            </a>

            <a
              href="#tracker"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
            >
              {t('navTracker')}
            </a>

            <a
              href="#contact"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-amber-800 hover:bg-white rounded-full transition-all"
            >
              {t('navContact')}
            </a>
          </div>

          {/* Action Area: Language Selector + Order CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Back to Home Button (Shown when scrolled) */}
            {scrolled && (
              <a
                href="#hero"
                id="navbar-back-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border-2 border-slate-900 transition-all shadow-sm"
                title={t('btnBackToHome')}
              >
                <CornerUpLeft className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden md:inline">{t('btnBackToHome')}</span>
              </a>
            )}

            {/* Language Switcher (Only AR & EN as requested) */}
            <div className="relative">
              <button
                id="language-switcher-btn"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-900 text-slate-800 text-xs font-bold transition-all shadow-sm"
              >
                <Globe className="w-4 h-4 text-amber-600" />
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.label}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute top-full mt-2 left-0 sm:right-0 bg-white border-2 border-slate-900 shadow-2xl py-2 w-44 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-600 border-b border-slate-100 mb-1">
                    🌐 Choose Language / اختر اللغة
                  </div>
                  {languagesList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setLang(item.id as Language);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-right px-3 py-2 text-xs font-bold flex items-center justify-between hover:bg-amber-50 hover:text-amber-900 transition-colors ${
                        lang === item.id ? 'bg-amber-100/70 text-amber-950 font-black' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.name}</span>
                      </span>
                      {lang === item.id && <span className="text-amber-700">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Direct CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 btn-creative-emerald text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </button>

            {/* Order Modal Button */}
            <button
              id="navbar-order-cta"
              onClick={() => onOpenOrderModal()}
              className="px-4 sm:px-5 py-2 btn-creative-primary text-xs sm:text-sm"
            >
              <span>{t('btnOrder')} 🚀</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-slate-100 text-slate-700 hover:text-slate-950 border-2 border-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-3 pb-4 border-t border-slate-200 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              {t('navHome')}
            </a>

            {onOpenAboutSheet && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAboutSheet();
                }}
                className="w-full text-right px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
              >
                {t('navAbout')}
              </button>
            )}

            <a
              href="#services-chain-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              ⛓️ {t('navServices')} (سلسلة الخدمات)
            </a>

            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              {t('navPortfolio')}
            </a>

            <a
              href="#tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              {t('navTracker')}
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              {t('navContact')}
            </a>
          </div>
        )}

      </div>
    </nav>
  );
};
