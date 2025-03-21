'use client'
import { useGetProducts } from "app/hooks/useGetProducts";
import { useScrollToBottom } from "app/hooks/useScrollToBottom";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const ProductCard = ({ ...props }) => {
  const { replace } = useRouter()
  const { id, nombre, descripcion, precio, descuento, imagenes } = props
  const discount = ((1 - (descuento / 100)) * precio).toFixed(2)
  return (
    <article className="flex flex-col">
      <div className="relative cursor-pointer flex-1" onClick={() => replace(`/products/${id}`)}>
        <div style={{ display: descuento == 0 ? "none" : "block" }} className="absolute top-0 left-0 m-1 px-3 py-1 bg-black text-xs">-{descuento}%</div>
        <img loading="lazy" className="object-cover h-full w-full transition-opacity" alt={descripcion} width={195.2} height={292.8} src={imagenes[0]} />
      </div>
      <div className="flex flex-col mt-2">
        <h3 className="leading-5 overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical" }}>{nombre}</h3>
        <span className="flex gap-2 text-sm">
          <s style={{ display: descuento == 0 ? "none" : "block" }} className="text-[#8d8d8d]">S/ {precio}</s>
          <p className="font-semibold">S/ {discount}</p>
        </span>
      </div>
    </article>
  )
}

const Products = () => {
  const params = useSearchParams();
  const search = params.get("search") || ""
  const genre = params.get("genre") || "all";
  const category = params.get("category") || "all";
  const size = params.get("size") || "all";
  const order = params.get("order") || "default"
  const [page, setPage] = useState(1);
  const { data, isLoading, totalPages } = useGetProducts({ genre, category, size, order, search, page })

  useScrollToBottom(() => {
    if (!isLoading && page < totalPages) {
      setPage(prev => prev + 1);
    }
  });

  useEffect(() => {
    setPage(1);
  }, [genre, category, size, order, search]);

  return (
    <>
      {
        data?.map((product) => {
          return <ProductCard key={product.id} {...product} />
        })
      }
    </>
  )
}

export const MainContent = () => {
  return (
    <div className="grid min-[350px]:grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 relative">
      <Suspense>
        <Products />
      </Suspense>
    </div>
  )
}