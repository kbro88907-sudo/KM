import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

export interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languagesList: { id: Language; name: string; flag: string; label: string }[] = [
  { id: 'ar', name: 'العربية', flag: '🇪🇬', label: 'عربي' },
  { id: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
];

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand
    brandName: 'صمملي | Sammemly',
    brandBadge: 'وكالة صمملي',
    brandSubtitle: 'وكالة التصميم والهوية البصرية',
    
    // Nav & General
    navHome: 'الرئيسية',
    navAbout: '👋 عن صمملي',
    navServices: '🛠️ الخدمات',
    navQrStudio: '📱 استوديو QR',
    navPortfolio: '🎨 معرض الأعمال',
    navTracker: '🔍 متابعة الطلب والخطوات',
    navWhyUs: '💡 ليه تختارنا؟',
    navContact: '📞 تواصل معنا',

    // Order Tracker & Workflow
    trackerBadge: '🔍 مسار العمل ومتابعة حالة الطلب',
    trackerTitle: 'كيف يمر مشروعك معنا؟ ',
    trackerTitleHighlight: 'واستعلم عن طلبك 🚀',
    trackerDesc: 'شفافية كاملة خطوة بخطوة من استلام الفكرة حتى التسليم النهائي، ويمكنك متابعة حالة تنفيذ طلبك مباشرة!',
    
    workflowStep1Title: '١. استلام البريف وتأكيد الفكرة',
    workflowStep1Desc: 'نستلم معلومات مشروعك، الشعار، والنصوص المطلوبة لنبدأ على أساس قوي.',
    workflowStep2Title: '٢. تحديد الخطة وتأكيد الموعد والعربون',
    workflowStep2Desc: 'نحدد الجدول الزمني بدقة متناهية والتكلفة مع دفع 50% عربون لبدء التنفيذ فوراً.',
    workflowStep3Title: '٣. التنفيذ والمسودة الأولى',
    workflowStep3Desc: 'نبدأ رحلة الإبداع وتجهيز العينات والمسودات الأولى بأعلى دقة بصرية.',
    workflowStep4Title: '٤. التعديلات والتسليم النهائي',
    workflowStep4Desc: 'نُجري أي تعديلات تطلبها حتى الرضا التام 100% وتسليم الملفات جاهزة للطباعة والشر.',

    trackInputPlaceholder: 'أدخل كود طلبك (مثال: ZEN-8492) أو ابحث عن طلباتك...',
    trackSearchBtn: 'استعلام عن حالة الطلب 🔎',
    trackRecentOrdersTitle: 'طلباتك المسجلة مؤخراً:',
    trackStatusInReview: 'قيد المراجعة وتأكيد التحويل 🟡',
    trackStatusInProgress: 'جاري التنفيذ والتصميم بكل شغف 🟢',
    trackStatusReady: 'التصميم جاهز وفي مرحلة المراجعة النهائية 🎨',
    trackStatusCompleted: 'تم التسليم بنجاح 100% 🎉',
    trackAskWhatsAppBtn: 'استفسر عن هذا الطلب عبر واتساب 💬',
    trackCodeSavedNotice: 'احتفظ بكود طلبك لمتابعة التحديثات:',
    btnOrder: 'اطلب خدمتك',
    btnWhatsApp: 'واتساب',
    btnBackToHome: '← الرجوع للرئيسية',
    btnBackToTop: 'الرجوع للأعلى ⬆️',
    btnBack: 'رجوع ↩️',
    
    // Hero
    heroBadge: '✨ وكالة التصميم والهوية البصرية المتكاملة',
    heroTitleMain: 'صمملي | Sammemly',
    heroTitleSub: 'تصميم بيبهر العين ويجيب نتايج حقيقية 🚀',
    heroDesc: 'من الفكرة البسيطة لحد التصميم اللي يلفت الأنظار 👀 — في صمملي (Sammemly)، بنحول احتياجك التسويقي لشغل احترافي بيتكلم عن براندك بصوت واضح ومؤثر.',
    heroCtaOrder: 'اطلب خدمتك دلوقتي 🎯',
    heroCtaPortfolio: 'تصفح نماذج الأعمال 🎨',
    heroStatExpTitle: 'خبرة احترافية',
    heroStatExpSub: 'في التصميم والتسويق',
    heroStatProjectsTitle: '+٢٥٠ مشروع',
    heroStatProjectsSub: 'تم تسليمه بنجاح',
    heroStatSatisfactionTitle: '١٠٠٪ رضا',
    heroStatSatisfactionSub: 'عملاء في مصر والخليج',

    // About
    aboutBadge: '👋 مين صمملي؟',
    aboutHeadingMain: 'وكالة صمملي (Sammemly) — ',
    aboutHeadingHighlight: 'شريك النجاح البصري لمشروعك',
    aboutSub: 'وكالة تصميم جرافيك ومحترفو إدارة حسابات التواصل الاجتماعي',
    aboutCardRole: 'شريك النجاح البصري لمشروعك 🚀',
    aboutVal1Title: 'تصميم بفهم تسويقي:',
    aboutVal1Desc: 'تركيز على تحويل المشاهد لعميل فعلي.',
    aboutVal2Title: 'دعّم المشاريع الناشئة:',
    aboutVal2Desc: 'حلول تناسب ميزانيتك وتضمن أعلى عائد.',
    aboutText1: 'شغلنا مش بس "تصميم"... شغلنا إننا نفهم إيه اللي بيخلي العميل يوقف عند بوست، يفتح منيو، يمسح كيو كود، أو يتابع صفحة — وده اللي بيميز شغل صمملي 🎯',
    aboutText2: 'بنشتغل مع أصحاب المشاريع الصغيرة والمتوسطة، وبنساعدهم يوصلوا لهوية بصرية قوية وحضور رقمي محترف من غير ما يدفعوا فلوس في حاجات مش فارقة.',
    aboutCheck1Title: 'تركيز على سلوك العميل',
    aboutCheck1Desc: 'تصاميم مدروسة تجذب الانتباه مباشرة وتدفع للتفاعل.',
    aboutCheck2Title: 'دون مصاريف زائدة',
    aboutCheck2Desc: 'نركز فقط على الخدمات التي تضيف قيمة حقيقية لعلامتك.',
    aboutCheck3Title: 'هوية متميزة وموحدة',
    aboutCheck3Desc: 'استمرارية بصرية تجعل براندك يثبت في أذهان الناس.',
    aboutCheck4Title: 'مرونة كاملة في التعديل',
    aboutCheck4Desc: 'نشتغل سوا لحد ما توصل للنتيجة اللي بتتمناها وتزيد.',

    // Services
    servicesBadge: '🛠️ الخدمات اللي بنقدمهالك',
    servicesTitle: 'حلول تصميم تسويقية ',
    servicesTitleHighlight: 'متكاملة لبراندك',
    servicesDesc: 'اختر الخدمة المناسبة لاحتياجك ودعنا نحول فكرتك إلى تصميم مؤثر يحقق نتائج ملموسة',
    servicesOrderBtn: 'اطلب الآن',

    // QR Studio
    qrBadge: '📱 استوديو تجربة QR Code المخصص',
    qrTitle: 'جرب بنفسك تصاميم ',
    qrTitleHighlight: 'الكيو آر كود المبتكرة',
    qrDesc: 'ادخل رابط المنيو أو صفحتك وشوف كيف يتحول الـ QR المعتاد لكود مميز يجذب زباينك لمسحه فورا!',
    qrInputLabel: 'الرابط أو النص المراد ربطه بالـ QR:',
    qrPresetLabel: 'اختر ثيم ألوان جاهز:',
    qrFgLabel: 'لون النقاط (Foreground):',
    qrBgLabel: 'لون الخلفية (Background):',
    qrLogoToggle: 'دمج شعار صمملي في منتصف الكود',
    qrOrderCustomBtn: 'اطلب من صمملي تصميمه بهوية براندك الفريدة 🚀',
    qrPreviewTitle: 'معاينة مباشرة للتفاعل ⚡',
    qrPreviewSub: 'جرب امسح الكود بكاميرا الموبايل دلوقتي!',
    qrDownloadBtn: 'تحميل العينة بصيغة SVG',

    // Portfolio
    portfolioBadge: '🎨 معرض الأعمال والمشاريع',
    portfolioTitle: 'نماذج من شغلنا ',
    portfolioTitleHighlight: 'مع العملاء',
    portfolioDesc: 'تصاميم مش بس جرافيك حلو... تصاميم جابت نتايج حقيقية وملموسة لأصحاب المشاريع',
    portfolioCatAll: 'الكل ⭐',
    portfolioCatMotion: 'موشن جرافيك 🎬',
    portfolioCatMenu: 'منيوهات 🍽️',
    portfolioCatQr: 'كيو آر كود 📱',
    portfolioCatPosters: 'بوسترات 🖼️',
    portfolioCatSocial: 'سوشيال ميديا 📲',
    portfolioCatBranding: 'هوية بصرية 🏷️',
    portfolioModalClient: 'العميل:',
    portfolioModalResult: 'النتيجة:',
    portfolioModalOrderBtn: 'اطلب تصميم مماثل لبراندك دلوقتي 🚀',

    // Why Sammemly
    whyBadge: '💡 ليه تختار صمملي؟',
    whyTitle: 'مميزات تعاملك مع ',
    whyTitleHighlight: 'وكالة صمملي (Sammemly)',
    whyDesc: 'تجربة عمل مريحة، تواصل مباشر، والتزام تام بأعلى معايير الجودة والسرعة',
    whyGuaranteeTitle: 'ضمان الرضا ١٠٠٪',
    whyGuaranteeSub: 'تعديلات حتى الإرضاء التام',
    whyGuaranteeDesc: 'مش بنقفل مشروعك إلا لما تكون راضي تمامًا عن النتيجة النهائية، وتكون واثق إن التصميم هيعمل الفرق المطلوب لمشروعك.',
    whyGuaranteeTrust: 'ثقة متبادلة مع مئات العملاء',

    // Contact
    contactBadge: '📞 تواصل معنا',
    contactTitle: 'جاهز تبدأ مشروعك؟ ',
    contactTitleHighlight: 'نتكلم دلوقتي 🚀',
    contactDesc: 'ابعتلنا التفاصيل وهنتفق على كل حاجة خطوة بخطوة عشان نوصل لأفضل نتيجة لعلامتك التجارية',
    contactWaTitle: 'واتساب مباشر 💬',
    contactWaSub: 'الرد السريع خلال دقائق',
    contactWaDesc: 'تواصل معنا فوراً عبر واتساب للمناقشة الفورية واستلام العروض والملفات.',
    contactWaBtn: 'فتح المحادثة المباشرة علي واتساب',
    contactFbTitle: '📩 فيسبوك',
    contactFbSub: 'متابعة أحدث أعمال المعرض ورسائل الصفحة الرسمية',
    contactFbBtn: 'زيارة صفحة صمملي',
    contactEmailTitle: '📧 البريد الإلكتروني',
    contactEmailSub: 'لإرسال ملفات المشاريع الكبيرة والبريف الكامل والمناقصات.',
    contactEmailBtn: 'إرسال بريد إلكتروني فوراً',
    contactFormHeader: 'ارسل تفاصيل مشروعك وسنرد عليك فوراً ✨',
    contactFormSub: 'سيتم تجهيز الرسالة مباشرة وإرسالها عبر الواتساب لتوفير وقتك والحصول على الرد السريع.',
    contactFormNameLabel: 'اسمك / اسم مشروعك *',
    contactFormPhoneLabel: 'رقم الهاتف أو الواتساب *',
    contactFormServiceLabel: 'الخدمة المراد الاستفسار عنها',
    contactFormMessageLabel: 'تفاصيل فكرتك أو مشروعك (اختياري)',
    contactFormSubmitBtn: 'إرسال وتواصل مباشر على واتساب 🚀',

    // Order Modal
    modalHeaderBadge: 'طلب خدمة تصميم بلمسة احترافية',
    modalHeaderTitle: 'اطلب خدمتك مع ',
    modalHeaderTitleHighlight: 'صمملي ✨',
    modalHeaderSub: 'حدد التفاصيل وسنقوم بالتواصل معك فوراً لتحديد الخطة والبدء في التنفيذ',
    modalServiceLabel: 'اختر الخدمة المطلوبة *',
    modalSpeedLabel: 'سرعة التسليم المطلوبة',
    modalSpeedUrgent: '⚡ عاجل (٢٤-٤٨ ساعة)',
    modalSpeedStandard: '⏱️ عادي (٣-٥ أيام)',
    modalSpeedFlexible: '📅 غير مستعجل',
    modalNameLabel: 'الاسم *',
    modalPhoneLabel: 'رقم الواتساب للتواصل *',
    modalBrandLabel: 'اسم البراند / المشروع (اختياري)',
    modalNotesLabel: 'ملاحظات أو تفاصيل إضافية عن الفكرة',
    modalSubmitBtn: 'تأكيد الطلب والتحدث مباشرة مع صمملي 🚀',
  },

  en: {
    // Brand
    brandName: 'Sammemly | صمملي',
    brandBadge: 'Sammemly Agency',
    brandSubtitle: 'Graphic Design & Branding Agency',
    
    // Nav & General
    navHome: 'Home',
    navAbout: '👋 About Sammemly',
    navServices: '🛠️ Services',
    navQrStudio: '📱 QR Studio',
    navPortfolio: '🎨 Portfolio',
    navTracker: '🔍 Order Tracker & Steps',
    navWhyUs: '💡 Why Us?',
    navContact: '📞 Contact Us',

    // Order Tracker & Workflow
    trackerBadge: '🔍 Project Workflow & Live Order Tracker',
    trackerTitle: 'How Your Project Moves Forward ',
    trackerTitleHighlight: 'Track Your Order 🚀',
    trackerDesc: 'Complete step-by-step transparency from brief confirmation to final delivery. Check your live order status instantly!',
    
    workflowStep1Title: '1. Brief Reception & Confirmation',
    workflowStep1Desc: 'We gather your requirements, logo assets, and textual copy to build on solid ground.',
    workflowStep2Title: '2. Custom Strategy & 50% Deposit',
    workflowStep2Desc: 'We set precise deadlines and require a 50% deposit to kickstart production immediately.',
    workflowStep3Title: '3. Design Creation & First Drafts',
    workflowStep3Desc: 'We craft your visual assets and share initial high-resolution previews for feedback.',
    workflowStep4Title: '4. Revisions & Final High-Res Delivery',
    workflowStep4Desc: 'We fine-tune details until 100% satisfaction and deliver print- & web-ready master files.',

    trackInputPlaceholder: 'Enter your Order Code (e.g., ZEN-8492) to track...',
    trackSearchBtn: 'Check Order Status 🔎',
    trackRecentOrdersTitle: 'Your Recent Orders:',
    trackStatusInReview: 'Under Review & Deposit Verification 🟡',
    trackStatusInProgress: 'In Creative Production & Design 🟢',
    trackStatusReady: 'Design Ready for Final Review 🎨',
    trackStatusCompleted: 'Successfully Delivered 100% 🎉',
    trackAskWhatsAppBtn: 'Inquire About Order Status on WhatsApp 💬',
    trackCodeSavedNotice: 'Save your order code to follow live updates:',
    btnOrder: 'Order Service',
    btnWhatsApp: 'WhatsApp',
    btnBackToHome: '← Back to Home',
    btnBackToTop: 'Back to Top ⬆️',
    btnBack: 'Back ↩️',
    
    // Hero
    heroBadge: '✨ Premium Graphic Design & Branding Agency',
    heroTitleMain: 'Sammemly Design',
    heroTitleSub: 'Designs That Captivate & Deliver Real Results 🚀',
    heroDesc: 'From simple concepts to eye-catching visual masterpieces — at Sammemly, we turn your marketing needs into impactful, professional designs.',
    heroCtaOrder: 'Order Your Design 🎯',
    heroCtaPortfolio: 'Explore Portfolio 🎨',
    heroStatExpTitle: 'Expert Skill',
    heroStatExpSub: 'Design & Marketing',
    heroStatProjectsTitle: '+250 Projects',
    heroStatProjectsSub: 'Delivered Successfully',
    heroStatSatisfactionTitle: '100% Satisfaction',
    heroStatSatisfactionSub: 'Global & Regional Clients',

    // About
    aboutBadge: '👋 Who is Sammemly?',
    aboutHeadingMain: 'Sammemly Agency — ',
    aboutHeadingHighlight: 'Your Visual Success Partner',
    aboutSub: 'Graphic Design & Social Media Management Specialists',
    aboutCardRole: 'Your Brand Visual Success Partner 🚀',
    aboutVal1Title: 'Marketing-Driven Design:',
    aboutVal1Desc: 'Focused on converting viewers into loyal paying clients.',
    aboutVal2Title: 'Startup Friendly:',
    aboutVal2Desc: 'Budget-smart solutions ensuring highest return on investment.',
    aboutText1: 'Our work is not just "pretty artwork"... we study consumer psychology to make customers stop scrolling, open menus, scan QRs, and engage with your brand 🎯',
    aboutText2: 'We empower small and medium enterprises to establish a strong visual identity and premium digital presence without unnecessary expenses.',
    aboutCheck1Title: 'Customer Behavior Focus',
    aboutCheck1Desc: 'Strategically designed layouts that drive action instantly.',
    aboutCheck2Title: 'No Hidden Costs',
    aboutCheck2Desc: 'We focus strictly on high-impact services that add real value.',
    aboutCheck3Title: 'Unified Brand Identity',
    aboutCheck3Desc: 'Consistent visual branding that leaves a lasting impression.',
    aboutCheck4Title: 'Full Revision Flexibility',
    aboutCheck4Desc: 'We refine until you are 100% satisfied with the outcome.',

    // Services
    servicesBadge: '🛠️ Our Professional Services',
    servicesTitle: 'Comprehensive Marketing ',
    servicesTitleHighlight: 'Design Solutions',
    servicesDesc: 'Choose the ideal service and let us transform your ideas into high-converting visual designs',
    servicesOrderBtn: 'Order Now',

    // QR Studio
    qrBadge: '📱 Interactive Custom QR Code Studio',
    qrTitle: 'Experience Custom ',
    qrTitleHighlight: 'Branded QR Code Designs',
    qrDesc: 'Enter your menu or website link and see how standard QR codes transform into branded lead-magnets!',
    qrInputLabel: 'Target Link or Text:',
    qrPresetLabel: 'Choose Preset Theme:',
    qrFgLabel: 'Dots Color (Foreground):',
    qrBgLabel: 'Background Color:',
    qrLogoToggle: 'Embed Sammemly Logo in QR Center',
    qrOrderCustomBtn: 'Request Custom Branded QR from Sammemly 🚀',
    qrPreviewTitle: 'Live Interactive Preview ⚡',
    qrPreviewSub: 'Scan this code right now with your phone camera!',
    qrDownloadBtn: 'Download Sample SVG',

    // Portfolio
    portfolioBadge: '🎨 Portfolio & Featured Work',
    portfolioTitle: 'Real Work for ',
    portfolioTitleHighlight: 'Real Clients',
    portfolioDesc: 'Not just attractive graphics... real visual assets that generated proven business results',
    portfolioCatAll: 'All ⭐',
    portfolioCatMotion: 'Motion Graphics 🎬',
    portfolioCatMenu: 'Menus 🍽️',
    portfolioCatQr: 'QR Codes 📱',
    portfolioCatPosters: 'Posters 🖼️',
    portfolioCatSocial: 'Social Media 📲',
    portfolioCatBranding: 'Branding 🏷️',
    portfolioModalClient: 'Client:',
    portfolioModalResult: 'Result:',
    portfolioModalOrderBtn: 'Order Similar Design for Your Brand Now 🚀',

    // Why Sammemly
    whyBadge: '💡 Why Choose Sammemly?',
    whyTitle: 'Key Advantages of ',
    whyTitleHighlight: 'Working with Sammemly Agency',
    whyDesc: 'Seamless collaboration, direct communication, and uncompromised commitment to quality and speed',
    whyGuaranteeTitle: '100% Satisfaction Guarantee',
    whyGuaranteeSub: 'Unlimited revisions until perfection',
    whyGuaranteeDesc: 'We do not wrap up your project until you are completely thrilled with the result and confident in your brand identity.',
    whyGuaranteeTrust: 'Trusted by hundreds of happy brands',

    // Contact
    contactBadge: '📞 Contact Us',
    contactTitle: 'Ready to Elevate Your Brand? ',
    contactTitleHighlight: 'Let’s Talk Today 🚀',
    contactDesc: 'Send us your project brief and let’s craft a step-by-step strategy to achieve top-tier visual results',
    contactWaTitle: 'Direct WhatsApp 💬',
    contactWaSub: 'Instant reply within minutes',
    contactWaDesc: 'Chat directly on WhatsApp to receive quick quotes and instant project feedback.',
    contactWaBtn: 'Open Direct WhatsApp Chat',
    contactFbTitle: '📩 Facebook',
    contactFbSub: 'Follow our official page and portfolio updates',
    contactFbBtn: 'Visit Sammemly Facebook Page',
    contactEmailTitle: '📧 Email',
    contactEmailSub: 'For large project briefs, RFPs, and formal proposals.',
    contactEmailBtn: 'Send Direct Email',
    contactFormHeader: 'Send Your Project Details & Receive an Instant Quote ✨',
    contactFormSub: 'Your message will be pre-filled and sent directly via WhatsApp for immediate response.',
    contactFormNameLabel: 'Your Name / Business Name *',
    contactFormPhoneLabel: 'Phone / WhatsApp Number *',
    contactFormServiceLabel: 'Service You are Inquiring About',
    contactFormMessageLabel: 'Project Details / Notes (Optional)',
    contactFormSubmitBtn: 'Send & Connect Directly via WhatsApp 🚀',

    // Order Modal
    modalHeaderBadge: 'Professional Design Service Order',
    modalHeaderTitle: 'Order Service with ',
    modalHeaderTitleHighlight: 'Sammemly ✨',
    modalHeaderSub: 'Specify details and we will get back to you immediately with a customized execution plan',
    modalServiceLabel: 'Select Required Service *',
    modalSpeedLabel: 'Required Delivery Turnaround',
    modalSpeedUrgent: '⚡ Urgent (24-48 Hours)',
    modalSpeedStandard: '⏱️ Standard (3-5 Days)',
    modalSpeedFlexible: '📅 Flexible Timeline',
    modalNameLabel: 'Your Name *',
    modalPhoneLabel: 'WhatsApp Number *',
    modalBrandLabel: 'Brand / Company Name (Optional)',
    modalNotesLabel: 'Additional Notes or Ideas',
    modalSubmitBtn: 'Confirm Order & Pay 50% Deposit 🚀',
  },

};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ar');

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
