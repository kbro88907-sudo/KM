import { ServiceItem, PortfolioItem, WhyUsReason } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'motion',
    title: 'مو شن جرافيك 🎬',
    icon: 'Film',
    shortDesc: 'فيديوهات قصيرة وقوية بتشد الانتباه من أول ٣ ثواني — مثالية للإعلانات والريلز والستوريز.',
    fullDesc: 'نصمم ونحرك فيديوهات إعلانية مبتكرة بتعليق صوتي مؤقت أو احترافي، مؤشرات بصرية ديناميكية، وانتقالات ناعمة تعزز نسبة التفاعل والمبيعات لمنتجك أو خدمتك.',
    features: ['تحريك ريلز وستوريز انستجرام وتيك توك', 'فيديوهات إعلانية سناب شات وفيسبوك', 'مؤثرات صوتية وإنتاج احترافي', 'كتابة سيناريو وإيصال الرسالة بذكاء'],
    badge: 'الأعلى طلباً 🔥',
    sampleCount: 'أكثر من ٤٥ فيديو مُنفذ'
  },
  {
    id: 'menu',
    title: 'تصميم منيوهات 🍽️',
    icon: 'UtensilsCrossed',
    shortDesc: 'منيو بشكل عصري وسهل القراءة، بييجي بيه العميل من أول نظرة، ويخليه يحس إنه قدام مكان محترف.',
    fullDesc: 'تصميم منيوهات للمطاعم والكافيهات والمخابز (طباعة + ديجيتال QR). توزيع بصري مدروس للأصناف يوجه عين العميل للأطباق الأكثر ربحية.',
    features: ['منيوهات ورقية ومطوية سهلة القراءة', 'منيو ديجيتال متوافق مع شاشات الموبايل', 'تنسيق ألوان يفتح الشهية ويعزز الهوية', 'ملفات جاهزة للطباعة فوراً بأعلى جودة'],
    badge: 'تخصص مطاعم',
    sampleCount: 'أكثر من ٣٠ مطعم وكافيه'
  },
  {
    id: 'qrcode',
    title: 'كيو آر كود (QR Code) مخصص 📱',
    icon: 'QrCode',
    shortDesc: 'تصميم كود QR بشكل مميز ومربوط بهوية براندك، مش مجرد مربع أسود وأبيض عادي.',
    fullDesc: 'نربط الكيو آر كود بشعارك وألوانك الخاصة مع إضافة نص تحفيزي (Call to Action) يزيد نسبة المسح 3 أضعاف مقارنة بالكود التقليدي.',
    features: ['دمج اللوجو في منتصف الكود', 'ألوان مخصصة تناسب براندك', 'روابط ديناميكية للمنيو أو التواصل أو الصفحات', 'ملفات vector بدقة عالية للطباعة'],
    badge: 'ابتكار بصري',
    sampleCount: 'كود مخصص جاهز فوري'
  },
  {
    id: 'posters',
    title: 'بوسترات وتصاميم إعلانية 🖼️',
    icon: 'Image',
    shortDesc: 'بوسترات لافتة للعين، سواء لعروض، مناسبات، أو حملات تسويقية — تصميم بيوصل الرسالة في ثانية.',
    fullDesc: 'تصميم بوسترات السوشيال ميديا والإعلانات الخارجية والداخلية. رتوش وإضاءة احترافية تظهر جمال منتجك وتدفع العميل لاتخاذ قرار الشراء.',
    features: ['تصاميم عروض وتخفيضات موسمية', 'دمج وتعديل صور المنتجات بحرفية', 'بوسترات إعلانات فيسبوك وانستجرام', 'أحجام متناسبة مع كافة المنصات'],
    badge: 'تصميم بيبيع',
    sampleCount: '+١٥٠ تصميم إعلاني'
  },
  {
    id: 'social',
    title: 'إدارة حسابات السوشيال ميديا 📲',
    icon: 'Share2',
    shortDesc: 'من التخطيط للمحتوى، لجدولة النشر، لمتابعة التفاعل — أدير حسابك زي ما لو كان بتاعي أنا شخصيًا 💼',
    fullDesc: 'باقة إدارة كاملة تشمل كتابة المحتوى التسويقي (Copywriting)، تصميم البوستات والاستوريز، جدولة النشر في الأوقات الذهبية، ومتابعة التعليقات والرسائل.',
    features: ['خطة محتوى شهرية متكاملة', 'تصميم بوستات يومية وستوريز تفاعلية', 'كتابة نصوص تسويقية جذابة (الكابشن)', 'تقارير أداء ومتابعة النمو والتفاعل'],
    badge: 'إدارة كاملة',
    sampleCount: 'باقات شهرية مرنة'
  },
  {
    id: 'branding',
    title: 'هوية بصرية متكاملة (Branding) 🏷️',
    icon: 'Palette',
    shortDesc: 'لوجو، ألوان، خطوط، وكل عناصر البراند بتتظبط مع بعض عشان براندك يبقى له بصمة واحدة في كل مكان.',
    fullDesc: 'بناء الهوية البصرية من الصفر حتى كتاب دليل البراند (Brand Guidelines). تصميم اللوجو، كروت العمل، الأوراق الرسمية، والتغليف بشكل يعكس احترافية مشروعك.',
    features: ['تصميم لوجو فريد وغير مكرر', 'لوحة ألوان واختيار خطوط متناسقة', 'تصميم المطبوعات والتغليف والكروت', 'دليل الاستخدام للهوية البصرية'],
    badge: 'تأسيس براند',
    sampleCount: 'أكثر من ٢٠ براند'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'منيو مطعم وكافيه "السلطان"',
    category: 'menu',
    categoryLabel: 'تصميم منيوهات',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'تصميم منيو فاخر باللون الذهبي والأسود الملكي مع توزيع مدروس للأصناف وكيو آر كود مخصص لعرض المنيو الرقمي على الهواتف.',
    clientName: 'مطعم السلطان - القاهرة',
    metrics: 'زيادة مسح QR بنسبة 180%',
    tags: ['مطاعم', 'منيو ديجيتال', 'كيو آر كود']
  },
  {
    id: 'p2',
    title: 'فيديو موشن جرافيك لتطبيق توصيل',
    category: 'motion',
    categoryLabel: 'موشن جرافيك',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    description: 'فيديو ريلز مدته 15 ثانية يعرض سرعة التوصيل بأسلوب حركة ديناميكي ومؤثرات صوتية حماسية تزيد نسبة التحميل.',
    clientName: 'تطبيق فاست درايف',
    metrics: '+250k مشاهدة على انستجرام',
    tags: ['ريلز', 'إعلانات', 'موشن جرافيك']
  },
  {
    id: 'p3',
    title: 'هوية بصرية متكاملة لعلامة "قهوة وروق"',
    category: 'branding',
    categoryLabel: 'هوية بصرية',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'لوجو مبتكر يعبر عن دمج فنجان القهوة مع رمز الاسترخاء، مع اختيار ألوان دافئة وتصميم أكواب المشروبات والأكياس.',
    clientName: 'كافيه قهوة وروق - الجيزة',
    metrics: 'انطباع أول احترافي للعملاء',
    tags: ['لوجو', 'تغليف', 'هوية متكاملة']
  },
  {
    id: 'p4',
    title: 'حملة بوسترات إعلانية لموسم الجمعة البيضاء',
    category: 'posters',
    categoryLabel: 'بوسترات وتصاميم',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80',
    description: 'سلسلة بوسترات ترويجية بتأثيرات ضوئية حادة تبرز نسبة التخفيض وتدفع المشاهد للشراء المباشر.',
    clientName: 'متجر التكنولوجيا العصرية',
    metrics: 'مبيعات مضاعفة خلال الحملة',
    tags: ['عروض', 'بوستر تسويقي', 'سوشيال ميديا']
  },
  {
    id: 'p5',
    title: 'إدارة وإعداد محتوى لصفحة ملابس رجالي',
    category: 'social',
    categoryLabel: 'إدارة حسابات',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    description: 'تخطيط وتنفيذ محتوى شهر كامل (20 بوست + 40 ستوري + 4 ريلز) مع متابعة يومية للرسائل وزيادة التفاعل.',
    clientName: 'براند Urban Style',
    metrics: '+4,500 متابع حقيقي خلال شهرين',
    tags: ['إدارة حسابات', 'كتابة محتوى', 'نمو']
  },
  {
    id: 'p6',
    title: 'تصميم QR Code مخصص لمركز تجميل',
    category: 'qrcode',
    categoryLabel: 'كيو آر كود',
    image: 'https://images.unsplash.com/photo-1595079672139-cee25815d0bf?auto=format&fit=crop&w=800&q=80',
    description: 'كود QR بتصميم وردي وجولد ناعم مدمج به لوجو المركز لحجز المواعيد وتقييم الخدمة.',
    clientName: 'مركز لوميير للتجميل',
    metrics: 'تجربة عميل سهلة وسريعة',
    tags: ['كيو آر كود', 'هوية بصرية', 'حجز']
  }
];

