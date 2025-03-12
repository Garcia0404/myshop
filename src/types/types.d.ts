interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  descuento: number;
  categoria: string;
  genero: string;
  tallas: string[];
  colores: string[];
  imagenes: string[];
  stock: number;
}
interface DataProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
