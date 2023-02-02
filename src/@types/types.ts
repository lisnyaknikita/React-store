export interface ICartPizza {
  id: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
  count: number,
  imageUrl: string
}
export interface IPizza {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
