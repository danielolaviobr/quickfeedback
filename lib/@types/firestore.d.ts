export interface Site {
  name: string;
  url: string;
}

export interface SiteData {
  id?: string;
  name: string;
  url: string;
  authorId: string;
  createdAt: string;
}

export interface Feedback {
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating: number;
  siteId: string;
  status: string;
  text: string;
}
