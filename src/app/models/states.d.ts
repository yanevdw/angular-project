export interface BookShelf {
  id: number;
  userId: string;
}

export interface Book {
  author: string;
  bookshelfId: string;
  title: string;
  comments: string[];
  cover_url: string;
  description: string;
  dnf_reason: string;
  isbn: number;
  moods: string[];
  pace: string;
  pages: number;
  pages_read?: number;
  rating: number;
  status: string;
}
