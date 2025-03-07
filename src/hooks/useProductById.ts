import { fetchData } from "app/services/getProducts";
import useSWR from "swr";
export const useProductById = (id: string) => {
  const { data, error, isLoading } = useSWR<Product>(`/api/products/${id}`, fetchData);
  return { data, error, isLoading };
};