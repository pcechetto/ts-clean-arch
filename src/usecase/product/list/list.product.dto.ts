export interface InputListProductDto {
  id: string;
  name: string;
  price: number;
}

export interface OutputListProductDto {
  products: InputListProductDto[];
}
