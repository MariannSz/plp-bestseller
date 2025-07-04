export interface Product {
  id: number
  brand: string
  price: number
  stock: number
  color: string
  size: string[]
  name: { dk: string; en: string }
  images: string[]
  categories: string[]
}

export interface Promotion {
  position: number
  type: string
  image: {
    imageUrl?: string
    alt?: string
    aspectRatio?: string
    maxWidth?: string
    focalPoint?: { x: number; y: number }
  }
}

// These types describe the mixed array
export type ProductLike = Product & { __isPromo?: false }
export type PromoLike = Promotion & { __isPromo: true }
export type MergedItem = ProductLike | PromoLike
