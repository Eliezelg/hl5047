export interface Bracha {
  name: string;
  description: string;
  category: string;
  examples?: string[];
}

export interface BrachotLetter {
  letter: string;
  brachot: Bracha[];
} 