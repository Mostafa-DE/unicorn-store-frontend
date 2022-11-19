export interface IFormats {
  small: { url: string };
  medium: { url: string };
  large: { url: string };
  thumbnail: { url: string };
}

export interface IVideosAndImages {
  id: number;
  url: string;
  formats: IFormats;
}

export interface ISize {
  L: boolean;
  M: boolean;
  S: boolean;
  XL: boolean;
  XXL: boolean;
  XXXL: boolean;
}

export interface IProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  size?: ISize;
  color: string;
  description: string;
  qty: number;
  discount: string;
  isAvailable?: boolean;
  madeIn?: string;
  oldPrice: number;
  preOrder: boolean;
  productDetailsPage: string;
  type: string;
  images: IVideosAndImages[];
  videos?: IVideosAndImages[];
  created_at: string;
  published_at: string;
}
