export interface SiteInputData {
  name?: string;
  url?: string;
}

export interface Site {
  id?: string;
  name: string;
  url: string;
  authorId: string;
  createdAt: string;
  settings?: Settings;
}

export interface Feedback {
  id?: string;
  site?: Site;
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating?: number;
  siteId: string;
  route: string;
  status: string;
  text: string;
}

export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  priceId?: string;
}

export interface Price {
  id: string;
  active?: boolean;
  currency?: string;
  amount?: number;
}

export interface Settings {
  icons: boolean;
  timestamp: boolean;
  ratings: boolean;
}
