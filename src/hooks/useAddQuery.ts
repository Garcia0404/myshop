import { usePathname, useSearchParams } from "next/navigation";

export const useAddQuery = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const addQuery = (newQueryKey: string, newQueryValue: string) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set(newQueryKey, newQueryValue);
    if (!newQueryValue) queryParams.delete(newQueryKey);
    return `${pathname}?${queryParams.toString()}`;
  };
  return addQuery;
};
