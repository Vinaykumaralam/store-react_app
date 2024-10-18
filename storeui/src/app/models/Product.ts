export interface Product{
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  pictureType?: string
  brand?: string
  quantityInStock?: number
}

export interface ProductParams{
  orderBy : string,
  searchTerm? :string,
  brand? :string[],
  type? :string[],
  pageNumber : number,
  pageSize:number
}