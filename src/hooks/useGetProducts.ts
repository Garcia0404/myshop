import useSWR from "swr";
import { fetchData } from "app/services/getProducts";
export const useGetProducts = ({ genre, category, size, order }:{ genre:string,category:string, size:string, order:string }) => {
  const { data, error, isLoading } = useSWR<Product[]>(
    `/api/products?genre=${genre}&category=${category}&size=${size}&order=${order}`,
    fetchData
  );
  return {
    data,
    error,
    isLoading,
  };
};
