import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { OrderTracker } from './components/OrderTracker';
import { ContactSection } from './components/ContactSection';
import { OrderCalculatorModal } from './components/OrderCalculatorModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AboutBottomSheet } from './components/AboutBottomSheet';
import { MotionGraphicBackground } from './components/MotionGraphicBackground';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { dir } = useLanguage();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAboutSheetOpen, setIsAboutSheetOpen] = useState(false);
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<string | undefined>(undefined);

  const handleOpenOrderModal = (serviceId?: string) => {
    setSelectedServiceForOrder(serviceId);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedServiceForOrder(undefined);
  };

  return (
    <div
      className="min-h-screen bg-slate-50/35 text-slate-900 font-['Readex_Pro','Cairo',sans-serif] relative selection:bg-amber-500 selection:text-slate-950 overflow-hidden"
      dir={dir}
    >
      {/* 🎬 Moving Motion Graphic Interactive Background */}
      <MotionGraphicBackground />

      {/* Navbar with KM Monogram & Safe Styling */}
      <div className="relative z-20">
        <Navbar
          onOpenOrderModal={handleOpenOrderModal}
          onOpenAboutSheet={() => setIsAboutSheetOpen(true)}
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />
      </div>

      {/* Main Sections */}
      <main className="relative z-10">
        {/* 🟦 Hero Section with KM Monogram, Trust Stats, & 4s Moving Services Chain */}
        <Hero
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenAboutSheet={() => setIsAboutSheetOpen(true)}
          onSelectServiceOrder={handleOpenOrderModal}
        />

        {/* 🎨 Portfolio Gallery (Works with Admin Add Project) */}
        <PortfolioGallery onOrderSimilarWork={(category) => handleOpenOrderModal(category)} />

        {/* 🔍 Order Tracker & Live Milestone Status */}
        <OrderTracker onOpenOrderModal={handleOpenOrderModal} />

        {/* 📞 Contact Section (Streamlined: Phone & Email Only) */}
        <ContactSection onOpenOrderModal={() => handleOpenOrderModal()} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAboutSheet={() => setIsAboutSheetOpen(true)}
      />

      {/* "من نحن" Bottom Sheet Paper ("ورقة من تحت في زرار مين نحن") */}
      <AboutBottomSheet
        isOpen={isAboutSheetOpen}
        onClose={() => setIsAboutSheetOpen(false)}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      {/* Order & Instant Quote Modal */}
      <OrderCalculatorModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        preSelectedServiceId={selectedServiceForOrder}
      />

      {/* Admin Panel Modal (Includes Adding New Projects & Password Security) */}
      <AdminPanelModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}
