export interface RepresentativeWork {
  title: string;
  content: string[];
}

export interface Poet {
  id: string;
  name: string;
  description: string;
  era: string;
  representativeWorks: RepresentativeWork[];
  imageUrl: string;
}

export interface PoetryRequest {
  poetId: string;
  subject: string;
  style?: string;
}

export interface GeneratedPoetry {
  id: string;
  title: string;
  content: string;
  poetName: string;
  subject: string;
  createdAt: string;
}

export interface PoetryVerse {
  id: string;
  content: string;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
} 