// Helper functions to get and save portfolio items in localStorage
export const getPortfolioItems = (): PortfolioItem[] => {
  try {
    const custom = localStorage.getItem('sammemly_custom_portfolio');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return PORTFOLIO_ITEMS;
};

export const savePortfolioItems = (items: PortfolioItem[]): void => {
  try {
    localStorage.setItem('sammemly_custom_portfolio', JSON.stringify(items));
    window.dispatchEvent(new Event('portfolioUpdated'));
  } catch {
    // fallback
  }
};

export const WHY_US_REASONS: WhyUsReason[] = [
  {
    id: 'r1',
    icon: 'Zap',
    title: 'رد سريع وتواصل مباشر',
    description: 'بترد وبتعرف حالة شغلك أول بأول، مع متابعة خطوة بخطوة وتلقي ملاحظاتك بصدر رحب.',
    highlightText: 'متابعة لحظية ⚡'
  },
  {
    id: 'r2',
    icon: 'Target',
    title: 'تصميم يفهم السوق والعميل',
    description: 'مش بس شكل حلو، ده تصميم بيبيع وبيوصل الفكرة للعميل المستهدف في ثواني معدودة.',
    highlightText: 'تصميم هادف 🎯'
  },
  {
    id: 'r3',
    icon: 'Handshake',
    title: 'تعامل شخصي واستشارة قبل البدء',
    description: 'إحنا هنقعد نفهم مشروعك صح وتفاصيل جمهورك وأهدافك التسويقية قبل ما نلمس الكيبورد.',
    highlightText: 'شراكة نجاح 🤝'
  },
  {
    id: 'r4',
    icon: 'Clock',
    title: 'التزام صارم بالمواعيد',
    description: 'وقتك مهم، وأنا بحترم الديدلاين جدًا. تسليم في الموعد المحدد بدون تأخير أو حجج.',
    highlightText: 'تسليم في الموعد ⏱️'
  },
  {
    id: 'r5',
    icon: 'PiggyBank',
    title: 'أسعار مناسبة وبدون مبالغة',
    description: 'جودة احترافية تنافس الوكالات الكبيرة، بأسعار تناسب حجم مشروعك وبدون مصاريف مخفية.',
    highlightText: 'قيمة مقابل سعر 💰'
  }
];
