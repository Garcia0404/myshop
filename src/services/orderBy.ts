export type Order = "default" | "asc" | "desc" | "bestDiscount" | "recent" | ""
export const orderBy = (data:Product[],order:Order) => {
  if (order === "default" || order === "") return data;
  switch (order) {
    case "asc":
      return data.sort((a, b) => a.precio - b.precio);
    case "desc":
      return data.sort((a, b) => b.precio - a.precio);
    case "bestDiscount":
      return data.sort((a, b) => b.descuento - a.descuento);
    case "recent":
      return data.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
    default:
      return data;
  }
}