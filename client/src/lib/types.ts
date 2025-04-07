// Client-side type definitions for data from API

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  workingHours: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    medium?: string;
  };
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  summaryLink?: string;
  publishedYear?: number;
  tags: string[];
  createdAt: Date | string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  tags: string[];
  link?: string;
  createdAt: Date | string;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  date: string;
  link?: string;
  createdAt: Date | string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  demoLink?: string;
  codeLink?: string;
  featured: boolean;
  createdAt: Date | string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
