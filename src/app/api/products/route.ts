import { NextResponse } from "next/server";
import products from "../../../../data/products.json";
import { Order, orderBy } from "app/services/orderBy";
import { searchWords } from "app/services/getProducts";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const order = url.searchParams.get("order") as Order;
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);

  let filteredProducts = products;

  if (search) {
    filteredProducts = searchWords(products, search);
  } else {
    const genre = url.searchParams.get("genre");
    const category = url.searchParams.get("category");
    const size = url.searchParams.get("size");
    filteredProducts = products.filter((product) => {
      return (
        (genre === "all" || !genre || product.genero === genre) &&
        (category === "all" || !category || product.categoria === category) &&
        (size === "all" || !size || product.tallas.some((talla) => talla == size))
      );
    });
  }

  if (order) {
    filteredProducts = orderBy(filteredProducts, order);
  }

  if (filteredProducts.length === 0) {
    return NextResponse.json({ message: "404 Not found" }, { status: 404 });
  }

  // Paginación
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
  });
}