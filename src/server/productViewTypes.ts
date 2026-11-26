/** Context shapes read by the product-view components (src/templates/components/products/detail). Types only: no template is emitted from here. */
/** The size a `getImageSrcset` descriptor accepts; the theme-settings type is a plain string (LIBRARY GAP, see PORT-NOTES.md). */
export type SrcsetSize = `${bigint}x${bigint}` | `${bigint}w`;

export interface Image {
    data: string;
}

export interface Message {
    error: string;
    success: string;
}

export interface Product {
    id: number;
    title: string;
    url: string;
    cart_url: string;
    cart_order_source: string;
    category: string[];
    brand: {name: string; url: string};
    price: unknown;
    call_for_price: string;
    main_image: Image;
    images: Image[];
    detail_messages: string;
    rating: number;
    num_reviews: number;
    sku: string;
    upc: string;
    condition: string;
    availability: string;
    weight: string;
    width: string;
    height: string;
    depth: string;
    min_purchase_quantity: number;
    max_purchase_quantity: number;
    gift_wrapping_available: boolean;
    shipping: {calculated: boolean; price: {formatted: string}};
    bulk_discount_rates: unknown;
    release_date: string;
    stock_level: number;
    show_backorder_availability_prompt: boolean;
    available_to_sell: boolean;
    available_for_backorder: boolean;
    backorder_availability_prompt: string;
    reviews: {messages: Message[]};
    featured_promotions: unknown;
}

export interface Settings {
    show_product_rating: boolean;
    show_product_reviews: boolean;
    show_wishlist: boolean;
    bulk_discount_enabled: boolean;
}
