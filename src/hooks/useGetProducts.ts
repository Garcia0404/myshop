import useSWR from "swr";
import { fetchData } from "app/services/getProducts";

export const useGetProducts = ({
  genre,
  category,
  size,
  order,
  search,
}: {
  genre: string;
  category: string;
  size: string;
  order: string;
  search: string;
}) => {
  const url = search
    ? `/api/products?search=${search}`
    : `/api/products?genre=${genre}&category=${category}&size=${size}&order=${order}`;

  const { data, error, isLoading } = useSWR<Product[]>(url, fetchData);

  return {
    data,
    error,
    isLoading,
  };
};
