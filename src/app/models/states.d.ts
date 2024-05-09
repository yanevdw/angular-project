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
  bookshelf_category: string;
  category: string;
}

export interface UserInfo {
  name: string;
  email: string;
  id: string;
}

export interface Results {
  kind: string;
  totalItems: number;
  items: Item[];
}

export interface Item {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo: SearchInfo;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  publisher?: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: IndustryIdentifier[];
  readingModes: ReadingModes;
  pageCount: number;
  printType: string;
  categories: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  subtitle?: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: ListPrice;
  retailPrice?: RetailPrice;
  buyLink?: string;
  offers?: Offer[];
}

export interface ListPrice {
  amount?: number;
  amountInMicros?: number;
  currencyCode: string;
}

export interface RetailPrice {
  amount?: number;
  amountInMicros?: number;
  currencyCode: string;
}

export interface Offer {
  finskyOfferType: number;
  listPrice: ListPrice;
  retailPrice: RetailPrice;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: Epub;
  pdf: Pdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

export interface Epub {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface Pdf {
  isAvailable: boolean;
}

export interface SearchInfo {
  textSnippet: string;
}

export interface Bookshelf {
  tbr: Book[];
  currentlyReading: Book[];
  read: Book[];
  dnf: Book[];
}
