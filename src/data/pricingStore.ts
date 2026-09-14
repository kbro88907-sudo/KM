export interface PriceVariant {
  id: string;
  label: string;
  price: number; // in EGP
}

export interface ServicePriceConfig {
  id: string;
  serviceTitle: string;
  basePrice: number; // In EGP
  unitLabel: string; // e.g. "لكل فيديو 15 ثانية", "لكل هوية متكاملة"
  expressDeliveryFee: number; // Urgent fee
  discountPercent: number; // Discount e.g. 10%
  isActive: boolean;
  variants?: PriceVariant[];
}

export interface AgencyPricingData {
  currency: 'EGP' | 'USD' | 'SAR';
  currencySymbol: string;
  usdRate: number; // 1 USD = X EGP (default: 50 EGP)
  services: Record<string, ServicePriceConfig>;
}

export const DEFAULT_PRICING: AgencyPricingData = {
  currency: 'EGP',
  currencySymbol: 'ج.م',
  usdRate: 50,
  services: {
    motion: {
      id: 'motion',
      serviceTitle: 'موشن جرافيك 🎬',
      basePrice: 1500,
      unitLabel: 'حسب مدة الفيديو المختارة',
      expressDeliveryFee: 500,
      discountPercent: 15,
      isActive: true,
      variants: [
        { id: '15s', label: '15 ثانية (ريلز / ستوري / تيك توك)', price: 1500 },
        { id: '30s', label: '30 ثانية (إعلان تجاري مكثف)', price: 2500 },
        { id: '60s', label: '60 ثانية (فيديو شارح كامل Explainer)', price: 4200 },
      ],
    },
    menu: {
      id: 'menu',
      serviceTitle: 'تصميم منيوهات 🍽️',
      basePrice: 900,
      unitLabel: 'حسب نوع وعدد صفحات المنيو',
      expressDeliveryFee: 300,
      discountPercent: 10,
      isActive: true,
      variants: [
        { id: '1_page', label: 'صفحة واحدة (A4 / A3)', price: 500 },
        { id: '2_pages', label: 'صفحتين (وجهين)', price: 900 },
        { id: 'foldable', label: 'مطوية ثلاثية (Tri-fold Brochure)', price: 1400 },
        { id: 'multi_page', label: 'كتالوج متعدد الصفحات', price: 2500 },
      ],
    },
    qrcode: {
      id: 'qrcode',
      serviceTitle: 'كيو آر كود مخصص 📱',
      basePrice: 350,
      unitLabel: 'حسب نمط تصميم الكود',
      expressDeliveryFee: 150,
      discountPercent: 0,
      isActive: true,
      variants: [
        { id: 'minimal_clean', label: 'بسيط وأنيق متناسق مع ألوان الهوية', price: 250 },
        { id: 'branded_logo', label: 'دمج شعار البراند بالمنتصف + ألوان مخصصة', price: 350 },
        { id: 'call_to_action', label: 'إطار جذاب مع عبارة تسويقية (امسح المنيو هنا)', price: 500 },
      ],
    },
    posters: {
      id: 'posters',
      serviceTitle: 'بوسترات وتصاميم إعلانية 🖼️',
      basePrice: 450,
      unitLabel: 'حسب حجم ونوع البوستر',
      expressDeliveryFee: 200,
      discountPercent: 10,
      isActive: true,
      variants: [
        { id: 'a4_a3', label: 'بوستر ورقي A4 / A3 للطباعة والديجيتال', price: 450 },
        { id: 'rollup_banner', label: 'رول اب Roll-Up / بنر معارض', price: 800 },
        { id: 'billboard', label: 'لافتة محلات وإعلان خارجي كبير', price: 1600 },
      ],
    },
    social: {
      id: 'social',
      serviceTitle: 'إدارة حسابات السوشيال 📲',
      basePrice: 2500,
      unitLabel: 'حسب نوع الباقة والمحتوى',
      expressDeliveryFee: 1000,
      discountPercent: 20,
      isActive: true,
      variants: [
        { id: 'single_post', label: 'تصميم فردي مميز', price: 350 },
        { id: 'pack_10', label: 'باقة 10 تصاميم احترافية', price: 2500 },
        { id: 'monthly_manage', label: 'إدارة شهرية شاملة للحسابات (12 بوست + ستوريز)', price: 4800 },
      ],
    },
    branding: {
      id: 'branding',
      serviceTitle: 'هوية بصرية متكاملة 🏷️',
      basePrice: 2500,
      unitLabel: 'حسب مكونات الهوية البصرية',
      expressDeliveryFee: 1200,
      discountPercent: 15,
      isActive: true,
      variants: [
        { id: 'logo_only', label: 'شعار / لوجو مخصص فقط', price: 1500 },
        { id: 'logo_and_colors', label: 'لوجو + دليل خطوط وألوان البراند', price: 2500 },
        { id: 'full_identity', label: 'هوية كاملة (كروت، براندبوك، أوراق، مطبوعات)', price: 4200 },
      ],
    },
  },
};

export const calcUsd = (egpAmount: number, usdRate: number = 50): number => {
  if (!usdRate || usdRate <= 0) return Math.round(egpAmount / 50);
  return Math.round((egpAmount / usdRate) * 10) / 10;
};

const PRICING_STORAGE_KEY = 'zenith_agency_pricing_v1';

export const getAgencyPricing = (): AgencyPricingData => {
  try {
    const saved = localStorage.getItem(PRICING_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const mergedServices: Record<string, ServicePriceConfig> = {};

      Object.keys(DEFAULT_PRICING.services).forEach((key) => {
        const defaultSrv = DEFAULT_PRICING.services[key];
        const savedSrv = parsed.services ? parsed.services[key] : null;

        if (savedSrv) {
          mergedServices[key] = {
            ...defaultSrv,
            ...savedSrv,
            variants: savedSrv.variants && savedSrv.variants.length > 0
              ? savedSrv.variants
              : defaultSrv.variants,
          };
        } else {
          mergedServices[key] = defaultSrv;
        }
      });

      return {
        ...DEFAULT_PRICING,
        ...parsed,
        usdRate: parsed.usdRate || 50,
        services: mergedServices,
      };
    }
  } catch {
    // Fallback to defaults
  }
  return DEFAULT_PRICING;
};

export const saveAgencyPricing = (data: AgencyPricingData): void => {
  try {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save agency pricing:', e);
  }
};
