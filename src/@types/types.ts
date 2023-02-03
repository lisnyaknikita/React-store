export interface ICartPizza {
  id: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
  count: number,
  imageUrl: string
}

export interface ICartItem {
  id: string,
  name?:string,
  price?: number,
  imageUrl?: string,
  type?: string,
  size?: number,
  count?: number
}

export interface IPizza {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category?: number;
  rating: number;
}
