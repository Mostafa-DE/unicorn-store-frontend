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

type ISizes = { size: "S" | "M" | "L" | "XL" | "2XL" | "3XL" };

export interface IProduct {
    id: number;
    slug: string;
    name: string;
    price: number;
    sizes?: ISizes[];
    color: string;
    description: string;
    qty: number;
    discount_percentage: number;
    available?: boolean;
    madeIn?: string;
    old_price: number;
    pre_order: boolean;
    // productDetailsPage: string;
    type: string;
    images: IVideosAndImages[];
    videos?: IVideosAndImages[];
    created_at: string;
    published_at: string;
}
