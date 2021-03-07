export interface SiteInputData {
  name: string;
  url: string;
}

export interface Site {
  id?: string;
  name: string;
  url: string;
  authorId: string;
  createdAt: string;
}

export interface Feedback {
  id?: string;
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating?: number;
  siteId: string;
  status: string;
  text: string;
}
