export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  badge?: string;
  sampleCount?: string;
  startingPrice?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'motion' | 'menu' | 'qrcode' | 'posters' | 'social' | 'branding';
  categoryLabel: string;
  image: string;
  description: string;
  clientName?: string;
  metrics?: string;
  tags: string[];
}

export interface WhyUsReason {
  id: string;
  icon: string;
  title: string;
  description: string;
  highlightText?: string;
}

export interface OrderFormState {
  serviceId: string;
  brandName: string;
  clientName: string;
  phone: string;
  contactMethod: 'whatsapp' | 'call' | 'facebook';
  budget?: string;
  details: string;
  deadline?: string;
}
