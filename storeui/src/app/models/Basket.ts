export interface Basket {
    id: number
    buyerId: string
    basketItems: BasketItem[]
  }
  
  export interface BasketItem {
    id: number
    name: string
    pictureUrl: string
    brand: string
    type: string
    price: number
    quantity: number
  }
  