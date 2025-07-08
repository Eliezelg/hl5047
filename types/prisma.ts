import { Rabbi as PrismaRabbi, Book as PrismaBook, QA as PrismaQA, Distributor as PrismaDistributor } from '@prisma/client';
import { RabbiTopic, QuestionTopic } from './index';

// Frontend types that correspond to Prisma types
export interface Rabbi {
  id: string;
  firstName: string;
  lastName: string;
  topics: RabbiTopic[];
  address: string | null;
  city: string | null;
  description: string | null;
  languages: string[];
  imageUrl: string | null;
}

export interface Book {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  nedarimPlusLink: string | null;
  isNew: boolean;
}

export interface QA {
  id: number;
  topic: QuestionTopic;
  question: string;
  answer: string | null;
  authorId: string | null;
  createdAt: string;
  askerName: string | null;
  askerEmail: string | null;
  status: string | null;
  categoryId: string | null;
  author?: Rabbi;
}

export interface Distributor {
  id: string;
  name: string;
  city: string;
  phone: string | null;
}

// Conversion functions
export const convertPrismaRabbi = (rabbi: PrismaRabbi): Rabbi => ({
  id: rabbi.id,
  firstName: rabbi.firstName,
  lastName: rabbi.lastName,
  topics: rabbi.topics as RabbiTopic[],
  address: rabbi.address,
  city: rabbi.city,
  description: rabbi.description,
  languages: rabbi.languages,
  imageUrl: rabbi.imageUrl,
});

export const convertPrismaBook = (book: PrismaBook): Book => ({
  id: book.id.toString(),
  title: book.title,
  description: book.description,
  price: book.price,
  imageUrl: book.imageUrl,
  nedarimPlusLink: book.nedarimPlusLink,
  isNew: book.isNew
});

export const convertPrismaQA = (qa: PrismaQA): QA => ({
  id: qa.id,
  topic: qa.topic as QuestionTopic,
  question: qa.question,
  answer: qa.answer,
  authorId: qa.authorId,
  createdAt: qa.createdAt.toISOString(),
  askerName: qa.askerName,
  askerEmail: qa.askerEmail,
  status: qa.status,
  categoryId: qa.categoryId
});

export const convertPrismaDistributor = (distributor: PrismaDistributor): Distributor => ({
  id: distributor.id,
  name: distributor.name,
  city: distributor.city,
  phone: distributor.phone
});
