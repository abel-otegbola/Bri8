export interface IProduct {
    id: string;
    title: string;
    price: string;
    slug: string;
    description: string;
    tags: string[];
    category: string;
    stocks: number;
    images: string[];
    variations: {
        colors: {
            name: string, img: string
        }[];
        size: {
            name: string, img: string
        }[];
    };
    offers:{
        name: string, code: string
    }[];
    createdAt: string;
    updatedAt: string;
    rating: number;
    store: string;
}

export interface ICart {
    id: string, quantity: number, variation: { color: string, size: string }
}
