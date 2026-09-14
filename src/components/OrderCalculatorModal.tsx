import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../data/portfolio';
import { X, Send, CheckCircle2, Sparkles, Clock, Film, UtensilsCrossed, QrCode, Palette, Share2, ImageIcon, ShieldCheck, Tag, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { SavedOrder } from './OrderTracker';
import { getAgencyWhatsAppNumber } from '../config';
import { getAgencyPricing, AgencyPricingData, calcUsd } from '../data/pricingStore';

interface OrderCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
}

export const OrderCalculatorModal: React.FC<OrderCalculatorModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
}) => {
  const { lang, t, dir } = useLanguage();
  const [selectedService, setSelectedService] = useState<string>('motion');
  const [brandName, setBrandName] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [timeframe, setTimeframe] = useState<'urgent' | 'standard' | 'flexible'>('standard');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [lastGeneratedCode, setLastGeneratedCode] = useState('');

  // 1. Service-specific customized state options
  // Motion options
  const [motionDuration, setMotionDuration] = useState('15s');
  const [motionRatio, setMotionRatio] = useState('9:16');
  const [motionVoiceover, setMotionVoiceover] = useState('voiceover_included');

  // Menu options
  const [menuType, setMenuType] = useState('restaurant');
  const [menuFormat, setMenuFormat] = useState('both');
  const [menuPages, setMenuPages] = useState('2_pages');
  const [menuLanguage, setMenuLanguage] = useState('ar_en');

  // QR options
  const [qrTargetLink, setQrTargetLink] = useState('');
  const [qrStyle, setQrStyle] = useState('branded_logo');

  // Branding options
  const [brandingScope, setBrandingScope] = useState('logo_and_colors');
  const [brandingStyle, setBrandingStyle] = useState('modern');

  // Social options
  const [socialPack, setSocialPack] = useState('pack_10');
  const [socialPlatforms, setSocialPlatforms] = useState('instagram_facebook');

  // Posters options
  const [posterSize, setPosterSize] = useState('a4_a3');

  // Payment & Deposit State
  const [paymentMethod, setPaymentMethod] = useState<'etisalat_cash' | 'instapay' | 'paypal'>('etisalat_cash');
  const [paymentRef, setPaymentRef] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Dynamic Pricing State
  const [agencyPricing, setAgencyPricing] = useState<AgencyPricingData>(getAgencyPricing());

  useEffect(() => {
    if (isOpen) {
      setAgencyPricing(getAgencyPricing());
    }
  }, [isOpen]);

  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedService(preSelectedServiceId);
    }
  }, [preSelectedServiceId]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentServiceObj = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) {
      alert(lang === 'ar' ? 'برجاء ادخال الاسم ورقم الهاتف للتواصل' : 'Please enter your name and phone number');
      return;
    }

    const orderId = `ZEN-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastGeneratedCode(orderId);

    // Build custom specifications summary based on selected service
    let customDetails = '';
    if (selectedService === 'motion') {
      customDetails = `🎬 موشن جرافيك | المدة: ${motionDuration} | المقاس: ${motionRatio} | الصوت: ${
        motionVoiceover === 'voiceover_included' ? 'مع تعليق صوتي فويس أوفر' : 'موسيقى وخلفيات فقط'
      }`;
    } else if (selectedService === 'menu') {
      customDetails = `🍽️ منيو | النوع: ${menuType} | الصيغة: ${menuFormat} | الأوجه: ${menuPages} | اللغات: ${menuLanguage}`;
    } else if (selectedService === 'qrcode') {
      customDetails = `📱 كيو ار كود | الرابط: ${qrTargetLink || 'سيتم إرساله'} | الستايل: ${qrStyle}`;
    } else if (selectedService === 'branding') {
      customDetails = `🏷️ هوية بصرية | النطاق: ${brandingScope} | الطابع الفني: ${brandingStyle}`;
    } else if (selectedService === 'social') {
      customDetails = `📲 سوشيال ميديا | الباقة: ${socialPack} | المنصات: ${socialPlatforms}`;
    } else if (selectedService === 'posters') {
      customDetails = `🖼️ بوسترات | المقاس/النوع: ${posterSize}`;
    }

    const timeframeText =
      timeframe === 'urgent'
        ? '⚡ عاجل جداً (خلال 24-48 ساعة)'
        : timeframe === 'standard'
        ? '⏱️ عادي (خلال 3 - 5 أيام)'
        : '📅 مرن (غير مستعجل)';

    const currentPriceConfig = agencyPricing.services[selectedService];
    let basePrice = currentPriceConfig ? currentPriceConfig.basePrice : 1000;

    // Check if variant price exists for selected sub-option
    if (currentPriceConfig && currentPriceConfig.variants && currentPriceConfig.variants.length > 0) {
      let selectedVariantId = '';
      if (selectedService === 'motion') selectedVariantId = motionDuration;
      else if (selectedService === 'menu') selectedVariantId = menuPages;
      else if (selectedService === 'qrcode') selectedVariantId = qrStyle;
      else if (selectedService === 'branding') selectedVariantId = brandingScope;
      else if (selectedService === 'social') selectedVariantId = socialPack;
      else if (selectedService === 'posters') selectedVariantId = posterSize;

      const matchedVariant = currentPriceConfig.variants.find((v) => v.id === selectedVariantId);
      if (matchedVariant && typeof matchedVariant.price === 'number') {
        basePrice = matchedVariant.price;
      }
    }

    let totalCalculatedPrice = basePrice;
    if (timeframe === 'urgent' && currentPriceConfig) {
      totalCalculatedPrice += currentPriceConfig.expressDeliveryFee;
    }
    const usdRate = agencyPricing.usdRate || 50;
    const totalUsd = calcUsd(totalCalculatedPrice, usdRate);
    const depositAmount = Math.round(totalCalculatedPrice / 2);
    const depositUsd = calcUsd(depositAmount, usdRate);

    const paymentMethodLabel =
      paymentMethod === 'etisalat_cash'
        ? '📱 اتصالات كاش (01142519384)'
        : paymentMethod === 'instapay'
        ? '⚡ إنستاباي InstaPay (01142519384)'
        : `💳 بايبال PayPal (${depositUsd} USD -> kbro88907@gmail.com)`;

    // Save order locally so user can track it in the OrderTracker section
    const newOrder: SavedOrder = {
      id: orderId,
      clientName,
      phone,
      brandName,
      serviceTitle: currentServiceObj.title,
      serviceId: selectedService,
      timeframe: timeframeText,
      notes: `${customDetails} | الإجمالي: ${totalCalculatedPrice} ${agencyPricing.currencySymbol} ($${totalUsd} USD) | العربون 50%: ${depositAmount} ${agencyPricing.currencySymbol} ($${depositUsd} USD) | طريقة الدفع: ${paymentMethodLabel} ${
        paymentRef ? `| مرجع التحويل: ${paymentRef}` : ''
      } ${notes ? `| ملاحظات: ${notes}` : ''}`,
      createdAt: new Date().toLocaleDateString(),
      status: 'in_progress',
      progress: 25,
    };

    try {
      const existing = localStorage.getItem('zenith_orders');
      const orderList: SavedOrder[] = existing ? JSON.parse(existing) : [];
      localStorage.setItem('zenith_orders', JSON.stringify([newOrder, ...orderList]));
    } catch {
      // fallback
    }

    const whatsappMessage = encodeURIComponent(
      `📌 *طلب خدمة تصميم جديد مع تحويل العربون (50%)*\n` +
      `🆔 *كود المتابعة:* ${orderId}\n\n` +
      `👤 *العميل:* ${clientName}\n` +
      `🏢 *البراند / المشروع:* ${brandName || 'غير محدد'}\n` +
      `📞 *رقم الواتساب:* ${phone}\n` +
      `🛠️ *الخدمة:* ${currentServiceObj.title}\n` +
      `⚙️ *المواصفات:* ${customDetails}\n` +
      `⏳ *التوقيت:* ${timeframeText}\n\n` +
      `💰 *التكلفة الكلية المقدرة:* ${totalCalculatedPrice} ${agencyPricing.currencySymbol} ($${totalUsd} USD)\n` +
      `💵 *العربون المطلوب (50% للبدء):* ${depositAmount} ${agencyPricing.currencySymbol} ($${depositUsd} USD)\n` +
      `💳 *طريقة الدفع المختارة:* ${paymentMethodLabel}\n` +
      `🧾 *إثبات / مرجع التحويل:* ${paymentRef || 'سيتم إرسال صورة الإيصال في الشات'}\n` +
      `📝 *ملاحظات إضافية:* ${notes || 'لا يوجد'}\n\n` +
      `أنا جاهز لبدء العمل والتنفيذ المباشر مع وكالة صمملي! 🚀`
    );

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/${getAgencyWhatsAppNumber()}?text=${whatsappMessage}`, '_blank');
      onClose();
      setSubmitted(false);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl rounded-3xl border-2 border-slate-200 overflow-hidden shadow-2xl relative p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Prominent High-Contrast Close Button (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 ltr:right-4 rtl:left-4 z-50 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-black border-2 border-slate-300 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          aria-label="Close"
          title={t('btnBack')}
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{t('modalHeaderBadge')}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            {t('modalHeaderTitle')}
            <span className="gradient-text">{t('modalHeaderTitleHighlight')}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            {t('modalHeaderSub')}
          </p>
        </div>

        {submitted && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold space-y-1 animate-in fade-in">
            <div className="flex items-center gap-2 text-sm font-black">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>تم تسجيل طلبك بنجاح! كود المتابعة: <span className="font-mono bg-emerald-200 px-2 py-0.5 rounded text-black">{lastGeneratedCode}</span></span>
            </div>
            <p className="text-xs">جاري فتح محادثة الواتساب المباشرة للبدء والتنسيق... 🚀</p>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Select Service Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 block">{t('modalServiceLabel')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICES_DATA.map((srv) => (
                <button
                  type="button"
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  className={`p-3 rounded-xl border transition-all text-xs font-bold flex flex-col justify-between space-y-1 text-right ${
                    selectedService === srv.id
                      ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-400/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{srv.title}</span>
                  <span className="text-[10px] font-semibold text-slate-600">{srv.badge || 'خدمة متميزة'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. DYNAMIC CUSTOMIZED OPTIONS ACCORDING TO SELECTED SERVICE */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs border-b border-amber-200 pb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>تخصيص مواصفات خدمة ({currentServiceObj.title}):</span>
            </div>

            {/* Motion Graphics Options */}
            {selectedService === 'motion' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">مدة الفيديو (Video Duration):</label>
                    <select
                      value={motionDuration}
                      onChange={(e) => setMotionDuration(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="15s">15 ثانية (Reels / TikTok / Story)</option>
                      <option value="30s">30 ثانية (إعلان تجاري مكثف)</option>
                      <option value="60s">60 ثانية (فيديو شارح متكامل Explainer)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">مقاس الشاشة (Aspect Ratio):</label>
                    <select
                      value={motionRatio}
                      onChange={(e) => setMotionRatio(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="9:16">9:16 - طولي (ريلز وتيك توك)</option>
                      <option value="16:9">16:9 - عرضي (يوتيوب وشاشات)</option>
                      <option value="1:1">1:1 - مربع (بوستات)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-800 block mb-1">التعليق الصوتي (Voiceover):</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMotionVoiceover('voiceover_included')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border ${
                        motionVoiceover === 'voiceover_included'
                          ? 'bg-amber-500 text-slate-950 border-amber-600'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      🎙️ نعم، تعليق صوتي احترافي
                    </button>
                    <button
                      type="button"
                      onClick={() => setMotionVoiceover('music_only')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border ${
                        motionVoiceover === 'music_only'
                          ? 'bg-amber-500 text-slate-950 border-amber-600'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      🎵 بدون تعليق (موسيقى ومؤثرات)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Menu Options */}
            {selectedService === 'menu' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">نوع المكان (Establishment Type):</label>
                    <select
                      value={menuType}
                      onChange={(e) => setMenuType(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="restaurant">مطعم مأكولات وجبات</option>
                      <option value="cafe">كافيه ومشروبات</option>
                      <option value="sweets">حلويات ومخبوزات</option>
                      <option value="cloud_kitchen">مطبخ سحابي / دليفري</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">صيغة المنيو (Format):</label>
                    <select
                      value={menuFormat}
                      onChange={(e) => setMenuFormat(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="both">ورقي للطباعة + ديجيتال QR مخصص</option>
                      <option value="print_pdf">ورقي للطباعة فقط (High-Res PDF)</option>
                      <option value="digital_qr">ديجيتال QR فقط</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">عدد الصفحات / الأوجه:</label>
                    <select
                      value={menuPages}
                      onChange={(e) => setMenuPages(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="1_page">صفحة واحدة A4/A3</option>
                      <option value="2_pages">صفحتين (وجهين)</option>
                      <option value="foldable">مطوية ثلاثية (Tri-fold Brochure)</option>
                      <option value="multi_page">كتالوج متعدد الصفحات</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">لغة المنيو:</label>
                    <select
                      value={menuLanguage}
                      onChange={(e) => setMenuLanguage(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="ar_en">عربي + إنجليزي (مزدوج)</option>
                      <option value="ar">عربي فقط</option>
                      <option value="en">إنجليزي فقط</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Custom QR Options */}
            {selectedService === 'qrcode' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-800 block mb-1">رابط الوجهة المراد ربطها بالـ QR:</label>
                  <input
                    type="url"
                    value={qrTargetLink}
                    onChange={(e) => setQrTargetLink(e.target.value)}
                    placeholder="https://menu.yourbrand.com أو رابط انستجرام..."
                    className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-800 block mb-1">نمط تصميم الكود (Custom Style):</label>
                  <select
                    value={qrStyle}
                    onChange={(e) => setQrStyle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                  >
                    <option value="branded_logo">دمج شعار البراند بالمنتصف + ألوان مخصصة</option>
                    <option value="call_to_action">إطار جذاب مع عبارة تسويقية (امسح المنيو هنا)</option>
                    <option value="minimal_clean">بسيط وأنيق متناسق مع ألوان الهوية</option>
                  </select>
                </div>
              </div>
            )}

            {/* Branding Options */}
            {selectedService === 'branding' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">مكونات الهوية المطلوبة:</label>
                    <select
                      value={brandingScope}
                      onChange={(e) => setBrandingScope(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="logo_and_colors">لوجو + دليل خطوط وألوان البراند</option>
                      <option value="logo_only">شعار / لوجو مخصص فقط</option>
                      <option value="full_identity">هوية كاملة (كروت، براندبوك، أوراق، مطبوعات)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">الطابع الفني للهوية:</label>
                    <select
                      value={brandingStyle}
                      onChange={(e) => setBrandingStyle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="modern">عصري ومودرن (Modern & Sleek)</option>
                      <option value="luxury">فخم وكلاسيك (Luxury & Elegant)</option>
                      <option value="minimal">بسيط ومباشر (Minimalist)</option>
                      <option value="bold">مبتكر وجريء (Bold & Creative)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Social Options */}
            {selectedService === 'social' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">حجم الباقة:</label>
                    <select
                      value={socialPack}
                      onChange={(e) => setSocialPack(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="pack_10">باقة 10 تصاميم احترافية</option>
                      <option value="single_post">تصميم فردي مميز</option>
                      <option value="monthly_manage">إدارة شهرية شاملة للحسابات</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-800 block mb-1">المنصات المستهدفة:</label>
                    <select
                      value={socialPlatforms}
                      onChange={(e) => setSocialPlatforms(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                    >
                      <option value="instagram_facebook">انستجرام وفيسبوك</option>
                      <option value="tiktok_snapchat">تيك توك وسناب شات</option>
                      <option value="linkedin_x">لينكدان وإكس (تويتر)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Posters Options */}
            {selectedService === 'posters' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-800 block mb-1">المقاس / النوع المطلوب:</label>
                  <select
                    value={posterSize}
                    onChange={(e) => setPosterSize(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-amber-300 text-xs font-bold text-slate-900"
                  >
                    <option value="a4_a3">بوستر ورقي A4 / A3 للطباعة</option>
                    <option value="rollup_banner">رول اب Roll-Up / بنر معارض</option>
                    <option value="billboard">لافتة محلات وإعلان خارجي كبير</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 3. Speed / Timeframe selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 block">{t('modalSpeedLabel')}</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTimeframe('urgent')}
                className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                  timeframe === 'urgent'
                    ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {t('modalSpeedUrgent')}
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('standard')}
                className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                  timeframe === 'standard'
                    ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {t('modalSpeedStandard')}
              </button>
              <button
                type="button"
                onClick={() => setTimeframe('flexible')}
                className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold ${
                  timeframe === 'flexible'
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {t('modalSpeedFlexible')}
              </button>
            </div>
          </div>

          {/* Estimated Price & 50% Deposit Calculation Card */}
          {(() => {
            const currentPriceConfig = agencyPricing.services[selectedService];
            if (!currentPriceConfig) return null;

            let basePrice = currentPriceConfig.basePrice;
            if (currentPriceConfig.variants && currentPriceConfig.variants.length > 0) {
              let selectedVariantId = '';
              if (selectedService === 'motion') selectedVariantId = motionDuration;
              else if (selectedService === 'menu') selectedVariantId = menuPages;
              else if (selectedService === 'qrcode') selectedVariantId = qrStyle;
              else if (selectedService === 'branding') selectedVariantId = brandingScope;
              else if (selectedService === 'social') selectedVariantId = socialPack;
              else if (selectedService === 'posters') selectedVariantId = posterSize;

              const matchedVariant = currentPriceConfig.variants.find((v) => v.id === selectedVariantId);
              if (matchedVariant && typeof matchedVariant.price === 'number') {
                basePrice = matchedVariant.price;
              }
            }

            let calculated = basePrice;
            if (timeframe === 'urgent') {
              calculated += currentPriceConfig.expressDeliveryFee;
            }
            const rate = agencyPricing.usdRate || 50;
            const usdTotal = calcUsd(calculated, rate);
            const deposit = Math.round(calculated / 2);
            const usdDeposit = calcUsd(deposit, rate);

            return (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white border-2 border-amber-400 shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      إجمالي التكلفة المقدرة (سعرين):
                    </span>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xl font-black text-white">{calculated.toLocaleString()} {agencyPricing.currencySymbol}</span>
                      <span className="text-sm font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40 dir-ltr">
                        (${usdTotal} USD)
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block">({currentPriceConfig.unitLabel})</span>
                  </div>

                  <div className="bg-amber-500/20 border border-amber-400/50 p-2.5 rounded-xl text-right shrink-0 space-y-0.5">
                    <span className="text-[10px] font-bold text-amber-300 block">العربون المطلوب لبدء العمل (50%):</span>
                    <div className="flex items-baseline justify-end gap-1.5 dir-rtl">
                      <span className="text-lg font-black text-amber-400">{deposit.toLocaleString()} {agencyPricing.currencySymbol}</span>
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-900/60 px-1.5 py-0.5 rounded dir-ltr">
                        (${usdDeposit} USD)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-200/90 font-medium bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>دفع العربون (50%) يضمن بدء تصميم مشروعك فوراً. (سعر الصرف المعتمد: $1 = {rate} ج.م)</span>
                </div>
              </div>
            );
          })()}

          {/* 4. Payment Methods & Deposit Instructions (50% Deposit) */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                💳 اختر طريقة تحويل العربون (50%):
              </label>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                تأكيد فوري
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Etisalat Cash Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('etisalat_cash')}
                className={`p-3 rounded-xl border text-right transition-all font-bold text-xs space-y-1 ${
                  paymentMethod === 'etisalat_cash'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>📱 اتصالات كاش</span>
                  {paymentMethod === 'etisalat_cash' && <span>✓</span>}
                </div>
                <div className="text-[11px] dir-ltr font-mono font-black opacity-90">01142519384</div>
                <div className="text-[9px] text-slate-700 font-semibold">للمحافط المصرية</div>
              </button>

              {/* InstaPay Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('instapay')}
                className={`p-3 rounded-xl border text-right transition-all font-bold text-xs space-y-1 ${
                  paymentMethod === 'instapay'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>⚡ إنستاباي (InstaPay)</span>
                  {paymentMethod === 'instapay' && <span>✓</span>}
                </div>
                <div className="text-[11px] dir-ltr font-mono font-black opacity-90">01142519384</div>
                <div className="text-[9px] text-slate-700 font-semibold">تحويل بنكي لحظي</div>
              </button>

              {/* PayPal Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border text-right transition-all font-bold text-xs space-y-1 ${
                  paymentMethod === 'paypal'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-400'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>💳 بايبال (PayPal)</span>
                  {paymentMethod === 'paypal' && <span>✓</span>}
                </div>
                <div className="text-[10px] dir-ltr font-mono font-bold truncate opacity-90">kbro88907@gmail.com</div>
                <div className="text-[9px] font-bold text-emerald-900 bg-emerald-100 px-1 rounded inline-block">دفع بالدولار USD 💲</div>
              </button>
            </div>

            {/* Selected Account Copy Card */}
            {(() => {
              const currentPriceConfig = agencyPricing.services[selectedService];
              let basePrice = currentPriceConfig ? currentPriceConfig.basePrice : 1000;

              if (currentPriceConfig && currentPriceConfig.variants && currentPriceConfig.variants.length > 0) {
                let selectedVariantId = '';
                if (selectedService === 'motion') selectedVariantId = motionDuration;
                else if (selectedService === 'menu') selectedVariantId = menuPages;
                else if (selectedService === 'qrcode') selectedVariantId = qrStyle;
                else if (selectedService === 'branding') selectedVariantId = brandingScope;
                else if (selectedService === 'social') selectedVariantId = socialPack;
                else if (selectedService === 'posters') selectedVariantId = posterSize;

                const matchedVariant = currentPriceConfig.variants.find((v) => v.id === selectedVariantId);
                if (matchedVariant && typeof matchedVariant.price === 'number') {
                  basePrice = matchedVariant.price;
                }
              }

              let calculated = basePrice;
              if (timeframe === 'urgent' && currentPriceConfig) {
                calculated += currentPriceConfig.expressDeliveryFee;
              }
              const rate = agencyPricing.usdRate || 50;
              const depositEgp = Math.round(calculated / 2);
              const depositUsd = calcUsd(depositEgp, rate);

              return (
                <div className="p-3 bg-white rounded-xl border border-amber-300 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
                  <div className="text-xs space-y-0.5">
                    <span className="text-slate-500 font-medium block text-[10px]">
                      {paymentMethod === 'paypal'
                        ? 'بريد حساب PayPal لتحويل العربون (بالدولار $):'
                        : 'رقم اتصالات كاش / إنستاباي للتحويل:'}
                    </span>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-mono font-black text-slate-900 text-sm dir-ltr select-all">
                        {paymentMethod === 'paypal' ? 'kbro88907@gmail.com' : '01142519384'}
                      </span>
                      {paymentMethod === 'paypal' && (
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          المطلوب للبايبال: ${depositUsd} USD ({depositEgp} ج.م)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const targetText = paymentMethod === 'paypal' ? 'kbro88907@gmail.com' : '01142519384';
                      navigator.clipboard.writeText(targetText);
                      setCopiedKey(paymentMethod);
                      setTimeout(() => setCopiedKey(null), 2000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs shrink-0 transition-all active:scale-95 flex items-center justify-center gap-1"
                  >
                    {copiedKey === paymentMethod ? '✓ تم النسخ!' : 'نسخ الحساب 📋'}
                  </button>
                </div>
              );
            })()}

            {/* Optional Deposit Proof / Reference Note */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-800 block">
                رقم المحفظة التي حولت منها أو اسم المحوّل (للتأكيد السريع):
              </label>
              <input
                type="text"
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                placeholder="مثال: تم التحويل من رقم 011XXXXX أو تم إرسال الإيصال..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-amber-300 text-slate-900 text-xs focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>
          </div>

          {/* 4. User & Brand Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">{t('modalNameLabel')}</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="اسمك الكريِم"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-900">{t('modalPhoneLabel')}</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">{t('modalBrandLabel')}</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="مثال: كافيه الروق، براند Urban، متجر الفخامة..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-900">{t('modalNotesLabel')}</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="اكتب أي معلومات عن الألوان المفضلة، الأنشطة، أو تفاصيل أخرى..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-amber-500 resize-none font-semibold"
            />
          </div>

          {/* Action Button */}
          <button
            id="order-modal-submit-btn"
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Send className="w-5 h-5" />
            <span>{t('modalSubmitBtn')}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
