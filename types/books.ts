export interface Book {
  id: number;
  title: string;
  description: string | null;
  price: string | null;
  imageUrl: string | null;
  nedarimPlusLink: string | null;
  isNew: boolean;
}
