import useSWR from "swr";
import { fetchData } from "app/services/getProducts";
import { useEffect, useState } from "react";

export const useGetProducts = ({
  genre,
  category,
  size,
  order,
  search,
  page,
}: {
  genre: string;
  category: string;
  size: string;
  order: string;
  search: string;
  page: number;
}) => {
  const url = `/api/products?search=${search}&genre=${genre}&category=${category}&size=${size}&order=${order}&page=${page}`;
  const { data, error, isLoading } = useSWR<DataProducts>(url, fetchData);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [prevParams, setPrevParams] = useState({ genre, category, size, order, search });

  useEffect(() => {
    if (
      prevParams.genre !== genre ||
      prevParams.category !== category ||
      prevParams.size !== size ||
      prevParams.order !== order ||
      prevParams.search !== search
    ) {
      setPrevParams({ genre, category, size, order, search });
      setProducts([]);
      setTotalPages(1);
    }
  }, [genre, category, size, order, search, prevParams]);

  useEffect(() => {
    if (data?.products) {
      if (page === 1) {
        setProducts(data.products);
      } else {
        setProducts((prev) => [...prev, ...data.products]);
      }
      setTotalPages(data.totalPages);
    }
  }, [data, page]);

  return {
    data: products,
    error,
    isLoading,
    totalPages,
  };
};