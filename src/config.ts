import agencyLogo from './assets/images/zenith_agency_logo_1786201340877.jpg';

export const AGENCY_CONFIG = {
  agencyName: 'وكالة صمملي | Sammemly',
  logo: agencyLogo,
  whatsappRaw: '201142519384', // رقم الواتساب الرسمي المباشر
  whatsappFormatted: '+20 114 251 9384',
  email: 'kbro88907@gmail.com',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://www.instagram.com/zenith999k1?igsh=MW5sdjY4ZTFvcnpzaQ==',
  tiktokUrl: 'https://www.tiktok.com/@zenith999k1?_r=1&_t=ZS-98iH4RtFah3',
  formspreeEndpoint: 'https://formspree.io/f/mqapzlnr', // رابط أو معرف خدمة Formspree للقائمة البريدية
};

// Helper function to get the configured agency WhatsApp number
export const getAgencyWhatsAppNumber = (): string => {
  return AGENCY_CONFIG.whatsappRaw;
};

// Helper function to get Formspree endpoint (with localStorage custom override support)
export const getFormspreeEndpoint = (): string => {
  try {
    const custom = localStorage.getItem('zenith_formspree_endpoint');
    if (custom && custom.trim().length > 0) return custom.trim();
  } catch {
    // fallback
  }
  return AGENCY_CONFIG.formspreeEndpoint;
};

