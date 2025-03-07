import { NextResponse } from "next/server";
import products from "../../../../data/products.json";
import { Order, orderBy } from "app/services/orderBy";
import { searchWords } from "app/services/getProducts";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const order = url.searchParams.get("order") as Order;
  if (search) {
    const searchProduct = searchWords(products, search);
    if (order) {
      const orderedData = orderBy(searchProduct, order);
      return NextResponse.json(orderedData);
    }
    return NextResponse.json(searchProduct);
  }
  const genre = url.searchParams.get("genre");
  const category = url.searchParams.get("category");
  const size = url.searchParams.get("size");
  const filteredProducts = products.filter((product) => {
    return (
      (genre === "all" || !genre || product.genero === genre) &&
      (category === "all" || !category || product.categoria === category) &&
      (size === "all" || !size || product.tallas.some((talla) => talla == size))
    );
  });
  if (order) {
    const orderedData = orderBy(filteredProducts, order);
    return NextResponse.json(orderedData);
  }
  if (filteredProducts.length == 0)
    return NextResponse.json({ message: "404 Not found" }, { status: 404 });

  return NextResponse.json(filteredProducts);
}
