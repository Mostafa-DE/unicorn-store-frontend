export interface IImages {
    id: number | string;
    url: string;
}

export interface IVideos {
    id: number | string;
    url: string;
    image: string;
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
    pre_order: boolean;
    // productDetailsPage: string;
    type: string;
    images: IImages[];
    videos?: IVideos[];
    created_at: string;
    published_at: string;
}
