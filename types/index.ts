export interface Rabbi {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  topics: RabbiTopic[];
  photo?: string;
  address?: string;
  description?: string;
  city?: string;
  languages: string[];
  imageUrl?: string;
}

export const RABBI_TOPICS = [
  'נדה',
  'שבת',
  'איסור והיתר',
  'טבילת כלים',
  'ברכות',
  'תפילה',
  'מועדים',
  'חושן משפט',
  // Nouvelles catégories pour les rabbins
  'אבן העזר',
  'ממונות',
  'ריבית',
  'לשון הרע ורכילות',
  // Catégories existantes dans la base
  'בשר בחלב',
  'חגים'
] as const;

export const QUESTION_TOPICS = [
  'נדה',
  'שבת',
  'איסור והיתר',
  'טבילת כלים',
  'ברכות',
  'תפילה',
  'מועדים',
  'חושן משפט',
  'אבלות',
  'כיבוד אב ואם',
  'כשרויות',
  'יחוד',
  'יין נסך',
  'לשון הרע',
  'יורה דעה',
  'מצוות התלויות בארץ',
  'מזוזה',
  'נדרים ושבועות',
  'הלכות סת"ם',
  'ברית מילה פדיון הבן',
  'צדקה ומעשר כספים',
  'קדושת בית הכנסת',
  'תולעים',
  'תפילין',
] as const;

export type RabbiTopic = typeof RABBI_TOPICS[number];
export type QuestionTopic = typeof QUESTION_TOPICS[number];

import { Rabbi as PrismaRabbi } from './prisma';

export interface QA {
  id: number;
  topic: QuestionTopic;
  question: string;
  answer: string | null;
  authorId: string | null;
  author?: PrismaRabbi;
  createdAt: string;
  askerName?: string | null;
  askerEmail?: string | null;
  status?: string | null;
  categoryId?: string | null;
}

export interface Brochure {
  id: string;
  name: string;
  coverImage: string;
  pdfUrl: string;
  type: 'weekly1' | 'weekly2';
  uploadedAt: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  imageUrl: string;
  pdfUrl?: string;
  price?: string;
  isNew?: boolean;
  nedarimPlusLink?: string;
}

export interface Distributor {
  id: string;
  name: string;
  city: string;
  phone: string | null;
}

export interface Shiur {
  id: string;
  title: string;
  rabbi: string;
  date: string;
  topic: RabbiTopic;
  audioUrl?: string;
  pdfUrl?: string;
  description?: string;
  duration?: string;
}
