export interface ProductModel {
  id: number;
  title: string;
  description: string;
  precio: number;
  ventas?: number;
  image: string;
  refreshItems?: Function;
}

export interface ButtonActionModel {
  color: string;
  icon?: string;
  text?: string;
  action: Function;
  descripcion: string;
}
